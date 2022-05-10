/**
 * 로그인(PC)
 */
Ext.define('Iotos.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'app-login',

    requires: [
        'Iotos.view.login.LoginController',
        'Iotos.view.login.LoginModel',
        'Ext.form.Panel'
    ],

    controller: 'login',
    viewModel: {
		type: 'login'
	},

    bodyPadding: 10,
    iconCls: 'logo-ico',

    closable: false,
    height: 250,
    autoShow: true,
    modal: true,
    resizable: false,

    listeners: {
        afterrender : "onload"
    },
    
    msgTextUpdate: function (msg) { // 메시지 표시 변경
        this.down('#loginMsg').setValue(msg);
        var a = Ext.ComponentQuery.query("#loginMsg")[0];
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            title: 'IoTOS Login',
            items: [{
                xtype: 'form',
                reference: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: 'userName',
                    allowBlank: false,
                    minLength: 3, maxLength: 10,
                    reference: 'refLoginId',
                    value: ''
                }, {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Password',
                    allowBlank: false,
                    minLength: 3, maxLength: 10,
                    reference: 'refLoginPwd',
                    value: ''
                },
                {
                    xtype: 'combobox',
                    reference: 'language',
                    name: 'language',
                    hideLabel: true,
                    allowBlank: false,
                    width: 280,
                    height: 25,
                    queryMode: 'local',
                    editable: false,
                    displayField: 'codeName',
                    valueField: 'code',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['comName', 'comCode'],
                        data: CONSTANTS.LOCALES,

                    }),
                    listeners: {
                        afterrender: function (combo) {
                            var recordSelected = combo.getStore().getAt(0);
                            combo.setValue(recordSelected.get('code'));
                        },
                    }
                }, {
                    xtype: 'displayfield',
                    hideEmptyLabel: false,
                    reference: 'refLoginMsg',
                    width: '100%',
                    itemId: 'loginMsg',
                    hideLabel: true,
                    maxWidth: 270
                }],
                buttons: [{
                    text: 'Login',
                    iconCls: 'login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginClick'
                    }
                }]
            }]
        });
        me.callParent();
    }
});
