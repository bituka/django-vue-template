define('Theme_Home', ['Home.View', 'jQuery', 'underscore'], function Theme_Home(HomeView, jQuery, _) {

        _.extend(HomeView.prototype, {
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

                _.initBxSlider(self.$('[data-slider]'), {
                    nextText: '<a class="home-gallery-next-icon"></a>'
                    , prevText: '<a class="home-gallery-prev-icon"></a>'
                    , auto: true
                    , pause: 6000
                    , pagerCustom: '.main-slider-pager'
                });

                if(SC.isPageGenerator()){
                    return;
                }

                var existCondition = setInterval(function() { // We need to wait until element exist
                  if (self.$('.home-items-carousel-container').find('ul.home-merch').length) {
                  clearInterval(existCondition);
                    var slider = _.initBxSlider(self.$('.home-items-carousel-container').find('ul.home-merch'), {
                      nextText: '<a class="home-gallery-next-icon"></a>',
                      prevText: '<a class="home-gallery-prev-icon"></a>',
                      auto: true,
                      infiniteLoop: true,
                      forceStart: true,
                      pause: 5000,
                      minSlides:2,
                      maxSlides:5,
                      slideWidth:255,
                      slideMargin:30
                    });
                  }
                },300);


            }

        })

    });
