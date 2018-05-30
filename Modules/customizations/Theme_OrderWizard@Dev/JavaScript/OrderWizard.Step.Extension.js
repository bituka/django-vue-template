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

          present: function ()
          {
            /* Start - Customization: change currency from shipping address */
      			var url = window.location.href;
      			if (url.indexOf('#review') != -1 && LiveOrderModel.loadCart().state() === 'resolved') {

              LiveOrderModel.loadCart().done(function () {

                var liveOrderModel = LiveOrderModel.getInstance();
                

                var shippingAddress = liveOrderModel.get('addresses').findWhere({defaultshipping: 'T'});
                var country = shippingAddress && shippingAddress.get('country');

                var urlRedirect = url.substring(0,url.indexOf('&n=2'));
                if(country == "CA") {
                  urlRedirect = urlRedirect + "&n=2&cur=CAD#review";                  
                }else{
                  urlRedirect = urlRedirect + "&n=2&cur=USD#review";
                }

                if (urlRedirect != url)
                {
                  _.defer(function () {
                    console.log('Redirecting...');                  
                    window.location.href = urlRedirect;
                  });
                }               

              });      				
            }

            else {
              //console.log('Cart state: ', LiveOrderModel.loadCart().state());              
            }            
            
      			/* End - Customization: change currency from shipping address */
          }

      });
});
