Ext.define('IoTosOmExt.view.common.hazardousinformation.HazardousInformation', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-hazardousinformation',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 575,
   height : 345,
	scrollable: true,
	
	listeners:{
      afterrender: 'onHazardousInformationLoad'
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
				items: [{
					xtype : 'fieldset',
               layout : {
						type : 'vbox',
						align : 'stretch'
					},
					items : [{
						xtype : 'container',
						layout : {
							type : 'hbox'
						},
						defaults: {
							labelWidth : 160,
							labelAlign: 'right',
						},
						items : [{
                     xtype : 'textfield',
                     reference : 'ctlHazardousInformationKeyField',
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
							width : 400,
							bind : {
								value : '{theHazardousInfo.cntrNo}'
							},
							readOnly : true
						},{
                     
                  },{
                     xtype : 'textfield',
                     reference : 'ctlHazardousInformationSztp',
							width : 60,
							margin : '0 0 0 5',
							bind : {
								value : '{theHazardousInfo.sztp}'
							},
                     readOnly : true,
                     hidden : true
						}]
					},{
						xtype : 'container',
                  layout : {
                     type : 'hbox'
						},
						defaults : {
                     labelWidth : 160,
                     labelAlign : 'right'
						},
						margin : '10 0 0 0',
						items : [{
                     xtype : 'textfield',
                     reference : 'ctlHazardousInformationImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTCM_ImdgUnnoPackingGrp'),
                     width : 240,
                     bind : {
                        value : '{theHazardousInfo.imdg}'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlHazardousInformationUnno',
                     margin : '0 0 0 5',
                     width : 80,
                     bind : {
                        value : '{theHazardousInfo.unno}'
							},
                     // readOnly : true
                     maxLength : 4,
                     enforceMaxLength : true,
                     maskRe : /[0-9]/
                  },{
                     xtype : 'combobox',
                     reference : 'ctlHazardousInformationPackingGrp',
                     margin : '0 0 0 5',
                     width : 80,
                     bind : {
                        store : '{hazardousPackingGroupStore}',
                        value : '{theHazardousInfo.packingGrp}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote',
							// readOnly : true
                  },{
                     xtype : 'button',
                     reference : 'ctlHazardousInformationImdgInfoBtn',
                     iconCls : 'x-fa fa-search',
                     listeners : {
                        click : 'onSearchImdgInfo'
                     },
                     margin : '0 0 0 5'
                  },{
                     xtype : 'checkboxfield',
                     reference : 'ctlHazardousInformationConfirmedChk',
                     boxLabel : ViewUtil.getLabel('WRD_CTCM_Confirmed'),
                     margin : '0 0 0 10',
                     disabled : true
                  }]
					}]
				},{
					xtype : 'fieldset',
               layout : {
                  type : 'vbox',
                  align : 'stretch'
					},
					defaults : {
                  labelWidth : 160,
                  labelAlign : 'right' 
					},
					items : [{
                  xtype : 'textfield',
                  fieldLabel : ViewUtil.getLabel('WRD_CTCM_ProperShippingName'),
                  bind : {
                     value : '{theHazardousInfo.properShipNm}'
						},
						readOnly : true
               },{
                  xtype : 'container',
                  layout : {
                     type : 'hbox'
                  },
                  items : [{
                     xtype : 'container',
                     layout : {
                        type : 'vbox'
                     },
                     defaults : {
                        labelWidth : 160,
                        labelAlign : 'right',
                        width : 260
                     },
                     items : [{
                        xtype : 'textfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_ForClass1'),
                        bind : {
                           value : '{theHazardousInfo.extendClass}'
								},
								readOnly : true
                     },{
                        xtype : 'textfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_SubsidiaryRisk'),
                        bind : {
                           value : '{theHazardousInfo.subsidiaryRisk}'
								},
								readOnly : true
                     },{
                        xtype : 'numberfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_Weight'),
                        bind : {
                           value : '{theHazardousInfo.wgt}'
                        },
                        maxLength : 9,
                        enforceMaxLength : true,
                        maxValue : 999999.99,
                        hideTrigger : true,
                     },{
                        xtype : 'textfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_UNID'),
                        bind : {
                           value : '{theHazardousInfo.unid}'
								},
								readOnly : true
                     }]
                  },{
                     xtype : 'container',
                     layout : {
                        type : 'vbox'
                     },
                     defaults : {
                        labelWidth : 160,
                        labelAlign : 'right',
                        width : 260 
                     },
                     items : [{
                        xtype : 'combobox',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_MarinePollutant'),
                        bind : {
                           store : '{marinePollutantStore}',
                           value : '{theHazardousInfo.marinePollut}'
                        },
                        valueField : 'code',
								displayField : 'name',
								queryMode : 'local'
                     },{
                        xtype : 'textfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_Ems'),
                        bind : {
                           value : '{theHazardousInfo.ems}'
								},
								readOnly : true
                     },{
                        xtype : 'textfield',
                        fieldLabel : ViewUtil.getLabel('WRD_CTCM_FlashPoint'),
                        bind : {
                           value : '{theHazardousInfo.flashPoint}'
								},
								readOnly : true
                     },{
                        xtype : 'checkboxfield',
                        boxLabel : ViewUtil.getLabel('WRD_CTCM_LimitedQuantity'),
                        margin : '0 0 0 160',
                        bind : {
                           value : '{theHazardousInfo.limitedQtyCheck}'
                        }
                     }]
                  }]
               }]
				}]
		   }]
		});
		me.callParent();
	}
});
