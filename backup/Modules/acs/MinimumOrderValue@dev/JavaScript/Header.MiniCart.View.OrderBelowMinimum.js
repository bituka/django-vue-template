/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Header
define(
	'Header.MiniCart.View.OrderBelowMinimum'
,	[
		'Header.MiniCart.View'
	,	'Header.View'
	,	'SC.Configuration'
	,	'MinimumOrderValue.Error.View'

	,	'Utils'
	,	'underscore'
	,	'Backbone'
	]
,	function (
		HeaderMiniCartView
	,	HeaderView
	,	Configuration
	,	MinimumOrderValueErrorView

	,	Utils
	,	_
	,	Backbone
	)
{
	'use strict';

	_.extend(HeaderView.prototype, {
		childViews: _.extend({}, HeaderView.prototype.childViews, {
			'Header.MiniCart': function()
			{
				return new HeaderMiniCartView({ application: this.options.application });
			}
		})
	});
	
	return _.extend(HeaderMiniCartView.prototype, {
		events: _.extend({}, HeaderMiniCartView.prototype.events, {
			'click [data-action="validate-min-order-value"]': 'validateMinOrderValue'
		})
	,	validateMinOrderValue: function(e) {
			var self = this;

			var total = this.model.get('summary').total
			,	minimumOrderValue = _.findWhere(Configuration.get('minimumOrderValue.Currencies'), { id: SC.ENVIRONMENT.currentCurrency.code });

			if (total < parseFloat(minimumOrderValue.value)) {
				e.preventDefault();

				var movErrorView = new MinimumOrderValueErrorView({
					body: _(Configuration.get('minimumOrderValue.errorMessage')).translate(SC.ENVIRONMENT.currentCurrency.symbol, minimumOrderValue.value)
				,	autohide: true
				});

				this.options.application.getLayout().showInModal(movErrorView);
				return false;
			}

			return true;
		}

	,	getContext: _.wrap(HeaderMiniCartView.prototype.getContext, function(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));

			if (Configuration.get('minimumOrderValue.enabled')) {
				

				// return _.extend(context, {
				// 	checkMinOrderValue: true
				// });
				context.checkMinOrderValue = true;
			}
			return context;
		})
	});

});