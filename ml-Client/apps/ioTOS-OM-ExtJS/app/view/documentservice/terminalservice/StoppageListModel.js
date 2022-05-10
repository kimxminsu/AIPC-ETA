Ext.define('IoTosOmExt.view.documentservice.terminalservice.StoppageListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.stoppageList',
	
	requires:[
		'Ext.data.proxy.Rest',
   ],
	
	stores:{
		stoppageListStore:{
			model: 'IoTosOmExt.model.documentservice.terminalservice.StoppageList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/documentservice/stoppage',
			}
		}
	}
});