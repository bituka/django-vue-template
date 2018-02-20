function service(request, response) {

    var Application = require('Application'),
        BackInStockSubscription = require( 'BackInStockSubscription.Model' );

    var method = request.getMethod(),
    data = JSON.parse(request.getBody() || '{}');

  //  response.setContentType('JSON');

    switch( method )
    {
        case 'GET':
            Application.sendContent( data );
            //TODO: Si quieren que el usuario pueda ver las solicitudes que hizo
            break;

        case 'POST':
            var item = data.item,
                email = data.email
                // date = data.custrecord_tt_backinstock_created_date
                data = {
                    item: item,
                    email: email
                    // date: date
                };

            var record = BackInStockSubscription.create( data );

            Application.sendContent( data );

            break;
    }

}
