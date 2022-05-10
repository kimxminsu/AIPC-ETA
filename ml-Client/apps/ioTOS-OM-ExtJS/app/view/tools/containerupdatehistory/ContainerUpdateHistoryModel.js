Ext.define('IoTosOmExt.view.tools.containerupdatehistory.ContainerUpdateHistoryModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.containerupdatehistory',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.tools.containerupdatehistory.ContainerUpdateHistory'
	],
	
	stores:{
		containerUpdateHistoryStore : {
			model: 'IoTosOmExt.model.tools.containerupdatehistory.ContainerUpdateHistory',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/tools/containerupdatehistory/containerupdatehistory'
			}
		}
	}
});