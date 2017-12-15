define('Theme_Landing_freebies', ['CMSadapter.Landing.View', 'jQuery', 'underscore'], function Theme_Landing_freebies(FreebiesView, jQuery, _) {
    
        _.extend(FreebiesView.prototype, {
            initialize: function () {
                var self = this;
                this.windowWidth = jQuery(window).width();
    
                this.on('afterViewRender', function () {
                    this.listenToOnce(
                        typeof CMS !== 'undefined' ? CMS : Backbone.Events, 'page:content:set', this.initSliders
                    );
                });
    
                var windowResizeHandler = _.throttle(function () {
                    if (_.getDeviceType(self.windowWidth) === _.getDeviceType(jQuery(window).width())) {
                        return;
                    }
                    this.showContent();
    
                    _.resetViewportWidth();
    
                    self.windowWidth = jQuery(window).width();
    
                }, 1000);
    
                this._windowResizeHandler = _.bind(windowResizeHandler, this);
    
                jQuery(window).on('resize', this._windowResizeHandler);
    
            }
            , initSliders: function () {
    
                var self = this;    
                //var existCondition = setInterval(function () { 

                // We need to wait until element exist

                _.initBxSlider($('.freebies-slider-list'), {
                    nextText: '<a class="freebies-slider-next-icon"></a>'
                    , prevText: '<a class="freebies-slider-prev-icon"></a>'
                    , auto: true
                    , pause: 6000
                    , pagerCustom: '.freebies-slider-pager'
                });
                //}, 100);
    
            }
    
        })
    
    });