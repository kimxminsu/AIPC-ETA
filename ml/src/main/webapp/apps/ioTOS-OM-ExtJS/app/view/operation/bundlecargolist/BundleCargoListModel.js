Ext.define('IoTosOmExt.view.operation.bundlecargolist.BundleCargoListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.bundlecargolist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList'
	],
	
	stores:{
		bundleCargoListStore : {
			model: 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/bundlecargolist/bundlecargolist'
			}
		},
		parentContainerStore : {
			model: 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/bundlecargolist/parentcontainerlist'
			}
		},
		bundleChildContainerStore : {
			model: 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/bundlecargolist/bundlechildcontainerlist'
			},
			sorters : [{
				property : 'bundleSeq',
				direction : 'ASC'
			}]
		},
		childContainerStore : {
			model: 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/bundlecargolist/childcontainerlist'
			}
		},
		containerListStore : {
			model: 'IoTosOmExt.model.common.container.BaseContainer',
		},
		bundleStatusCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		sztpCodeStore : {
			model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
		},
		packUnpackCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		blockCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/block'
         }
		},
		areaCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/area'
         }
		}
	}
});