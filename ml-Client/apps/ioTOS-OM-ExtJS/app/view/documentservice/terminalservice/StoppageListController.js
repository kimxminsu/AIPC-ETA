Ext.define('IoTosOmExt.view.documentservice.terminalservice.StoppageListController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	alias : 'controller.stoppageList',

/**
 * =========================================================================================================================
 * CONSTANT START
 */
    MAIN_GRID_REF_NAME: 'refStoppageListGrid',		// Main Grid Name   (Stoppage Grid)
    MAIN_STORE_NAME: 'stoppageListStore',			// Main Store Name  (Stoppage Grid)
/**
 * CONSTANT END
 * =========================================================================================================================
 */
    onLoad : function(){
        let me = this;
        let refs = me.getReferences();
        let searchParm = Ext.create("IoTosOmExt.model.documentservice.terminalservice.SearchStoppage");
		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });
        me.onSearch();
    },

    onSearch : function(){
        let me = this;
        let stoppageStore = me.getStore(me.MAIN_STORE_NAME);
        let params =  me.getSearchCondition();
        stoppageStore.load({
            params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
        })
    },

    getSearchCondition: function () {
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

	clickStoppageList : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
		let me = this;
		me.getViewModel().setData({ gridSelectedRecord: record.data });
	},

	onGridRemove : function(isDetailClose) {
		let me = this;
		let grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		let selections = grid.getSelection() == null ? null: grid.getSelection();
		let deleteItems = new Array();
						
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
});