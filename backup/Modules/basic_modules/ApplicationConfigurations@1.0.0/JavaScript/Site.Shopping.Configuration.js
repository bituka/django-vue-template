define('Site.Shopping.Configuration', [
    'SC.Shopping.Configuration',
    'Site.Global.Configuration',
    'underscore',

    'facets_faceted_navigation_item_color.tpl',
    'facets_faceted_navigation_item.tpl',
    'facets_faceted_navigation_item_range.tpl',

    'empty_template.tpl'

], function SiteCheckoutConfiguration(
    ShoppingConfiguration,
    GlobalConfiguration,
    _,

    facets_faceted_navigation_item_color_tpl,
    facets_faceted_navigation_item_tpl,
    facets_faceted_navigation_item_range_tpl,

    empty_template_tpl
) {
    'use strict';

    var SiteApplicationConfiguration = {
    };

    _.extend(ShoppingConfiguration, GlobalConfiguration, SiteApplicationConfiguration);

    return {
      mountToApp: function mountToApp(application) {
          _.extend(application.Configuration, ShoppingConfiguration);
      }
    };
});
