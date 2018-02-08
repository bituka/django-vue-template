<div class="product-details-package-options">
  <h2>Tube upgrade package includes...</h2>
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
        <select>
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
