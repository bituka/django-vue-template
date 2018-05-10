define('TriodeOption.LiveOrder.Extension', [
  'Application',
  'Models.Init',
  'Utils',
  'LiveOrder.Model',
  'underscore'

], function LiveOrderTriodeOption(
  Application,
  CommerceAPI,
  Utils,
  LiveOrder,
  _
) {
  'use strict';


  _.extend(LiveOrder, {

    /**
     * Add a triode option item to the current order.
     */
    tweakLinesGetTriodeOption: function(currentLine) {

        var triodeItemId;
        var newLine;

        if (currentLine.options.length > 0) {

          var aux = currentLine.options[0].cartOptionId;
          nlapiLogExecution('DEBUG', 'aux', aux);

          if (currentLine && currentLine.options[0].cartOptionId == "custcol_additional_options") {

            triodeItemId = _.findWhere(currentLine.options, {
              cartOptionId: 'custcol_additional_options'
            });
            // var optValue = triodeItemId.value.internalid;
            // nlapiLogExecution('DEBUG','--optValue 1--',optValue);

            if (triodeItemId && triodeItemId.value) {

              if (triodeItemId.value.internalid == 3) {

                var itemId = String(currentLine.item.internalid);
                var optionsToBeAdded = {
                  "cartOptionId": "custcol_tt_associated_item",
                  "label": "Associated item",
                  "value": {
                    "internalid": itemId,
                    "label": itemId,
                  }
                };
                newLine = {
                  item: {
                    internalid: "5090"
                  },
                  quantity: currentLine.quantity,
                  options: [optionsToBeAdded]
                };
              }

              return newLine;
            }
          }
        }
        return null;
      }

    , addTriodeOption: function addTriodeOption(currentLine){

        nlapiLogExecution('DEBUG', 'addTriodeOption - line', JSON.stringify(currentLine));
        var triodeOptionLine = this.tweakLinesGetTriodeOption(currentLine);
        if (triodeOptionLine) {
            Application.once('after:LiveOrder.addLine', function afterLiveOrderAddLine(Model, responseData) {
                if (responseData) {
                    Model.addLine(triodeOptionLine);
                    CommerceAPI.context.setSessionObject('latest_addition', responseData);
                }
            });
        }
    }


    /**
     * @param lines
     * @desc Support only 1 line
     */
    , addTriodeOptions: function addTriodeOptions(lines) {

        var currentLine;
        var triodeLine;
        nlapiLogExecution('DEBUG','addTriodeOptions - lines',JSON.stringify(lines));

        if (_.isArray(lines) && lines.length === 1) {

          // nlapiLogExecution('DEBUG','currentLine',JSON.stringify(lines[0]));
          currentLine = lines[0];
          triodeLine = this.tweakLinesGetTriodeOption(currentLine);

          //If the add to cart contain a triode Request
          if (triodeLine) {

            // nlapiLogExecution('DEBUG','triodeLine',JSON.stringify(triodeLine));
            lines[1] = triodeLine;
            Application.once('after:LiveOrder.addLines', function afterLiveOrderAddLines(Model, responseData) {
              if (responseData) {
                CommerceAPI.context.setSessionObject('latest_addition', responseData[0].orderitemid);
              }
            });
          }
        }
      }


    , removeTriodeOption: function removeTriodeOption(currentLine) {

        var orderFieldKeys = [
          'orderitemid',
          'quantity',
          'internalid',
          'options'
        ];

        // get the 'parent' item id
        var itemLine = JSON.stringify(currentLine);
        var itemId = itemLine.substring(5, itemLine.indexOf('set'));
        nlapiLogExecution('DEBUG','removeTriodeOption - itemId', itemId);

        // Removing current line, we have to find the triode option
        var line = CommerceAPI.order.getItem(currentLine, orderFieldKeys);
        var optionTriode = _.findWhere(line.options, {
          id: 'CUSTCOL_ADDITIONAL_OPTIONS'
        });
        nlapiLogExecution('DEBUG','removeTriodeOption - optionTriode', JSON.stringify(optionTriode));

        var lines;

        // If it has a triode option
        if (optionTriode && optionTriode.value == 3) {

          // we have to search for the other line :(
          lines = CommerceAPI.order.getItems(orderFieldKeys);

          // Why EVERY instead of each? Every will break on the first FALSE returned;
          // We need to iterate only until we get the triode option item
          _.every(lines, function every(l) {
            var gwId = _.findWhere(l.options, {
              id: 'CUSTCOL_TT_ASSOCIATED_ITEM'
            });
            // Found it? so after the removeLine, let's hang to it
            if (gwId && gwId.value === itemId) {
              Application.once(
                'after:LiveOrder.removeLine',
                function afterLiveOrderRemoveLine(Model) {
                  Model.removeLine(l.orderitemid);
                }
              );
              return false;
            }
            return true;
          });
        }
      }


    // , updateTriode: function updateTriode(line) {
    //   var orderFieldKeys = [
    //     'orderitemid',
    //     'quantity',
    //     'internalid',
    //     'options'
    //   ];
    //
    //   nlapiLogExecution('DEBUG', 'updateTriode - line', JSON.stringify(line));
    //   var quantity = line.quantity;
    //
    //   // get the 'parent' item id
    //   var itemId = line.item.internalid;
    //   // nlapiLogExecution('DEBUG','updateTriode - itemId', itemId);
    //
    //   // Removing current line, we have to find the triode option
    //   var optionTriode = _.findWhere(line.options, {
    //     cartOptionId: 'custcol_additional_options'
    //   });
    //   // nlapiLogExecution('DEBUG','update - optionTriode', JSON.stringify(optionTriode));
    //
    //   // If it has triode
    //   if (optionTriode && optionTriode.value.internalid == 3) {
    //
    //     // nlapiLogExecution('DEBUG','update - optionTriode','optionTriode');
    //     // we have to search for the other line :(
    //     var lines = CommerceAPI.order.getItems(orderFieldKeys);
    //
    //     // Why EVERY instead of each? Every will break on the first FALSE returned;
    //     // We need to iterate only until we get the triode wrap item
    //     _.every(lines, function every(l) {
    //
    //       // filter by service item
    //       if (l.internalid == 5090) {
    //
    //         var itemlineId = l.value;
    //         // nlapiLogExecution('DEBUG','update - 5090', itemlineId);
    //
    //         var serviceItem = _.findWhere(l.options, {id: 'CUSTCOL_TT_ASSOCIATED_ITEM'});
    //         // nlapiLogExecution('DEBUG','update - serviceItem',JSON.stringify(serviceItem));
    //
    //         if (serviceItem && serviceItem.value == itemId) {
    //           nlapiLogExecution('DEBUG', 'update - line_data', JSON.stringify(l));
    //           var updateLinId = "item" + l.internalid + "set" + l.internal_setid;
    //           // set new quantity
    //           l.quantity = quantity;
    //
    //           return false;
    //         }
    //         return true;
    //       }
    //
    //     });
    //
    //   }
    // }


  });
});
