function service(request, response){
  try{
    var internalid = request.getParameter('internalid');
    var filters = new Array(),
        result = new Array();
    filters[0] = new nlobjSearchFilter( 'internalid', null, 'is', internalid );

    // return opportunity sales rep, customer custom field, and customer ID
    var columns = [
      new nlobjSearchColumn( 'internalid' ),
      new nlobjSearchColumn( 'custitem_group_item' )
    ];

    // execute the Warrenty search, passing all filters and return columns
    var item = nlapiSearchRecord( 'noninventoryitem', null, filters, columns );
    nlapiLogExecution( 'ERROR', 'item', JSON.stringify(item) );
    var searchresults = nlapiLoadRecord( "itemgroup", item[0].getValue('custitem_group_item') );
    var searchresultsLength = searchresults.getLineItemCount('member');
    var result = new Array();
    for(var i = 1; i<=searchresultsLength; i++){
      result.push(
        {
          item: searchresults.getLineItemValue('member', 'item', i),
          item_display: searchresults.getLineItemValue('member', 'item_display', i),
          memberkey: searchresults.getLineItemValue('member', 'memberkey', i),
          quantity: searchresults.getLineItemValue('member', 'quantity', i)
        }
      )
    }
    nlapiLogExecution( 'ERROR', 'item', JSON.stringify(result) );
    response.write(JSON.stringify(result));
    //response.write(JSON.stringify(searchresults));
  }
  catch(e){
    response.write(JSON.stringify(e));
  }
}
