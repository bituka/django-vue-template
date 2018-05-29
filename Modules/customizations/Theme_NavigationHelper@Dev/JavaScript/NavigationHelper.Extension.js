//Addition to include Data-Keep-Href attribute
define('NavigationHelper.Extension'
,	[	  'NavigationHelper'
    , 'Session'
	  ,	'PluginContainer'
	  , 'underscore'
    ,	'jQuery'
	  ,	'Utils'
	]
,	function (
    NavigationHelper
	,	Session
	,	PluginContainer
	,	_
	,	jQuery
	,	Utils
	)

{
	'use strict';

	return {
        mountToApp: function(application) {

            var Layout = application.getLayout();

            // Touchpoints navigation
            _.extend(Layout, {

                hrefApplicationPrefixes: ['mailto', 'tel'],

                isLinkWithApplicationPrefix: function(href) {
                    return ~_.indexOf(this.hrefApplicationPrefixes, href.split(':')[0]);
                },
                isKeepHref: function($element) {
                    return $element.attr('data-keep-href') === 'true';
                    //return $element.attr("target","_blank");
                },
                isFancyBoxLink: function($element){
                    return $element.attr('data-fancybox') == 'true';
                },

                executeClick: _.wrap(Layout.executeClick, function(fn, e) {
                    var anchor = jQuery(e.currentTarget),
                    href = this.getUrl(anchor) || '#';

                    if(this.isKeepHref(anchor)) {
                        return;
                    }

                    if(this.isLinkWithApplicationPrefix(href)) {
                        e.preventDefault();
                        window.location.href = href;
                    }else if(this.isFancyBoxLink(anchor)){
                        return;
                    } else {
                        fn.apply(this, Array.prototype.slice.call(arguments, 1));
                    }
                })
            });

        }
    };

});
