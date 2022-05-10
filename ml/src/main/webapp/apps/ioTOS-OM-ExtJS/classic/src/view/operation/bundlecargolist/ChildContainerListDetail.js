Ext.define('IoTosOmExt.view.operation.bundlecargolist.ChildContainerListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-bundlecargochildcontainerlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 630,
   height : 310,
	scrollable: true,
	
	listeners:{
		afterrender: 'onChildContainerDetailLoad'
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
					xtype : 'container',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : [{
						xtype : 'container',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : [{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_ContainerDetailInfomation'),
							items : [{
								xtype : 'container',
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								items : [{
									xtype : 'container',
									layout : {
										type : 'vbox',
									},
									defaults : {
										labelAlign : 'right',
									},
									items : [{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_PackUnpack'),
										bind : {
											store : '{packUnpackCodeStore}',
											value : '{theChildContainerDetail.packType}'
										},
										listeners : {
											change : 'onPackUnpackChanged'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
										allowBlank : false
									},{
                              xtype : 'container',
                              layout : {
                                 type : 'hbox'
                              },
                              defaults : {
                                 labelAlign : 'right'
                              },
                              margin : '0 0 10 0',
                              items : [{
                                 xtype : 'textfield',
                                 reference : 'ctlChildContainerDetailCntrNo',
                                 fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                                 bind : {
                                    value : '{theChildContainerDetail.bundleCntr}'
                                 },
                                 allowBlank : false,
                                 maxLength : 11,
											enforceMaxLength : true,
											allowOnlyWhitespace : false
                              },{
											xtype : 'button',
											reference : 'ctlDetailSearchChildContainer',
                                 iconCls : 'x-fa fa-search',
                                 margin : '0 0 0 5',
                                 listeners : {
                                    click : 'onSearchChildContainer'
                                 }
                              }]
                           },{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
											value : '{theChildContainerDetail.wgt}'
										},
										allowBlank : false,
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
									},{
										xtype : 'textfield',
                              reference : 'ctlChildContainerDetailSztp',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                              bind : {
                                 value : '{theChildContainerDetail.sztp}'
                              },
                              listeners : {
                                 change : 'onSztpChange'
                              },
                              maxLength : 4,
										enforceMaxLength : true,
										allowBlank : false
									},{
										xtype : 'textfield',
                              reference : 'ctlChildContainerDetailSztp2',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                              bind : {
                                 value : '{theChildContainerDetail.sztp2}'
                              },
										readOnly : true,
										allowBlank : false
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelAlign : 'right',
									},
									items : [{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BundleStatus'),
										bind : {
											store : '{feCodeStore}',
											value : '{theChildContainerDetail.bundleState}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
                           },{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Block'),
                              bind : {
                                 store : '{blockCodeStore}',
                                 value : '{theChildContainerDetail.block}'
                              },
                              valueField : 'name',
                              displayField : 'name',
										queryMode : 'local',
									},{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Bay'),
                              bind : {
                                 store : '{deliveryCodeStore}',
                                 value : '{theChildContainerDetail.bay}'
                              },
                              valueField : 'code',
                              displayField : 'code',
									},{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Row'),
                              bind : {
                                 store : '{cargoTypeStore}',
                                 value : '{theChildContainerDetail.roww}'
                              },
                              valueField : 'code',
                              displayField : 'code',
										queryMode : 'local',
									},{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Tier'),
                              bind : {
                                 store : '{customAppTypeStore}',
                                 value : '{theChildContainerDetail.tier}'
                              },
                              valueField : 'code',
                              displayField : 'code',
                              queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Area'),
										bind : {
											store : '{areaCodeStore}',
											value : '{theChildContainerDetail.area}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
                           }]
								}]
							}]
						}]
					}]
				}]
		   }]
		});
		me.callParent();
	}
});
