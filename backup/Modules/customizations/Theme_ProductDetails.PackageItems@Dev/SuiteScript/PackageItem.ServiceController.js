// PackageItem.ServiceController.js
// ----------------
// Service to get Package Item's Group Items
define(
	'PackageItem.ServiceController'
,	[
		'ServiceController'
	,	'PackageItem.Model'
	]
,	function(
		ServiceController
	,	PackageItemModel
	)
	{
		'use strict';
		// @class Case.Fields.ServiceController Manage support case fields
		// @extend ServiceController
		return ServiceController.extend({

			// @property {String} name Mandatory for all ssp-libraries model
			name:'PackageItem.ServiceController'

			// @method get The call to Case.Fields.Service.ss with http method 'get' is managed by this function
			// @return {Case.Model} New Case record
		,	get: function()
			{
        var internalId = this.request.getParameter('internalid');
				return PackageItemModel.get(internalId);
			}
		});
	}
);
