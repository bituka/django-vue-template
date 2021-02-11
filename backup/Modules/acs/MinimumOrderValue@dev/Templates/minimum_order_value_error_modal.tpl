{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="global-views-confirmation-body {{className}}">
	{{#if showBodyMessage}}
		{{body}}
	{{else}}
		<div data-view="ChildViewMessage"></div>
	{{/if}}
</div>
<div class="global-views-confirmation-footer">
	<button class="cart-add-to-cart-button-button" style="width:25%" data-action="cancel">
		{{translate 'Close'}}
	</button>
</div>


{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
