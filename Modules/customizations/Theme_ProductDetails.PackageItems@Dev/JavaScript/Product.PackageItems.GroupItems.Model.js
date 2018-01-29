define('Product.PackageItems.GroupItems.Model',
[
  'Backbone.CachedModel',
  'underscore'
],
function(
  BackboneCachedModel,
  _
){
  'use strict';

  return BackboneCachedModel.extend({
			moduleName: 'Product.PackageItems.GroupItems.Model'

		,	//@property {String} urlRoot
		urlRoot: _.getAbsoluteUrl('services/PackageItem.Service.ss')
  });
});
