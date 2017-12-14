define('Theme.Utils',[
    'Utils',
], function(Utils) {
    'use strict';

    return {
        mountToApp : function(applicaiton) {

            /**
             * Extends the Utils modules to provide BADGES functionality.
             */
            Utils.getBadges = function(getBadge){
                var badge = "";
                if (getBadge === 'NEW') {
                    badge = '<div class="custombadge new">NEW</div>';
                } else if (getBadge === 'BEST SELLER') {
                    badge = '<div class="custombadge bestseller">BEST SELLER</div>';
                } else if (getBadge === 'SALE') {
                    badge = '<div class="custombadge sale">SALE</div>';
                } else {
                    badge = false;
                }
        
                return badge;
            }
        }
    }
});