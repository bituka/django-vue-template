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
    'ContactUs.Model', [
        'SC.Model', 'SC.Models.Init', 'Application', 'Utils', 'underscore'
    ],
    function (
        SCModel, ModelsInit, Application, Utils, _
    ) {
        'use strict';

        return SCModel.extend({
            name: 'ContactUs',
            create: function (data) {

                var subjectField, firstname, lastname, company, email, message;

                if (data.subject) {
                    subjectField = Utils.sanitizeString(data.subject);
                }

                if (data.firstname) {
                    firstname = Utils.sanitizeString(data.firstname);
                }

                if (data.company) {
                    company = Utils.sanitizeString(data.company);
                }

                if (data.email) {
                    email = Utils.sanitizeString(data.email);
                }

                if (data.lastname) {
                    lastname = Utils.sanitizeString(data.lastname);
                }

                if (data.message) {
                    message = Utils.sanitizeString(data.message);
                    message = message.replace(/\n/g, '<br>');
                }

                var dataToSend = "Subject  : " + subjectField + "\n";
                dataToSend += "Contact Name  : " + firstname + " " + lastname + "\n";
                dataToSend += "Company Name : " + company + "\n";
                dataToSend += "Contact Email : " + email + "\n";
                dataToSend += "Message       : " + message + "\n";

                var sender = SC.Configuration.contactus.sender;
                var recipient = SC.Configuration.contactus.recipient;
                var subject = SC.Configuration.contactus.subject;
                var out = {
                    code: "ERROR"
                };

                nlapiLogExecution("DEBUG", "SENDER", sender);
                nlapiLogExecution("DEBUG", "recipient", recipient);
                nlapiLogExecution("DEBUG", "subject", subject);
                nlapiLogExecution("DEBUG", "DATA", dataToSend);

                try {
                    var url = nlapiResolveURL("SUITELET", "customscript_tt_handle_contact_us", "customdeploy_tt_handle_contact_us", true);

                    var postdata = {
                        sender: sender,
                        recipient: recipient,
                        subject: subject,
                        message: message,
                        email: email,
                        dataToSend: dataToSend
                    };

                    var response = nlapiRequestURL(url, postdata, null, "POST");
                    nlapiLogExecution('DEBUG', 'URL', url);

                    var responseCode = parseInt(response.getCode(), 10);

                    // Just in case someday it accepts the redirect. 206 is netsuite error ('partial content')
                    if (responseCode === 200 || responseCode === 302 || responseCode === 201 || responseCode === 404) {
                        return {
                            successMessage: 'Your request has been submitted, we will get back to you within 24 hours.'
                        }
                    }
                    // nlapiSendEmail(sender, recipient, subject, dataToSend, null ,null ,null ,null ,false ,false , email);
                    out.code = 'OK';
                } catch (e) {
                    nlapiLogExecution('DEBUG', 'EXCEPTION', e);
                    out.code = "ERROR";
                    // The 'successful' exception is a redirect error, so let's intercept that
                    if (e instanceof nlobjError && e.getCode().toString() === 'ILLEGAL_URL_REDIRECT') {
                        return {
                            successMessage: 'Your request has been submitted, we will get back to you within 24 hours.'
                        }
                    }

                    // Finally, let's catch any other error that may come
                    return {
                        status: 500,
                        code: 'ERR_FORM',
                        message: 'There was an error submitting the form, please try again later'
                    }
                }

                return out;
            }
        });
    });