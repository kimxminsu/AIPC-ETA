Ext.define('IoTosOmExt.view.code.generalcode.GeneralCodeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-generalcodedetail',
	
	requires: [
		'Ext.layout.container.Table',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:400,
	height:320,
	scrollable: true,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			defaults:{
				margin: '0 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
            xtype : 'fieldset',
            title : ViewUtil.getLabel('WRD_CTCM_GeneralCode'),
            autoScroll: true,
            defaults : {
               labelAlign : 'right'
				},
				flex : 1,
				margin : '0 5 5 5',
            items : [{
               xtype : 'textfield',
               reference : 'ctlGeneralCode',
               fieldLabel : ViewUtil.getLabel('WRD_CTOM_Code'),
					allowBlank: false,
					maxLength : 2,
					enforceMaxLength : true,
					allowOnlyWhitespace : false,
               bind : {
                  value : '{theDetail.gnrlCode}'
               }
            },{
					xtype : 'textarea',
					reference : 'ctlGeneralCodeDesc',
					fieldLabel : ViewUtil.getLabel('description'),
					allowBlank: false,
               maxLength : 100,
					enforceMaxLength : true,
					allowOnlyWhitespace : false,
               bind : {
                  value : '{theDetail.gnrlNm}'
               }
            },{
					xtype : 'textfield',
					reference : 'ctlErpUnit',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_ErpUnit'),
					bind : {
                  value : '{theDetail.customerCode}'
					},
					hidden : true
				},{
					xtype : 'textfield',
					reference : 'ctlSymbol',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_Symbol'),
					bind : {
                  value : '{theDetail.symbol}'
					},
					hidden : true
				},{
					xtype : 'numberfield',
					reference : 'ctlPriority',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_Priority'),
					bind : {
                  value : '{theDetail.priority}'
					},
					hidden : true,
					maxLength : 3,
					enforceMaxLength : true,
					maxValue : 999,
					hideTrigger : true,
				},{
					xtype : 'numberfield',
					reference : 'ctlRate',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_Rate'),
					bind : {
                  value : '{theDetail.rate}'
					},
					hidden : true,
					maxLength : 3,
					enforceMaxLength : true,
					maxValue : 999,
					allowDecimal : false,
					hideTrigger : true,
				},{
					xtype : 'textfield',
					reference : 'ctlTerminalCenter',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_Symbol'),
					bind : {
                  value : '{theDetail.codeGroup}'
					},
					hidden : true
				},{
					xtype : 'combobox',
					reference : 'ctlFpod',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_FPOD'),
					bind : {
						store : '{fpodCodeStore}',
                  value : '{theDetail.fpod}'
					},
					valueField : 'code',
					displayField : 'code',
					queryMode : 'local',
					hidden : true
				},
				{
					xtype : 'combobox',
					reference : 'ctlCodeGroup',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_CodeGroup'),
					bind : {
						store : '{codeGroupStore}',
                  value : '{theDetail.codeGroup}'
					},
					valueField : 'code',
					displayField : 'name',
					queryMode : 'local',
					hidden : true
				},{
					xtype : 'combobox',
					reference : 'ctlRequestUnitType',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_RequestUnitType'),
					bind : {
						store : '{codeGroupStore}',
                  value : '{theDetail.codeGroup}'
					},
					valueField : 'code',
					displayField : 'name',
					queryMode : 'local',
					hidden : true
				},{
					xtype : 'combobox',
					reference : 'ctlBlockArea',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_InspectionBlockArea'),
					bind : {
						store : '{blockAreaStore}',
                  value : '{theDetail.blockArea}'
					},
					valueField : 'code',
					displayField : 'code',
					queryMode : 'local',
					hidden : true
				},{
					xtype : 'combobox',
					reference : 'ctlUsedIn',
					fieldLabel : ViewUtil.getLabel('WRD_CTCM_UsedIn'),
					bind : {
						store : '{usedInStore}',
                  value : '{theDetail.codeUsage}'
					},
					valueField : 'code',
					displayField : 'code',
					queryMode : 'local',
					hidden : true
				},{
               xtype : 'checkbox',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_SystemDefault'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.checkDefault}'
               }
            },{
					xtype : 'checkbox',
					reference : 'ctlHoldChk',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_HoldCheck'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.holdChk}'
					},
					hidden : true
				},{
					xtype : 'checkbox',
					reference : 'ctlBillChk',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_BillCheck'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.checkBill}'
					},
					hidden : true
				},{
					xtype : 'checkbox',
					reference : 'ctlContainerWiseChk',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_ContainerWise'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.cntrWiseChk}'
					},
					hidden : true
				},{
					xtype : 'checkbox',
					reference : 'ctlDefaultSelectChk',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_DefaultSelect'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.defaultSelect}'
					},
					hidden : true
				},{
					xtype : 'checkbox',
					reference : 'ctlNeedAuth',
               boxLabel : ViewUtil.getLabel('WRD_CTCM_NeedAuth'),
               margin : '0 0 0 105',
               bind : {
                  value : '{theDetail.needAuth}'
					},
					hidden : true
				},{
					xtype : 'container',
					reference : 'ctlColorFields',
					layout : 'hbox',
					defaults : {
						labelAlign : 'right'
					},
					margin : '0 0 0 105',
					hidden : true,
					items : [{
						xtype : 'textfield',
						itemId : 'idColorField',
						value : 'A',
						width : 40,
						readOnly : true
					},{
						xtype : 'colorfield',
						width : 60,
						value : '#000000',
						hideTrigger : true,
						margin : '0 0 0 10',
						listeners : {
							change : function(obj, value) {
								var colorField = Ext.ComponentQuery.query('#idColorField')[0];
								colorField.setFieldStyle(
									'color:#'+value+';'
									+'font-weight:bold; text-align:center;'
								);
								obj.setFieldStyle(
									'background:#'+obj.getValue()+';'
									+'color:#'+obj.getValue()+';'
								);
							}
						},
						bind : '{theDetail.foreColor}' 
					},{
						xtype : 'colorfield',
						width : 60,
						value : '#FFFFFF',
						hideTrigger : true,
						listeners : {
							change : function(obj, value) {
								var colorField = Ext.ComponentQuery.query('#idColorField')[0];
								colorField.setFieldStyle(
									'background:#'+value+';'
									+ 'font-weight:bold; text-align:center;'
								);
								obj.setFieldStyle(
									'background:#'+obj.getValue()+';'
									+'color:#'+obj.getValue()+';'
								);
							}
						},
						bind : '{theDetail.backColor}'
					}]
				}]
         }]
		});
		me.callParent();
	}
});
