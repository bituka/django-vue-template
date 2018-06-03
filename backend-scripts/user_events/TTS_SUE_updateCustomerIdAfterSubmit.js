//
// Tavano Team
// For leads, it change LEAD ID for first and last name
//

function afterSubmit_updateCustId() {

	if (nlapiGetRecordType() == 'lead') {

		var custom_custid = nlapiGetFieldValue('firstname') + ' ' + nlapiGetFieldValue('lastname');
		nlapiLogExecution('debug', 'custom_custid', custom_custid);

		var search = searchCustId(custom_custid);
		if (search != 0 && search != '0') {
			custom_custid = custom_custid + ' ' + search;
		}
		nlapiLogExecution('debug', 'custom_custid2', custom_custid);

		var record = nlapiLoadRecord('lead', nlapiGetRecordId());
		record.setFieldValue('entityid', custom_custid);
		record.setFieldValue('custentity_cust_customer_id', '');
		nlapiSubmitRecord(record, true, true);

	}
}


//Create save to search for leads with the same custom_custid
function searchCustId(custom_custid) {
	var filter = [];
	var column = [];

	filter.push(new nlobjSearchFilter('entityid', null, 'contains', custom_custid));
	filter.push(new nlobjSearchFilter('internalid', null, 'noneof', nlapiGetRecordId()));
	column.push(new nlobjSearchColumn('entityid').setSort(true));
	var result = nlapiSearchRecord('entity', null, filter, column);
	var length = 0;
	if(result != null){
		length = result.length;
		nlapiLogExecution('ERROR','searchitems.length', length);
	}
	return length;
}
