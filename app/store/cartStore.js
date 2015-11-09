/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
*/

Ext.define("IpadApp.store.cartStore", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "IpadApp.model.cartModel",
        data: [
            { id: 0, itemID: 3, title: "item 1", image: "category-beverages.png" },
            { id: 1, itemID: 10, title: "item 2", image: "category-item2.png" }
        ],
    }
});
