Ext.define('IoTosOmExt.view.code.containertypesize.ContainerTypeSizeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-containertypesizedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:920,
	height:350,
	
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
						type: 'hbox',
						align: 'stretch'
				},
				items: [{ // 1
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_ContainerTypeSize'),
					flex: 1,
					defaults: {
						margin: '0 5 5 5',
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     // labelWidth: 80
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Lengthft'),
                     bind : {
                        value : '{theDetail.code1Desc}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_HeightWidth'),
                     bind : {
                        value : '{theDetail.code2Desc}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Tunnel'),
                     bind : {
                        value : '{theDetail.tunnel}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Code'),
                     bind : {
                        value : '{theDetail.sizeCode}',
                     },
                     readOnly : true
                  },{
                     xtype:'checkboxfield',
                     reference : 'ctlUseChk',
                     boxLabel: ViewUtil.getLabel('WRD_CTOM_Use'),
                     margin : '0 0 0 100',
                     readOnly : true
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     // labelWidth: 80
                     maxLength : 5,
							enforceMaxLength : true,
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_G0'),
                     bind : {
                        value : '{theDetail.g0}',
                     },
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_G2'),
                     bind : {
                        value : '{theDetail.g2}',
                     },
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_V0'),
                     bind : {
                        value : '{theDetail.v0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_B0'),
                     bind : {
                        value : '{theDetail.b0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_S0'),
                     bind : {
                        value : '{theDetail.s0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_R0'),
                     bind : {
                        value : '{theDetail.r0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_H0'),
                     bind : {
                        value : '{theDetail.h0}',
                     }
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     // labelWidth: 140
                     maxLength : 5,
							enforceMaxLength : true,
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_U0'),
                     bind : {
                        value : '{theDetail.u0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_P0'),
                     bind : {
                        value : '{theDetail.p0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_P1'),
                     bind : {
                        value : '{theDetail.p1}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_T0'),
                     bind : {
                        value : '{theDetail.t0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_K0'),
                     bind : {
                        value : '{theDetail.k0}',
                     }
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_A0'),
                     bind : {
                        value : '{theDetail.a0}',
                     }
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
