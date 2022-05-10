Ext.define('IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequestModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.specialservicerequest',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest'
	],
	
	stores:{
		specialServiceRequestStore : {
			model: 'IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/specialservicerequest/specialservicerequest'
			}
		},
		specialServiceRequestDetailStore : {
			model: 'IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/specialservicerequest/specialservicerequestdetail'
			}
		},
		ssrNoStore : {
			model: 'IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest',
			proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/specialservicerequest/ssrno'
         }
		},
		searchContainerInfoStore : {
			model: 'IoTosOmExt.model.common.container.SearchContainer',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/specialservicerequest/cntrinfo'
			}
		},
		containerListStore : {
			model: 'IoTosOmExt.model.common.container.BaseContainer',
		},
		ssrCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		oprCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		registratinoNoStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		payerTypeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		payerCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		feCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		modeCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		deliveryCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		cargoTypeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		customAppTypeStore : {
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
		}
	}
});