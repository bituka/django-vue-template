function afterSubmit(type) {
    if(type == 'create')
    {
        var customerId = nlapiGetRecordId();
        var currentGlobalSubsriptionStatus = nlapiLookupField('customer', customerId, 'globalsubscriptionstatus');

        // globalsubscriptionstatus == 1 : (Soft Opt-In, the value we are setting up for new subscribers)
		// globalsubscriptionstatus == 2 : lead NOT subscribed (Soft Opt-Out)
		// globalsubscriptionstatus == 3 : lead already subscribed (Confirmed Opt-In)
		// globalsubscriptionstatus == 4 : lead NOT subscribed (Confirmed Opt-Out)

        // global subscription status is 'Confirmed Opt-In'
        if (currentGlobalSubsriptionStatus === '3') {
            var phone = nlapiLookupField('customer', customerId, 'phone') || '';
            nlapiSubmitField('customer', customerId, 'phone', '1234567');
            nlapiSubmitField('customer', customerId, 'globalsubscriptionstatus', '1');
            nlapiSubmitField('customer', customerId, 'phone', phone);
        }
        return true;
    }
}