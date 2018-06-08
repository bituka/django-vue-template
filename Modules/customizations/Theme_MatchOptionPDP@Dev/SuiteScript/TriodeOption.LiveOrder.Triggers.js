define('TriodeOption.LiveOrder.Triggers', [
    'Application',
    'underscore'
], function TriodeOptionTriggers(
    Application,

    _
) {
    'use strict';


    Application.on('before:LiveOrder.addLine',
        function beforeLiveOrderAddLineTriodeOption(Model, currentLine) {
            Model.addTriodeOption(currentLine);
        });

    Application.on('before:LiveOrder.addLines',
        function beforeLiveOrderAddLinesTriodeOption(Model, lines) {
            // nlapiLogExecution('DEBUG','before: addLines','before: addLines');
            Model.addTriodeOptions(lines);
        });

    Application.on('before:LiveOrder.removeLine',
        function beforeLiveOrderRemoveLine(Model, currentLine) {
            Model.removeTriodeOption(currentLine);
            // nlapiLogExecution('DEBUG','before: removeLine', JSON.stringify(currentLine));
        });

});
