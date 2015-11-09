/* 
 * Login View
 */


Ext.define('IpadApp.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
    cls: 'login-form-bg',
    
    initialize: function () {
        this.callParent(arguments);
        
    var htmlHome = '<div id="top-box"><img src="resources/css/logo.png" /></div>\n\<div id="middle-box"><p>Welcome to the hopitality<br /> We hope you will enjoy our food same as our menu!</p></div>';
        htmlHome + '<div id="bottom-box"><div>';
        
    },
    
    config: {
        title: 'Login',
        items: [
                    
                    {
            xtype: "panel",
            flex: 1,
            cls: "login-panel",
            items: [
                {
                    xtype: 'image',
                    src: 'http://www.sencha.com/img/sencha-large.png',
                    mode: 'element'
                },
                {
                        xtype: 'label',
                        html: 'Login failed. Please enter the correct credentials.',
                        itemId: 'signInFailedLabel',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:5px 0px;',
                        cls: 'fail-login'
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Login',
                        style: 'color:#990000;margin:5px 0px;',
                        items: [
                            {
                                xtype: 'textfield',
                                placeHolder: 'Username',
                                itemId: 'userNameTextField',
                                name: 'userNameTextField',
                                width: 300,
                                required: true,
                                cls: 'center-block'
                            },
                            {
                                xtype: 'passwordfield',
                                placeHolder: 'Password',
                                itemId: 'passwordTextField',
                                name: 'passwordTextField',
                                width: 300,
                                required: true,
                                cls: 'center-block'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        itemId: 'logInButton',
                        ui: 'action',
                        padding: '10px',
                        width: 285,
                        height: 42.5,
                        cls: 'center-block login-btn',
                        text: 'Log In'
                    }
            ],
            width: "100%",
            height: "100%",
            }

         ],
         listeners: [{
            delegate: '#logInButton',
            event: 'tap',
            fn: 'onLogInButtonTap'
        }]
    },
    onLogInButtonTap: function () {
        var me = this;

        var usernameField = me.down('#userNameTextField'),
            passwordField = me.down('#passwordTextField'),
            label = me.down('#signInFailedLabel');

        label.hide();

        var username = usernameField.getValue(),
            password = passwordField.getValue();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('signInCommand', me, username, password);

            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);
    },
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }
});