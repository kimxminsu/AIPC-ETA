Ext.define('IoTosOmExt.view.code.servicelane.ServiceLaneDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-servicelanedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 800,
   height : 800,
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
				margin: '5 5 0 5',
				xtype: 'container',
				layout: {
						type: 'vbox',
						align: 'stretch'
				},
				flex : 1,
				items: [{
					xtype : 'fieldset',
					title : ViewUtil.getLabel('WRD_CTCM_ServiceLaneInformation'),
					defaults: {
						margin: '0 5 5 5',
						labelAlign: 'right',
						labelWidth: 150,
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items : [{
						xtype : 'container',
						layout : {
							type : 'hbox'
						},
						defaults : {
							labelWidth: 150,
							labelAlign : 'right'
						},
						items : [{
							xtype : 'textfield',
							reference : 'ctlServiceLaneCd',
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_ServiceLaneCode'),
							bind : {
								value : '{theDetail.laneCd}'	
							},
							fieldStyle: 'text-transform:uppercase',
							allowBlank : false,
							maxLength : 10,
							enforceMaxLength : true,
							allowOnlyWhitespace : false,
						},{
							xtype : 'checkbox',
							reference : 'ctlUnusedChk',
							boxLabel : ViewUtil.getLabel('WRD_CTCM_Unused'),
							bind : {
								value : '{theDetail.unusedChk}'
							},
							margin : '0 0 0 10'
						}]
					},{
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('WRD_CTCM_ServiceLaneName'),
						width : 673,
						bind : '{theDetail.laneName}'
					},{
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('WRD_CTCM_ConsortiumGroupName'),
						width : 673,
						bind : '{theDetail.consortiumCd}'
					},{
						xtype : 'container',
						layout : {
							type : 'hbox'
						},
						defaults : {
							labelWidth: 150,
							labelAlign : 'right'
						},
						items : [{
							xtype : 'numberfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_TEURatio'),
							bind : '{theDetail.teuRatio}',
							maxLength : 6,
							enforceMaxLength : true,
							maxValue : 999.99,
							hideTrigger : true,
						},{
							xtype : 'label',
							text : ViewUtil.getLabel('WRD_CTCM_Percent'),
							margin : '5 5 5 5',
							style: 'font-weight:bold;'
						},{
							xtype : 'component',
							flex : 1
						},{
							xtype : 'numberfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_ProductivityPerHour'),
							bind : '{theDetail.laneProd}',
							maxLength : 5,
							enforceMaxLength : true,
							maxValue : 99.99,
							hideTrigger : true,
						}]
					},{
						xtype : 'commoncodefield',
						reference : 'ctlPartnerCodeCombo',
						params: {
							popupType : ViewUtil.POPUPTYPE_MULTI,
							title : ViewUtil.getLabel('WRD_CTCM_Menu_PartnerCode'),
							args : [PopupServiceConstants.PartnerType.LINE_OPERATOR],
							itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR,
						},
						fieldLabel : ViewUtil.getLabel('WRD_FTCO_Operator'),
						labelWidth : 150,
						bind : {
							value : '{theDetail.ptnrCode}'
						},
						width : 673,
					},{
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('WRD_CTCM_LaneDistrict'),
						bind : '{theDetail.portLane}',
						maxLength : 4,
						enforceMaxLength : true,
					},
					{
						xtype : 'container',
						layout : 'hbox',
						defaults : {
							labelWidth: 150,
							labelAlign : 'right'
						},
						items : [{
							xtype : 'textfield',
							itemId : 'idColorSample',
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_ForeColorBackColor'),
							value : 'A',
							width: 190,
							editable : false,
						},{
							xtype : 'colorfield',
							reference : 'refPortForeColor',
							itemId : 'idForeColor',
							width : 120,
							value : '#000000',
							listeners : {
								change : function(obj, value) {
									var field = Ext.ComponentQuery.query('#idColorSample')[0];
									field.setFieldStyle(
										'font-weight : bold; color : #' + value + '; text-align : center;' + 'text-align : center;'
									);
								}
							},
							bind : '{theDetail.foreColor}'
						},{
							xtype : 'colorfield',
							reference : 'refPortBackColor',
							width: 120,
							value : '#FFFFFF',
							listeners : {
								change : function(obj, value) {
									var sampleField = Ext.ComponentQuery.query('#idColorSample')[0];
									var foreColorField = Ext.ComponentQuery.query('#idForeColor')[0];
									sampleField.setFieldStyle(
										'background : #' + value + ';' + 'color : #' + value + ';'
									);
									sampleField.setFieldStyle(
										'font-weight : bold; color : #' + foreColorField.getValue() + ';' + 'text-align : center;'
									);
								}
							},
							bind : '{theDetail.backColor}'
						}]
					}
				]
				},{
					xtype : 'container',
					layout : 'hbox',
					items : [{
						xtype : 'button',
						text : ViewUtil.getLabel('WRD_CTCM_Add'),
						iconCls: 'x-fa fa-plus',
						listeners : {
							click : 'onAddPortClick'
						}
					},{
						xtype : 'button',
						text : ViewUtil.getLabel('WRD_CTCM_Remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						margin : '0 0 1 1',
						listeners : {
							click : 'onRemovePortClick'
						}
					},{
						xtype : 'button',
						iconCls : 'x-fa fa-caret-up',
						margin : '0 3 0 20',
						value : 'up',
						listeners : {
							click : 'onPortSeqChange'
						}
					},{
						xtype : 'button',
						iconCls : 'x-fa fa-caret-down',
						value : 'down',
						listeners : {
							click : 'onPortSeqChange'
						}
					}]
				},{
					xtype : 'container',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					flex : 1,
					items : [{
						xtype: 'tsb-datagrid',
						reference: 'refServiceLanePortGrid',
						flex: 1,
						bind: {
							store: '{serviceLanePortStore}'
						},
						listeners: {
							celldblclick: 'onPortGridDblclick',
						},
						selModel: {
								type: 'spreadsheet',
								rowSelect: true,
								cellSelect:false
						},
						columns: {
							defaults: {
								style: 'text-align: center',
								align :'center',
							},
							items: GridUtil.getGridColumns('ServiceLanePortGrid'),
						}
					}]
				}]
		   }]
		});
		me.callParent();
	}
});
