// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductViews.Price.Extension.View',
    [
      'ProductViews.Price.View',
      // 'SiteSettings.Model',
      'Profile.Model',
      'Backbone',
      'underscore'
    ],
    function(

      ProductViewsPriceView,
      // SiteSettingsModel,
      ProfileModel,
      Backbone,
      _
    ) {

        'use strict';

        // ProductViewsPriceView.prototype.installPlugin('postContext', {
        //     priority: 1,
        //     execute: function execute(context, view) {

        //       var currency = SC.ENVIRONMENT.currentCurrency;
        //       var isNonInv = false;
        //       var item = view.model.get('item');
        //       if(item != undefined){
        //         if (item.get('itemtype') == "NonInvtPart"){
        //           isNonInv = true;
        //           var price = item.get('custitem_tt_price_total');
        //           price = parseFloat(price).toFixed(2);
        //           price = String(price);
        //           // '.50' correction
        //           if (price.substring(price.indexOf("."),price.length) == ".5") {
        //             price = price + "0";
        //           }
        //           price = currency.symbol + price;
        //         }
        //       }

      	// 			_.extend(context, {
        //           // @property {string} nonInvPrice
        //           nonInvPrice: price ,
        //           // @property {boolean} isNonInv
        //           isNonInv: isNonInv
      	// 			});
        //     }
        // });

        _.extend(ProductViewsPriceView.prototype, {
          getContext : _.wrap(ProductViewsPriceView.prototype.getContext, function(fn){
              var ctx = fn.apply(this, _.toArray(arguments).slice(1));

              var profileModel = ProfileModel.getInstance();
              var currency = profileModel.attributes.currency;
              console.log('price-currency: ', JSON.stringify(currency));

              var model = this.model;
              // var currency = SC.ENVIRONMENT.currentCurrency;
              var isNonInv = false;
              var item = this.model.get('item');
              var exchangerate = Number(SC.ENVIRONMENT.siteSettings.exchangerate);

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
                  if(currency.internalid == "2"){
                    price = currency.symbol + (price/exchangerate).toFixed(2);
                  }else{
                    price = currency.symbol + price;
                  }
                }
              }else{
                if(model.attributes.itemtype == "NonInvtPart"){
                  isNonInv = true;
                  var price = model.attributes.custitem_tt_price_total;
                  price = parseFloat(price).toFixed(2);
                  price = String(price);
                  // '.50' correction
                  if (price.substring(price.indexOf("."),price.length) == ".5") {
                    price = price + "0";
                  }
                  if(currency.internalid == "2"){
                    price = currency.symbol + (price/exchangerate).toFixed(2);
                  }else{
                    price = currency.symbol + price;
                  }
                }
              }

              // @property {string} nonInvPrice
              ctx.nonInvPrice = price;
              // @property {boolean} isNonInv
              ctx.isNonInv = isNonInv;

              return ctx;
          })
      });

});
