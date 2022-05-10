Ext.define('IoTosOmExt.view.operation.terminalholdlist.TerminalHoldListModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.terminalholdlist',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.operation.hold.Hold'
	],

	formulas : {
		setHoldName : {
			bind : '{theDetail.holdCode}',
			get : function(value) {
				var holdCodeStore = this.getStore('holdCodeStore');
				if(holdCodeStore.findRecord('code',value)) {
					return holdCodeStore.findRecord('code',value).data.name;	
				}else {
					return null;
				}
			}
		},
	},
	
	stores:{
		terminalHoldListStore:{
			model: 'IoTosOmExt.model.operation.hold.Hold',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/hold/terminalholdlist'
			}
		},
		holdCodeStore : {
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