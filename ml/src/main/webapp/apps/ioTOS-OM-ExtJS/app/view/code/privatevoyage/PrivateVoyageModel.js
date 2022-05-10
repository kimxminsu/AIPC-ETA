Ext.define('IoTosOmExt.view.code.privatevoyage.PrivateVoyageModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.privatevoyage',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.privatevoyage.PrivateVoyage'
	],
	
	stores:{
		privateVoyageStore:{
			model: 'IoTosOmExt.model.code.privatevoyage.PrivateVoyage',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/privatevoyage/operator'
			}
		}
	}
});