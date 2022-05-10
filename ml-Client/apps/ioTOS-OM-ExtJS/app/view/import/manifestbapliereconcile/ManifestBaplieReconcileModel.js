Ext.define('IoTosOmExt.view.import.manifestbapliereconcile.ManifestBaplieReconcileModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.manifestbapliereconcile',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile'
	],
	
	formulas : {
		setDisabledReconcileUpdateStatus : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.MANIFEST_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCreateBaplie : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_MANIFEST) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCreateManifest : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledDirectFill : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.MANIFEST_BAPLIE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setReadOnlyManifestComponent : {
			bind : '{theManifestDetail.cntrNo}',
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
      manifestBaplieReconcileStore : {
         model : 'IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/manifestbapliereconcile/manifestbapliereconcile'
			}
		},
		statusStore : {
			model : 'IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile',
		},	
		manifestStore : {
			model: 'IoTosOmExt.model.import.manifestlist.ManifestCntr',
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
			model : 'IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/manifestbapliereconcile/reconcile'
			}
		},
		createBaplieStore : {
			model : 'IoTosOmExt.model.import.manifestlist.ManifestCntr',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/manifestbapliereconcile/createbaplie'
			}
		},
		createManifestStore : {
			model : 'IoTosOmExt.model.import.manifestbapliereconcile.ManifestBaplieReconcile',
         pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/imports/manifestbapliereconcile/createmanifest'
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
		deliveryCodeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
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
		sztpCodeStore : {
         model : 'IoTosOmExt.model.export.bookinglist.BookingList',
         proxy : {
				type : 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/bookinglist/sztpCodes',
         }
      },
   }
});