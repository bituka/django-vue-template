function Schedule()
{
	try{
		var col = new Array();
	  col[0] = new nlobjSearchColumn('custrecordback_in_stock_customer_email'); // custrecord_tt_backinstock_email
	  col[1] = new nlobjSearchColumn('custrecorditem_back_in_stock'); // custrecord_tt_backinstock_item
	  // col[2] = new nlobjSearchColumn('custrecord_tt_backinstock_created_date');
    var backinstock_records = nlapiSearchRecord('customrecordbackinstocksc', "customsearch_tt_back_in_stock_sub", null, col);

		if(!backinstock_records) nlapiLogExecution('DEBUG', 'BackInStockNotifications.Schedule', 'No back in stock items.')

		_.each(backinstock_records, function(recs, index){

			var fldMap = new Array();
			fldMap['email'] = recs.getValue('custrecordback_in_stock_customer_email');
			var user = nlapiSearchDuplicate('customer', fldMap);
			var item = getItem(recs.getValue('custrecorditem_back_in_stock'));
			var userData = {
				email: recs.getValue('custrecordback_in_stock_customer_email'),
				name: 'Customer'
			};

			// validation for duplicated Back in Stock Alert records
			var emailSents = [];
			var object = {};
			object.email = recs.getValue('custrecordback_in_stock_customer_email');
			object.item = recs.getValue('custrecorditem_back_in_stock');
			emailSents.push(object);
			var countOccurr = 0;
			for(var i=0; i<emailSents.length; i++){
				if(emailSents[i].email == recs.getValue('custrecordback_in_stock_customer_email'))
					if(emailSents[i].item == recs.getValue('custrecorditem_back_in_stock'))
						countOccurr++;
			}
			if(countOccurr == 1){
				// if is the first occurrense of the record, send email
				var advancedEmail = new AdvancedEmail({
	          testing: false,
	          autorun: false,
	          to: userData.email,
	          template: 64, //ID del Email Template en backend
	                  senderEmployee: 493,
	                  subject: item.getFieldValue('storedisplayname')+' is Back in Stock',
	          templateData: {
	              name: userData.name,
	              item: {
	                 name: item.getFieldValue('storedisplayname'),
	                description: item.getFieldValue('storedetaileddescription'),
	                url: item.getFieldValue('urlcomponent')
	              }
	          }
	      });
				advancedEmail.run();
			}

			var record = nlapiLoadRecord("customrecordbackinstocksc", recs.id);
			record.setFieldValue('custrecord_backinstock_sent', 'T');
			record.setFieldValue('custrecordemail_sent_date', nlapiDateToString( (new Date()), 'datetimetz') );  //custrecord_tt_backinstock_sent_date
			nlapiSubmitRecord(record);

			if(index % 10) setRecoveryPoint();
			checkGovernance();
		});
	}
	catch(e){
      nlapiLogExecution('ERROR', 'BackInStockNotifications.Schedule', e)
    }
}

function getItem ( internalid )
{
	var availableTypes = [
			'inventoryitem',
			'noninventoryitem',
			'assemblyitem',
			'kititem',
			'serviceitem',
			'discountitem',
			'descriptionitem'
		],
		record = null,
		index = 0;

	do
	{
		try
		{
			record = nlapiLoadRecord( availableTypes[index], internalid );
		}
		catch(e){}

		index++;
	}
	while( !record && index < availableTypes.length );

	return record;
}

//Recovery point and yield script
function setRecoveryPoint()
{
 var state = nlapiSetRecoveryPoint(); //100 point governance
 if( state.status == 'SUCCESS' ) return;  //we successfully create a new recovery point
 if( state.status == 'RESUME' ) //a recovery point was previously set, we are resuming due to some unforeseen error
 {
  nlapiLogExecution("ERROR", "Resuming script because of " + state.reason+".  Size = "+ state.size);
  handleScriptRecovery();
 }
 else if ( state.status == 'FAILURE' )  //we failed to create a new recovery point
 {
     nlapiLogExecution("ERROR","Failed to create recovery point. Reason = "+state.reason + " / Size = "+ state.size);
  handleRecoveryFailure(state);
 }
}

function checkGovernance()
{
 var context = nlapiGetContext(),
 myGovernanceThreshold = 10;
 if( context.getRemainingUsage() < myGovernanceThreshold ){
  var state = nlapiYieldScript();
  if( state.status == 'FAILURE'){
      nlapiLogExecution("ERROR","Failed to yield script, exiting: Reason = "+state.reason + " / Size = "+ state.size);
   throw "Failed to yield script";
  }
  else if ( state.status == 'RESUME' ){
   nlapiLogExecution("AUDIT", "Resuming script because of " + state.reason+".  Size = "+ state.size);
  }
  // state.status will never be SUCCESS because a success would imply a yield has occurred.  The equivalent response would be yield
 }
}
