Ext.define('IoTosOmExt.view.atc.atc.AtcModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.atc',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.atc.atc.Atc'
	],
	
	stores:{
		atcJobListStore : {
			model: 'IoTosOmExt.model.atc.atc.Atc',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/common/AtcJobList'
			}
		},

		atcJobListDataStore : {
			model: 'IoTosOmExt.model.atc.atc.Atc',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/common/AtcJobList2'
			}
		},

		atcStartStopStore : {
			// model: 'IoTosOmExt.model.tools.containerupdatehistory.ContainerUpdateHistory',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/common/AtcStartStop'
			}
		}
	}
});