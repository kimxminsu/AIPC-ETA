Ext.define('Iotos.view.color.SetColorController', {
	extend: 'ESVC.view.foundation.usercontrol.BaseUserController',
    alias: 'controller.setcolor',
    init : function () {
    },

	onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		// var configItem = Ext.create('IotosOpRfExt.model.Configuration');
		// // me.setSearchParm(configItem);
		// me.getViewModel().setData({
		// 	theDetail : configItem
		// });
		
		me.updateViewStyle(me.getView());
	},
    
    onForeColorChange: function(ownObj,value) {
		var me = this;
		var view = me.getView();

        var field = view.down('#ctlColorLabelId');
        if(field != undefined){
            field.setFieldStyle('font-weight: bold; color:#'+value + ';');
        }

		view.fireEvent('change', view);
    },
    
    onBackColorChange: function(ownObj,value) {
		var me = this;
		var view = me.getView();

        // 텍스트박스 색상 변경
        var field = view.down('#ctlColorLabelId');
        var fontColor = view.down('#ctlForeColorId');
        if(field != undefined && fontColor != undefined){
            field.setFieldStyle('background: #' + value + ';' + 'color: #' + value + ';');
            field.setFieldStyle('font-weight: bold; color:#'+ fontColor.getValue()+ ';');
        }

		view.fireEvent('change', view);
	}
});
