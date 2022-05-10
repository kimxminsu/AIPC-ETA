Ext.define('IoTosOmExt.view.code.servicelane.ServiceLaneModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.servicelane',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.servicelane.ServiceLane'
	],
	
	stores:{
		serviceLaneStore : {
			model: 'IoTosOmExt.model.code.servicelane.ServiceLane',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/servicelane/servicelanedata'
			}
		},
		serviceLaneCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		serviceLanePortStore : {
			model : 'IoTosOmExt.model.code.servicelane.ServiceLane',
			pageSize: CommonConstants.PAGE_SIZE,
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/servicelane/servicelaneport',
         }
		},
		portCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		}
	}
});