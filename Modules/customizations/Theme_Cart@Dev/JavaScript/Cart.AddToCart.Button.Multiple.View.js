define('Cart.AddToCart.Button.Multiple.View',
[
  'Cart.AddToCart.Button.View',

  'Cart.Confirmation.Helpers'
]
, function
(
  CartAddToCartButtonView,

  CartConfirmationHelpers
){
  'use strict';

  _.extend(CartAddToCartButtonView, {
    addToCart: function addToCart (e)
  		{
  			e.preventDefault();

  			var self = this
  			,	cart_promise;

  			if (!this.model.areAttributesValid(['options','quantity'], self.getAddToCartValidators()))
  			{
  				return;
  			}

  			if (!this.model.isNew() && this.model.get('source') === 'cart')
  			{
   				cart_promise = this.cart.updateProduct(this.model);
   				cart_promise.done(function ()
   				{
   					self.options.application.getLayout().closeModal();
   				});
  			}
  			else
  			{
  				var line = LiveOrderLineModel.createFromProduct(this.model);
  				cart_promise = this.cart.addLine(line);
  				CartConfirmationHelpers.showCartConfirmation(cart_promise, line, self.options.application);
  			}

  			cart_promise.fail(function (jqXhr)
  			{
  				var error_details = null;
  				try
  				{
  					var response = JSON.parse(jqXhr.responseText);
  					error_details = response.errorDetails;
  				}
  				finally
  				{
  					if (error_details && error_details.status === 'LINE_ROLLBACK')
  					{
  						self.model.set('internalid', error_details.newLineId);
  					}
  				}

  			});

  			this.disableElementsOnPromise(cart_promise, e.target);
  			return false;
  		}
  });
});
