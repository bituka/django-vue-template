// @module Facets
// addition to include custom Fields at PDP
define(
    'GlobalViews.CurrencySelector.Extension.View',
    [
      'GlobalViews.CurrencySelector.View',
      'underscore',
      'Utils',
      'Profile.Model',
      'jQuery',
      'OrderHistory.List.Tracking.Number.View',
      'Backbone.CollectionView',
      'Handlebars',
      'RecordViews.View'
    ],
    function(
      GlobalViewsCurrencySelectorView ,
      _ ,
      Utils ,
      ProfileModel,
      jQuery,
      OrderHistoryListTrackingNumberView,
      BackboneCollectionView,
      Handlebars,
      RecordViewsView
    ) {
        'use strict';

        _.extend(GlobalViewsCurrencySelectorView.prototype, {


            events: {
              'change select[data-toggle="currency-selector"]' : 'setCurrency'
              // ,'mouseover select[data-toggle="currency-selector"]' : 'currencySelectorHover'
              ,	'click select[data-toggle="currency-selector"]' : 'currencySelectorClick'
        		}

          //  , initialize: function (e) {

          //     if(SC.isPageGenerator()){
          //         return;
          //     }
          //     debugger;
          //     var profileModel = ProfileModel.getInstance();
          //     var currency = profileModel.get('currency');
          //     if(currency && currency.code){
          //       setTimeout(function(){
          //         $('.global-views-currency-selector-select').val(currency.code);
          //         console.log('set currency:', currency.code);
          //       }, 1000);
          //     }
          //  }

           , setCurrency: function (e) {

              e.stopPropagation();
              debugger;
        			var currency_code = this.$(e.target).val()
        			,	selected_currency = _.find(SC.ENVIRONMENT.availableCurrencies, function (currency)
        				{
        					return currency.code === currency_code;
        				});

        			var curerntUrl = window.location.href;
              var urlRedirect = '';
              // remove auxiliary parameter from checkout
              curerntUrl = this.removeParam('one', curerntUrl);

        			if(curerntUrl.indexOf('cur=') != -1){
                urlRedirect = this.addParameterToUrl('cur', currency_code);
        			}else{
                urlRedirect = Utils.addParamsToUrl(curerntUrl, {cur: currency_code});
              }

              window.location.href = urlRedirect;
              return false;
        		}

            , addParameterToUrl: function (name, value)
            {
              debugger;
                var urlParts = window.location.href.split('#');
                var urlBase = urlParts[0];
                var hash = urlParts[1];

               return _.setUrlParameter(urlBase, name, value) + (urlParts.length > 1 ? '#' + hash : '');

            }

            , removeParam: function (key, sourceURL) {
              debugger;
                var rtn = sourceURL.split("?")[0],
                    param,
                    params_arr = [],
                    queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
                if (queryString !== "") {
                    params_arr = queryString.split("&");
                    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                        param = params_arr[i].split("=")[0];
                        if (param === key) {
                            params_arr.splice(i, 1);
                        }
                    }
                    rtn = rtn + "?" + params_arr.join("&");
                }
                return rtn;
             }

              // FUNCTION TO DISABLE CURRENCY (for customers with orders registered)
            ,	currencySelectorHover: function ()
          		{
          			// //e.stopPropagation();
                // var profileModel = ProfileModel.getInstance();
                // var hasOrders = localStorage.getItem('hasOrders');
                // console.log('hover-profileModel: ', JSON.stringify(profileModel));
                //
                // if(profileModel.attributes.isLoggedIn == 'T' && hasOrders && hasOrders == 'true' ) {
                //   var currencyCode = profileModel.attributes.currency.code;
                //   var aux = '';
                //   if(currencyCode == "CAD"){
                //     aux = '.global-views-currency-selector-select option[value="USD"]';
                //     // console.log('disable USD');
                //   }else{
                //     aux = '.global-views-currency-selector-select option[value="CAD"]';
                //     // console.log('disable CAD');
                //   }
                //   $(aux).attr('disabled', 'disabled');
                // }
                // else{
                //   console.log('disable nothing');
                // }

                // this.test();
          		}

            , test: function() {

        				// var self = this
        				// ,	records_collection = new Backbone.Collection(this.collection.map(function (order)
        				// 	{
        				// 		var dynamic_column;
                //
        				// 		if (self.isSCISIntegrationEnabled)
        				// 		{
        				// 			dynamic_column = {
        				// 				label: _('Origin:').translate()
        				// 			,	type: 'origin'
        				// 			,	name: 'origin'
        				// 			,	value: _.findWhere(Configuration.get('transactionRecordOriginMapping'), { origin: order.get('origin') }).name
        				// 			};
        				// 		}
        				// 		else
        				// 		{
        				// 			dynamic_column = {
        				// 				label: _('Status:').translate()
        				// 			,	type: 'status'
        				// 			,	name: 'status'
        				// 			,	value: order.get('status').name
        				// 			};
        				// 		}
                //
        				// 		var columns = [
        				// 			{
        				// 				label: _('Date:').translate()
        				// 			,	type: 'date'
        				// 			,	name: 'date'
        				// 			,	value: order.get('trandate')
        				// 			}
        				// 		,	{
        				// 				label: _('Amount:').translate()
        				// 			,	type: 'currency'
        				// 			,	name: 'amount'
        				// 			,	value: order.get('amount_formatted')
        				// 			}
        				// 		,	{
        				// 				type: 'tracking-number'
        				// 			,	name: 'trackingNumber'
        				// 			,	compositeKey: 'OrderHistoryListTrackingNumberView'
        				// 			,	composite: new OrderHistoryListTrackingNumberView({
        				// 					model: new Backbone.Model({
        				// 						trackingNumbers: order.get('trackingnumbers')
        				// 					})
        				// 				,	showContentOnEmpty: true
        				// 				,	contentClass: ''
        				// 				,	collapseElements: true
        				// 				})
        				// 			}
        				// 		];
                //
        				// 		columns.splice(2, 0, dynamic_column);
                //
        				// 		var model = new Backbone.Model({
        				// 			title: new Handlebars.SafeString(_('<span class="tranid">$(0)</span>').translate(order.get('tranid')))
        				// 		,	touchpoint: 'customercenter'
        				// 		,	detailsURL: '/purchases/view/' + order.get('recordtype')  + '/' + order.get('internalid')
        				// 		,	recordType: order.get('recordtype')
        				// 		,	id: order.get('internalid')
        				// 		,	internalid: order.get('internalid')
        				// 		,	trackingNumbers: order.get('trackingnumbers')
        				// 		,	columns: columns
        				// 		});
                //
        				// 		return model;
        				// 	}));
                //
        				// // CURRENCY SELECTOR FIX
                // this.profileModel = ProfileModel.getInstance();
                // if(records_collection){
        				// 	localStorage.setItem('hasOrders', 'true');
                //   this.profileModel.set('hasOrders', 'true').save();
        				// }else{
                //   localStorage.setItem('hasOrders', 'false');
                //   this.profileModel.set('hasOrders', 'false').save();
                // }
                //
        				// return new BackboneCollectionView({
        				// 	childView: RecordViewsView
        				// ,	collection: records_collection
        				// ,	viewsPerRow: 1
        				// });
            }

        });
    });
