Ext.define('IoTosOmExt.view.import.bapliereconcile.BaplieReconcileController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.bapliereconcile',
	
	scrollGrid : null,

   onLoad : function() {
		var me = this;
		var searchParm = Ext.create('IoTosOmExt.model.import.bapliereconcile.SearchBaplieReconcile');
		
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
		var addtionalBaplieScroll = refs.refAddtionalBaplieGrid.getScrollable();
		var oldBaplieGridScroll = refs.refOldBaplieGrid.getScrollable();

		statusGridScroll.on({
			scroll : 'onBaplieReconcileGridScroll',
			scrollend : 'onBaplieReconcileGridScrollEnd',
			scope : me,
		});
		
      addtionalBaplieScroll.on({
			scroll : 'onBaplieReconcileGridScroll',
			scrollend : 'onBaplieReconcileGridScrollEnd',
			scope : me,
		});

		oldBaplieGridScroll.on({
			scroll : 'onBaplieReconcileGridScroll',
			scrollend : 'onBaplieReconcileGridScrollEnd',
			scope : me,
		});
	},

	onBaplieReconcileGridScroll : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var addtionalBaplieScroll = refs.refAddtionalBaplieGrid.getScrollable();
		var oldBaplieGridScroll = refs.refOldBaplieGrid.getScrollable();

		if(obj.component.grid.reference == 'refStatusGrid'){
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				addtionalBaplieScroll.scrollTo(null,y);
				oldBaplieGridScroll.scrollTo(null,y);
			}

		}else if(obj.component.grid.reference == 'refAddtionalBaplieGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				oldBaplieGridScroll.scrollTo(x,y);
			}
		}else if(obj.component.grid.reference == 'refOldBaplieGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				addtionalBaplieScroll.scrollTo(x,y);
			}
		}
	},

	onBaplieReconcileGridScrollEnd : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();
		
		if(me.scrollGrid == obj){
			me.scrollGrid = null;
		}
	},

   onSearch : function(control) {
		var me = this;
		var refs = me.getReferences();
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');
		var statusStore = me.getStore('statusStore');
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}

		baplieReconcileStore.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					additionalBaplieStore.removeAll();
					oldBaplieStore.removeAll();
					
					if (records && records.length <= 0) {
						refs.refStatusGrid.getStore().removeAll();
						MessageUtil.noMatchData();
					}else {
						for(var i = 0; i < records.length; i++) {
							additionalBaplieStore.add(records[i].data.addBaplieItem);
							oldBaplieStore.add(records[i].data.baplieItem);
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

		var oprCodeStore = me.getStore('oprCodeStore');
		var ptnrCodeStore = me.getStore('ptnrCodeStore');  //billing opr
		var feCodeStore = me.getStore('feCodeStore');
		var storageStore = me.getStore('storageStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
		var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
		var shiftingTimeStore = me.getStore('shiftingTimeStore');
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

		ptnrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
			}
		});

		feCodeStore.load({
         params : {
				itemKey : PopupServiceConstants.MasterCode.FE
         }
		});

		storageStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.STORAGE_CODE
         }
		});

		deliveryCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.DELIVERY
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

		shiftingTimeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_TYPE
			}
		});

		sztpCodeStore.load();
	},

	onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'addBapliePackingGroupStore') {
			imdg = refs.ctlAddBaplieImdg.getValue();
			unno = refs.ctlAddBaplieUnno.getValue();

		}else if(store.storeId == 'oldBapliePackingGroupStore') {
			imdg = refs.ctlOldBaplieImdg.getValue();
			unno = refs.ctlOldBaplieUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			args : [imdg, unno]
		});
	},
   
   getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var pageNo = baplieReconcileStore.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var params = me.createParam(searchParm, ['isIncludingThru']);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
         params['userVoy'] = vvdData.userVoyage;
         params['tmnlPort'] = CodeConstantsOM.commonCode.CURRENT_COUNTRY_CODE + CodeConstantsOM.commonCode.CURRENT_PORT_CODE;
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
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var columnsStore = me.getStore('columnsStore');
		var addBaplieValue;
		var oldBaplieValue;

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var column = columnsStore.data.items[i];
			
			if(column.data.code == view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
				addBaplieValue = baplieReconcileStore.data.items[rowIndex].data.addBaplieItem[column.data.code]
				oldBaplieValue = baplieReconcileStore.data.items[rowIndex].data.baplieItem[column.data.code]
				
				break;
			}
		}
		
		if(addBaplieValue != oldBaplieValue) {
			metaData.style = 'color : red';
		}
		
      return value;
	},
	
	onSettingColumnsList : function() {
		var me = this;
		var refs = me.getReferences();
		var columnsStore = me.getStore('columnsStore');
		var addtionalBaplieGrid = refs.refAddtionalBaplieGrid;
		var columns = addtionalBaplieGrid.getColumns();
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
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');
		var columnsStore = me.getStore('columnsStore');
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];
			var equalCount = 0;
			var differentCount = 0;

			for(var j = 0; j < baplieReconcileStore.data.items.length; j++) {
				var addBaplieData = additionalBaplieStore.data.items[j].data[columns.data.code];
				var oldBaplieData = oldBaplieStore.data.items[j].data[columns.data.code];

				if(addBaplieData == oldBaplieData) {
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
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');
		var columnsStore = me.getStore('columnsStore');

		for(var i = 0; i < baplieReconcileStore.data.items.length; i++) {
			baplieReconcileStore.data.items[i].set('matched', true);

			for(var j = 0; j < columnsStore.data.items.length; j++) {
				var columns = columnsStore.data.items[j];
				var addBaplieData = additionalBaplieStore.data.items[i].data[columns.data.code];
				var oldBaplieData = oldBaplieStore.data.items[i].data[columns.data.code];
				
				if(addBaplieData != oldBaplieData) {
					baplieReconcileStore.data.items[i].set('matched', false);
				}
			}
		}

		baplieReconcileStore.commitChanges();
	},

	onRefreshStores : function() {
		var me = this;
		var refs = me.getReferences();
		var addtionalBaplieGrid = refs.refAddtionalBaplieGrid;
		var oldBaplieGrid = refs.refOldBaplieGrid;
	
		addtionalBaplieGrid.getView().refresh();
		oldBaplieGrid.getView().refresh();
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

	onBaplieReconcileGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		var addBaplieGrid = refs.refAddtionalBaplieGrid;
		var oldBaplieGrid = refs.refOldBaplieGrid;
	
		statusGrid.getSelectionModel().select(rowIndex);
		addBaplieGrid.getSelectionModel().select(rowIndex);
		oldBaplieGrid.getSelectionModel().select(rowIndex);
	},

	onDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var baplieReconcileRecord = baplieReconcileStore.getAt(rowIndex);

		if (record == null)
			return;
		
		me.openDetailPopup(baplieReconcileRecord);
	},

	onChangeCompareMode : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		me.onSearch();
	},

	onChangeRowShowHide : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');

		statusStore.clearFilter();
		additionalBaplieStore.clearFilter();
		oldBaplieStore.clearFilter();

		me.onRowShowHideFilter([statusStore, additionalBaplieStore, oldBaplieStore], newValue.rowShowHide);
	},

	onRowShowHideFilter : function(storeArray, option) {
		var me = this;
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');

		if(option == CodeConstantsOM.commonCode.MATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(baplieReconcileStore.getAt(index) && baplieReconcileStore.getAt(index).data.matched) {
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
					if(baplieReconcileStore.getAt(index) && baplieReconcileStore.getAt(index).data.matched) {
						return false;
					}else {
						return true;
					}
				});
			}
		}
		else if(option == CodeConstantsOM.commonCode.WEIGHT_TOLERANCE){
			var indexArray = new Array();

			for(var i = 0; i < baplieReconcileStore.data.items.length; i++) {
				var addBaplieWeight = additionalBaplieStore.data.items[i].data.wgt;
				var oldBaplieWeight = oldBaplieStore.data.items[i].data.wgt;
				
				if((addBaplieWeight == null && oldBaplieWeight == null) || (addBaplieWeight != oldBaplieWeight)) {
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
      
      me.getReferences().refAddtionalBaplieGrid.getView().refresh();
      me.getReferences().refOldBaplieGrid.getView().refresh();
	},
	
	onCreateBaplie : function() {
		var me = this;
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var createBaplieStore = me.getStore('createBaplieStore');
		
		createBaplieStore.removeAll();

		for(var i = 0; i < baplieReconcileStore.data.items.length; i++) {
			if(baplieReconcileStore.data.items[i].data.applyCheck) {
				baplieReconcileStore.data.items[i].data.addBaplieItem.userVoy = baplieReconcileStore.data.items[i].data.userVoy;
				baplieReconcileStore.data.items[i].data.addBaplieItem.cntrState = 'R';
				createBaplieStore.add(baplieReconcileStore.data.items[i].data.addBaplieItem);
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

	onDirectFill : function() {
		var me = this;
		var refs = me.getReferences();
		var directFillGrid = refs.refDirectFillMultiSelectGrid;
		var directFillSelectedRecords = directFillGrid.getSelection();

		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;

		if(direction == '1') {
			directFillFromStore = me.getStore('additionalBaplieStore');
			directFillToStore = me.getStore('oldBaplieStore');
		}else {
			directFillFromStore = me.getStore('oldBaplieStore');
			directFillToStore = me.getStore('additionalBaplieStore');
		}

		for(var i = 0; i < baplieReconcileStore.data.items.length; i++) {
			if(baplieReconcileStore.data.items[i].data.applyCheck) {
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
		var baplieReconcileStore = me.getStore('baplieReconcileStore');
		var additionalBaplieStore = me.getStore('additionalBaplieStore');
		var oldBaplieStore = me.getStore('oldBaplieStore');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		for(var i = 0; i < baplieReconcileStore.data.items.length; i++) {
			var dirtyFlag = false;

			if(additionalBaplieStore.data.items[i].dirty == true) {
				baplieReconcileStore.data.items[i].data.addBaplieItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;				
			}

			if(oldBaplieStore.data.items[i].dirty == true) {
				baplieReconcileStore.data.items[i].data.baplieItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(dirtyFlag) {
				me.buildDataItem(baplieReconcileStore.data.items[i]);
				arrItems.push(baplieReconcileStore.data.items[i].data);
			}
		}

		if(arrItems.length > 0) {
			updateParm.getProxy().url = baplieReconcileStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					baplieReconcileStore.commitChanges();
					additionalBaplieStore.commitChanges();
					oldBaplieStore.commitChanges();
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
		var addBaplieGrid = refs.refAddtionalBaplieGrid;
		var oldBaplieGrid = refs.refOldBaplieGrid;
		var addBaplieData = addBaplieGrid.getSelection()[0];
		var oldBaplieData = oldBaplieGrid.getSelection()[0];
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
		
		} else { // CREATE
			
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theAddBaplieDetail:addBaplieData});
		me.getViewModel().setData({theOldBaplieDetail:oldBaplieData});
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
		var addBaplieGrid = refs.refAddtionalBaplieGrid;
		var oldBaplieGrid = refs.refOldBaplieGrid;
		
		if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_AdditionalBaplieNEW')) {
			if(addBaplieGrid.getSelection()[0].data.cntrNo == null) {
				obj.allowBlank = true;
			}
			
		}else if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_BaplieDischargingThruList')){
			if(oldBaplieGrid.getSelection()[0].data.cntrNo == null) {
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

		if(obj.getReference() == 'ctlAddBaplieSztp') {
			refs.ctlAddBaplieSztp2.setValue(sztp2);
		}else {
			refs.ctlOldBaplieSztp2.setValue(sztp2);
		}
	},
});