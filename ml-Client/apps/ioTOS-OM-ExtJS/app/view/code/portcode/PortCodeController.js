Ext.define('IoTosOmExt.view.code.portcode.PortCodeController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.portcode',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPortCodeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'portCodeStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.code.portcode.PortCode',
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
		var searchParm = Ext.create('IoTosOmExt.model.code.portcode.SearchPortCode');
		
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
	onPortCodeGridDblClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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

	onLoadStores : function() {
		var me = this;
		var partnerCodeStore = me.getStore('partnerCodeStore');

		partnerCodeStore.load({
			params : {
				args : [PopupServiceConstants.PartnerType.LINE_OPERATOR],
				itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR,
			}
		});
	},

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
		var searchOption = refs.ctlSearchOption;

		var params = me.createParam(searchParm, ['portType','cntryCodes','oprCodes']);

		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['portType'] = searchOption.getValue().portType;
		
		return params;
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

		if(recvData){ // UPDATE
			if(recvData.data.portType == 'UNLo') {
				recvData.set('portTypeOption', {portTypeOption : 'UNLo'});
			}else {
				recvData.set('portTypeOption', {portTypeOption : 'OPR'})
			}
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
	},
	
	// set Update Mode Control
	setUpdateModeControl : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlPortTypeOption.setDisabled(true);
		refs.ctlCntryCd.setReadOnly(true);
		refs.ctlPortCd.setReadOnly(true);
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
		
		if(detailView){
			var infoForm = detailView.down('form');
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
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		
		if(detailItem == null){
			return;
		}

		if(detailItem.data.portType == null || detailItem.data.portType == 'UNLo') {
			detailItem.set('portType', 'UNLo');
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
	}
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});