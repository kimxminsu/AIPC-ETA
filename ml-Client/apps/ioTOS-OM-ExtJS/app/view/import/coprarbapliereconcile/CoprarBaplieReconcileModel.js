Ext.define('IoTosOmExt.view.import.coprarbapliereconcile.CoprarBaplieReconcileModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.coprarbapliereconcile',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.import.coprarbapliereconcile.CoprarBaplieReconcile'
	],
	
	formulas : {
		setDisabledReconcile : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.COPRAR_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCreateBaplie : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_COPRAR) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCreateCoprar : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_BAPLIE2) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledDirectFill : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.COPRAR_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setReadOnlyCoprarComponent : {
			bind : '{theCoprarDetail.cntrNo}',
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		},
		setReadOnlyBaplieComponent : {
			bind : '{theBaplieDetail.cntrNo}',		
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
      coprarBaplieReconcileStore : {
         model : 'IoTosOmExt.model.import.coprarbapliereconcile.CoprarBaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/coprarbapliereconcile/coprarbapliereconcile'
			}
		},
		statusStore : {
			model : 'IoTosOmExt.model.import.coprarbapliereconcile.CoprarBaplieReconcile',
		},	
		coprarStore : {
			model: 'IoTosOmExt.model.import.coprarlist.ImportCoprarList',
		},
		baplieStore : {
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
		reconcileStore :  {
			model : 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/coprarbapliereconcile/reconcile'
			}
		},
		createBaplieStore : {
			model : 'IoTosOmExt.model.import.coprarlist.ImportCoprarList',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/coprarbapliereconcile/createbaplie'
			}
		},
		createCoprarStore : {
			model : 'IoTosOmExt.model.import.stowagebayplanlist.StowageBayPlan',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/coprarbapliereconcile/createcoprar'
			}
		},
		feCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		oprCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		billingOprCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		consigneeCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		porCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
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
		handleInstrCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
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
		svcOutLaneCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		secondVvdStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		shiftingMoveStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		coprarPackingGroupStore : {
			storeId : 'coprarPackingGroupStore',
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			listeners : {
				beforeload : 'onPackingGroupStoreLoad'
			}
		},
		bapliePackingGroupStore : {
			storeId : 'bapliePackingGroupStore',
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			listeners : {
				beforeload : 'onPackingGroupStoreLoad'
			}
		},
		trainUserVoyageStore : {
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