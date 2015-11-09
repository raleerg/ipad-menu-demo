/* 
 * Main store
*/

Ext.define("IpadApp.store.treeStore", {
    extend: "Ext.data.Store",
    config: {
        model: "IpadApp.model.treeModel",
        defaultRootProperty: 'items',
        proxy: {
           type : 'jsonp',
           url: 'http://hopperlink.ae/demo/ipad-menu-srv/public/menu/jsonp?callback=jsonp',
           callbackKey: 'callback',
           reader:{
                       type:'json',
                       rootProperty:'items'
           },
           extraParams: {
                extraParameter: 'BreakfastMenu'
            }
        }
    }
});
 