/**
 * This scheduled script assign items to the commerce categories using a .txt file on the file cabinet.
 * The content of the file must follow the next rules:
 * column separated with ";" with the fields : iteminternalid;commercecategoryid
 *
 */
function assign_items() {

    try {
        // file to load

        nlapiLogExecution('DEBUG', 'Script Running' ,'Script Running');

        var fileId = nlapiGetContext().getSetting('SCRIPT', 'custscript_tt_file_id');
        var file = nlapiLoadFile(fileId);

        // string content
        var content = file.getValue();
        // array with each line of the content
        var linesOnFile = content.split("\n");
        checkLastElement(linesOnFile);

        // The first line is to parse the columns
        // Each element on the first
        if (linesOnFile && linesOnFile.length >= 1) {
            // For each on the first line of the file

            for each(lines in linesOnFile){

                var lineElements = lines.split(";");
                checkLastElement(lineElements);
                var itemId = lineElements[0];
                var categoryId = lineElements[1];
                var isPrimaryCategory = lineElements.length >=3 && lineElements[2]=="T";
                if(categoryId){
                    try{
                        var category = nlapiLoadRecord("commercecategory", categoryId);
                        category.selectNewLineItem('items');
                        category.setCurrentLineItemValue('items', 'item', itemId);
                        if(isPrimaryCategory){
                            // nlapiLogExecution('DEBUG', 'isPrimaryCategory', isPrimaryCategory);
                            category.setCurrentLineItemValue('items', 'primarycategory', "T");
                        }

                        category.commitLineItem('items');
                        nlapiLogExecution('DEBUG', 'itemId', itemId);

                        // // fix only for this account (slowly server response)
                        // sleep(1000);

                        nlapiSubmitRecord(category);
                        // nlapiSubmitRecord(category, false,  true);
                        nlapiLogExecution('DEBUG', 'submit-category', 'submit-category');

                        if (nlapiGetContext().getRemainingUsage() < 100) {
                            nlapiLogExecution('DEBUG', 'USAGE LOW', nlapiGetContext().getRemainingUsage());
                            nlapiYieldScript();
                        }

                    }catch(e){
                        nlapiLogExecution('DEBUG', 'Error on category: ' + categoryId ,e);
                    }

                }
            }
        }

    } catch (e) {
        nlapiLogExecution('DEBUG', 'Error',e);
    }


}


/**
 * checkLastElement
 * @desc If the last element of the array is "\r" or "" we remove that element of the array
 * If the last element finish with "\r" we remove that character
 * @param line
 */
function checkLastElement(line) {
    var element = line[line.length - 1];
    if (element == "\r" || element == "") {
        line.pop();
    }else{
        var lastCharacter = element[element.length -1];
        if(lastCharacter == "\r"){
            var element = element.substring(0, element.length-1);
            line[line.length - 1] = element;
        }
    }
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
