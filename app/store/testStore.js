/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("IpadApp.store.testStore", {
    extend: "Ext.data.Store",
    config: {
        model: "IpadApp.model.treeModel",
        defaultRootProperty: 'items',
        proxy: {
           type : 'jsonp',
           url: 'http://laravel.local',
           callbackKey: 'callback',
           reader:{
                       type:'json',
                       rootProperty:'items'
           },
           extraParams: {
                extraParameter: 'parExample'
            }
        }
    }
});
