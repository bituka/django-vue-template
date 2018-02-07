define('Cart.AddToCart.Button.Multiple.View',
[
  'LiveOrder.Model'
,	'LiveOrder.Line.Model'

, 'Cart.AddToCart.Button.View',

, 'Cart.Confirmation.Helpers'
]
, function
(
  LiveOrderModel
,	LiveOrderLineModel

, CartAddToCartButtonView

, CartConfirmationHelpers
){
  'use strict';

  _.extend(CartAddToCartButtonView.prototype, {
    addToCart: function addToCart (e)
  		{
  			e.preventDefault();

  			var self = this
  			,	cart_promise;
        console.log('add to cart')
        console.log(this.model)
        var groupItem = this.model.get('item').get('custitem_group_item');
        if(this.model.get('item').get('_itemType') === 'NonInvtPart' && groupItem){
          //console.log(this.model)
          _.each(this.model.get('items'), function(items){
            console.log(items)
            if (!items.areAttributesValid(['options','quantity'], self.getAddToCartValidators()))
            {
              return;
            }
            if (!items.isNew() && items.get('source') === 'cart')
            {
              cart_promise = this.cart.updateProduct(items);
              cart_promise.done(function ()
              {
                self.options.application.getLayout().closeModal();
              });
            }
            else
            {
              var line = LiveOrderLineModel.createFromProduct(items);
              cart_promise = this.cart.addLine(line);
              CartConfirmationHelpers.showCartConfirmation(cart_promise, line, self.options.application);
            }
          });
        }
        else{
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
  		}
  });
});
