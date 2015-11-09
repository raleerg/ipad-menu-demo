/* 
 * Home View
 */

Ext.define("IpadApp.view.homeView", {
    extend: "Ext.Container",
    alias: "widget.homeView",
    
    initialize: function () {
        this.callParent(arguments);
        
        var htmlHome = '<div id="top-box"><img src="resources/css/logo.png" /></div>\n\<div id="middle-box"><p>Welcome to the hopitality<br /> We hope you will enjoy our food same as our menu!</p></div>';
        htmlHome + '<div id="bottom-box"><div>';
        var menuBtn = {
            xtype: "button",
            text: 'Start Browsing Menu',
            ui: 'action',
            width: 285,
            height: 42.5,
            handler: this.onMenuButtonTap,
            scope: this,
            cls: "browsing-menu-btn" //css na dugmetu
        };
        
        var logOut = {
            xtype: 'button',
            text: 'Log Out',
            itemId: 'logOffButton',
            align: 'right',
            handler: this.onLogOffButtonTap
        };
        
        var bckPanel = {
            xtype: "panel",
            flex: 1,
            items: [{html: htmlHome}, menuBtn],
            width: "100%",
            height: "100%",
            style:  {
                backgroundImage: 'url(resources/css/bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: '#fff'
            }
        };
        
        this.add([bckPanel]);
    },
    onMenuButtonTap: function () {
        //console.log('menu button taped');
        this.fireEvent("onMenuButtonTap", this);
    },
    onQuestButtonTap: function () {
        this.fireEvent("onQuestButtonTap", this);
    },
    onLogOffButtonTap: function () {
        this.fireEvent('signOffCommand');
    }
    
});
