Ext.define('IoTosOmExt.view.export.movinsreconcile.MovinsReconcileModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.movinsreconcile',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.export.movinsreconcile.MovinsReconcile'
	],

	formulas : {
		setDisabledCreateMovins : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.commonCode.ONLY_ADDMOVINS) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledDirectFill : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.commonCode.ADDMOVINS_MOVINS) {
					return false;
				}else {
					return true;
				}
			}
		},
		setReadOnlyAddMovinsComponent : {
			bind : '{theAddMovinsDetail.loadPos}',
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		},
		setReadOnlyOldMovinsComponent : {
			bind : '{theOldMovinsDetail.loadPos}',
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		},
	},
	
	stores:{
		movinsReconcileStore : {
			model: 'IoTosOmExt.model.export.movinsreconcile.MovinsReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/movinsreconcile/movinsreconcile'
			}
		},
		additionalMovinsStore:{
			model: 'IoTosOmExt.model.export.movinslist.MovinsList',
		},
		oldMovinsStore:{
			model: 'IoTosOmExt.model.export.movinslist.MovinsList',
		},
		statusStore : {
			model: 'IoTosOmExt.model.export.movinsreconcile.MovinsReconcile',
		},
		columnsStore : {
			fields : ['code', 'name']
		},
		compareItemsStore : {
			fields : ['code', 'name', 'equal', 'different', 'order'],
		},
		compareItemsBackUpStore : {
			fields : ['code', 'name', 'equal', 'different', 'order'],
		},
		exchangeMovinsStore : {
			model: 'IoTosOmExt.model.export.movinsreconcile.MovinsReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/movinsreconcile/exchangemovins'
			}
		},
		createMovinsStore : {
			model: 'IoTosOmExt.model.export.movinsreconcile.MovinsReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/movinsreconcile/createmovins'
			}
		},
		oprCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
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
		polCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		podCodeStore : {
			model : 'Iotos.model.Code',
		},
      vvdPortCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		fPodCodeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		fDestCodeStore : {
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
		shiftingTimeStore : {
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
		sztpCodeStore : {
         model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
      },
	}
});