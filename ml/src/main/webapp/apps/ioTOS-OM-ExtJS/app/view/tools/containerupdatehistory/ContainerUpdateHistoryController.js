Ext.define('IoTosOmExt.view.tools.containerupdatehistory.ContainerUpdateHistoryController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.containerupdatehistory',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refContainerUpdateHistoryGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'containerUpdateHistoryStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.tools.containerupdatehistory.ContainerUpdateHistory',
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
		var searchParm = Ext.create('IoTosOmExt.model.tools.containerupdatehistory.SearchContainerUpdateHistory');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch : searchParm});	
		me.updateViewStyle(me.getView());
		me.onInitialize();
	},

	onInitialize : function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlChkBoxAll.setValue(true);
		refs.ctlChkBoxVvd.setValue(true);
		refs.ctlChkBoxCancel.setValue(true);
		refs.ctlChkBoxReturn.setValue(true);
		refs.ctlChkBoxPod.setValue(true);
		refs.ctlChkBoxOperator.setValue(true);
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

		if (params == null || params == false) {
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

	onAllChkBoxChanged : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if(newValue == true) {
			refs.ctlChkBoxVvd.setValue(true);
			refs.ctlChkBoxVvd.setDisabled(true);

			refs.ctlChkBoxCancel.setValue(true);
			refs.ctlChkBoxCancel.setDisabled(true);

			refs.ctlChkBoxReturn.setValue(true);
			refs.ctlChkBoxReturn.setDisabled(true);

			refs.ctlChkBoxPod.setValue(true);
			refs.ctlChkBoxPod.setDisabled(true);

			refs.ctlChkBoxOperator.setValue(true);
			refs.ctlChkBoxOperator.setDisabled(true);
		}else {
			refs.ctlChkBoxVvd.setValue(false);
			refs.ctlChkBoxVvd.setDisabled(false);

			refs.ctlChkBoxCancel.setValue(false);
			refs.ctlChkBoxCancel.setDisabled(false);

			refs.ctlChkBoxReturn.setValue(false);
			refs.ctlChkBoxReturn.setDisabled(false);

			refs.ctlChkBoxPod.setValue(false);
			refs.ctlChkBoxPod.setDisabled(false);

			refs.ctlChkBoxOperator.setValue(false);
			refs.ctlChkBoxOperator.setDisabled(false);
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
		var searchParm = me.getViewModel().get('theSearch',['isAll', 'isVVD', 'isCancel', 'isReturn', 'isPOD', 'isOperator', 'cntrNo', 'cntrId']);
		
		var params = me.createParam(searchParm);
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

	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});