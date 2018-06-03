
define(
    'Overview.Home.Extension.View',
    [
      'Overview.Home.View',
      'underscore',
      'Utils',
      'Profile.Model',
      'jQuery',
      'OrderHistory.List.Tracking.Number.View',
      'Backbone.CollectionView',
      'Handlebars',
      'RecordViews.View'
    ],
    function(
      OverviewHomeView ,
      _ ,
      Utils ,
      ProfileModel,
      jQuery,
      OrderHistoryListTrackingNumberView,
      BackboneCollectionView,
      Handlebars,
      RecordViewsView
    ) {
        'use strict';

        _.extend(OverviewHomeView.prototype, {

          childViews:
          {
            'Order.History.Results': function() {

        				var self = this
        				,	records_collection = new Backbone.Collection(this.collection.map(function (order)
        					{
        						var dynamic_column;

        						if (self.isSCISIntegrationEnabled)
        						{
        							dynamic_column = {
        								label: _('Origin:').translate()
        							,	type: 'origin'
        							,	name: 'origin'
        							,	value: _.findWhere(Configuration.get('transactionRecordOriginMapping'), { origin: order.get('origin') }).name
        							};
        						}
        						else
        						{
        							dynamic_column = {
        								label: _('Status:').translate()
        							,	type: 'status'
        							,	name: 'status'
        							,	value: order.get('status').name
        							};
        						}

        						var columns = [
        							{
        								label: _('Date:').translate()
        							,	type: 'date'
        							,	name: 'date'
        							,	value: order.get('trandate')
        							}
        						,	{
        								label: _('Amount:').translate()
        							,	type: 'currency'
        							,	name: 'amount'
        							,	value: order.get('amount_formatted')
        							}
        						,	{
        								type: 'tracking-number'
        							,	name: 'trackingNumber'
        							,	compositeKey: 'OrderHistoryListTrackingNumberView'
        							,	composite: new OrderHistoryListTrackingNumberView({
        									model: new Backbone.Model({
        										trackingNumbers: order.get('trackingnumbers')
        									})
        								,	showContentOnEmpty: true
        								,	contentClass: ''
        								,	collapseElements: true
        								})
        							}
        						];

        						columns.splice(2, 0, dynamic_column);

        						var model = new Backbone.Model({
        							title: new Handlebars.SafeString(_('<span class="tranid">$(0)</span>').translate(order.get('tranid')))
        						,	touchpoint: 'customercenter'
        						,	detailsURL: '/purchases/view/' + order.get('recordtype')  + '/' + order.get('internalid')
        						,	recordType: order.get('recordtype')
        						,	id: order.get('internalid')
        						,	internalid: order.get('internalid')
        						,	trackingNumbers: order.get('trackingnumbers')
        						,	columns: columns
        						});

        						return model;
        					}));

        				// CURRENCY SELECTOR FIX
                // this.profileModel = ProfileModel.getInstance();
                // document.cookie = "username=John Doe";
                // if(records_collection){
        				// 	localStorage.setItem('hasOrders', 'true');
                //   // this.profileModel.set('hasOrders', 'true').save();
        				// }else{
                //   localStorage.setItem('hasOrders', 'false');
                //   // this.profileModel.set('hasOrders', 'false').save();
                // }

        				return new BackboneCollectionView({
        					childView: RecordViewsView
        				,	collection: records_collection
        				,	viewsPerRow: 1
        				});
            }
          }


        });
    });
