define(
	'Transaction.Line.Views.Price.Extension.View'
,	[
        'Backbone',
        'Transaction.Line.Views.Price.View'
        
	]
,	function(
        Backbone,
        TransactionLineViewsPriceView

	)
{
	'use strict';
    _.extend(TransactionLineViewsPriceView.prototype, 
        {
        getContext : _.wrap(TransactionLineViewsPriceView.prototype.getContext, function(fn){
            var ctx = fn.apply(this, _.toArray(arguments).slice(1));
            ctx.showPrice = false;
            return ctx;    
        })
    
	});
});