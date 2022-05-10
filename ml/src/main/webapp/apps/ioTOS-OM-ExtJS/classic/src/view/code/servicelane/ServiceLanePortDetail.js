Ext.define('IoTosOmExt.view.code.servicelane.ServiceLanePortDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-servicelaneportdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 420,
   height : 210,
	scrollable: true,
	itemId : 'idServiceLanePortDetail',

	listeners:{
		afterrender: 'onPortDetailLoad'
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
					title : ViewUtil.getLabel('WRD_CTCM_ServiceLanePort'),
					defaults: {
						margin: '0 5 5 5',
                  labelAlign: 'right',
                  labelWidth : 70
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items : [{
                  xtype : 'combobox',
                  reference : 'ctlPortDetailCombo',
						fieldLabel : ViewUtil.getLabel('WRD_CTCM_Port'),
						bind : {
                     store : '{portCodeStore}',
                     value : '{thePortDetail.callingPort}'
                  },
                  displayField : 'code',
                  valueField : 'code',
						queryMode : 'local',
						allowBlank : false
					},
					{
						xtype : 'container',
						layout : 'hbox',
						defaults : {
                     labelAlign : 'right',
                     labelWidth : 70
						},
						items : [{
							xtype : 'textfield',
                     itemId : 'idColorSample2',
                     fieldLabel : ViewUtil.getLabel('WRD_FTCO_Color'),
							value : 'A',
							width: 120,
							editable : false,
						},{
							xtype : 'colorfield',
							reference : 'refPortForeColor',
							itemId : 'idForeColor2',
							width : 120,
							value : '#000000',
							listeners : {
								change : function(obj, value) {
									var field = Ext.ComponentQuery.query('#idColorSample2')[0];
									field.setFieldStyle(
										'font-weight : bold; color : #' + value + '; text-align : center;' + 'text-align : center;'
									);
								}
							},
							bind : '{thePortDetail.portForeColor}'
						},{
							xtype : 'colorfield',
							reference : 'refPortBackColor',
							width: 120,
							value : '#FFFFFF',
							listeners : {
								change : function(obj, value) {
									var sampleField = Ext.ComponentQuery.query('#idColorSample2')[0];
									var foreColorField = Ext.ComponentQuery.query('#idForeColor2')[0];
									sampleField.setFieldStyle(
										'background : #' + value + ';' + 'color : #' + value + ';'
									);
									sampleField.setFieldStyle(
										'font-weight : bold; color : #' + foreColorField.getValue() + ';' + 'text-align : center;'
									);
								}
							},
							bind : '{thePortDetail.portBackColor}'
						}]
               },
               {
                  xtype : 'textfield',
                  fieldLabel : ViewUtil.getLabel('WRD_CTCM_PortPrefix'),
                  bind : {
                     value : '{thePortDetail.portPrefix}'
						},
						maxLength : 1,
						enforceMaxLength : true,
               }
				]
				}]
		   }]
		});
		me.callParent();
	}
});
