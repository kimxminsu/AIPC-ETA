
Ext.define('ESVC.view.usercontrol.DateRangePicker', {
    extend: 'Ext.button.Button',	
	alias: 'widget.daterangepicker',
	
 	controller: 'daterangepicker',
	 	
	listeners:{
		afterrender: 'onLoad'
	},
	
	openPopup: function(popupAlias){
		var me = this.controller;
		var parent = me.getParent(me.getView());
			
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
		ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
	},	
	
	
	
	initComponent: function(){
		var me = this;
        var defaults = {
    		fromDateReference: null,
    		toDateReference: null,
        };
        
        me.drpDefaults = me.drpDefaults ? Ext.apply(defaults, me.drpDefaults) : defaults;
	    
		Ext.apply(me, {			
        	//Daterangepicker Button
        	reference: 'ctlPeriod',
			iconCls: 'x-fa fa-calendar',
        	width: 30,
        	listeners: {
                click: {
                    fn: 'openPopup',
                    args: ['daterangepickerpopup'],
                    scope: this,
                }
            }
        });

	    me.callParent();
	 }
	

});