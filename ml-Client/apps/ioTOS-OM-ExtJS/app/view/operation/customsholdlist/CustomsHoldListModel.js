Ext.define('IoTosOmExt.view.operation.customsholdlist.CustomsHoldListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.customsholdlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.operation.hold.Hold'
	],
	
	stores:{
		customsHoldListStore:{
			model: 'IoTosOmExt.model.operation.hold.Hold',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/hold/customsholdlist'
			}
		},
		holdChkCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		sztpCodeStore  : {
         model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
		}
	}
});