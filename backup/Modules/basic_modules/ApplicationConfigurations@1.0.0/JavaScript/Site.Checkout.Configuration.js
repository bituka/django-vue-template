define('Site.Checkout.Configuration', [
	'SC.Configuration',
    'SC.Checkout.Configuration',
    'Site.Global.Configuration',
    'Header.View',
    'Footer.View',
    'underscore',
    'Utils',

    // heads up ! The three official checkout steps are all included - but only one is selected by configuration
    // Copied from SC.Checkout.Configuration

    'SC.Checkout.Configuration.Steps.Standard',
    'SC.Checkout.Configuration.Steps.OPC',
    'SC.Checkout.Configuration.Steps.BillingFirst'
], function SiteCheckoutConfiguration(
	Configuration,
    CheckoutConfiguration,
    GlobalConfiguration,
    HeaderView,
    FooterView,
    _,
    Utils
) {
    'use strict';

    var useSimplifyLayout = false;

	var checkoutStepsMap = {
			'Standard': 'SC.Checkout.Configuration.Steps.Standard'
		,	'One Page': 'SC.Checkout.Configuration.Steps.OPC'
		,	'Billing First': 'SC.Checkout.Configuration.Steps.BillingFirst'
		};
	// heads up! if the user adds a new checkout step then it has to use the AMD module name:
	var configuredCheckoutStepsName = checkoutStepsMap[Configuration.get('checkoutApp.checkoutSteps')] || Configuration.get('checkoutApp.checkoutSteps');
    
    configuredCheckoutStepsName = "SC.Checkout.Configuration.Steps.FourSteps";
    
	var configuredCheckoutSteps = Utils.requireModules(configuredCheckoutStepsName);

    if(!useSimplifyLayout){
        _.each(configuredCheckoutSteps, function (step) {
            _.each(step.steps, function (s) {
                s.headerView = HeaderView;
                s.footerView = FooterView;
            });
        });
    }

    var SiteApplicationConfiguration = {
        checkoutSteps: configuredCheckoutSteps,
        useSimplifyLayout: useSimplifyLayout
    };


    _.extend(CheckoutConfiguration, GlobalConfiguration, SiteApplicationConfiguration);

    return {
        mountToApp: function mountToApp(application) {
            _.extend(application.Configuration, CheckoutConfiguration);
        }
    };
});
