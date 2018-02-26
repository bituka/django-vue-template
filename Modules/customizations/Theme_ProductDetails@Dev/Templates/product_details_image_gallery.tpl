{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="product-details-image-gallery">
	{{#if showImages}}
		{{#if showImageSlider}}
			<ul class="bxslider" data-slider>
				{{#each images}}
<<<<<<< HEAD
					<li data-zoom class="product-details-image-gallery-container" data-fancy="{{resizeImage url ../imageResizeId}}">
=======
					<li data-zoom class="product-details-image-gallery-container" data-fancybox="{{resizeImage url ../imageResizeId}}">
>>>>>>> 884f3b3728c48a5bb7058ab4071841b6cafae0e2
						
							<img
							src="{{resizeImage url ../imageResizeId}}"
							alt="{{altimagetext}}"
							itemprop="image"
							data-loader="false">
						
					</li>
				{{/each}}
			</ul>
		{{else}}
			{{#with firstImage}}
<<<<<<< HEAD
				<div class="product-details-image-gallery-detailed-image" data-zoom data-fancy="{{resizeImage url ../imageResizeId}}">
=======
				<div class="product-details-image-gallery-detailed-image" data-zoom data-fancybox="{{resizeImage url ../imageResizeId}}">
>>>>>>> 884f3b3728c48a5bb7058ab4071841b6cafae0e2
						<img
						class="center-block"
						src="{{resizeImage url ../imageResizeId}}"
						alt="{{altimagetext}}"
						itemprop="image"
						data-loader="false">
				</div>
			{{/with}}

		{{/if}}
	{{/if}}
	<div data-view="SocialSharing.Flyout.Hover"></div>
</div>




{{!----
Use the following context variables when customizing this template:

	imageResizeId (String)
	images (Array)
	firstImage (Object)
	firstImage.altimagetext (String)
	firstImage.url (String)
	showImages (Boolean)
	showImageSlider (Boolean)

----}}
