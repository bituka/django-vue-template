/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module GlobalViews
define(
	'MinimumOrderValue.Error.View'
,	[
		'GlobalViews.Confirmation.View'
	,	'minimum_order_value_error_modal.tpl'

	,	'Backbone.CompositeView'

	,	'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function(
		GlobalViewsConfirmationView
	,	minimum_order_value_error_modal_tpl

	,	BackboneCompositeView

	,	Backbone
	,	_
	,	Utils
	)
{
	'use strict';

	// @class MinimumOrderValue.Error.View @extends GlobalViews.Confirmation.View
	return GlobalViewsConfirmationView.extend({

		template: minimum_order_value_error_modal_tpl

	,	title: _('Minimum Order Error').translate()

	,	page_header: _('Minimum Order Error').translate()

	,	events: {
			'click [data-action="cancel"]' : 'cancel'
		}

		//@method initialize
		//@param {GlobalViews.Confirmation.Initialize.Options} options
		//@return {Void}
	,	initialize: function (options)
		{
			this.title = options.title || this.title;
			this.page_header = options.title || this.page_header;
			this.className = options.className || '';
			this.body = options.body;
			this.showBodyMessage = !options.view;
			this.childViewMessage = options.view;
			this.childViewMessageParameters = options.viewParameters;

			this.autohide = !!options.autohide;

			BackboneCompositeView.add(this);

			this.once('afterViewRender', function ()
			{
				var self = this;
				self.$containerModal.on('shown.bs.modal', function ()
				{
					self.$containerModal.off('shown.bs.modal');
					self.$('[data-action="cancel"]').focus();
				});

			}, this);
		}

		// @method cancel Invokes cancelCallBack function
		// @return {Void}
	,	cancel: function cancel ()
		{
			if (this.autohide)
			{
				this.$containerModal.modal('hide');
			}
		}

		// @method getTitle This method returns the name the current browser window will have.
		// This is called by Content.EnhancedViews
		// @return {String}
	,	getTitle: function getTitle ()
		{
			return Utils.translate('Minimum Order Error');
		}

		// @method getContext
		// @return {GlobalViews.Confirmation.View.Context}
	,	getContext: function getContext ()
		{
			// @class GlobalViews.Confirmation.View.Context
			return {
				// @property {String} body
				body: this.body
				// @property {Boolean} showBodyMessage
			,	showBodyMessage: this.showBodyMessage
				// @property {String} class
			,	className: this.className
			};
			// @class GlobalViews.Confirmation.View
		}
	});
});
