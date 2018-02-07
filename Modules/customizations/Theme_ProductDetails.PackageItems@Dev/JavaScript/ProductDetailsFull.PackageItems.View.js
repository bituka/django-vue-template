define('ProductDetailsFull.PackageItems.View'
, [
    'Backbone.CompositeView'
  , 'Item.Model'
  , 'Product.Model'

  , 'product_details_full_package_item.tpl'

  , 'ProductDetails.Full.View'
  , 'ProductDetails.Base.View'

  , 'PackageItems.GroupItems.View'
  , 'PackageItems.GroupItems.Model'
],
function(
  BackboneCompositeView,
  ItemModel,
  ProductModel,

  product_details_full_package_item_tpl,

  ProductDetailsFullView,
  ProductDetailsBaseView,

  PackageItemsGroupItemsView,
  PackageItemsModel
){
  'use strict';

  _.extend(ProductDetailsFullView.prototype, {
    groupItems: null,

    initialize: function initialize ()
		{
      BackboneCompositeView.add(this);
			ProductDetailsBaseView.prototype.initialize.apply(this, arguments);
			this.model.on('change', this.updateURL, this);
  //    this.model.on('change', this.render, this);

      var groupItem = this.model.get('item').get('custitem_group_item');
      if(this.model.get('item').get('_itemType') === 'NonInvtPart' && groupItem){
        var self = this;
        this.template = product_details_full_package_item_tpl;
        this.items = {};

        var groupItems = this.getGroupItems(),
          itemOptions = null;
        groupItems.done(function(){
          if(self.groupItems){
            itemOptions = self.getItemOptions(self.groupItems);
          //  console.log(itemOptions)
            if(itemOptions)
              itemOptions.done(function(){
                console.log(self.groupItems)
                self.model.set('groupItems', self.groupItems);
                self.model.set('items', self.items);
                setTimeout(function(){
                  self.render();
                }, 1000);
              })
          }
        });
      }
		}
    ,
    getGroupItems: function(){
      var packageItemsModel = new PackageItemsModel({ internalid: this.model.get('item').id }),
      self = this,
      groupItems = packageItemsModel.fetch().done(function(result){
        var groupItemsResult = result;
        self.groupItems = groupItemsResult ? groupItemsResult : null;
      });
      return groupItems;
    }
    ,
    getItemOptions: function(groupItems){
      var promise = new $.Deferred(),
        model = new ItemModel(),
        self = this,
        i = 0;
      this.items = [];

      _.each(groupItems, function(group, index){
        i++;
        var getItemOptions = model.fetch({data: {'id': group.item}});
        getItemOptions.then(function(result){
          //console.log(result.items);
          if(result.items[0] && result.items[0].itemoptions_detail && result.items[0].itemoptions_detail && result.items[0].itemoptions_detail.fields)
            groupItems[index].itemOptions = result.items[0].itemoptions_detail.fields[0];
          self.items.push(new ProductModel(result.items[0]));
          console.log(i, groupItems.length)
          if(i === groupItems.length) promise.resolve("Finished creating items");
        });
      });

      return promise.promise();
    }
    ,
    childViews: _.extend({}, ProductDetailsBaseView.prototype.childViews, {
  			'GroupItems.Items': function()
  			{
  				return new PackageItemsGroupItemsView({
            model: this.model
          });
  			}
      })
  });

});
