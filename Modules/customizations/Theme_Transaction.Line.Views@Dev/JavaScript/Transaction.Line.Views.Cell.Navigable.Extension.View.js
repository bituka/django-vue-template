// @module Facets
// addition to include custom Fields at PDP
define(
    'Transaction.Line.Views.Cell.Navigable.Extension.View',
    [
      'Transaction.Line.Views.Cell.Navigable.View',

      'Profile.Model',
      'Backbone',
      'underscore'
    ],
    function(

      TransactionLineViewsCellNavigableView,

      ProfileModel,
      Backbone,
      _
    ) {

        'use strict';


        _.extend(TransactionLineViewsCellNavigableView.prototype, {

          getContext : _.wrap(TransactionLineViewsCellNavigableView.prototype.getContext, function(fn){

              var ctx = fn.apply(this, _.toArray(arguments).slice(1));

              var item = this.model.get('item')
        			,	line = this.model;

        			// START - customization for 'Matched Triode Option'
        			var profileModel = ProfileModel.getInstance();
        			var currency = profileModel.attributes.currency;
        			var exchangerate = Number(SC.ENVIRONMENT.siteSettings.exchangerate);
        			var itemQty = line.get('quantity');
        			var total = line.get('total');
        			if(line.get('options').length > 0) {
        				if(line.get('options').models[0].get('cartOptionId') == 'custcol_additional_options'){
        					if(currency.internalid == "2"){
        						// calculate final price with item option in CAD
        						total = (total + itemQty*(5/exchangerate)).toFixed(2);// (5/exchangerate).toFixed(2);
        					}else{
        						// calculate final price with item option in USD
        						total = (total + itemQty*5).toFixed(2);
        					}
        				}
        			}
        			// END - customization for 'Matched Triode Option'            

              // @property {boolean} isNonInv
              ctx.showComparePrice = parseFloat((line.get('amount')).toFixed(2)) > parseFloat(total)

              return ctx;
          })
      });

});
