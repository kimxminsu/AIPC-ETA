Ext.define('ESVC.view.popup.CommonCodePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-commoncodepopup',
	requires: [
		'ESVC.view.popup.CommonCodePopupModel',
		'ESVC.view.popup.CommonCodePopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Common Code Popup",
	width: 370,
	height: 450,
	
	controller: 'commoncodepopup',
	
	viewModel: {
		type: 'commoncodepopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblCode: {type: 'bundle', key: 'code'},
	lblCodeName: {type: 'bundle', key: 'codeName'},
	
	btnSearch: {type: 'bundle', key: 'search'},
	btnOk: {type: 'bundle', key: 'ok'},
	btnCancel: {type: 'bundle', key: 'cancel'},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refCommonCodePopupGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateCommonCodePopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{commonCodePopup}'
	    		},
	    		
	    		selModel: {
		            type: 'checkboxmodel',
		            checkOnly: false,
		            showHeaderCheckbox: true
		        },
	    		
				listeners: {
					celldblclick: 'onDblClick',
	    			selectionchange:'onSelectionchange'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [{
	            		header: me.lblNo,
	            		xtype: 'rownumberer',
	            		width : 50,
	            		align : 'center'
            		},
            		{
            			header: me.lblCode,
            			dataIndex: 'code',
            			reference: 'refCode',
            			filter: 'string',
            			width: 70
            		},
            		{
            			header: me.lblCodeName,
            			dataIndex: 'name',
            			reference: 'refCodeName',
            			align: 'left',
            			filter: 'string',
            			width: 180
            		}]
				}
		    }, {
				bbar: [
					{
                		xtype : 'container',
                		flex:1,
                		margin: '5 5 0 0',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch',
    		                pack: 'end'
		                },
	                    items:[
	                    	{
	        					xtype : 'button',
	        					text:me.btnOk,
	        					width:100,
	        					listeners : {
	        						click : 'onOk'
	        					}
	        				},{
	        					xtype : 'button',
	        					text:me.btnCancel,
	        					margin:'0 0 0 5',
	        					width:100,
	        					listeners : {
	        						click : 'onCancel'
	        					}
	        				}
	                    ]
					}
				]
			}],
		    dockedItems: [
	    	{
		    	xtype: 'toolbar',
				enableOverflow: true,
				items: [
					{
						xtype:'textareafield',
						reference: 'ctlCodeValue',
						readOnly:true,
						flex:1
					}
				]
		    },{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items: [
						{
							xtype:'textfield',
							reference: 'ctlSearchCode',
							maxLength: 20,
							enforceMaxLength: true,
							margin: '0 5 0 0',
							flex:1,
							listeners:{
								change: 'onStoreFilter'
							}
						},{
							xtype: 'button',
							height: 33,
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							margin: '0 0 0 0',
							listeners:{
								click:'onSearch'
							}
						}]
					}
				]
		    }]
		});
		
		me.callParent();
	}
});

