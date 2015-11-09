/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("IpadApp.view.categoriesListView", {
    extend: "Ext.dataview.List",
    alias: "widget.categorielistview",
    config: {
        loadingText: "Loading Notes...",
        emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
        onItemDisclosure: true,
        itemTpl: "<div class=\"list-item-image\">{title}</div>"
    }
});


