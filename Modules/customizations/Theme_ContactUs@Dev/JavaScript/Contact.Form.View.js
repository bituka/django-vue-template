//@module Contact
define(
	'Contact.Form.View'
,	[
		'SC.Configuration'
	,	'Utilities.ResizeImage'
    ,   'Contact.Model'
	,	'contact.tpl'

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
			'submit form': 'saveForm'
	}

	,	bindings: {
		'[name="firstname"]': 'firstname'
	,	'[name="lastname"]': 'lastname'
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
			e && e.preventDefault();

			// this.prepareData();

            // set model data
			// this.model.set('itemid', this.item.get('internalid'));

			var promise = BackboneFormView.saveForm.apply(this, arguments)
			,	self = this;

			if(this.model.isValid(true)){
				promise && promise.done(function ()
				{
					// Once the review is submited, we show the Confirmation View
					// var preview_review = new ProductReviewsFormConfirmationView({
					// 	model: self.model
					// ,	application: self.application
					// });
	
					// preview_review.showContent();
				});
	
				return promise;
			} else {
				// alert('Not valid');
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
