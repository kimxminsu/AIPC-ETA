Ext.define('IoTosOmExt.view.code.ErrorCodeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-errorcodedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:750,
	height:140,
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
				items: [{ // 1
					xtype: 'container',
					flex: 1,
					defaults: {
						margin: '0 5 5 5',
						labelAlign: 'right',
						labelWidth: 80
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype:'textfield',
						reference:'ctlErrorCodeDetailErrCode',
						fieldLabel: ViewUtil.getLabel('errorCode'),
						maxLength: 10,
						enforceMaxLength : true,
						allowBlank: false,
						width:240,
						fieldStyle: 'text-transform:uppercase',
						bind : '{theDetail.errCode}',
						listeners:{
							change: 'onUpperCase'
						}
					},{
						xtype: 'tcombobox',
						reference: 'ctlErrorCodeDetailMsgId',
						param: PopupServiceConstants.MSG_ID,
						fieldLabel: ViewUtil.getLabel('messageEdi'),
						displayField: 'codeName',
						labelWidth: 80,
						width : 230,
						bind: {
							value : '{theDetail.msgId}'
						}
					},{
						xtype: 'tcombobox',
						reference: 'ctlErrorCodeDetailErrorType',
						param: CacheServiceConstants.ERROR_TYPES,
						comboMode: CommonConstants.TCOMBO_MODE_LOCAL,
						fieldLabel: ViewUtil.getLabel('errorType'),
						allowBlank: false,
						displayField: 'codeName',
						labelWidth: 80,
						width : 235,
						bind: {
							value : '{theDetail.errType}'
						}
					}]
		      },{ // 2
					xtype: 'container',
					flex: 1,
					defaults: {
						margin: '0 5 5 5',
						labelAlign: 'right',
						labelWidth: 80
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{
						xtype:'textfield',
						reference:'ctlErrorCodeDetailErrName',
						fieldLabel: ViewUtil.getLabel('errorName'),
						maxLength: 256,
						enforceMaxLength : true,
						allowBlank: false,
						fieldStyle: 'text-transform:uppercase',
						bind : '{theDetail.errName}',
						listeners:{
							change: 'onUpperCase'
						}
					}]
				},{ // 3
					xtype: 'container',
					flex: 1,
					defaults: {
						margin: '0 5 5 5',
						labelAlign: 'right',
						labelWidth: 80
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{
						xtype:'textfield',
						reference:'ctlErrorCodeDetailErrReason',
						fieldLabel: ViewUtil.getLabel('errorReason'),
						maxLength: 4000,
						enforceMaxLength : true,
						bind : '{theDetail.errReason}'
					}]
				}]
		   }]
		});
		me.callParent();
	}
});
