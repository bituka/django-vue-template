//@module Contact
define(
    'Contact.Form.View', [
        'SC.Configuration', 'Utilities.ResizeImage', 'Contact.Model', 'contact.tpl', 'GlobalViews.Message.View', 'Backbone', 'Backbone.CompositeView', 'Backbone.CollectionView', 'Backbone.FormView', 'jQuery', 'underscore', 'Utils'
    ],
    function (
        Configuration, resizeImage, ContactModel, contact_tpl, MessageView, Backbone, BackboneCompositeView, BackboneCollectionView, BackboneFormView, jQuery, _, Utils
    ) {
        'use strict';

        function buttonSubmitProgress(savingForm) {
            savingForm.find('[type="submit"]').each(function () {
                var element = jQuery(this);
                element.attr('disabled', true);
                element.data('default-text', jQuery.trim(element.text()));
                element.text(_('Processing...').translate());
            });
        }

        function buttonSubmitDone(savingForm) {
            savingForm.find('[type="submit"]').each(function () {
                var element = jQuery(this);
                element.attr('disabled', false);
                element.text(element.data('default-text'));
            });
        }

        //@module Home.View @extends Backbone.View
        return Backbone.View.extend({

            template: contact_tpl,
            title: _('Contact Us').translate(),
            page_header: _('Contact Us').translate(),
            attributes: {
                'id': 'contact-us-page',
                'class': 'contact-us-page'
            },
            events: {
                'submit form': 'createLead'
            },
            bindings: {
                '[name="subject"]': 'subject',
                '[name="firstname"]': 'firstname',
                '[name="lastname"]': 'lastname',
                '[name="company"]': 'company',
                '[name="email"]': 'email',
                '[name="message"]': 'message'
            },

            initialize: function (options) {
                BackboneCompositeView.add(this);
                this.application = options.application;
                this.model = new ContactModel();
                BackboneFormView.add(this);
            },
            customSaveForm: function (e) {

                jQuery('form .global-views-message').parent().remove();

                var promise = BackboneFormView.saveForm.apply(this, arguments),
                    self = this;

                e && e.preventDefault();

                return promise && promise.then(
                    function (success) {
                        if (success.successMessage) {
                            self.showMessage(success.successMessage, 'success');
                        } else {
                            self.showMessage('An error occured, please try again', 'error')
                        }
                    },
                    function (fail) {
                        fail.preventDefault = true;

                        _.each(fail.responseJSON.errorMessage, function (message, field) {
                            self.showMessage(message, 'error', field);
                        });
                    }
                );

                // if(this.model.isValid(true)){
                // 	promise && promise.done(function ()
                // 	{
                // 		// preview_review.showContent();
                // 	});

                // 	return promise;
                // } else {

                // }
            },
            // The function we use to actually generate the messages. It uses the global message view functionality, which is a simple of way of creating messages throughout the site, ensuring that they all look consistent. Depending on whether it is passed a field, it will generate the message either at that field's location, or simply at the bottom of the form.
            showMessage: function (message, type, field) {
                var messageView = new MessageView({
                    message: message,
                    type: type
                });

                if (typeof field !== 'undefined') {
                    this.application.getLayout().$('[data-input="' + field + '"]').append(messageView.render().$el);
                } else {
                    this.application.getLayout().$('#contact-us-form').append(messageView.render().$el);
                }
            },

            createLead: function (e) {
                //console.log("CREATE LEAD");
                e && e.preventDefault();
                var self = this,
                    data = {
                        firstname: this.$("input[name='firstname']").val(),
                        email: this.$("input[name='email']").val(),
                        lastname: this.$("input[name='lastname']").val(),
                        title: this.$('input[name="subject"]').val(),
                        custevent_tt_ordernumber: this.$('input[name="ordernumber"]').val(),
                        incomingmessage: this.$('textarea[name="message"]').val(),
                        phone: this.$('input[name="phone"]').val(),
                        url: "/app/site/crm/externalcasepage.nl",
                        type: "Customer", // do not change
                        h: "AACffht_iM_Up0zUTaY-5-tjdKtCyIiwrw8", // do not change
                        compid: "3538477", // do not change
                        formid: "5" // do not change
                    };
                this.$('#alert-container').text('').removeClass();
                if (this.isValidData(data)) {
                    buttonSubmitProgress(this.$('.contact-us-form-box'));
                    jQuery.post(data.url, data).done(function () {
                        self.$('#alert-container').text('Thank you for contacting us! You will receive an email shortly!').addClass('message-success');
                    }).always(function () {
                        buttonSubmitDone(self.$('.contact-us-form-box'));
                    });
                } else {
                    this.$('#alert-container').text('Please verify that the required fields are filled in correctly').addClass('message-error');
                }
            },

            isValidData: function (data) {
                var valid = true;
                if (data.firstname === '' || data.email === '' || data.title === '' || data.incomingmessage === '') {
                    valid = false;
                }
                // _.each(data, function (value, key) {
                //     if (!value) {
                        
                //     }
                // });
                return valid;
            },

            // @method getContext @return Home.View.Context
            getContext: function () {
                return {

                };
            }

        });
    });