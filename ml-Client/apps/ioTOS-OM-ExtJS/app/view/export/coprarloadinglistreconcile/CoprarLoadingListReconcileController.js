Ext.define('IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcileController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.coprarloadinglistreconcile',

	scrollGrid : null,

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	// MAIN_GRID_REF_NAME: 'refErrorCodeGrid',		// Main Grid Name 
	// MAIN_GRID_EDITOR_NAME : 'errorCodeEditor',	// MAIN Grid Editor Name
	// MAIN_STORE_NAME: 'additionalMovinsStore',				// Main Store Name
	// MASTER_STORE_NAME : 'errorCodeMaster',
	// DEFAULT_MODEL : 'IoTosOmExt.model.code.ErrorCode',
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
		var searchParm = Ext.create('IoTosOmExt.model.export.coprarloadinglistreconcile.SearchCoprarLoadingListReconcile');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});
		
		me.updateViewStyle(me.getView());
		me.initializeSetting();
		me.initializeDummyVesselItem();
		me.onLoadStores();
	},

	initializeSetting : function() {
		var me = this;
		me.onSettingColumnsList();
		me.onSettingGridScroller();
	},

	initializeDummyVesselItem : function() {
		var me = this;
		var emptyVesselScheduleItem = Ext.create('IoTosOmExt.model.common.vesselschedule.VesselSchedule');
		var storageVesselScheduleItem = Ext.create('IoTosOmExt.model.common.vesselschedule.VesselSchedule');

		emptyVesselScheduleItem.set({
			vslCd : CodeConstantsOM.dummyVesselCode.EMPTY,
			callYear : CodeConstantsOM.commonCode.DUMMY_CALL_YEAR_SEQ,
			callSeq : CodeConstantsOM.commonCode.DUMMY_CALL_YEAR_SEQ,
			userVoyage : CodeConstantsOM.dummyVesselCode.EMPTY,
			storageType : 'V',
			vslType1 : CodeConstantsOM.commonCode.DUMMY_VESSEL_TYPE,
			vslNm : 'Storage Empty'
		});

		storageVesselScheduleItem.set({
			vslCd : CodeConstantsOM.dummyVesselCode.STORAGE,
			callYear : CodeConstantsOM.commonCode.DUMMY_CALL_YEAR_SEQ,
			callSeq : CodeConstantsOM.commonCode.DUMMY_CALL_YEAR_SEQ,
			userVoyage : CodeConstantsOM.dummyVesselCode.STORAGE,
			storageType : 'X',
			vslType1 : CodeConstantsOM.commonCode.DUMMY_VESSEL_TYPE,
			vslNm : 'Storage Import/Export'
		});

		me.getViewModel().set('emptyVesselScheduleItem', emptyVesselScheduleItem);
		me.getViewModel().set('storageVesselScheduleItem', storageVesselScheduleItem);
	},

	onSettingGridScroller : function() {
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var coprarGridScroll = refs.refCoprarGrid.getScrollable();
		var loadingListScroll = refs.refLoadingListGrid.getScrollable();

		statusGridScroll.on({
			scroll : 'onCoprarLoadingListReconcileGridScroll',
			scrollend : 'onCoprarLoadingListReconcileGridScrollEnd',
			scope : me,
		});
		
		coprarGridScroll.on({
			scroll : 'onCoprarLoadingListReconcileGridScroll',
			scrollend : 'onCoprarLoadingListReconcileGridScrollEnd',
			scope : me,
		});

		loadingListScroll.on({
			scroll : 'onCoprarLoadingListReconcileGridScroll',
			scrollend : 'onCoprarLoadingListReconcileGridScrollEnd',
			scope : me,
		});
	},

	onCoprarLoadingListReconcileGridScroll : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var coprarGridScroll = refs.refCoprarGrid.getScrollable();
		var loadingListGridScroll = refs.refLoadingListGrid.getScrollable();

		if(obj.component.grid.reference == 'refStatusGrid'){
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				coprarGridScroll.scrollTo(null,y);
				loadingListGridScroll.scrollTo(null,y);
			}
		}else if(obj.component.grid.reference == 'refCoprarGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				loadingListGridScroll.scrollTo(x,y);
			}
		}else if(obj.component.grid.reference == 'refLoadingListGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				coprarGridScroll.scrollTo(x,y);
			}
		}
	},

	onCoprarLoadingListReconcileGridScrollEnd : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();

		if(me.scrollGrid == obj){
			me.scrollGrid = null;
		}
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
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');
		var statusStore = me.getStore('statusStore');
		var params = me.getSearchCondition();
		var compareMode = refs.ctlCompareMode;
		
		if (params == null) {
			return;
		}

		params['compareMode'] = compareMode.getValue().compareMode;
		
		coprarLoadingListReconcileStore.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					coprarStore.removeAll();
					loadingListStore.removeAll();
					
					if (records && records.length <= 0) {
						refs.refStatusGrid.getStore().removeAll();
						MessageUtil.noMatchData();
					}else {
						for(var i = 0; i < records.length; i++) {
							coprarStore.add(records[i].data.coprarItem);
							loadingListStore.add(records[i].data.loadingItem);
						}
						statusStore.setData(records);
					}
					me.onSettingCompareItems();
					me.onSelectedCompareItemsCheck();
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
	onDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarLoadingListReconcileRecord = coprarLoadingListReconcileStore.getAt(rowIndex);

		if (record == null)
			return;
		
		me.openDetailPopup(coprarLoadingListReconcileRecord);
	},
	
	// Add
	onGridAdd : function() {
		var me = this;
		var refs = me.getReferences();

		me.openDetailPopup(null);
	},

	onGridSave : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			var dirtyFlag = false;

			if(coprarStore.data.items[i].dirty == true) {
				coprarLoadingListReconcileStore.data.items[i].data.coprarItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(loadingListStore.data.items[i].dirty == true) {
				coprarLoadingListReconcileStore.data.items[i].data.loadingItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(dirtyFlag) {
				me.buildDataItem(coprarLoadingListReconcileStore.data.items[i]);
				arrItems.push(coprarLoadingListReconcileStore.data.items[i].data);
			}
		}

		if(arrItems.length > 0) {
			updateParm.getProxy().url = coprarLoadingListReconcileStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					coprarLoadingListReconcileStore.commitChanges();
					coprarStore.commitChanges();
					loadingListStore.commitChanges();
					MessageUtil.saveSuccess();
				},

				failure : function() {
					me.onSettingCompareItems();
					me.onSelectedCompareItemsCheck();
				}
			});
		}
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
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var pageNo = coprarLoadingListReconcileStore.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var params = me.createParam(searchParm);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
			params['userVoy'] = vvdData.userVoyage;
		}
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onSettingColumnsList : function() {
		var me = this;
		var refs = me.getReferences();
		var columnsStore = me.getStore('columnsStore');
		var coprarGrid = refs.refCoprarGrid;
		var loadingListGrid = refs.refLoadingListGrid;
		var dataArray = new Array();

		for(var i = 0; i < coprarGrid.getColumns().length; i++) {
			var coprarGridColumn = coprarGrid.getColumns()[i];

			for(var j = 0; j < loadingListGrid.getColumns().length; j++) {
				var loadingListGridColumn = loadingListGrid.getColumns()[j];

				if(coprarGridColumn.dataIndex != '' && coprarGridColumn.dataIndex != null && coprarGridColumn.dataIndex == loadingListGridColumn.dataIndex
					&& coprarGridColumn.dataIndex != 'cntrNo'
				) {
					dataArray.push({
						code : coprarGridColumn.dataIndex,
						name : coprarGridColumn.text.trim()
					});
				}
			}
		}

		columnsStore.setData(dataArray);

		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');
		compareItemsBackUpStore.setData(dataArray);

		for(var i = 0; i < compareItemsBackUpStore.data.items.length; i++) {
			compareItemsBackUpStore.data.items[i].data.equal = 0;
			compareItemsBackUpStore.data.items[i].data.different = 0;
			compareItemsBackUpStore.data.items[i].data.order = i;
		}
	},

	onLoadStores : function(control){
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;

		var oprCodeStore = me.getStore('oprCodeStore');
		var feCodeStore = me.getStore('feCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
		var vvdPortCodeStore = me.getStore('vvdPortCodeStore');
		var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
		var ptnrCodeStore = me.getStore('ptnrCodeStore');  //billing opr
		var porCodeStore = me.getStore('porCodeStore');
		var transTypeStore = me.getStore('transTypeStore');
		var handleInstrCodeStore = me.getStore('handleInstrCodeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');

		if(control == 'Search') {
			if(vvdData != null) {
				oprCodeStore.load({
					params : {
						args : [vvdData.vesselCode, vvdData.callYear, vvdData.callSeq],
						itemKey : PopupServiceConstants.ItemKey.VVD_OPR_ONLY
					}
				});
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
			return;
		}

		feCodeStore.load({
         params : {
				itemKey : PopupServiceConstants.MasterCode.FE
         }
		});

		polCodeStore.load({
			params : {
				args : [CodeConstantsOM.commonCode.UNLO],
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
			},
		});
		
		fPodCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
				args : [CodeConstantsOM.commonCode.UNLO]
			}
		});

		fDestCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.GeneralCode.FDEST
         }
		});

		deliveryCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.DELIVERY_FOR_EXPORT
         }
		});

		cargoTypeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.CARGO_TYPE
         }
		});

		ptnrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
			}
		});

		porCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.POR
			}
		});

		transTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.TRANSPORT_TYPE_FOR_DOCUMENT
			}
		});

		handleInstrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.HANDLE_INSTR
			}
		});

		sztpCodeStore.load();
	},

	onSettingCompareItems : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');
		var columnsStore = me.getStore('columnsStore');
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];
			var equalCount = 0;
			var differentCount = 0;

			for(var j = 0; j < coprarLoadingListReconcileStore.data.items.length; j++) {
				var coprarData = coprarStore.data.items[j].data[columns.data.code];
				var loadingListData = loadingListStore.data.items[j].data[columns.data.code];
				
				if(coprarData == loadingListData) {
					equalCount += 1;
				}else {
					differentCount += 1;
				}
			}

			for(var j = 0; j < compareItemsBackUpStore.data.items.length; j++) {
				var compareItems = compareItemsBackUpStore.data.items[j];

				if(compareItems.data.code == columns.data.code) {				
					compareItems.data.equal = equalCount;
					compareItems.data.different = differentCount;
				}
			}
		}

		me.onSetMatched();
		me.onRefreshStores();
	},

	compareItemsApplyCheck : function() {
		var me = this;
		var refs = me.getReferences();
		var autoApply = refs.ctlAutoApplyCheckBox;

		if(!autoApply.checked) {
			me.onSelectedCompareItemsCheck();
		}
	},

	onCoprarLoadingListReconcileGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		var coprarGrid = refs.refCoprarGrid;
		var loadingListGrid = refs.refLoadingListGrid;
	
		statusGrid.getSelectionModel().select(rowIndex);
		coprarGrid.getSelectionModel().select(rowIndex);
		loadingListGrid.getSelectionModel().select(rowIndex);
	},
	
	onStatusGridApplyCheck : function(obj, rowIndex, checked, record, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		statusGrid.setSelection(record);
		record.commit();
	},

	selectCompareCheckBox : function(obj, record, index, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var autoApply = refs.ctlAutoApplyCheckBox;
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');
		var compareItemsStore = me.getStore('compareItemsStore');

		if(autoApply.checked) {
			for(var i = 0; i < compareItemsBackUpStore.data.items.length; i++) {
				var compareBackUpItem = compareItemsBackUpStore.data.items[i];

				if(record.data.code == compareBackUpItem.data.code) {
					var index = 0;

					for(var j = 0; j < compareItemsStore.data.items.length; j++) {
						var compareItem = compareItemsStore.data.items[j];
						
						if(compareBackUpItem.data.order > compareItem.data.order) {
							index = compareItemsStore.findExact('code',compareItem.data.code) + 1;
						}
					}
					compareItemsStore.insert(index, compareBackUpItem);
				}
			}
		}
	},

	deselectCompareCheckBox : function(obj, record, index, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var autoApply = refs.ctlAutoApplyCheckBox;
		var compareItemsStore = me.getStore('compareItemsStore');

		if(autoApply.checked) {
			for(var j = 0; j< compareItemsStore.data.items.length; j++) {
				var compareItem = compareItemsStore.data.items[j];

				if(record.data.code == compareItem.data.code) {
					compareItemsStore.remove(compareItem);
				}
			}
		}
	},

	onSelectedCompareItemsCheck : function() {
		var me = this;
		var refs = me.getReferences();
		var compareItemsGrid = refs.refCompareItemsMultiselectGrid;
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');
		var compareItemsStore = me.getStore('compareItemsStore');
		var selectedRecords = compareItemsGrid.getSelection();

		compareItemsStore.removeAll();
		selectedRecords.sort(function(a,b){
			return a.data.order - b.data.order;
		});
		
		for(var i = 0; i < selectedRecords.length; i++) {
			for(var j = 0; j< compareItemsBackUpStore.data.items.length; j++) {
				var compareItem = compareItemsBackUpStore.data.items[j];

				if(selectedRecords[i].data.code == compareItem.data.code) {
					compareItemsStore.add(compareItem);
				}
			}
		}
	},

	onCreateCoprar : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var loadingListStore = me.getStore('loadingListStore');
		var createCoprarStore = me.getStore('createCoprarStore');
		
		createCoprarStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck) {
				createCoprarStore.add(loadingListStore.data.items[i]);
			}
		}

		if(createCoprarStore.data.items.length <= 0) {
			return false;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = createCoprarStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < createCoprarStore.data.items.length; i++) {
			me.buildDataItem(createCoprarStore.data.items[i]);
			updateParm.get('items').push(createCoprarStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onCreateLoadingList : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var createLoadingListStore = me.getStore('createLoadingListStore');
		
		createLoadingListStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck) {
				createLoadingListStore.add(coprarStore.data.items[i]);
			}
		}

		if(createLoadingListStore.data.items.length <= 0) {
			return false;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = createLoadingListStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < createLoadingListStore.data.items.length; i++) {
			me.buildDataItem(createLoadingListStore.data.items[i]);
			createLoadingListStore.data.items[i].set('rsrvType','B');
			createLoadingListStore.data.items[i].set('cntrState','R');
			updateParm.get('items').push(createLoadingListStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},
	
	onVerify : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var verifyStore = me.getStore('verifyStore');

		verifyStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck && 
				coprarLoadingListReconcileStore.data.items[i].data.loadingConfirm != CodeConstantsOM.loadingConfirm.VERIFIED
				) {
				verifyStore.add(coprarLoadingListReconcileStore.data.items[i]);
			}
		}

		if(verifyStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = verifyStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < verifyStore.data.items.length; i++) {
			me.buildDataItem(verifyStore.data.items[i]);
			updateParm.get('items').push(verifyStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onUnVerify : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var unVerifyStore = me.getStore('unVerifyStore');

		unVerifyStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck &&
				coprarLoadingListReconcileStore.data.items[i].data.loadingConfirm != CodeConstantsOM.loadingConfirm.UNVERIFIED
				) {
				unVerifyStore.add(coprarLoadingListReconcileStore.data.items[i]);
			}
		}

		if(unVerifyStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unVerifyStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < unVerifyStore.data.items.length; i++) {
			me.buildDataItem(unVerifyStore.data.items[i]);
			updateParm.get('items').push(unVerifyStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onCancel : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var loadingListStore = me.getStore('loadingListStore');
		var cancelStore = me.getStore('cancelStore');
		
		cancelStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck &&
				coprarLoadingListReconcileStore.data.items[i].data.loadingConfirm != CodeConstantsOM.loadingConfirm.VERIFIED
				) {
				loadingListStore.data.items[i].set('rehandleCode', CodeConstantsOM.loadingConfirm.CANCEL);
				cancelStore.add(loadingListStore.data.items[i]);
			}
		}

		if(cancelStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = cancelStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < cancelStore.data.items.length; i++) {
			me.buildDataItem(cancelStore.data.items[i]);
			updateParm.get('items').push(cancelStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},
	//onCancel이랑 합쳐야 됨
	onReturn : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var loadingListStore = me.getStore('loadingListStore');
		var cancelStore = me.getStore('cancelStore');
		
		cancelStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck &&
				coprarLoadingListReconcileStore.data.items[i].data.loadingConfirm != CodeConstantsOM.loadingConfirm.VERIFIED
				) {
				loadingListStore.data.items[i].set('rehandleCode', CodeConstantsOM.loadingConfirm.RETURN);
				cancelStore.add(loadingListStore.data.items[i]);
			}
		}

		if(cancelStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = cancelStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < cancelStore.data.items.length; i++) {
			me.buildDataItem(cancelStore.data.items[i]);
			updateParm.get('items').push(cancelStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onReconcileUpdateStatus : function() {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var reconcileUpdateStatusStore = me.getStore('reconcileUpdateStatusStore');

		reconcileUpdateStatusStore.removeAll();

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck && 
				coprarLoadingListReconcileStore.data.items[i].data.status == CodeConstantsOM.containerState.RESERVED
				) {
				reconcileUpdateStatusStore.add(coprarLoadingListReconcileStore.data.items[i]);
			}
		}

		if(reconcileUpdateStatusStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = reconcileUpdateStatusStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < reconcileUpdateStatusStore.data.items.length; i++) {
			me.buildDataItem(reconcileUpdateStatusStore.data.items[i]);
			updateParm.get('items').push(reconcileUpdateStatusStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onRetrieve : function() {
		var me = this;
		var params = me.getSearchCondition();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		
		if (params == null) {
			return;
		}

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck) {
				me.onDoRetrieveFromOthers(coprarLoadingListReconcileStore.data.items[i], i);
			}
		}
	},

	onDoRetrieveFromOthers : function(item, index) {
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var loadingListStore = me.getStore('loadingListStore');

		params['retrieveFromOthersMode'] = refs.ctlRetrieveRadioGroup.getValue().retrieve;
		params['cntrNo'] = item.data.coprarItem.cntrNo;

		if(refs.ctlRetrieveFe.getValue()) {
			params['fe'] = item.data.coprarItem.fe;
		}

		if(refs.ctlRetrieveOpr.getValue()) {
			params['ptnrCode'] = item.data.coprarItem.ptnrCode;
		}

		var retrieveFromOthersStore = Ext.create('Ext.data.Store', {
			model : 'IoTosOmExt.model.export.coprarloadinglistreconcile.CoprarLoadingListReconcile',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/retrievefromothers'
			}
		});
		retrieveFromOthersStore.load({
			params : params,
			callback : function(records) {
				if(records.length > 0) {
					item.data.loadingItem = records[0].data.loadingItem;
					loadingListStore.data.items[index].set(records[0].data.loadingItem);

					if(records[0].data.loadingItem != null) {
						item.data.status = records[0].data.loadingItem.cntrState;
						
						if(records[0].data.loadingItem.prevCntrState != null && records[0].data.loadingItem.prevCntrState != '') {
							item.data.importStatus = records[0].data.loadingItem.prevCntrState;
						}
					}
				}
			} 
		});
	},

	onApply : function() {
		var me = this;
		var params = me.getSearchCondition();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var arrItems = new Array();

		if (params == null) {
			return;
		}
		
		coprarLoadingListReconcileStore.data.items.forEach(function(record){
			if(record.data.applyCheck
				&& OmCommonMethod.isNullOrEmpty(record.data.loadingItem) == false
				&& OmCommonMethod.isNullOrEmpty(record.data.loadingItem.cntrNo) == false	
			) {
				me.buildDataItem(record);
				arrItems.push(record.data);
			}
		});

		if(arrItems.length > 0) {
			var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/applyretrievefromothers';
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					coprarLoadingListReconcileStore.reload();
				}
			});
		}
	},

	onDirectFill : function() {
		var me = this;
		var refs = me.getReferences();
		var directFillGrid = refs.refDirectFillMultiSelectGrid;
		var directFillSelectedRecords = directFillGrid.getSelection();

		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;
		var directFillFromGrid;
		var directFillToGrid;
		
		if(direction == '1') {
			directFillFromStore = me.getStore('coprarStore');
			directFillToStore = me.getStore('loadingListStore');
			directFillFromGrid = refs.refCoprarGrid;
			directFillToGrid = refs.refLoadingListGrid;
		}else {
			directFillFromStore = me.getStore('loadingListStore');
			directFillToStore = me.getStore('coprarStore');
			directFillFromGrid = refs.refLoadingListGrid;
			directFillToGrid = refs.refCoprarGrid;
		}

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck) {
				indexArray.push(i);
			}
		}

		if(indexArray.length < 1 || directFillSelectedRecords.length < 1) {
			return;
		}

		for(var i = 0; i < indexArray.length; i++) {
			var directFillFromRecord = directFillFromStore.getAt(indexArray[i]);
			var directFillToRecord = directFillToStore.getAt(indexArray[i]);
			for(var j = 0; j < directFillSelectedRecords.length; j++) {
				var code = directFillSelectedRecords[j].data.code;
				var codeValue = directFillFromRecord.get(code);
				if(codeValue !== undefined) {
					directFillToRecord.set(code, codeValue);
				}
			}
		}
		me.onSettingCompareItems();
		me.onSelectedCompareItemsCheck();
	},

	onSetMatched : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');
		var columnsStore = me.getStore('columnsStore');

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			coprarLoadingListReconcileStore.data.items[i].set('matched', true);

			for(var j = 0; j < columnsStore.data.items.length; j++) {
				var columns = columnsStore.data.items[j];
				var coprarData = coprarStore.data.items[i].data[columns.data.code];
				var loadingListData = loadingListStore.data.items[i].data[columns.data.code];
				
				if(coprarData != loadingListData) {
					coprarLoadingListReconcileStore.data.items[i].set('matched', false);
				}
			}
		}

		coprarLoadingListReconcileStore.commitChanges();
	},

	onRefreshStores : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarGrid = refs.refCoprarGrid;
		var loadingListGrid = refs.refLoadingListGrid;
	
		coprarGrid.getView().refresh();
		loadingListGrid.getView().refresh();
	},

	onChangeCompareMode : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		me.onSearch();
	},
	
	onChangeRowShowHide : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');

		statusStore.clearFilter();
		coprarStore.clearFilter();
		loadingListStore.clearFilter();

		me.onRowShowHideFilter([statusStore, coprarStore, loadingListStore], newValue.rowShowHide);
	},

	onRowShowHideFilter : function(storeArray, option) {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var loadingListStore = me.getStore('loadingListStore');

		if(option == CodeConstantsOM.commonCode.MATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarLoadingListReconcileStore.getAt(index) && coprarLoadingListReconcileStore.getAt(index).data.matched) {
						return true;
					}else {
						return false;
					}
				});
			}
		}else if(option == CodeConstantsOM.commonCode.UNMATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarLoadingListReconcileStore.getAt(index) && coprarLoadingListReconcileStore.getAt(index).data.matched) {
						return false;
					}else {
						return true;
					}
				});
			}
		}
		else if(option == CodeConstantsOM.commonCode.WEIGHT_TOLERANCE){
			var indexArray = new Array();

			for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
				var coprarWeight = coprarStore.data.items[i].data.wgt;
				var loadingListWeight = loadingListStore.data.items[i].data.wgt;
				
				if((coprarWeight == null && loadingListWeight == null) || (coprarWeight != loadingListWeight)) {
					indexArray.push(i);
				}
			}

			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					for(var i = 0; i< indexArray.length; i++) {
						if(indexArray[i] == index) {
							return true;
						}
					}
					return false;
				});
			}
		}else if(option == CodeConstantsOM.commonCode.VERIFIED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarLoadingListReconcileStore.getAt(index) && coprarLoadingListReconcileStore.getAt(index).data.loadingConfirm == 'N') {
						return true;
					}else {
						return false;
					}
				});
			}
		}else if(option == CodeConstantsOM.commonCode.UNVERIFIED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarLoadingListReconcileStore.getAt(index) && coprarLoadingListReconcileStore.getAt(index).data.loadingConfirm != 'N') {
						return true;
					}else {
						return false;
					}
				});
			}
		}else if(option == CodeConstantsOM.commonCode.WGT_VGM) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarLoadingListReconcileStore.getAt(index) && coprarLoadingListReconcileStore.getAt(index).data.isRequiredVgmCheck) {
						return true;
					}else {
						return false;
					}
				});
			}
      }
      
      me.getReferences().refCoprarGrid.getView().refresh();
      me.getReferences().refLoadingListGrid.getView().refresh();
	},


	onSetColorDifferentData : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var columnsStore = me.getStore('columnsStore');
		var coprarValue;
		var loadingListValue;

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];

			if(columns.data.code == view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
				coprarValue = coprarLoadingListReconcileStore.data.items[rowIndex].data.coprarItem[columns.data.code];
				loadingListValue = coprarLoadingListReconcileStore.data.items[rowIndex].data.loadingItem[columns.data.code];

				break;
			}
		}

		if(coprarValue != loadingListValue) {
			metaData.style = 'color : red';
		}
		
		return value;
	 },

	 onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'coprarPackingGroupStore') {
			imdg = refs.ctlCoprarImdg.getValue();
			unno = refs.ctlCoprarUnno.getValue();

		}else if(store.storeId == 'loadingListPackingGroupStore') {
			imdg = refs.ctlLoadingListImdg.getValue();
			unno = refs.ctlLoadingListUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			// imdg : imdg,
			// unno : unno
			args : [imdg, unno]
		});
	 },

	 onDirectFill : function() {
		var me = this;
		var refs = me.getReferences();
		var directFillGrid = refs.refDirectFillMultiSelectGrid;
		var directFillSelectedRecords = directFillGrid.getSelection();
		var coprarLoadingListReconcileStore = me.getStore('coprarLoadingListReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;
		var directFillFromGrid;
		var directFillToGrid;

		if(direction == '1') {
			directFillFromStore = me.getStore('coprarStore');
			directFillToStore = me.getStore('loadingListStore');
			directFillFromGrid = refs.refCoprarGrid;
			directFillToGrid = refs.refLoadingListGrid;
		}else {
			directFillFromStore = me.getStore('loadingListStore');
			directFillToStore = me.getStore('coprarStore');
			directFillFromGrid = refs.refLoadingListGrid;
			directFillToGrid = refs.refCoprarGrid;
		}

		for(var i = 0; i < coprarLoadingListReconcileStore.data.items.length; i++) {
			if(coprarLoadingListReconcileStore.data.items[i].data.applyCheck) {
				indexArray.push(i);
			}
		}

		if(indexArray.length < 1 || directFillSelectedRecords.length < 1) {
			return;
		}
 
		for(var i = 0; i < indexArray.length; i++) {
			var directFillFromRecord = directFillFromStore.getAt(indexArray[i]);
			var directFillToRecord = directFillToStore.getAt(indexArray[i]); 
			for(var j = 0; j < directFillSelectedRecords.length; j++) {
				for(var code in directFillFromRecord.data) {
					if(code == directFillSelectedRecords[j].data.code) {
						directFillToRecord.set(code, directFillFromRecord.data[code]);
					}
				}
			}
		}
		me.onSettingCompareItems();
		me.onSelectedCompareItemsCheck();
	 },

	 onApplyCheckHeaderClick : function(ct, column, e, t, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var checkFlag = false;

		if(column.areAllChecked()) {
			checkFlag = false;
		}else {
			checkFlag = true;
		}

		for(var i = 0; i < statusStore.data.items.length; i++) {
			statusStore.data.items[i].set('applyCheck', checkFlag);
			statusStore.data.items[i].commit();
		}
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad : function() {
		var me = this;
		var form = me.getDetailBizView().down('form');
		form.isValid(); // Mandatory to appear red for.
		me.setDetailInitialize();
		me.updateViewStyle(me.getDetailBizView());
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var coprarGrid = refs.refCoprarGrid;
		var loadingListGrid = refs.refLoadingListGrid;
		var coprarData = coprarGrid.getSelection()[0];
		var loadingListData = loadingListGrid.getSelection()[0];
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
			
		} else { // CREATE
			
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theCoprarDetail:coprarData});
		me.getViewModel().setData({theLoadingListDetail:loadingListData});
	},

	onComponentBeforeRender : function(obj, eOpts) {
		var me = this;
		if(obj.allowBlank == false) {
			me.onSettingAllowBlank(obj);
		}
	},

	onSettingAllowBlank : function(obj) {
		var me = this;
		var refs = me.getReferences();
		var coprarGrid = refs.refCoprarGrid;
		var loadingListGrid = refs.refLoadingListGrid;
		
		if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_COPRAR')) {
			if(coprarGrid.getSelection()[0].data.cntrNo == null) {
				obj.allowBlank = true;
			}
			
		}else if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_LoadingList')){
			if(loadingListGrid.getSelection()[0].data.cntrNo == null) {
				obj.allowBlank = true;
			}
		}
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;
		var refs = me.getReferences();
		
		detailItem.set('staffCd', me.getStaffCd());
		
		return detailItem;
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		
		if(detailView) {
			var infoForm = detailView.down('form');
			if(infoForm.isValid()) {
				me.saveProcess();
				detailView.close();
			}else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;

		me.onSettingCompareItems();
		me.onSelectedCompareItemsCheck();
	},

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
		}

		if(obj.getReference() == 'ctlCoprarSztp') {
			refs.ctlCoprarSztp2.setValue(sztp2);
		}else {
			refs.ctlLoadingListSztp2.setValue(sztp2);
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */


	makeUpdateParmForApply : function(url, item) {
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/export/coprarloadinglistreconcile/' + url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		updateParm.get('items').push(item);

		return updateParm;
	}
});