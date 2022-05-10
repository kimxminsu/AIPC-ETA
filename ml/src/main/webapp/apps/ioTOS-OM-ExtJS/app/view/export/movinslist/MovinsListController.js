Ext.define('IoTosOmExt.view.export.movinslist.MovinsListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.movinslist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refMovinsListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'movinsListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.export.movinslist.MovinsList',
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
		var searchParm = Ext.create('IoTosOmExt.model.export.movinslist.SearchMovinsList');
		
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
	onMovinsListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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
			case 'cntrHeightWidth' : codeStore = me.getStore('cntrHeightWidthStore'); break;
			case 'cntrLength' : codeStore = me.getStore('cntrLengthStore'); break;
         case 'cntrType' : codeStore = me.getStore('cntrTypeStore'); break;
         case 'wgtGrp' : codeStore = me.getStore('weightGroupCodeStore'); break;
			case 'cargoType' : codeStore = me.getStore('cargoTypeStore'); break;
			case 'delv' : codeStore = me.getStore('deliveryCodeStore'); break;
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
      var handleInstrCodeStore = me.getStore('handleInstrCodeStore');
      var cntrHeightWidthStore = me.getStore('cntrHeightWidthStore');
		var cntrLengthStore = me.getStore('cntrLengthStore');
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
      
      handleInstrCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.HANDLE_INSTR
			}
      });
      
      cntrHeightWidthStore.load({
			params: {
				itemKey : PopupServiceConstants.ItemKey.CNTR_HEIGHT_WIDTH
			}
		});

		cntrLengthStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.CNTR_LENGTH
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
		var vvdData = refs.ctlVesselSelection.selectionData;
      
		if(recvData){ // UPDATE
			me.setUpdateModeControl();

		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			recvData.set('vslCd', vvdData.vesselCode);
         recvData.set('callYear', vvdData.callYear);
         recvData.set('callSeq', vvdData.callSeq);
			detailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}
      me.getViewModel().setData({theDetail:recvData});
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlShipLocL.setReadOnly(true);
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
		
		if(detailView){			
			if(infoForm.isValid()){
				if(detailItem.dirty){
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
		
		if(detailItem == null){
			return;
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
				me.setUpdateModeControl();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		me.onGridRemove(true);
   },
   
   onPackingGroupStoreLoad : function(store, operation, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var imdg;
		var unno;

		if(store.storeId == 'packingGroupStore') {
			imdg = refs.ctlImdg.getValue();
			unno = refs.ctlUnno.getValue();
		}
		
		operation.setParams({
			itemKey : PopupServiceConstants.ItemKey.VALID_PACKING_GRP,
			args : [imdg, unno]
		});
	 },

	 onPackingGrpComboExpand : function(field, eOpts ) {
		field.getStore().load();
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
	}
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});