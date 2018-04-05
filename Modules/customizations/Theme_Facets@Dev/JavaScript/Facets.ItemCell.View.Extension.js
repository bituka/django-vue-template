// @module Facets
// addition to include custom Fields at FS
define(
    'Facets.ItemCell.View.Extension',
    ['Facets.ItemCell.View', 'Backbone', 'underscore'],

    function(
        FacetsItemCellView,
        Backbone,
        _)
    {
        'use strict';
        FacetsItemCellView.prototype.installPlugin('postContext', {
            priority: 1,
            execute: function execute(context, view) {
				var model = view.model;

        // START inclusion of Badges Logic
        var getBadge = model.get('custitem_tt_itembadges');
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



				_.extend(context, {
            // @property {string} badge
            badge: badge,
            // @property {boolean} isBestSeller
            isBestSeller: model.get('custitem_topseller'),
            // @property {string} unitOfMeasure
            unitOfMeasure: model.get('saleunit'),
            showRatingCount: !!model.get('custitem_ns_pr_count'),
            //@property {Number} ratingCount
            ratingCount: model.get('custitem_ns_pr_count'),
             //@property {Boolean} ratingCountGreaterThan0
            ratingCountGreaterThan0: model.get('custitem_ns_pr_count') > 0
            //@property {Boolean} hasOneReview
            ,hasOneReview: model.get('custitem_ns_pr_count') === 1
				});
			}
        });
    });
