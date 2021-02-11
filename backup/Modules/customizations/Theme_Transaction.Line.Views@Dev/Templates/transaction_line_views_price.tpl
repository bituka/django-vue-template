{{#if showPrice}}
	{{#if isPriceEnabled}}
	<div class="transaction-line-views-price">
		<span class="transaction-line-views-price-exact" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
			<meta itemprop="priceCurrency" content="{{currencyCode}}"/>
			<span class="transaction-line-views-price-lead" itemprop="price" data-rate="{{price}}">
				{{rateFormatted}}
		</span>
			{{#if showComparePrice}}
				<small class="transaction-line-views-price-old">
					{{comparePriceFormatted}}
				</small>
			{{/if}}
			<link itemprop="availability" href="{{#if isInStock}}https://schema.org/InStock{{else}}https://schema.org/OutOfStock{{/if}}"/>
		</span>
	</div>
	{{else}}
		<div class="transaction-line-views-price-login-to-see-prices">
			<p class="transaction-line-views-price-message">
				{{translate '<a href="$(0)">Log in</a> to see price' urlLogin}}
			</p>
		</div>
	{{/if}}
{{/if}}

