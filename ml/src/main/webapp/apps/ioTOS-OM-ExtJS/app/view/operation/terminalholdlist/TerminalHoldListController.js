Ext.define('IoTosOmExt.view.operation.terminalholdlist.TerminalHoldListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.terminalholdlist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTerminalHoldListGrid',		// Main Grid Name 
	MAIN_GRID_EDITOR_NAME : 'terminalHoldListGridEditor',	// MAIN Grid Editor Name
	MAIN_STORE_NAME: 'terminalHoldListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.operation.hold.Hold',
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
		var searchParm = Ext.create('IoTosOmExt.model.operation.hold.SearchHold');
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
	onTerminalHoldListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		if (record == null)
			return;
		
		me.openDetailPopup(record);
	},

	onColumnRendererFromLocalCache : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var codeName = value;
		var key = null;
		
		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'cntrState' : key = 'Container Status'; break;
			case 'ixCd' : key = 'IX CD'; break;
			case 'rehandleCode' : key = 'Loading confirm'; break;
			case 'cntrLength' : key = 'CNLH'; break;
			case 'holdChk' : key = 'Hold Status'; break;
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

	onColumnRenderer : function(value, metaData, record, rowIndex, collIndex, store, view) {
		var me = this;
		var codeStore;

		switch(view.headerCt.getHeaderAtIndex(collIndex).dataIndex) {
			case 'holdCode' : codeStore = me.getStore('holdCodeStore'); break;
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
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch', ['cntrNos']);

		var params = me.createParam(searchParm);
		var vvdData = refs.ctlVesselSelection.selectionData;
		if(vvdData) {
			params['vslCd'] = vvdData.vesselCode;
			params['callYear'] = vvdData.callYear;
			params['callSeq'] = vvdData.callSeq;
		}
		params['cntrMode'] = me.getCntrHoldMode('cntrMode');
		params['holdMode'] = me.getCntrHoldMode('holdMode');
		params['holdType'] = CodeConstantsOM.holdType.TERMINAL_HOLD;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},

	getCntrHoldMode : function(mode) {
		var me = this;
		var refs = me.getReferences();

		if(mode == 'cntrMode') {
			return refs.ctlCntrModeRadioGroup.getValue().cntrMode;
		}else if(mode == 'holdMode') {
			return refs.ctlHoldModeRadioGroup.getValue().holdMode;
		}else {
			return null;
		}
	},

	onLoadStores : function() {
		var me = this;
		var refs = me.getReferences();
		var holdCodeStore = me.getStore('holdCodeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');

		holdCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.GeneralCode.HOLD_CODE
			}
		});
		sztpCodeStore.load();
	},

	onGridAdd : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var rowIndexKeyList = new Array();

		for(var i = 0; i < store.data.items.length; i++) {
			var record = store.data.items[i];
			if(record.data.applyCheck == true) {
				rowIndexKeyList.push(i);
			}
		}

		for(var i = rowIndexKeyList.length-1; i >= 0; i--) {
			var rowIndexKey = rowIndexKeyList[i];
			var newRecord = store.getAt(rowIndexKey).copy(null);

			if(newRecord) {
				newRecord.set('applyCheck', false);
				newRecord.set('holdCode', '');
				newRecord.set('holdChk', '');
				newRecord.set('chgReason', '');
				newRecord.set('updateTime', null);
				newRecord.set('staffCd', '');
				newRecord.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));

				store.insert(rowIndexKey+1, newRecord);
				store.getAt(rowIndexKey).commit();
			}
		}
	},
	
	onGridSave : function() {
		var me = this;
		me.saveProcess();
	},
	
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
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		me.setUpdateModeControl();
		if(!recvData.phantom) {
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.UPDATE);
		}else {
			recvData.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.INSERT);
		}

		// Update commit
		if(!recvData.phantom) {
			recvData.commit();
		}
		me.getViewModel().setData({theDetail:recvData});
	},

	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();

		refs.ctlCntrNo.setReadOnly(true);
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

		if(detailView) {
			if(infoForm.isValid()) {
				if(me.onCheckBeforeSave()) {
					detailView.forcedClose = true;
					detailView.close();
				};
			}else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(saveLocation){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		store.getModifiedRecords().forEach(function(record) {
			me.buildDataItem(record);
			arrItems.push(record.data);
		});

		if(arrItems.length > 0) {
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = false;
			updateParm.dirty = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', arrItems);

			updateParm.save({
				success : function() {
					store.commitChanges();
					MessageUtil.saveSuccess();
				}
			});
		}
	},

	onDetailRemove : function() {
		var me = this;
		me.onGridRemove(true);
	},

	onCheckBeforeSave : function() {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		if(detailItem.data.checkHoldChk) {
			if(refs.ctlHoldName.getValue()) {
				return true;
			}else {
				var msg1 = TSB.locale.i18n.Bundle.instance.getMsg("MSG_FTCO_00074");
				var msg2 = TSB.locale.i18n.Bundle.instance.getMsg("MSG_CTOM_00024", "Hold Code");
				MessageUtil.show(Ext.Msg.ERROR, 'fail_msg', msg1 + "<br>" + msg2);
				return false;
			}
		}else {
			return true;
		}
	},
	
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});