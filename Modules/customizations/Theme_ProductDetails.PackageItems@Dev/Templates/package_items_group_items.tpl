<div class="tube_store_loading_packages">
<img src="http://thetubestore.production.netsuitestaging.com/Images/Global/Rotating_Tube_Loading_Icon.gif" />
</div>  
  <div class="product-details-package-options">
    <h2>Tube upgrade package includes</h2>
    <table>
      {{#each packageItems}}
      <tr>
      <td>{{quantity}} {{translate 'Tubes'}}</td>
      <td><a href="product/{{item}}" data-touchpoint="home" data-hashtag="product/{{item}}">{{item_display}}</a></td>
      <td>
        {{#if itemOptions}}
        <div class="product-details-full-main-pack-options">
          <label for="">{{itemOptions.label}}</label>
          {{#if itemOptions.values}}
          <select data-action="set-option" data-item-id="{{item}}" data-item-option="{{itemOptions.internalid}}">
          {{#each itemOptions.values}}
              <option value="{{internalid}}">{{label}}</option>
          {{/each}}
          </select>
          {{else}}
            {{label}}
          {{/if}}
        </div>
        {{/if}}
      </td>
      </tr>
      {{/each}}
    </table>
  </div>

