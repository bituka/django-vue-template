function backInStockCreator(type) {
//	nlapiLogExecution('DEBUG', 'backInStockCreator', ' backInStockCreator - starting...: ' + type);
	var currentRecord;
	// Get the Current Record
	currentRecord = nlapiGetNewRecord();
// 	nlapiLogExecution('DEBUG', 'backInStockCreator', 'currentRecord.getId() : ' + currentRecord.getId());

	var notifyBis = currentRecord.getFieldValue('custentitynotify_bis');
//	nlapiLogExecution('DEBUG', 'backInStockCreator', 'notifyBis : ' + notifyBis);
	
	if (notifyBis == 'T')  {
		
		try {
			var record = nlapiLoadRecord('customer', currentRecord.getId());
//			nlapiLogExecution('DEBUG', 'backInStockCreator', 'Customer to update: ' + record);
			record.setFieldValue('custentitynotify_bis', 'F');
			nlapiSubmitRecord(record, false);
		} catch (e) {
			nlapiLogExecution('DEBUG', 'backInStockCreator', 'Error custentitynotify_bis: ' + e);
		}
			
		var itemBackInStockId = currentRecord.getFieldValue('custentitybackinstock_item');
//		nlapiLogExecution('DEBUG', 'backInStockCreator', 'itemBackInStockId : ' + itemBackInStockId);

		try {
			// create the back in stock.
			var backInStock = nlapiCreateRecord('customrecordbackinstocksc');
			
			backInStock.setFieldValue('custrecorditem_back_in_stock', itemBackInStockId);
			backInStock.setFieldValue('custrecordcustomer_name_backinstock', currentRecord.getId());
			
			nlapiSubmitRecord(backInStock, true);
			
		} catch (e) {
			nlapiLogExecution('DEBUG', 'backInStockCreator', 'Error: ' + e);
		}
	}
}