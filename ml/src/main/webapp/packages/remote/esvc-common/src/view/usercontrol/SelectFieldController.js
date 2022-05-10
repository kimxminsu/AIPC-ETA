Ext.define('ESVC.view.usercontrol.SelectFieldController', {
    extend: 'ESVC.view.foundation.usercontrol.PopupFieldViewController',
    alias: 'controller.selectfield',
    requires: [],

    prevValue: null,
    
    afterSetCodePopupData: function(xtype, targetControl, returnValue, me, parent) {
        var view = me.getView();
        var ctlField = me.lookupReference("ctlField");

        if (returnValue) {
            me.getViewModel().setData({
                selectItem: returnValue
            });

            me.prevValue = returnValue.code;
            ctlField.setValue(returnValue.code);
        } else {
            me.getViewModel().setData({
                selectItem: null,
            });

            me.prevValue = null;
            ctlField.setValue('');
        }

        view.fireEvent('afterChange', view, returnValue);
    }
});