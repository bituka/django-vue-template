define('Theme_Footer',
['Footer.View','Footer.Simplified.View', 'SC.Configuration', 'underscore'],
function Theme_Footer(FooterView,FooterSimplifiedView, Configuration, _) {

    var contextExtension = {
        actualYear: new Date().getFullYear()
    };

    // FooterView.prototype.installPlugin('postContext',{
    //     name: 'Footer Variables',
    //     priority: 1,
    //     execute: function execute(context, view) {
    //         _.extend(context, contextExtension);
    //     }
    // });

    FooterView.prototype.getContext = function(){
        return contextExtension;
    }

    FooterSimplifiedView.prototype.getContext = function(){
        return contextExtension;
    }

});