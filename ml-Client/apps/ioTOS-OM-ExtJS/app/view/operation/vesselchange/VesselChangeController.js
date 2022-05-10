Ext.define('IoTosOmExt.view.operation.vesselchange.VesselChangeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.vesselchange',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselChangeGrid',		// Main Grid Name 
	MAIN_GRID_EDITOR_NAME : 'vesselChangeGridEditor',	// MAIN Grid Editor Name
	MAIN_STORE_NAME: 'vesselChangeStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.operation.vesselchange.VesselChange',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('IoTosOmExt.model.operation.vesselchange.SearchVesselChange');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});	
		me.updateViewStyle(me.getView());
		me.initializeComponent();
		me.onLoadStores();
	},

	initializeComponent : function() {
		var me = this;
		var refs = me.getReferences();

		refs.ctlAssignModeRadioGroup.setValue({
			assignMode : CodeConstantsOM.commonCode.EXPORT_CHANGE
		});
		refs.ctlAssignRollbackRadioGroup.setValue({
			assignRollback : CodeConstantsOM.commonCode.ASSIGN
		});
		refs.ctlChkInYard.setValue(true);
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */		
	
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch : function(control) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});

		if(control) {
			me.onLoadStores('Search');
		}
	},
	
	// Grid Excel/PDF Export
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.web.edi.bizparm.errorcode.SearchErrorCodeBizParm';
		searchBizParm.serviceID = 'EDI.errorcode.searchItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},

	// Grid Row Double
	onVesselChangeGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
      var refs = me.getReferences();
      var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
      var editor = grid.getPlugin(me.MAIN_GRID_EDITOR_NAME);

		editor.cancelEdit();
	},

	onCancelEdit : function(rowEditing, context) {
      var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	onValidateEdit : function(editor, context) {
		var me = this;
	},

   onEdit : function(editor, context) {
		context.record.data.workingStatus = WorkingStatus.convertInt(context.record.crudState);
   },

	onGridSave : function() {
		var me = this;
		var refs = me.getReferences();
		var doSave = me.saveMandatoryCheck();
		
		if(doSave) {
			me.saveProcess();
		}
	},

	saveMandatoryCheck : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(store.data.items.length == 0) {
			return false;
		}
		
		var assignMode = refs.ctlAssignModeRadioGroup.getValue().assignMode;
		if(assignMode == CodeConstantsOM.commonCode.EXPORT_CHANGE
			|| assignMode == CodeConstantsOM.commonCode.STORAGE_EXPORT
			|| assignMode == CodeConstantsOM.commonCode.IX_STORAGE_TO_EXPORT
			|| assignMode == CodeConstantsOM.commonCode.EXPORT_TO_IX_STORAGE
			|| assignMode == CodeConstantsOM.commonCode.IMPORT_EXPORT
			|| assignMode == CodeConstantsOM.commonCode.REEXPORT
			|| assignMode == CodeConstantsOM.commonCode.STORAGE_TO_IMPORT_STORAGE
		) {
			for(var i = 0; i < store.data.items.length; i++) {
				var record = store.data.items[i];
				if(record.data.applyCheck == true
					&& (OmCommonMethod.isNullOrEmpty(record.data.nextVsl)
						|| OmCommonMethod.isNullOrEmpty(record.data.nextYear)
						|| OmCommonMethod.isNullOrEmpty(record.data.nextSeq))
				) {
					MessageUtil.error('fail_msg', 'MSG_CTOM_00333', me.getVesselChangeMode());
					return false;
				}
			}
		}

		if(assignMode == CodeConstantsOM.commonCode.EXPORT_CHANGE
			|| assignMode == CodeConstantsOM.commonCode.STORAGE_EXPORT
			|| assignMode == CodeConstantsOM.commonCode.IX_STORAGE_TO_EXPORT
		) {
			for(var i = 0; i < store.data.items.length; i++) {
				var record = store.data.items[i];
				if(record.data.applyCheck == true && OmCommonMethod.isNullOrEmpty(record.data.pod)) {
					MessageUtil.error('fail_msg', 'MSG_CTOM_00762');
					return false;
				}
			}
		}

		if(assignMode == CodeConstantsOM.commonCode.IMPORT_EXPORT || assignMode == CodeConstantsOM.commonCode.REEXPORT) {
			for(var i = 0; i < store.data.items.length; i++) {
				var record = store.data.items[i];
				if(record.data.applyCheck == true && OmCommonMethod.isNullOrEmpty(record.data.fpod)) {
					MessageUtil.error('fail_msg', 'MSG_CTOM_00024', "WRD_CTOM_FPOD");
					return false;
				}
			}
		}

		if(assignMode == CodeConstantsOM.commonCode.EXPORT_TO_IX_STORAGE) {
			for(var i = 0; i < store.data.items.length; i++) {
				var record = store.data.items[i];
				if(record.data.applyCheck == true && OmCommonMethod.isNullOrEmpty(record.data.nextIxCd)) {
					MessageUtil.error('fail_msg', 'MSG_CTOM_00024', "WRD_CTOM_NewMode");
					return false;
				}
			}
		}

		return true;
	},

	onAssignModeChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var portCodeStore = me.getStore('portCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
		var podCodeBackupStore = me.getStore('podCodeBackupStore');

		if(newValue.assignMode == CodeConstantsOM.commonCode.EXPORT_STORAGE) {
			podCodeStore.setData(podCodeBackupStore.getData());

		}else if(oldValue.assignMode == CodeConstantsOM.commonCode.EXPORT_STORAGE) {
			if(portCodeStore.data.items.length > 0) {
				podCodeStore.setData(portCodeStore.getData());
			}
		}
		
		refs.ctlAssignRollbackRadioGroup.setValue({
			assignRollback : CodeConstantsOM.commonCode.ASSIGN
		});
		refs.ctlChkInYard.setValue(true);
		refs.ctlChkReserved.setValue(false);
	},

	onColumnRendererFromLocalCache : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var codeName = value;
		var key = null;
		
		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrState' : key = 'Container Status'; break;
			case 'ixCd' : key = 'IX CD'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'delv' : key = 'delivery type'; break;
			case 'cargoType' : key = 'Cargo Type'; break;
		}
		
		if(key != null) {
			codeName = LocalCacheServiceUtil.getLocalCacheItemsForCodeName(key,value);
			if(codeName == null) {
				codeName = value;
			}
		}
		return codeName;
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch', ['cntrNo', 'reservedCheck', 'inYardCheck']);

		var params = me.createParam(searchParm);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
		}
		params['vesselChangeMode'] = me.getVesselChangeMode();
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	getVesselChangeMode : function() {
		var me = this;
		var refs = me.getReferences();
		var assignMode = refs.ctlAssignModeRadioGroup.getValue().assignMode;
		var assignRollback = refs.ctlAssignRollbackRadioGroup.getValue().assignRollback;
		var vesselChangeMode;

		if(assignMode == CodeConstantsOM.commonCode.EXPORT_CHANGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.EXPORT_VESSEL_CHANGE;
		
		}else if(assignMode == CodeConstantsOM.commonCode.IMPORT_EXPORT) {
			if(assignRollback == CodeConstantsOM.commonCode.ASSIGN) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.IMPORT_TO_EXPORT;
			
			}else if(assignRollback == CodeConstantsOM.commonCode.ROLLBACK) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.EXPORT_TO_IMPORT;
			}

		}else if(assignMode == CodeConstantsOM.commonCode.REEXPORT) {
			if(assignRollback == CodeConstantsOM.commonCode.ASSIGN) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.IMPORT_TO_REEXPORT;
			
			}else if(assignRollback == CodeConstantsOM.commonCode.ROLLBACK) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.REEXPORT_TO_IMPORT;
			}

		}else if(assignMode == CodeConstantsOM.commonCode.IMPORT_STORAGE) {
			if(assignRollback == CodeConstantsOM.commonCode.ASSIGN) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.IMPORT_TO_STORAGE;
			
			}else if(assignRollback == CodeConstantsOM.commonCode.ROLLBACK) {
				vesselChangeMode = CodeConstantsOM.vesselChangeMode.STORAGE_TO_IMPORT;
			}

		}else if(assignMode == CodeConstantsOM.commonCode.STORAGE_EXPORT) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.STORAGE_TO_EXPORT;

		}else if(assignMode == CodeConstantsOM.commonCode.STORAGE_CHANGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.STORAGE_VESSEL_CHANGE;

		}else if(assignMode == CodeConstantsOM.commonCode.EXPORT_STORAGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.EXPORT_TO_STORAGE;
			
		}else if(assignMode == CodeConstantsOM.commonCode.IX_STORAGE_TO_EMPTY_STORAGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.IX_STORAGE_TO_EMPTY_STORAGE;
			
		}else if(assignMode == CodeConstantsOM.commonCode.IX_STORAGE_TO_EXPORT) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.IX_STORAGE_TO_EXPORT;
			
		}else if(assignMode == CodeConstantsOM.commonCode.EXPORT_TO_IX_STORAGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.EXPORT_TO_IX_STORAGE;
			
		}else if(assignMode == CodeConstantsOM.commonCode.STORAGE_TO_IMPORT_STORAGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.STORAGE_TO_IMPORT_STORAGE;
			
		}else if(assignMode == CodeConstantsOM.commonCode.IMPORT_STORAGE_TO_STORAGE) {
			vesselChangeMode = CodeConstantsOM.vesselChangeMode.IMPORT_STORAGE_TO_STORAGE;
		}

		return vesselChangeMode;
	},

	onLoadStores : function(control) {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;
		var vvdPortCodeStore = me.getStore('vvdPortCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
		var podCodeBackupStore = me.getStore('podCodeBackupStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');

		if(control == 'Search') {
			if(vvdData != null) {
				podCodeStore.removeAll();
				vvdPortCodeStore.load({
					params : {
						args : [vvdData.vesselCode, vvdData.callYear, vvdData.callSeq],
						itemKey : PopupServiceConstants.ItemKey.VVD_PORT_ONLY
					},
					callback : function(vvdPortRecords) {
						podCodeStore.add(vvdPortRecords);
					}
				});
			}
		}
		podCodeBackupStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
				portType : CodeConstantsOM.commonCode.UNLO,
			}
		});
		fDestCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.FDEST
			}
		});
	},

	onColumnHeaderClick : function(ct, column, e, t, eOpts) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var checkFlag = false;
		
		if(column.areAllChecked()) {
			checkFlag = false;
		}else {
			checkFlag = true;
		}
		
		for(var i = 0; i < store.data.items.length; i++) {
			store.data.items[i].set(column.dataIndex, checkFlag);
		}
	},

	onVesselAssign : function() {
		var me = this;
		var refs = me.getReferences();
		var win = refs.ctlVesselScheduleWin;
      
      if(!win) {
         win = Ext.create('IoTosOmExt.view.common.vesselschedule.VesselScheduleWindow',{
				parentView : me.getView(),
				title : ViewUtil.getLabel('WRD_CTOM_VesselSchedule'),
				reference : 'ctlVesselScheduleWin',
				modal : true
         });
         me.getView().add(win);
      }
      win.show();
      win.toFront();
	},

	onVesslScheduleApply : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var vvdData = refs.ctlVesselSelectionWin.selectionData;
		
		store.data.items.forEach(function(record) {
			if(record.data.vesselAssign == true) {
				record.set('nextVsl', vvdData.vesselCode);
				record.set('nextYear', vvdData.callYear);
				record.set('nextSeq', vvdData.callSeq);
				record.set('nextUserVoy', vvdData.userVoyage);
				record.set('nextOutLane', vvdData.outLane);
			}
		});
		refs.ctlVesselScheduleWin.close();
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;
		var refs = me.getReferences();
		
		detailItem.set('staffCd', me.getStaffCd());
		
		return detailItem;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		store.getModifiedRecords().forEach(function(record, index, array){
			me.buildDataItem(record);
			record.set('vesselChangeMode', me.getVesselChangeMode());
			arrItems.push(record.data);
		});

		if(arrItems.length > 0) {
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems); 

			updateParm.save({
				success : function() {
					// store.commitChanges();
					store.reload();
					MessageUtil.saveSuccess();
				}
			});
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});