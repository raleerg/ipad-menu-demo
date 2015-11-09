/* 
 * Categories View
 */

Ext.define("IpadApp.view.categoriesView", {
    extend: "Ext.dataview.List",
    alias: "widget.categoriesView",
    
    
    initialize: function () {
        this.callParent(arguments);
        
        var htmlCartBox = '';
        
        var categoriesList = Ext.getStore("menuStore").load();
        
        var backbtn = {
            xtype: "button",
            text: 'Back',
            ui: 'action',
            handler: this.onBackBtnTap,
            scope: this,
            cls: "top-back-btn"
        };
        
        var cartbtn = {
            xtype: "button",
            text: '<div class="cartInfo toolbar-cart"><span class="simpleCart_quantity"></span> MY ORDER',
            ui: 'action',
            scope: this,
            cls: "top-cart-btn"
        };
        
        /* Get all categories and
         * and show them like buttons */
        
        var allCategories = Ext.getStore("menuStore").load();
        var btnArray = new Array();
        
        for(i = 0; i < allCategories.getCount(); i++){
            item = allCategories.getAt(i);
            var catId = item.get('id');
            var catImage = item.get('image');
            
                btnArray[i] = {
                xtype: "button",
                text: '',
                ui: 'action',
                handler: this.onCategoryTap,
                scope: this,
                cls: "cat-list-boxes cat-num"+catId,
                id: "cat-"+catId
            };
        }
        
        btnArray[btnArray.length] = {
            xtype: "toolbar",
            docked: "top",
            items: [
            backbtn,
                { xtype: 'spacer' },
            ],
            cls: "green-toolbar"
        };
        
        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            items: [
            backbtn,
                { xtype: 'spacer' },
            ],
            cls: "green-toolbar"
        };
        
        var bckPanel2 = {
            obj: this,
            xtype: "panel",
            flex: 1,
            html: htmlCartBox,
            items: btnArray,
            width: "100%",
            // If you need html element event
            /*listeners: {
                tap: {
                    element: 'element',
                    functionTest: '',
                    fn: function(e) {
                        var element = Ext.get(e.target);
                        var elementId = element.id.split('-');
                        if (elementId[0] == "imgcat") {
                            this.viewElm;
                            //alert('tap! Number: '+elementId[1]);
                            console.log('tap');
                        }
                    }
                }
            },*/
                
            style:  {
                background: '#000'
            }
        };
        
        this.add([bckPanel2]);
        
        
    },
    
    onBackBtnTap: function () {
        this.fireEvent("onBackBtnTap", this);
    },
    
    getAllCategories: function () {
        var allCategories = Ext.getStore("menuStore").load();
        var htmlCatList = '';
        var item;
        
        for(i = 0; i < allCategories.getCount(); i++){
            item = allCategories.getAt(i);
            htmlCatList = htmlCatList + '<a class="cat-num-'+i+'" href="#"><img id="imgcat-'+i+'" class="img-cat-box" src="resources/images/'+item.get('image')+'" /></a>';
        }
        
        return htmlCatList;
    },
    onCategoryTap: function(e){
        
        var taped_category = e.id.split('-');
        this.fireEvent("onCategoryTap", this, parseInt(taped_category[1]));
    },
    onCartBtnTap: function(){
        this.fireEvent("onCartBtnTap", this, 1);
    }
});

