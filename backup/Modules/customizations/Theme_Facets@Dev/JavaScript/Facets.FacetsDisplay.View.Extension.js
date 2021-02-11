define(
    'Facets.FacetsDisplay.View.Extension', [
        'Facets.FacetsDisplay.View', 'underscore'
    ],
    function (FacetsFacetsDisplayView, _) {
        'use strict';
        _.extend(FacetsFacetsDisplayView.prototype, {
            /**
             *
             * @override getContext to add the title to the facets of the type checkbox instead of true or false
             *
             */
            getContext: function () {
                var facets = this.options.facets
                    , translator = this.options.translator;
                _.each(facets, function (facet) {
                    facet.value = _.isArray(facet.value) ? facet.value : [facet.value];
                });
                var facet_values = [];
                _.each(facets, function (facet) {
                    // For each facet we search for the checkbox to change the display from true to the Display Name
                        _.each(facet.value, function (value) {
                            var title = translator.getLabelForValue(facet.id, value);
                            if (facet.id == "custitem_sca_best_seller" || facet.id == "custitem_sca_new_product") {
                                title = facet.config.name;
                            }
                            var value_data = {
                                facetValueIsObject: _.isObject(value)
                                , from: _.isObject(value) ? _.formatCurrency(value.from) : ''
                                , to: _.isObject(value) ? _.formatCurrency(value.to) : ''
                                , valueLabel: title
                                , facetValueUrl: translator.cloneForFacetId(facet.id, value).getUrl()
                                , facetValue: facet.value
                            };
                            facet_values.push(value_data);
                        });
                });
                // @class Facets.FacetsDisplay.View.Context
                return {
                    // @property {Boolean} hasFacets
                    hasFacets: facets.length > 0
                    // @property {String} clearAllFacetsLink
                    , clearAllFacetsLink: translator.cloneWithoutFacets().getUrl()
                    // @property {Array} values
                    , values: facet_values
                };
                // @class Facets.FacetsDisplay.View
            }
        })
    })
