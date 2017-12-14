/**
 * @module
 * @desc Exclude facets fields from the facet.
 */
define('Facets.Translator.Exclude',['Facets.Translator','underscore','Session'],function(FacetTranslator,_,Session){

    _.extend(FacetTranslator.prototype,{
        getApiParams: _.wrap(FacetTranslator.prototype.getApiParams, function(fn) {


            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var facetExclude = [
                'custitem_sca_best_seller',
                'custitem_sca_new_product'



            ];
            ret['facet.exclude'] = facetExclude.join(',');

            return ret
        }),
    })

});
