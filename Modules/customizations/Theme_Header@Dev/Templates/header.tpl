{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="header-message" data-type="message-placeholder"></div>
<div class="header-main-wrapper">
    {{#if showLanguagesOrCurrencies}}
    <div class="header-subheader">
        <div class="header-subheader-container">
            <ul class="header-subheader-options">
                <li class="header-subheader-settings">
                    <a href="#" class="header-subheader-settings-link" data-toggle="dropdown" title="{{translate 'Settings'}}">
                        <i class="header-menu-settings-icon"></i>
                        <i class="header-menu-settings-carret"></i>
                    </a>
                    <div class="header-menu-settings-dropdown">
                        <h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
                        {{#if showLanguages}}
                            <div data-view="Global.HostSelector"></div>
                        {{/if}}
                        {{#if showCurrencies}}
                            <div data-view="Global.CurrencySelector"></div>
                        {{/if}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
    {{/if}}
	<div class="header-cms-top-message" data-cms-area="header_top-message" data-cms-area-filters="global"></div>

	<div class="header-main-nav">

		<div class="header-content">

			<div class="header-left-section" data-cms-area="header_top-left-section" data-cms-area-filters="global">
				
			</div>

			<div class="header-right-menu">
                <ul class="header-menu-actions">
                    <li data-view="StoreLocatorHeaderLink"></li>
					<li class="separator"> | </li>
                    <li data-view="RequestQuoteWizardHeaderLink"></li>
					<li class="separator"> | </li>
					<li data-view="QuickOrderHeaderLink"></li>
					<li class="separator"> | </li>
					<li><a data-touchpoint="customercenter" data-hashtag="#reorderItems">EASY REORDER</a></li>
					<li class="separator"> | </li>
                </ul>
				<div class="header-menu-profile" data-view="Header.Profile">
				</div>

				<div class="header-menu-cart">
					<div class="header-menu-cart-dropdown" >
						<div data-view="Header.MiniCart"></div>
					</div>
				</div>
			</div>
		</div>

	</div>

</div>

<div class="header-secondary-section">

	<!-- Start Mobile Toggle  -->
	<div class="header-sidebar-toggle-wrapper">
		<button class="header-sidebar-toggle" data-action="header-sidebar-show">
			<i class="header-sidebar-toggle-icon"></i>
		</button>
	</div>
	<!-- End Mobile Toggle -->

	<div class="header-logo-wrapper">
		<div data-view="Header.Logo"></div>
	</div>

	<!-- Start Search Mobile -->
	<div class="header-menu-searchmobile">
		<button class="header-menu-searchmobile-link" data-action="show-sitesearch" title="{{translate 'Search'}}">
			<i class="header-menu-searchmobile-icon"></i>
		</button>
	</div>

	<div class="header-menu-search-dsk">
		<!-- Start Main Menu -->
		<div class="header-secondary-wrapper" data-view="Header.Menu" data-phone-template="header_sidebar" data-tablet-template="header_sidebar"></div>

		<!-- Start Search Desktop -->
		<div class="header-menu-search">
			<button class="header-menu-search-link" data-action="show-sitesearch" title="{{translate 'Search'}}">
				<i class="header-menu-search-icon"></i>
			</button>
		</div>
		<!-- End Search Desktop -->
	</div>

	<div class="header-site-search" data-view="SiteSearch" data-type="SiteSearch"></div>

</div>

<div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>
