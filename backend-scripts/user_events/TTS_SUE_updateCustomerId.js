//This will check if the custom field is empty or not. If not empty, change the customerID to the value of the custom field. If empty, do nothing.

function beforeSubmit_updateCustId() {
	if (nlapiGetRecordType() == 'lead') {
		var custom_custid = nlapiGetFieldValue('custentity_cust_customer_id');
		//Search if entity id is already used
		if (custom_custid != null && custom_custid != '') {
			var search = searchCustId(custom_custid);
			if (search != null) {
				var lastIndex = parseInt(search[0].getValue('entityid').split(' ').pop());
				if (!isNaN(lastIndex)) {
					lastIndex++;
				}
				else {
					lastIndex = 1;
				}
				var custom_custid = custom_custid + ' ' + lastIndex;
			}
			nlapiSetFieldValue('entityid', custom_custid);
			nlapiSetFieldValue('custentity_cust_customer_id', '');
		}
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
	return result;
}
