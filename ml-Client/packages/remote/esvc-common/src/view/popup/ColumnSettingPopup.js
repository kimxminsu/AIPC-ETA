Ext.define('ESVC.view.popup.ColumnSettingPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.popup-columnsettingpopup',
	requires: [
		'ESVC.view.popup.ColumnSettingPopupModel',
		'ESVC.view.popup.ColumnSettingPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	height : 460,
	width: 460,

	controller: 'columnsettingpopup',
	
	viewModel: {
		type: 'columnsettingpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	HIDDEN_COLUMN_GRID_REF_NAME : 'refHiddenColumnGrid',	// Hidden Column Grid Name 
	HIDDEN_COLUMN_STORE_NAME : 'columnSettingHiddenColumn',	// Hidden Column Store Name
	MAIN_STORE_NAME : 'columnSettingCombo',					// Main Store Name
	SHOW_COLUMN_GRID_REF_NAME : 'refShowColumnGrid',		// Show Column Grid Name
	SHOW_COLUMN_STORE_NAME : 'columnSettingShowColumn',		// Show Column Setting Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	layout: {type:'vbox', align:'stretch'},
	
	lblHiddenColumn: {type: 'bundle', key: 'hiddenColumn'},
	lblShowColumn: {type: 'bundle', key: 'showColumn'},
	lblLoadCondition: {type: 'bundle', key: 'loadCondition'},
	lblDefault: {type: 'bundle', key: 'default'},
	lblFreezeColumnCount: {type: 'bundle', key: 'freezeFirstColumns'},
	
	btnSave: {type: 'bundle', key: 'save'},
	btnLoad: {type: 'bundle', key: 'load'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnOk: {type: 'bundle', key: 'ok'},
	btnCancel: {type: 'bundle', key: 'cancel'},
	btnReset: {type: 'bundle', key: 'reset'},
	
	initComponent : function() {
			var me = this;
			
       		Ext.apply(me, {
       			items: [
       				{
       					xtype: 'container',
       					layout: {type:'hbox', align:'stretch'},
       					flex:1,
       					items:[
       						{
       		       				flex: 1,
       		       				usePagingToolbar : false,
       		       				xtype: 'tsb-datagrid',
       		    				reference: me.HIDDEN_COLUMN_GRID_REF_NAME,
       		    				multiSelect : true,
       		    	            viewConfig : {
       		    	                plugins : {
       		    	                    ptype : 'gridviewdragdrop',
       		    	                    dragGroup : 'firstGridDDGroup',
       		    	                    dropGroup : 'secondGridDDGroup'
       		    	                }
       		    	            },
       		    	    		bind: {
       		    	    			store: '{' + me.HIDDEN_COLUMN_STORE_NAME + '}'
       		    	    		},
       		    	    		
       		    	    		listeners: {
       		    					itemdblclick: 'onHiddenColumnGridDblClick',
       		    					selectionchange: 'onHiddenColumnGridSelectionChange'
       		    	    		},
       		    	    		
       		    				columns: {
       		    	            	defaults: {
       		    	            		style : 'text-align:center',
       		    	            		align : 'center'
       		    	            	},
       		    	            	items: [
       		    	            		{
       		    	            			header: me.lblHiddenColumn,
       		    	            			dataIndex: 'columnText',
       		    	            			reference: 'refColumnSettingHiddenColumn',
       		    	            			filter: 'string',
       		    	            			flex:1
       		    	            		}
       		    	            	]
       		    				}
       	       				}, {
       	       					layout : { type  : 'hbox', align : 'center'},
       	       					items:[
       	       						{
       	           						layout : { type  : 'vbox', align : 'middle'},
       	               					items: [
       	    	           					{
       	    	           						margin: '0 7 10 7',
       	    	           						reference: 'ctlColumnSettingRight',
       	    	    	       					xtype: 'button',
       	    	    	       					iconCls: 'x-fa fa-angle-double-right',
       	    	    	       					scale: 'large',
       	    	    	       					disabled:true,
       	    	    	       					listeners: {
       	    	    	       						click: 'onGridRight'
       	    	    	       					}
       	    	    	   					},{
       	    	    	       					xtype: 'button',
       	    	    	       					reference: 'ctlColumnSettingLeft',
       	    	    	       					iconCls: 'x-fa fa-angle-double-left',
       	    	    	       					scale: 'large',
       	    	    	       					disabled:true,
       	    	    	       					listeners: {
       	    	    	       						click: 'onGridLeft'
       	    	    	       					}
       	    	    	   					}
       	               					]
       	       						}
       	       					]
       	       				}, {
       		       				flex: 1,
       		       				usePagingToolbar : false,
       		       				xtype: 'tsb-datagrid',
       		    				reference: me.SHOW_COLUMN_GRID_REF_NAME,
       		    				multiSelect : true,
       		    	            viewConfig : {
       		    	                plugins : {
       		    	                    ptype : 'gridviewdragdrop',
       		    	                    dragGroup : 'secondGridDDGroup',
       		    	                    dropGroup : 'firstGridDDGroup'
       		    	                },
       		    	                listeners : {
       		    	                    drop : 'selectedDrop'
       		    	                }
       		    	            },
       		    	    		bind: {
       		    	    			store: '{' + me.SHOW_COLUMN_STORE_NAME + '}'
       		    	    		},
       		    	    		
       		    	    		listeners: {
       		    					itemdblclick: 'onShowColumnGridDblClick',
       		    					selectionchange: 'onShowColumnGridSelectionChange'
       		    	    		},
       		    				columns: {
       		    	            	defaults: {
       		    	            		style : 'text-align:center',
       		    	            		align : 'left'
       		    	            	},
       		    	            	items: [
       		    	            		{
       		    	            			header: me.lblShowColumn,
       		    	            			dataIndex: 'columnText',
       		    	            			reference: 'refColumnSettingShowColumn',
       		    	            			filter: 'string',
       		    	            			flex:1
       		    	            		}
       		    	            	]
       		    				}
       	       				}
       					]
       				},
       				{
       					xtype : 'container',
       					margin: '5 5 5 0',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
	                        labelAlign: 'right',
	                        margin: '0 5 0 0'
	                    },
       					items : [
       						{
    		                    xtype: 'checkboxfield',
    		                    margin: '0 5 0 5',
    		                    reference: 'ctlColumnSettingPopupDefaultCheck',
    		                    width:15,
    		                    bind:'{defaultCheckChecked}'
    		                },
    		                {
	                    		xtype: 'combobox',
	                    		reference: 'ctlColumnSettingPopupDefaultCombo',
	                    		fieldLabel: me.lblDefault,
	                    		labelWidth:50,
	                    		bind: {
	                    			store: '{' + me.MAIN_STORE_NAME + '}',
	                    			value : '{theDetail.no}'
	                    		},
	                    		queryMode: 'local',
	                    		displayField: 'no',
	                    		valueField: 'no',
	                    		allowBlank: false,
	                    		maxLength: 20,
								enforceMaxLength : true,
								listeners: {
       		    					change: 'onColumnSettingPopupComboChange'
       		    	    		},
	                    		width: 190
	                        },
	                        {
                                xtype: 'numberfield',
                                margin: '0 0 0 5',
                                reference: 'ctlColumnSettingPopupFreezeCount',
	                            bind : '{theDetail.fixedColumn}',
	                            labelWidth:110,
	                            fieldLabel: me.lblFreezeColumnCount,
	                            fieldStyle: 'text-align: right;',
	                            xtype : 'numberfield',
								maxValue: 10,
								minValue: 0,
								width: 210
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
       			                defaults: {
       		                        labelAlign: 'right',
       		                        margin:'0 0 0 5',
       		                    },
       		                    items:[
       		                    	{
		                                xtype: 'button',
		                                reference: 'ctlColumnSettingPopupReset',
		                                iconCls: 'x-fa fa-undo',
		                                text: me.btnReset,
		            					listeners: {
		            						click: 'onReset'
		            					}
		                            },
       		                    	{
		                                xtype: 'button',
		                                reference: 'ctlColumnSettingPopupSave',
		                                iconCls: 'x-fa fa-save',
		                                text: me.btnSave,
		            					listeners: {
		            						click: 'onSave'
		            					}
		                            },
       		        				{
										xtype: 'button',
										reference: 'ctlColumnSettingPopupDelete',
										text: me.btnRemove,
										ui: 'delete-button',
										iconCls: 'x-fa fa-minus',
										listeners: {
											click: 'onDelete'
										}
									},
       		        				{
       		        					xtype : 'button',
       		        					text:me.btnOk,
       		        					reference: 'ctlColumnSettingPopupOk',
       		        					width:100,
       		        					listeners : {
       		        						click : 'onOk'
       		        					}
       		        				},
       		        				{
       		        					xtype : 'button',
       		        					text:me.btnCancel,
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