/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Cart
define('Cart.Summary.View.OrderBelowMinimum'
,	[	'Cart.Summary.View'
	,	'SC.Configuration'
	,	'MinimumOrderValue.Error.View'

	,	'Utils'
	,	'underscore'
	,	'Backbone'
	]
,	function (
		CartSummaryView
	,	Configuration
	,	MinimumOrderValueErrorView

	,	Utils
	,	_
	,	Backbone
	)
{
	'use strict';

	return _.extend(CartSummaryView.prototype, {

		events: _.extend({}, CartSummaryView.prototype.events, {
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

	,	getContext: _.wrap(CartSummaryView.prototype.getContext, function(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));

			if (Configuration.get('minimumOrderValue.enabled')) {
				return _.extend(context, {
					checkMinOrderValue: true
				});
			}

			return context;
		})
	});
});
