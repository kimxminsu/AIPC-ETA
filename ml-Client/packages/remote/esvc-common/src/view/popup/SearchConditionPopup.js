Ext.define('ESVC.view.popup.SearchConditionPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.popup-searchconditionpopup',
	requires: [
		'ESVC.view.popup.SearchConditionPopupModel',
		'ESVC.view.popup.SearchConditionPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	height : 560,
	width: 640,

	controller: 'searchconditionpopup',
	
	viewModel: {
		type: 'searchconditionpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	SEARCH_CONDITION_GRID_REF_NAME : 'refSearchConditionGrid',	// Search Condition Grid Name
	SEARCH_CONDITION_STORE_NAME : 'searchCondition',			// Search Condition Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {type:'vbox', align:'stretch'},
	lblSummaryAttributes: {type: 'bundle', key: 'summaryAttributes'},
	lblSelectedSummaryAttributes: {type: 'bundle', key: 'selectedSummaryAttributes'},
	lblLoadCondition: {type: 'bundle', key: 'loadCondition'},
	
	btnSave: {type: 'bundle', key: 'save'},
	btnLoad: {type: 'bundle', key: 'load'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnOk: {type: 'bundle', key: 'ok'},
	btnCancel: {type: 'bundle', key: 'cancel'},
	
	initComponent : function() {
			var me = this;
			
       		Ext.apply(me, {
       			items: [
       				{
						xtype: 'tsb-datagrid',
						reference: me.SEARCH_CONDITION_GRID_REF_NAME,
						usePagingToolbar : false,
						flex:1,
						plugins: [
							'gridexporter',
							'gridfilters',
							'clipboard'
			    		],
			    		bind: {
			    			store: me.SEARCH_CONDITION_STORE_NAME
			    		},
			    		selModel: {
							type: 'spreadsheet',
							cellSelect: false
						},
						listeners: {
							celldblclick: 'onDblClick',
							selectionchange: 'onSelectionChange'
						},
						columns: {
			            	defaults: {
			            		style : 'text-align:center',
			            		align : 'center'
			            	},
			            	items: []
						}
				    },
				    {
	    				xtype: 'fieldset',
	    				autoScroll: true,
	    				collapsible:true,
	    				collapsed:true,
	    				height:200,
	    				title: me.lblLoadCondition,
	    				reference: 'ctlLoadCondition',
	    				layout: {
	    					type: 'vbox',
	    					align: 'stretch'
	    				},
	    				defaults:{
	    					margin: '0 0 5 0'
	    				},
	    				items: [
	    					{
	    						xtype:'textareafield',
	    						reference: 'ctlSearchConditionPopupLoadText',
	    						readOnly:true,
	    						flex:1,
	    						allowBlank:false
	    					}, 
							{
								xtype : 'container',
								height: 33,
								layout: {
									type: 'hbox',
									align: 'stretch',
									pack: 'end'
								},
								defaults: {
			                        margin: '0 0 0 5'
			                    },
								items:[
									{
	    								xtype:'textfield',
	    								reference:'ctlSearchConditionPopupId',
	    								width: 120,
	    								maxLength: 10,
	    								enforceMaxLength : true,
	    								bind : '{theDetail.id}',
	    								allowBlank:false
	    			   				},
									{
		                                xtype: 'button',
		                                iconCls: 'x-fa fa-save',
		                                text: me.btnSave,
		            					listeners: {
		            						click: 'onSave'
		            					}
		                            }
								]
							}
	    				]
				    },
				    {
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
       		        					text:me.btnLoad,
       		        					width:120,
       		        					listeners : {
       		        						click : 'onLoadSearchCondition'
       		        					}
       		        				},
       		        				{
										xtype: 'button',
										itemId: 'deleteButton',
										reference: 'ctlSearchConditoinPopupDelete',
										text: me.btnRemove,
										margin:'0 0 0 5',
										ui: 'delete-button',
										iconCls: 'x-fa fa-minus',
										disabled:true,
										listeners: {
											click: 'onDelete'
										}
									},
       		        				{
       		        					xtype : 'button',
       		        					text:me.btnOk,
       		        					reference: 'ctlSearchConditoinPopupOk',
       		        					margin:'0 0 0 5',
       		        					disabled:true,
       		        					width:100,
       		        					listeners : {
       		        						click : 'onOk'
       		        					}
       		        				},
       		        				{
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
       				}
				]
       		});
       		me.callParent();
       	}
});