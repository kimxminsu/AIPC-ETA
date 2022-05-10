Ext.define('ESVC.view.usercontrol.SelectField', {
    extend: 'Ext.Container',
    alias: 'widget.selectfield',    
    requires: [
        'ESVC.view.usercontrol.SelectFieldController',
        'ESVC.view.usercontrol.SelectFieldModel'
    ],

    controller: 'selectfield',
    viewModel: {
        type: 'selectfield'
    },

    selectAlias: 'popup-commoncodepopup',
    params: {},

    fieldBind: undefined,
    
    margin: '0 0 0 0',
    padding: '0 0 0 0',

    allowBlank: true,
    emptyText: '',
    controlDisabled: false,

    fieldLabel: '',
    labelWidth: 100,
    labelAlign: 'right',

    getControlDisabled: function () {
        return me.controlDisabled;
    },

    setControlDisabled: function(value) {
        var me = this;
        var ctlField = me.lookupReference('ctlField');
        var ctlOpenPopupButton = me.lookupReference('ctlOpenPopupButton');

        me.controlDisabled = value;

        ctlField.setDisabled(me.controlDisabled);
        ctlOpenPopupButton.setDisabled(me.controlDisabled);
    },

    setValue: function(value) {
        var me = this;        
        var ctlField = me.lookupReference('ctlField');

        ctlField.setValue(value);
    },

    getValue: function() {
        var me = this;
        var ctlField = me.lookupReference('ctlField');

        return ctlField.getValue();
    },

    listeners: {
        afterChange: function (control, value) {},
    },
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            margin: me.margin,
            padding: me.padding,

            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [{
                xtype: 'textfield',
                reference:'ctlField',
                flex: 1,
                margin: '0 5 0 0',
                readOnly: true,
                allowBlank: me.allowBlank,
                emptyText: me.emptyText,
                disabled: me.controlDisabled,

                fieldLabel: me.fieldLabel,
                labelWidth: me.labelWidth,
                labelAlign: me.labelAlign,

                bind: me.fieldBind
            },
            {
                xtype: 'button',
                reference:'ctlOpenPopupButton',
                iconCls: 'x-fa fa-search',
                disabled: me.controlDisabled,
                listeners: {
                    click: {
                        fn: 'openPopup',
                        args: [me.selectAlias]
                    }
                }
            }
        ]
        });
        
        me.callParent();
    }
});