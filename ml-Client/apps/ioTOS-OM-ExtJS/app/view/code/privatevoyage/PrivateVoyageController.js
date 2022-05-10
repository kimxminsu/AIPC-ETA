Ext.define('IoTosOmExt.view.code.privatevoyage.PrivateVoyageController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.privatevoyage',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refOperatorGrid',		// Main Grid Name 
	MAIN_GRID_EDITOR_NAME : 'operatorGridEditor',	// MAIN Grid Editor Name
	MAIN_STORE_NAME: 'privateVoyageStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.code.privatevoyage.PrivateVoyage',
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
		var searchParm = Ext.create('IoTosOmExt.model.code.privatevoyage.SearchPrivateVoyage');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});
		me.updateViewStyle(me.getView());
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
	onOperatorGridDblclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
      var refs = me.getReferences();
      var operatorGrid = refs.refOperatorGrid;
      var editor = operatorGrid.getPlugin('operatorGridEditor');

		editor.cancelEdit();
	},

	onCancelEdit : function(rowEditing, context) {
      var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	onValidateEdit : function(editor, context) {
		var me = this;

	},

   onEdit : function(editor, context) {
		context.record.data.workingStatus = WorkingStatus.convertInt(context.record.crudState);
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

	onGridSave : function() {
		var me = this;
		me.saveProcess();
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

		selections.forEach(function(record){
			record.data.workingStatus = WorkingStatus.convertInt(WorkingStatus.DELETE);
			record.set('priInVoy', null);
			record.set('priOutVoy', null);
			record.set('priVslCd', null);
		});
	},
	
	// Search Condition
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch', ['ptnrCode']);

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
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	
	// Build Data Item
	buildDataItem : function(detailItem){
		var me = this;
		var refs = me.getReferences();
		
		detailItem.set('staffCd', me.getStaffCd());
		
		return detailItem;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');			
		var arrItems = new Array();

		store.getModifiedRecords().forEach(function(record, index, array){
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