define(
    'OrderWizard.Router.Extension',
    [
      'Wizard.Router',
      'OrderWizard.Router',
      'Profile.Model',
      'Backbone',
      'underscore'
    ],
    function(
      WizardRouter,
      OrderWizardRouter,
      ProfileModel,
      Backbone,
      _
    ) {
        'use strict';

      _.extend(OrderWizardRouter.prototype, {

        initialize: function ()
        {
          WizardRouter.prototype.initialize.apply(this, arguments);

          this.profileModel = ProfileModel.getInstance();

          var payment_methods = this.model.get('paymentmethods')
          ,	payment_method_credit_card = payment_methods.findWhere({type: 'creditcard'})
          ,	credit_card = payment_method_credit_card && payment_method_credit_card.get('creditcard');

          // remove temporal credit card.
          if (credit_card && credit_card.internalid === '-temporal-')
          {
            // DON'T REMOVE TEMP CC

            //payment_methods.remove(payment_method_credit_card);
          }

          if (this.application.getConfig('startCheckoutWizard') && !~_.indexOf(this.stepsOrder, ''))
          {
            this.route('', 'startWizard');
            this.route('?:options', 'startWizard');
          }
        }

      });
});
