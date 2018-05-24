define('TriodeOption.SelectedOption.View', [
    'Transaction.Line.Views.Options.Selected.View',
    'LiveOrder.Model',
    'underscore'
]
, function TriodeOptionView(
    ItemViewsSelectedOptionView,
    LiveOrderModel,
    _
) {
    'use strict';

    // ItemViewsSelectedOptionView.prototype.installPlugin('postContext', {
    //     name: 'triodeOptionSelectedContext',
    //     priority: 10,
    //     execute: function execute(context, view) {

    //         var item = view.options.model;
    //         var rate5090 = sessionStorage.getItem('5090');
    //         var currency = SC.ENVIRONMENT.currentCurrency;

    //         var options = item.get('options');
    //         var quantity = item.get('quantity');

    //         if(options.length > 0){
    //           if( options.models[0].get('cartOptionId') == "custcol_additional_options" && options.models[0].get('value') != undefined ){

    //             if(options.models[0].get('value').internalid == "3"){
    //               var itemAmount = parseFloat(item.get('total'));
    //               var triodeOptAmount = rate5090; // service item amout
    //               var amount = itemAmount + triodeOptAmount * quantity;
    //               item.set('amount', amount);
    //               item.set('amount_formatted', currency.symbol + amount.toFixed(2));
    //               item.set('total_formatted', currency.symbol + amount.toFixed(2));

    //               _.extend(context, {
    //                   total_formatted: item.get('total_formatted'),
    //                   isValid: item.get('amount') !== 0
    //               });
    //             }
    //           }
    //         }

    //         //
    //         // if (item.get('itemtype') == "Service") {
    //         //     // this.on('afterViewRender', function afterViewRender() {
    //         //
    //         //         $(this).hide();
    //         //         var model = this.model;
    //         //         var test = this.itemsInCart;
    //         //         $(this).$('.transaction-line-views-cell-navigable').css('display', 'none');
    //         //     // });
    //         // }


    //     }
    // });

    _.extend(ItemViewsSelectedOptionView.prototype, {
        getContext : _.wrap(ItemViewsSelectedOptionView.prototype.getContext, function(fn){
            var ctx = fn.apply(this, _.toArray(arguments).slice(1));

            var model = this.model;
            var item = this.options.model;
            var rate5090 = sessionStorage.getItem('5090');
            var currency = SC.ENVIRONMENT.currentCurrency;

            var options = item.get('options');
            var quantity = item.get('quantity');

            if(options.length > 0){
              if( options.models[0].get('cartOptionId') == "custcol_additional_options" && options.models[0].get('value') != undefined ){

                if(options.models[0].get('value').internalid == "3"){
                    var itemAmount = parseFloat(item.get('total'));
                    var triodeOptAmount = rate5090; // service item amout
                    var amount = itemAmount + triodeOptAmount * quantity;
                    item.set('amount', amount);
                    item.set('amount_formatted', currency.symbol + amount.toFixed(2));
                    item.set('total_formatted', currency.symbol + amount.toFixed(2));

                //   _.extend(context, {
                //       total_formatted: item.get('total_formatted'),
                //       isValid: item.get('amount') !== 0
                //   });

                    ctx.total_formatted = item.get('total_formatted');
                    ctx.isValid = item.get('amount') !== 0;

                    return ctx;

                }
              }
            }


        })
    });


});
