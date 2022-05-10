Ext.define('IoTosOmExt.view.export.movinsreconcile.MovinsReconcileDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-movinsreconciledetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:1200,
	height:580,
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
						type: 'hbox',
						align: 'stretch'
				},
				items: [{ // 1
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_AdditionalMovinsNEW'),
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
                     labelWidth: 80
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ShipLocL'),
                     bind : {
                       value : '{theAddMovinsDetail.loadPos}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                       value : '{theAddMovinsDetail.cntrNo}',
                     },
                     readOnly : true
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theAddMovinsDetail.ptnrCode}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddMovinsSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theAddMovinsDetail.sztp}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                        change : 'onSztpChange'
                     },
                     maxLength : 4,
                     enforceMaxLength : true,
                     allowOnlyWhitespace : false
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddMovinsSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theAddMovinsDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
                     bind : {
                        store : '{feCodeStore}',
                        value : '{theAddMovinsDetail.fe}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theAddMovinsDetail.pol}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        store : '{podCodeStore}',
                        value : '{theAddMovinsDetail.pod}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
                     bind : {
                        store : '{fPodCodeStore}',
                        value : '{theAddMovinsDetail.fpod}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theAddMovinsDetail.fdest}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
                     bind : {
                       value : '{theAddMovinsDetail.wgt}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theAddMovinsDetail.delv}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     hideTrigger : true
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingTime'),
                     bind : {
                        store : '{shiftingTimeStore}',
                        value : '{theAddMovinsDetail.shiftTime}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 80
                  },
                  items : [{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theAddMovinsDetail.cargoType}',
                        readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype:'numberfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TempC'),
                     bind : {
                       value : '{theAddMovinsDetail.setTempC}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true,
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                       value :  '{theAddMovinsDetail.imdg}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                       value : '{theAddMovinsDetail.unno}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     }
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                       value : '{theAddMovinsDetail.ovHeight}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                       value : '{theAddMovinsDetail.ovFore}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                       value : '{theAddMovinsDetail.ovAft}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                       value : '{theAddMovinsDetail.ovPort}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                       value : '{theAddMovinsDetail.ovStbd}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                       value : '{theAddMovinsDetail.osHeight}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                       value : '{theAddMovinsDetail.osPort}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                       value : '{theAddMovinsDetail.osStbd}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocD'),
                     bind : {
                       value : '{theAddMovinsDetail.disPos}',
                       readOnly : '{setReadOnlyAddMovinsComponent}'
                     },
                     maxLength : 7,
                     enforceMaxLength : true,
                     maskRe : /[0-9]/
                  }]
               }]
		      },{
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_MovinsOLD'),
					flex: 1,
					defaults: {
						margin: '0 5 5 5',
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
               },
               items : [{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 80
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ShipLocL'),
                     bind : {
                       value : '{theOldMovinsDetail.loadPos}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                       value : '{theOldMovinsDetail.cntrNo}',
                     },
                     readOnly : true
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theOldMovinsDetail.ptnrCode}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     reference : 'ctlOldMovinsSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theOldMovinsDetail.sztp}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                        change : 'onSztpChange'
                     },
                     maxLength : 4,
                     enforceMaxLength : true,
                     allowOnlyWhitespace : false
                  },{
                     xtype : 'textfield',
                     reference : 'ctlOldMovinsSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theOldMovinsDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
                     bind : {
                        store : '{feCodeStore}',
                        value : '{theOldMovinsDetail.fe}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theOldMovinsDetail.pol}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        store : '{podCodeStore}',
                        value : '{theOldMovinsDetail.pod}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
                     bind : {
                        store : '{fPodCodeStore}',
                        value : '{theOldMovinsDetail.fpod}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theOldMovinsDetail.fdest}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
                     bind : {
                       value : '{theOldMovinsDetail.wgt}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theOldMovinsDetail.delv}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingTime'),
                     bind : {
                        store : '{shiftingTimeStore}',
                        value : '{theOldMovinsDetail.shiftTime}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 80
                  },
                  items : [{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theOldMovinsDetail.cargoType}',
                        readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype:'numberfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TempC'),
                     bind : {
                       value : '{theOldMovinsDetail.setTempC}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                       value : '{theOldMovinsDetail.imdg}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                       value : '{theOldMovinsDetail.unno}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     }
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                       value : '{theOldMovinsDetail.ovHeight}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                       value : '{theOldMovinsDetail.ovFore}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                       value : '{theOldMovinsDetail.ovAft}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                       value : '{theOldMovinsDetail.ovPort}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                       value : '{theOldMovinsDetail.ovStbd}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                       value : '{theOldMovinsDetail.osHeight}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                       value : '{theOldMovinsDetail.osPort}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                       value : '{theOldMovinsDetail.osStbd}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocD'),
                     bind : {
                       value : '{theOldMovinsDetail.disPos}',
                       readOnly : '{setReadOnlyOldMovinsComponent}'
                     },
                     maxLength : 7,
                     enforceMaxLength : true,
                     maskRe : /[0-9]/
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
