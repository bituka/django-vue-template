/**
 * Extend Facets.FacetedNavigationItem.View
 * This module is to remove the true and false of the facets of the type checkbox and
 * use only the true value, displaying the title.
 */
define(
    'Facets.FacetedNavigationItem.View.Extension', [
        'Facets.FacetedNavigationItem.View', 'underscore'
    ],
    function (FacetsFacetedNavigationItemView, _) {
        'use strict';
        FacetsFacetedNavigationItemView.prototype.installPlugin('postContext', {
            name: 'FacetsFacetedNavigationItemView.getContext',
            priority: 1,
            execute: function execute(context, view) {
                var facetInternalId = context.facetId;
                var displayValues;
                displayValues = context.displayValues;
                // by default position 1 have the true value of the facet
                var facetIndex = 1;
                var showFacetGeneric = true;
                // if we have at least one element
                if (displayValues && displayValues.length > 1) {
                    // when the filter is already applied, we have only one element on the array
                    if (displayValues.length < 2) {
                        facetIndex = 0;
                    }
                    // New array of facet to use on the template
                    var newdisplayValues = [];
                    // facets of the type checkbox
                    if (facetInternalId =="custitem_sca_best_seller" || facetInternalId == "custitem_sca_new_product") {
                        newdisplayValues.push(displayValues[facetIndex]);
                        if (displayValues[facetIndex].displayName == "true") {
                            displayValues[facetIndex].displayName = context.facetDisplayName;
                            displayValues[facetIndex].applyNewFilter = true;
                        }
                    }
                }else{
                    // if there are no facet to show, we use a exclusive boolean to not modify the default behavior
                    showFacetGeneric = false;
                }
                _.extend(context, {
                    newdisplayValues: newdisplayValues,
                    showFacetGeneric : showFacetGeneric
                });
            }
        });
    })
