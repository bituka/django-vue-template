function service(request, response) {

    var Application = require('Application'),
        BackInStockSubscription = require( 'BackInStockSubscription.Model' );

    var method = request.getMethod(),
    data = JSON.parse(request.getBody() || '{}');

    // response.setContentType('JSON');

    switch( method )
    {
        case 'GET':
            //TODO: Si quieren que el usuario pueda ver las solicitudes que hizo
            Application.sendContent( data );

              break;

        case 'POST':

            var filters = new Array();
            filters[0] = new nlobjSearchFilter('custrecorditem_back_in_stock', null, 'is', data.item);
            filters[1] = new nlobjSearchFilter('custrecordback_in_stock_customer_email', null, 'is', data.email);
            filters[2] = new nlobjSearchFilter('custrecord_backinstock_sent', null, 'is', 'F');
            var columns = new Array();
            columns[0] = new nlobjSearchColumn('custrecordback_in_stock_customer_email');
            var search = nlapiCreateSearch('customrecordbackinstocksc', filters, columns);
            var result = search.runSearch().getResults(0,1);
            var length = result.length;

            nlapiLogExecution('DEBUG', '--length--', length);

            if(length == 0){

              var item = data.item,
                  email = data.email,
                  name = data.name,
                  lastname = data.lastname,
                  data = {
                      item: item,
                      email: email,
                      name: name,
                      lastname: lastname
                  };
              var record = BackInStockSubscription.create( data );

              Application.sendContent( data );
              nlapiLogExecution('DEBUG', '--1--create', JSON.stringify(data));
            }
            else {
              data.msg = 'Existing request.';
              Application.sendContent( data );
              nlapiLogExecution('DEBUG', '--2--existing', JSON.stringify(data));
            }

            break;
    }

}
