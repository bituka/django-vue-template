
// @module PackageItem
define('PackageItem.Model'
,	[
		'SC.Model'
	,	'Application'
	,	'Utils'
	,	'underscore'
	]
,	function (
		SCModel
	,	Application
	,	Utils
	,	_
	)
{
	'use strict';

	// @class Case.Model Defines the model used by the Case.Service.ss and Case.Fields.Service.ss services.
	// Handles fetching, creating and updating cases. @extends SCModel
	return SCModel.extend({
		name: 'PackageItem'

		// @property configuration general settings
	,	configuration: SC.Configuration

  , get: function ( internalId ){
    nlapiLogExecution('DEBUG', 'internalId', internalId);
    if( internalId )
    {
      //Setting up Datainput
      var data = { "internalid": internalId }

      //Stringifying JSON
      //var data = JSON.stringify(jsonobj);

      var url = nlapiResolveURL("SUITELET", "customscript_tt_group_items_getitem", "customdeploy_tt_group_items_getitem", true);

			var response = nlapiRequestURL(url, data, null, "POST");
			item = JSON.parse(response.getBody());

      nlapiLogExecution('DEBUG', 'item', JSON.stringify(item));
      if( item )
      {
        return item;
      }
    }
  }
  , getGroupItems: function ( internalid )
  {
  		try
  		{
  			var record = nlapiLoadRecord( "itemgroup", internalid );
        nlapiLogExecution('DEBUG', 'record', JSON.stringify(record));
  		}
  		catch(e){}

  	return record;
  }

  });
});
