Ext.define('IoTosOmExt.view.import.coprarbapliereconcile.CoprarBaplieReconcileDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-coprarbapliereconciledetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:1250,
	height:840,
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
               title : ViewUtil.getLabel('WRD_CTOM_COPRAR'),
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
                     labelWidth: 90
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theCoprarDetail.cntrNo}',
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
                        value : '{theCoprarDetail.fe}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlCoprarSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theCoprarDetail.sztp}',
                        readOnly : '{setReadOnlyCoprarComponent}',
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
                     reference : 'ctlCoprarSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theCoprarDetail.sztp2}',
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
                        value : '{theCoprarDetail.ptnrCode}',
                        readOnly : '{setReadOnlyCoprarComponent}'
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BillingOPR'),
                     bind : {
                        store : '{billingOprCodeStore}',
                        value : '{theCoprarDetail.shiftAcc}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Consignee'),
                     bind : {
                        store : '{consigneeCodeStore}',
                        value : '{theCoprarDetail.consignee}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POR'),
                     bind : {
                        store : '{porCodeStore}',
                        value : '{theCoprarDetail.por}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theCoprarDetail.pol}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        value : '{theCoprarDetail.pod}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
                     bind : {
                        store : '{fPodCodeStore}',
                        value : '{theCoprarDetail.fpod}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theCoprarDetail.fdest}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Wgt'),
                     bind : {
                        value : '{theCoprarDetail.wgt}',
                        readOnly : '{setReadOnlyCoprarComponent}'
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
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGM'),
                     bind : {
                        value : '{theCoprarDetail.vgm}',
                     },
                     readOnly : true,
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theCoprarDetail.cargoType}',
                        readOnly : '{setReadOnlyCoprarComponent}'
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
                        value : '{theCoprarDetail.setTempC}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     reference : 'ctlCoprarImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theCoprarDetail.imdg}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlCoprarUnno',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theCoprarDetail.unno}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
                     bind : {
                        store : '{coprarPackingGroupStore}',
                        value : '{theCoprarDetail.packingGrp}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_HandlingInstS'),
                     bind : {
                        store : '{handleInstrCodeStore}',
                        value : '{theCoprarDetail.handleInstr}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 100
                  },
                  items : [{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theCoprarDetail.delv}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theLoadingListDetail.blNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_MFNo'),
                     bind : {
                        value : '{theLoadingListDetail.soNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_SVCLaneOut'),
                     bind : {
                        store : '{svcOutLaneCodeStore}',
                        value : '{theCoprarDetail.outLane}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_2ndVVD'),
                     bind : {
                        store : '{secondVvdStore}',
                        value : '{theCoprarDetail.prevVVD}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingMove'),
                     bind : {
                        store : '{shiftingMoveStore}',
                        value : '{theCoprarDetail.shiftTime}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo1}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo2}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ExportSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo3}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                        value : '{theCoprarDetail.ovHeight}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                        value : '{theCoprarDetail.ovFore}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                        value : '{theCoprarDetail.ovAft}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                        value : '{theCoprarDetail.ovPort}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                        value : '{theCoprarDetail.ovStbd}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                        value : '{theCoprarDetail.osHeight}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                        value : '{theCoprarDetail.osPort}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                        value : '{theCoprarDetail.osStbd}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                     bind : {
                        value : '{theCoprarDetail.remark}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_TrainUserVoyage'),
                     bind : {
                        store : '{trainUserVoyageStore}',
                        value : '{theCoprarDetail.trnVoy2}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
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
                     labelWidth: 90
                  },
                  items : [{
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BillingOPR'),
                     bind : {
                        store : '{billingOprCodeStore}',
                        value : '{theBaplieDetail.shiftAcc}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Consignee'),
                     bind : {
                        store : '{consigneeCodeStore}',
                        value : '{theBaplieDetail.consignee}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POR'),
                     bind : {
                        store : '{porCodeStore}',
                        value : '{theBaplieDetail.por}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
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
                  },{
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
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGM'),
                     bind : {
                        value : '{theBaplieDetail.vgm}',
                     },
                     readOnly : true,
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theBaplieDetail.cargoType}',
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
                        store : '{coprarPackingGroupStore}',
                        value : '{theBaplieDetail.packingGrp}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_HandlingInstS'),
                     bind : {
                        store : '{handleInstrCodeStore}',
                        value : '{theBaplieDetail.handleInstr}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 100
                  },
                  items : [{
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theLoadingListDetail.blNo}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_MFNo'),
                     bind : {
                        value : '{theLoadingListDetail.soNo}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     }
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_SVCLaneOut'),
                     bind : {
                        store : '{svcOutLaneCodeStore}',
                        value : '{theBaplieDetail.outLane}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_2ndVVD'),
                     bind : {
                        store : '{secondVvdStore}',
                        value : '{theBaplieDetail.prevVVD}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingMove'),
                     bind : {
                        store : '{shiftingMoveStore}',
                        value : '{theBaplieDetail.shiftTime}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo1}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo2}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ExportSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo3}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     }
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                        value : '{theBaplieDetail.ovHeight}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                        value : '{theBaplieDetail.ovFore}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                        value : '{theBaplieDetail.ovAft}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                        value : '{theBaplieDetail.ovPort}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                        value : '{theBaplieDetail.ovStbd}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                        value : '{theBaplieDetail.osHeight}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                        value : '{theBaplieDetail.osPort}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                        value : '{theBaplieDetail.osStbd}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                     bind : {
                        value : '{theBaplieDetail.remark}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_TrainUserVoyage'),
                     bind : {
                        store : '{trainUserVoyageStore}',
                        value : '{theBaplieDetail.trnVoy2}',
                        readOnly : '{setReadOnlyBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
