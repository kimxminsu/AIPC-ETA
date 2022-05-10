Ext.define('IoTosOmExt.view.code.portcode.PortCodeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-portcodedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 380,
   height : 370,
   scrollable: true,
   resizable : false,
	
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
            defaults: {
               margin: '1 1 1 1'
            },
				items: [{
               xtype : 'fieldset',
               autoScroll: true,
               flex: 1,
               layout: {
                  type: 'vbox',
                  align: 'stretch'
               },
               defaults: {
                  labelAlign: 'right',
                  margin: '1 1 1 1'
               },
               items : [{
                  xtype : 'radiogroup',
                  reference : 'ctlPortTypeOption',
                  columns : 2,
                  // listeners : {
                  //    change : 'onPortTypeOptionChange'
                  // },
                  bind : {
                     value : '{theDetail.portTypeOption}'
                  },
                  items : [{
                     boxLabel : ViewUtil.getLabel('WRD_CTOM_UNLocode'),
                     inputValue : 'UNLo',
                     name : 'portTypeOption',
                     checked : true
                  },{
                     boxLabel : ViewUtil.getLabel('WRD_CTOM_OPRPrivateCode'),
                     inputValue : 'OPR',
                     name : 'portTypeOption'
                  }]
               },{
                  xtype : 'combobox',
                  fieldLabel : ViewUtil.getLabel('WRD_CTCM_OPR'),
                  bind : {
                     store : '{partnerCodeStore}',
                     value : '{theDetail.portType}',
                     disabled : '{setDisabledOrReadOnlyWhenUNLo}'
                  },
                  displayField : 'code',
                  valueField : 'code',
                  queryMode : 'local',
                  allowBlank : false,
               },{
                  xtype : 'textfield',
                  reference : 'ctlCntryCd',
                  // name : 'cntryCd',
                  fieldLabel : ViewUtil.getLabel('WRD_CTOM_CountryCode'),
                  bind : {
                     value : '{theDetail.cntryCd}',
                  },
                  allowBlank : false,
                  maxLength : 2,
                  enforceMaxLength : true,
                  allowOnlyWhitespace : false,
               },{
                  xtype : 'textfield',
                  reference : 'ctlPortCd',
                  // name : 'portCd',
                  fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNLocode'),
                  bind : {
                     value : '{theDetail.portCd}'
                  },
                  allowBlank : false,
                  maxLength : 3,
                  enforceMaxLength : true,
                  allowOnlyWhitespace : false,
               },{
                  xtype : 'textfield',
                  reference : 'ctlPortCode',
                  // name : 'portCode',
                  fieldLabel : ViewUtil.getLabel('WRD_CTCM_PortCode'),
                  bind : {
                     value : '{theDetail.portCode}',
                     readOnly : '{setDisabledOrReadOnlyWhenUNLo}'
                  },
                  maxLength : 3,
						enforceMaxLength : true,
               },{
                  xtype : 'fieldset',
                  title : ViewUtil.getLabel('WRD_CTCM_UNLoCode'),
                  autoScroll: true,
                  // flex: 1,
                  layout: {
                     type: 'vbox',
                     align: 'stretch'
                  },
                  defaults: {
                     labelAlign: 'right',
                     margin: '1 1 1 1'
                  },
                  items : [{
                     xtype : 'container',
                     layout : {
                        type : 'hbox',
                        // pach : 'center'
                     },
                     items : [{
                        xtype : 'textfield',
                        itemId : 'idColorSample',
                        value : 'A',
                        width: 50,
                        editable : false,
                        bind : {
                           disabled : '{setDisabledOrReadOnlyWhenOPR}'
                        }
                     },{
                        xtype : 'colorfield',
                        itemId : 'idForeColor',
                        name : 'foreColor',
                        width : 120,
                        value : '#000000',
                        listeners : {
                           change : function(obj, value) {
                              var field = Ext.ComponentQuery.query('#idColorSample')[0];
                              field.setFieldStyle(
                                 'font-weight : bold; color : #' + value + '; text-align : center;' + 'text-align : center;'
                              );
                           }
                        },
                        bind : {
                           value : '{theDetail.foreColor}',
                           disabled : '{setDisabledOrReadOnlyWhenOPR}'
                        }
                     },{
                        xtype : 'colorfield',
                        name : 'backColor',
                        width: 120,
                        value : '#FFFFFF',
                        listeners : {
                           change : function(obj, value) {
                              var sampleField = Ext.ComponentQuery.query('#idColorSample')[0];
                              var foreColorField = Ext.ComponentQuery.query('#idForeColor')[0];
                              sampleField.setFieldStyle(
                                 'background : #' + value + ';' + 'color : #' + value + ';'
                              );
                              sampleField.setFieldStyle(
                                 'font-weight : bold; color : #' + foreColorField.getValue() + ';' + 'text-align : center;'
                              );
                           }
                        },
                        bind : {
                           value : '{theDetail.backColor}',
                           disabled : '{setDisabledOrReadOnlyWhenOPR}'
                        }
                     }]
                  },{
                     xtype : 'textfield',
                     fieldLabel : 'Port Authority Code',
                     bind : {
                        value : '{theDetail.cityCode}',
                        readOnly : '{setDisabledOrReadOnlyWhenOPR}'
                     },
                     maxLength : 6,
						   enforceMaxLength : true,
                  },{
                     xtype : 'textfield',
                     fieldLabel : 'Port Name',
                     bind : {
                        value : '{theDetail.portNm}',
                        readOnly : '{setDisabledOrReadOnlyWhenOPR}'
                     }
                  },{
                     xtype : 'textfield',
                     fieldLabel : 'Prefix',
                     bind : {
                        value : '{theDetail.portPrefix}',
                        readOnly : '{setDisabledOrReadOnlyWhenOPR}'
                     },
                     maxLength : 1,
						   enforceMaxLength : true,
                  }]
               }]
            }]
		   }]
		});
		me.callParent();
	}
});
