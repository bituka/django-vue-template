define('CMSOnSecure',['Application','underscore'],function(Application,_){

    Application.getEnvironment = _.wrap(Application.getEnvironment, function(fn){

        var useCMS = SC.Configuration.cms.useCMS,
            ret = fn.apply(this, _.toArray(arguments).slice(1));

        ret.useCMS = SC.Configuration.cms.useCMS = useCMS && context.getSetting('FEATURE', 'ADVANCEDSITEMANAGEMENT') === 'T';

        return ret;
    });
});