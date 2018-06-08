{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="product-details-full">
	<div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>

	<header class="product-details-full-header">
		<div id="banner-content-top" class="product-details-full-banner-top"></div>
	</header>
	<div class="product-details-full-divider-desktop"></div>
	<article class="product-details-full-content" itemscope itemtype="https://schema.org/Product">
		<meta itemprop="url" content="{{itemUrl}}">
		<div id="banner-details-top" class="product-details-full-banner-top-details"></div>

		<section class="product-details-full-main-content">
			<div class="product-details-full-content-header">
				<h1 class="product-details-full-content-header-title" itemprop="name">{{pageHeader}}</h1>
				<div class="product-details-full-rating" data-view="Global.StarRating"></div>
				<div data-cms-area="item_info" data-cms-area-filters="path"></div>
			</div>
			<div class="product-details-full-main-content-left">
			<div class="product-details-full-image-gallery-container">
				<div id="banner-image-top" class="content-banner banner-image-top"></div>
				<div data-view="Product.ImageGallery"></div>
				{{#if model.item.custitem_field_video}}
				<a id="product-video-link" data-fancybox="true" data-small-btn="true" href="https://www.youtube.com/watch?v={{model.item.custitem_field_video}}">
					<img class="card-img-top img-fluid" src="http://img.youtube.com/vi/{{model.item.custitem_field_video}}/1.jpg" />
				</a>
				{{/if}}
				<div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>
			</div>
			</div>

			<div class="product-details-full-main-content-right">
			<!-- <div class="product-details-full-divider"></div> -->

			<div class="product-details-full-main">
				{{#if isItemProperlyConfigured}}
					<form id="product-details-full-form" data-action="submit-form" method="POST">

						<section class="product-details-full-info">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</section>

						<section data-view="Product.Options"></section>

						<div data-view="Product.Sku"></div>

						{{#if showAvailability}}
						<div class="product-details-full-availabity">
							<p class="availability"><strong>{{translate 'Availability: '}}</strong>
                  <span>{{translate 'Usually ships within 24 hours.'}}</span>
              </p>
						</div>
						{{/if}}
						<div class="product-details-full-divider"></div>

						<div data-view="Product.Price"></div>
						<div data-view="Product.Quantity.Available"></div>
						<div data-view="Quantity.Pricing"></div>

						<div data-view="Product.Stock.Info"></div>

						<div data-view="GroupItems.Items"></div>

						{{#if isPriceEnabled}}
							<div data-view="Quantity"></div>

							<section class="product-details-full-actions">

								<div class="product-details-full-actions-container">
									<div data-view="MainActionView"></div>

								</div>
								<div class="product-details-full-actions-container">
									<div data-view="AddToProductList" class="product-details-full-actions-addtowishlist"></div>

									<!--<div data-view="ProductDetails.AddToQuote" class="product-details-full-actions-addtoquote"></div>-->
								</div>

							</section>
						{{/if}}

						<div data-view="StockDescription"></div>

						<div class="product-details-full-divider"></div>

					</form>
				{{else}}
					<div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
				{{/if}}

				<div class="product-details-share-section">
					<!-- Go to www.addthis.com/dashboard to customize your tools -->
					<!-- <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a591df3cb1b105b"></script> -->
					<!-- <div class="addthis_inline_share_toolbox"></div> -->
					<div data-view="SocialSharing.Flyout" class="product-details-full-social-sharing"></div>
				</div>

				<div class="product-details-full-main-bottom-banner">
					<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
				</div>
				<div id="banner-details-bottom" class="product-details-full-banner-details-bottom" data-cms-area="item_info_bottom" data-cms-area-filters="page_type"></div>
			</div>
			</div>

		</section>

		<div class='custom-pdp-tabs' id='myTabs'>

			<!-- Nav tabs -->
			<ul class="nav nav-tabs" role="tablist">
				<li role="presentation" class="active"><button data-target="#tab-1" aria-controls="tab-1" role="tab" data-toggle="tab">Description</button></li>
				<li role="presentation"><button data-target="#tab-2" aria-controls="profile" role="tab" data-toggle="tab">Additional info</button></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="tab-1">{{{storeDescription}}}</div>
				<div role="tabpanel" class="tab-pane fade" id="tab-2">{{{addInformation}}} {{#if warranty}} <hr> {{/if}} {{{warranty}}}</div>
			</div>

		</div>


		<div data-view="ProductReviews.Center"></div>

		<div class="product-details-full-content-related-items">
			<div data-view="Related.Items"></div>
		</div>

		<div class="product-details-full-content-correlated-items">
			<!-- <div data-view="Correlated.Items"></div> -->
		</div>
		<div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
	</article>
</div>



{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.location (String)
	model.fulfillmentChoice (String)
	pageHeader (String)
	itemUrl (String)
	isItemProperlyConfigured (Boolean)
	isPriceEnabled (Boolean)

----}}
