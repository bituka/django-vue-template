function backInStockScheduleScripts() {
    try {
        nlapiLogExecution('DEBUG', 'entering script function.')
        // Create Render Template
        var renderer = nlapiCreateTemplateRenderer();

        var backStockConf = nlapiLoadRecord('customrecord_bis_config', '1');
        var emailTemplteId = backStockConf.getFieldValue("custrecord_bis_email_template_id");

        var employee = backStockConf.getFieldValue("custrecord_bis_employee_id");
        var storeURL = backStockConf.getFieldValue("custrecord_store_url");
        var accountNumber = backStockConf.getFieldValue("custrecordbis_account_number");

        var searchresults = nlapiSearchRecord('customrecordbackinstocksc', 'customsearchback_in_stock_record_search', null, null);

        var sentEmails = [];

        if (searchresults != null) {
            nlapiLogExecution('Error', 'backInStockScheduleScripts', 'searchresults.length - ' + searchresults.length);
        }

    //    for (var i = 0; searchresults != null && i < searchresults.length && i < 80; i++) {

        //    var backStockId = searchresults[i].getId();
            try {

                var backObject = nlapiLoadRecord('customrecordbackinstocksc', 92309);
                
                var customerEmail = "";

                var customerId = backObject.getFieldValue('custrecordcustomer_name_backinstock');

                if (customerId != null) {
                    var customer = nlapiLoadRecord('customer', customerId);
                    customerEmail = customer.getFieldValue("email");

                    // renderer.addRecord('customerEmail',backObject);

                }
                else {
                    customerEmail = backObject.getFieldValue('custrecordback_in_stock_customer_email');

                    renderer.addRecord('customerEmail', backObject);
                }
                var itemId = backObject.getFieldValue('custrecorditem_back_in_stock');

                //New validation for duplicate emails
                
                var pseudoId = itemId + '-' + backObject.getFieldValue('custrecordback_in_stock_customer_email');
                if (backObject.getFieldValue('custrecord_backinstock_sent') == 'T' || sentEmails.indexOf(pseudoId) > -1) {
                    nlapiLogExecution('DEBUG', 'condition1problem', employee);
                    //continue;
                }
                
                if (customerEmail == null || customerEmail.length == 0) {
                    nlapiLogExecution('DEBUG', 'condition2problem', employee);
                    // continue;
                }
                var priceBIS = backObject.getFieldValue('custrecord_bis_item_price');
                var itemId = backObject.getFieldValue('custrecorditem_back_in_stock');

                // renderer.addRecord('priceBIS',backObject);
                // renderer.addRecord('itemId',backObject);

                var itemRefObj = '';
                try {

                    itemRefObj = nlapiLoadRecord('inventoryitem', itemId);
                }
                catch (e) {

                    try {

                        itemRefObj = nlapiLoadRecord('kititem', itemId);
                    }
                    catch (e1) {

                    }
                }
                var itemName = itemRefObj.getFieldValue("itemid"); // storedisplayname");
                var itemStoreName = itemRefObj.getFieldValue("storedisplayname");
                var itemURL = storeURL + "/s.nl/it.A/id." + itemId + "/.f";
                var itemImg = storeURL + "/core/media/media.nl?id=" + itemRefObj.getFieldValue("storedisplaythumbnail") + "&c=" + accountNumber;
                var storedescription = itemRefObj.getFieldValue("storedescription");

                // load template file from file cainet template file is just an HTML file
                var txtFile = nlapiLoadFile(emailTemplteId);
                var txt = txtFile.getValue();

                txt = txt.replace(/_itemName/g, itemName);
                txt = txt.replace(/_itemStoreName/g, itemStoreName);
                txt = txt.replace(/_itemURL/g, itemURL);
                txt = txt.replace(/_itemPrice/g, priceBIS);
                txt = txt.replace(/_itemImg/g, itemImg);
                txt = txt.replace(/_itemStoreDescription/g, storedescription);

                // Set Renderer Template:
                renderer.setTemplate(txt);

                renderer.addRecord('customer', customer);

                // Added Renderer:
                var emailBodyText = renderer.renderToString();

                var subject = txtFile.getName();

                if (subject.split('_itemName').length > 0) {
                    subject = subject.split('_itemName')[0] + itemName + (subject.split('_itemName')[1] ? subject.split('_itemName')[1] : '');

                }

                try {

                    var rec = new Array();
                    rec['entity'] = customerId;
                    nlapiLogExecution('DEBUG', 'employee', employee);
                    nlapiLogExecution('DEBUG', 'customerEmail', customerEmail);
                    nlapiLogExecution('DEBUG', 'subject', subject);
                    nlapiLogExecution('DEBUG', 'emailBodyText', emailBodyText);
                    nlapiSendEmail(employee, customerEmail, subject, emailBodyText, null, null, rec);

                }
                catch (e) {
                    nlapiLogExecution('Error', 'backInStockScheduleScripts', 'problems sending the email - ' + e);
                }

                backObject.setFieldValue('custrecordemail_sent_date', nlapiDateToString(new Date()));
                backObject.setFieldValue('custrecord_backinstock_sent', 'T');
                sentEmails.push(pseudoId);
                nlapiSubmitRecord(backObject, false, true);
            }
            catch (e) {
                nlapiLogExecution('Error', 'backInStockScheduleScripts', 'Error processing the record: ' + backStockId + " - Error msg: " + e);
            }
        }
    //}
    catch (e) {
        nlapiLogExecution('Error', 'backInStockScheduleScripts', 'GENERAL ERROR - ' + e);
    }

}