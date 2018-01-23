define( 'BackInStockSubscriptionForm.View',
	[
		'backinstock_form.tpl'

		'Backbone.FormView',
		'Backbone'
	],
	function ( 
		template,

		BackboneFormView, 
		Backbone
	)
{

	return Backbone.View.extend({
		template: template,

		item: null,

		events: {
			'submit form': 'customSubmit'
		},

		initialize: function ( options )
		{
			this.model = options.model;
			
			this.model.on('sync', jQuery.proxy(this, 'showSuccess'));

			BackboneFormView.add(this);

			this.on('afterViewRender', function () {
				this.$('[data-type="success-message"]').css({ display: 'none' });
			});
		},

		customSubmit: function ( e )
		{
			e && e.preventDefault();

			var promise = BackboneFormView.saveForm.apply( this, arguments );
		},
		
		showSuccess: function ()
		{
			this.$('[data-type="success-message"]').css({ display: 'block' });
			this.$('[data-type="backinstocksubscription-form"]').css({ display: 'none' });
		}
		
	});

});