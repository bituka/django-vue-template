/**
 * @module ProductDetails.Base.Extension.View
 * @desc add the child view to show the available flavors
 */
define('Product.Model.Extension',
    [   'Product.Model'

        ,	'Product.Option.Collection'
        , 'Backbone'
        , 'underscore'
    ],
    function (
          ProductModel

        , ProductOptionCollection
        , Backbone
        , _)
    {
        'use strict';

        _.extend(ProductModel.prototype, {

          initializeOptions: function initializeOptions (options)
      			{
              this.set('options', options instanceof ProductOptionCollection ? options : new ProductOptionCollection(options), {silent: true});

      				this.extendOptionsFromItem(this.get('item'), this);

      				this.setOptionsValidation();

              // set default option 'POWER TUBE MATCHING' to Matched
      				this.setOption("custcol2","1");
      			}

        })

  });
