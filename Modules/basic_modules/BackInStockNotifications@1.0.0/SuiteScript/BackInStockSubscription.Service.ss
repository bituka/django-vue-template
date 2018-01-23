function service(request, response) {
    
    var Application = require('Application'),
        BackInStockSubscription = require( 'BackInStockSubscription.Model' );

    var method = request.getMethod();

    response.setContentType('JSON');
    
    switch( method )
    {
        case 'GET':
            Application.sendContent( data );
            //TODO: Si quieren que el usuario pueda ver las solicitudes que hizo
            break;

        case 'POST':
            var item = request.getParameter('item'),
                email = request.getParameter('email'),
                data = {
                    item: item,
                    email: email
                };

            var record = BackInStockSubscription.create( data );

            Application.sendContent( data );

            break;
    }

}
