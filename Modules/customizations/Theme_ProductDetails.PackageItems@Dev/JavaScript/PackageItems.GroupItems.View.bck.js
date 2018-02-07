define('PackageItems.GroupItems.View',
[
    'Backbone'
  ,	'Backbone.CompositeView'
	,	'jQuery'
	,	'underscore'

  , 'Item.Model',
  , 'Product.Model'
  , 'PackageItems.GroupItems.Model'

  , 'package_items_group_items.tpl'
]
,
function(
    Backbone
  ,	BackboneCompositeView
	,	jQuery
	,	_

  , ItemModel
  , ProductModel
  , PackageItemsModel

  , package_items_group_items_tpl
){
  'use strict';

  return Backbone.View.extend(
	{
      //@property {Function} template
  		template: package_items_group_items_tpl

    , initialize: function initialize (options)
  		{
        BackboneCompositeView.add(this);
      //  this.model = options.model;
  			//this.model.on('change', this.render, this);

      //  var packageItemsModel = new PackageItemsModel();
/*
        packageItemsModel.fetch({
          data: {internalid: this.model.get('item').id}
        }).done(function(result){
          var groupItemsResult = result;
          var model = self.model,
            groupItems = groupItemsResult ? groupItemsResult : null;
            var model = new ItemModel();
            var items = new Array();

            if(groupItems) _.each(groupItems, function(group, index){
            //  console.log(group)
            //console.log('model', model)
              model.fetch({data: {'id': group.item}}).then(function(result){
                //groupItems[index].itemOptions = groupItems[index].itemOptions != '' ? groupItems[index].itemOptions : '';
                if(result.items && result.items[0].itemoptions_detail && result.items[0].itemoptions_detail && result.items[0].itemoptions_detail.fields)
                  groupItems[index].itemOptions = result.items[0].itemoptions_detail.fields[0];
                  items.push(new ProductModel(result.items[0]));
              });
            });
          self.model.set('items', items);
          self.model.set('groupitems', result);
//            console.log('model', self.model)
          self.render();
        });*/
  		}
      ,
      getTotalPrice: function(model)
      {
        console.log('model.get', model.get('items'))
        if(model.get('items')){
          var price = _.map(model.get('items'), function(items){
            console.log(items)
            return items.get('onlinecustomerprice_detail').onlinecustomerprice
          });
          console.log(price)
        }
      }
      ,
      getContext: function ()
  		{
        var model = this.model;
        //console.log('model', model)
      /*  var groupItems = model.get('groupitems'),
        totalPrice = this.getTotalPrice(model);

        return {
  					// @property {Boolean} isPriceEnabled
  					//isPriceEnabled: !ProfileModel.getInstance().hidePrices()
            packageItems: groupItems,
            totalPrice: totalPrice
          }*/
      }
  });
});
