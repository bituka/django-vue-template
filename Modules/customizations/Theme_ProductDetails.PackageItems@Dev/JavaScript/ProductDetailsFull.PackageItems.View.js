define('ProductDetailsFull.PackageItems.View'
, [
  'product_details_full_package_item.tpl',

  'Product.PackageItems.GroupItems.Model',

  'ProductDetails.Full.View',
  'ProductDetails.Base.View'
],
function(
  product_details_full_package_item_tpl,

  ProductPackageItemsModel,

  ProductDetailsFullView,
  ProductDetailsBaseView
){
  'use strict';

  _.extend(ProductDetailsFullView.prototype, {
    groupItems: null,

    initialize: function initialize ()
  		{
  			ProductDetailsBaseView.prototype.initialize.apply(this, arguments);
  			this.model.on('change', this.updateURL, this);

        var packageItemsModel = new ProductPackageItemsModel();

        //Verify if it's a package item
        var groupItem = this.model.get('item').get('custitem_group_item');
        if(this.model.get('item').get('_itemType') === 'NonInvtPart' && groupItem){
          var self = this;
          this.template = product_details_full_package_item_tpl;
          packageItemsModel.fetch({
            data: {internalid: this.model.get('item').id}
          }).done(function(result){
            self.model.set('groupitems', result);
            self.render();
          });
        }
  		}
  });

  ProductDetailsFullView.prototype.installPlugin('postContext', {
      priority: 1,
      execute: function execute(context, view) {
          var model = view.model,
            groupItems = model.get("groupitems") ? model.get("groupitems") : null;
            console.log(model)
console.log(model.get("groupitems"))
          _.extend(context, {
            packageItems: groupItems
          });
      }
    });
});
