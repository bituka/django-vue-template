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

    				_.extend(context, {
                // @property {string} unitOfMeasure
                //unitOfMeasure: view.model.get('item').get('saleunit')
    				});
    			}
        });

});
