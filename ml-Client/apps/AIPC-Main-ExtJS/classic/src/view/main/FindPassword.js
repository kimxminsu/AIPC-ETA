Ext.define('Aipc.Main.view.main.FindPassword', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-findpassword',
	
	requires: [
		'Aipc.Main.view.main.FindPasswordModel',
		'Aipc.Main.view.main.FindPasswordController',
		'Aipc.Main.config.Locale'
	],
	
	title : 'Recovery Password',
	
	width: 440,
	height: 300,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onFindPasswordLoad'
	},
	
	controller: 'findpassword',
	
	viewModel: {
		type: 'findpassword'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	lblQuestion: {type: 'bundle', key: 'find_password_question_msg'},
	lblInput: {type: 'bundle', key: 'find_password_input_msg'},
	lblSuccess: {type: 'bundle', key: 'find_password_success_msg'},
	lblUserId: {type: 'bundle', key: 'userId'},
	lblEmail: {type: 'bundle', key: 'email'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			flex: 1, 
			resizable: false,
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
					xtype: 'container',
					reference: 'ctlStep1',
					height: 200,
					width: 400,
					visible:false,
					layout:{
						type: 'hbox',
						align: 'center',
						pack:'center'
					},
					items:[{
						xtype: 'container',
						height: 50,
						height: 100,
						layout:{
							type: 'hbox',
							align: 'stretch'
						},
						items:[
							{
								xtype: 'image',
								src: './resources/images/icon_lock.png',
								width: 100,
								height: 100,
							}]
					},{
		                    xtype: 'label',
		                    height: 100,
		                    style: 'text-align: left',
		                    reference: 'ctlChangePasswordRecoverPwd',
		                    html: me.lblQuestion
		                }]
				},{
					xtype: 'container',
					reference: 'ctlStep2',
					height: 200,
					layout:{
						type: 'vbox'
					},
					items:[{
						xtype: 'container',
						flex: 1,
						height: 100,
						layout:{
							type: 'hbox'
						},
						items:[
							{
								xtype: 'image',
								src: './resources/images/icon_lock.png',
								width: 100,
								height: 100,
							},
							{
		                    xtype: 'label',
		                    style: 'text-align: center; align: center;',
		                    reference: 'ctlChangePasswordRecoverPwd',
		                    html: me.lblInput,
		                    margin: '50 10 0 0'
		                    	
		                    	//me.lblRecoverPwd
		                }]
					},
				
							{
								xtype: 'container',
								flex: 1,
								width: 430,
								layout:{
									type: 'vbox',
									align: 'end',
									pack: 'center'									
								},
								defaults:{
									margin: '0 0 5 10'
								},
								items:[
									{xtype: 'tbfill'},
									{
										xtype: 'textfield',
										fieldLabel: me.lblUserId,
										width: 265,
										labelWidth: 65,
										allowBlank: false,
										bind: '{thePassword.id}'
									},
									{
										xtype: 'textfield',
										fieldLabel: me.lblEmail,
										width: 250,
										labelWidth: 50,
										allowBlank: false,
										bind: '{thePassword.email}'
				                }]
							}
			
					]
				},
				{
					xtype: 'container',
					reference: 'ctlStep3',
					height: 200,
					width: 400,
					visible:false,
					layout:{
						type: 'hbox',
						align: 'center',
						pack:'center'
					},
					items:[{
						xtype: 'container',
						height: 50,
						height: 100,
						layout:{
							type: 'hbox',
							align: 'stretch'
						},
						items:[
							{
								xtype: 'image',
								src: './resources/images/icon_lock.png',
								width: 100,
								height: 100,
							}]
					},{
		                    xtype: 'label',
		                    style: 'text-align: left',
		                    reference: 'ctlChangePasswordRecoverPwd',
		                    html: me.lblSuccess,
		                    margin: '50 10 0 0'
		                }]
				},
				{
					xtype: 'container',
					flex: 1,
					layout:{
						type: 'hbox',
						pack: 'end'
					},
					defaults:{
						margin: '0 5 0 0'
					},
					items:[
						{xtype:'tbfill'},
						{
							xtype: 'button',
							text: 'Back',
							reference: 'ctlChangePageBackButton',
							width: 80,
							disabled: true,
							listeners:{
								click: {
									fn: 'moveStep'									,
									args:[-1]
								}
							}
						},
						{
							xtype: 'button',
							text: 'Next',
							reference: 'ctlChangePageNextButton',
							width: 80,
							listeners:{
								click:{
									fn: 'moveStep',
									args:[1]
								} 
							}
						},
						{
							xtype: 'button',
							text: 'Cancel',
							reference: 'ctlCloseButton',
							width: 80,
							listeners:{
								click: 	'onClose'
							}
						}
					]
				}
				
				
			]
		});
		me.callParent();
	}
});