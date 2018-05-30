// @module Facets
// addition to include custom Fields at PDP
define(
    'OrderWizard.Module.CartItems.Ship.Extension',
    [
      'OrderWizard.Module.CartItems.Ship',
      'LiveOrder.Model',
      'OrderWizard.Step',
      'Backbone.CollectionView',
      'Transaction.Line.Views.Cell.Navigable.View',
      'Address.Details.View',
      'Backbone',
      'underscore'
    ],
    function(

      OrderWizardModuleCartItemsShip,
      LiveOrderModel,
      OrderWizardStep,
      BackboneCollectionView,
      TransactionLineViewsCellNavigableView,
      AddressDetailsView,
      Backbone,
      _
    ) {
        'use strict';

        _.extend(OrderWizardModuleCartItemsShip.prototype, {

          childViews:
        		{
        			'Items.Collection': function ()
        			{
        				return new BackboneCollectionView({
        						collection: this.lines
        					,	childView: TransactionLineViewsCellNavigableView
        					,	viewsPerRow: 1
        					,	childViewOptions: {
        							navigable: false

        						,	detail1Title: _('Qty:').translate()
        						,	detail1: 'quantity'

        						,	detail2Title: _('Unit price:').translate()
        						,	detail2: 'rate_formatted'

        						,	detail3Title: _('Amount:').translate()
        						,	detail3: 'total_formatted'
        						}
        				});
        			}

        			,
        			'OrderWizard.Step': function(){
        				return new OrderWizardStep({
        					model: this.wizard.model,
        					wizard: this.wizard
        				});
        			}

        		,	'Address.Details': function ()
        			{
        				if (this.address)
        				{
        					return new AddressDetailsView({
        						model: this.address
        					,	hideActions: true
        					,	hideDefaults: true
        					});
        				}
        			}
        		}

      });

      OrderWizardModuleCartItemsShip.prototype.installPlugin('postContext', {
          priority: 1,
          execute: function execute(context, view) {

            var showAdditionalContButton = false;
            var url = window.location.href;
            if(url.indexOf('#opc') != -1 || url.indexOf('/opc') != -1) {
              showAdditionalContButton = true;
            }

          _.extend(context, {
              // @property {string} badge
              showAdditionalContButton: showAdditionalContButton
          });
        }
      });

});
