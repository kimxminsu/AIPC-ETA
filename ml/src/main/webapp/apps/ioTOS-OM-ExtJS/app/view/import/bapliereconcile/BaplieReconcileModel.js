Ext.define('IoTosOmExt.view.import.bapliereconcile.BaplieReconcileModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.bapliereconcile',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.import.bapliereconcile.BaplieReconcile'
	],
	
	formulas : {
		setDisabledCreateBaplie : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_ADDBAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledDirectFill : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ADDBAPLIE_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setReadOnlyAddBaplieComponent : {
			bind : '{theAddBaplieDetail.cntrNo}',
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		},
		setReadOnlyOldBaplieComponent : {
			bind : '{theOldBaplieDetail.cntrNo}',
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		}
	},

   stores : {
      baplieReconcileStore : {
         model : 'IoTosOmExt.model.import.bapliereconcile.BaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/bapliereconcile/bapliereconcile'
			}
		},
		statusStore : {
			model: 'IoTosOmExt.model.import.bapliereconcile.BaplieReconcile',
		},
		additionalBaplieStore : {
			model: 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan',
		},
		oldBaplieStore : {
			model: 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan',
		},
		columnsStore : {
			model : 'IoTosOmExt.model.common.column.ColumnList'
		},
		compareItemsStore : {
			model : 'IoTosOmExt.model.common.column.ColumnCompare'
		},
		compareItemsBackUpStore : {
			model : 'IoTosOmExt.model.common.column.ColumnCompare'
		},
		createBaplieStore : {
			model : 'IoTosOmExt.model.import.bapliereconcile.BaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/bapliereconcile/createbaplie'
			}
		},
		oprCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		ptnrCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		feCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		storageStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		deliveryCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		polCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		fPodCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		fDestCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		cargoTypeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		addBapliePackingGroupStore : {
			storeId : 'addBapliePackingGroupStore',
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			listeners : {
				beforeload : 'onPackingGroupStoreLoad'
			}
		},
		oldBapliePackingGroupStore : {
			storeId : 'oldBapliePackingGroupStore',
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			listeners : {
				beforeload : 'onPackingGroupStoreLoad'
			}
		},
		shiftingTimeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
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