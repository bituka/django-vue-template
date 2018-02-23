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

            break;
    }

}
