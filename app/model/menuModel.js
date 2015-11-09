/* 
 * Menu model with all data inside
 */

Ext.define("IpadApp.model.menuModel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'image', type: 'string' }
        ]
    }
});
