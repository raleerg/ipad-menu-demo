/* 
 * Menu model with all data inside
 */

Ext.define('IpadApp.model.treeModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'text', type: 'string' },
            { name: 'content', type: 'string' },
            { name: 'images', type: 'string' },
            { name: 'tumb', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'subcat', type: 'string' },
            { name: 'cls', type: 'string' },
            { name: 'tags', type: 'string' },
            { name: 'likeValue', type: 'int' },
            { name: 'id', type: 'int' }
        ]
    }
});