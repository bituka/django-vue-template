define('PackageItems.GroupItems.Model',
[
  'Backbone.CachedModel'
  , 'underscore'
  , 'Utils'
  , 'jQuery'
],
function(
  BackboneCachedModel
  , _
  , Utils
  , jQuery
){
  'use strict';

  return BackboneCachedModel.extend({
      //@property {String} url
  	  urlRoot: _.getAbsoluteUrl('services/PackageItem.Service.ss')

  });
});
