define('TriodeOption.Cart.View', [
    'Cart.Lines.View',
    'underscore'
], function TriodeOptionCartView(
    CartLinesView,
    _
) {
    'use strict';

    _.extend(CartLinesView.prototype, {

        initialize: _.wrap(CartLinesView.prototype.initialize, function wrapInitialize(fn) {
            var item;
            fn.apply(this, _.toArray(arguments).slice(1));
            item = this.model.get('item');

            if (item.get('itemtype') == "Service") {
                this.on('afterViewRender', function afterViewRender() {

                    $(this).hide();
                    var model = this.model;
                    var test = this.itemsInCart;
                    this.$('.cart-lines-row-custom').css('display', 'none');
                });
            }
        })

    });
});
