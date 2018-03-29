// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductViews.Price.Extension.View',
    [
      'ProductViews.Price.View',
      'Backbone',
      'underscore'
    ],
    function(

      ProductViewsPriceView,
      Backbone,
      _
    ) {

        'use strict';

        ProductViewsPriceView.prototype.installPlugin('postContext', {
            priority: 1,
            execute: function execute(context, view) {

              var isNonInv = false;
              var item = view.model.get('item');
              if(item != undefined){
                if (item.get('itemtype') == "NonInvtPart"){
                  isNonInv = true;
                  var price = item.get('custitem_tt_price_total');
                  price = parseFloat(price).toFixed(2);
                  price = String(price);
                  // '.50' correction
                  if (price.substring(price.indexOf("."),price.length) == ".5") {
                    price = price + "0";
                  }
                  price = "USD $" + price;
                }
              }

      				_.extend(context, {
                  // @property {string} nonInvPrice
                  nonInvPrice: price ,
                  // @property {boolean} isNonInv
                  isNonInv: isNonInv
      				});
            }
        });

});
