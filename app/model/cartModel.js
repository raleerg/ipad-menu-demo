/* 
 * Cart model
*/

Ext.define("IpadApp.model.cartModel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'itemID', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'image', type: 'string' }
        ],
        proxy: 
            {
                type:'localstorage',
                id:'cart'
            }
    }
});