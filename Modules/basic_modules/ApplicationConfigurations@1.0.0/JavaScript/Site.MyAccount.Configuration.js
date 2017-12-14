define('Site.MyAccount.Configuration', [
    'SC.MyAccount.Configuration',
    'Site.Global.Configuration',
    'underscore'
], function SiteCheckoutConfiguration(
    MyAccountConfiguration,
    GlobalConfiguration,
    _
) {
    'use strict';

    var SiteApplicationConfiguration = {

    };

    _.extend(MyAccountConfiguration, GlobalConfiguration, SiteApplicationConfiguration);


    return {
        mountToApp: function mountToApp(application) {
            _.extend(application.Configuration, MyAccountConfiguration);
        }
    };
});