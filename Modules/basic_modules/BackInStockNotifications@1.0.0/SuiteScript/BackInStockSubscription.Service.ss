function service(request, response) {
    
    var Application = require('Application'),
        BackInStockSubscription = require( 'BackInStockSubscription.Model' );

    var method = request.getMethod(),
        data = JSON.parse( request.getBody() || {} );

    response.setContentType('JSON');
    
    switch( method )
    {
        case 'GET':
            Application.sendContent( data );

            break;

        case 'POST':

            var bis = new BackInStockSubscription();

            var record = bis.create( data );

            Application.sendContent( data );

            break;
    }


    /*
} 
    catch (e) 
    {
        Application.sendError(e);
    }

    */
}
