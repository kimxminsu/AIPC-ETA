Ext.define('IoTosOmExt.view.export.notarrivedcontainerlist.NotArrivedContainerListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.notarrivedcontainerlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.export.notarrivedcontainerlist.NotArrivedContainerList'
   ],
	
	stores:{
		notArrivedContainerListStore:{
			model: 'IoTosOmExt.model.export.notarrivedcontainerlist.NotArrivedContainerList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/notarrivedcontainerlist/notarrivedcontainerlist',
			}
		},
		sztpCodeStore : {
         model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
		},
		weightGroupCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		cntrHeightWidthStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		cntrLengthStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		cntrTypeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		reserveTypeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		}
   }
});