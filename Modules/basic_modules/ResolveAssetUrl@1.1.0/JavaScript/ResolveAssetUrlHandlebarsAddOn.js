define('ResolveAssetUrlHandlebarsAddOn', [
    'Handlebars',
    'ResolveAssetUrlUtils'
], function HandlebarsAddOns(
    Handlebars,
    Utils
) {
    'use strict';

    var Module = {
        validateParamBoolean: function validateUseLocalParam(param) {
            return (typeof param === 'boolean') ? param : false;
        }
    };

    Handlebars.registerHelper('absoluteUrl', function registerHelper(file, useLocalParam) {
        return Utils.getAbsoluteUrl(file);
    });

    Handlebars.registerHelper('imageUrl', function registerHelper(file, useLocalParam) {
        return Utils.imageUrl(file);
    });

    Handlebars.registerHelper('hostingRootUrl', function registerHelper(file, useLocalParam) {
        return Utils.getHostingRootUrl(file);
    });

    Handlebars.registerHelper('log', function registerHelper(param) {
        console.log(param)
    });

    return Module;
});