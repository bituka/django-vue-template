define('Cart.AddToCart.Button.Multiple.View'
, [
  'Cart.AddToCart.Button.View'
  , 'LiveOrder.Line.Model'
]
, function
(
  CartAddToCartButtonView
  , LiveOrderLineModel
)
{
    'use strict';

    _.extend(CartAddToCartButtonView.prototype, {
      render: function(){
        console.log('render', this.model)
        this._render();
      }
    , addToCart: function addToCart (e)
    		{
    			e.preventDefault();

    			var self = this
    			,	cart_promise;
          console.log('add to cart')
          console.log(this.model)
          var groupItem = this.model.get('item').get('custitem_group_item');
          if(this.model.get('item').get('_itemType') === 'NonInvtPart' && groupItem){
            //console.log(this.model)
            var line = LiveOrderLineModel.createFromProduct(this.model);
            cart_promise = this.cart.addLine(line);

            _.each(this.model.get('items'), function(items){
              var quantity = _.findWhere(self.model.get('groupItems'), {'item': items.get('internalid').toString()});
              //console.log(quantity, items.get('internalid'))

              var $el = jQuery("select[data-item-id="+items.get('internalid')+"]");

              if($el){
                var itemId = $el.data("item-id"),
                  itemOptionId = $el.data("item-option"),
                  value = $el.val(),
                  selectedOption = _.findWhere(items.get('itemoptions_detail').fields, {internalid: itemOptionId});

                if(selectedOption){
                  selectedOption.value = {internalid: value, label: selectedOption.label};
                  selectedOption.cartOptionId = itemOptionId;
                  selectedOption.isMandatory = false;
                  selectedOption.isMatrixDimension = false;
                  selectedOption.itemOptionId = "";
                  selectedOption.urlParameterName = itemOptionId;
                  selectedOption.useLabelsOnUrl = false;
                  items.get('options').set(selectedOption);
                }
              }

            // /  items.setOption(itemOptionId, value);

              items.set('item', items.attributes);
              items.get('options').set(selectedOption);
              items.set('quantity', parseInt(quantity.quantity));

              var line = LiveOrderLineModel.createFromProduct(items);
              cart_promise = self.cart.addLine(line);

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
