Ext.define('IoTosOmExt.view.code.ErrorCodeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.errorcode',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.ErrorCode'
	],
	
	stores:{
		errorCode:{
			model: 'IoTosOmExt.model.code.ErrorCode',
			storeId: 'errorCodeStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/template/errorcode/searchItems'
			}
		}
	}
});