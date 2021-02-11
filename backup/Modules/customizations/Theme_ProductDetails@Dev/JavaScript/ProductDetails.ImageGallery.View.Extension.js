/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module ProductDetails
define(
    'ProductDetails.ImageGallery.View.Extension', [
        'ProductDetails.ImageGallery.View', 'Backbone.CompositeView', 'Utilities.ResizeImage', 'SocialSharing.Flyout.Hover.View'

        , 'product_details_image_gallery.tpl'

        , 'Backbone', 'underscore', 'Utils'

        , 'jquery.zoom', 'jQuery.fancybox', 'jQuery.bxSlider'
    ],
    function (
        ProductDetailsImageGalleryView, BackboneCompositeView, resizeImage, SocialSharingFlyoutHoverView

        , product_details_image_gallery_tpl

        , Backbone, _, Utils
    ) {
        'use strict';
        // ProductDetailsImageGalleryView.prototype.installPlugin('postContext', {
        //     priority: 1,
        //     execute: function execute(context, view) {
        //         var model = view.model;
        //         // START inclusion of Badges Logic
        //         var customVideo = model.get('item').get('custitem_field_video');
        //         _.extend(context, {
        //             customVideo: customVideo
        //         });
        //     }
        // });

        _.extend(ProductDetailsImageGalleryView.prototype, {

            getContext : _.wrap(ProductDetailsImageGalleryView.prototype.getContext, function(fn){
                var ctx = fn.apply(this, _.toArray(arguments).slice(1));
                var model = this.model;
                // START inclusion of Video
                var customVideo = model.get('item').get('custitem_field_video');
                ctx.customVideo = customVideo;
                // get 'zoom' image
                ctx.imageResizeId = Utils.getViewportWidth() < 768 ? 'thumbnail' : 'zoom'

                return ctx;

            }),

            initialize: function initialize() {
                Backbone.View.prototype.initialize.apply(this, arguments);
                BackboneCompositeView.add(this);

                var self = this;

                this.images = this.model.getImages();

                this.model.on('change', function () {
                    var model_images = this.model.getImages();
                    if (!_.isEqual(this.images, model_images)) {
                        this.images = model_images;
                        this.render();
                    }
                }, this);

                this.on('afterViewRender', function () {
                    self.initSlider();
                    self.initZoom();
                    _.defer(_.bind(self.appendVideo,self));
                });
            },
            appendVideo: function () {
                var customVideo = this.$('#custom-video')
                this.$('.bx-has-controls-direction').append(customVideo)
            },
            initSlider: function initSlider() {

                    var self = this;

                    $('.facets-item-cell-grid-quick-view-link, .facets-item-cell-table-quick-view-link, .facets-item-cell-list-quick-view-link').click(function () {
                        _.delay(function () {
                            $('[data-slider]').bxSlider().goToSlide(1);
                        }, 300);
                    })

                    if (self.images.length > 1) {
                        self.$slider = Utils.initBxSlider(self.$('[data-slider]'), {
                            buildPager: _.bind(self.buildSliderPager, self),
                            startSlide: 0,
                            adaptiveHeight: true,
                            touchEnabled: true,
                            nextText: '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>',
                            prevText: '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>',
                            controls: true
                        });

                        // self.$('[data-action="next-image"]').off();
                        // self.$('[data-action="prev-image"]').off();

                        self.$('[data-action="next-image"]').click(_.bind(self.nextImageEventHandler, self));
                        self.$('[data-action="prev-image"]').click(_.bind(self.previousImageEventHandler, self));
                    }
            },
            initZoom: function () {
                if (!SC.ENVIRONMENT.isTouchEnabled) {
                    var images = this.images,
                        self = this;

                    if (this.parentView.template.Name === "product_details_full") {
                        // This is for the fancybox
                        var $links = this.$('[data-fancy]');
                        $('.bx-viewport').append('<div>testest</div>')
                        $links.on('click', function (e) {
                            var objs = [];

                            for (var i = 0; i < $links.length; i++) {
                                var link = $links[i];

                                var obj = {
                                    src: self.$(link).data('fancy'),
                                    type: 'image'
                                }

                                objs.push(obj);
                            }
                            $.fancybox.open(objs);

                            return false;
                        });
                        // fancy box functioanlity
                    } else {
                        this.$('[data-zoom]').each(function (slide_index) {
                            self.$(this).zoom({
                                url: resizeImage(images[slide_index].url, 'zoom'),
                                callback: function () {
                                    var $this = self.$(this);

                                    if ($this.width() <= $this.closest('[data-view="Product.ImageGallery"]').width()) {
                                        $this.remove();
                                    }

                                    return this;
                                }
                            });
                        });
                    }
                }
            }
        });
    });
