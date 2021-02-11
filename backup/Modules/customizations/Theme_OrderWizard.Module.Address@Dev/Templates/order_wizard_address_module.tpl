{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="order-wizard-address-module">
	<div class="order-wizard-address-module-show-addresses-container">
		{{#if showTitle}}
			<h3 class="order-wizard-address-module-title">
				{{title}}
			</h3>
		{{/if}}
		
		{{#if isSameAsEnabled}}
			<div class="order-wizard-address-module-container">
				<div class="content-row">
				<a data-action="same-as" data-value="1"
					class="content-column order-wizard-address-module-container-selector order-wizard-shipmethod-module-option {{#if isSameAsSelected}}order-wizard-shipmethod-module-option-active{{/if}}">
						<input class="order-wizard-shipmethod-module-checkbox"
							{{#if isSameAsCheckBoxDisable}}disabled="disabled"{{/if}}
							type="radio"
							name="same-as-address"
							value="1"
							{{#if isSameAsSelected}}checked{{/if}}
						/>
						<label class="order-wizard-address-module-container-title">
							Same as Shipping Address
						</label>
						<span class="order-wizard-address-module-container-description">
							Choose this to use the shipping address provided earlier.
						</span>
				</a>

				<a data-action="diff-as" data-value="0"
					class="content-column order-wizard-address-module-container-selector order-wizard-shipmethod-module-option {{#if isDifferentSelected}}order-wizard-shipmethod-module-option-active{{/if}}">
						<input class="order-wizard-shipmethod-module-checkbox"
							{{#if isSameAsCheckBoxDisable}}disabled="disabled"{{/if}}
							type="radio"
							name="same-as-address"
							value="0"
							{{#if isDifferentSelected}}checked{{/if}}
						/>
						<label class="order-wizard-address-module-container-title">
							Is Different from Shipping Address
						</label>
						<span class="order-wizard-address-module-container-description">
							Choose this to enter a new billing address.
						</span>
				</a>
				</div>
			</div>
		{{/if}}


		{{#if showSingleAddressDetails}}
			<div data-view="Single.Address.Details" class="order-wizard-address-module-single"></div>
		{{else}}
			{{#if hideAddressDetailsEntry}}
				
			{{else}}
				{{#if showAddressList}}
					<div id="order-wizard-address-module-placeholder" {{#if showManageValue}}data-manage="{{manageValue}}"{{/if}} class="order-wizard-address-module-list-placeholder">
						<p>
							<a class="order-wizard-address-module-new-button" href="/addressbook/new" data-toggle="show-in-modal">
								{{translate 'Add New Address'}}
							</a>
						</p>
						<div class="order-wizard-address-module-address-container">
							<div data-view="Address.List"></div>
						</div>
					</div>
				{{else}}
					<div id="address-module-form-placeholder" {{#if showManageValue}}data-manage="{{manageValue}}"{{/if}} class="order-wizard-address-module-form-placeholder">
						<div data-view="New.Address.Form"></div>

						{{#if showSaveButton}}
							<div class="order-wizard-address-module-form-actions">
								<button type="submit" class="order-wizard-address-module-save-button" data-action="submit">
									{{translate 'Save Address'}}
								</button>
							</div>
						{{/if}}
					</div>
				{{/if}}			
			{{/if}}
		{{/if}}
	</div>
</div>



{{!----
Use the following context variables when customizing this template: 
	
	showTitle (Boolean)
	title (String)
	isSameAsEnabled (Boolean)
	isSameAsCheckBoxDisable (Boolean)
	isSameAsSelected (Boolean)
	sameAsMessage (String)
	showSingleAddressDetails (Boolean)
	showAddressList (Boolean)
	changeLinkText (String)
	selectedAddressId (String)
	showManageValue (Boolean)
	manageValue (String)
	model (Object)
	model.addresses (Array)
	model.addresses.0 (Object)
	model.addresses.0.zip (String)
	model.addresses.0.country (String)
	model.addresses.0.addr2 (String)
	model.addresses.0.addr1 (String)
	model.addresses.0.city (String)
	model.addresses.0.addr3 (String)
	model.addresses.0.isvalid (String)
	model.addresses.0.internalid (String)
	model.addresses.0.phone (String)
	model.addresses.0.defaultbilling (String)
	model.addresses.0.defaultshipping (String)
	model.addresses.0.isresidential (String)
	model.addresses.0.state (String)
	model.addresses.0.fullname (String)
	model.addresses.0.company (undefined)
	model.shipmethods (Array)
	model.shipmethods.0 (Object)
	model.shipmethods.0.internalid (String)
	model.shipmethods.0.name (String)
	model.shipmethods.0.shipcarrier (String)
	model.shipmethods.0.rate (Number)
	model.shipmethods.0.rate_formatted (String)
	model.lines (Array)
	model.lines.0 (Object)
	model.lines.0.item (Object)
	model.lines.0.item.internalid (Number)
	model.lines.0.item.type (String)
	model.lines.0.quantity (Number)
	model.lines.0.internalid (String)
	model.lines.0.options (Array)
	model.lines.0.options.0 (Object)
	model.lines.0.options.0.cartOptionId (String)
	model.lines.0.options.0.itemOptionId (String)
	model.lines.0.options.0.label (String)
	model.lines.0.options.0.type (String)
	model.lines.0.options.0.value (Object)
	model.lines.0.options.0.value.label (String)
	model.lines.0.options.0.value.internalid (String)
	model.lines.0.location (String)
	model.lines.0.fulfillmentChoice (String)
	model.paymentmethods (Array)
	model.paymentmethods.0 (Object)
	model.paymentmethods.0.type (String)
	model.paymentmethods.0.primary (Boolean)
	model.paymentmethods.0.creditcard (Object)
	model.paymentmethods.0.creditcard.internalid (String)
	model.paymentmethods.0.creditcard.ccnumber (String)
	model.paymentmethods.0.creditcard.ccname (String)
	model.paymentmethods.0.creditcard.ccexpiredate (String)
	model.paymentmethods.0.creditcard.ccsecuritycode (undefined)
	model.paymentmethods.0.creditcard.expmonth (String)
	model.paymentmethods.0.creditcard.expyear (String)
	model.paymentmethods.0.creditcard.paymentmethod (Object)
	model.paymentmethods.0.creditcard.paymentmethod.internalid (String)
	model.paymentmethods.0.creditcard.paymentmethod.name (String)
	model.paymentmethods.0.creditcard.paymentmethod.creditcard (Boolean)
	model.paymentmethods.0.creditcard.paymentmethod.ispaypal (Boolean)
	model.paymentmethods.0.creditcard.paymentmethod.isexternal (Boolean)
	model.paymentmethods.0.creditcard.paymentmethod.key (String)
	model.internalid (String)
	model.confirmation (Object)
	model.confirmation.addresses (Array)
	model.confirmation.shipmethods (Array)
	model.confirmation.lines (Array)
	model.confirmation.paymentmethods (Array)
	model.multishipmethods (Array)
	model.lines_sort (Array)
	model.lines_sort.0 (String)
	model.latest_addition (undefined)
	model.promocodes (Array)
	model.ismultishipto (Boolean)
	model.shipmethod (undefined)
	model.billaddress (String)
	model.shipaddress (String)
	model.isPaypalComplete (Boolean)
	model.touchpoints (Object)
	model.touchpoints.logout (String)
	model.touchpoints.customercenter (String)
	model.touchpoints.serversync (String)
	model.touchpoints.viewcart (String)
	model.touchpoints.login (String)
	model.touchpoints.welcome (String)
	model.touchpoints.checkout (String)
	model.touchpoints.continueshopping (String)
	model.touchpoints.home (String)
	model.touchpoints.register (String)
	model.touchpoints.storelocator (String)
	model.agreetermcondition (Boolean)
	model.summary (Object)
	model.summary.discounttotal_formatted (String)
	model.summary.taxonshipping_formatted (String)
	model.summary.taxondiscount_formatted (String)
	model.summary.itemcount (Number)
	model.summary.taxonhandling_formatted (String)
	model.summary.total (Number)
	model.summary.tax2total (Number)
	model.summary.discountedsubtotal (Number)
	model.summary.taxtotal (Number)
	model.summary.discounttotal (Number)
	model.summary.discountedsubtotal_formatted (String)
	model.summary.taxondiscount (Number)
	model.summary.handlingcost_formatted (String)
	model.summary.taxonshipping (Number)
	model.summary.taxtotal_formatted (String)
	model.summary.totalcombinedtaxes_formatted (String)
	model.summary.handlingcost (Number)
	model.summary.totalcombinedtaxes (Number)
	model.summary.giftcertapplied_formatted (String)
	model.summary.shippingcost_formatted (String)
	model.summary.discountrate (String)
	model.summary.taxonhandling (Number)
	model.summary.tax2total_formatted (String)
	model.summary.discountrate_formatted (String)
	model.summary.estimatedshipping (Number)
	model.summary.subtotal (Number)
	model.summary.shippingcost (Number)
	model.summary.estimatedshipping_formatted (String)
	model.summary.total_formatted (String)
	model.summary.giftcertapplied (Number)
	model.summary.subtotal_formatted (String)
	model.options (Object)
	model.purchasenumber (String)
	model.sameAs (Boolean)

----}}
