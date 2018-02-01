function service(request, response){
  /*var col = new Array();
  col[0] = new nlobjSearchColumn('custrecordreviewstatus');
  col[1] = new nlobjSearchColumn('custrecordreviewdatecreated');
  col[2] = new nlobjSearchColumn('custrecordreviewnsitemid');
  col[3] = new nlobjSearchColumn('custrecordreviewreviewer');
  col[4] = new nlobjSearchColumn('custrecordreviewlocation');
  col[5] = new nlobjSearchColumn('custrecordreviewrating');
  col[6] = new nlobjSearchColumn('custrecordreviewmessage');
  col[7] = new nlobjSearchColumn('custrecordreviewtitle');

  var filters = new Array();
  filters[0] = new nlobjSearchFilter ('custrecordreviewnsitemid', null, 'noneof', '@NONE@');
*/

  try{
    //var oldReviews = nlapiSearchRecord('customrecordreviewentry', null, filters, col),
    var oldReviews = nlapiLoadSearch('customrecordreviewentry', 'customsearch_tt_product_reviews_entries'),
      i = 0;
    var result = oldReviews.runSearch();
    // result = result.getResults(922, 1500);
    result.forEachResult(function(searchResult){
      //console.log(searchResult.getValue("custrecordreviewnsitemid"));
      var oldReviewsInternalId = searchResult.getValue('custrecordreviewnsitemid');

      if(oldReviewsInternalId){
        var status = searchResult.getValue('custrecordreviewstatus') === 'T' ? 2 : 1,
          name = searchResult.getValue('custrecordreviewtitle') != '' && searchResult.getValue('custrecordreviewtitle') != null ? searchResult.getValue('custrecordreviewtitle') : 'My Review';
        /*var item = nlapiSearchRecord(
        'item', null
         ,[
           new nlobjSearchFilter('isinactive', null, 'is', 'F'),
           new nlobjSearchFilter('isonline', null, 'is', 'T'),
           new nlobjSearchFilter('internalid', null, 'is', oldReviewsInternalId)
          ]
         ,null
       );*/
         //if(item){
           nlapiLogExecution('DEBUG', 'Information item', 'ITEM ID: '+oldReviewsInternalId);
           nlapiLogExecution('DEBUG', 'Information: customrecord_ns_pr_review', 'Name: '+searchResult.getValue('custrecordreviewtitle')+' - Record id: '+searchResult.getId());
           var myRec = nlapiCreateRecord('customrecord_ns_pr_review'),
            reviews_rating = searchResult.getValue('custrecordreviewrating') > 5 ? parseInt(searchResult.getValue('custrecordreviewrating') / 2) : searchResult.getValue('custrecordreviewrating'),
            date = searchResult.getValue('custrecordreviewdatecreated').split('/')[1] ;
        /*   myRec.setFieldValue('custrecord_ns_prr_text', searchResult.getValue('custrecordreviewmessage'));
           myRec.setFieldValue('custrecord_ns_prr_rating', reviews_rating);
           myRec.setFieldValue('custrecord_ns_prr_writer_name', searchResult.getValue('custrecordreviewreviewer'));
           myRec.setFieldValue('custrecord_ns_prr_item_id', oldReviewsInternalId);
           myRec.setFieldValue('custrecord_ns_prr_status', status);
           myRec.setFieldValue('custrecord_ns_prr_item', oldReviewsInternalId);
           myRec.setFieldValue('name', name);
           myRec.setFieldValue('custrecord_ns_prr_creation_date', nlapiDateToString( new Date(searchResult.getValue('custrecordreviewdatecreated')), 'datetimetz'));
          // nlapiSubmitRecord(myRec)*/
        // }

         //Set recovery point and check governance
         if(i % 10) setRecoveryPoint();
         checkGovernance();
        i++;
      }
      return true;
    });
    }
    catch(e){
        nlapiLogExecution('DEBUG', 'ERROR', e);
    }

  //Error: Invalid custrecord_ns_prr_item reference key 1348.
}

function setRecoveryPoint(){
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

function checkGovernance(){
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
