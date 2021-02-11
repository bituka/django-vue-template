define( 'BackInStockSubscription.View',
	[
		'backinstock_button.tpl',

		'BackInStockSubscriptionForm.View',
		'BackInStockSubscription.Model',

		'Backbone.FormView',
		'Backbone'
	],
	function (
		template,

		BackInStockSubscriptionFormView,
		BackInStockSubscriptionModel,

		BackboneFormView,
		Backbone
	)
{

	return Backbone.View.extend({
		template: template,

		item: null,
		custrecord_tt_backinstock_created_date: null,

		events: {
			'click [data-action="show-bis-form"]': 'showForm'
		},

		initialize: function ( options )
		{
			this.model = new BackInStockSubscriptionModel();
			this.item = options.item;
			this.custrecord_tt_backinstock_created_date = new Date().toLocaleString('en-US').toLowerCase().split(',').join('');
			if( !this.item )
			{
				console.error('Item not specified.');
			}
			else
			{
				this.model.set('item', this.item.get('internalid'));
				this.model.set('custrecord_tt_backinstock_created_date', this.custrecord_tt_backinstock_created_date)
			}
		},

		showForm: function ()
		{
			var layout = _.sample(SC._applications).getLayout(),
				formView = new BackInStockSubscriptionFormView({
					model: this.model
				});

			layout.showInModal( formView );
		},

		isEnabled: function ()
		{
			var itemBehavior = this.item.get('outofstockbehavior');
			var showBackInstockButton = !this.item.get('_isInStock');
			if(
				showBackInstockButton &&
				(itemBehavior == '- Default -' || itemBehavior == 'DEFAULT') &&
				SC.CONFIGURATION.siteSettings.order.outofstockbehavior != 'DISABLE'
			){
				return true
			}
			else
			{
				return false
			}

			return itemBehavior == 'DEFAULT';
		},

		getContext: function ()
		{
			return {
				showButton: this.isEnabled()
			};
		}

	});

});
