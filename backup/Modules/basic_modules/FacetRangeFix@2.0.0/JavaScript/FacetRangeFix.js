// Fix Price Range issue on Vinson
define('FacetRangeFix',
    ['Facets.Translator','underscore'],
    function(FacetTranslator,_){

    _.extend(FacetTranslator.prototype,{
        getApiParams: function ()
        {
            var params = {};

            if (this.isCategoryPage)
            {
                params.commercecategoryurl = this.categoryUrl;
            }

            _.each(this.facets, function (facet)
            {
                switch (facet.config.behavior)
                {
                    case 'range':
                        var value = (typeof facet.value === 'object') ? facet.value : {from: 0, to: facet.value};
                        if(facet.id == 'price'){
                            params['pricelevel5.from'] = value.from;
                            params['pricelevel5.to'] = value.to;
                        }
                        params[facet.id + '.from'] = value.from;
                        params[facet.id + '.to'] = value.to;
                        break;
                    case 'multi':
                        params[facet.id] = facet.value.sort().join(',') ; // this coma is part of the api call so it should not be removed
                        break;
                    default:
                        params[facet.id] =  facet.value;
                }
            });

            params.sort = this.options.order;
            params.limit = this.options.show;
            params.offset = (this.options.show * this.options.page) - this.options.show;

            params.q = this.options.keywords;

            return params;
        }
    })

});