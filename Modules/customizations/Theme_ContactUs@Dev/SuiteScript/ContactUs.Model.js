/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// ProductReviews.Model.js
// ----------------
// Handles creating, fetching and updating ProductReviews
define(
	'ContactUs.Model'
,	[
		'SC.Model'
	,	'SC.Models.Init'
	,	'Application'
	,	'Utils'
	,	'underscore'
	]
,	function (
		SCModel
	,	ModelsInit
	,	Application
	,	Utils
	,	_
	)
{
	'use strict';

	return SCModel.extend({
		name: 'ContactUs'
		// ## General settings

	,	create: function (data)
		{

			var firstname, lastname, email, message;

			if (data.firstname){
				firstname = Utils.sanitizeString(data.firstname);
			}

			if (data.email){
				email = Utils.sanitizeString(data.email);
			}

			if (data.lastname){
				lastname = Utils.sanitizeString(data.lastname);
			}

			if(data.message) {
				message = Utils.sanitizeString(data.message);
				message = message.replace(/\n/g, '<br>');
			}

			var dataToSend   = "Contact Name  : " +  firstname + " " + lastname + "\n";
			dataToSend      += "Contact Email : " + email + "\n";;
			dataToSend      += "Message       : " + message + "\n";


			var sender 		= SC.Configuration.contactus.sender;
			var recipient   = SC.Configuration.contactus.recipient;
			var subject 	= SC.Configuration.contactus.subject;
			var out = {
				code: "ERROR"
			};

			nlapiLogExecution("DEBUG", "SENDER", sender);
			nlapiLogExecution("DEBUG", "recipient", recipient);
			nlapiLogExecution("DEBUG", "subject", subject);

			try{
				var url = nlapiResolveURL("SUITELET", "customscript_tt_handle_contact_us", "customdeploy_tt_handle_contact_us", true);

				var postdata = {
					sender: sender,
					recipient: recipient,
					subject : subject,
					message : message,
					email : email
				};

				nlapiRequestURL(url, postdata, null, "POST");

				nlapiLogExecution('DEBUG', 'URL', url);
				// nlapiSendEmail(sender, recipient, subject, dataToSend, null ,null ,null ,null ,false ,false , email);
				out.code = 'OK';
			} catch(e) {
				nlapiLogExecution('DEBUG', 'EXCEPTION', e);
				out.code = "ERROR";
			}

			return out;
		}
	});
});
