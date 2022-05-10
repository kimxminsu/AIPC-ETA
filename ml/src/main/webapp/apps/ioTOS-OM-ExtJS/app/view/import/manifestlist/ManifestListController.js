Ext.define('IoTosOmExt.view.import.manifestlist.ManifestListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.manifestlist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBlListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'blListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.import.manifestlist.ManifestList',
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
		var searchParm = Ext.create('IoTosOmExt.model.import.manifestlist.SearchManifestList');
		
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
		var manifestListStore = me.getStore('manifestListStore');
		manifestListStore.removeAll();

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

	onBlListGridClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
      var refs = me.getReferences();
      var manifestListStore = me.getStore('manifestListStore');
      var vvdData = refs.ctlVesselSelection.selectionData;
     
		manifestListStore.load({
			params : {
				vslCd : vvdData.vesselCode,
				callYear : vvdData.callYear,
				callSeq : vvdData.callSeq,
				soNo : record.data.soNo
			}
		});
	},
	// Grid Row Double
	onBlListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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
		var deleteItems = new Array();
						
		if (selections == null)
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
		delete item.files;
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

		var params = me.createParam(searchParm, ['filteringBlNoSoNoText']);
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

	onVesselSelectionChange : function(control, oldValue, newValue) {
		var me = this;
		var refs = me.getReferences();
		
	},

	onLoadStores : function(control) {
		var me = this;
		var refs = me.getReferences();
		var vvdData = refs.ctlVesselSelection.selectionData;

		var oprCodeStore = me.getStore('oprCodeStore');
		var porCodeStore = me.getStore('porCodeStore');
		var polCodeStore = me.getStore('polCodeStore');
      var vvdPortCodeStore = me.getStore('vvdPortCodeStore');
		var podCodeStore = me.getStore('podCodeStore');
      var fPodCodeStore = me.getStore('fPodCodeStore');
		var fDestCodeStore = me.getStore('fDestCodeStore');
      var deliveryCodeStore = me.getStore('deliveryCodeStore');
		var packageCodeStore = me.getStore('packageCodeStore');
      var shipperConsigneeStore = me.getStore('shipperConsigneeStore');
      var commodityCodeStore = me.getStore('commodityCodeStore');
      var feCodeStore = me.getStore('feCodeStore');
		var lclFclStore = me.getStore('lclFclStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');
		var cntrLengthStore = me.getStore('cntrLengthStore');
		var cntrHeightWidthStore = me.getStore('cntrHeightWidthStore');
		var cntrTypeStore = me.getStore('cntrTypeStore');
		var weightGroupCodeStore = me.getStore('weightGroupCodeStore');
		var forwarderCodeStore = me.getStore('forwarderCodeStore');

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
		deliveryCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.DELIVERY
         }
		});
		packageCodeStore.load({
			params : {
            itemKey : PopupServiceConstants.GeneralCode.PACKAGE
         }
		});
		shipperConsigneeStore.load({
         params : {
            itemKey : PopupServiceConstants.PartnerType.SHIPPER_CONSIGNEE,
            ptnrType : PopupServiceConstants.PartnerType.SHIPPER_CONSIGNEE
         }
		});
		commodityCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.GeneralCode.COMMODITY
         }
		});
		feCodeStore.load({
         params : {
            itemKey : PopupServiceConstants.MasterCode.FE
         }
		});
		lclFclStore.load({
			params : {
            itemKey : PopupServiceConstants.MasterCode.LCL_FCL_CATEGORY
         }
		});
		sztpCodeStore.load();
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
		forwarderCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.PartnerType.FORWARDER
			}
		});
	},
	
	onColumnRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var codeStore;

		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'delv' : codeStore = me.getStore('deliveryCodeStore'); break;
			case 'fe' : codeStore = me.getStore('feCodeStore'); break;
			case 'lclFcl' : codeStore = me.getStore('lclFclStore'); break;
			case 'cntrLength' : codeStore = me.getStore('cntrLengthStore'); break;
			case 'cntrHeightWidth' : codeStore = me.getStore('cntrHeightWidthStore'); break;
			case 'cntrType' : codeStore = me.getStore('cntrTypeStore'); break;
			case 'weightGroup' : codeStore = me.getStore('weightGroupCodeStore'); break;
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

	onContainerDetailLoad : function() {
		var me = this;
		var containerDetailView = me.lookupReference('app-manifestcontainerlistdetail');
		var form = containerDetailView.down('form');

		form.isValid(); // Mandatory to appear red for.
		me.setContainerDetailInitialize();
		me.updateViewStyle(containerDetailView);

		containerDetailView.forcedClose = true;
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var vvdData = refs.ctlVesselSelection.selectionData;
		var manifestListStore = me.getStore('manifestListStore');
		var detailManifestListStore = me.getStore('detailManifestListStore');
		
		detailManifestListStore.removeAll();
		detailManifestListStore.commitChanges();
		if(recvData){ // UPDATE
			me.setUpdateModeControl();
			manifestListStore.getData().items.forEach(function(record) {
				record.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.UPDATE);
				detailManifestListStore.add(record);
			});

		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('vslCd', vvdData.vesselCode);
         recvData.set('callYear', vvdData.callYear);
			recvData.set('callSeq', vvdData.callSeq);
			recvData.set('userVoy', vvdData.userVoyage);

			detailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theDetail:recvData});
	},

	setContainerDetailInitialize : function() {
		var me = this;
		var refs = me.getReferences();
		var containerDetailView = me.lookupReference('app-manifestcontainerlistdetail');
		var recvData = containerDetailView.items.get(0).recvData; 
		var blData = me.getViewModel().get('theDetail');
		
		if(recvData){ // UPDATE
			me.setContainerUpdateModeControl();
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

		} else { // CREATE
			recvData = Ext.create('IoTosOmExt.model.import.manifestlist.ManifestCntr');
			recvData.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
			containerDetailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
		me.getViewModel().setData({theContainerDetail:recvData});
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlMfNo.setReadOnly(true);
	},

	setContainerUpdateModeControl : function() {
		var me = this;
		var refs = me.getReferences();

		refs.ctlContainerDetailCntrNo.setReadOnly(true);
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
		var containerDetailView = me.lookupReference('app-manifestcontainerlistdetail');
		var detailManifestListStore = me.getStore('detailManifestListStore');

		if(containerDetailView) {
			detailView = containerDetailView;
			infoForm = containerDetailView.down('form');
			detailItem = me.getViewModel().get('theContainerDetail');
		}
		
		if(detailView){
			// var infoForm = detailView.down('form');
			
			if(infoForm.isValid()){
				if(detailItem.dirty){
					if(containerDetailView) {
						me.onContainerSaveProcess();
					}else {
						me.saveProcess();
					}
				}else if(
					detailManifestListStore.getModifiedRecords().length > 0 ||
					detailManifestListStore.getRemovedRecords().length > 0
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
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		var manifestListStore = me.getStore('manifestListStore');
		var detailManifestListStore = me.getStore('detailManifestListStore');
		
		if(detailItem == null){
			return;
		}
	
		detailItem.set('manifestCntrItems', new Array());

		detailManifestListStore.getModifiedRecords().forEach(function(record) {
			record.set('soNo', detailItem.data.soNo);
			record.set('vslCd', detailItem.data.vslCd);
			record.set('callYear', detailItem.data.callYear);
			record.set('callSeq', detailItem.data.callSeq);
			me.buildDataItem(record);
			detailItem.get('manifestCntrItems').push(record.data);
		});

		detailManifestListStore.getRemovedRecords().forEach(function(record) {
			me.buildDataItem(record);
			detailItem.get('manifestCntrItems').push(record.data);
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
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}
				
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				detailManifestListStore.commitChanges();
				manifestListStore.setRecords(detailManifestListStore.getData().items);
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onContainerSaveProcess : function() {
		var me = this;
		var store = me.getStore('detailManifestListStore');
		var containerDetailView = me.lookupReference('app-manifestcontainerlistdetail');
		var containerItem = me.getViewModel().get('theContainerDetail');
		var isCreated = containerItem.phantom;
		
		if(isCreated) {
         store.add(containerItem);
		}
		containerDetailView.close();
		containerItem.dirty = true;
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		var containerDetailView = me.lookupReference('app-manifestcontainerlistdetail');

		if(containerDetailView) {
			me.onRemoveContainer(true);
			containerDetailView.close();
		}else {
			me.onGridRemove(true);
		}
	},

	onRemoveContainer : function() {
      var me = this;
      var refs = me.getReferences();
      var detailManifestListGrid = refs.refDetailManifestListGrid;
		var detailManifestListStore = me.getStore('detailManifestListStore');
		var selectedRecords = detailManifestListGrid.getSelection();
		
		selectedRecords.forEach(function(record) {
			record.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		});

		detailManifestListStore.remove(selectedRecords);
   },

	onBlDetailGridDblClick : function(grid, record, element, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		me.openViewAliasDetailPopup(record, 'Container Information', 'app-manifestcontainerlistdetail');
	},
	
	onAddContainer : function() {
		var me = this;
		var refs = me.getReferences();
	
		me.openViewAliasDetailPopup(null, 'Container Information', 'app-manifestcontainerlistdetail');
	},

	onSztpChange : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var sztp2;
		var privateSztp;
		var record = me.getStore('sztpCodeStore').findRecord('sztpIsoCode', newValue, 0, false, true, true);
		
		if(record != null){
			sztp2 = record.data.sztpGroupCode;
		}
		refs.ctlContainerDetailSztp2.setValue(sztp2);
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