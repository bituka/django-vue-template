define('ProductDetailsFull.PackageItems.View'
, [
    'Backbone.CompositeView'
  , 'Item.Model'
  , 'Product.Model'

  , 'product_details_full_package_item.tpl'

  , 'ProductDetails.Full.View'
  , 'ProductDetails.Base.View'
  , 'ProductDetail.ShowQuantityAvailable.View'

  , 'PackageItems.GroupItems.View'
  , 'PackageItems.GroupItems.Model'
  , 'QuantityPricing.View'
],
function(
  BackboneCompositeView,
  ItemModel,
  ProductModel,

  product_details_full_package_item_tpl,

  ProductDetailsFullView,
  ProductDetailsBaseView,
  ProductDetailShowQuantityAvailableView,

  PackageItemsGroupItemsView,
  PackageItemsModel,

){
  'use strict';

  _.extend(ProductDetailsFullView.prototype, {
    groupItems: null,
    totalPrice: null,

    //@method initialize Get Group Items and Item Options before rendering content.
		//@param {ProductDetails.Full.View.Initialize.Options} options
		//@return {Void}
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
            if(itemOptions)
              itemOptions.done(function(){
                self.model.set('groupItems', self.groupItems);
                self.model.set('items', self.items);
                setTimeout(function(){
                  self.render();
                  self.$('.tube_store_loading_packages').hide(1000);
                  self.$('.product-details-package-options').show(1000);
                }, 1000);
              })
          }
        });
      }
		}
    ,
    //@method getGroupItems Get group items returned from the service
		//@param {None}
		//@return {Object}
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
    //@method getItemOptions Get item options from the item using ItemModel
		//@param {Object: group items}
		//@return {Promise}
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
          var items = result.items[0];
          if(items && items.itemoptions_detail && items.itemoptions_detail && items.itemoptions_detail.fields)
            groupItems[index].itemOptions = items.itemoptions_detail.fields[0];
          else groupItems[index].itemOptions = 'n/a';
          self.items.push(new ProductModel(items));
          //Get total price to update uninventory item
          if(items && items.onlinecustomerprice_detail && items.onlinecustomerprice_detail.onlinecustomerprice)
            self.totalPrice += items.onlinecustomerprice_detail.onlinecustomerprice * groupItems[index].quantity;
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
            model: this.model,
            totalPrice: this.totalPrice
          });
  			},
        'Product.Quantity.Available': function()
        {
            return new ProductDetailShowQuantityAvailableView({
                model: this.model
            });
        }
      }),



  });

});
