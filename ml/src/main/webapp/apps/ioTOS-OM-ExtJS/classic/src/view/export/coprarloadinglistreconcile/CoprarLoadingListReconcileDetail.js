Ext.define('IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcileDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-coprarloadinglistreconciledetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:1300,
	height:780,
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
                     labelWidth: 100
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
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_BookingNo'),
                     bind : {
                        value :'{theCoprarDetail.bookingNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theCoprarDetail.blNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SoNo'),
                     bind : {
                        value : '{theCoprarDetail.soNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
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
                        readOnly : '{setReadOnlyCoprarComponent}',
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
                        value : '{theCoprarDetail.shiftAcc}',
                        readOnly : '{setReadOnlyCoprarComponent}',
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
                        readOnly : '{setReadOnlyCoprarComponent}',
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
                        readOnly : '{setReadOnlyCoprarComponent}',
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
                        value : '{theCoprarDetail.pod}',
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
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
                     readOnly : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthNo'),
                     bind : {
                        value : '{theCoprarDetail.vgmAuthNo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthDate'),
                     bind : {
                        value : '{theCoprarDetail.vgmDate}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthPerson'),
                     bind : {
                        value : '{theCoprarDetail.vgmPersonInfo}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     }
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 105
                  },
                  items : [{
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
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TransTypeIn'),
                     bind : {
                        store : '{transTypeStore}',
                        value : '{theCoprarDetail.transType}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
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
                     hideTrigger : true,
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
                  },{
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
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
                     bind : {
                        value : '{theCoprarDetail.sealNo1}',
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
                     hideTrigger : true,
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
                     hideTrigger : true,
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
                     hideTrigger : true,
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
                     hideTrigger : true,
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
                     hideTrigger : true,
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
                     hideTrigger : true,
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
                     hideTrigger : true,
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                     bind : {
                        value : '{theCoprarDetail.remark}',
                        readOnly : '{setReadOnlyCoprarComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     hideTrigger : true,
                  }]
               }]
		      },{
               xtype: 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_LoadingList'),
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
                     labelWidth: 100
                  },
                  items : [{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
                     bind : {
                        value : '{theLoadingListDetail.cntrNo}',
                     },
                     readOnly : true
                  },{
                     xtype:'textfield',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_BookingNo'),
                     bind : {
                        value : '{theLoadingListDetail.bookingNo}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
                     bind : {
                        value : '{theLoadingListDetail.blNo}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SoNo'),
                     bind : {
                        value : '{theLoadingListDetail.soNo}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
                     bind : {
                        store : '{feCodeStore}',
                        value : '{theLoadingListDetail.fe}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                     reference : 'ctlLoadingListSztp',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                     bind : {
                        value : '{theLoadingListDetail.sztp}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                     reference : 'ctlLoadingListSztp2',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                     bind : {
                       value : '{theLoadingListDetail.sztp2}',
                     },
                     readOnly : true,
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender',
                     },
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                     bind : {
                        store : '{oprCodeStore}',
                        value : '{theLoadingListDetail.ptnrCode}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                        value : '{theLoadingListDetail.shiftAcc}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POR'),
                     bind : {
                        store : '{porCodeStore}',
                        value : '{theLoadingListDetail.por}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local',
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                     bind : {
                        store : '{polCodeStore}',
                        value : '{theLoadingListDetail.pol}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                        value : '{theLoadingListDetail.pod}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                        value : '{theLoadingListDetail.fpod}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
                     bind : {
                        store : '{fDestCodeStore}',
                        value : '{theLoadingListDetail.fdest}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'code',
                     queryMode : 'local'
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
                     bind : {
                        value : '{theLoadingListDetail.wgt}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
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
                        value : '{theLoadingListDetail.vgm}',
                     },
                     readOnly : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthNo'),
                     bind : {
                        value : '{theLoadingListDetail.vgmAuthNo}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthDate'),
                     bind : {
                        value : '{theLoadingListDetail.vgmDate}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthPerson'),
                     bind : {
                        value : '{theLoadingListDetail.vgmPersonInfo}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  }]
               },{
                  xtype : 'container',
                  layout : {
                     type : 'vbox',
                  },
                  defaults: {
                     labelAlign: 'right',
                     labelWidth: 105
                  },
                  items : [{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_CargoType'),
                     bind : {
                        store : '{cargoTypeStore}',
                        value : '{theLoadingListDetail.cargoType}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                     allowBlank : false,
                     listeners : {
                        beforerender : 'onComponentBeforeRender'
                     },
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_TransTypeIn'),
                     bind : {
                        store : '{transTypeStore}',
                        value : '{theLoadingListDetail.transType}',
                        readOnly : '{setReadOnlyLoadingListComponent}',
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
                        value : '{theLoadingListDetail.setTempC}',
                        readOnly : '{setReadOnlyLoadingListComponent}',
                     },
                     maxLength : 9,
                     enforceMaxLength : true,
                     maxValue : 999999.99,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     reference : 'ctlLoadingListImdg',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
                     bind : {
                        value : '{theLoadingListDetail.imdg}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'textfield',
                     reference : 'ctlLoadingListUnno',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
                     bind : {
                        value : '{theLoadingListDetail.unno}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
                     bind : {
                        store : '{loadingListPackingGroupStore}',
                        value : '{theLoadingListDetail.packingGrp}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'remote'
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_HandlingInstS'),
                     bind : {
                        store : '{handleInstrCodeStore}',
                        value : '{theLoadingListDetail.handleInstr}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype:'combobox',
                     fieldLabel: ViewUtil.getLabel('WRD_CTOM_Delivery'),
                     bind : {
                        store : '{deliveryCodeStore}',
                        value : '{theLoadingListDetail.delv}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     valueField : 'code',
                     displayField : 'name',
                     queryMode : 'local',
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
                     bind : {
                        value : '{theLoadingListDetail.sealNo1}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
                     bind : {
                        value : '{theLoadingListDetail.ovHeight}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
                     bind : {
                        value : '{theLoadingListDetail.ovFore}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
                     bind : {
                        value : '{theLoadingListDetail.ovAft}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
                     bind : {
                        value : '{theLoadingListDetail.ovPort}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
                     bind : {
                        value : '{theLoadingListDetail.ovStbd}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
                     bind : {
                        value : '{theLoadingListDetail.osHeight}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
                     bind : {
                        value : '{theLoadingListDetail.osPort}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'numberfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
                     bind : {
                        value : '{theLoadingListDetail.osStbd}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     },
                     maxLength : 5,
                     enforceMaxLength : true,
                     allowDecimals : false,
                     hideTrigger : true
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                     bind : {
                        value : '{theLoadingListDetail.remark}',
                        readOnly : '{setReadOnlyLoadingListComponent}'
                     }
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
