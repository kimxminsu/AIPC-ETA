Ext.define('ESVC.view.usercontrol.TComboBoxCtl', {
    extend: 'Ext.Container',
    alias: 'widget.tcomboboxctl',
    requires: [
        'ESVC.view.usercontrol.TComboBoxCtlController',
        'ESVC.view.usercontrol.TComboBoxCtlModel'
    ],

    controller: 'tcomboboxctl',
	viewModel: {
		type: 'tcomboboxctl'
    },
    
    /**
	 * PROPERTY START
	 * =========================================================================================================================
	 */

    /**
	 * PROPERTY START
	 * =========================================================================================================================
	 */
    comboMode: CommonConstants.TCOMBO_MODE_POPUP,
    customStore: undefined,
    param: undefined,

    controlReadOnly: false,
    controlDisabled: false,
    forceSelection : true,
    queryMode: 'local',
    allowBlank: true,

    margin: '0 0 0 0',
    padding: '0 0 0 0',
    
    fieldLabel: '',
    labelWidth: 100,
    labelAlign: 'right',
    
    codeWidth: 150,
    codeValueField: 'code',
    codeDisplayField: 'code',
    codeBind: undefined,

    codeNameWidth: 200,
    codeNameValueField: 'codeName',
    codeNameBind: undefined,
	/**
	 * PROPERTY END
	 * =========================================================================================================================
	 */

    /**
	 * METHOD START
	 * =========================================================================================================================
	 */
    getSelectedItem: function() {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

        return ctlCode.getSelectedItem();
    },

    refreshStore: function(param, isClearValue) {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

        ctlCode.refreshStore(param, isClearValue);
    },

    getValue: function() {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

       return ctlCode.getValue();
    },

    setValue: function(value) {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

        ctlCode.setValue(value);
    },

    reset: function(value) {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

        ctlCode.reset();
    },

    getControlReadOnly: function() {
        return me.controlReadOnly;
    },
    
    setControlReadOnly: function(value) {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');

        me.controlReadOnly = value;

        ctlCode.setReadOnly(value);
        ctlCode.setFieldStyle('background-color:white;');
    },

    getControlDisabled: function () {
        return me.controlDisabled;
    },
    
    setControlDisabled: function(value) {
        var me = this;
        var ctlCode = me.lookupReference('ctlCode');
        var ctlCodeName = me.lookupReference('ctlCodeName');

        me.controlDisabled = value;

        ctlCode.setDisabled(me.controlDisabled);
        ctlCodeName.setDisabled(me.controlDisabled);
    },
    /**
	 * METHOD END
	 * =========================================================================================================================
	 */

     /**
	 * EVENT START
	 * =========================================================================================================================
	 */
    listeners: {
        afterChange: function (control, newValue, oldValue) {},
        afterStoreDataLoad: function(control, records, successful, operation, eOpts) {}
    },
    /**
	 * EVENT END
	 * =========================================================================================================================
	 */
    
    initComponent: function() {
        var me = this;

        var getComboWidth = function() {
            var width = me.codeWidth;

            if (me.labelWidth > 0) {
                width = width + me.labelWidth + 5;
            }

            return width;
        };

        var getWidth = function() {
            var width = getComboWidth();

            if (me.codeNameWidth > 0) {
                width = width + me.codeNameWidth + 2;
            }

            return width;
        };

        Ext.apply(me, {
            layout: {
                type: 'hbox',
                align: 'center'
            },

            width: getWidth(),
            margin: me.margin,
            padding: me.padding,

            items: [{
                //Code
                xtype: 'tcombobox',
                reference: 'ctlCode',
                margin: '0 1 0 0',
                
                width: getComboWidth(),
                readOnly: me.controlReadOnly,
                disabled: me.controlDisabled,
                forceSelection : me.forceSelection,
                queryMode: me.queryMode,
                allowBlank: me.allowBlank,

                fieldLabel: me.fieldLabel,
                labelWidth: me.labelWidth,
                labelAlign: me.labelAlign,

                comboMode: me.comboMode,
                customStore: me.customStore,
                param: me.param,

                valueField: me.codeValueField,
                displayField: me.codeDisplayField,
                bind: me.codeBind,
                
                listeners: {
                    afterChange: 'onAfterChange',
                    afterStoreDataLoad: 'onAfterStoreDataLoad',
                }
            },
            {
                //Code Desc
                xtype: 'textfield',
                reference: 'ctlCodeName',
                margin: '0 0 0 1',
                readOnly: true,
                width: me.codeNameWidth,
                disabled: me.controlDisabled,
                
                bind: me.codeNameBind
            }],
        });

        me.callParent();
    }
});