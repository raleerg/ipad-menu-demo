/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('IpadApp.model.testModel', {
    extend: 'Ext.data.Model',

    requires:[
             'Ext.data.proxy.LocalStorage'
    ],

    config: {
        fields: [
            {name: 'first', type: 'string'},
            {name: 'second', type: 'string'}
        ],
        proxy: {
            type: 'localstorage',
            id  : '_codeAnalyzerLocalStorage'
        }
    }
});
