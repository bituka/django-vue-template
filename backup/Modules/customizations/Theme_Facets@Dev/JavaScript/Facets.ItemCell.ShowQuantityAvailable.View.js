define('Facets.ItemCell.ShowQuantityAvailable.View',
    [
          'QuantityPricing.Utils'
        , 'SC.Configuration'
        , 'Profile.Model'
        , 'Backbone'
        , 'facets_item_cell_quantity_avaiable.tpl'
    ]
    , function(
          QuantityPricingUtils
        , Configuration
        , ProfileModel
        , Backbone
        , facets_item_cell_quantity_avaiable_tpl
    )
    {
        'use strict';

        return Backbone.View.extend(
            {
                //@property {Function} template
                template: facets_item_cell_quantity_avaiable_tpl
                , initialize: function( options )
                {


                    this.profileModel = ProfileModel.getInstance();

                    this._isEnabled = !(Configuration.getRegistrationType() !== 'disabled' && SC.getSessionInfo('loginToSeePrices') && this.profileModel.get('isLoggedIn') !== 'T');

                    this.price_schedule = QuantityPricingUtils.rearrangeQuantitySchedule(this.model.get('item'), _.isFunction(this.model.getSelectedMatrixChilds) ? this.model.getSelectedMatrixChilds() : []);



                }

                //@property {Boolean} _isEnabled Boolean flag that shows if we are able to show this view
                ,	_isEnabled: false

                //@property {Boolean} _isOpen Boolean flag about if accordion is open or not.
                ,	_isOpen: false


                , getContext: function ()
                {

                    var showTable = this.price_schedule.is_visible;

                    return {
                        showContent : this._isEnabled && !!this.price_schedule && showTable

                    }
                }
            }
        );
    });
