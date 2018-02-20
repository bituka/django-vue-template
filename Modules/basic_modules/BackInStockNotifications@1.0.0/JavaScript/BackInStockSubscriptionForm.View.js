define( 'BackInStockSubscriptionForm.View',
	[
		'backinstock_form.tpl',

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
			'submit form': 'customSubmit',
			'focus #in-modal-email': 'cleanInput',
			'focus #in-modal-name': 'cleanInput',
			'focus #in-modal-lastname': 'cleanInput'
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
			var email = $('#in-modal-email').val();
			var name = $('#in-modal-name').val();
			var lastname = $('#in-modal-lastname').val();

			if(email == ''){
				$('.required-field').append('<p>Email address is required.<br></p>');
			}
			if(name == ''){
				$('.required-field').append('<p>Name is required.<br></p>');
			}
			if(lastname == ''){
				$('.required-field').append('<p>Lastname is required.<br></p>');
			}

			var promise = BackboneFormView.saveForm.apply( this, arguments );
		},

		cleanInput: function () {
			$('.required-field').html('');
		},

		showSuccess: function ()
		{
			this.$('[data-type="success-message"]').css({ display: 'block' });
			// this.$('[data-type="backinstocksubscription-form"]').css({ display: 'none' });
		}

	});

});
