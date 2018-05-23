// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductDetails.QuickView.View.Extension', ['ProductDetails.QuickView.View', 'Backbone', 'underscore'],
    function(ProductDetailsQViewFields, Backbone, _) {
        'use strict';

        // ProductDetailsQViewFields.prototype.installPlugin('postContext', {
        //     priority: 1,
        //     execute: function execute(context, view) {
		// 		var model = view.model;

        //         // START inclusion of Badges Logic
        //         var getBadge = model.get('item').get('custitem_tt_itembadges');
        //         var badge = '';
        //         if (getBadge === 'NEW') {
        //             badge = '<div class="custombadge new">NEW</div>';
        //         } else if (getBadge === 'BEST SELLER') {
        //             badge = '<div class="custombadge bestseller">BEST SELLER</div>';
        //         } else if (getBadge === 'SALE') {
        //             badge = '<div class="custombadge sale">SALE</div>';
        //         } else {
        //             badge = false;
        //         }
        //         // END  inclusion of Badges Logic

		// 		_.extend(context, {
        //             // @property {string} badge
        //             badge: badge,
        //             // @property {string} unitOfMeasure
        //             unitOfMeasure: model.get('item').get('saleunit')
		// 		});
		// 	}
        // });


        _.extend(ProductDetailsQViewFields.prototype, {
            getContext : _.wrap(ProductDetailsQViewFields.prototype.getContext, function(fn){
                var ctx = fn.apply(this, _.toArray(arguments).slice(1));
        
                var model = this.model;
    
                // START inclusion of Badges Logic
                var getBadge = model.get('item').get('custitem_tt_itembadges');
                var badge = '';
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
                // @property {string} unitOfMeasure
                ctx.unitOfMeasure = model.get('item').get('saleunit');
    
                return ctx;
            })	
        });

    });
