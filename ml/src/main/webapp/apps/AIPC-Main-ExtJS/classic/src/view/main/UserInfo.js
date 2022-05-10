Ext.define('Aipc.Main.view.main.UserInfo', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-userinfo',
	
	requires: [
		'Aipc.Main.config.Locale'
	],
	
	reference: 'userInfoRef',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	defaults: {
		padding: 10
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PARTNER_TYPE_COMBOBOX_STORE: 'userInfoPartnerTypeCombo',	// PARTNER TYPE COMBO STORE NAME
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	lblUserGroups: {type: 'bundle', key: 'userGroups'},
	lblUserId: {type: 'bundle', key: 'userId'},
	lblUserName: {type: 'bundle', key: 'userName'},
	lblPtnrCode: {type: 'bundle', key: 'partnerCode'},
	lblPtnrType: {type: 'bundle', key: 'partnerType'},
	lblPtnrName: {type: 'bundle', key: 'partnerName'},
	lblUserLevel: {type: 'bundle', key: 'userLevel'},
	lblBusinessTel: {type: 'bundle', key: 'businessTel'},
	lblEmail: {type: 'bundle', key: 'email'},
	
	btnSave: {type: 'bundle', key: 'save'},
	btnChangePassword: {type: 'bundle', key: 'changepassword'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			items: [{
				xtype: 'form',
				items:[{
					layout: {
						type: 'hbox',
						align: 'stretch'
					},					
					items: [{
						padding: '0 5 5 0',	// Top, Right, Bottom, Left
						flex: 1,
						defaults: {
	                        margin: '0 0 5 0',
	                        labelAlign: 'right',
	                        labelWidth: 120,
	                        width: 500
	                    },
						items: [{
							xtype: 'textfield',
							fieldLabel: this.lblUserId,
							name: 'userId',
							reference: 'ctlUserInfoUserId',
							allowBlank: false,
							readOnly: true
						},{
							xtype: 'textfield',
							fieldLabel: this.lblUserName,
							reference: 'ctlUserInfoUserName',
							enforceMaxLength: true,
			    			maxLength : 100,
							readOnly: true
						}, {
							xtype: 'textfield',
							fieldLabel: this.lblUserLevel,
							reference: 'ctlUserInfoUserLevel',
							readOnly: true
						},{
							xtype: 'textfield',
							fieldLabel: this.lblEmail,
							name: 'email',
							reference: 'ctlUserInfoEmail',
							vtype: 'email',
			    			readOnly: true
						},{
							xtype: 'textfield',
							fieldLabel: this.lblPtnrCode,
							reference: 'ctlUserInfoPartnerCode',
							name: 'detailPatnerCode',
							readOnly: true
						},{
		                    xtype: 'combobox',
		                    reference: 'ctlUserInfoPartnerType',
		                    fieldLabel: me.lblPtnrType,
		                    queryMode: 'local',
		                    bind: {
		                    	store: '{' + me.PARTNER_TYPE_COMBOBOX_STORE + '}'
		                    },
		                    displayField: 'displayDescription',
		                    valueField: 'partnerType',
		                    editable:false,
							listeners: {
								select: 'changePartnerType'
							}
		                }]
					}]
				}]
			}],
			
			dockedItems: [
				{
					xtype: 'toolbar',
					items: [{
						xtype: 'button',
						text: me.btnChangePassword,
						iconCls: 'x-fa fa-pencil',
						listeners: {
							click: 'onChangePassword'
						}
					}]
				}
			]
		}); 
		
		this.callParent();
	}
	
});