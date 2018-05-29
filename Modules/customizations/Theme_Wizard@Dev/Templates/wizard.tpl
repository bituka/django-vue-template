{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

{{#if showBreadcrumb}}
<header class="wizard-header">
	<h1 class="wizard-header-title">{{translate 'Checkout'}}</h1>
	<div data-view="Wizard.StepNavigation"></div>
</header>
{{/if}}
<div class="wizard-top-text">
	<p><b>Canadian residents only</b>: Prices have been converted to CAD at the current exchange rate. All Canadian orders will be charged GST of 5% or HST where applicable.</p>
	<p><b>International Orders</b>: We will e-mail a shipping quote to inform you of the available shipping options and costs.</p>
</div>
<div id="wizard-content" class="wizard-content"></div>



{{!----
Use the following context variables when customizing this template:

	showBreadcrumb (Boolean)

----}}
