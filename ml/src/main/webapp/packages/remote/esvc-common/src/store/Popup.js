Ext.define('ESVC.store.Popup',{
	extend: 'Ext.data.Store',
	alias: 'store.popup',
	model: 'ESVC.model.popup.CommonCodePopup',
	proxy: {
		showProgressBar : false,
		type: 'rest',
		url: ESVC.config.Locale.getRestApiDestUrl() + '/dm/code'
	}
});
