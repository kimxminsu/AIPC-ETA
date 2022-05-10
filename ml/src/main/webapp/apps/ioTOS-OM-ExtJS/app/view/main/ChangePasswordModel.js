Ext.define('IoTosOmExt.view.main.ChangePasswordModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.changepassword',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		changePasswordConfig: {
			storeId: 'changePasswordConfigStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/v1/session/searchPasswordConfig'
			}
		},
	}
});