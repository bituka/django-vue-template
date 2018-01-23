define('Warranty.Model'
,	[
		'Backbone.CachedModel'

	,	'underscore'
	,	'jQuery'
	,	'Utils'
	]
,	function(
		BackboneCachedModel

	,	_
	,	jQuery
	)
{
	'use strict';

	// @class ProductReviews.Model It returns a new instance of a Backbone CachedModel
	// initializes writer and rating per attribute if null or undefined
	// @extends Backbone.CachedModel
	return BackboneCachedModel.extend({
		urlRoot: _.getAbsoluteUrl('services/Warranty.Service.ss')
		// conditions for each of the fields to be valid
		// [Backbone.Validation](https://github.com/thedersen/backbone.validation)
	,	validation: {
			firstname: {
				required: true
			,	msg: _('First name is required').translate()
			}
		,	lastname: {
				required: true
			,	msg: _('Last name is required').translate()
			}
		,	email: {
				required: true
			,	msg: _('Email is required').translate()
        }

		,	phone: {
				required: true
			,	msg: _('Phone is required').translate()
        }

        ,	address1: {
				required: true
			,	msg: _('Address 1 is required').translate()
        }

		,	city: {
				required: true
			,	msg: _('City is required').translate()
        }

        ,	country: {
				required: true
			,	msg: _('Country is required').translate()
        }

		,	zipcode: {
				required: true
			,	msg: _('Zip is required').translate()
        }

		,	custevent_is_product_registered: {
				required: true
			,	msg: _('Is Product Registered? is required').translate()
        }

		,	custevent_purchase_date: {
				required: true
			,	msg: _('Purchase date is required').translate()
        }

		,	custevent_purchase_location_dealer: {
				required: true
			,	msg: _('Purchase Location/Dealer is required').translate()
        }

        ,	message: {
				required: true
			,	msg: _('Message is required').translate()
			}
		}	
	,	parse: function (response)
		{
			return response;
		}
	});
});