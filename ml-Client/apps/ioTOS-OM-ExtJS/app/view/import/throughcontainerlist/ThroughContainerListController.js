Ext.define('IoTosOmExt.view.import.throughcontainerlist.ThroughContainerListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.throughcontainerlist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   MAIN_GRID_REF_NAME: 'refThroughContainerListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'throughContainerListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.import.throughcontainerlist.ThroughContainerList',
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
		var searchParm = Ext.create('IoTosOmExt.model.import.throughcontainerlist.SearchThroughContainerList');
		
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
	onThroughContainerListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},
	
	// Add
	onGridAdd : function() {
		var me = this;
		var refs = me.getReferences();

		me.openDetailPopup(null);
	},
	
	// Remove
	onGridRemove : function(isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
						
		if (selections == null || selections.length == 0)
			return;

		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(selections, isDetailClose);
			} else if (button === 'ok') {
				MessageUtil.error('fail_msg', MessageConstants.FAIL_DELETE_ITEMS , null);
			}
		});
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Delete
	deleteProcess : function(selections, isDetailClose) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());

		selections.forEach(function (item) {
			updateParm.get('items').push(item.data);
		});

		updateParm.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				store.commitChanges();

				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						detailView.close();
					}
				}
			}
		});
	},
	
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
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onLoadStores : function(control) {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;

		var feCodeStore = me.getStore('feCodeStore');
		var oprCodeStore = me.getStore('oprCodeStore');
		var porCodeStore = me.getStore('porCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
      var vvdPortCodeStore = me.getStore('vvdPortCodeStore');
      var fPodCodeStore = me.getStore('fPodCodeStore');
      var fDestCodeStore = me.getStore('fDestCodeStore');
		var cargoTypeStore = me.getStore('cargoTypeStore');
      var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var shiftingTimeStore = me.getStore('shiftingTimeStore');	
		var cntrLengthStore = me.getStore('cntrLengthStore');
		var cntrHeightWidthStore = me.getStore('cntrHeightWidthStore');
		var cntrTypeStore = me.getStore('cntrTypeStore');
		var weightGroupCodeStore = me.getStore('weightGroupCodeStore');
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
		deliveryCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.DELIVERY_THROUGH
			}
		});
		shiftingTimeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.RESTOW_TYPE
			}
		});
		cntrLengthStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CNTR_LENGTH
			}
		});
		cntrHeightWidthStore.load({
			params: {
				itemKey : PopupServiceConstants.ItemKey.CNTR_HEIGHT_WIDTH
			}
		});
		cntrTypeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CNTR_TYPE
			}
		});
		weightGroupCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.WEIGHT_GROUP_TYPE
			}
		});
		sztpCodeStore.load();
	},

   onPsztpRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var sztp = record.data.sztp; 
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', sztp, 0, false, true, true);
		
		if(record != null){
			value = record.data.sztpCode;
		}

		return value;
	},
   
	onColumnRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var codeStore;

		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrLength' : codeStore = me.getStore('cntrLengthStore'); break;
			case 'cntrHeightWidth' : codeStore = me.getStore('cntrHeightWidthStore'); break;
			case 'cntrType' : codeStore = me.getStore('cntrTypeStore'); break;
			case 'wgtGrp' : codeStore = me.getStore('weightGroupCodeStore'); break;
			case 'cargoType' : codeStore = me.getStore('cargoTypeStore'); break;
			case 'delv' : codeStore = me.getStore('deliveryCodeStore'); break;
			case 'shiftTime' : codeStore = me.getStore('shiftingTimeStore'); break;
		}

		if(codeStore != null) {
			codeStore.data.items.forEach(function(record){
				if(record.data.code == value) {
					value = record.data.name;
				}
			});
		}
		return value;
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

	onHazardousInformationLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var imdgDetailView = me.lookupReference('app-hazardousinformation');

		var form = imdgDetailView.down('form');
		form.isValid(); // Mandatory to appear red for.
		me.setImdgDetailInitialize();	
		me.updateViewStyle(imdgDetailView);

		imdgDetailView.forcedClose = true;;
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var hazardInfoStore = me.getStore('hazardInfoStore');
		var vvdData = refs.ctlVesselSelection.selectionData;
		
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
			hazardInfoStore.load({
            params : {
               cntrId : recvData.data.cntrId,
               parentTableName : recvData.data.tableName
            },
         });
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('vslCd', vvdData.vesselCode);
         recvData.set('callYear', vvdData.callYear);
			recvData.set('callSeq', vvdData.callSeq);
			recvData.set('userVoy', vvdData.userVoyage);
			recvData.set('inLane', vvdData.inLane);
			detailView.items.get(0).recvData = recvData;
			hazardInfoStore.removeAll();
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theDetail:recvData});
	},

	setImdgDetailInitialize : function() {
		var me = this;
		var refs = me.getReferences();
		var imdgDetailView = me.lookupReference('app-hazardousinformation');
		var recvData = imdgDetailView.items.get(0).recvData;
		
		if(recvData){ // UPDATE
			me.setImdgUpdateModeControl();
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			
		} else { // CREATE
			recvData = Ext.create('IoTosOmExt.model.common.hazardousinformation.HazardousInformation');
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
			imdgDetailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theHazardousInfo:recvData});
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlCntrNo.setReadOnly(true);
	},

	setImdgUpdateModeControl : function() {
		var me = this;
		var refs = me.getReferences();
		refs.ctlHazardousInformationImdg.setReadOnly(true);
		refs.ctlHazardousInformationUnno.setReadOnly(true);
		refs.ctlHazardousInformationPackingGrp.setReadOnly(true);
		refs.ctlHazardousInformationImdgInfoBtn.setDisabled(true);
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
		var detailItem = me.getViewModel().get('theDetail');
		var infoForm = detailView.down('form');
		var imdgDetailView = me.lookupReference('app-hazardousinformation');
		var hazardInfoStore = me.getStore('hazardInfoStore');

		if(imdgDetailView) {
			detailView = imdgDetailView;
			infoForm = imdgDetailView.down('form');
			detailItem = me.getViewModel().get('theHazardousInfo');
		}
		
		if(detailView){
			if(infoForm.isValid()){
				if(detailItem.dirty){
					if(imdgDetailView) {
						me.onImdgSaveProcess();
					}else {
						me.saveProcess();
					}
				}else if(
						hazardInfoStore.getModifiedRecords().length > 0 ||
						hazardInfoStore.getRemovedRecords().length > 0
				){
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		var hazardInfoStore = me.getStore('hazardInfoStore');
		
		if(detailItem == null){
			return;
		}

		detailItem.set('hazardousInformationItems', new Array());
		
		for(var i = 0; i < hazardInfoStore.data.items.length; i++) {
			var record = hazardInfoStore.data.items[i];
			record.set('dgSeq', null);
			record.set('cntrNo', detailItem.data.cntrNo);
			record.set('sztp', detailItem.data.sztp);
			if(OmCommonMethod.isNullOrEmpty(detailItem.data.tableName) == false) {
				record.set('parentTableName', detailItem.data.tableName);
			}else {
				record.set('parentTableName', CodeConstantsOM.tableName.THRU_TABLE_NAME);
			}
			record.set('cntrId', detailItem.data.cntrId);
			me.buildDataItem(record);
			detailItem.get('hazardousInformationItems').push(record.data);
		}

		for(var i = 0; i < hazardInfoStore.getRemovedRecords().length; i++) {
			var record = hazardInfoStore.getRemovedRecords()[i];
			record.set('dgSeq', null);
			record.set('cntrNo', detailItem.data.cntrNo);
			record.set('sztp', detailItem.data.sztp);
			if(OmCommonMethod.isNullOrEmpty(detailItem.data.tableName) == false) {
				record.set('parentTableName', detailItem.data.tableName);
			}else {
				record.set('parentTableName', CodeConstantsOM.tableName.THRU_TABLE_NAME);
			}
			record.set('cntrId', detailItem.data.cntrId);
			me.buildDataItem(record);
			detailItem.get('hazardousInformationItems').push(record.data);
		}

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.convertInt(isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE));
		updateParm.set('item', me.buildDataItem(detailItem).data);
		
		updateParm.save({
			success : function(record){
				if(isCreated){
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}
				
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				hazardInfoStore.commitChanges();
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onImdgSaveProcess : function() {
		var me = this;
		var store = me.getStore('hazardInfoStore');
		var imdgDetailView = me.lookupReference('app-hazardousinformation');
		var hazardousInfoItem = me.getViewModel().get('theHazardousInfo');
		var isCreated = hazardousInfoItem.phantom;
		
		if(isCreated) {
         store.add(hazardousInfoItem);
		}
		imdgDetailView.close();
		hazardousInfoItem.dirty = true;
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		var hazardousInformationView = me.lookupReference('app-hazardousinformation');

		if(hazardousInformationView) {
			me.onRemoveDgInfo(true);
			hazardousInformationView.close();
		}else {
			me.onGridRemove(true);
		}
	},

	onDgInformationGridDblClick : function(grid, record, element, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if (record == null)
			return;
		me.openViewAliasDetailPopup(record, 'Dangerous Information', 'app-hazardousinformation');
	},
	
	onAddDgInfo : function() {
		var me = this;
		var refs = me.getReferences();
	
		me.openViewAliasDetailPopup(null, 'Dangerous Information', 'app-hazardousinformation');
	},

	onRemoveDgInfo : function() {
      var me = this;
      var refs = me.getReferences();
      var dgInfoGrid = refs.refDgInformationGrid;
		var hazardInfoStore = me.getStore('hazardInfoStore');
		var selectedRecords = dgInfoGrid.getSelection();
		
		selectedRecords.forEach(function(record){
			record.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.DELETE);
		});

		hazardInfoStore.remove(selectedRecords);
   },

	onSearchImdgInfo : function() {
      var me = this;
      var refs = me.getReferences();
		var hazardDetailInfoStore = me.getStore('hazardDetailInfoStore');
		
		if(OmCommonMethod.isNullOrEmpty(refs.ctlHazardousInformationImdg.getValue())
         || OmCommonMethod.isNullOrEmpty(refs.ctlHazardousInformationUnno.getValue())
      ) {
         return;
      }

      hazardDetailInfoStore.load({
         params : {
            imdg : refs.ctlHazardousInformationImdg.getValue(),
            unno : refs.ctlHazardousInformationUnno.getValue()
         },
         callback : function(records) {
				if(records.length > 0) {
					me.getViewModel().get('theHazardousInfo').set('properShipNm', records[0].data.properShipNm);
					me.getViewModel().get('theHazardousInfo').set('ems', records[0].data.ems); 
					me.getViewModel().get('theHazardousInfo').set('unid', records[0].data.unid);
					me.getViewModel().get('theHazardousInfo').set('flashPoint', records[0].data.flashPoint);
					me.getViewModel().get('theHazardousInfo').set('packingGrp', records[0].data.packingGrp);
					me.getViewModel().get('theHazardousInfo').set('extendClass', records[0].data.extendClass);
					me.getViewModel().get('theHazardousInfo').set('subsidiaryRisk', records[0].data.subsidiaryRisk);
					me.getViewModel().get('theHazardousInfo').set('wgt', records[0].data.wgt);
					me.getViewModel().get('theHazardousInfo').set('marinePollut', records[0].data.marinePollut);
					me.getViewModel().get('theHazardousInfo').set('vslCd', me.getViewModel().get('theDetail').data.vslCd);
					me.getViewModel().get('theHazardousInfo').set('callYear', me.getViewModel().get('theDetail').data.callYear);
					me.getViewModel().get('theHazardousInfo').set('callSeq', me.getViewModel().get('theDetail').data.callSeq);
				}
         }
      })
	},

	onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'hazardousPackingGroupStore') {
			imdg = refs.ctlHazardousInformationImdg.getValue();
			unno = refs.ctlHazardousInformationUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			args : [imdg, unno]
		});
	 },

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var privateSztp;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
			privateSztp = record.data.sztpCode;
		}
		
		refs.ctlSztp2Detail.setValue(sztp2);
		refs.ctlPrivateSztpDetail.setValue(privateSztp);
	},

	onTempCChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if(newValue == null || newValue == "") {
         refs.ctlTempF.setValue(null);   
      }else {
         refs.ctlTempF.setValue(newValue * 9 / 5 + 32);
      }
	},
	
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});