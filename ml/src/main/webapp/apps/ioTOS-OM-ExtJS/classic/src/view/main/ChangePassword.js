Ext.define('IoTosOmExt.view.main.ChangePassword', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-changepassword',
	
	requires: [
		'IoTosOmExt.view.main.ChangePasswordModel',
		'IoTosOmExt.view.main.ChangePasswordController',
		'IoTosOmExt.config.Locale'
	],
	
	title : 'Change Your password',
	
	width: 340,
//	height: 170,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onChangePasswordLoad'
	},
	
	controller: 'changepassword',
	
	viewModel: {
		type: 'changepassword'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	lblUserId: {type: 'bundle', key: 'userId'},
	lblOldPassword: {type: 'bundle', key: 'oldPassword'},
	lblPassword: {type: 'bundle', key: 'password'},
	lblRetypePassword: {type: 'bundle', key: 'reTypePassword'},
	lblRecoverPwd: {type: 'bundle', key: 'CM_0040'},
	lblExpirePwd: {type: 'bundle', key: 'CM_0017'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 0 5', // top, right, bottom, left
				labelWidth: 110,
				labelAlign: 'right'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
                    xtype: 'label',
                    style: 'text-align: center',
                    reference: 'ctlChangePasswordRecoverPwd',
                    html: me.lblRecoverPwd
                },
                {
                    xtype: 'label',
                    style: 'text-align: center',
                    reference: 'ctlChangePasswordExpirePwd',
                    text: me.lblExpirePwd
                },
				{
                    xtype: 'textfield',
                    reference: 'ctlChangePasswordUserId',
                    fieldLabel: me.lblUserId,
                    readOnly: true,
                    bind:'{thePassword.userId}'
                },
				{
                    xtype: 'textfield',
                    inputType: 'password',
                    reference: 'ctlChangePasswordOldPassword',
                    maxLength:10,
                    minLength:7,
                	enforceMaxLength:true,
                    fieldLabel: me.lblOldPassword,
                    allowBlank:false,
                    bind:'{thePassword.oldPw}'
                },
				{
                    xtype: 'textfield',
                    inputType: 'password',
                    reference: 'ctlChangePasswordPassword',
                    maxLength:10,
                    minLength:7,
                	enforceMaxLength:true,
                    fieldLabel: me.lblPassword,
                    allowBlank:false,
                    bind:'{thePassword.pw}'
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    reference: 'ctlChangePasswordRetypePassword',
                    maxLength:10,
                    minLength:7,
                	enforceMaxLength:true,
                    fieldLabel: me.lblRetypePassword,
                    bind:'{thePassword.rePw}',
                    allowBlank:false,
                    margin : '5 5 10 5'
                }
			]
		});
		me.callParent();
	}
});