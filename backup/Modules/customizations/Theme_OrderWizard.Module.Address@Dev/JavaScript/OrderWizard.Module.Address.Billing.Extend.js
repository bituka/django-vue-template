/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module OrderWizard
define('OrderWizard.Module.Address.Billing.Extend'
,	[
		'OrderWizard.Module.Address.Billing'
	,	'OrderWizard.Module.Address'
	,	'GlobalViews.Confirmation.View'

	,	'underscore'
	,	'Utils'
	]
,	function (
		OrderWizardModuleAddressBilling
	,	OrderWizardModuleAddress
	,	GlobalViewsConfirmationView

	,	_
	)
{
	'use strict';

	//@class OrderWizard.Module.Address.Billing @extend OrderWizard.Module.Address
	return _.extend(OrderWizardModuleAddressBilling.prototype, {
		events: _.extend(OrderWizardModuleAddressBilling.prototype.events, {
			'change [data-action="diff-as"]': 'markDiffAsHandler'
		,	'click [data-action="diff-as"]': 'markDiffAsHandler'
		,	'click [data-action="same-as"]': 'markSameAsHandler'
		})

	,	markSameAsHandler: function (e)
		{
			var target = jQuery(e.currentTarget)
			,	targetValue = target.attr('data-value')
			,	is_checked = targetValue === "1";

			this.markSameAs(is_checked);
		}

	,	markSameAs: _.wrap(OrderWizardModuleAddressBilling.prototype.markSameAs, function(fn, is_checked) {
			if (is_checked) {
				this.diffAs = !is_checked;
			}
			fn.apply(this, _.toArray(arguments).slice(1));
		})

	,	evaluateSameAs: _.wrap(OrderWizardModuleAddressBilling.prototype.evaluateSameAs, function(fn) {
			fn.apply(this, _.toArray(arguments).slice(1));
			if (this.sameAs) {
				this.diffAs = !this.sameAs;
			}
		})
	
	,	markDiffAsHandler: function(e) {
			var target = jQuery(e.currentTarget)
			,	targetValue = target.attr('data-value')
			,	is_checked = targetValue === "0";

			this.diffAs = is_checked;
			if (is_checked) {
				this.markSameAs(!is_checked);
			}
			else {
				this.render();
			}
		}

	,	getContext: _.wrap(OrderWizardModuleAddressBilling.prototype.getContext, function(fn) {
			var hasShippableLine = this.wizard.model.getShippableLines().length > 0;
			if (!this.diffAs && !this.addressId && this.address.isNew() && hasShippableLine) {
				this.markSameAs(true);
			}

			var context = fn.apply(this, _.toArray(arguments).slice(1));

			return _.extend(context, {
				showSingleAddressDetails: !!(!this.sameAs && this.addressId && !this.address.isNew()) || !!(this.getAddressesToShow().length && this.isGuest) || (this.addressId && !hasShippableLine)
			,	hideAddressDetailsEntry: !this.diffAs && hasShippableLine
			,	isDifferentSelected: !!this.diffAs || !this.sameAs
			});
		})
	});
});
