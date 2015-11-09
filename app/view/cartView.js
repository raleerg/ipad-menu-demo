/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define("IpadApp.view.cartView", {
    extend: "Ext.dataview.component.DataItem",
    alias: "widget.cartView",
    
    initialize: function () {
        this.callParent(arguments);
        
        /*
         * Generate cart
         */
        
        simpleCart({
            cartColumns: [
            { attr: "quantity" , label: "Qty" },
            {view:'image' , attr:'thumb', label: false},
            { attr: "name" , label: "Name" } ,
            { attr: "price" , label: "Price", view: 'currency' },
            { view: "decrement" , label: false , text: "-" },
            { view: "increment" , label: false , text: "+" },
            { view: "remove" , text: "Remove" , label: false },
            { attr: "total" , label: "SubTotal", view: 'currency' }
           ],
            cartStyle: 'table'
        });
        
        console.log( "simpleCart has loaded " + simpleCart.quantity() + " items from from localStorage" );
        
        var closebtn = {
            xtype: "button",
            text: 'Back',
            ui: 'action',
            handler: this.onCloseBtnTap,
            scope: this,
            cls: "top-back-btn"
        };
        
        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Cart",
            items: [closebtn],
            cls: "green-toolbar"
        };
        
        this.add([topToolbar]);
    },
    onCloseBtnTap: function () {
        this.fireEvent("onCloseBtnTap", this);
    }
    
});

