Ext.define('IoTosOmExt.view.code.servicelane.ServiceLaneController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.servicelane',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refServiceLaneGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'serviceLaneStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.code.servicelane.ServiceLane',
	DETAIL_GRID_REF_NAME: 'refServiceLanePortGrid',
	DETAIL_STORE_NAME : 'serviceLanePortStore',
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
		var searchParm = Ext.create('IoTosOmExt.model.code.servicelane.SearchServiceLane');

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
	onServiceLaneGridDblclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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

	onAddPortClick : function() {
		var me = this;
		var refs = me.getReferences();

		me.openViewAliasDetailPopup(null, 'Port Detail', 'app-servicelaneportdetail');
	},

	onRemovePortClick : function() {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refServiceLanePortGrid;
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var selections = grid.getSelection() == null? null : grid.getSelection();

		store.remove(selections);
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

	onPortGridRemove : function(isDetailClose) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var portDetailView = me.lookupReference('app-servicelaneportdetail');
		
		if (selections == null)
			return;

		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				store.remove(selections);
				if(portDetailView){
					portDetailView.close();
				}
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
	onLoadStores : function() {
		var me = this;
		var serviceLaneCodeStore = me.getStore('serviceLaneCodeStore');
		var portCodeStore = me.getStore('portCodeStore');

		serviceLaneCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.ItemKey.LANE_CODE
			}
		});
		portCodeStore.load({
			params : {
				args : ['UNLo'],
				itemKey : PopupServiceConstants.ItemKey.PORT_CODE
			}
		});
	},

	// Delete
	deleteProcess : function(selections, isDetailClose) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		var detailView = me.getDetailBizView();
	    
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
						if (detailView) {
							detailView.close();
						}
					}
					var serviceLaneCodeStore = me.getStore('serviceLaneCodeStore');
					serviceLaneCodeStore.load();
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

		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	onServiceLaneCodeChange : function(cmb) {
		var me = this;
		me.onSearch(cmb);
	},

	onPortGridDblclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if (record == null)
			return;
		me.openViewAliasDetailPopup(record, 'Port Detail', 'app-servicelaneportdetail');
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
		var detailView = me.getDetailBizView();
		var form = detailView.down('form');

		form.isValid(); // Mandatory to appear red for.
		
		me.setDetailInitialize();
		
		me.updateViewStyle(detailView);
	},

	onPortDetailLoad : function() {
		var me = this;
		var portDetailView = me.lookupReference('app-servicelaneportdetail');
		var form = portDetailView.down('form');

		form.isValid(); // Mandatory to appear red for.	
		me.setPortDetailInitialize();	
		me.updateViewStyle(portDetailView);
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var serviceLanePortStore = me.getStore('serviceLanePortStore');

		if(recvData){ // UPDATE
			me.setUpdateModeControl();
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}

		me.getViewModel().setData({theDetail:recvData});
		me.getViewModel().setData({thePortDetail:Ext.create(me.DEFAULT_MODEL)});
		
		serviceLanePortStore.load({
			params : {
				laneCd : recvData.data.laneCd
			}
		});
	},

	setPortDetailInitialize : function() {
		var me = this;
		var refs = me.getReferences();
		var portDetailView = me.lookupReference('app-servicelaneportdetail');
		var recvData = portDetailView.items.get(0).recvData;

		if(recvData){ // UPDATE
			// me.setUpdateModeControl();
		} else { // CREATE
			recvData = Ext.create(me.DEFAULT_MODEL);
			portDetailView.items.get(0).recvData = recvData;
		}
		
		// Update commit
		if (!recvData.phantom) {	
			recvData.commit();
		}

		me.getViewModel().setData({thePortDetail:recvData});
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlServiceLaneCd.setReadOnly(true);
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
		var portDetailView = me.lookupReference('app-servicelaneportdetail');
		var infoForm = detailView.down('form');
		var serviceLanePortStore = me.getStore(me.DETAIL_STORE_NAME);

		if(portDetailView) {
			detailView = portDetailView;
			infoForm = portDetailView.down('form');
			detailItem = me.getViewModel().get('thePortDetail');
		}
		
		if(detailView){
			if(infoForm.isValid()){
				if(detailItem.dirty){
					if(portDetailView) {
						me.onPortSaveProcess();
					}else {
						me.saveProcess();
					}
				}else if(me.getViewModel().get('thePortDetail').dirty ||
					serviceLanePortStore.getModifiedRecords().length > 0 ||
					serviceLanePortStore.getRemovedRecords().length > 0
				) {
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},

	onPortSaveProcess : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var portDetailView = me.lookupReference('app-servicelaneportdetail');
		var portDetailItem = me.getViewModel().get('thePortDetail');
		var lastSeq = store.data.items.length;
		var isCreated = portDetailItem.phantom;
		var portDetailCombo = refs.ctlPortDetailCombo;
		
		
		if(isCreated) {
			portDetailItem.set('portSeq', lastSeq + 1);
			portDetailItem.set('callingPortName', portDetailCombo.getSelection().data.name);
			store.insert(lastSeq, portDetailItem);
		}
		
		store.commitChanges();
		portDetailView.close();
		portDetailItem.dirty = true;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var portStore = me.getStore(me.DETAIL_STORE_NAME);
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		
		if(detailItem == null){
			return;
		}
		
		detailItem.set('portItems', new Array());
		for(var i = 0; i < portStore.data.items.length; i++) {
			portStore.data.items[i].set('laneCd', detailItem.get('laneCd'));
			detailItem.get('portItems').push(portStore.data.items[i].data);
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

				portStore.commitChanges();
				
				var serviceLaneCodeStore = me.getStore('serviceLaneCodeStore');
				serviceLaneCodeStore.load();
			}
		});
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		var portDetailView = me.lookupReference('app-servicelaneportdetail');

		if(portDetailView) {
			me.onPortGridRemove(true);
		}else {
			me.onGridRemove(true);
		}
	},

	onPortSeqChange : function(btn) {
      var me = this;
      var refs = me.getReferences();
      var serviceLanePortStore = me.getStore('serviceLanePortStore');
      var portCodeGrid = refs.refServiceLanePortGrid;
		var selectedRecordIndex;
		var selectedRecord;
      var direction = btn.value;

      if(portCodeGrid.getSelection().length <= 0) {
         return false;
      }

      selectedRecord = portCodeGrid.getSelection()[0];
      selectedRecordIndex = serviceLanePortStore.findExact('portSeq', selectedRecord.data.portSeq);
      
      var switchRecord;
      var switchRecordIndex;
      var saveSelectedSeqNum;

      if(direction == 'up') {
         if(selectedRecordIndex == 0) {
            return false;
         }
         switchRecord = serviceLanePortStore.findRecord('portSeq', String(Number(selectedRecord.data.portSeq) -1));
         switchRecordIndex = serviceLanePortStore.findExact('portSeq', String(Number(selectedRecord.data.portSeq) -1));
      
      }else if(direction == 'down') {
         if(selectedRecordIndex == serviceLanePortStore.data.items.length -1) {
            return false;
         }
         switchRecord = serviceLanePortStore.findRecord('portSeq', String(Number(selectedRecord.data.portSeq) +1));
         switchRecordIndex = serviceLanePortStore.findExact('portSeq', String(Number(selectedRecord.data.portSeq) +1));
      }
      saveSelectedSeqNum = selectedRecord.data.portSeq;
		selectedRecord.set('portSeq', switchRecord.data.portSeq);
      switchRecord.set('portSeq', saveSelectedSeqNum);

		serviceLanePortStore.sort('portSeq', 'ASC');
      portCodeGrid.selModel.select(selectedRecord);
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});