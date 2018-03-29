
// Tavano Team 2018

function setNonInventoryPrice() {

  try {

    var context = nlapiGetContext();
    var itemID = context.getSetting('SCRIPT', 'custscript_tt_item_id');
    nlapiLogExecution('ERROR', '---in---', itemID);

    // search item groups with this item
    var search = nlapiLoadSearch('item','customsearch_tt_group_items');
    var itemFilter = new nlobjSearchFilter('internalid','memberitem', 'anyof', itemID);
    search.addFilter(itemFilter);
    var allItemGroups = search.runSearch();
    var allItemGroupItems = allItemGroups.getResults(0, 999);

    // for each item group, get items price and add them
    for(var i=0; i<allItemGroupItems.length; i++) {

        var groupId = allItemGroupItems[i].getId();
        var totalGroupPrice = 0.0;

        var groupRecord = nlapiLoadRecord('itemgroup',groupId);
        var itemsCount = groupRecord.getLineItemCount('member');

        // get item prices
        for(var j=1; j<= itemsCount; j++) {
          // get the inventory item internalid and the qty on the group
          var memberId = groupRecord.getLineItemValue('member', 'item', j);
          var quantity = parseFloat(groupRecord.getLineItemValue('member', 'quantity', j));

          var item = loadItem(memberId);
          var itemPrice = parseFloat(item.getLineItemMatrixValue('price1', 'price', 1,1));

          totalGroupPrice = totalGroupPrice + itemPrice*quantity;
        }

        // search non inventory items with this item group
        var filters = new Array();
        filters[0] = new nlobjSearchFilter( 'custitem_group_item', null, 'is', groupId );
        var columns = [
          new nlobjSearchColumn('internalid'),
          new nlobjSearchColumn('custitem_tt_price_total')
        ];
        var item = nlapiSearchRecord( 'noninventoryitem', null, filters, columns );
        // if there is at least one
        if(item != null){
          var nonInvItem = nlapiLoadRecord( "noninventoryitem", item[0].getValue('internalid') );
          nonInvItem.setFieldValue('custitem_tt_price_total', totalGroupPrice);
          nlapiSubmitRecord(nonInvItem);
          nlapiLogExecution('ERROR', 'nonInvItem', item[0].getValue('internalid'));
        }

        if (nlapiGetContext().getRemainingUsage() < 100) {
            nlapiLogExecution('DEBUG', 'USAGE LOW', nlapiGetContext().getRemainingUsage());
            nlapiYieldScript();
        }        
    }

  } catch(e) {
      nlapiLogExecution("ERROR","catch",e);
    }
}


function  loadItem(itemId) {
    try {
            itemRecord = nlapiLoadRecord('inventoryitem', itemId);
    } catch(SSS_RECORD_TYPE_MISMATCH) {
    		try {
    				itemRecord = nlapiLoadRecord('discountitem', itemId);
    		} catch(SSS_RECORD_TYPE_MISMATCH) {
    				try {
    						itemRecord = nlapiLoadRecord('noninventoryitem', itemId);
    				} catch(SSS_RECORD_TYPE_MISMATCH) {
    						try {
    								itemRecord = nlapiLoadRecord('kititem', itemId);
    						} catch(SSS_RECORD_TYPE_MISMATCH) {
    								try {
    										itemRecord = nlapiLoadRecord('assemblyitem', itemId);
    								} catch(SSS_RECORD_TYPE_MISMATCH) {
    										try {
    											itemRecord = nlapiLoadRecord('serviceitem', itemId);
    										} catch(SSS_RECORD_TYPE_MISMATCH) {
    												try {
    													itemRecord = nlapiLoadRecord('descriptionitem', itemId);
    												} catch(e) {
    														return "";
    												}
    										}
    								}
    						}
    				}
    		}
    }
    return itemRecord;
}
