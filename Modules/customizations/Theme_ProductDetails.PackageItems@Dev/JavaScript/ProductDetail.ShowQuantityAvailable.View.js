define('ProductDetail.ShowQuantityAvailable.View',
    [
          'QuantityPricing.Utils'
        , 'SC.Configuration'
        , 'Backbone'
        , 'product_detail_quantity_avaiable.tpl'
    ]
    , function(
          QuantityPricingUtils
        , Configuration
        , Backbone
        , product_detail_quantity_avaiable_tpl
    )
    {
        'use strict';

        return Backbone.View.extend(
            {
                //@property {Function} template
                template: product_detail_quantity_avaiable_tpl
                , initialize: function( options ){
                    this.model = options.model;
                    this._isEnabled = !(Configuration.getRegistrationType() !== 'disabled' && SC.getSessionInfo('loginToSeePrices') && this.profileModel.get('isLoggedIn') !== 'T');

                    this.price_schedule = QuantityPricingUtils.rearrangeQuantitySchedule(this.model.get('item'), _.isFunction(this.model.getSelectedMatrixChilds) ? this.model.getSelectedMatrixChilds() : []);


                }

                , getContext: function ()
                {
                    var model = this.model


                    return {
                        showContent : this._isEnabled && !!this.price_schedule

                    }
                }
            }
        );
    });
