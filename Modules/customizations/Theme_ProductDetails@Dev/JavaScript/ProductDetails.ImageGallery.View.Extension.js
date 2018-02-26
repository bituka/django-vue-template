/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module ProductDetails
define(
	'ProductDetails.ImageGallery.View.Extension'
,	[
		'ProductDetails.ImageGallery.View'
	,	'Backbone.CompositeView'
	,	'Utilities.ResizeImage'
	,	'SocialSharing.Flyout.Hover.View'

	,	'product_details_image_gallery.tpl'

	,	'Backbone'
	,	'underscore'
	,	'Utils'

	,	'jquery.zoom'
	,	'jQuery.fancybox'
	,	'jQuery.bxSlider'
	]
,	function (
		ProductDetailsImageGalleryView
	,	BackboneCompositeView
	,	resizeImage
	,	SocialSharingFlyoutHoverView

	,	product_details_image_gallery_tpl

	,	Backbone
	,	_
	,	Utils
	)
{
	'use strict';

	_.extend(ProductDetailsImageGalleryView.prototype, {
		initSlider: function initSlider ()
			{

				var self = this;

				$('.facets-item-cell-grid-quick-view-link, .facets-item-cell-table-quick-view-link, .facets-item-cell-list-quick-view-link').click(function(){
					_.delay(function () {
						$('[data-slider]').bxSlider().goToSlide(1);
					},300);
				})

				if (self.images.length > 1)
				{
					self.$slider = Utils.initBxSlider(self.$('[data-slider]'), {
							buildPager: _.bind(self.buildSliderPager, self)
						,	startSlide: 0
						,	adaptiveHeight: true
						,	touchEnabled: true
						,	nextText: '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>'
						,	prevText: '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>'
						, 	controls: true
					});

					// self.$('[data-action="next-image"]').off();
					// self.$('[data-action="prev-image"]').off();

					self.$('[data-action="next-image"]').click(_.bind(self.nextImageEventHandler, self));
					self.$('[data-action="prev-image"]').click(_.bind(self.previousImageEventHandler, self));
				}
			}
			
			,	initZoom: function ()
			{
				if (!SC.ENVIRONMENT.isTouchEnabled)
				{
					var images = this.images
					,	self = this;
					
					if (this.parentView.template.Name === "product_details_full") {
						// This is for the fancybox 
						var $links = this.$('[data-fancybox]');

						$links.on('click', function(e){
							var objs = [];

							for(var i = 0; i < $links.length; i++) {
								var link = $links[i];

								var obj = {
									src : self.$(link).data('fancybox'),
									type : 'image'
								}

								objs.push(obj);
							}
							

							$.fancybox.open( objs);
						
							return false;
						});
						// fancy box functioanlity
					} else {
						this.$('[data-zoom]').each(function (slide_index)
						{
							self.$(this).zoom({
								url: resizeImage(images[slide_index].url, 'zoom')
							,	callback: function()
								{
									var $this = self.$(this);
		
									if ($this.width() <= $this.closest('[data-view="Product.ImageGallery"]').width())
									{
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
