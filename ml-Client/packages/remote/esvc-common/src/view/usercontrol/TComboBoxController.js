Ext.define('ESVC.view.usercontrol.TComboBoxController', {
	extend: 'ESVC.view.foundation.BaseViewController',
    alias: 'controller.tcombobox',
	requires: [],

	mainControl: null,
	   
     /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onLoad: function() {
		var me = this;

		me.mainControl = me.getView();
	},

	onChange: function(control, newValue, oldValue) {
		var me = this;
		var viewModel = me.getViewModel();
		var codeValue = '';
		
		if  (control.bind !== undefined && control.bind !== null)
		{
			if (control.selection !== undefined && control.selection !== null) {
				codeValue = control.selection.data[control.valueField];
			}
			
			viewModel.setBindValue(control.bind, codeValue);
		}

		control.fireEvent('afterChange', control, newValue, oldValue);
	},

	onStoreDataLoad: function(store, records, successful, operation, eOpts) {
		if (Ext.isDefined(records) === false || records === null) {
			if (Ext.isDefined(store.data) === true || store.data === null) {
				records = store.data.items;	
			}
		}

		store.control.fireEvent('afterStoreDataLoad', store.control, records, successful, operation, eOpts);
	},

    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	 /**
	 * =========================================================================================================================
	 * METHOD START
	 */
	getComboStore: function() {		
		var me = this;
		var view = me.getView();
		var store = null;

		if (view.comboMode === CommonConstants.TCOMBO_MODE_POPUP) {
			store = Ext.create('ESVC.store.Popup');
			store.control = view;
			store.addListener('load', me.onStoreDataLoad);
			
			ServerServiceUtil.loadPopupStore(store, view.param);
		}
		else if (view.comboMode === CommonConstants.TCOMBO_MODE_LOCAL) {
			store = Ext.create('ESVC.store.Popup');
			store.control = view;
			store.addListener('commit', me.onStoreDataLoad);
			
			LocalCacheServiceUtil.loadLocalStore(store, view.param);
		}
		else if (view.comboMode === CommonConstants.TCOMBO_MODE_CUSTOM) {
			var formView = me.getFormView(view);

			if (me.isDetailView(formView) == true) {
				store = formView.detailController.getStore(view.customStore);	
			}
			else if (me.isView(formView) == true) {
				store = formView.getController().getStore(view.customStore);	
			}
			
			if (Ext.isDefined(store) && store !== null) {
				store.control = view;
				store.addListener('load', me.onStoreDataLoad);
				
				me.setCustomStore(store, view.param);
			}
			else {
				store = Ext.create('ESVC.store.Popup');
			}
		}

		return store;
	},

	refreshStore: function(param, isClearValue) {
        var me = this;
		var view = me.getView();

		var previousValue;
		if (Ext.isDefined(isClearValue) && !isClearValue) {
			previousValue = view.getValue();
		}
		
		view.clearValue();
		view.param = param;

		if (view.comboMode === CommonConstants.TCOMBO_MODE_POPUP) {
			ServerServiceUtil.loadPopupStore(view.store, view.param);
		}
		else if (view.comboMode === CommonConstants.TCOMBO_MODE_LOCAL) {
			LocalCacheServiceUtil.loadLocalStore(view.store, view.param);
		}
		else if (view.comboMode === CommonConstants.TCOMBO_MODE_CUSTOM) {
			me.setCustomStore(view.store, view.param);
		}
		
		if (Ext.isDefined(isClearValue) && !isClearValue && previousValue) {
			view.setValue(previousValue);
		}
		
		
	},

	setCustomStore: function(store, param) {
		if (store === undefined || store === null) {
			return;
		}

		store.load({
			params: param,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		})
	},

	getFormView: function (view) {
		var me = this;

		if (view === undefined || view === null) {
			return view;
		} 
		else {
			if (me.isView(view) || me.isDetailView(view)) {
				return view;
			}
			else {
				return me.getFormView(view.up());
			}
		}
	},

	isView: function(view) {
		if (view === undefined || view === null) {
			return false;
		}

		if (view.xtype.substr(0, 4) === 'app-') {
			return true;
		}
		else {
			return false;
		}
	},

	isDetailView: function(view) {
		if ((view === undefined || view === null)
	     || (view.detailController === undefined || view.detailController === null)) {
			return false;
		}

		if (view.id.substr(0, 4) === 'app-') {
			return true;
		}
		else {
			return false;
		}
	}
	/**
	 * =========================================================================================================================
	 * METHOD END
	 */
});