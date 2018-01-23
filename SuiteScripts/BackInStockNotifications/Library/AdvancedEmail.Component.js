//--
// Dependecies: TT_Common, Handlebarsjs, Underscore
//--

function Log ( text, value )
{
	nlapiLogExecution('ERROR', text, value);
}

function AdvancedEmail ()
{
	this.initialize.apply( this, arguments );
}

_.extend( AdvancedEmail.prototype, {

	_defaults: 
	{
		//Testing params
		testing: true, //True wil debug every internal message
		testEmail: 'hgonzalez@tavanoteam.com',

		templateData: {},
		subject: '',

		//Sending params
		senderEmployee: 0, //Employee ID

		//Item image params
		noItemImage: '', //URL of No Image image
		fisrtImageCriteria: false, //Used for an indexOf within the name, when false first image is used. (Ex: '.0.') [ requires imageField = false]
		//imageField: 'storedisplayimage', //The field that contains item image id, when null itemimages list is used.

		//Loader params
		autoload: false, //If autoload is false internalid must be specified
		autorun: false, //Executes run() right in the initialize
		cco: null,
		
		//Only the specified templates will be processed
		template: 0
	},

	//*: For a fulfilled status; When Advanced Shipping Feature is ON Billed is used instead.

	//Runtime
	config: null,
	templateData: null,
	salesOrder: null,

	initialize: function ( config ) 
	{
		this.prepare( config );

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

	run: function ()
	{
		//Prepare data for template compilation - Customer Email will be set here
		this.prepareTemplateData();

		//Email parsed
		var emailBody = this.getEmailBody( this.config.template );

		//TODO
		subject = this.config.subject;

		//Sending confirmation
		var result = this.sendConfirmation( emailBody, subject, false ); //When passing true a communication line is created, TODO: Add customer id into configuration

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

	prepareTemplateData: function ()
	{
		var templateData = {};

		//Prepare items data
		if( this.config.item )
		{
			var itemCount = this.salesOrder.getLineItemCount('item');

			for( var i = 1; i <= itemCount; i++ )
			{
				items.push( this.getItemInfo(i, includes) );
			}
		}


		Log('Template data', JSON.stringify(templateData));

		this.templateData = _.extend( {}, templateData, this.config.templateData );

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
