Ext.define('IoTosOmExt.view.import.bapliereconcile.BaplieReconcileDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-bapliereconciledetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:1200,
	height:640,
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
               title : ViewUtil.getLabel('WRD_CTOM_AdditionalBaplieNEW'),
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
                     reference : 'ctlAddBaplieCntrNo',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theAddBaplieDetail.cntrNo}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'container',
                     defaults: {
                        labelAlign: 'right',
                        labelWidth: 80
                     },
                     layout : 'hbox',
                     margin : '0 0 10 0',
                     items : [{
                        xtype : 'textfield',
                        reference : 'ctlAddBaplieSztp',
                        fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                        bind : {
                           value : '{theAddBaplieDetail.sztp}',
                           readOnly : '{setReadOnlyAddBaplieComponent}',
                        },
                        allowBlank : false,
                        listeners : {
                           beforerender : 'onComponentBeforeRender',
                           change : 'onSztpChange'
                        },
                        maxLength : 4,
                        enforceMaxLength : true,
                        allowOnlyWhitespace : false
                     }]
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBaplieSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theAddBaplieDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     reference : 'ctlAddBaplieOpr',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theAddBaplieDetail.ptnrCode}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
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
                        store : '{ptnrCodeStore}',
                        value : '{theAddBaplieDetail.shiftAcc}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     reference : 'ctlAddBaplieFe',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
                     bind : {
                        store : '{feCodeStore}',
                        value : '{theAddBaplieDetail.fe}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_StorageCode'),
                     bind : {
                        store : '{storageCodeStore}',
                        value : '{theAddBaplieDetail.storageCode}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocD'),
                     bind : {
                        value : '{theAddBaplieDetail.disPos}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 7,
                     enforceMaxLength : true,
                     maskRe : /[0-9]/
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theAddBaplieDetail.delv}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theAddBaplieDetail.pol}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBapliePod',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        value : '{theAddBaplieDetail.pod}',
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
                        value : '{theAddBaplieDetail.fpod}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theAddBaplieDetail.fdest}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     reference : 'ctlAddBaplieWgt',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
                     bind : {
                        value : '{theAddBaplieDetail.wgt}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
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
                        value : '{theAddBaplieDetail.vgm}',
                     },
                     readOnly : true
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
                     reference : 'ctlAddBaplieCargoType',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theAddBaplieDetail.cargoType}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
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
                        value : '{theAddBaplieDetail.setTempC}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBaplieImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theAddBaplieDetail.imdg}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBaplieUnno',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theAddBaplieDetail.unno}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
                     bind : {
                        store : '{addBapliePackingGroupStore}',
                        value : '{theAddBaplieDetail.packingGrp}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingTime'),
                     bind : {
                        store : '{shiftingTimeStore}',
                        value : '{theAddBaplieDetail.shiftTime}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                        value : '{theAddBaplieDetail.ovHeight}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                        value : '{theAddBaplieDetail.ovFore}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                        value : '{theAddBaplieDetail.ovAft}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                        value : '{theAddBaplieDetail.ovPort}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                        value : '{theAddBaplieDetail.ovStbd}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                        value : '{theAddBaplieDetail.osHeight}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                        value : '{theAddBaplieDetail.osPort}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                        value : '{theAddBaplieDetail.osStbd}',
                        readOnly : '{setReadOnlyAddBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  }]
               }]
		      },{
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_BaplieDischargingThruList'),
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
                     reference : 'ctlOldBaplieCntrNo',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theOldBaplieDetail.cntrNo}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlOldBaplieSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theOldBaplieDetail.sztp}',
                        readOnly : '{setReadOnlyOldBaplieComponent}',
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
                     reference : 'ctlOldBaplieSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                        value : '{theOldBaplieDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype : 'combobox',
                     reference : 'ctlOldBaplieOpr',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theOldBaplieDetail.ptnrCode}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
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
                        store : '{ptnrCodeStore}',
                        value : '{theOldBaplieDetail.shiftAcc}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     reference : 'ctlOldBaplieFe',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
                     bind : {
                        store : '{feCodeStore}',
                        value : '{theOldBaplieDetail.fe}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_StorageCode'),
                     bind : {
                        store : '{storageCodeStore}',
                        value : '{theOldBaplieDetail.storageCode}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocD'),
                     bind : {
                        value : '{theOldBaplieDetail.disPos}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 7,
                     enforceMaxLength : true,
                     maskRe : /[0-9]/
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theOldBaplieDetail.delv}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theOldBaplieDetail.pol}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     reference : 'ctlOldBapliePod',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
                     bind : {
                        value : '{theOldBaplieDetail.pod}',
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
                        value : '{theOldBaplieDetail.fpod}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theOldBaplieDetail.fdest}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     reference : 'ctlOldBaplieWgt',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
                     bind : {
                        value : '{theOldBaplieDetail.wgt}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
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
                        value : '{theOldBaplieDetail.vgm}',
                     },
                     readOnly : true
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
                     reference : 'ctlOldBaplieCargoType',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theOldBaplieDetail.cargoType}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
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
                        value : '{theOldBaplieDetail.setTempC}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBaplieImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theOldBaplieDetail.imdg}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     reference : 'ctlAddBaplieUnno',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theOldBaplieDetail.unno}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
                     bind : {
                        store : '{addBapliePackingGroupStore}',
                        value : '{theOldBaplieDetail.packingGrp}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingTime'),
                     bind : {
                        store : '{shiftingTimeStore}',
                        value : '{theOldBaplieDetail.shiftTime}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                        value : '{theOldBaplieDetail.ovHeight}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                        value : '{theOldBaplieDetail.ovFore}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                        value : '{theOldBaplieDetail.ovAft}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                        value : '{theOldBaplieDetail.ovPort}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                        value : '{theOldBaplieDetail.ovStbd}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                        value : '{theOldBaplieDetail.osHeight}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                        value : '{theOldBaplieDetail.osPort}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                        value : '{theOldBaplieDetail.osStbd}',
                        readOnly : '{setReadOnlyOldBaplieComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
