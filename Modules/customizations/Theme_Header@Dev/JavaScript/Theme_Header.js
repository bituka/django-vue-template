define('Theme_Header',
	['Header.View','Header.Simplified.View','Header.Menu.View','SiteSearch.View','Backbone','underscore','jQuery'],
	function Theme_Header(HeaderView,HeaderSimplifiedView,HeaderMenuView,SiteSearchView,Backbone,_,jQuery){

	_.extend(HeaderSimplifiedView.prototype,{
		render: _.wrap(HeaderSimplifiedView.prototype.render, function(fn){
			var app = this.options.application;
			if(app.getConfig('useSimplifyLayout')){
				app.getLayout().$('#layout').addClass('simplify-layout');
			}
			return fn.apply(this, _.toArray(arguments).slice(1));
		})
	});

	_.extend(SiteSearchView.prototype,{
		hideSiteSearch: function(){
			jQuery('[data-type="SiteSearch"]').slideUp();
		}
	});

	_.extend(HeaderView.prototype,{
		verifyShowSiteSearch: function ()
		{
			var hash = Backbone.history.getFragment() || '';
			hash = hash.indexOf('?') === -1 ? hash : hash.substring(0, hash.indexOf('?'));
			var is_home = hash === '' || hash === '/';

			if (_.getDeviceType() !== 'desktop' && is_home)
			{
				//this.showSiteSearch(null, true);
				this.hideSiteSearch();
			}
			else
			{
				// This hide sitesearch when navigate
				this.hideSiteSearch();
			}
		}
		,	showSiteSearch: function (ev)
		{
			ev && ev.preventDefault();

			// This add a class 'active' to change button color
			// this.$('[data-action="show-sitesearch"]').toggleClass('active');
			var self = this;

			this.$('[data-type="SiteSearch"]').stop(true, false).fadeToggle(function ()
			{
				// Set focus and cleans previous search
				self.getChildViewInstance('SiteSearch').showSiteSearch();
			});
		}
	});

	return {
		mountToApp: function(application){
			var Layout = application.getLayout();


			_.extend(Layout, {
				events: _.extend(Layout.events,{
					// 'click #layout': 'closeSearch',
					'shown.bs.dropdown .cms-menu':'cmsMenuToggle',
					'hidden.bs.dropdown .cms-menu':'cmsMenuToggle'
				}),
				cmsMenuToggle: function(e){
					if(parent.location.pathname == "/cms/2/admin/cms.jsp"){
						if(e.type == 'shown'){
							this.$('#main-container,#site-footer').fadeOut(function(){
								CMS.trigger("adapter:page:changed");
							})
						}else{
							this.$('#main-container,#site-footer').show();
							_.delay(function(){
								Backbone.history.loadUrl();
							},500);
						}
					}
				},
				closeSearch: function(e){
					var $el = jQuery(e.target);

					if(!$el.closest('.header-secondary-section').length){
						// this.$('[data-action="show-sitesearch"]').removeClass('active');
						this.$('[data-type="SiteSearch"]').stop(true, false).fadeOut();
					}
				}
			});
		}
	}


});
