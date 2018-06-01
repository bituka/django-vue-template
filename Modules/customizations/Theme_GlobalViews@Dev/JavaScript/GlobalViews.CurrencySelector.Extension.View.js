// @module Facets
// addition to include custom Fields at PDP
define(
    'GlobalViews.CurrencySelector.Extension.View',
    [
      'GlobalViews.CurrencySelector.View',
      'underscore',
      'Utils',
      'jQuery'
    ],
    function(
      GlobalViewsCurrencySelectorView ,
      _ ,
      Utils ,
      jQuery
    ) {
        'use strict';

        _.extend(GlobalViewsCurrencySelectorView.prototype, {


          setCurrency: function (e) {

              e.stopPropagation();

        			var currency_code = this.$(e.target).val()
        			,	selected_currency = _.find(SC.ENVIRONMENT.availableCurrencies, function (currency)
        				{
        					return currency.code === currency_code;
        				});

        			// window.location.href = Utils.addParamsToUrl(Session.get('touchpoints.'+Configuration.get('currentTouchpoint')), {cur: selected_currency.code});
        			var curerntUrl = window.location.href;
        			// remove 'cur' parameter
        			if(curerntUrl.indexOf('cur=') != -1){
        				var url1 = curerntUrl.slice(0, curerntUrl.indexOf('cur=')-1);
        				var auxposition = curerntUrl.indexOf('cur=') + 7;
        				var url2 = curerntUrl.slice(auxposition, curerntUrl.length);
        				curerntUrl = url1 + url2;
        			}
              // var nocacheparam = 't';
              // if(curerntUrl.indexOf('nocache=') == -1){
              //   window.location.href = Utils.addParamsToUrl(curerntUrl, {cur: currency_code, nocache: nocacheparam});
              // }else{
              //   // remove 'no cache param'
              //   curerntUrl = curerntUrl.slice(0, curerntUrl.indexOf('nocache=')-1)
              //   window.location.href = Utils.addParamsToUrl(curerntUrl, {cur: currency_code, nocache: nocacheparam});
              // }

              window.location.href = Utils.addParamsToUrl(curerntUrl, {cur: currency_code});
              // window.location.href = curerntUrl;

              return false;
        		}

        });
    });
