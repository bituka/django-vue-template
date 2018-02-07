define('PackageItems.GroupItems.View',
[
    'package_items_group_items.tpl'

  , 'Item.Model',
  , 'Product.Model'

  , 'PackageItems.GroupItems.Model'
]
, function(
    package_items_group_items_tpl

  , ItemModel
  , ProductModel

  , PackageItemsModel
)
{
  'use strict';

  return Backbone.View.extend(
	{
      //@property {Function} template
      template: package_items_group_items_tpl
    , initialize: function( options ){
        this.model = options.model;
      //  this.model.on('change', this.render, this);

      //  console.log('this.model', this.model)
    }
    , render: function(){
      console.log('this.model-', this.model)
      this._render();
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
