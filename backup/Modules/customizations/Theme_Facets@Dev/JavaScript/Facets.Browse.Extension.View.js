// @module Facets
// addition to include custom Fields at FS
define(
    'Facets.Browse.Extension.View',

    ['Facets.Browse.View'
    , 'Facets.ItemListSortSelector.View'
    , 'Backbone'
    , 'underscore'
    ],

    function(
        FacetsBrowseExtensionView

      , FacetsItemListSortSelectorView
      , Backbone
      , _)
    {
        'use strict';

        _.extend(FacetsBrowseExtensionView.prototype, {

            childViews: _.extend(FacetsBrowseExtensionView.prototype.childViews, {

              'Facets.ItemListSortSelector': function()
                {
                  // remove price sort filter for package items
                  // get first item for validate filters
                  var item = this.model.get('items').models[0];
                  var sortOptions = this.options.application.getConfig('sortOptions');
                  var optionsDef = [];
                  if(item.get('onlinecustomerprice') == 0) {
                    for(var i=0; i<sortOptions.length; i++) {
                      if(sortOptions[i].id != "onlinecustomerprice:asc" && sortOptions[i].id != "onlinecustomerprice:desc") {
                        optionsDef.push(sortOptions[i]);
                      }
                    }
                  }
                  if(optionsDef.length == 0){
                    optionsDef = sortOptions;
                  }

                  return new FacetsItemListSortSelectorView({
                    options: optionsDef//this.options.application.getConfig('sortOptions')
                  ,	translator: this.translator
                  });
                }
            })

        })

    });
