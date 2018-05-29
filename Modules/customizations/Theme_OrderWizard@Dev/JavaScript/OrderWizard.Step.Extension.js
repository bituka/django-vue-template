// @module Facets
// addition to include custom Fields at PDP
define(
    'OrderWizard.Step.Extension',
    [
      'OrderWizard.Step',
      'LiveOrder.Model',
      'Backbone',
      'underscore'
    ],
    function(

      OrderWizardStep,
      LiveOrderModel,
      Backbone,
      _
    ) {
        'use strict';

        _.extend(OrderWizardStep.prototype, {

    			stepAdvance: function(e){

            /* Start - Customization: change currency from shipping address */
      			var url = window.location.href;
      			if(url.indexOf('#review') != -1) {
      				var liveOrderModel = LiveOrderModel.getInstance();
              var addresses = liveOrderModel.get('addresses').models;
              var country = '';
              for(var i=0; i<addresses.length; i++){
                if(addresses[i].attributes.defaultshipping == "T"){
                  country = addresses[i].attributes.country;
                }
              }
              var urlRedirect = url.substring(0,url.indexOf('&n=2'));
              if(country == "CA") {
                var urlDef = urlRedirect + "&n=2&cur=CAD#review";
                window.location.href = urlDef;
              }else{
                var urlDef = urlRedirect + "&n=2&cur=USD#review";
      					window.location.href = urlDef;
      				}
      			}
      			/* End - Customization: change currency from shipping address */

      			if (this.areAllModulesReady())
      			{
      				return this.isStepReady() || this.wizard.isPaypalComplete();
      			}

      			return false;
    			}

      });
});
