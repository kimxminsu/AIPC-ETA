Ext.define('ESVC.view.usercontrol.DateRangePickerController', {
	extend: 'ESVC.view.foundation.usercontrol.PopupFieldViewController',
	alias: 'controller.daterangepicker',
	requires: [],
	
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onLoad: function() {
		var me = this;
    	var params = {};
    	params['fromDateReference'] = me.getView().drpDefaults.fromDateReference;
    	params['toDateReference'] = me.getView().drpDefaults.toDateReference;
    	me.getView().params = params;
	},

    afterSetCodePopupData: function(xtype, targetControl, returnValue, me, parent) {
    	
        var refs = parent.getReferences();
        
        if (returnValue) {
            refs[me.getView().drpDefaults.fromDateReference].setValue(returnValue.pickerFrom.getValue());
            refs[me.getView().drpDefaults.toDateReference].setValue(returnValue.pickerTo.getValue());
        } 
        else {
            refs[me.getView().drpDefaults.fromDateReference].setValue(new Date());
            refs[me.getView().drpDefaults.toDateReference].setValue(new Date());
        }
    },
   
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

});