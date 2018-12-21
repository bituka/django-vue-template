// Tavano Team 2018

function setNonInventoryPriceProcess() {

  try {

    nlapiLogExecution('ERROR', 'Start Updating PRICE TOTAL for Non Inventory', new Date());

    var SS_SBA_Item_List = nlapiLoadSearch('item','customsearch_items_in_item_groups');
    var itemsInGroups = SS_SBA_Item_List.runSearch();
    var results = itemsInGroups.getResults(0, 999);
    nlapiLogExecution('ERROR', 'NUMBER OF ITEMS', results.length);

    for(var j=0; j<results.length; j++){
      nlapiLogExecution('ERROR', 'Start Looking for Item...', 'Item Number: '+ j);
      var itemId = results[j].getId();
      setNonInventoryPrice(itemId)
    }

    nlapiLogExecution('ERROR', 'Finish Updating PRICE TOTAL for Non Inventory', new Date());

  } catch(e) {
      nlapiLogExecution("ERROR","setNonInventoryPriceProcess",e);
    }
}

function setNonInventoryPrice(itemID) {

  try {

    nlapiLogExecution('ERROR', 'Start Looking for Item...', 'Item ID: '+ itemID);

    // search item groups with this item
    var search = nlapiLoadSearch('item','customsearch_tt_group_items');
    var itemFilter = new nlobjSearchFilter('internalid','memberitem', 'anyof', itemID);
    search.addFilter(itemFilter);
    var allItemGroups = search.runSearch();
    var allItemGroupItems = allItemGroups.getResults(0, 999);

    // for each item group, get items price and add them
    for(var i=0; i<allItemGroupItems.length; i++) {

        var groupId = allItemGroupItems[i].getId();
        nlapiLogExecution('ERROR', 'Group ID', groupId);
        var totalGroupPrice = 0.0;

        var groupRecord = nlapiLoadRecord('itemgroup',groupId);
        var itemsCount = groupRecord.getLineItemCount('member');

        // get item prices
        for(var j=1; j<= itemsCount; j++) {
          // get the inventory item internalid and the qty on the group
          var memberId = groupRecord.getLineItemValue('member', 'item', j);
          var quantity = parseFloat(groupRecord.getLineItemValue('member', 'quantity', j));

          var item = loadItem(memberId);
          var itemPrice = 0;

          if(quantity >= 5 && Number(itemRecord.getLineItemMatrixValue('price1', 'price', 1,2)) != 0.0){
            itemPrice = parseFloat(item.getLineItemMatrixValue('price1', 'price', 1,2));
          }else{
            // if item has discount on the online price, get discount value from qty 1
            if(item.getFieldValue('price1quantity2') == 1 && item.getLineItemMatrixValue('price1', 'price', 8,2) != null && item.getLineItemMatrixValue('price1', 'price', 8,2) != '' && item.getLineItemMatrixValue('price1', 'price', 8,2) != undefined){
              itemPrice = parseFloat(item.getLineItemMatrixValue('price1', 'price', 8,2));
            }else{
              // get the base price
              itemPrice = parseFloat(item.getLineItemMatrixValue('price1', 'price', 1,1));
            }
          }

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
          nlapiLogExecution("ERROR", "TOTAL GROUP PRICE UPDATED...", totalGroupPrice);
        }else{
          //nlapiLogExecution("ERROR", "non inventory items", item);
          //nlapiLogExecution("ERROR", "TOTAL GROUP PRICE", totalGroupPrice);
          //nlapiLogExecution('ERROR', 'Group ID', groupId);
        }

        if (nlapiGetContext().getRemainingUsage() < 100) {
            nlapiLogExecution('ERROR', 'USAGE LOW', nlapiGetContext().getRemainingUsage());
            nlapiYieldScript();
        }
    }

  } catch(e) {
      nlapiLogExecution("ERROR","catch",e);
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

}

