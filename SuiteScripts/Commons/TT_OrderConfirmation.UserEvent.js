//--
// Dependecies: TT_Common, Handlebarsjs, Underscore
//--

function Log ( text, value )
{
	nlapiLogExecution('ERROR', text, value);
}

function EmailConfirmation ()
{
	this.initialize.apply( this, arguments );
}

_.extend( EmailConfirmation.prototype, {

	_defaults: 
	{
		//Testing params
		testing: true, //True wil debug every internal message
		testEmail: 'hgonzalez@tavanoteam.com',

		//Sending params
		senderEmployee: 6897, //Employee ID

		//Item image params
		noItemImage: '', //URL of No Image image
		fisrtImageCriteria: false, //Used for an indexOf within the name, when false first image is used. (Ex: '.0.') [ requires imageField = false]
		//imageField: 'storedisplayimage', //The field that contains item image id, when null itemimages list is used.

		//Loader params
		autoload: false, //If autoload is false internalid must be specified
		autorun: false, //Executes run() right in the initialize
		internalid: null,
		cco: null,
		

		includes: {
			standard: {
				items: true, //Items of the sales order
				salesRep: false, //Sales rep information
				itemImage: true, //Items images	
				shippingMethod: true, //Shipping method name
				paymentMethod: true, // Payment method type
				trackingNumber: false //Tacking number code
			},
			tracking_items: {
				items: true, 
				salesRep: false, 
				itemImage: false, 	
				shippingMethod: true,
				paymentMethod: false,
				trackingNumber: true
			},
			cancelled: {
				items: true, 
				salesRep: false, 
				itemImage: false, 	
				shippingMethod: false,
				paymentMethod: false,
				trackingNumber: false
			}
		},

		//Only the specified templates will be processed
		templates: {
			'Pending Approval': {
				subject: 'Your Order has been received',
				templateId: 7,
				include: 'standard',
				//context: 'webstore',
				save: true //Creates a line on Notification Tab.
			},
			'Pending Fulfillment': {
				subject: 'Your Order has been received',
				templateId: 7,
				include: 'standard',
				context: 'webstore',
				save: false //Creates a line on Notification Tab.
			},
			'Partially Fulfilled': null,
			/*'Billed': { //*
				templateId: 1039,
				include: 'tracking_items',
				subject: 'Your order has been fulfilled',
				save: true
			},*/
			'Fulfilled': null, //*
			
			/*'Cancelled': {
				subject: 'Your order has been cancelled',
				templateId: 1040,
				include: 'cancelled',
				save: true
			},*/
			'Closed': null
		}
	},

	//*: For a fulfilled status; When Advanced Shipping Feature is ON Billed is used instead.

	//Runtime
	config: null,
	templateData: null,
	salesOrder: null,
	oldSalesOrder: null,
	customerRecord: null,

	initialize: function ( config ) 
	{
		this.prepare( config );

		if( this.config.autoload )
		{
			this.autoload();
		}
		else
		{
			if( !this.config.internalid )
			{
				throw 'InternalID is not specified';
				return false;
			}

			this.loadSalesOrder( this.config.internalid );
		}

		if( this.config.autorun )
		{
			this.run();
		}
	},

	prepare: function ( config ) 
	{
		this.config = _.extend( {}, this._defaults, config );
		this.templateData = {};
	},

	autoload: function () 
	{
		var salesOrderId = nlapiGetRecordId();

		this.loadSalesOrder( salesOrderId );
	},

	loadSalesOrder: function ( internalId ) 
	{
		try
		{
			this.salesOrder = nlapiLoadRecord( 'salesorder', internalId );	

			if( this.config.autoload )
			{
				this.oldSalesOrder = nlapiGetOldRecord();
			}
		} 
		catch( e ) 
		{
			Log('Cant load SO.', e);
		}
	},

	loadCustomer: function ()
	{
		var customerId = this.salesOrder.getFieldValue('entity'),
			customerRecord = nlapiLoadRecord( 'customer', customerId );

		this.customerRecord = customerRecord;
	},

	run: function ()
	{
		var status = this.salesOrder.getFieldValue('status') || 'Pending Approval',
			templateInfo = this.config.templates[ status ];

		if( !templateInfo )
		{
			return this.finish( true, 'Status ignored.' );
		}

		if( templateInfo.context && this.getContext() != templateInfo.context )
		{
			return this.finish( false, 'Context not allowed.' );
		}

		//Lets check if the status is the one changed
		if( this.oldSalesOrder )
		{
			if( this.oldSalesOrder.getFieldValue('status') == status )
			{
				return this.finish( true, 'Status havnt changed' );
			}
		}

		var includes = this.config.includes[ templateInfo.include ];

		if( !includes )
		{
			return this.finish( true, 'Include for template is not valid. Status: ' + status );
		}


		//Get customer
		this.loadCustomer();

		//Prepare data for template compilation - Customer Email will be set here
		this.prepareTemplateData( includes );

		//Email parsed
		var emailBody = this.getEmailBody( templateInfo.templateId );

		//TODO
		subject = templateInfo.subject + ' #' + this.salesOrder.getFieldValue('tranid');

		//Sending confirmation
		var result = this.sendConfirmation( emailBody, subject, templateInfo.save );

		Log('Sent: ', this.salesOrder.id);

		this.finish( false, 'Done' );

	},

	finish: function ( error, message )
	{
		if( error )
		{
			Log( 'finished', message );
		}
	},

	sendConfirmation: function ( body, subject, save )
	{
		var recipient = this.customerRecord.getFieldValue('email');

		if( this.config.testing )
		{
			recipient = this.config.testEmail;
		}

		Log( 'Confirmation for:', recipient );

		try 
		{
			var sent = nlapiSendEmail( this.config.senderEmployee, recipient, subject, body, null );
			Log('Confirmation Sent', sent );

			//CCO
			try
			{
				if( this.config.cco )
				{
					nlapiSendEmail( this.config.senderEmployee, this.config.cco, subject, body, null );
				}	
			}
			catch( e )
			{
				Log('CCO error', e);
			}
			
		} 
		catch (e) 
		{
			Log("ERROR SENDING MAIL!!",
				"OrderInternalId: " + this.salesOrder.getFieldValue('internalid') +
				"Error Catched: " + e
			);
		}

		if( save && !this.config.testing )
		{
			var message = nlapiCreateRecord( 'message' );

			message.setFieldValue( 'subject', subject );
			message.setFieldValue( 'author', this.config.senderEmployee );
			message.setFieldValue( 'recipient', this.customerRecord.id );
			message.setFieldValue( 'message', body );

			try
			{
				nlapiSubmitRecord( message );
			}
			catch( e )
			{
				Log( 'Cant save message on custmer.', 'ID: ' + this.customerRecord.id + ' - SO: ' + this.salesOrder.id );
			}
			

		}
	},

	prepareTemplateData: function ( includes )
	{
		var	items = [],
			orderNumber = this.salesOrder.getFieldValue('tranid'),
			orderDate = this.salesOrder.getFieldValue('createddate'),
			customerId = this.salesOrder.getFieldValue('entity'),
			customerRecord = this.customerRecord,
			customerEmail = customerRecord.getFieldValue('email'),
			customerPhone = customerRecord.getFieldValue('phone'),
			customerName = this.customerRecord.getFieldValue('firstname'),
			billingAddress = customerRecord.getFieldValue('defaultaddress'),
			shippingAddress = this.salesOrder.getFieldValue('shipaddress'),
			shippingCost = this.salesOrder.getFieldValue('shippingcost'),
			subTotal = this.salesOrder.getFieldValue('subtotal'),
			taxTotal = this.salesOrder.getFieldValue('taxtotal'),
			orderTotal = this.salesOrder.getFieldValue('total');

		//Adjustmets to some data
		if( false && customerName && customerName.length )
		{
			var _customerName = customerName.split(' ');
			_customerName.shift();
			customerName = _customerName.join(' ');
		}

		if( billingAddress && billingAddress.length )
		{
			billingAddress = billingAddress.replace('\n', '<br/>');
		}

		if( shippingAddress && shippingAddress.length )
		{
			shippingAddress = shippingAddress.replace('\n', '<br/>');
		}

		//Prepare items data
		if( includes.items )
		{
			var itemCount = this.salesOrder.getLineItemCount('item');

			for( var i = 1; i <= itemCount; i++ )
			{
				items.push( this.getItemInfo(i, includes) );
			}
		}

		//Prepare sales rep
		if( includes.salesRep )
		{
			var salesRepInfo = nlapiLookupField('employee', this.salesOrder.getFieldValue('salesrep'), ['firstname', 'lastname']),
				salesRep = salesRepInfo ? salesRepInfo.firstname + ' ' + salesRepInfo.lastname : this.salesOrder.getFieldValue('salesrep');
		}

		//Prepare shipmethod
		if( includes.shippingMethod )
		{
			var shipMethod = this.salesOrder.getFieldValue('shipmethod'),
				shippingMethod = '';

			if( shipMethod )
			{
				var shipItem = nlapiLoadRecord( 'shipitem', shipMethod );
				shippingMethod = shipItem.getFieldValue('itemid');	
			}
			
		}

		//Prepare paymethod
		if( includes.paymentMethod )
		{
			//Seems not working, record type is not found (?)
			/*
			var payMethod = this.salesOrder.getFieldValue('paymentmethod'),
				paymentMethod = '';

			if( payMethod )
			{
				var payItem = nlapiLoadRecord( 'paymentitem', payMethod );
				paymentMethod = shipItem.getFieldValue('displayname');	
			}
			*/
			var paymentMethod = this.salesOrder.getFieldValue('paymethtype');
		}

		//Prepare tracking number
		if( includes.trackingNumber )
		{
			var trackingNumber = this.salesOrder.getFieldValue('linkedtrackingnumbers');
		}

		//Fill template data
		var templateData = {
			orderNumber: orderNumber,
			orderDate: orderDate,
			trackingNumber: trackingNumber || '',
			paymentMethod: paymentMethod || '',
			salesRep: salesRep || '',
			customerId: customerId,
			customerEmail: customerEmail,
			customerPhone: customerPhone,
			customerName: customerName,
			billingAddress: billingAddress,
			shippingAddress: shippingAddress,
			shippingMethod: shippingMethod || '',
			shippingCost: shippingCost,
			subTotal: subTotal,
			taxTotal: taxTotal,
			orderTotal: orderTotal,
			items: items
		};

		Log('Template data', JSON.stringify(templateData));

		this.templateData = templateData;

	},

	getContext: function () 
	{
		var context = nlapiGetContext(),
			exeContext = context.getExecutionContext();

		return exeContext;
	},

	getEmailBody: function ( templateId )
	{
		var rawContent = this.getEmailTemplate( templateId ),
			compiler = Handlebars.compile( rawContent ),
			content = compiler( this.templateData );

		return content;
	},

	getEmailTemplate: function ( templateId )
	{
		var template = nlapiLoadRecord( 'emailtemplate', templateId );

		if( !template )
		{
			throw 'Email template not found';
		}

		var body = template.getFieldValue('content'),
			renderer = nlapiCreateTemplateRenderer();

		renderer.setTemplate( body );

		return renderer.renderToString();
	},

	getItemInfo: function ( line, includes )
	{
		var itemId = this.salesOrder.getLineItemValue( 'item', 'item', line ),
			itemRecord = this.getItem( itemId ),
			childItem = null;

		if( itemRecord.getFieldValue('parent') )
		{
			childItem = itemRecord;
			itemRecord = this.getItem( itemRecord.getFieldValue('parent') );
		}

		var itemInfo = {
			internalid: itemId,
			storeDisplayName: itemRecord.getFieldValue('storedisplayname') || itemRecord.getFieldValue('itemid'),
			displayName: itemRecord.getFieldValue('displayname'),
			rate: this.salesOrder.getLineItemValue( 'item', 'rate', line ),
			quantity: this.salesOrder.getLineItemValue( 'item', 'quantity', line ),
			amount: this.salesOrder.getLineItemValue( 'item', 'amount', line ),
			online: itemRecord.getFieldValue('isonline'),
			stockUnit: itemRecord.getFieldValue('stockunit'),
			sku: itemRecord.getFieldValue('custitem_sku')
		};

		//Include item image
		if( includes.itemImage )
		{
			itemInfo.image = this.getItemImageUrl( itemRecord );
		}

		if( this.config.extraItemFields )
		{
			_.extend( itemInfo, this.config.extraItemFields( childItem || itemRecord ) );
		}

		return itemInfo;
	},

	getItem: function ( internalid )
	{
		var availableTypes = [
				'inventoryitem', 
				'noninventoryitem',
				'assemblyitem', 
				'kititem', 
				'serviceitem', 
				'discountitem', 
				'descriptionitem'
			],
			record = null,
			index = 0;

		do
		{
			try
			{
				record = nlapiLoadRecord( availableTypes[index], internalid );
			}catch(e){}

			index++;
		}
		while( !record && index < availableTypes.length );

		return record;
	},

	getItemImageUrl: function ( item )
	{
		var imageUrl = '';

		if( this.config.imageField ) //Image field must be used
		{
			var imageId = item.getFieldValue(this.config.imageField);

			if( imageId )
				imageUrl = this.getImageUrl( imageId );
			else
				imageUrl = this.config.noItemImage;

		}
		else //Use list instead
		{
			if( item.getFieldValue('parent') )
			{
				item = this.getItem( item.getFieldValue('parent') );
				Log('Parent1');
			}
			var imageCount = item.getLineItemCount('itemimages');  

			if( imageCount > 0 ) 
			{
				if( this.config.fisrtImageCriteria )
				{
					for( var i = 1; i <= imageCount; i++ )
					{
						if( !!imageUrl )
							continue;

						var name = item.getLineItemValue('itemimages', 'name', i),
							id = item.getLineItemValue('itemimages', 'nkey', i);

						if( !!~name.indexOf( this.config.fisrtImageCriteria ) )
						{
							imageUrl = this.getImageUrl( id );
						}
					}
				}
				else //We use literally the fisrt image
				{
					var id = item.getLineItemValue('itemimages', 'nkey', 1);
					imageUrl = this.getImageUrl( id );
				}
			}
			else
			{
				return this.config.noItemImage;
			}
		}

    	return imageUrl;
	},

	getImageUrl: function ( fileId )
	{
		var imageUrl = this.config.noItemImage; //We assume that doesnt exists

		try
		{
			var image = nlapiLoadFile( fileId );  
		}
		catch(e){
			//Meh
		}

		if( image )
		{
			imageUrl = image.getURL();
		}

		return imageUrl;
	}
});

function UserEvent()
{
	var eConfirmation = new EmailConfirmation({
		testing: false,
		autoload: true,
		autorun: false,
		cco: 'info@lanaunlimited.com',
		extraItemFields: function ( itemRecord )
		{
			return {
				color: itemRecord.getFieldText('custitem_matrix_color')
			}
		}
	});

	if( eConfirmation.getContext() != 'webstore' && eConfirmation.salesOrder.getFieldValue('status') == 'Pending Approval' )
	{
		if( eConfirmation.salesOrder.getFieldValue('salesrep') )
		{
			Log('Changing sender', eConfirmation.salesOrder.getFieldValue('salesrep'));
			eConfirmation.config.senderEmployee = eConfirmation.salesOrder.getFieldValue('salesrep');	
		}
		
	}	

	eConfirmation.run();

	//2276662
}