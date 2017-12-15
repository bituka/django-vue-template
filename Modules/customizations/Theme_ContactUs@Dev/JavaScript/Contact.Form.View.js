//@module Contact
define(
	'Contact.Form.View'
,	[
		'SC.Configuration'
	,	'Utilities.ResizeImage'
    ,   'Contact.Model'
	,	'contact.tpl'
	, 'GlobalViews.Message.View'
	
	,	'Backbone'
	,	'Backbone.CompositeView'
	,	'Backbone.CollectionView'
	,	'Backbone.FormView'
	,	'jQuery'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Configuration

	,	resizeImage
    ,   ContactModel
	,	contact_tpl
	, MessageView	

	,	Backbone
	,	BackboneCompositeView
	,	BackboneCollectionView
	,	BackboneFormView
	,	jQuery
	,	_
	,	Utils
	)
{
	'use strict';

	//@module Home.View @extends Backbone.View
	return Backbone.View.extend({

		template: contact_tpl

	,	title: _('Contact Us').translate()

	,	page_header: _('Contact Us').translate()

	,	attributes: {
			'id': 'contact-us-page'
		,	'class': 'contact-us-page'
		}

	,	events: {
			'submit form': 'customSaveForm'
	}

	,	bindings: {
		'[name="firstname"]': 'firstname'
	,	'[name="lastname"]': 'lastname'
	,	'[name="company"]': 'company'
	,	'[name="email"]': 'email'
	,	'[name="message"]': 'message'
	}

	,   initialize: function (options)
		{
			BackboneCompositeView.add(this);
			this.application = options.application;
      this.model = new ContactModel();
			BackboneFormView.add(this);
		}

    ,	customSaveForm: function (e)
		{

			jQuery('form .global-views-message').parent().remove();

			var promise = BackboneFormView.saveForm.apply(this, arguments)
			,	self = this;

			e && e.preventDefault();

			return promise && promise.then
			(
			  function(success)
			  {
				if (success.successMessage)
				{
				  self.showMessage(success.successMessage, 'success');
				}
				else {
				  self.showMessage('An error occured, please try again', 'error')
				}
			  }
			, function(fail)
			  {
				fail.preventDefault = true;
	  
				_.each(fail.responseJSON.errorMessage, function(message, field)
				{
				  self.showMessage(message, 'error', field);
				});
			  }
			);
			
			// if(this.model.isValid(true)){
			// 	promise && promise.done(function ()
			// 	{
			// 		// preview_review.showContent();
			// 	});
	
			// 	return promise;
			// } else {
				
			// }
		}
	// The function we use to actually generate the messages. It uses the global message view functionality, which is a simple of way of creating messages throughout the site, ensuring that they all look consistent. Depending on whether it is passed a field, it will generate the message either at that field's location, or simply at the bottom of the form.
	, showMessage: function(message, type, field)
    {
      var messageView = new MessageView
      ({
        message: message
      , type: type
      });

      if (typeof field !== 'undefined')
      {
        this.application.getLayout().$('[data-input="' + field + '"]').append(messageView.render().$el);
      }
      else
      {
        this.application.getLayout().$('form').append(messageView.render().$el);
      }
    }

		// @method getContext @return Home.View.Context
	,	getContext: function()
		{
			return {

			};
		}

	});
});
