// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductDetails.Options.Selector.Extension.View',
    [
      'ProductDetails.Options.Selector.View',
      'Backbone',
      'underscore',
      'jQuery'
    ],
    function(

      ProductDetailsOptionsSelectorView,
      Backbone,
      _ ,
      jQuery
    ) {
        'use strict';

        _.extend(ProductDetailsOptionsSelectorView.prototype, {

            events: {
      				'focus .custcol2-controls': 'deleteDefaultOption'
      			}

      		, deleteDefaultOption: function(){
              // delete '- None -' option
      				var array = $('#custcol2 option');
      				if(array[0].innerHTML == '- None -')
      					$('#custcol2 option')[0].remove()
      			}
        });

      });
