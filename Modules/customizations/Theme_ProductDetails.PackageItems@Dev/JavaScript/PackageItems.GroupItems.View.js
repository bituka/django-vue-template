define('PackageItems.GroupItems.View',
[
    'Backbone'
  , 'package_items_group_items.tpl'
]
, function(
    Backbone
  , package_items_group_items_tpl
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
        console.log('group items view')
    }
    , events: {
      'change [data-action="set-option"]': 'setOption'
    }
    , setOption: function(e){
      //debugger;
      //console.log(e)
  /*  var $el = jQuery(e.currentTarget);
      var itemId = $el.data("item-id"),
        itemOptionId = $el.data("item-option"),
        value = $el.val();
      var package_item = _.findWhere(this.model.get('items'), {'id': itemId}),
        selectedOption = _.findWhere(package_item.get('itemoptions_detail').fields, {internalid: itemOptionId});
      selectedOption.value = {internalid: value, label: 'Matched Triodes (Balanced) $5'};
      selectedOption.cartOptionId = itemOptionId;
      selectedOption.index = 10;
      selectedOption.isMandatory = false;
      selectedOption.isMatrixDimension = false;
      selectedOption.itemOptionId = "";
      selectedOption.urlParameterName = "custcol_additional_options";
      selectedOption.useLabelsOnUrl = false;
      package_item.get('options').set('options', selectedOption);
      this.model.set('changed', 1);
*/
    //  package_item.get('options').value = {internalid: value, label: selectedOption.label};
    //  package_item.get('options').cartOptionId = itemOptionId;
      //console.log(this.model)
    //  if(value && value != '') package_item.set('options', selectedOption)
    }
    , render: function(){
      //console.log(this.model)
      var oldPrice = jQuery('.product-views-price-lead').text().split(' ');
      // if(this.totalPrice) jQuery('.product-views-price-lead').html(oldPrice[1] + ' USD $'+ this.totalPrice.toFixed(2));
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
