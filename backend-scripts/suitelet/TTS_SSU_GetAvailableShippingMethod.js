/*
 ***********************************************************************
 *
 * The following JavaScript code is created by ERP Guru,
 * a NetSuite Partner. It is a SuiteFlex component containing custom code
 * intended for NetSuite (www.netsuite.com) and use the SuiteScript API.
 * The code is provided "as is": ERP Guru shall not be liable
 * for any damages arising out the intended use or if the code is modified
 * after delivery.
 *
 * Company:        ERP Guru inc., www.erpguru.com
 * Author:         guillaume.bouchardlafond@erpguru.com
 * File: 		   TTS_SSU_GetAvailableShippingMethod.js
 * Date:           October 2nd, 2012
 *
 ***********************************************************************/
/**
 * Gets the valid shipping method for the customer address
 * @author guilaume.bouchardlafond@erpguru.com
 * @param {nlobjRequest} request : the HTTP Request
 * @param {nlobjResponse} response : the HTTP Response
 */
function process(request, response){

	// nlapiLogExecution('debug', 'process', 'process');
	var country = request.getParameter('country');
	var state=request.getParameter('state');
	var postalCode=request.getParameter('postalcode');

	if (isEmpty(country) && isEmpty(state) && isEmpty(postalCode)) {

		// nlapiLogExecution('debug', 'process2', 'process2');
		var customerAddres = getCustomerAddress();
		country = customerAddres.country;
		state = customerAddres.state;
		postalCode = customerAddres.postalCode;
	}

    var postalValues = [];
    var stateValues = [];
    var countryValues = [];
    var values = [];

    var shippingByState = getAllShippingByState();
		// nlapiLogExecution('debug', 'shippingByState1', shippingByState);

    if (!isEmpty(country)) {
        var stateList = COUNTRY_STATE_LIST[country];
        if (!isEmpty(stateList)) {
            var countryText = stateList.name;

            if (!isEmpty(postalCode)) {
                postalValues = getPostalMatch(shippingByState, countryText, postalCode);
            }
            if (!isEmpty(state)) {
                var textState = '';
                //External librairy EG_LIB_States.js
                if (!isEmpty(stateList)) {
                    textState = stateList.states[state];
                }
                stateValues = getStateMatch(shippingByState, countryText, textState);
            }
            countryValues = getCountryMatch(shippingByState, countryText);
            values = mergeResults(countryValues, stateValues, postalValues);
        }
        //If no match we send the generic value
        if (values.length == 0) {
            values = getCountryMatch(shippingByState, '');
        }
    } else {
        values = getCountryMatch(shippingByState, '');
				// nlapiLogExecution('debug', 'shippingByState', shippingByState);
    }


		nlapiLogExecution('debug', 'response', JSON.stringify(values));

    response.setContentType('PLAINTEXT');
    response.write(JSON.stringify(values));
}

/**
 * Get the shipping method where the postal code is in the range
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {Object} shippingByState : the Object with all the shipping item by states
 * @param {String} country : the country to filter
 * @param {String} postalCode : the complete postal code
 * @return {Array} return an array of matching shipping.
 */
function getPostalMatch(shippingByState, country, postalCode){
    var postalMatch = [];
    for (var i = 0; i < shippingByState.length; i++) {
        var recordCountry = shippingByState[i].country;
        if (compareString(recordCountry, country)) {
            var charCodedPostalCode = getCharCodes(postalCode.toUpperCase());
            var lowerBoundCharCode = shippingByState[i].lowerpccode;
            var higherBoundCharCode = shippingByState[i].higherpccode;
            var codeMatch = true;
            if (!isEmpty(lowerBoundCharCode)) {
                //Check if the zip code is between the zipcode range
                for (var j = 0; j < lowerBoundCharCode.length; j++) {
                    if (charCodedPostalCode[j] == null || lowerBoundCharCode[j] > charCodedPostalCode[j]) {
                        codeMatch = false;
                        break;
                    } else if (lowerBoundCharCode[j] < charCodedPostalCode[j]) {
                        break;
                    }
                }
            }
            if (!isEmpty(higherBoundCharCode)) {
                for (var k = 0; k < higherBoundCharCode.length; k++) {
                    if (charCodedPostalCode[k] == null || higherBoundCharCode[k] < charCodedPostalCode[k]) {
                        codeMatch = false;
                        break;
                    } else if (higherBoundCharCode[k] > charCodedPostalCode[k]) {
                        break;
                    }
                }
            }
            if (codeMatch && (!isEmpty(lowerBoundCharCode) || !isEmpty(lowerBoundCharCode))) {
                postalMatch.push(shippingByState[i]);
            }
        }
    }
    return postalMatch;
}

/**
 * Get the shipping method where the state match
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {Object} shippingByState : the Object with all the shipping item by states
 * @param {String} country : the country to filter
 * @param {String} postalCode : the complete postal code
 * @return {Array} return an array of matching shipping.
 */
function getStateMatch(shippingByState, country, state){
    var stateMatch = [];
    var stateList = null;

    for (var i = 0; i < shippingByState.length; i++) {
        var recordCountry = shippingByState[i].country;
        if (compareString(recordCountry, country)) {
            var recordStates = shippingByState[i].state;
            var lowerPostalCode = shippingByState[i].lowerpc;
            var higherPostalCode = shippingByState[i].higehrpc;
            for (var j = 0; j < recordStates.length; j++) {
                if (compareString(recordStates[j], state) && isEmpty(lowerPostalCode) && isEmpty(higherPostalCode)) {
                    stateMatch.push(shippingByState[i]);
                    break;
                }
            }
        }
    }
    return stateMatch;
}

/**
 * Get the shipping method where the country match and the other field are empty
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {Object} shippingByState : the Object with all the shipping item by states
 * @param {String} country : the country to filter
 * @param {String} postalCode : the complete postal code
 * @return {Array} return an array of matching shipping.
 */
function getCountryMatch(shippingByState, country){
    var countryMatch = [];
    for (var i = 0; i < shippingByState.length; i++) {
        var recordCountry = shippingByState[i].country;
        if (compareString(recordCountry, country)) {
            var recordState = shippingByState[i].state;
            var lowerPostalCode = shippingByState[i].lowerpc;
            var higherPostalCode = shippingByState[i].higehrpc;
            if (isEmpty(recordState) && isEmpty(lowerPostalCode) && isEmpty(higherPostalCode)) {
                countryMatch.push(shippingByState[i]);
            }
        }
    }
    return countryMatch;
}

/**
 * Get all the ShippingByStateRecord formated as an Objectcontaining the following key-value match
 * 		name : The name of the shipping
 * 		country : the country code
 * 		state : the list of state or province (array)
 * 		shipping : the list of shipping item (array)
 * 		lowerpc : the lower bound postal code
 * 		higehrpc : the higher bound postal code
 * 		lowerpccode : an aray containing a charCode represnetation of each character for the lower bound postal code
 * 		higherpccode : an aray containing a charCode represnetation of each character for the higher bound postal code
 * 		default : is the defautl shipping value (boolean)
 * @author guillaume.bouchardlafond@erpguru.com
 * @return {Array} an array of object with all the information on each record
 */
function getAllShippingByState(){
    var results = searchShippingByStateRecords();
    var convertedResults = transformShippingByStateToArrayOfObject(results);

    return convertedResults;
}

/**
 * Transform the results into an array of object with different record information
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {Object} results
 */
function transformShippingByStateToArrayOfObject(results){
    var array = [];
    if (results != null) {
        for (var i = 0; i < results.length; i++) {

            var state = results[i].getText('custrecord_shipstate');
            if (!isEmpty(state)) {
                state = state.split(',');
            }

            var shipping = results[i].getValue('custrecord_available_shipping');
            if (!isEmpty(shipping)) {
                shipping = shipping.split(',');
            }
            var lowerBoundPostalCode = results[i].getValue('custrecord_low_postal');
            if (!isEmpty(lowerBoundPostalCode)) {
                lowerBoundPostalCode = lowerBoundPostalCode.toUpperCase();
            }

            var higherBoundPostalCode = results[i].getValue('custrecord_high_postal');
            if (!isEmpty(higherBoundPostalCode)) {
                higherBoundPostalCode = higherBoundPostalCode.toUpperCase();
            }

            array.push({
                name: results[i].getValue('name'),
                country: results[i].getText('custrecord_shipcountry'),
                state: state,
                shipping: shipping,
                lowerpc: lowerBoundPostalCode,
                higherpc: higherBoundPostalCode,
                lowerpccode: getCharCodes(lowerBoundPostalCode),
                higherpccode: getCharCodes(higherBoundPostalCode)
            });
        }
    }
    return array;
}

/**
 * Get all the ShippingByState Record
 * @author guillaume.bouchardlafond@erpguru.com
 * @return {Array} an array of nlobjSearchResult with all the information on each record
 */
function searchShippingByStateRecords(){
    var filters = [];
    filters.push(['isinactive', 'is', 'F']);
    var columns = [];
    columns.push(new nlobjSearchColumn('name'));
    columns.push(new nlobjSearchColumn('custrecord_shipcountry'));
    columns.push(new nlobjSearchColumn('custrecord_shipstate'));
    columns.push(new nlobjSearchColumn('custrecord_available_shipping'));
    columns.push(new nlobjSearchColumn('custrecord_low_postal'));
    columns.push(new nlobjSearchColumn('custrecord_high_postal'));


    var search = nlapiSearchRecord('customrecord_shipping_state', null, filters, columns);

    return search;
}

/**
 * Gets the country, state and postal code of the default address for a customer if he exists
 * @author guillaume.bouchardlafond@erpguru.com
 * @return return the country, state and postal code of the default address for a customer if he exists
 */
function getCustomerAddress(){
    var customerAddress = {
        country: '',
        state: '',
        postalCode: ''
    };
    var user = nlapiGetUser();
    nlapiLogExecution('debug', 'User', user);
    var filters = [];
    filters.push(['custrecord_addrtrack_customer', 'is', user]);

    var columns = [];
    columns.push(new nlobjSearchColumn('custrecord_addrtrack_zip'));
    columns.push(new nlobjSearchColumn('custrecord_addrtrack_state'));
    columns.push(new nlobjSearchColumn('custrecord_addrtrack_country'));

    var results = nlapiSearchRecord('customrecord_address_tracker', null, filters, columns);

    if (!isEmpty(results)) {
        // nlapiLogExecution('debug', 'Results', results.length);
        customerAddress.country = results[0].getValue('custrecord_addrtrack_country');
        customerAddress.state = results[0].getValue('custrecord_addrtrack_state');
        customerAddress.postalCode = results[0].getValue('custrecord_addrtrack_zip');
    }

		nlapiLogExecution('debug', 'customerAddress', JSON.stringify(customerAddress));
    return customerAddress;

}

/**
 * Compare two string without case sensivity
 * @param {String} str1 : the first string
 * @param {String} str2 : the second string
 */
function compareString(str1, str2){
    var isTheSame = false;
    if (str1 != null && str2 != null) {
        isTheSame = str1.toUpperCase() == str2.toUpperCase();
    } else {
        isTheSame = true;
    }
    return isTheSame;
}

/**
 * Merge the results together based on their precision. Country then state then postal code.
 * If a postal
 * @param {Object} countryArray: the list of matching customer address shipping country
 * @param {Object} stateArray : the list of matching customer address shipping states
 * @param {Object} postalCodeArray: the list of matching customer address shipping postal code
 */
function mergeResults(countryArray, stateArray, postalCodeArray){
    var mergedResults = [];
    mergedResults = mergedResults.concat(countryArray);
    for (var i = 0; i < stateArray.length; i++) {
        var found = false;
        for (var j = 0; j < mergedResults.length; j++) {
            if (stateArray[i].name == mergedResults[j].name) {
                found = true;
                break;
            }
        }
        if (found) {
            mergedResults[j] = stateArray[i];
        } else {
            mergedResults.push(stateArray[i]);
        }
    }

    for (var k = 0; k < postalCodeArray.length; k++) {
        var isfound = false;
        for (var l = 0; l < mergedResults.length; l++) {
            if (postalCodeArray[k].name == mergedResults[l].name) {
                isfound = true;
                break;
            }
        }
        if (isfound) {
            mergedResults[l] = postalCodeArray[k];
        } else {
            mergedResults.push(postalCodeArray[k]);
        }
    }

    return mergedResults;
}

/**
 * Create an array of char code for each char in a string
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {String} string : the string to evaluate
 * @return {Array} an array of cahr code containing a code for each char of the string
 */
function getCharCodes(string){
    var array = [];
    if (!isEmpty(string)) {
        for (var i = 0; i < string.length; i++) {
            array.push(string.charCodeAt(i));
        }
    }
    return array;
}

/**
 * Return true if a value is empty or null
 * @author guillaume.bouchardlafond@erpguru.com
 * @param {Object} val : the value to validate
 * @return {boolean}Return true if a value is entry or null
 */
function isEmpty(val){
    return val == null || val == '';
}
