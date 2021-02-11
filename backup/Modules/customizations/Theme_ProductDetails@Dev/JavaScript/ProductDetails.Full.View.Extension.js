// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductDetails.Full.View.Extension',
    [
      'ProductDetails.Full.View',
      'BackInStockSubscription.View',
      'Backbone',
      'underscore',
      'jQuery'
    ],
    function(
      ProductDetailsFullView,
      BackInStockSubscriptionView,
      Backbone,
      _ ,
      jQuery
    ) {
        'use strict';

        _.extend(ProductDetailsFullView.prototype, {

          childViews: _.extend(ProductDetailsFullView.prototype.childViews, {
            'BackInStockSubscription.View': function(){
              return new BackInStockSubscriptionView({
      					item: this.model.get('item')
      				,	application: this.application
      				});
            }
          }),

          events: {
    				'click .custcol_additional_options-controls-group .product-views-option-tile-picker': 'unsetOption'
    			},

    			unsetOption: function(e){
            // function to manage 'ADDITIONAL OPTIONS'
            e.preventDefault();
    				var self = this.$(e.currentTarget);
            var active = self[0].classList[1];
            var selected_option = this.model.get('options').findWhere({cartOptionId: 'custcol_additional_options'});
            if(active == 'active'){
              self.removeClass('active');
              selected_option.unset('value');
            }else{
              self.addClass('active');
              selected_option.set('value', {
                internalid: "3"
              ,	label: "Additional Options"
              });
            }
    			}
          
        });


      _.extend(ProductDetailsFullView.prototype, {
        getContext : _.wrap(ProductDetailsFullView.prototype.getContext, function(fn){
            var ctx = fn.apply(this, _.toArray(arguments).slice(1));

            var model = this.model;

            // START inclusion of Badges Logic
            var getBadge = model.get('item').get('custitem_tt_itembadges');
            var addInformation = model.get('item').get('custitem_addition_information');
            var warranty = model.get('item').get('custitem_warranty');
            var storeDescription = model.get('item').get('storedetaileddescription');
            var customVideo = model.get('item').get('custitem_field_video');
            var badge = '',
            showAvailability = model.get('item').get('_isInStock');
            if (getBadge === 'NEW') {
                badge = '<div class="custombadge new">NEW</div>';
            } else if (getBadge === 'BEST SELLER') {
                badge = '<div class="custombadge bestseller">BEST SELLER</div>';
            } else if (getBadge === 'SALE') {
                badge = '<div class="custombadge sale">SALE</div>';
            } else {
                badge = false;
            }
            // END  inclusion of Badges Logic

            ctx.badge = badge;
            ctx.addInformation = addInformation;
            ctx.storeDescription = storeDescription;
            ctx.warranty = warranty;
            ctx.showAvailability = showAvailability;
            ctx.isOutOfStock = showAvailability;
            ctx.customVideo = customVideo;
            // @property {string} unitOfMeasure
            ctx.unitOfMeasure = model.get('item').get('saleunit');
            // @property {boolean} isBestSeller
            ctx.isBestSeller = model.get('item').get('custitem_topseller');

            return ctx;
        })
    });


    });
