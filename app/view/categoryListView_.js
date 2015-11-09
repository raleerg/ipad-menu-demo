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
    applyNameButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getNameButton());
    },
    updateNameButton: function(newNameButton, oldNameButton) {
        if (oldNameButton) {
            this.remove(oldNameButton);
        }

        if (newNameButton) {
            this.add(newNameButton);
        }
    }
});


Ext.define("IpadApp.view.categoryListView", {
    extend: "Ext.dataview.List",
    alias: "widget.categoryListView",
    initialize: function() {
        this.callParent(arguments);
        var categoriesList = Ext.getStore("menuStore").load();
        //this.getDataFromServer();

        var backbtn = {
            xtype: "button",
            text: 'Back',
            ui: 'action',
            handler: this.onBackBtnTapCategoryList,
            scope: this,
            cls: "top-back-btn"
        };

        var cartbtn = {
            xtype: "button",
            text: 'MY ORDER',
            ui: 'action',
            handler: this.onCartBtnTap,
            scope: this,
            cls: "top-cart-btn"
        };
        var addbtn = {
            xtype: "button",
            text: 'add',
            ui: 'action',
            handler: this.onAddBtnTap,
            scope: this,
            cls: "add-cart-btn",
            style: "width: 60px;"
        };
        var likebtn = {
            xtype: "button",
            text: 'like',
            ui: 'action',
            handler: this.onLikeBtnTap,
            scope: this,
            cls: "like-btn",
            style: "width: 60px;"
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
         * Data listing box
         */
        var dataViewBox = Ext.create('Ext.NestedList', {
            xtype: 'nestedlist',
            title: 'Blog',
            iconCls: 'star',
            cls: 'blog-box',
            displayField: 'title',
            style: {margin: '10px'},
            items: {
                xtype: 'toolbar',
                title: 'filters',
                dock: 'bottom',
                cls: 'filter-toolbar',
            },
            store: {
                type: 'tree',
                /*fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
                 name: 'leaf',
                 defaultValue: true
                 }],*/
                fields: [{
                    name: 'text',
                    type: 'string'
                }],
                root: {
                        text:'Groceries'
                    },
                defaultRootProperty: 'items',
                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:8888/json_test/jsonp.php',
                    reader: {
                        type: 'json',
                        rootProperty: 'items'
                    }
                }
            },
            detailCard: {
                xtype: 'panel',
                scrollable: true,
                styleHtmlContent: true,
                items: [addbtn, likebtn]
            },
            listeners: {
                itemtap: function(nestedList, list, index, element, post) {
                    this.getDetailCard().setHtml(post.get('description'));
                },
                load: {
                    fn: function(post){
                        console.log(post);
                    }
                }
            },
        });

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
                            cls: 'carousel-left-1',
                            style: 'margin-left: 10px; margin-top: 10px;',
                            items: [
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> CHEF RECOMANDATIONS <span class="arrows-big-right"></span></h1><h2>PIZZA LOVERS</h2><p>Wood oven baked pizza and taste like a really Italy!</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc',
                                },
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> CHEF RECOMANDATIONS <span class="arrows-big-right"></span></h1><h2>PIZZA LOVERS</h2><p>Wood oven baked pizza and taste like a really Italy!</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc'
                                }
                            ]
                        },
                        {
                            xtype: 'carousel',
                            flex: 1,
                            style: 'margin-left: 10px; margin-top: 10px; margin-bottom: 10px;',
                            items: [
                                {
                                    html: '<div class="slide-box-2"><h1><span class="arrows-big-left"></span> SPECIALS <span class="arrows-big-right"></span></h1><h2>2 HOUSE BURGERS FOR PRICE OF ONE!</h2><p>Get 2 delicious house burgers and french fries for price of one for only</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #cd403c'
                                },
                                {
                                    html: '<div class="slide-box-2"><h1><span class="arrows-big-left"></span> SPECIALS <span class="arrows-big-right"></span></h1><h2>2 HOUSE BURGERS FOR PRICE OF ONE!</h2><p>Get 2 delicious house burgers and french fries for price of one for only</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #cd403c'
                                }
                            ]
                        }],
                    style: {
                        background: '#d1d1d1'
                    }
                }],
            style: {background: '#000'},
            useComponents: true,
        });

        this.add([touchTeam]);
    },
    onCartBtnTap: function(){
        this.fireEvent("onCartBtnTap", this);
    },
    onBackBtnTapCategoryList: function() {
        this.fireEvent("onBackBtnTapCategoryList", this);
    },
    getDataFromServer: function(){
        $.getJSON("http://hoppitality.hopperlink.com/web/api?action=getTagItems&company_id=1&tag=hot", function(data) {
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
            

});

