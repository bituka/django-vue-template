define('ResolveAssetUrlUtils', [
    'underscore',
    'jQuery',
    'Utils'
], function UtilsAdditions(
    _,
    jQuery,
    Utils
) {
    'use strict';

    var UtilsAdd;
    var getAbsoluteUrlOfNonManagedResourcesOriginal = Utils.getAbsoluteUrlOfNonManagedResources;
    var getAbsoluteUrlOriginal = Utils.getAbsoluteUrl;
    var localUrlRoot;

    function getLocalBasePath() {
        var referenceFile;
        var root = '';
        var $script;
        if (SC.isDevelopment) {
            if (localUrlRoot) {
                root = localUrlRoot;
            } else {
                referenceFile = 'javascript/require.js';
                $script = jQuery('script[src$="' + referenceFile + '"]');
                root = $script.attr('src').replace(referenceFile, '{{file}}');
                localUrlRoot = root;
            }
        }
        return root;
    }

    function getLocalUrl(file) {
        var baseUrl = getLocalBasePath();
        var fileReplace = file ? file : '';
        return baseUrl ? baseUrl.replace('{{file}}', fileReplace) : file;
    }


    function getAbsoluteUrlOfNonManagedResources(file) {
        var url;
        if (SC.isDevelopment) {
            url = getLocalUrl(file);
        } else {
            url = getAbsoluteUrlOriginal.call(Utils, file);
        }
        return url;
    }
    
    function imageUrl(file){

        var url;

        file ='img/'+file;

        if (SC.isDevelopment) {
            url = getLocalUrl(file);
        } else {
            url = getAbsoluteUrlOriginal.call(Utils, file);
        }
        return url;
    }


    UtilsAdd = {
        getAbsoluteUrlOfNonManagedResources: getAbsoluteUrlOfNonManagedResources,
        imageUrl: imageUrl
    };

    _.extend(Utils, UtilsAdd);
    _.extend(SC.Utils, UtilsAdd);
    _.mixin(UtilsAdd);

    return Utils;
});