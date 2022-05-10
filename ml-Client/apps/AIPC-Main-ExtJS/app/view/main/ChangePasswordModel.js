Ext.define('Aipc.Main.view.main.ChangePasswordModel', {
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
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/session/searchPasswordConfig'
			}
		},
	}
});