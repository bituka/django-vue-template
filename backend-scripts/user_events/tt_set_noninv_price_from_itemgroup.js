
// Tavano Team 2018

function setNonInventoryPrice() {

  try {

      var itemId = nlapiGetRecordId();
      var params = {custscript_tt_item_id: itemId};
      var status = nlapiScheduleScript('customscript_tt_set_noninv_price_sch', 'customdeploy1', params);

  } catch(e) {
      nlapiLogExecution("ERROR","catch",e);
    }
}
