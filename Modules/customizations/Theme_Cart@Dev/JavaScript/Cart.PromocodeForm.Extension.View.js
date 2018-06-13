// @module Facets
// addition to include custom Fields at PDP
define(
    'Cart.PromocodeForm.Extension.View',
    [
      'Cart.PromocodeForm.View',
      'BackInStockSubscription.View',
      'ErrorManagement',
      'Backbone',
      'underscore'
    ],
    function(
      CartPromocodeFormView,
      BackInStockSubscriptionView,
      ErrorManagement,
      Backbone,
      _
    ) {
        'use strict';

        _.extend(CartPromocodeFormView.prototype, {

          applyPromocode: function applyPromocode (e)
        		{
        			e.preventDefault();
        			e.stopPropagation();

        			var self = this
        			,	$target = this.$(e.target)
        			,	options = $target.serializeObject()
        			,	pre_promocodes = this.model.get('promocodes') || []
        			,	new_promocodes = pre_promocodes.concat({ code: options.promocode });

        			if (!options.promocode)
        			{
        				this.state.errorMessage = _('Coupon Code is required').translate();
        			}
        			else
        			{
        				this.state.errorMessage = null;
        				this.state.isSaving = true;

        				//@event {Void} applying_promocode
        				this.trigger('applying_promocode');

        				this.model
        					.save({ promocodes: new_promocodes })
        					.fail(function savePromocodeFailed (jqXhr)
        						{
        							self.model.set('promocodes', pre_promocodes);
        							jqXhr.preventDefault = true;

        							self.state.errorMessage = ErrorManagement.parseErrorMessage(jqXhr, self.options.application.getLayout().errorMessageKeys);

        							//@event {Void} apply_promocode_failed
        							self.trigger('apply_promocode_failed');
        						}
        					).done(function savePromocodeSucceeded ()
        						{
        							//@event {Void} apply_promocode_succeeded
        							self.trigger('apply_promocode_succeeded');
        							self.model.trigger('promocodeUpdated', 'applied');
        						}
        					).always(function savePromocodeEnded ()
        						{
        							self.state.isSaving = false;
        							self.state.code = '';

        							//@event {Void} apply_promocode_finished
        							self.trigger('apply_promocode_finished');

        							self.render();
        						}
        					);
        			}

        			this.render();
        		}

        });
});
