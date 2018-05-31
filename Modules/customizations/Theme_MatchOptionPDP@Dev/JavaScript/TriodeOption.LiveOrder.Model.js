define('TriodeOption.LiveOrder.Model', [
  'Backbone',
  'LiveOrder.Model',
  'underscore'
], function TriodeOptionLiveOrderModel(
  Backbone,
  LiveOrderModel,
  _
) {
  'use strict';

  _.extend(LiveOrderModel.prototype, {

    initialize: _.wrap(LiveOrderModel.prototype.initialize, function initialize(fn) {
      fn.apply(this, _.toArray(arguments).slice(1));
      this.on('change:lines', this.triodeOptionWrapLines.bind(this));
    }),

    triodeOptionWrapLines: function triodeOptionWrapLines() {
      var lines = this.get('lines').models;
      var optionsHashMap = {};
      var i;
      var line;
      var option;
      var options;
      var type;
      var key;

      for (i = 0; i < lines.length; i++) {

        line = lines[i];

        // get service item "Matched & Balanced Triode Sections" price to
        // calculate amount on shopping cart (TriodeOption.SelectedOption.View)
        if(line.get('item').get('internalid') == 5090){
          sessionStorage.setItem('5090', line.get('rate'));
        }

        options = line.get('options');
        if (options.size() > 0) {
          option = options.find(function find(opt) {
            return opt.get('cartOptionId') === 'custcol_tt_associated_item';
          });
          if (option) {
            type = option && option.get('value') && option.get('value').internalid;

            if (type) {

              key = option.get('value').internalid;
              optionsHashMap[key] = optionsHashMap[key] || {};
              optionsHashMap[key].index = i;
            }
          }

        }
      }

      _.each(optionsHashMap, function _triodeOptionHashMap(value, k) {
        if (value && !_.isUndefined(value.index)) {
          lines[value.index] = null;
        } else {
          // console.log(
          //   'Error with option sync',
          //   'Key:' + JSON.stringify(k) + ',Value:' + JSON.stringify(value)
          // );
        }
      });

      this.get('lines').models = _.compact(lines);
      this.get('lines').length = this.get('lines').models.length;

      return lines;
    }

  });
});
