// @module Facets
// addition to include custom Fields at PDP
define(
    'ProductDetails.Full.View.Extension', ['ProductDetails.Full.View', 'Backbone', 'underscore'],
    function(ProductDetailsViewFields, Backbone, _) {
        'use strict';

        ProductDetailsViewFields.prototype.installPlugin('postContext', {
            priority: 1,
            execute: function execute(context, view) {
				var model = view.model;

                // START inclusion of Badges Logic
                var getBadge = model.get('item').get('custitem_tt_itembadges');
                var addInformation = model.get('item').get('custitem_addition_information');
                var warranty = model.get('item').get('custitem_warranty');
                var storeDescription = model.get('item').get('storedetaileddescription');
                var badge = '',
                showAvailability = model.get('item').get('itemtype') === 'infoitem' ? false : true;
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

				_.extend(context, {
                    // @property {string} badge
                    badge: badge ,
                    addInformation: addInformation ,
                    storeDescription: storeDescription ,
                    warranty: warranty,
                    showAvailability: showAvailability
				});
			}
        });
    });
