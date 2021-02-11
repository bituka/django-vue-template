define("LayoutClass",function(){
    return {
        mountToApp: function(application){
            var Layout = application.getLayout();

            Layout.on('afterAppendView',function(view){
                if(!view.inModal){
                    Layout.$('#layout').removeClass().addClass('layout').addClass('sec_'+view.template.Name);
                }
            });
        }
    }
});