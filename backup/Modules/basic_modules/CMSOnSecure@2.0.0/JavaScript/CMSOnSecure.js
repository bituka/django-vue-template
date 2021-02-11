//NASTY FIX FOR CMS ON SECURE
define('CMSOnSecure',['jQuery'],
    function(jQuery){
        jQuery(document).ajaxSend(function( event, request, settings ) {
        if(settings.url.indexOf('/api/cms/session/domain') > -1 && location.href.indexOf('checkout') > -1){
            settings.url = '/c.3538477/sca-dev-kilimanjaro/services/CMSOnSecure.Service.ss';
        }
    });
});
