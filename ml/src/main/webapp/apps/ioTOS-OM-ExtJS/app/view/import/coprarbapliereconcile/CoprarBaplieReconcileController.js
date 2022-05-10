Ext.define('IoTosOmExt.view.import.coprarbapliereconcile.CoprarBaplieReconcileController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],

	alias : 'controller.coprarbapliereconcile',	
	
	scrollGrid : null,

   onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('IoTosOmExt.model.import.coprarbapliereconcile.SearchCoprarBaplieReconcile');
		
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
		var coprarGridScroll = refs.refCoprarGrid.getScrollable();
		var baplieGridScroll = refs.refBaplieGrid.getScrollable();

		statusGridScroll.on({
			scroll : 'onCoprarBaplieReconcileGridScroll',
			scrollend : 'onCoprarBaplieReconcileGridScrollEnd',
			scope : me,
		});
		
      coprarGridScroll.on({
			scroll : 'onCoprarBaplieReconcileGridScroll',
			scrollend : 'onCoprarBaplieReconcileGridScrollEnd',
			scope : me,
		});

		baplieGridScroll.on({
			scroll : 'onCoprarBaplieReconcileGridScroll',
			scrollend : 'onCoprarBaplieReconcileGridScrollEnd',
			scope : me,
		});
	},

	onCoprarBaplieReconcileGridScroll : function(obj, x, y, deltaX, deltaY, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var coprarGridScroll = refs.refCoprarGrid.getScrollable();
		var baplieGridScroll = refs.refBaplieGrid.getScrollable();

		if(obj.component.grid.reference == 'refStatusGrid'){
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				coprarGridScroll.scrollTo(null,y);
				baplieGridScroll.scrollTo(null,y);
			}

		}else if(obj.component.grid.reference == 'refCoprarGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				baplieGridScroll.scrollTo(x,y);
			}

		}else if(obj.component.grid.reference == 'refBaplieGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				coprarGridScroll.scrollTo(x,y);
			}
		}
	},

	onCoprarBaplieReconcileGridScrollEnd : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();

		if(me.scrollGrid == obj){
			me.scrollGrid = null;
		}
	},

   onSearch : function(control) {
		var me = this;
		var refs = me.getReferences();
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');
		var statusStore = me.getStore('statusStore');
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}

		coprarBaplieReconcileStore.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					coprarStore.removeAll();
					baplieStore.removeAll();
					
					if (records && records.length <= 0) {
						refs.refStatusGrid.getStore().removeAll();
						MessageUtil.noMatchData();
					}else {
						for(var i = 0; i < records.length; i++) {
							coprarStore.add(records[i].data.coprarItem);
							baplieStore.add(records[i].data.baplieItem);
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
	
	onLoadStores : function(control) {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;

		var feCodeStore = me.getStore('feCodeStore');
		var oprCodeStore = me.getStore('oprCodeStore');
		var billingOprCodeStore = me.getStore('billingOprCodeStore');
		var consigneeCodeStore = me.getStore('consigneeCodeStore');
		var porCodeStore = me.getStore('porCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
		var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
		var handleInstrCodeStore = me.getStore('handleInstrCodeStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var svcOutLaneCodeStore = me.getStore('svcOutLaneCodeStore');
		var secondVvdStore = me.getStore('secondVvdStore');
		var shiftingMoveStore = me.getStore('shiftingMoveStore');
		var trainUserVoyageStore = me.getStore('trainUserVoyageStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');
		
		if(control == 'Search') {
         if(vvdData != null) {
         	oprCodeStore.load({
         		params : {
         			args : [vvdData.vesselCode, vvdData.callYear, vvdData.callSeq],
         			itemKey : PopupServiceConstants.ItemKey.VVD_OPR_ONLY
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

		billingOprCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
			}
		});

		consigneeCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.SHIPPER_CONSIGNEE
			}
		});

		porCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.POR
			}
		});

		polCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE,
				args : [CodeConstantsOM.commonCode.UNLO]
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
		
		cargoTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CARGO_TYPE
			}
		});
		
		handleInstrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.HANDLE_INSTR
			}
		});

		deliveryCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.DELIVERY_FOR_IMPORT
			}
		});

		svcOutLaneCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.LANE_CODE
			}
		});

		secondVvdStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.VVD_ASSIGNABLE_VESSEL_ONLY
			}
		});

		shiftingMoveStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_TYPE
			}
		});

		trainUserVoyageStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.TRAIN_VOY,
				args : ['L',null,null,null]
			}
		})

		sztpCodeStore.load();
	},

	onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'coprarPackingGroupStore') {
			imdg = refs.ctlCoprarImdg.getValue();
			unno = refs.ctlCoprarUnno.getValue();

		}else if(store.storeId == 'bapliePackingGroupStore') {
			imdg = refs.ctlBaplieImdg.getValue();
			unno = refs.ctlBaplieUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			args : [imdg, unno]
		});
	},
   
   getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var pageNo = coprarBaplieReconcileStore.currentPage;
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

	onStatusGridApplyCheck : function(obj, rowIndex, checked, record, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		statusGrid.setSelection(record);
		record.commit();
	},
   
   onSetColorDifferentData : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var columnsStore = me.getStore('columnsStore');
		var coprarValue;
		var baplieValue;

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var column = columnsStore.data.items[i];
			
			if(column.data.code == view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
				coprarValue = coprarBaplieReconcileStore.data.items[rowIndex].data.coprarItem[column.data.code]
				baplieValue = coprarBaplieReconcileStore.data.items[rowIndex].data.baplieItem[column.data.code]
				
				break;
			}
		}
		
		if(coprarValue != baplieValue) {
			metaData.style = 'color : red';
		}
		
      return value;
	},
	
	onSettingColumnsList : function() {
		var me = this;
		var refs = me.getReferences();
		var columnsStore = me.getStore('columnsStore');
		var coprarGrid = refs.refCoprarGrid;
		var columns = coprarGrid.getColumns();
		var dataArray = new Array();

		for(var i = 0; i < columns.length; i++) {
			if(columns[i].dataIndex != '' && columns[i].dataIndex != null && columns[i].dataIndex != 'cntrNo') {
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

	onSettingCompareItems : function() {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');
		var columnsStore = me.getStore('columnsStore');
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];
			var equalCount = 0;
			var differentCount = 0;
			
			for(var j = 0; j < coprarBaplieReconcileStore.data.items.length; j++) {
				var coprareData = coprarStore.data.items[j].data[columns.data.code];
				var baplieData = baplieStore.data.items[j].data[columns.data.code];

				if(coprareData == baplieData) {
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

	onSetMatched : function() {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');
		var columnsStore = me.getStore('columnsStore');

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			coprarBaplieReconcileStore.data.items[i].set('matched', true);

			for(var j = 0; j < columnsStore.data.items.length; j++) {
				var columns = columnsStore.data.items[j];
				var coprarData = coprarStore.data.items[i].data[columns.data.code];
				var baplieData = baplieStore.data.items[i].data[columns.data.code];
				
				if(coprarData != baplieData) {
					coprarBaplieReconcileStore.data.items[i].set('matched', false);
				}
			}
		}

		coprarBaplieReconcileStore.commitChanges();
	},

	onRefreshStores : function() {
		var me = this;
		var refs = me.getReferences();
		var coprarGrid = refs.refCoprarGrid;
		var baplieGrid = refs.refBaplieGrid;
	
		coprarGrid.getView().refresh();
		baplieGrid.getView().refresh();
	},

	compareItemsApplyCheck : function() {
		var me = this;
		var refs = me.getReferences();
		var autoApply = refs.ctlAutoApplyCheckBox;

		if(!autoApply.checked) {
			me.onSelectedCompareItemsCheck();
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

	onCoprarBaplieReconcileGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		var coprarGrid = refs.refCoprarGrid;
		var baplieGrid = refs.refBaplieGrid;
	
		statusGrid.getSelectionModel().select(rowIndex);
		coprarGrid.getSelectionModel().select(rowIndex);
		baplieGrid.getSelectionModel().select(rowIndex);
	},

	onDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarBaplieReconcileRecord = coprarBaplieReconcileStore.getAt(rowIndex);

		if (record == null)
			return;
		
		me.openDetailPopup(coprarBaplieReconcileRecord);
	},

	onChangeCompareMode : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		me.onSearch();
	},

	onChangeRowShowHide : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');

		statusStore.clearFilter();
		coprarStore.clearFilter();
		baplieStore.clearFilter();

		me.onRowShowHideFilter([statusStore, coprarStore, baplieStore], newValue.rowShowHide);
	},

	onRowShowHideFilter : function(storeArray, option) {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');

		if(option == CodeConstantsOM.commonCode.MATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(coprarBaplieReconcileStore.getAt(index) && coprarBaplieReconcileStore.getAt(index).data.matched) {
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
					if(coprarBaplieReconcileStore.getAt(index) && coprarBaplieReconcileStore.getAt(index).data.matched) {
						return false;
					}else {
						return true;
					}
				});
			}
		}
		else if(option == CodeConstantsOM.commonCode.WEIGHT_TOLERANCE){
			var indexArray = new Array();

			for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
				var coprarWeight = coprarStore.data.items[i].data.wgt;
				var baplieWeight = baplieStore.data.items[i].data.wgt;
				
				if((coprarWeight == null && baplieWeight == null) || (coprarWeight != baplieWeight)) {
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
      
      me.getReferences().refCoprarGrid.getView().refresh();
      me.getReferences().refBaplieGrid.getView().refresh();
	},

	onReconcile : function() {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var reconcileStore = me.getStore('reconcileStore');

		reconcileStore.removeAll();

		var rsrvTypeArray = ['D'];

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			if(coprarBaplieReconcileStore.data.items[i].data.applyCheck && 
				coprarBaplieReconcileStore.data.items[i].data.status == CodeConstantsOM.containerState.RESERVED
				) {
					coprarBaplieReconcileStore.data.items[i].data.baplieItem.cntrState = CodeConstantsOM.containerState.BOOKED;
					coprarBaplieReconcileStore.data.items[i].data.baplieItem.rsrvTypes = rsrvTypeArray;
					reconcileStore.add(coprarBaplieReconcileStore.data.items[i].data.baplieItem);
			}
		}
		
		if(reconcileStore.data.items.length < 1) {
			return;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = reconcileStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < reconcileStore.data.items.length; i++) {
			me.buildDataItem(reconcileStore.data.items[i]);
			updateParm.get('items').push(reconcileStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},
	
	onCreateBaplie : function() {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var createBaplieStore = me.getStore('createBaplieStore');
		
		createBaplieStore.removeAll();

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			if(coprarBaplieReconcileStore.data.items[i].data.applyCheck) {
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.userVoy = vvdData.userVoy;
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.rsrvType = 'D';
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.cntrState = 'R';
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.transType = 'V';
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.inLane = vvdData.inLane;
				createBaplieStore.add(coprarBaplieReconcileStore.data.items[i].data.coprarItem);
			}
		}

		if(createBaplieStore.data.items.length <= 0) {
			return false;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = createBaplieStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < createBaplieStore.data.items.length; i++) {
			me.buildDataItem(createBaplieStore.data.items[i]);
			updateParm.get('items').push(createBaplieStore.data.items[i].data);
		}

		updateParm.save({
			success : function(record, operation) {
				me.onSearch();
			}
		});
	},

	onCreateCoprar : function() {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var createCoprarStore = me.getStore('createCoprarStore');
		
		createCoprarStore.removeAll();

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			if(coprarBaplieReconcileStore.data.items[i].data.applyCheck) {
				createCoprarStore.add(coprarBaplieReconcileStore.data.items[i].data.baplieItem);
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

	onDirectFill : function() {
		var me = this;
		var refs = me.getReferences();
		var directFillGrid = refs.refDirectFillMultiSelectGrid;
		var directFillSelectedRecords = directFillGrid.getSelection();

		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;

		if(direction == '1') {
			directFillFromStore = me.getStore('coprarStore');
			directFillToStore = me.getStore('baplieStore');
		}else {
			directFillFromStore = me.getStore('baplieStore');
			directFillToStore = me.getStore('coprarStore');
		}

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			if(coprarBaplieReconcileStore.data.items[i].data.applyCheck) {
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

	buildDataItem : function(detailItem) {
		var me = this;
		var refs = me.getReferences();
		
		detailItem.set('staffCd', me.getStaffCd());
		
		return detailItem;
	},

	onGridSave : function() {
		var me = this;
		var coprarBaplieReconcileStore = me.getStore('coprarBaplieReconcileStore');
		var coprarStore = me.getStore('coprarStore');
		var baplieStore = me.getStore('baplieStore');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		for(var i = 0; i < coprarBaplieReconcileStore.data.items.length; i++) {
			var dirtyFlag = false;

			if(coprarStore.data.items[i].dirty == true) {
				coprarBaplieReconcileStore.data.items[i].data.coprarItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;				
			}

			if(baplieStore.data.items[i].dirty == true) {
				coprarBaplieReconcileStore.data.items[i].data.baplieItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(dirtyFlag) {
				me.buildDataItem(coprarBaplieReconcileStore.data.items[i]);
				arrItems.push(coprarBaplieReconcileStore.data.items[i].data);
			}
		}

		if(arrItems.length > 0) {
			updateParm.getProxy().url = coprarBaplieReconcileStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					coprarBaplieReconcileStore.commitChanges();
					coprarStore.commitChanges();
					baplieStore.commitChanges();
					MessageUtil.saveSuccess();
				},

				failure : function() {
					me.onSettingCompareItems();
					me.onSelectedCompareItemsCheck();
				}
			});
		}
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
	
	onDetailLoad : function() {
		var me = this;
		var form = me.getDetailBizView().down('form');
		form.isValid(); // Mandatory to appear red for.
		me.setDetailInitialize();
		me.updateViewStyle(me.getDetailBizView());	
	},

	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var coprarGrid = refs.refCoprarGrid;
		var baplieGrid = refs.refBaplieGrid;
		var coprarData = coprarGrid.getSelection()[0];
		var baplieData = baplieGrid.getSelection()[0];
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
		
		} else { // CREATE
			
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theCoprarDetail:coprarData});
		me.getViewModel().setData({theBaplieDetail:baplieData});
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
		var baplieGrid = refs.refBaplieGrid;
		
		if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_COPRAR')) {
			if(coprarGrid.getSelection()[0].data.cntrNo == null) {
				obj.allowBlank = true;
			}
			
		}else if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_BAPLIE')){
			if(baplieGrid.getSelection()[0].data.cntrNo == null) {
				obj.allowBlank = true;
			}
		}
	},

	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
	},

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

	saveProcess : function() {
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
			refs.ctlBaplieSztp2.setValue(sztp2);
		}
	},

});