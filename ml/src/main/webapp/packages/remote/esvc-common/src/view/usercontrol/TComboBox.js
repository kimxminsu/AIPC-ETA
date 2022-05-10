Ext.define('ESVC.view.usercontrol.TComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tcombobox',
    requires: [
        'ESVC.view.usercontrol.TComboBoxController',
        'ESVC.view.usercontrol.TComboBoxModel'
    ],

    controller: 'tcombobox',
	viewModel: {
		type: 'tcombobox'
    },
    
    /**
	 * PROPERTY START
	 * =========================================================================================================================
	 */
	comboMode: CommonConstants.TCOMBO_MODE_POPUP,
    customStore: undefined,
    param: undefined,
    
    queryMode: 'local',
    forceSelection : true,
    //matchFieldWidth - if you want to use flexible field width, you should set false.
    
    labelAlign: 'right',

    valueField: 'code',
    displayField: 'code',
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
        
        if (me.selection !== undefined && me.selection !== null) {
            return me.selection.data;
        }
        else {
            return null;
        }
    },

    refreshStore: function(param, isClearValue) {
        var me = this;
        var controller = me.getController();

        controller.refreshStore(param, isClearValue);
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
        var controller = me.getController();

        Ext.apply(me, {
            queryMode: me.queryMode,
            forceSelection: me.forceSelection,
            matchFieldWidth: me.matchFieldWidth,

            labelAlign: me.labelAlign,
                        
            valueField: me.valueField,
            displayField: me.displayField,
            store: controller.getComboStore(),
        });

        me.addListener('change', controller.onChange, me);

        me.callParent();
    }
});