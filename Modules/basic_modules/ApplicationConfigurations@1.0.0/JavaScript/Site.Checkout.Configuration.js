define('Site.Checkout.Configuration', [
    'SC.Checkout.Configuration',
    'SC.Checkout.Configuration.Steps.OPC',
    'Site.Global.Configuration',
    'Header.View',
    'Footer.View',
    'underscore'
], function SiteCheckoutConfiguration(
    CheckoutConfiguration,
    CheckoutConfigurationStepsOPC,
    GlobalConfiguration,
    HeaderView,
    FooterView,
    _
) {
    'use strict';

    var useSimplifyLayout = true;

    if(!useSimplifyLayout){
        _.each(CheckoutConfigurationStepsOPC, function (step) {
            _.each(step.steps, function (s) {
                s.headerView = HeaderView;
                s.footerView = FooterView;
            });
        });
    }

    var SiteApplicationConfiguration = {
        checkoutSteps: CheckoutConfigurationStepsOPC,
        useSimplifyLayout: useSimplifyLayout
    };


    _.extend(CheckoutConfiguration, GlobalConfiguration, SiteApplicationConfiguration);

    return {
        mountToApp: function mountToApp(application) {
            _.extend(application.Configuration, CheckoutConfiguration);
        }
    };
});