Ext.define('IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcileModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.coprarloadinglistreconcile',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile'
	],

	formulas : {
		setDisabledReconcileUpdateStatus : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.COPRAR_LOADINGLIST) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledVerify : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.COPRAR_LOADINGLIST) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledUnVerify : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && (value.compareMode == CodeConstantsOM.compareMode.COPRAR_LOADINGLIST || value.compareMode == CodeConstantsOM.compareMode.ONLY_LOADINGLIST)) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCancelReturn : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && (value.compareMode == CodeConstantsOM.compareMode.COPRAR_LOADINGLIST || value.compareMode == CodeConstantsOM.compareMode.ONLY_LOADINGLIST)) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledCreateLoadingList : {
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
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_LOADINGLIST) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledDirectFill : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.COPRAR_LOADINGLIST) {
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
		setReadOnlyLoadingListComponent : {
			bind : '{theLoadingListDetail.cntrNo}',	
			get : function(value) {
				if(value == null) {
					return true;
				}else {
					return false;
				}
			}
		},
		setDisabledRetrieveFromOthers : {
			bind : '{theSearch.compareMode}',
			get : function(value) {
				if(value && value.compareMode == CodeConstantsOM.compareMode.ONLY_COPRAR) {
					return false;
				}else {
					return true;
				}
			}
		}
	},
	
	stores:{
		coprarLoadingListReconcileStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy : {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/coprarloadinglistreconcile'
			}
		},
		coprarStore:{
			model: 'IoTosOmExt.model.export.coprarlist.ExportCoprarList',
		},
		loadingListStore:{
			model: 'IoTosOmExt.model.export.loadinglist.LoadingList',
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
		statusStore : {
			model: 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
		},
		createCoprarStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/createcoprar'
			}
		},
		createLoadingListStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/createloadinglist'
			}
		},
		reconcileUpdateStatusStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/reconcilestatus'
			}
		},
		verifyStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/verify'
			}
		},
		unVerifyStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/unverify'
			}
		},
		cancelStore : {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/cancel'
			}
		},
		vesselScheduleStore : {
			model : 'IoTosOmExt.model.common.vesselschedule.VesselSchedule',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/vesselschedulegeneral/vesseldescription'
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
		cargoTypeStore : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
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
		porCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		transTypeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
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
		loadingListPackingGroupStore : {
			storeId : 'loadingListPackingGroupStore',
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