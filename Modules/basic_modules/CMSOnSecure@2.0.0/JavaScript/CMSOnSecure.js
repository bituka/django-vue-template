//NASTY FIX FOR CMS ON SECURE
define('CMSOnSecure',function(){
    jQuery(document).ajaxSend(function( event, request, settings ) {
        if(settings.url.indexOf('/api/cms/session/domain') > -1 && location.href.indexOf('checkout') > -1){
            settings.url = '/c.TSTDRV1391279/automation/dev/services/CMSOnSecure.Service.ss';
        }
    });
});
