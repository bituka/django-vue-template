define(
   'OrderWizard.Module.Shipmethod.Extension'
,   [

      'OrderWizard.Module.Shipmethod'

   ,   'jQuery'
   ,   'underscore'
   ,   'Backbone.PluginInstaller'
   ]

,   function (
      OrderWizardModuleShipmethod

   ,   jQuery
   ,   _
   )

{

   'use strict';

    _.extend(OrderWizardModuleShipmethod.prototype,
    {
        shipAddressChange: function (model, value)
        {
            this.currentAddress = value;

            var order_address = this.model.get('addresses')
            ,   previous_address = this.previousAddress && (order_address.get(this.previousAddress) || this.addresses.get(this.previousAddress))
            ,   current_address = this.currentAddress && order_address.get(this.currentAddress) || this.addresses.get(this.currentAddress)
            ,   changed_zip = previous_address && current_address && previous_address.get('zip') !== current_address.get('zip')
            ,   changed_state = previous_address && current_address && previous_address.get('state') !== current_address.get('state')
            ,   changed_country = previous_address && current_address && previous_address.get('country') !== current_address.get('country');

            // if previous address is equal to current address we compare the previous values on the model.
            if (this.previousAddress && this.currentAddress && this.previousAddress === this.currentAddress)
            {
                changed_zip = current_address.previous('zip') !== current_address.get('zip');
                changed_country = current_address.previous('country') !== current_address.get('country');
                changed_state = current_address.previous('state') !== current_address.get('state');
            }

            // reload ship methods only if there is no previous address or when change the country or zipcode
            if ((!previous_address && current_address) || changed_zip || changed_country || changed_state)
            {
                // if its selected a valid address, reload Methods
                if (this.model.get('isEstimating') || this.addresses.get(this.model.get('shipaddress')))
                {
                    this.reloadMethods();
                }
            }
            else
            {
                this.render();
            }

            if (value)
            {
                this.previousAddress = value;
            }

            // if we select a new address, bind the sync method for possible address edits
            if (this.currentAddress)
            {
                var selected_address = this.addresses.get(this.currentAddress);
                if(selected_address)
                {
                    selected_address.on('sync', jQuery.proxy(this, 'reloadMethods'), this);
                }

                // if there was a different previous address, remove the sync handler
                if(this.previousAddress && this.previousAddress !== this.currentAddress)
                {
                    var previous_selected_address = this.addresses.get(this.previousAddress);
                    if(previous_selected_address)
                    {
                        previous_selected_address.off('sync');
                    }
                }
            }
        }
    });

    OrderWizardModuleShipmethod.prototype.installPlugin('postContext', {
        name: 'OrderWizardModuleShipmethod.getContext',
        priority: 1,
        execute: function execute(context, view) {
            _.extend(context, {
                showSelectForShippingMethod: false
            });
        }
    });

      
});
