Ext.define('ESVC.view.popup.CommonCodePopupModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.commoncodepopup',

	requires: [
		'Ext.data.proxy.Rest',
		'ESVC.model.popup.CommonCodePopup'
	],

	stores: {
		commonCodePopup: {
			model: 'ESVC.model.popup.CommonCodePopup',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		}
	}
});