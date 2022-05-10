Ext.define('IoTosOmExt.view.main.FindPasswordModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.findpassword',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		findPasswordConfig: {
			model: 'ESVC.model.common.CheckCommonUser',
			storeId: 'findPasswordConfigStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/policy/findPassword'
			}
		},
	}
});