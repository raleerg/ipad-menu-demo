/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('MyListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'mylistitem',
    config: {
        nameButton: true,
        dataMap: {
            getNameButton: {
                setText: 'name'
            }
        }
    },
    applyNameButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getNameButton());
    },
    updateNameButton: function (newNameButton, oldNameButton) {
        if(oldNameButton) {
            this.remove(oldNameButton);
        }

        if (newNameButton) {
            this.add(newNameButton);
        }
    }
});


Ext.define("IpadApp.view.categoryListViewBeverages", {
    extend: "Ext.dataview.List",
    alias: "widget.categoryListViewBeverages",
    initialize: function () {
        this.callParent(arguments);
        //this.logIn();

        var backbtn = {
            xtype: "button",
            text: 'Menu',
            ui: 'action',
            handler: this.onBackBtnTapCategoryList,
            scope: this,
            cls: "top-back-btn"
        };

        var cartbtn = {
            xtype: "button",
            text: '',
            handler: this.onCartBtnTap,
            html: '<div class="cartInfo toolbar-cart"><span class="simpleCart_quantity"></span> MY ORDER</div>',
            ui: 'action',
            scope: this,
            cls: "top-cart-btn"
        };
        var addbtn = {
            xtype: "button",
            text: '',
            ui: 'action',
            handler: this.onAddBtnTap,
            scope: this,
            cls: "add-cart-btn"
        };
        var dataUpdateBreakfastMenuBtn = {
            xtype: "button",
            text: 'Breakfast Menu',
            ui: 'action',
            handler: this.onDataUpdateBreakfastMenu,
            scope: this,
            cls: "data-update-BreakfastMenu-btn active-cat-menu"
            
        };
        var dataUpdateChefsFavouritesBtn = {
            xtype: "button",
            text: 'Chefs Favourites',
            ui: 'action',
            handler: this.onDataUpdateChefsFavourites,
            scope: this,
            cls: "data-update-ChefsFavourites-btn"
        };
        var dataUpdateDessertsBtn = {
            xtype: "button",
            text: 'Desserts',
            ui: 'action',
            handler: this.onDataUpdateDesserts,
            scope: this,
            cls: "data-update-Desserts-btn"
            
        };
        var dataUpdateMainMenuBtn = {
            xtype: "button",
            text: 'Main Menu',
            ui: 'action',
            handler: this.onDataUpdateMainMenu,
            //handler: this.onBackBtnTapCategoryList,
            scope: this,
            cls: "data-update-MainMenu-btn"
        };
        var dataUpdateSaladsBtn = {
            xtype: "button",
            text: 'Salads',
            ui: 'action',
            handler: this.onDataUpdateSalads,
            scope: this,
            cls: "data-update-Salads-btn"
        };
        var dataUpdateSandwichesBtn = {
            xtype: "button",
            text: 'Sandwiches',
            ui: 'action',
            handler: this.onDataUpdateSandwiches,
            scope: this,
            cls: "data-update-Sandwiches-btn"
        };
        var dataUpdateSnackMenuBtn = {
            xtype: "button",
            text: 'Snack Menu',
            ui: 'action',
            handler: this.onDataUpdateSnackMenu,
            scope: this,
            cls: "data-update-SnackMenu-btn"
        };
        var dataUpdateSpecialsBtn = {
            xtype: "button",
            text: 'Specials',
            ui: 'action',
            handler: this.onDataUpdateSpecials,
            scope: this,
            cls: "data-update-Specials-btn"
        };
        
        var dataUpdateBeveragesBtn = {
            xtype: "button",
            text: 'Beverages',
            ui: 'action',
            handler: this.onDataUpdateBeverages,
            scope: this,
            cls: "data-update-Specials-btn"
        };
        
        var dataUpdateSpiritsBtn = {
            xtype: "button",
            text: 'Spirits',
            ui: 'action',
            handler: this.onDataUpdateSpirits,
            scope: this,
            cls: "data-update-Specials-btn"
        };
        
        var searchButton = {
            xtype: "button",
            ui: 'action',
            handler: this.onSearchButtonTap,
            scope: this,
            cls: "search-button",
            html: '<img src="resources/images/magnifier-icon.png" style="width: 23px; margin-top: 4px;" />'
        };
        
        var rightSlideMenuBtn = {
            xtype: "button",
            text: 'Slide Menu',
            ui: 'action',
            handler: this.onRightSlideMenuTap,
            scope: this,
            cls: "right-slide-menu-btn"
        };
        
        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            items: [
                backbtn,
                {xtype: 'spacer'},
                cartbtn
            ],
            cls: "green-toolbar"
        };
        
        /*
         * Take data for dataview
         */
        
        var data = {
            items: [
            {
                text: 'Spaghetti Bolognese',
                content: 'Tomato sauce, Italian mozzarella, beef ham or turkey ham, mushrooms, black olives and artichoke',
                images: 'pizza-detail-image.jpg',
                tumb: 'tumb1_70.jpg',
                price: '20',
                subcat: 'Pasta',
                cls: 'top-item-root',
                tags: 'beef,alcohol',
                likeValue: dbLib.getLike(0),
                id: 0,
                leaf: true
            },
            {
                text: 'Spaghetti Napoli',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '35',
                subcat: '',
                cls: '',
                tags: 'lamb',
                likeValue: dbLib.getLike(1),
                id: 1,
                leaf: true
            },
            {
                text: 'Spaghetti Salsiccia',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '21',
                subcat: '',
                cls: '',
                tags: 'chicken,nits',
                likeValue: dbLib.getLike(2),
                id: 2,
                leaf: true
            },
            {
                text: 'Fettuccine Carbonara',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '45',
                subcat: 'Pizza',
                cls: 'top-item-root',
                tags: 'beef,vegeterian',
                likeValue: dbLib.getLike(3),
                id: 3,
                leaf: true
            },
            {
                text: 'Fusilli Saltati',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '40',
                subcat: '',
                cls: '',
                tags: 'beef',
                likeValue: dbLib.getLike(4),
                id: 4,
                leaf: true
            }
        ]
        };
        
        Ext.define('ListItem', {
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
                },
                {
                    name: 'subcat',
                    type: 'string'
                },
                {
                    name: 'cls',
                    type: 'string'
                },
                {
                    name: 'tags',
                    type: 'string'
                },
                {
                    name: 'likeValue',
                    type: 'int'
                },
                {
                    name: 'id',
                    type: 'int'
                }]
            }
        });
        //var store = this.getDataFromSubStore();
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'ListItem',
            defaultRootProperty: 'items',
            root: data
        });
        
        /*
         * Data listing box
         */
        var dataViewBox = Ext.create('Ext.NestedList', {
            xtype: 'nestedlist',
            title: 'Back',
            iconCls: 'star',
            toolbar: {
                hidden:false,
                items: [
                    dataUpdateBreakfastMenuBtn,
                    dataUpdateChefsFavouritesBtn,
                    dataUpdateDessertsBtn,
                    dataUpdateMainMenuBtn,
                    dataUpdateSaladsBtn,
                    dataUpdateSandwichesBtn,
                    dataUpdateSnackMenuBtn,
                    dataUpdateSpecialsBtn
                ],
                cls: 'blue-toolbar'
            },
            cls: 'beverages-list-view',
            displayField: 'text',
            id: 'nested-list-uii',
            getItemTextTpl: function(node) {
                return '<span class="list-tmpl {cls}" data-sub="{subcat}" data-filters="{tags}" ><img class="list-tmpl-img" src="{tumb}" alt="alternative_text"><span class="list-tmpl-text"><span class ="food_title">{text}</span><span class ="description">{content}</span></span><div class="simpleCart_shelfItem"><img class="item_thumb" style="width: 70px !important;" src="{tumb}" alt="alternative_text"><h2 class="item_name"> {text} </h2><input type="text" value="1" class="item_Quantity"><span class="item_price">AED {price}</span><a id="test-btn" class="item_add" href="javascript:;"></a></div><div class="price-box">AED {price}</div></span>';
              },
            style: {margin: '10px'},
            items: {
                xtype: 'toolbar',
                dock: 'bottom',
                cls: 'filter-toolbar',
                items:[
                    dataUpdateBeveragesBtn,
                    dataUpdateSpiritsBtn,
                    searchButton
                ]
            },
            store: store,
            detailCard: {
                xtype: 'panel',
                scrollable: true,
                styleHtmlContent: true,
                html: 'You are viewing the detail card!'
            },
            listeners: {
                leafitemtap: function(nestedList, list, index, target, record, e) {
                    if (e.changedTouches[0].target.className === 'item_add'){
                                nestedList.deselect(list);
                    }
                    if (e.changedTouches[0].target.className === 'like-btn like-btn-top'){
                                nestedList.deselect(list);
                    }
                    
                    var detailCard = nestedList.getDetailCard();
                    if(record.get('images')){
                        var img = '<img src="'+record.get('images')+'" />';
                    }else{
                        var img = '';
                    }
                    var genButton = '<div class="simpleCart_shelfItem"><img class="item_thumb" style="width: 70px !important;" src="'+record.get('tumb')+'" alt="alternative_text"><h2 class="item_name"> '+record.get('text')+' </h2><input type="text" value="1" class="item_Quantity"><span class="item_price">AED '+record.get('price')+'</span><a class="item_add" href="javascript:;"></a></div>';
                    
                    
                    detailCard.setHtml('<div class="detail-card-content"><div class="detail-price-box">AED '+record.get('price')+'</div><a class="close-btn" href="javascript:;" onClick="Ext.getCmp(\'' + this.id + '\').onBackTap();"></a>'+ genButton +'<h1>' + record.get('text') + '</h1>' + '<p>' + record.get('content') + '</p>'+ img +'</div>' );
                    
                    
                }
            }
        });
        
        /*
         * Promos
         */
        
        /*
         * Main panel - everything going inside
         */
        var touchTeam = Ext.create('Ext.Container', {
            xtype: "panel",
            fullscreen: true,
            items: [topToolbar, dataViewBox,
                {
                    docked: 'left',
                    xtype: 'container',
                    layout: 'vbox',
                    width: '269px',
                    cls: 'carousel-bg',
                    defaults: {
                        flex: 1
                    },
                    items: [{
                            xtype: 'carousel',
                            flex: 1,
                            cls: 'carousel-top',
                            style: 'margin-left: 10px; margin-top: 10px;',
                            items: [
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> PROMOTIONS <span class="arrows-big-right"></span></h1><h2>GIRLS NIGHT</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p><img src="resources/images/holiday-party-networking-tips.jpg" /><div class="recom-price-box">AED 49</div></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc',
                                },
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> PROMOTIONS <span class="arrows-big-right"></span></h1><h2>LOREM IPSUM</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p><img src="resources/images/Thanksgiving.jpg" /><div class="recom-price-box">AED 49</div></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc',
                                }
                            ]
                        }
                        ],
                    style: {
                        background: '#d1d1d1'
                    }
                }],
            style: {background: '#000'},
            useComponents: true
        });

        this.add([touchTeam]);
    },
    listeners: {
            painted: function (element, options) {
                
            }
    },
    onFilterBtnTap: function(){
        this.fireEvent("onFilterBtnTap", this);
    },
    onCartBtnTap: function(){
         this.fireEvent("onRightSlideMenuTap", this);
    },
    
    onBackBtnTapCategoryList: function() {
        this.fireEvent("onBackBtnTapCategoryList", this);
    },
    onLikeBtnTap: function(){
            alert("TEST");
    },
    onDataUpdateBreakfastMenu: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'BreakfastMenu');
        this.setActiveMenuCat(e);
    },
    onDataUpdateChefsFavourites: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'ChefsFavourites');
        this.setActiveMenuCat(e);
    },
    onDataUpdateDesserts: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'Desserts');
        this.setActiveMenuCat(e);
    },
    onDataUpdateMainMenu: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'MainMenu');
        this.setActiveMenuCat(e);
    },
    onDataUpdateSalads: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'Salads');
        this.setActiveMenuCat(e);
    },
    onDataUpdateSandwiches: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'Sandwiches');
        this.setActiveMenuCat(e);
    },
    onDataUpdateSnackMenu: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'SnackMenu');
        this.setActiveMenuCat(e);
    },
    onDataUpdateSpecials: function(e){
        var newData = this.fireEvent("onDataUpdateBtnTap", 'Specials');
        this.setActiveMenuCat(e);
    },
    onRightSlideMenuTap: function(){
         simpleCart.load();
         this.fireEvent("onRightSlideMenuTap", this);
    },
    onSearchButtonTap: function (){
        this.fireEvent("onSearchButtonTap", this);
    },
    getDataFromServer: function(){
        $.getJSON("http://hoppitality.hopperlink.com/web/api/?action=getMenu&id=1", function(data) {
            console.log(data);
            /*$.each(data, function(key, val) {
                items.push("<li id='" + key + "'>" + val + "</li>");
            });
            $("<ul/>", {
                "class": "my-new-list",
                html: items.join("")
            }).appendTo("body");*/
        });
    },
    getLocalStoredData: function(){
        var myLocalStore= Ext.getStore('_codeAnalyzerStore');
        //load the localStorage store
        myLocalStore.load();

        // check if the localStorage is having any data
        if ((myLocalStore.getCount()) == 0) {
            // nothing found so  we need to load the data from external source
            //console.log('localStorage is empty');
        } else {
            
            //console.log('localStorage data found');
            //console.log('localStorage count:' + myLocalStore.getCount());
            var record =  myLocalStore.getAt(0);
            if(record !== undefined){
                var first = record.get('first');
                //console.log('first '+first);
                var second = record.get('second');
                //console.log('data '+second);
              
            }
        }
    },
    logIn: function(){
        // http://hoppitality.hopperlink.com/web/api/?action=login&password=123456&id=1
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://hoppitality.hopperlink.com/web/api/?action=getMenu&id=1",
        }) .done(function( msg ) {
            alert( "Data: " + msg );
        }) .fail(function( xhr, status, error ) {
            alert( "Error: " + xhr );
        });
        
        //sencha compile --options=debug:false,logger:no,minVersion:3,product:touch union --recursive --file=app.js and exclude -namespace IpadApp and concat -yui sencha-touch-depends.js
        
        /*$.post( "http://hoppitality.hopperlink.com/web/api/", { action: "login", password: "123456", id: "1", email: "waiter1@hopperlink.com" })
            .done(function( data ) {
            alert( "Data Loaded: " + data );
        });*/
        
        
        
    },
    setLocalStoreData: function(){
        var myLocalStore= Ext.getStore('_codeAnalyzerStore');
        myLocalStore.add('newValue');
        myLocalStore.sync();
    },
    setNewNestedListData: function(data){
        Ext.getCmp('nested-list-uii').getStore().setProxy({
            type:'memory',
            data: data
         });
        Ext.getCmp('nested-list-uii').getStore().load();
    },
    setActiveMenuCat: function(el){
        $('.active-cat-menu').removeClass('active-cat-menu');
        $('#'+el.id).addClass('active-cat-menu');
    }
    
            

});
