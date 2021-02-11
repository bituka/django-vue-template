define(
	'CMSOnSecure.ServiceController'
,	[
		'ServiceController'
	,	'Application'
	,	'CMSOnSecure.Model'
	]
,	function(
		ServiceController
	,	Application
	,	CMSOnSecureModel
	)
	{
		'use strict';
		return ServiceController.extend({

			name:'CMSOnSecure.ServiceController'

		,	get: function()
			{
				return CMSOnSecureModel.get();
			}
		});
	}
);