{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<a class="parent-link clearfix" href="{{url}}">
<div class="facets-item-cell-grid" data-type="item" data-item-id="{{itemId}}" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/Product" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<meta itemprop="url" content="{{url}}"/>

	<div class="facets-item-cell-grid-image-wrapper">
		<!-- addition START BADGES -->
        {{#if badge}}
            {{{ badge }}}
        {{/if}}
        <!-- addition END BADGES -->
		<div class="facets-item-cell-grid-link-image">
			<img class="facets-item-cell-grid-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image"/>
		</div>
	</div>

	{{#if isBestSeller}}
		<div class="best-seller-layer">Best Seller</div>
	{{else}}
	<div class="best-seller-layer empty"></div>
	{{/if}}

	<div class="facets-item-cell-grid-details">
		<div class="facets-item-cell-grid-title">
			<span itemprop="name">{{name}}</span>
		</div>

		{{#if showRating}}
			<div class="facets-item-cell-grid-rating" itemprop="aggregateRating" itemscope="" itemtype="https://schema.org/AggregateRating" data-view="GlobalViews.StarRating">
			</div>

		{{/if}}
		<div class="list-counter">
		{{#if showRatingCount}}
			<span class="global-views-star-rating-review-total">

					{{#if ratingCountGreaterThan0}}
						<span class="global-views-star-rating-review-total-number" itemprop="reviewCount">({{ratingCount}}</span>
						{{#if hasOneReview}}
							<span class="global-views-star-rating-review-total-review">{{ translate ' Review'}})</span>
						{{else}}
							<span class="global-views-star-rating-review-total-review">{{ translate ' Reviews'}})</span>
						{{/if}}

					{{/if}}
			</span>
			{{else}}
				<span class="global-views-star-rating-review-total-empty-number" itemprop="reviewCount">({{ratingCount}})</span>
				<span class="global-views-star-rating-review-total-no-review">{{ translate ' No Reviews yet'}}</span>

		{{/if}}
		</div>


		{{#if showAvailability}}
		<p class="facets-item-cell-grid-availability">{{translate 'Availability:'}} <br>
				<span>{{translate 'Usually ships within 24 hours.'}}</span>
		</p>
		{{/if}}

		<!-- SKU
		<div class="item-details-sku-container">
			<span class="item-details-sku">
				{{translate 'SKU:'}}
			</span>
			<span class="item-details-sku-value" itemprop="sku">
				{{sku}}
			</span>
		</div> -->

		<!--<div class="facets-item-cell-grid-price" data-view="ItemViews.Price"></div>-->

		<div class="facets-item-cell-grid-price">

			<div data-view="ItemDetails.Options"></div>
			<div class="cells-item-price">
				<div class="uom-cell-price" data-view="Cart.QuickAddToCart"></div>
				<span class="uom-cell">{{unitOfMeasure}}</span>
			</div>
		</div>
		<div class="product-qty" data-view="Product.Quantity.Available"></div>
	<!--
		<div class="facets-item-cell-grid-stock">
			<div data-view="ItemViews.Stock" class="facets-item-cell-grid-stock-message"></div>
		</div>-->

		<!-- <div data-view="StockDescription"></div> -->

	</div>
</div>
</a>
{{!----
Use the following context variables when customizing this template:

	itemId (Number)
	name (String)
	url (String)
	sku (String)
	isEnvironmentBrowser (Boolean)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)
	itemIsNavigable (Boolean)
	showRating (Boolean)
	rating (Number)

----}}
