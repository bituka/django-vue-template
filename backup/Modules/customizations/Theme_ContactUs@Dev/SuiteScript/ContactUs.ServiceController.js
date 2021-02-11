define(
	'ContactUs.ServiceController'
,	[
		'ServiceController'
	,	'Application'
	,	'ContactUs.Model'
	]
,	function(
		ServiceController
	,	Application
	,	ContactUsModel
	)
	{
		'use strict';

		// @class ProductReviews.ServiceController Manage product review requests
		// @extend ServiceController
		return ServiceController.extend({

			// @property {String} name Mandatory for all ssp-libraries model
			name: 'ContactUs.ServiceController'

			// @method post The call to ProductReviews.Service.ss with http method 'post' is managed by this function
			// @return {StatusObject}
		,	post: function()
			{
				nlapiLogExecution('DEBUG', 'CONTACT US DATA', JSON.stringify(this.data));
				// Do not return here as we need to output the status 201
				this.sendContent(ContactUsModel.create(this.data), {'status': 201});
			}
		});
	}
);