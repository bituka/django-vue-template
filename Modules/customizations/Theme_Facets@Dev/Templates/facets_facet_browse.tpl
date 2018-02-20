{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<section class="facets-facet-browse">
	{{#if showResults}}

		<div class="facets-facet-browse-content">

				<div class="facets-facet-browse-facets" data-action="pushable" data-id="product-search-facets">

					<div data-cms-area="facet_navigation_top" data-cms-area-filters="page_type"></div>

					{{#if isCategory}}
						<div data-view="Facets.CategorySidebar" class="facets-facet-browse-facets-sidebar"></div>
					{{/if}}

					<div data-view="Facets.FacetedNavigation" data-exclude-facets="commercecategoryname,category"></div>

					<div data-cms-area="facet_navigation_bottom" data-cms-area-filters="page_type"></div>
				</div>

				<!--
				Sample of how to add a particular facet into the HTML. It is important to specify the data-facet-id="<facet id>"
				properly <div data-view="Facets.FacetedNavigation.Item" data-facet-id="custitem1"></div>
				 -->

			<div class="facets-facet-browse-results">

        {{#if isCategory}}
            <div class="facets-facet-browse-category">
                <div data-view="Facets.Browse.CategoryHeading"></div>
                <div data-view="Facets.CategoryCells"></div>
            </div>
        {{/if}}

				<header class="facets-facet-browse-header">
					<div class="facet-header">
						<h1 class="facets-facet-browse-title" data-quantity="{{total}}">
							{{#if keywords}}
								{{#if isTotalProductsOne}}
									{{translate '1 Result for <span class="facets-facet-browse-title-alt">$(0)</span>' keywords}}
								{{else}}
									{{translate '$(0) Results for <span class="facets-facet-browse-title-alt">$(1)</span>' total keywords}}
								{{/if}}
							{{else}}
								{{#if isTotalProductsOne}}
									{{translate '1 Product'}}
								{{else}}
								{{#if hasItemsAndFacets}}
									{{translate '<span class="facets-facet-number-products">$(0)</span> Products' total}}
{{/if}}
								{{/if}}
							{{/if}}

						</h1>

							{{#if hasItemsAndFacets}}
							<div class="facets-facet-browse-list-header-actions" data-view="Facets.ItemListDisplaySelector"></div>
							{{/if}}
					</div>
					<nav class="facets-facet-browse-list-header">

						<div class="facets-facet-browse-list-header-expander">
							<button class="facets-facet-browse-list-header-expander-button collapsed" data-toggle="collapse" data-target="#list-header-filters" aria-expanded="true" aria-controls="list-header-filters">
								{{translate 'Sort & Filter'}}
								<i class="facets-facet-browse-list-header-expander-icon"></i>
							</button>
						</div>

						<div class="facets-facet-browse-list-header-filters collapse" id="list-header-filters">
							<div class="facets-facet-browse-list-header-filters-wrapper">

								<div class="facets-facet-browse-list-header-filters-row">

									{{#if hasItemsAndFacets}}
									<div class="facets-facet-browse-list-header-filter-column">
										<button class="facets-facet-browse-list-header-filter-facets" data-type="sc-pusher" data-target="product-search-facets">
											{{translate 'Narrow By'}}
											<i class="facets-facet-browse-list-header-filter-facets-icon"></i>
										</button>
									</div>
									<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListSortSelector"></div>
							<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListShowSelector"></div>

									{{/if}}
								</div>

							</div>
						</div>
					</nav>

				</header>

				<meta itemprop="name" content="{{title}}"/>

				<div class="facets-facet-browse-narrowedby" data-view="Facets.FacetsDisplay">
				</div>

				{{#if isEmptyList}}
					<div data-view="Facets.Items.Empty">
					</div>
				{{else}}
					<div class="facets-facet-browse-items" data-view="Facets.Items">
					</div>
				{{/if}}


				<!-- Category Description Extra Field -->
				<section class="facets-facet-browse-results facets-extra-description-field">
					<div class="facets-extra-description-field">
						<div data-cms-area="facets_extradescription" data-cms-area-filters="path"></div>
					</div>
				</section>

		</div>

		<div class="facets-facet-browse-pagination" data-view="GlobalViews.Pagination">
		</div>
	{{else}}
		<div class="facets-facet-browse-empty-items" data-view="Facets.Items.Empty">
		</div>
	{{/if}}




</section>
