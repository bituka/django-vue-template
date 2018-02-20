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

				var recordFields = {
						custrecorditem_back_in_stock: fields.item,
						custrecordback_in_stock_customer_email: fields.email,
						custrecord_backinstock_sent: 'F',
						custrecordcustomer_name_backinstock: fields.name
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
