
define( 'CheckoutAdditionalFields.View',
  [
    'additional_fields.tpl',
    'Wizard.Module',
		'Profile.Model',
		'LiveOrder.Model',
    'jQuery',
    'underscore',
		'Backbone'],
    function (
        template
      , WizardModule
      , ProfileModel
      , LiveOrderModel
      , jQuery
      , _
      , Backbone
    )
      {

    return WizardModule.extend({

      template: template,

      submit : function(){

        // get ip address from session storage (setted on OrderWizard.Step.Extension)
        var customerIp = sessionStorage.getItem('customerIp');//this.getCustomerIP();
        if(customerIp && customerIp != '' && customerIp != null){
          var options1 = this.wizard.model.get('options');
          options1.custbody_ip_address = customerIp;
          this.wizard.model.set('options', options1);
        }

        var options2 = this.wizard.model.get('options');
        // get user browser
        options2.custbody_browser = navigator.userAgent;
        this.wizard.model.set('options', options2);

        this.profileModel = ProfileModel.getInstance();
        var log = this.profileModel.get('isLoggedIn');

        var purchase_order_number = this.$('#ponumber').val() || '';
        if(purchase_order_number != "") {
          this.wizard.model.set('purchasenumber', purchase_order_number);
        }
        var comments =  this.$('#notes-comments').val() || '';
        if(comments != "") {
          // Field 'Comments What amp will you use these in?
          var options = this.wizard.model.get('options');
          options.custbody_weborder_comments = comments;
          this.wizard.model.set('options', options);
        }

      }

    });
});
