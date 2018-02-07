define('PackageItems.GroupItems.Model',
[
  'Backbone.CachedModel'
  , 'underscore'
  , 'jQuery'
],
function(
  BackboneCachedModel
  , _
  , jQuery
){
  'use strict';

  return BackboneCachedModel.extend({
      //@property {String} url
  	  urlRoot: _.getAbsoluteUrl('services/PackageItem.Service.ss')

  });
});
