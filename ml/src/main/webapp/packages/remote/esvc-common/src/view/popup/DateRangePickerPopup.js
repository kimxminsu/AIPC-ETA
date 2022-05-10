Ext.define('ESVC.view.popup.DateRangePickerPopup', {
    extend: 'Ext.Panel',
    alias: 'widget.daterangepickerpopup',

    controller: 'daterangepickerpopup',
    
    listeners:{
		afterrender: 'onLoad'
	},
	title:'Date Range Picker',
	focus: false,	//false mean "To Focus"
	requires: [
		'Ext.picker.Date',
		'Ext.form.field.Time'
	],

    initComponent: function() {
        var me = this;
	    
        Ext.apply(me, {
        	frame: true,
			layout: {
				type: 'hbox',
			},
			 defaults:{
             	margin: '1 1 1 1'
             },
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
					},
					items:[
						{
		                    xtype: 'label',
		                    bind: 'From : {from}',
		                    width: '100%',
                    		 style : {
                    			 	textAlign: 'center',
                    			  fontWeight: 'bold',
                             }
						},
						{
							xtype: 'datepicker',
							reference: 'refPickFrom',
							showToday: false,
							height: 223,
							listeners: {
								select : 'onSetRange'
							},
						},
					]  
				},
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
					},
					items:[
						{
		                    xtype: 'label',
		                    bind: 'To: {to}',
		                    width: '100%',
		                    style : {
                   			 	textAlign: 'center',
                   			 	fontWeight: 'bold',
                            }
						},
						{
							xtype: 'datepicker', 	
							reference: 'refPickTo',
							showToday: false,
							height: 223,
							listeners: {
								select: 'onSetRange'
							},
						},
					]  
				},
			],
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'bottom',
			    ui: 'footer',
			    items: [
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
						},
						defaults: {
		                    listeners: {
		                    	click: 'onSetPresetPeriod'
		                    },
		                    margin: '1 1 1 1',
		                    padding: '0 0 1 0',
		                    width: 38,
		                    height: 20,
						},
						items: [
				    		{
				    			xtype: 'button',
			                    reference: 'refAWeakOption',
				    			text: ViewUtil.getLabel("1Week"),
				    	    }, 
				    	    {
				    			xtype: 'button',
			                    reference: 'refAMonthOption',
				    			text: ViewUtil.getLabel("1Month"),
				    	    },
				    	    {
				    			xtype: 'button',
			                    reference: 'refThreeMonthOption',
				    			text: ViewUtil.getLabel("3Month"),
				    	    },
				    	    {
				    			xtype: 'button',
			                    reference: 'refSixMonthOption',
				    			text: ViewUtil.getLabel("6Month"),
				    	    },
				    	    {
				    			xtype: 'button',
			                    reference: 'refAYearOption',
				    			text: ViewUtil.getLabel("1Year"),
				    	    }
						]
					},
					{xtype: 'tbfill'},
					{
	                    width: 55,
		    			height: 25,
			        	text: ViewUtil.getLabel("ok"),
			        	reference: 'okRangeBtn',
			        	listeners: {
			        		click: 'onOk'
			        	}
					},
					{
	                    width: 55,
		    			height: 25,
			        	text: ViewUtil.getLabel("cancel"),
			        	reference: 'cancleRangeBtn',
			        	listeners: {
			        		click: 'onCancel'
			        	}
					}
			    ]
			}]
        });
        me.callParent();
    }
});