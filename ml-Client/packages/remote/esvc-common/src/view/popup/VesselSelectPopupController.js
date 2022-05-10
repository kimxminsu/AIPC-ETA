Ext.define('ESVC.view.popup.VesselSelectPopupController', {
	extend: 'ESVC.view.foundation.BaseViewController',
    alias: 'controller.vesselselectpopup',
    requires: [],

    onLoad: function() {
        var me = this;
        var view = me.getView();
        var ctlVesselselection = me.lookupReference('ctlVesselselect');

        if (view.codeValue !== undefined && view.codeValue !== null) {
            var splitValue = view.codeValue.split('-');
            var vvdData = {
                vesselCode: splitValue[0],
                callYear: splitValue[1],
                callSeq: splitValue[2]
            };
            
            ctlVesselselection.setValue(vvdData);
        }
    },

    onOk:function(){
		var me = this;
        var window = me.getView().up('window');
        var ctlVesselselection = me.lookupReference('ctlVesselselect');
        var returnValue = ctlVesselselection.getValue();
        
        if (returnValue !== undefined && returnValue !== null) {
            window.returnValue = returnValue;
            window.returnValue.code = ctlVesselselection.getVvd();
        }
        else {
            window.returnValue = {};
            window.returnValue.code = '';
        }
    	
       	window.close();
	},
	
	onCancel:function(){
		var me = this;
        var window = me.getView().up('window');

    	window.returnValue = null;
       	window.close();
	},
});