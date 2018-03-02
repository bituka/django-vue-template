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

          var layout = application.getLayout();

          layout.on('afterViewRender', function () {
              layout.listenToOnce(
                  typeof CMS !== 'undefined' ? CMS : Backbone.Events, 'page:content:set', function(){
                    jQuery('a[data-action="scrollto"]').click(function(e){
                      e.preventDefault();
                      var $el = jQuery(e.currentTarget).attr('name');
                      $el = jQuery('#'+$el).length > 0 ? jQuery('#'+$el) : jQuery('.'+$el);

                      $('html, body').animate({
                          scrollTop: $el.offset().top
                      }, 2000);
                    });
                  }
              );
          });
      }
    };
});
