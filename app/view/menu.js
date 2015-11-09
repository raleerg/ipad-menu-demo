Ext.define('IpadApp.view.menu',{
    extend: 'Ext.Container',
    alias: "widget.menu",
    config: {
        cls: 'mainmenu',
        docked: 'right',
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        width: 800,
        padding: '15 0 0 0',
        open: false,
        scrollable: 'vertical',
        defaults: {
            textAlign: 'left'
        },
        items: [
        {
            xtype: 'container',
            html: '<div id="cart-box"><div class="simpleCart_items"></div><div class="simpleCart_total"></div><div class ="simpleCart_empty_box"><a href="javascript:;" class="simpleCart_empty btn btn-default">empty cart</a></div></div>',
            
        }]
    },
    
    setParent: function(parent) {
        this.callParent(arguments);
        this.maskCmp = parent.add({
            xtype   : 'component',
            cls     : 'mainmenu-mask',
            top     : 0,
            zIndex  : 5000,
            hidden  : true,
            width   : 9999,
            right    : this.getWidth(),
            bottom  : 0
        });
        
        this.maskCmp.element.on({
            scope   : this,
            touchend: 'onMaskRelease'
        });
    },
    
    onMaskRelease: function() {
        this.setOpen(false);
    },
    
    onDestroy: function() {
        this.maskCmp.destroy();
        delete this.maskCmp;
        
        this.callParent(arguments);
    },
    
    toggle: function() {
        this.setOpen(!this.getOpen());
    },
    
    updateOpen: function(open) {
        var targetEl,
            parentCt = this.up();
        
        if (!parentCt) {
            return;
        }
        
        targetEl = Ext.get('ext-element-2');
        
        
        if (open) {
            targetEl.translate(-this.getWidth(), 0, 0);
            this.maskCmp.show();
        }
        else {
            targetEl.translate(0, 0, 0);
            this.maskCmp.hide();
        }
    }
});