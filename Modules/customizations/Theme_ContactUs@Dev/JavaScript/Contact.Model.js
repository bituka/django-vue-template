
define('Contact.Model'
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
		urlRoot: _.getAbsoluteUrl('services/ContactUs.Service.ss')
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