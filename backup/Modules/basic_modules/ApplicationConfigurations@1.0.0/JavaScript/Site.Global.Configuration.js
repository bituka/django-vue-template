define('Site.Global.Configuration', [
    'SC.Configuration',
    'empty_template.tpl'
], function SiteGlobalConfiguration(
    Configuration,
    empty_template_tpl
) {
    'use strict';

    var GlobalConfiguration = {
        header:{
            logoUrl: '/Images/Global/logo/logo1.png',
            logoMobileUrl: '/Images/Global/logo/logo1.png'
        },
        //imageNotAvailable: '/Images/Global/no-image/no-image1.png',
        newsletter:{
            domain: 'forms.netsuite.com',
            formId: '11',
            hash: 'AACffht_e95CSh1THotIE-wzl2bC8XRf6E0%3D'
        },
        supportEmail: 'info@tavanoteam.com',
        contactPhone: '88 01660 000 000'
    };
    
    GlobalConfiguration.navigationData = [
        {
            placeholder: 'Categories'
        }
    ];

    return GlobalConfiguration;
});
