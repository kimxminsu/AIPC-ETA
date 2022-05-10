Ext.define('Aipc.Main.view.main.FindPasswordModel', {
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
				url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/policy/findPassword'
			}
		},
	}
});