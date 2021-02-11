{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<div class="click-here">Click the image to enlarge</div>
<div class="product-details-image-gallery">
    {{#if showImages}}
        {{#if showImageSlider}}
            <ul class="bxslider" data-slider>
                {{#each images}}
                    <li data-zoom class="product-details-image-gallery-container" data-fancy="{{resizeImage url ../imageResizeId}}">

                        <img src="{{resizeImage url ../imageResizeId}}" alt="{{altimagetext}}" itemprop="image" data-loader="false">

                    </li>
                {{/each}}

            </ul>
        {{else}}
            {{#with firstImage}}
                <div class="product-details-image-gallery-detailed-image" data-zoom data-fancy="{{resizeImage url ../imageResizeId}}">
                    <img class="center-block" src="{{resizeImage url ../imageResizeId}}" alt="{{altimagetext}}" itemprop="image" data-loader="false">
                </div>
            {{/with}}

        {{/if}}
    {{/if}}
    <div data-view="SocialSharing.Flyout.Hover"></div>
</div>
{{#if customVideo}}
    <div id="custom-video" class="bx-pager-item	{{#unless showImageSlider}}no-slider{{/unless}}">
        <a class="product-video-link" data-fancybox="true" data-small-btn="true" href="https://www.youtube.com/watch?v={{customVideo}}">
            <img class="card-img-top img-fluid" src="https://img.youtube.com/vi/{{customVideo}}/1.jpg" />
            <img class="play-icon" src="/Images/Global/play.png" />
        </a>
    </div>
{{/if}}

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