Ext.define('IoTosOmExt.view.operation.customsholdlist.CustomsHoldListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.customsholdlist',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCustomsHoldListGrid',		// Main Grid Name 
	MAIN_GRID_EDITOR_NAME : 'customsHoldListGridEditor',	// MAIN Grid Editor Name
	MAIN_STORE_NAME: 'customsHoldListStore',				// Main Store Name
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
	onCustomsHoldListGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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
		params['holdType'] = CodeConstantsOM.holdType.CUSTOM_HOLD;
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
		var holdChkCodeStore = me.getStore('holdChkCodeStore');
		var sztpCodeStore = me.getStore('sztpCodeStore');

		holdChkCodeStore.load({
			params : {
				itemKey : PopupServiceConstants.MasterCode.HOLD_CHECK
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

	setDetailInitialize : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData) {
			me.setUpdateModeControl();
		}else {
			recvData = Ext.create(me.DEFAULT_MODEL);
			detailView.items.get(0).recvData = recvData;
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
				if(detailItem.dirty) {
					me.saveProcess();
				}
			}else {
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

		if(detailItem == null) {
			return;
		}

		if(detailItem.data.holdChk == 'Y') {
			detailItem.set('checkHoldChk', true);
		}else if(detailItem.data.holdChk == 'N') {
			detailItem.set('checkHoldChk', false);
		}else {
			detailItem.set('checkHoldChk', null);
		}

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.convertInt(isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE));
		updateParm.set('item', me.buildDataItem(detailItem).data);

		updateParm.save({
			success : function(record) {
				if(isCreated) {
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
					me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, true);
				}
				detailItem.set('updateTime', record.get('updateTime'));
				detailItem.commit();
				me.setUpdateModeControl();
				MessageUtil.saveSuccess();
			}
		});
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});