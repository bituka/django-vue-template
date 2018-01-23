define( 'BackInStockSubscription.View',
	[
		'backinstock_button.tpl',

		'BackInStockSubscriptionForm.View'
		'BackInStockSubscription.Model',

		'Backbone.FormView',
		'Backbone'
	],
	function ( 
		template, 

		BackInStockSubscriptionFormView
		BackInStockSubscriptionModel,

		BackboneFormView, 
		Backbone
	)
{

	return Backbone.View.extend({
		template: template,

		item: null,

		events: {
			'click [data-action="show-bis-form"]': 'showForm'
		},

		initialize: function ( options )
		{
			this.model = new BackInStockSubscriptionModel();
			this.item = options.item;

			if( !this.item )
			{
				console.error('Item not specified.');
			}
			else
			{
				this.model.set('item', this.item.get('internalid'));
			}
			
			this.model.on('sync', jQuery.proxy(this, 'showSuccess'));

			this.on('afterViewRender', function () {
				this.$('[data-type="success-message"]').css({ display: 'none' });
			});
		},

		showForm: function ()
		{
			var layout = _.sample(SC._applications).getLayout(),
				formView = new BackInStockSubscriptionFormView({
					model: this.model
				});

			layout.showInModal( formView );
		}

		isEnabled: function ()
		{
			var itemBehavior = this.item.get('outofstockbehavior');

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