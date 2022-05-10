Ext.define('IoTosOmExt.view.operation.bundlecargolist.BundleCargoListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.bundlecargolist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBundleCargoListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'bundleCargoListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.operation.bundlecargolist.BundleCargoList',
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
		var searchParm = Ext.create('IoTosOmExt.model.operation.bundlecargolist.SearchBundleCargoList');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});	
		me.updateViewStyle(me.getView());
		me.onLoadStores();
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
	onBundleCargoListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},

	onSearchChildContainer : function() {
		var me = this;
		var childContainerItem = me.getViewModel().get('theChildContainerDetail');
		
		if(OmCommonMethod.isNullOrEmpty(childContainerItem.data.bundleCntr) == true) {
			return;
		}
		me.doRetrieveChildContainer();
	},

	onContainerListGridDblClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		me.setParentContainer(record);
		me.setUpdateModeControl();
		refs.ctlContainerListWin.close();
	},

	onColumnRendererFromLocalCache : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var codeName = value;
		var key = null;
		
		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrState' : key = 'Container Status'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'cntrLength' : key = 'CNLH'; break;
			case 'cargoType' : key = 'Cargo Type'; break;
			case 'delv' : key = 'delivery type'; break;
			case 'type1' : key = 'PackType'; break;
			case 'type2' : key = 'PackType'; break;
			case 'type3' : key = 'PackType'; break;
			case 'type4' : key = 'PackType'; break;
			case 'type5' : key = 'PackType'; break;
			case 'type6' : key = 'PackType'; break;
			case 'type7' : key = 'PackType'; break;
			case 'type8' : key = 'PackType'; break;
			case 'type9' : key = 'PackType'; break;
			case 'type10' : key = 'PackType'; break;
			case 'packType' : key = 'PackType'; break;
		}
		
		if(key != null) {
			codeName = LocalCacheServiceUtil.getLocalCacheItemsForCodeName(key,value);
			if(codeName == null) {
				codeName = value;
			}
		}
		return codeName;
	},

	onPsztpRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var sztp = record.data.sztp;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', sztp, 0, false, true, true);

		if(record != null) {
			value = record.data.sztpCode;
		}

		return value;
	},

	onPackUnpackChanged : function(obj, newValue, oldValue) {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var childContainerlItem = me.getViewModel().get('theChildContainerDetail');
		
		if(newValue == CodeConstantsOM.bundlePackType.UN_PACKED && detailItem.data.tableName != CodeConstantsOM.tableName.INVENTORY_TABLE_NAME) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00161', [childContainerlItem.data.cntrNo]);
			obj.setValue(null);
			return false;
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
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		
		var params = me.createParam(searchParm);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
		}

		params['departureType'] = me.getDepartureType();
		params['searchPeriodFrom'] = Ext.Date.format(searchParm.data.searchPeriodFrom, 'Y-m-d H:i:s');
		params['searchPeriodTo'] = Ext.Date.format(searchParm.data.searchPeriodTo, 'Y-m-d H:i:s');
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	getDepartureType : function() {
		var me = this;
		var refs = me.getReferences();

		return refs.ctlDepartureTypeRadioGroup.getValue().departureType;
	},

	onLoadStores : function() {
		var me = this;
		var refs = me.getReferences();
		var bundleStatusCodeStore = me.getStore('bundleStatusCodeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');
		var packUnpackCodeStore = me.getStore('packUnpackCodeStore');
		var blockCodeStore = me.getStore('blockCodeStore');
		var areaCodeStore = me.getStore('areaCodeStore');

		bundleStatusCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.BUNDLE_CONTAINER_STATUS
			}
		});
		sztpCodeStore.load();
		packUnpackCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.BUNDLE_PACK_TYPE
			}
		});
		blockCodeStore.load();
		areaCodeStore.load();
	},

	onGridAdd : function() {
		var me = this;
		me.openDetailPopup(null);
	},
	
	onGridSave : function() {
		var me = this;
		me.saveProcess();
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

	setDetailInitialize : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var parentContainerStore = me.getStore('parentContainerStore');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');

		parentContainerStore.removeAll();
		parentContainerStore.commitChanges();
		bundleChildContainerStore.removeAll();
		bundleChildContainerStore.commitChanges();
		
		if(recvData) {
			me.setUpdateModeControl();
			var params = {
				cntrId : recvData.data.cntrId
			}
			me.doRetrieveData(params);
		}else {
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
			me.getViewModel().setData({theDetail:recvData});
		}
		if(!recvData.phantom) {
			recvData.commit();
		}
	},

	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();

		refs.ctlDetailCntrNo.setReadOnly(true);
		refs.ctlDetailParentContainerSearchBtn.setDisabled(true);
		refs.ctlAddChildContainerBtn.setDisabled(false);
	},
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;

		detailItem.set('staffCd', me.getStaffCd());
		return detailItem;
	},

	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var childContainerDetailView = me.lookupReference('app-bundlecargochildcontainerlistdetail');
		var childContainerDetailItem = me.getViewModel().get('theChildContainerDetail');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');
	
		if(childContainerDetailView) {
			var childContainerDetailForm = childContainerDetailView.down('form');
			if(childContainerDetailForm.isValid()) {
				if(childContainerDetailItem.dirty) {
					me.onChildContainerSaveProcess();
				}
			}else {
				MessageUtil.mandatoryFieldInValid();
			}
		}else if(detailView){
			if(me.onSaveMandatoryCheck()) {
				if(detailItem.dirty) {
					me.saveProcess();
				}else if(
					bundleChildContainerStore.getModifiedRecords().length > 0 
					|| bundleChildContainerStore.getRemovedRecords().length > 0
				) {
					me.saveProcess();
				}
			}
		}
	},

	onSaveMandatoryCheck : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');

		if(detailView.down('form').isValid() == false) {
			MessageUtil.mandatoryFieldInValid();
			return false;
		}

		if(OmCommonMethod.isNullOrEmpty(detailItem.data.cntrId) == true) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00174');
			return false;
		}

		if(bundleChildContainerStore.data.items.length == 0) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00594');
			return false;
		}

		return true;
	},

	onChildContainerSaveProcess : function() {
		var me = this;
		var store = me.getStore('bundleChildContainerStore');
		var containerDetailView = me.lookupReference('app-bundlecargochildcontainerlistdetail');
		var containerItem = me.getViewModel().get('theChildContainerDetail');
		var isCreated = containerItem.phantom;
		
		if(isCreated) {
         store.add(containerItem);
		}
		containerDetailView.close();
		containerItem.dirty = true;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');

		if(detailItem == null){
			return;
		}
		detailItem.set('childItems', new Array());
		bundleChildContainerStore.data.items.forEach(function(record){
			if(record.data.workingStatus == WorkingStatus.convertInt(WorkingStatus.UPDATE) || record.data.packType != CodeConstantsOM.bundlePackType.DELETE) {
				me.buildDataItem(record);
				detailItem.get('childItems').push(record.data);
			}
		});
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.convertInt(isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE));
		updateParm.set('item', me.buildDataItem(detailItem).data);
		
		updateParm.save({
			success : function(record){
				if(isCreated){
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
				}
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				bundleChildContainerStore.load({
					params : {
						cntrId : detailItem.data.cntrId
					},
					callback : function(records,operation,success) {
						var childCntrCount = 0;
						records.forEach(function(record){
							if(record.data.packType != CodeConstantsOM.bundlePackType.DELETE) {
								childCntrCount += 1;
							}
						});

						if(childCntrCount == 0) {
							me.doClearData();
						}else {
							me.doRetrieveData({cntrId : detailItem.data.cntrId});
						}
					}
				});
				
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onDetailBundleCargoGridDblClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		me.openViewAliasDetailPopup(record, 'Container Information', 'app-bundlecargochildcontainerlistdetail');
	},

	onChildContainerDetailLoad : function() {
		var me = this;
		var childContainerDetailView = me.lookupReference('app-bundlecargochildcontainerlistdetail');
		var form = childContainerDetailView.down('form');

		form.isValid(); // Mandatory to appear red for.
		me.setChildContainerDetailInitialize();
		me.updateViewStyle(childContainerDetailView);
		childContainerDetailView.forcedClose = true;
	},

	setChildContainerDetailInitialize : function() {
		var me = this;
		var childContainerDetailView = me.lookupReference('app-bundlecargochildcontainerlistdetail');
		var recvData = childContainerDetailView.items.get(0).recvData;
		var detailItem = me.getViewModel().get('theDetail'); 
		
		if(recvData){ // UPDATE
			me.setChildContainerUpdateModeControl();
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
			recvData.set('bundleVslCd', detailItem.data.vslCd);
			recvData.set('bundleCallYear', detailItem.data.callYear);
			recvData.set('bundleCallSeq', detailItem.data.callSeq);
			recvData.set('cntrUid', detailItem.data.cntrUid);
			recvData.set('cntrNo', detailItem.data.cntrNo);
			recvData.set('cntrId', detailItem.data.cntrId);
			recvData.set('sztp', detailItem.data.sztp);
			recvData.set('sztp2', detailItem.data.sztp2);
			recvData.set('packType', CodeConstantsOM.bundlePackType.PACKED);
			recvData.set('cntrSeq', OmCommonMethod.isNullOrEmpty(detailItem.data.cntrSeq) == true ? "0" : detailItem.data.cntrSeq);
			childContainerDetailView.items.get(0).recvData = recvData;
		}

		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theChildContainerDetail:recvData});
	},

	setChildContainerUpdateModeControl : function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlChildContainerDetailCntrNo.setReadOnly(true);
		refs.ctlDetailSearchChildContainer.setDisabled(true);
	},

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
		}
		refs.ctlChildContainerDetailSztp2.setValue(sztp2);
	},

	setParentContainer : function(selectedParentCntrItem) {
		var me = this;
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');
		
		me.getViewModel().set('theDetail', selectedParentCntrItem);
		var detailItem = me.getViewModel().get('theDetail');

		bundleChildContainerStore.load({
			params : {
				cntrId : detailItem.data.cntrId
			},
			callback : function(records, operation, success) {
				if(records != null && records.length > 0) {
					detailItem.set('childItems', records);
				}else {
					detailItem.set('backupItem', null);
				}
			}
		});
	},
	
	onSearchParentContainer : function() {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(OmCommonMethod.isNullOrEmpty(detailItem.data.cntrNo) == true) {
			return;
		}
		var params = {
			cntrNo : detailItem.data.cntrNo
		}
		me.doRetrieveData(params);
	},

	onAddChildContainer : function() {
		var me = this;
		me.openViewAliasDetailPopup(null, 'Container Information', 'app-bundlecargochildcontainerlistdetail');
	},

	doClearData : function() {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var parentContainerStore = me.getStore('parentContainerStore');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');
		
		store.remove(detailItem);
		parentContainerStore.removeAll();
		bundleChildContainerStore.removeAll();
		me.getViewModel().setData({theDetail:Ext.create(me.DEFAULT_MODEL)});
	},
	
	doRetrieveData : function(params) {
		var me = this;
		var refs = me.getReferences();
		var parentContainerStore = me.getStore('parentContainerStore');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');
		var containerListStore = me.getStore('containerListStore');
		
		parentContainerStore.load({
			params : params,
			callback : function(records, operation, success) {
				if(success) {
					if(records != null && records.length > 0) {
						if(records.length == 1) {
							me.getViewModel().setData({theDetail:records[0]});
							bundleChildContainerStore.removeAll();
							bundleChildContainerStore.add(records[0].data.childItems);
							me.setUpdateModeControl();
						}else {
							containerListStore.setData(records);
							var win = refs.ctlContainerListWin;
							if(!win) {
								win = Ext.create('IoTosOmExt.view.common.containerlist.Containerlist',{
									title : ViewUtil.getLabel('WRD_CTOM_ContainerListView'),
									storeNm : 'containerListStore',
									reference : 'ctlContainerListWin'
								}); 
								me.getView().add(win);
							}
							win.show();
							win.toFront();
						}
					}else {
						me.getViewModel().setData({theDetail:Ext.create(me.DEFAULT_MODEL)});
						refs.ctlDetailCntrNo.setReadOnly(false);
						refs.ctlDetailParentContainerSearchBtn.setDisabled(false);
						refs.ctlAddChildContainerBtn.setDisabled(true);
					}
				}
			}
		});
	},

	doRetrieveChildContainer : function() {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var childContainerItem = me.getViewModel().get('theChildContainerDetail');
		var bundleChildContainerStore = me.getStore('bundleChildContainerStore');
		var childContainerStore = me.getStore('childContainerStore');

		if(detailItem.data.cntrNo == childContainerItem.data.bundleCntr) {
			MessageUtil.error('fail_msg', 'MSG_CTOM_00155');
			return;
		}
		
		for(var i = 0; i < bundleChildContainerStore.data.items.length; i++) {
			var record = bundleChildContainerStore.data.items[i];
			if(record.data.bundleCntr == childContainerItem.data.bundleCntr) {
				MessageUtil.error('fail_msg', 'MSG_CTOM_00427', childContainerItem.data.bundleCntr);
				return;
			}
		}

		childContainerStore.load({
			params : {
				vslCd : detailItem.data.vslCd,
				callYear : detailItem.data.callYear,
				callSeq : detailItem.data.callSeq,
				ixCd : detailItem.data.ixCd,
				tableName : detailItem.data.tableName,
				cntrNo : detailItem.data.cntrNo,
				cntrId : detailItem.data.cntrId,
				bundleCntr : childContainerItem.data.bundleCntr
			},
			callback : function(records, operation, success) {
				if(success) {
					if((detailItem.data.tableName == CodeConstantsOM.tableName.RESERVE_TABLE_NAME || detailItem.data.tableName == CodeConstantsOM.tableName.THRU_TABLE_NAME)
						&& records.length > 0
					) {
						var tableInfo = detailItem.data.tableName == CodeConstantsOM.tableName.RESERVE_TABLE_NAME ? "Reservation" : "Through";
						MessageUtil.question('title', 'MSG_CTOM_00398', [records[0].data.cntrNo, tableInfo], 
							function(okCancel){
								me.setChildContainer(okCancel, records[0]);		
							}
						);
					}
				}
			}
		})
	},

	setChildContainer : function(okCancel, bundleCargoItem) {
		var me = this;
		var childContainerItem = me.getViewModel().get('theChildContainerDetail');
		var item;
		var isClearBundleCntr;

		if(okCancel != 'ok' ) {
			item = null;
			isClearBundleCntr = true;
		}else {
			item = bundleCargoItem;
			isClearBundleCntr = false;
		}
		
		if(item == null) {
			if(isClearBundleCntr == true) {
				childContainerItem.set('bundleCntr', "");
			}
			childContainerItem.set('bundleSeq', "");
			childContainerItem.set('wgt', null);
			childContainerItem.set('block', "");
			childContainerItem.set('bay', "");
			childContainerItem.set('roww', "");
			childContainerItem.set('tier', "");
			childContainerItem.set('area', "");
			childContainerItem.set('bundleCntrId', "");
			childContainerItem.set('bundleCntrUid', "");
		}else {
			item.set('bundleCntr', item.data.cntrNo);
			item.set('bundleCntrId', item.data.cntrId);
			item.set('bundleCntrUid', item.data.cntrUid);

			me.setDataWithFilter(item, childContainerItem, 
					['bundleSeq','packType','bundleState','bundleVslCd','bundleCallYear','cntrNo','cntrId','cntrUid','bundleCallSeq','workingStatus']
			);
		}
	},

	setDataWithFilter : function(sourceItem, targetItem, keys) {
		for(sourceItemKey in sourceItem.data) {
			if(Ext.Array.contains(keys, sourceItemKey) == false) {
				targetItem.set(sourceItemKey, sourceItem.data[sourceItemKey]);
			}
		}
	}

	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});