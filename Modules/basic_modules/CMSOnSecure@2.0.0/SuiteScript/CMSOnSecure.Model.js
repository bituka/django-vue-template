define('CMSOnSecure.Model', [
    'SC.Model', 'underscore'
], function(SCModel, _) {
    'use strict';

    return SCModel.extend({
        name: 'CMSOnSecure',
        get: function() {
            return {
                "live_template_path": "/Web Site Hosting Files/Jantas-Elbrus-Automation-Hosting-Files/CMS/Site-4/Unpublished/Templates/cms-templates-015dd2a34e73.js",
                "live_template_content": "CMS.templates = {\"macros\":[],\"image_default_tmpl\":\"<% if (data.fields.string_link) { %>\\n\\t<a href=\\\"<%- data.fields.string_link %>\\\">\\n<% } %>\\n<img src=\\\"<%- data.fields.string_src %>\\\"<% if (data.fields.string_alt) { %> alt=\\\"<%- data.fields.string_alt %>\\\"<% } %> data-loader=\\\"false\\\" \\/>\\n<% if (data.fields.string_link) { %>\\n\\t<\\/a>\\n<% } %>\\n\",\"merchzone_default_tmpl\":\"<% var items_per_row = 4, grid_columns = 12 \\/ items_per_row; %>\\n<aside>\\n\\t<div class=\\\"row\\\">\\n\\t\\t<% _.each(data.items, function (item, index) { %>\\n\\t\\t\\t<% if ((index % items_per_row) == 0 && index > 0) { %>\\n\\t\\t\\t\\t<\\/div>\\n\\t\\t\\t\\t<div class=\\\"row\\\">\\n\\t\\t\\t<% } %>\\n\\t\\t\\t<div class=\\\"col-md-<%= grid_columns %>\\\">\\n\\t\\t\\t\\t<% var item_url = '\\/'+ item.urlcomponent; %>\\n\\t\\t\\t\\t<div class=\\\"item-cell item-cell-grid\\\">\\n\\t\\t\\t\\t\\t<a class=\\\"thumbnail\\\" href=\\\"<%= item_url %>\\\">\\n\\t\\t\\t\\t\\t\\t<img src=\\\"<%= item.cms.image.url %>\\\" alt=\\\"<%= item.cms.image.alt_text %>\\\" \\/>\\n\\t\\t\\t\\t\\t<\\/a>\\n\\t\\t\\t\\t\\t<h5>\\n\\t\\t\\t\\t\\t\\t<a href=\\\"<%= item_url %>\\\"><%= item.storedisplayname2 %><\\/a>\\n\\t\\t\\t\\t\\t<\\/h5>\\n\\t\\t\\t\\t\\t<a class=\\\"btn btn-small btn-primary btn-expanded\\\" href=\\\"<%= item_url %>\\\">See more<\\/a>\\n\\t\\t\\t\\t<\\/div>\\n\\t\\t\\t<\\/div>\\n\\t\\t<% }); %>\\n\\t<\\/div>\\n<\\/aside>\\n\"};",
                "feature_enabled": true,
                "comp_id": "3538477",
                "site_id": 2,
                "system_domain": "https://system.netsuite.com/",
                "commerce_categories_enabled": true
            }

            /*
             var header = {
             "Content-Type":"application/json"
             };

             var response = nlapiRequestURL('http://jantasautomation.tavanoapps.com/api/cms/session/domain',null,header);


             return {
             version: 8,
             header: header,
             allHeaders: response.getAllHeaders(),
             code: response.getCode(),
             errortext: response.getError(),
             body: response.getBody()
             }
             */

        }
    });
});
