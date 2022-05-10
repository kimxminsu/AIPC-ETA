Ext.define('ESVC.view.usercontrol.TComboBoxCtlController', {
	extend: 'ESVC.view.foundation.BaseViewController',
    alias: 'controller.tcomboboxctl',
    requires: [],
    
     /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onAfterChange: function(control, newValue, oldValue) {
		var me = this;
		var view = me.getView();
		var ctlCodeName = me.lookupReference('ctlCodeName');
		var codeNameValue = '';
		
		if (control.selection !== undefined && control.selection !== null) {
			codeNameValue = control.selection.data[view.codeNameValueField];
		}

		ctlCodeName.setValue(codeNameValue);

		view.fireEvent('afterChange', view, newValue, oldValue);
	},    

	onAfterStoreDataLoad: function(control, records, successful, operation, eOpts) {
		var me = this;
		var view = me.getView();

		view.fireEvent('afterStoreDataLoad', view, records, successful, operation, eOpts);
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
});