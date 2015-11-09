

Ext.define('IpadApp.view.searchView',{
    extend: 'Ext.Container',
    alias: "widget.searchView",
    initialize: function () {
    },
    config: {
        cls: 'searchbox',
        docked: 'left',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 0,
        width: 400,
        padding: '15 0 0 0',
        open: false,
        scrollable: 'vertical',
        store : 'Countries',
        defaults: {
            textAlign: 'left'
        },
        itemTpl:  '<div class="myContent">'+
         '<div>Country is <b>{name}</b></div>' +
         '<div>Continent: <b>{continent}</b> Region: <b>{region}</b></div>' +
         '</div>',
     
        emptyText: '<div class="myContent">No Matching Countries</div>',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                cls: 'search-toolbar',

                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search...',
                        itemId: 'searchBox',
                        cls: 'search-box-input'
                    }
                ]
            },
            {
                xtype: 'list',
                fullscreen: true,
                itemTpl:  '<div class="myContent">'+
                '<img src="{images}" class="search-item-img" />'+
                '<div><b>{text}</b></div>' +
                '<div class="detail-price-box">AED {price}</div>'+
                '<div class="simpleCart_shelfItem"><img class="item_thumb" style="width: 70px !important;" src="{images}'+'" alt="alternative_text"><h2 class="item_name"> {text} </h2><input type="text" value="1" class="item_Quantity"><span class="item_price">AED {price}</span><a class="item_add" href="javascript:;"></a></div>'+
                '</div>',
                width: '100%',
                height: '100%',
                store: 'Countries'
            }
        ]
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
            left    : this.getWidth(),
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
        console.log('Inside search view');
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
            targetEl.translate(this.getWidth(), 0, 0);
            this.maskCmp.show();
        }
        else {
            targetEl.translate(0, 0, 0);
            this.maskCmp.hide();
        }
    },
    onTestEvent: function(){
        alert('sdfsd');
    }
});