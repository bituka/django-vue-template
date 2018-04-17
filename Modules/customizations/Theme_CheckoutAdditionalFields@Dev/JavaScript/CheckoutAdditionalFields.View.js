
define( 'CheckoutAdditionalFields.View',
  [
    'additional_fields.tpl',
    'Wizard.Module',
		'Profile.Model',
		'LiveOrder.Model',
		'Backbone'],
    function (
        template
      , WizardModule
      , ProfileModel
      , LiveOrderModel
      , Backbone
    )
      {

    return WizardModule.extend({

      template: template,

      submit : function(){

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
