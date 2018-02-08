define('PackageItems.GroupItems.View',
[
    'package_items_group_items.tpl'
]
, function(
    package_items_group_items_tpl
)
{
  'use strict';

  return Backbone.View.extend(
	{
      //@property {Function} template
      template: package_items_group_items_tpl
    , initialize: function( options ){
        this.model = options.model;
        this.totalPrice = options.totalPrice;
    }
    , render: function(){
      var oldPrice = jQuery('.product-views-price-lead').text().split(' ');
      if(this.totalPrice) jQuery('.product-views-price-lead').html(oldPrice[1] + ' '+ this.totalPrice.toFixed(2));
      if(_.findWhere(this.isOutOfStock(), {isInStock: false})){
        jQuery('.product-line-stock').html('<span>This item is out of stock</span>');
        jQuery('[data-type="add-to-cart"]').attr('disabled', true);
      }

      this._render();
    }
    , isOutOfStock: function(){
      return _.map(this.model.get('items'), function(item){
        return {'isInStock': item.get('isinstock')};
      })
    }
    , getContext: function ()
    {
      var model = this.model,
      packageItems = model.get('groupItems');

      return {
				packageItems: packageItems
      }
    }
  }
  );
});
