/* 
 * Menu model with all data inside
 */
Ext.define("IpadApp.model.subModel", {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'text',
            type: 'string'
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'images',
            type: 'string'
        },
        {
            name: 'tumb',
            type: 'string'
        },
        {
            name: 'price',
            type: 'string'
        },]
    }
});
