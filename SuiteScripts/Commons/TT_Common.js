//--
// Common Tavano Team Methods
//--

function Log ( text, value )
{
	nlapiLogExecution('ERROR', text, value);
}

function getRecords ( internalid, type, columnNames, filtersAdded, explicitId ) 
{
	var availableTypes = [ 'kititem', 'inventoryitem', 'noninventoryitem', 'assemblyitem', 'discountitem', 'serviceitem', 'descriptionitem' ],
		filters = [],
		columns = [],
		result = null;

	if( internalid )
	{
		filters.push (new nlobjSearchFilter( 'internalid', null, 'is', internalid ));
	}

	if( columnNames )
	{
		for( var c in columnNames )
		{
			columns.push( new nlobjSearchColumn( columnNames[c] ) );
		}
	}

	if( filtersAdded )
	{
		filters = filters.concat( filtersAdded );
	}

	if( !type )
	{
		for( var i in availableTypes )
		{
			if( result )
				continue;

			result = nlapiSearchRecord( availableTypes[i], null, filters, columns );
		}	
	}
	else
	{
		result = nlapiSearchRecord( type, (explicitId ? explicitId : null), filters, (columnNames === false ? null : columns) );
	}
	
	return result ? result : false;
}
