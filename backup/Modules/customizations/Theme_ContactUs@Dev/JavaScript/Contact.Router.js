/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module Home
define(
    'Contact.Router', [
        'Contact.Form.View', 'Backbone'
    ],
    function (ContactView, Backbone) {
        'use strict';

        // @lass Home.Router @extends Backbone.Router
        return Backbone.Router.extend({

            routes: {
                'contact-us': 'presentContactUs'
            },

            initialize: function (Application) {
                this.application = Application;
            },

            presentContactUs: function () {
                var view = new ContactView({
                    application: this.application
                });

                view.showContent();
            }
        });
    });