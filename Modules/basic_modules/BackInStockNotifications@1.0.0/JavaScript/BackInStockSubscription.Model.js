define('BackInStockSubscription.Model'
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
	return BackboneCachedModel.extend({
		urlRoot: _.getAbsoluteUrl('services/BackInStockSubscription.Service.ss')

	,	validation: {
			email: {
				required: true
			,	msg: _('Email is required').translate()
			}
		,	item: {
				required: true
			,	msg: _('Item is required').translate()
			}
    	},

	,	parse: function (response)
		{
			return response;
		}
	});
});