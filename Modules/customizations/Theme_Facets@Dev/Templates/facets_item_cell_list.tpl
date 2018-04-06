{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<a class="parent-link clearfix" href="{{url}}">
<div class="facets-item-cell-list" itemprop="itemListElement"  data-item-id="{{itemId}}" itemscope itemtype="https://schema.org/Product" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<div class="facets-item-cell-list-left">
		<div class="facets-item-cell-list-image-wrapper">
			{{#if itemIsNavigable}}
			<!-- addition START BADGES -->
			{{#if badge}}
				{{{ badge }}}
			{{/if}}
			<!-- addition END BADGES -->
				<div class="facets-item-cell-list-anchor">
					<img class="facets-item-cell-list-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image">
				</div>
			{{else}}
			<!-- addition START BADGES -->
			{{#if badge}}
				{{{ badge }}}
			{{/if}}
			<!-- addition END BADGES -->
				<img class="facets-item-cell-list-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image">
			{{/if}}
		</div>
	</div>
	<div class="facets-item-cell-list-right">
		<meta itemprop="url" content="{{url}}">
		<h2 class="facets-item-cell-list-title">
			{{#if itemIsNavigable}}
				<div class="facets-item-cell-list-name" >
					<span itemprop="name">
						{{name}}
					</span>
				</div>
			{{else}}
				<span itemprop="name">
					{{name}}
				</span>
			{{/if}}
		</h2>

		{{#if isBestSeller}}
			<div class="best-seller-layer">Best Seller</div>
		{{/if}}
		{{#if showRating}}
		<div class="facets-item-cell-list-rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"  data-view="GlobalViews.StarRating">
		</div>
		{{/if}}
		<div>
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
		<p class="facets-item-cell-list-availability">{{translate 'Availability:'}} <br>
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

		<div class="facets-item-cell-list-price">
			<div data-view="ItemViews.Price"></div>

			<div data-view="ItemDetails.Options"></div>
			<div class="cells-item-price">
				<div data-view="Cart.QuickAddToCart"></div>
				<span class="uom-cell">{{unitOfMeasure}}</span>
			</div>
		</div>
		<div data-view="Product.Quantity.Available"></div>

		<div class="facets-item-cell-list-stock">
			<div data-view="ItemViews.Stock" class="facets-item-cell-list-stock-message"></div>
		</div>

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
