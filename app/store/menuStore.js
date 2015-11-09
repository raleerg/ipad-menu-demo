/* 
 * All testing data going here
 */

Ext.define("IpadApp.store.menuStore", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "IpadApp.model.menuModel",
        data: [
            { id: 0, title: "Beverages", image: "category-beverages.png" },
            { id: 1, title: "Starter", image: "category-starter.png" },
            { id: 2, title: "Main dishes", image: "main_dishes_s.jpg" },
            { id: 3, title: "Desserts", image: "desserts_s.jpg" },
            { id: 4, title: "Wine list", image: "wine_list_s.jpg" },
            { id: 5, title: "Spirits", image: "category-spirits.png" }
        ]
    }
});

