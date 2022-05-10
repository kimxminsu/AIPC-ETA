Ext.define('IoTosOmExt.view.import.manifestbapliereconcile.ManifestBaplieReconcileController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],

	alias : 'controller.manifestbapliereconcile',	
	
	scrollGrid : null,

   onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('IoTosOmExt.model.import.manifestbapliereconcile.SearchManifestBaplieReconcile');
		
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
		var manifestGridScroll = refs.refManifestGrid.getScrollable();
		var baplieGridScroll = refs.refBaplieGrid.getScrollable();

		statusGridScroll.on({
			scroll : 'onManifestBaplieReconcileGridScroll',
			scrollend : 'onManifestBaplieReconcileGridScrollEnd',
			scope : me,
		});
		
      manifestGridScroll.on({
			scroll : 'onManifestBaplieReconcileGridScroll',
			scrollend : 'onManifestBaplieReconcileGridScrollEnd',
			scope : me,
		});

		baplieGridScroll.on({
			scroll : 'onManifestBaplieReconcileGridScroll',
			scrollend : 'onManifestBaplieReconcileGridScrollEnd',
			scope : me,
		});
	},

	onManifestBaplieReconcileGridScroll : function(obj, x, y, deltaX, deltaY, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGridScroll = refs.refStatusGrid.getScrollable();
		var manifestGridScroll = refs.refManifestGrid.getScrollable();
		var baplieGridScroll = refs.refBaplieGrid.getScrollable();

		if(obj.component.grid.reference == 'refStatusGrid'){
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				manifestGridScroll.scrollTo(null,y);
				baplieGridScroll.scrollTo(null,y);
			}

		}else if(obj.component.grid.reference == 'refManifestGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				baplieGridScroll.scrollTo(x,y);
			}

		}else if(obj.component.grid.reference == 'refBaplieGrid') {
			if(me.scrollGrid == null || me.scrollGrid == obj) {
				me.scrollGrid = obj;
				statusGridScroll.scrollTo(null,y);
				manifestGridScroll.scrollTo(x,y);
			}
		}
	},

	onManifestBaplieReconcileGridScrollEnd : function(obj, x, y, deltaX, deltaY, eOpts) { 
		var me = this;
		var refs = me.getReferences();

		if(me.scrollGrid == obj){
			me.scrollGrid = null;
		}
	},

   onSearch : function(control) {
		var me = this;
		var refs = me.getReferences();
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var statusStore = me.getStore('statusStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}

		manifestBaplieReconcileStore.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					manifestStore.removeAll();
					baplieStore.removeAll();
					
					if (records && records.length <= 0) {
						refs.refStatusGrid.getStore().removeAll();
						MessageUtil.noMatchData();
					}else {
						for(var i = 0; i < records.length; i++) {
							manifestStore.add(records[i].data.manifestItem);
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
		var polCodeStore = me.getStore('polCodeStore');
		var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
		var deliveryCodeStore = me.getStore('deliveryCodeStore');
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

		deliveryCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.DELIVERY_FOR_IMPORT
			}
		});

		sztpCodeStore.load();
	},

	onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'bapliePackingGroupStore') {
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
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var pageNo = manifestBaplieReconcileStore.currentPage;
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
		params['isAllowedUpdateInventory'] = true;
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
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var columnsStore = me.getStore('columnsStore');
		var manifestValue;
		var baplieValue;

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var column = columnsStore.data.items[i];
			
			if(column.data.code == view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
				manifestValue = manifestBaplieReconcileStore.data.items[rowIndex].data.manifestItem[column.data.code]
				baplieValue = manifestBaplieReconcileStore.data.items[rowIndex].data.baplieItem[column.data.code]
				
				break;
			}
		}
		
		if(manifestValue != baplieValue) {
			metaData.style = 'color : red';
		}

		if(view.headerCt.getHeaderAtIndex(collIndex).dataIndex == 'choldChk') {
			value = LocalCacheServiceUtil.getLocalCacheItemsForCodeName('Hold Status',value);
		}
		
      return value;
	},
	
	onSettingColumnsList : function() {
		var me = this;
		var refs = me.getReferences();
		var columnsStore = me.getStore('columnsStore');
		var manifestGrid = refs.refManifestGrid;
		var baplieGrid = refs.refBaplieGrid;
		var dataArray = new Array();

		for(var i = 0; i < manifestGrid.getColumns().length; i++) {
			var manifestGridColumn = manifestGrid.getColumns()[i];

			for(var j = 0; j < baplieGrid.getColumns().length; j++) {
				var baplieGridColumn = baplieGrid.getColumns()[j];

				if(manifestGridColumn.dataIndex != '' && manifestGridColumn.dataIndex != null && manifestGridColumn.dataIndex == baplieGridColumn.dataIndex
					&& manifestGridColumn.dataIndex != 'cntrNo'
				) {
					dataArray.push({
						code : manifestGridColumn.dataIndex,
						name : manifestGridColumn.text.trim()
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

	onSettingCompareItems : function() {
		var me = this;
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');
		var columnsStore = me.getStore('columnsStore');
		var compareItemsBackUpStore = me.getStore('compareItemsBackUpStore');

		for(var i = 0; i < columnsStore.data.items.length; i++) {
			var columns = columnsStore.data.items[i];
			var equalCount = 0;
			var differentCount = 0;
			
			for(var j = 0; j < manifestBaplieReconcileStore.data.items.length; j++) {
				var manifestData = manifestStore.data.items[j].data[columns.data.code];
				var baplieData = baplieStore.data.items[j].data[columns.data.code];

				if(manifestData == baplieData) {
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
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');
		var columnsStore = me.getStore('columnsStore');

		for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
			manifestBaplieReconcileStore.data.items[i].set('matched', true);

			for(var j = 0; j < columnsStore.data.items.length; j++) {
				var columns = columnsStore.data.items[j];
				var manifestData = manifestStore.data.items[i].data[columns.data.code];
				var baplieData = baplieStore.data.items[i].data[columns.data.code];
				
				if(manifestData != baplieData) {
					manifestBaplieReconcileStore.data.items[i].set('matched', false);
				}
			}
		}
		manifestBaplieReconcileStore.commitChanges();
	},

	onRefreshStores : function() {
		var me = this;
		var refs = me.getReferences();
		var manifestGrid = refs.refManifestGrid;
		var baplieGrid = refs.refBaplieGrid;
	
		manifestGrid.getView().refresh();
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

	onManifestBaplieReconcileGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = refs.refStatusGrid;
		var manifestGrid = refs.refManifestGrid;
		var baplieGrid = refs.refBaplieGrid;
	
		statusGrid.getSelectionModel().select(rowIndex);
		manifestGrid.getSelectionModel().select(rowIndex);
		baplieGrid.getSelectionModel().select(rowIndex);
	},

	onDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var manifestBaplieReconcileRecord = manifestBaplieReconcileStore.getAt(rowIndex);

		if (record == null)
			return;
		
		me.openDetailPopup(manifestBaplieReconcileRecord);
	},

	onChangeCompareMode : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		me.onSearch();
	},

	onChangeRowShowHide : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var statusStore = me.getStore('statusStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');

		statusStore.clearFilter();
		manifestStore.clearFilter();
		baplieStore.clearFilter();

		me.onRowShowHideFilter([statusStore, manifestStore, baplieStore], newValue.rowShowHide);
	},

	onRowShowHideFilter : function(storeArray, option) {
		var me = this;
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');

		if(option == CodeConstantsOM.commonCode.MATCHED) {
			for(var i = 0 ; i < storeArray.length; i++){
				storeArray[i].filterBy(function(record){
					var index = record.store.findExact('id', record.id);
					if(manifestBaplieReconcileStore.getAt(index) && manifestBaplieReconcileStore.getAt(index).data.matched) {
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
					if(manifestBaplieReconcileStore.getAt(index) && manifestBaplieReconcileStore.getAt(index).data.matched) {
						return false;
					}else {
						return true;
					}
				});
			}
		}
		else if(option == CodeConstantsOM.commonCode.WEIGHT_TOLERANCE){
			var indexArray = new Array();

			for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
				var manifestWeight = manifestStore.data.items[i].data.wgt;
				var baplieWeight = baplieStore.data.items[i].data.wgt;
				
				if((manifestWeight == null && baplieWeight == null) || (manifestWeight != baplieWeight)) {
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
      
      me.getReferences().refManifestGrid.getView().refresh();
      me.getReferences().refBaplieGrid.getView().refresh();
	},

	onReconcileUpdateStatus : function() {
		var me = this;
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var reconcileStore = me.getStore('reconcileStore');

		reconcileStore.removeAll();

		var rsrvTypeArray = ['D'];

		for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
			if(manifestBaplieReconcileStore.data.items[i].data.applyCheck && 
				manifestBaplieReconcileStore.data.items[i].data.status == CodeConstantsOM.containerState.RESERVED
				) {
					reconcileStore.add(manifestBaplieReconcileStore.data.items[i]);
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

	onCreateManifestBaplie : function(obj) {
		var me = this;
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var createStore;

		if(obj.getValue() == 'manifest'){
			createStore = me.getStore('createManifestStore');
		}else {
			createStore = me.getStore('createBaplieStore');
		}
		
		createStore.removeAll();

		for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
			if(manifestBaplieReconcileStore.data.items[i].data.applyCheck) {
				if(obj.getValue() == 'manifest'){
					if(manifestBaplieReconcileStore.data.items[i].data.baplieItem.soNo != null) {
						createStore.add(manifestBaplieReconcileStore.data.items[i]);
					}
				}else {
					manifestBaplieReconcileStore.data.items[i].data.manifestItem.keyFieldName = 'SoNo';
					manifestBaplieReconcileStore.data.items[i].data.manifestItem.rsrvType = 'D';
					createStore.add(manifestBaplieReconcileStore.data.items[i].data.manifestItem);
				}
			}
		}

		if(createStore.data.items.length <= 0) {
			return false;
		}

		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = createStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.dirty = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());

		for(var i = 0; i < createStore.data.items.length; i++) {
			me.buildDataItem(createStore.data.items[i]);
			updateParm.get('items').push(createStore.data.items[i].data);
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

		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var indexArray = new Array();

		var direction = refs.ctlDirectFillDirectionRadioGroup.getValue().direction;
		var directFillFromStore;
		var directFillToStore;

		if(direction == '1') {
			directFillFromStore = me.getStore('manifestStore');
			directFillToStore = me.getStore('baplieStore');
		}else {
			directFillFromStore = me.getStore('baplieStore');
			directFillToStore = me.getStore('manifestStore');
		}

		for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
			if(manifestBaplieReconcileStore.data.items[i].data.applyCheck) {
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
		var manifestBaplieReconcileStore = me.getStore('manifestBaplieReconcileStore');
		var manifestStore = me.getStore('manifestStore');
		var baplieStore = me.getStore('baplieStore');
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		for(var i = 0; i < manifestBaplieReconcileStore.data.items.length; i++) {
			var dirtyFlag = false;

			if(manifestStore.data.items[i].dirty == true) {
				manifestBaplieReconcileStore.data.items[i].data.manifestItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				manifestBaplieReconcileStore.data.items[i].data.keyFieldName = 'SoNo';
				dirtyFlag = true;				
			}

			if(baplieStore.data.items[i].dirty == true) {
				manifestBaplieReconcileStore.data.items[i].data.baplieItem.workingStatus =  WorkingStatus.convertInt(WorkingStatus.UPDATE);
				dirtyFlag = true;
			}

			if(dirtyFlag) {
				me.buildDataItem(manifestBaplieReconcileStore.data.items[i]);
				arrItems.push(manifestBaplieReconcileStore.data.items[i].data);
			}
		}

		if(arrItems.length > 0) {
			updateParm.getProxy().url = manifestBaplieReconcileStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					manifestBaplieReconcileStore.commitChanges();
					manifestStore.commitChanges();
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
		var manifestGrid = refs.refManifestGrid;
		var baplieGrid = refs.refBaplieGrid;
		var manifestData = manifestGrid.getSelection()[0];
		var baplieData = baplieGrid.getSelection()[0];
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
		
		} else { // CREATE
			
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theManifestDetail:manifestData});
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
		var manifestGrid = refs.refManifestGrid;
		var baplieGrid = refs.refBaplieGrid;
		
		if(obj.up('fieldset').title == ViewUtil.getLabel('WRD_CTOM_Manifest')) {
			if(manifestGrid.getSelection()[0].data.cntrNo == null) {
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

		if(obj.getReference() == 'ctlManifestSztp') {
			refs.ctlManifestSztp2.setValue(sztp2);
		}else {
			refs.ctlBaplieSztp2.setValue(sztp2);
		}
	},
});