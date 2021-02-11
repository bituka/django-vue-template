// @module Facets
// addition to include custom Fields at PDP
define(
    'OrderWizard.Step.Extension',
    [
      'Wizard.Step',
      'OrderWizard.Step',
      'LiveOrder.Model',
      'Backbone',
      'underscore',
      'Utils'
    ],
    function(
      WizardStep,
      OrderWizardStep,
      LiveOrderModel,
      Backbone,
      _,
      Utils
    ) {
        'use strict';

        _.extend(OrderWizardStep.prototype, {

          render: _.wrap(OrderWizardStep.prototype.render, function(fn){
            fn.apply(this, _.toArray(arguments).slice(1));

            this.changeCurrencyShippingAddress();
          })

          , addParameterToUrl: function (name, value, baseUrl)
          {
              var urlParts = '';
              if(baseUrl != '' && baseUrl != null){
                urlParts = baseUrl.split('#');
              }else{
                urlParts = window.location.href.split('#');
              }
              var urlBase = urlParts[0];
              var hash = urlParts[1];

             return _.setUrlParameter(urlBase, name, value) + (urlParts.length > 1 ? '#' + hash : '');

          }

          , changeCurrencyShippingAddress: function ()
          {
            /* Start - Customization: change currency from shipping address */
      			var url = window.location.href;
            var as = Utils.setUrlParameter(url, 'cur', 'CAD');
            this.getCustomerIP();
            debugger;
      			if (url.indexOf('#billing') >= 0 && LiveOrderModel.loadCart().state() === 'resolved' && url.indexOf('&one') == -1) {

              LiveOrderModel.loadCart().done(function () {

                var liveOrderModel = LiveOrderModel.getInstance();

                var pos1 = url.indexOf('&_ga=');
                if(pos1 == -1){
                  pos1 = url.indexOf('#');
                }

                var urlRedirect1 = url.substring(0, pos1);
                var urlRedirect2 = url.substring(pos1,url.indexOf('#billing'));

                var shippingAddress = liveOrderModel.get('addresses').findWhere({defaultshipping: 'T'});
                var country = shippingAddress && shippingAddress.get('country');

                // var urlRedirect = url.substring(0,url.indexOf('&n=2'));
                var urlRedirect = '';
                if(country == "CA") {
                  if(url.indexOf('cur=') == -1) {
                    urlRedirect = Utils.setUrlParameter(urlRedirect1, 'cur', 'CAD')
                    urlRedirect =  Utils.setUrlParameter(urlRedirect, 'one', 'one')
                    urlRedirect = urlRedirect.concat(urlRedirect2).concat('#billing')
                  }else{
                    urlRedirect = this.addParameterToUrl('cur', 'CAD', null);
                    urlRedirect = this.addParameterToUrl('one', 'one', urlRedirect);
                  }
                }else{
                  if(url.indexOf('cur=') == -1) {
                    urlRedirect = Utils.setUrlParameter(urlRedirect1, 'cur', 'US')
                    urlRedirect =  Utils.setUrlParameter(urlRedirect, 'one', 'one')
                    urlRedirect = urlRedirect.concat(urlRedirect2).concat('#billing')
                  }else{
                    urlRedirect = this.addParameterToUrl('cur', 'USD', null);
                    urlRedirect = this.addParameterToUrl('one', 'one', urlRedirect);
                  }
                }

                if (urlRedirect != url)
                {
                  _.defer(function () {
                    //console.log('Redirecting...');
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

          // get customer ip and storage on session storage
          , getCustomerIP: function(){

            $.getJSON('https://ipapi.co/json/', function(data) {
              console.log('- IP - ',data.ip);
              sessionStorage.setItem('customerIp', data.ip);
            });
          }

    });
});
