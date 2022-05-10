Ext.define('ESVC.view.popup.DateRangePickerPopupController', {
	extend: 'ESVC.view.foundation.BaseViewController',
	alias: 'controller.daterangepickerpopup',
	requires: [],
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onLoad: function(control) {
		var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
        var pickerTo = me.lookupReference("refPickTo");
        
        pickerFrom.setValue(me.getParentView().lookupReference(me.getView().recvData.fromDateReference).getValue());
        pickerTo.setValue(me.getParentView().lookupReference(me.getView().recvData.toDateReference).getValue());

        me.setSubTitle();
        
	},
	
	onOk: function() {
		var me = this;
        var window = me.getView().up('window');
        var returnValue = me.getReturnValue();
        
        if (returnValue !== undefined && returnValue !== null) {
        	window.returnValue = returnValue;
            window.returnValue.pickerFrom = returnValue.pickerFrom;
            window.returnValue.pickerTo = returnValue.pickerTo;

        }
        window.close();

    },
	
	onCancel: function() {
		var me = this;
        var window = me.getView().up('window');

    	window.returnValue = null;
       	window.close();
	},
	
	onSetPresetPeriod: function(btn, click) {
        var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
        var pickerTo = me.lookupReference("refPickTo");

        var fromDate = pickerFrom.getValue();
        var toDate = pickerTo.getValue();
                
        
        if(me.getView().focus == true){
    		me.fromFocusPeriod(btn.getReference(), fromDate);
        }
        else{
        	me.toFocusPeriod(btn.getReference(), toDate);
        }
        //set subTitle
        me.setSubTitle();
	},
	
	onSetRange: function(caller) {
		var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
        var pickerTo = me.lookupReference("refPickTo");
    
        //set focus
        if(caller.getReference() == "refPickFrom" ){	//from focus
        	me.getView().focus = true;
        } else if (caller.getReference() == "refPickTo"){	// to focus
        	me.getView().focus = false;
        }
        
        //set subTitle
        me.setSubTitle();
		
	},
	
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	 /**
	 * =========================================================================================================================
	 * METHOD START
	 */
	
	fromFocusPeriod: function(period, fromDate) {
        var me = this;
        var toDate = null;
        var pickerTo = me.lookupReference("refPickTo");
        
        switch (period) {
        case 'refAWeakOption':
            toDate = new Date(fromDate);       
            toDate.setDate(toDate.getDate() + 7);
            pickerTo.setValue(toDate);       
            break;

        case 'refAMonthOption':
            toDate = new Date(fromDate);       
            toDate.setMonth(toDate.getMonth() + 1);
            pickerTo.setValue(toDate);       
            break;

        case 'refThreeMonthOption':
            toDate = new Date(fromDate);       
            toDate.setMonth(toDate.getMonth() + 3);
            pickerTo.setValue(toDate);       
            break;

        case 'refSixMonthOption':
            toDate = new Date(fromDate);       
            toDate.setMonth(toDate.getMonth() + 6);
            pickerTo.setValue(toDate);       
            break;

        case 'refAYearOption':
            toDate = new Date(fromDate);       
            toDate.setFullYear(toDate.getFullYear() + 1);
            pickerTo.setValue(toDate);       
            break;

        default:
            return;
        }
	},
	
	toFocusPeriod: function(period, toDate) {
        var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
            
        switch (period) {
        case 'refAWeakOption':
            fromDate = new Date(toDate);       
            fromDate.setDate(fromDate.getDate() - 7);
            pickerFrom.setValue(fromDate);       
            break;

        case 'refAMonthOption':
            fromDate = new Date(toDate);       
            fromDate.setMonth(fromDate.getMonth() - 1);
            pickerFrom.setValue(fromDate);       
            break;

        case 'refThreeMonthOption':
            fromDate = new Date(toDate);       
            fromDate.setMonth(fromDate.getMonth() - 3);
            pickerFrom.setValue(fromDate);       
            break;

        case 'refSixMonthOption':
            fromDate = new Date(toDate);       
            fromDate.setMonth(fromDate.getMonth() - 6);
            pickerFrom.setValue(fromDate);       
            break;

        case 'refAYearOption':
            fromDate = new Date(toDate);       
            fromDate.setFullYear(fromDate.getFullYear() - 1);
            pickerFrom.setValue(fromDate);       
            break;

        default:
            return;
        }
		
	},
	
	getReturnValue: function() {
		var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
        var pickerTo = me.lookupReference("refPickTo");
		
        var returnValue = { pickerFrom: pickerFrom, pickerTo: pickerTo };
		return returnValue;
	},
	
	setSubTitle: function() {
		var me = this;
        var pickerFrom = me.lookupReference("refPickFrom");
        var pickerTo = me.lookupReference("refPickTo");    
//      pickerFrom.getValue().toLocaleTimeString() //오전 12:00:00
//      pickerFrom.getValue().toLocaleDateString() //2021. 8. 20.
//      pickerFrom.getValue().toDateString()	   //Thu Aug 12 2021
        me.getViewModel().set('from',   Ext.Date.format(pickerFrom.getValue(), pickerFrom.format+ '(D)'));
        me.getViewModel().set('to', Ext.Date.format(pickerTo.getValue(), pickerTo.format+ '(D)'));
	}
	/**
	 * =========================================================================================================================
	 * METHOD END
	 */
});