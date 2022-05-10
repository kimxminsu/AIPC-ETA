Ext.define('IoTosOmExt.view.import.manifestbapliereconcile.ManifestBaplieReconcileDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-manifestbapliereconciledetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:1380,
	height:490,
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
               title : ViewUtil.getLabel('WRD_CTOM_Manifest'),
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
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_MFNo'),
                     bind : {
                        value : '{theManifestDetail.soNo}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theManifestDetail.blNo}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theManifestDetail.cntrNo}',
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
                        value : '{theManifestDetail.fe}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_LclFcl'),
                     bind : {
                        value : '{theManifestDetail.lclFcl}',
                     },
                     readOnly : true,
                  },{
                     xtype : 'textfield',
                     reference : 'ctlManifestSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theManifestDetail.sztp}',
                        readOnly : '{setReadOnlyManifestComponent}',
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
                     reference : 'ctlManifestSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theManifestDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theManifestDetail.ptnrCode}',
                        readOnly : '{setReadOnlyManifestComponent}'
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theManifestDetail.pol}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        value : '{theManifestDetail.pod}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_PrivatePOD'),
                     bind : {
                        value : '{theManifestDetail.priPod}',
                     },
                     readOnly : true,
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 140
                  },
                  items : [{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
                     bind : {
                        store : '{fPodCodeStore}',
                        value : '{theManifestDetail.fpod}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theManifestDetail.fdest}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Wgt'),
                     bind : {
                        value : '{theManifestDetail.wgt}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype:'numberfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TempC'),
                     bind : {
                        value : '{theManifestDetail.setTempC}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theManifestDetail.imdg}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theManifestDetail.unno}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theManifestDetail.delv}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ConsigneeNameEDI'),
                     bind : {
                        value : '{theManifestDetail.consigneeName}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CommodityDescEDI'),
                     bind : {
                        value : '{theManifestDetail.commodityDesc}',
                        readOnly : '{setReadOnlyManifestComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsHold'),
                     bind : {
                        value : '{theManifestDetail.choldChk}',
                     },
                     readOnly : true
                  }]
               }]
		      },{
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_BAPLIE'),
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
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_MFNo'),
                     bind : {
                        value : '{theBaplieDetail.soNo}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theBaplieDetail.blNo}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theBaplieDetail.cntrNo}',
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
                        value : '{theBaplieDetail.fe}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_LclFcl'),
                     bind : {
                        value : '{theBaplieDetail.lclFcl}',
                     },
                     readOnly : true,
                  },{
                     xtype : 'textfield',
                     reference : 'ctlBaplieSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theBaplieDetail.sztp}',
                        readOnly : '{setReadOnlyBaplieComponent}',
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
                     reference : 'ctlBaplieSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theBaplieDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theBaplieDetail.ptnrCode}',
                        readOnly : '{setReadOnlyBaplieComponent}'
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theBaplieDetail.pol}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        value : '{theBaplieDetail.pod}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 140
                  },
                  items : [{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
                     bind : {
                        store : '{fPodCodeStore}',
                        value : '{theBaplieDetail.fpod}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theBaplieDetail.fdest}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Wgt'),
                     bind : {
                        value : '{theBaplieDetail.wgt}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype:'numberfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TempC'),
                     bind : {
                        value : '{theBaplieDetail.setTempC}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     reference : 'ctlBaplieImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theBaplieDetail.imdg}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlBaplieUnno',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theBaplieDetail.unno}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
                     bind : {
                        store : '{bapliePackingGroupStore}',
                        value : '{theBaplieDetail.packingGrp}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theBaplieDetail.delv}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ConsigneeName'),
                     bind : {
                        value : '{theBaplieDetail.consigneeName}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CommodityDesc'),
                     bind : {
                        value : '{theBaplieDetail.commodityDesc}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsHold'),
                     bind : {
                        value : '{theBaplieDetail.choldChk}',
                     },
                     readOnly : true
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
