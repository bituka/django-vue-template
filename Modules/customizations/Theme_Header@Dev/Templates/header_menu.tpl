{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<nav class="header-menu-secondary-nav">
	<ul class="header-menu-level1 clearfix">
		<!--<li><a class="header-menu-level1-anchor" href="/" data-hashtag="#/" data-touchpoint="home">HOME</a></li>
		<li><a class="header-menu-level1-anchor" href="/search" data-hashtag="#/">SHOP</a></li>-->
		{{#each categories}}
			{{#if text}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}}>
					<a class="{{class}}" {{objectToAtrributes this}}>
					{{translate text}}
					</a>
					{{#if categories}}
					<ul class="header-menu-level-container">
						<li>
							<ul class="header-menu-level2">
								{{#each categories}}
								<li class="leveltwo">
									<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
									{{#if categories}}
									<ul class="header-menu-level3">
										{{#each categories}}
										<li class="levelthree">
											<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
										</li>
										{{/each}}
									</ul>
									{{/if}}
								</li>
								{{/each}}
							</ul>
						</li>
						<!--<li class="header-menu-banner" data-cms-area="header-menu-banner-image{{menuClass}}-1" data-cms-area-filters="global"></li>
						<li class="header-menu-banner" data-cms-area="header-menu-banner-image{{menuClass}}-2" data-cms-area-filters="global"></li>-->
					</ul>
					{{/if}}
				</li>
				<li class="separator">|</li>
			{{/if}}
		{{/each}}
		<li data-toggle="categories-menu"><a class="header-menu-level1-anchor" href="/resources" data-hashtag="#resources" data-touchpoint="home">Resources</a></li>

	</ul>

</nav>
