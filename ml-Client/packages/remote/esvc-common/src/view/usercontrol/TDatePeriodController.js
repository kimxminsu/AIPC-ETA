Ext.define('ESVC.view.usercontrol.TDatePeriodController', {
	extend: 'ESVC.view.foundation.BaseViewController',
    alias: 'controller.tdateperiod',
    requires: [],
    
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function() {
		var me = this;
		var view = me.getView();

		if (view.labelWidth > 0) {
			me.lookupReference('ctlLabel').margin = '0 5 0 0';
		}
    },
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

     /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
    onDateChange: function(control) {
		var me = this;
		var view = me.getView();

		view.fireEvent('afterChangeEvent', view);
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	 /**
	 * =========================================================================================================================
	 * METHOD START
	 */
	getDateCondition:function() {
		var me = this;

        return me.checkFromToDate("ctlFromDate", "ctlToDate");
	},
	/**
	 * =========================================================================================================================
	 * METHOD END
	 */
});