Ext.define('IoTosOmExt.view.export.movinsreconcile.MovinsReconcileController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.movinsreconcile',

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
		var searchParm = Ext.create('IoTosOmExt.model.export.movinsreconcile.SearchMovinsReconcile');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});
		me.updateViewStyle(me.getView());
		me.initializeSetting();
		me.onLoadStores();
	},

	initializeSetting : function() {
		var me = this;
		me.onSettingColumnsList();
		me.onSettingGridScroller();
	},

	onSettingGridScroller : function() {
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var addMovinsGridScroll = refs.refAddtionalMovinsGrid.getScrollable();
		var oldMovinsGridScroll = refs.refOldMovinsGrid.getScrollable();
		
		statusGridScroll.on({
			scroll : 'onMovinsReconcileGridScroll',
			scrollend : 'onMovinsReconcileGridScrollEnd',
			scope : me,
		});

	  addMovinsGridScroll.on({
			scroll : 'onMovinsReconcileGridScroll',
			scrollend : 'onMovinsReconcileGridScrollEnd',
			scope : me,
		});

		oldMovinsGridScroll.on({
			scroll : 'onMovinsReconcileGridScroll',
			scrollend : 'onMovinsReconcileGridScrollEnd',
			scope : me,
		});
	},

	onMovinsReconcileGridScroll : function(obj, x, y, deltaX, deltaY, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var addMovinsGridScroll = refs.refAddtionalMovinsGrid.getScrollable();
		var oldMovinsGridScroll = refs.refOldMovinsGrid.getScrollable();

		if(obj.component.grid.reference == 'refStatusGrid'){
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				addMovinsGridScroll.scrollTo(null,y);
				oldMovinsGridScroll.scrollTo(null,y);
			}
		}else if(obj.component.grid.reference == 'refAddtionalMovinsGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;	
				statusGridScroll.scrollTo(null,y);
				oldMovinsGridScroll.scrollTo(x,y);
			}
		}else if(obj.component.grid.reference == 'refOldMovinsGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;	
				statusGridScroll.scrollTo(null,y);
				addMovinsGridScroll.scrollTo(x,y);
			}
		}
	},

	onMovinsReconcileGridScrollEnd : function(obj, x, y, deltaX, deltaY, eOpts) {
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
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');
		var statusStore = me.getStore('statusStore');
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}

		movinsReconcileStore.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					additionalMovinsStore.removeAll();
					oldMovinsStore.removeAll();

					if (records && records.length <= 0) {
						refs.refStatusGrid.getStore().removeAll();
						MessageUtil.noMatchData();
					}else {
						for(var i = 0; i < records.length; i++) {
							additionalMovinsStore.add(records[i].data.addMovinsItem);
							oldMovinsStore.add(records[i].data.movinsItem);
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
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var movinsReconcileRecord = movinsReconcileStore.getAt(rowIndex);

		if (record == null)
			return;
		
		me.openDetailPopup(movinsReconcileRecord);
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
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();


		for(var i = 0; i < movinsReconcileStore.data.items.length; i++) {
			var dirtyFlag = false;

			if(additionalMovinsStore.data.items[i].dirty == true) {
				movinsReconcileStore.data.items[i].data.addMovinsItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(oldMovinsStore.data.items[i].dirty == true) {
				movinsReconcileStore.data.items[i].data.movinsItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(dirtyFlag) {
				me.buildDataItem(movinsReconcileStore.data.items[i]);
				arrItems.push(movinsReconcileStore.data.items[i].data);
			}
		}
		
		if(arrItems.length > 0) {
			updateParm.getProxy().url = movinsReconcileStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					movinsReconcileStore.commitChanges();
					additionalMovinsStore.commitChanges();
					oldMovinsStore.commitChanges();
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
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var pageNo = additionalMovinsStore.currentPage;
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
		var compareMode = refs.ctlCompareMode;
		params['compareMode'] = compareMode.getValue().compareMode;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onSettingColumnsList : function() {
		var me = this;
		var refs = me.getReferences();
		var columnsStore = me.getStore('columnsStore');
		var refAddtionalMovinsGrid = refs.refAddtionalMovinsGrid;
		var columns = refAddtionalMovinsGrid.getColumns();
		var dataArray = new Array();

		for(var i = 0; i < columns.length; i++) {
			if(columns[i].dataIndex != '' && columns[i].dataIndex != null) {
				dataArray.push({
					code : columns[i].dataIndex,
					name : columns[i].text.trim()
				});
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
		var shiftingTimeStore = me.getStore('shiftingTimeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
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
            itemKey : PopupServiceConstants.GeneralCode.POR
         }
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
            itemKey : PopupServiceConstants.MasterCode.DELIVERY
         }
		});

		shiftingTimeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_TYPE
			}
		});

		cargoTypeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.CARGO_TYPE
         }
		});

		sztpCodeStore.load();
	},

	onSettingCompareItems : function() {
		var me = this;
		var refs = me.getReferences();
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');
		var columnsStore = me.getStore('columnsStore');
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];
			var equalCount = 0;
			var differentCount = 0;

			for(var j = 0; j < movinsReconcileStore.data.items.length; j++) {
				var addMovinsData = additionalMovinsStore.data.items[j].data[columns.data.code];
				var oldMovinsData = oldMovinsStore.data.items[j].data[columns.data.code];
				
				if(addMovinsData == oldMovinsData) {
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

	onMovinsReconcileGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		var addMovinsGrid = refs.refAddtionalMovinsGrid;
		var oldMovinsGrid = refs.refOldMovinsGrid;
	
		statusGrid.getSelectionModel().select(rowIndex);
		addMovinsGrid.getSelectionModel().select(rowIndex);
		oldMovinsGrid.getSelectionModel().select(rowIndex);
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

	onCreateMovins : function() {
		var me = this;
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var createMovinsStore = me.getStore('createMovinsStore');
		
		createMovinsStore.removeAll();

		for(var i = 0; i < movinsReconcileStore.data.items.length; i++) {
			if(movinsReconcileStore.data.items[i].data.applyCheck) {
				createMovinsStore.add(movinsReconcileStore.data.items[i]);
			}
		}

		if(createMovinsStore.data.items.length <= 0) {
			return false;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = createMovinsStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < createMovinsStore.data.items.length; i++) {
			me.buildDataItem(createMovinsStore.data.items[i]);
			updateParm.get('items').push(createMovinsStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onExchangeMovins : function() {
		var me = this;
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var exchangeMovinsStore = me.getStore('exchangeMovinsStore');
		
		if(movinsReconcileStore.data.items.length <= 0) {
			return;
		}
		
		exchangeMovinsStore.removeAll();
		exchangeMovinsStore.add(movinsReconcileStore.data.items[0]);

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = exchangeMovinsStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		me.buildDataItem(exchangeMovinsStore.data.items[0]);
		updateParm.get('items').push(exchangeMovinsStore.data.items[0].data);

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onDirectFill : function() {
		var me = this;
		var refs = me.getReferences();
		var directFillGrid = refs.refDirectFillMultiSelectGrid;
		var directFillSelectedRecords = directFillGrid.getSelection();

		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;
		var directFillFromGrid;
		var directFillToGrid;
		
		if(direction == '1') {
			directFillFromStore = me.getStore('additionalMovinsStore');
			directFillToStore = me.getStore('oldMovinsStore');
			directFillFromGrid = refs.refAddtionalMovinsGrid;
			directFillToGrid = refs.refOldMovinsGrid;
		}else {
			directFillFromStore = me.getStore('oldMovinsStore');
			directFillToStore = me.getStore('additionalMovinsStore');
			directFillFromGrid = refs.refOldMovinsGrid;
			directFillToGrid = refs.refAddtionalMovinsGrid;
		}

		for(var i = 0; i < movinsReconcileStore.data.items.length; i++) {
			if(movinsReconcileStore.data.items[i].data.applyCheck) {
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
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');
		var columnsStore = me.getStore('columnsStore');

		for(var i = 0; i < movinsReconcileStore.data.items.length; i++) {
			movinsReconcileStore.data.items[i].set('matched', true);

			for(var j = 0; j < columnsStore.data.items.length; j++) {
				var columns = columnsStore.data.items[j];
				var addMovinsData = additionalMovinsStore.data.items[i].data[columns.data.code];
				var oldMovinsData = oldMovinsStore.data.items[i].data[columns.data.code];
				
				if(addMovinsData != oldMovinsData) {
					movinsReconcileStore.data.items[i].set('matched', false);
				}
			}
		}

		movinsReconcileStore.commitChanges();
	},

	onRefreshStores : function() {
		var me = this;
		var refs = me.getReferences();
		var addMovinsGrid = refs.refAddtionalMovinsGrid;
		var oldMovinsGrid = refs.refOldMovinsGrid;
	
		addMovinsGrid.getView().refresh();
		oldMovinsGrid.getView().refresh();
	},

	onChangeCompareMode : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		me.onSearch();
	},
	
	onChangeRowShowHide : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');

		statusStore.clearFilter();
		additionalMovinsStore.clearFilter();
		oldMovinsStore.clearFilter();

		me.onRowShowHideFilter([statusStore, additionalMovinsStore, oldMovinsStore], newValue.rowShowHide);
	},

	onRowShowHideFilter : function(storeArray, option) {
		var me = this;
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var additionalMovinsStore = me.getStore('additionalMovinsStore');
		var oldMovinsStore = me.getStore('oldMovinsStore');

		if(option == CodeConstantsOM.commonCode.MATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(movinsReconcileStore.getAt(index) && movinsReconcileStore.getAt(index).data.matched) {
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
					if(movinsReconcileStore.getAt(index) && movinsReconcileStore.getAt(index).data.matched) {
						return false;
					}else {
						return true;
					}
				});
			}
		}
		else if(option == CodeConstantsOM.commonCode.WEIGHT_TOLERANCE){
			var indexArray = new Array();

			for(var i = 0; i < movinsReconcileStore.data.items.length; i++) {
				var addMovinsWeight = additionalMovinsStore.data.items[i].data.wgt;
				var oldMovinsWeight = oldMovinsStore.data.items[i].data.wgt;
				
				if((addMovinsWeight == null && oldMovinsWeight == null) || (addMovinsWeight != oldMovinsWeight)) {
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
      }
      
      me.getReferences().refAddtionalMovinsGrid.getView().refresh();
      me.getReferences().refOldMovinsGrid.getView().refresh();
	},

	onSetColorDifferentData : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var movinsReconcileStore = me.getStore('movinsReconcileStore');
		var columnsStore = me.getStore('columnsStore');
		var addMovinsValue;
		var movinsValue;

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];

			if(columns.data.code == view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
				addMovinsValue = movinsReconcileStore.data.items[rowIndex].data.addMovinsItem[columns.data.code]
				movinsValue = movinsReconcileStore.data.items[rowIndex].data.movinsItem[columns.data.code]

				break;
			}
		}

		if(addMovinsValue != movinsValue) {
			metaData.style = 'color : red';
		}
		
		return value;
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
		var addMovinsGrid = refs.refAddtionalMovinsGrid;
		var oldMovinsGrid = refs.refOldMovinsGrid;
		var addMovinsData = addMovinsGrid.getSelection()[0];
		var oldMovinsData = oldMovinsGrid.getSelection()[0];
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();

		} else { // CREATE

		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theAddMovinsDetail:addMovinsData});
		me.getViewModel().setData({theOldMovinsDetail:oldMovinsData});
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
		var addMovinsGrid = refs.refAddtionalMovinsGrid;
		var oldMovinsGrid = refs.refOldMovinsGrid;
		
		if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_AdditionalMovinsNEW')) {
			if(addMovinsGrid.getSelection()[0].data.loadPos == null) {
				obj.allowBlank = true;
			}
			
		}else if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_MovinsOLD')){
			if(oldMovinsGrid.getSelection()[0].data.loadPos == null) {
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

		if(obj.getReference() == 'ctlAddMovinsSztp') {
			refs.ctlAddMovinsSztp2.setValue(sztp2);
		}else {
			refs.ctlOldMovinsSztp2.setValue(sztp2);
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});