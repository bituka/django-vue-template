define(
	'BackInStockSubscription.Model',
	[
		'Application',
		'SC.Model',
		'underscore'
	],
	function (
		Application,
		SCModel,
		_
	){

		return SCModel.extend({

			name: 'BackInStockSubscription',

			create: function ( data )
			{
				var fields = _.extend( {}, {
					email: '',
					name: '',
					lastname: '',
					date: ''
				}, data);

				if( !fields.item )
				{
					throw this.name + ': No Item specified.';
				}

				var leadId = 0;
				// nlapiLogExecution('DEBUG', 'firstname', fields.name);
				// nlapiLogExecution('DEBUG', 'lastname', fields.lastname);
				// nlapiLogExecution('DEBUG', 'email', fields.email);

				// Start --> Logic to create a new lead
				// search the customer
				var tt_filter = [];
				tt_filter.push(new nlobjSearchFilter('email', null, 'is', fields.email));
				var existsLead = nlapiSearchRecord('entity', null, tt_filter);
				// var existsCustomer = nlapiSearchRecord('customer', null, tt_filter);
				if(existsLead == null){

					nlapiLogExecution('DEBUG', 'no exists', 'no exists');
					// if not exist lead and customer woth the email, create a lead
					var lead = nlapiCreateRecord('lead');
					lead.setFieldValue('firstname', fields.name);
					lead.setFieldValue('lastname', fields.lastname);
					lead.setFieldValue('email', fields.email);
					try {
					   leadId = nlapiSubmitRecord(lead, true);
					} catch(e) {
					   if(e.code === "UNIQUE_CUST_ID_REQD") {
					      var dateTime = new Date();
					      lead.setFieldValue('lastname', fields.lastname + dateTime.getTime());
					      leadId = nlapiSubmitRecord(lead, true);
					   }
					   nlapiLogExecution('DEBUG', 'EXCEPTION', JSON.stringify(e));
					}
				}else{
					var tt_filter2 = [];
					tt_filter2.push(new nlobjSearchFilter('email', null, 'is', fields.email));
					var existsLead2 = nlapiSearchRecord('customer', null, tt_filter2);
					leadId = existsLead2[0].getId();
				}
				// End --> Logic to create a new lead


				var recordFields = {
					custrecorditem_back_in_stock: fields.item,
					custrecordback_in_stock_customer_email: fields.email,
					custrecord_backinstock_sent: 'F',
					custrecordcustomer_name_backinstock: leadId
				},
				record = nlapiCreateRecord('customrecordbackinstocksc');


				_.each( recordFields, function ( value, key ) {
					record.setFieldValue( key, value );
				});

				nlapiSubmitRecord( record );

				return recordFields;

			}
		});
});
