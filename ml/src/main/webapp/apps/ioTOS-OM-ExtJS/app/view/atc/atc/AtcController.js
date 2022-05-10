Ext.define('IoTosOmExt.view.atc.atc.AtcController', {
	extend : 'ESVC.view.foundation.BaseViewController',
	
	requires : [
	],
	
	alias : 'controller.atc',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAtcJobListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'atcJobListStore',				// Main Store Name
	DEFAULT_MODEL : 'IoTosOmExt.model.atc.atc.Atc',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */		
	
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch : function(btn) {
		var me = this;
		var store = btn.getText() == 'AtcJobList1' ? me.getStore(me.MAIN_STORE_NAME) : me.getStore('atcJobListDataStore');
		
		store.load();
	},

	onClickAtcStartStop : function(btn) {
		var me = this;
		var atcStartStopStore = me.getStore('atcStartStopStore');
		var atcStatusPublish = btn.getText() == 'AtcStart' ? "Y" : "N";

		atcStartStopStore.load({
			params : {
				atcStatusPublish : atcStatusPublish
			},
			callback : function(records, operation, success) {
				if(success) {
					var res = Ext.JSON.decode(operation.getResponse().responseText);
					if(res.response.data[0] == true) {
						btn.setText('AtcStart');
					}else {
						btn.setText('AtcStop');
					}
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