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
					date: ''
				}, data);

				if( !fields.item )
				{
					throw this.name + ': No Item specified.';
				}

				var recordFields = {
						name: "User: "+fields.email,
						custrecord_tt_backinstock_item: fields.item,
						custrecord_tt_backinstock_email: fields.email,
						custrecord_tt_backinstock_sent: 'F',
						custrecord_tt_backinstock_created_date: fields.date
					},
					record = nlapiCreateRecord( 'customrecord_tt_backinstock_subscription' );

				_.each( recordFields, function ( value, key ) {
					record.setFieldValue( key, value );
				});

				nlapiSubmitRecord( record );

				return recordFields;

			}

		});

});
