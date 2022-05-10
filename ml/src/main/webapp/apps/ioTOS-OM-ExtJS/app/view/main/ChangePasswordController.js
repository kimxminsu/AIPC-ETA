Ext.define('IoTosOmExt.view.main.ChangePasswordController', {
	extend: 'ESVC.view.foundation.BaseViewController',

	requires: [
		'ESVC.model.common.CheckCommonUser'
	],

	alias: 'controller.changepassword',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PASSWORD_RECOVER : 'R',
	PASSWORD_EXPIRE : 'E',
	PASSWORD_NOMAL : 'N',
	DEFAULT_MODEL : 'ESVC.model.common.CheckCommonUser',	// DETAIL MODEL
	URL_UPDATE : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/v1/session/updatePassword',
	PASSWORD_CONFIG_STORE_NAME : 'changePasswordConfig',	// Password Config Store Name
	passwordConfig : null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onChangePasswordLoad : function(){
		var me = this;
		var recvData = me.getView().recvData;
		var changePwdItem = Ext.create(me.DEFAULT_MODEL);
		var passwordConfigStore = me.getStore(me.PASSWORD_CONFIG_STORE_NAME);
		var window = me.getView().up('window');
		var title = TSB.locale.i18n.Bundle.instance.getMsg('changepassword');

		window.setIconCls('x-fa fa-key');
		window.setTitle(title);

		changePwdItem.phantom = false;
		
		var infoForm = me.getForm();
		infoForm.isValid();
		
		changePwdItem.set('userId', ESVC.config.Token.getUserId());
		
		if(recvData && recvData.mode === me.PASSWORD_RECOVER){
			changePwdItem.set('oldPw', recvData.oldPw);
		}
		
		changePwdItem.commit();
		
		me.getViewModel().setData({thePassword:changePwdItem});
		me.setLabel(recvData);
		
		passwordConfigStore.load({
			callback : function(records){
				if(records && records.length > 0){
					me.setPasswordConfig(records[0]);
				}
			}
		});
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Set Password Config
	setPasswordConfig : function(record){
		var me = this;
		var refs = me.getReferences();
		
		me.passwordConfig = record;
		
		if(me.passwordConfig){
			if(me.passwordConfig.get('minLength') > 0){
				refs.ctlChangePasswordPassword.minLength = me.passwordConfig.get('minLength');
				refs.ctlChangePasswordRetypePassword.minLength = me.passwordConfig.get('minLength');
			}
			
			if(me.passwordConfig.get('maxLength') > 0){
				refs.ctlChangePasswordPassword.maxLength = me.passwordConfig.get('maxLength');
				refs.ctlChangePasswordRetypePassword.maxLength = me.passwordConfig.get('maxLength');
			}
		}
	},
	
	// Check Password Pattern
	checkPasswordPattern : function(newPassword){
		var me = this;
		var upperString = '/[A-Z]/gs';
		var lowerString = '/[a-z]/gs';
		var number = '/[0-9]/gs';
		var specific = new RegExp("[\\\\~`!@#$%^&*()\\-_=+|\\[\\]\\{\\};:'\"<>,.?/]",'gs');
		
		if(me.passwordConfig == null){
			if(newPassword.toUpperCase().match(upperString) == null || newPassword.toUpperCase().match(number) == null)
			{
				return false;
			}else{
				return true;
			}
		} else {
			var upperLength = newPassword.match(upperString) == null ? 0 : newPassword.match(upperString).length;
			var lowerLength = newPassword.match(lowerString) == null ? 0 : newPassword.match(lowerString).length;
			var numberLength = newPassword.match(number) == null ? 0 : newPassword.match(number).length;
			var specialLength = newPassword.match(specific) == null ? 0 : newPassword.match(specific).length;
			
			if(me.passwordConfig.get('upperNumber') > upperLength 
				|| me.passwordConfig.get('lowerNumber') > lowerLength 
				|| me.passwordConfig.get('digitNumber') > numberLength 
				|| me.passwordConfig.get('specialNumber') > specialLength)
			{
				return false;
			}else
			{
				return true;
			}
		}
	},
	
	// Set Label
	setLabel : function(recvData){
		var me = this;
		var refs = me.getReferences();
		var mode;
		
		if(recvData){
			mode = recvData.mode;
		}

		if(mode === me.PASSWORD_RECOVER){
			refs.ctlChangePasswordExpirePwd.setVisible(false);
			refs.ctlChangePasswordOldPassword.setVisible(false);
			refs.ctlChangePasswordOldPassword.allowBlank = true;
		} else if(mode === me.PASSWORD_EXPIRE){
			refs.ctlChangePasswordRecoverPwd.setVisible(false);
		} else {
			refs.ctlChangePasswordRecoverPwd.setVisible(false);
			refs.ctlChangePasswordExpirePwd.setVisible(false);
		}
	},
	
	// Change Password Validation
	changePasswordValidation : function(){
		var me = this;
		var changePwdItem = me.getViewModel().get('thePassword');
		var userId = changePwdItem.get('userId');
		var oldpw = changePwdItem.get('oldPw');
		var pw = changePwdItem.get('pw');
		var rePw = changePwdItem.get('rePw');
		
		if(me.checkPasswordPattern(changePwdItem.get('pw')) === false){
			MessageUtil.info('Information', MessageConstants.ADMIN_CHAR_NUMBER);
			return false;
		}else if (pw !== rePw) {
			MessageUtil.info('Information', MessageConstants.ADMIN_PASSWORD);
			return false;
		}else if(oldpw === pw) {
			MessageUtil.info('Information', MessageConstants.ADMIN_SAMEPASSWORD);
			return false;
		}else if(pw === userId) {
			MessageUtil.info('Information', MessageConstants.ADMIN_SAME_IDPASS);
			return false;
		}
		
		return true;
	},
	
	// Build DataItem
	buildDataItem : function(dataItem){
		var me = this;
		var recvData = me.getView().recvData;
		var returnItem = dataItem.copy();
		var encodeOldPw = Ext.util.Base64.encode(returnItem.get('oldPw'));
		var encodePw = Ext.util.Base64.encode(returnItem.get('pw'));
		
		returnItem.set('oldPw', encodeOldPw);
		returnItem.set('pw', encodePw);
		returnItem.set('id', ESVC.config.Token.getStaffCD());
		returnItem.set('userType', ESVC.config.Token.getUserType());

		return returnItem;
	},
		
	// Detail Save
	onDetailSave : function(){
		var me = this;
		var window = me.getView().up('window');
		var changePwdItem = me.getViewModel().get('thePassword');
		var infoForm = me.getForm();
		var recvData = me.getView().recvData;
		
		if(infoForm.isValid()){
			if(changePwdItem.dirty){
				if(me.changePasswordValidation() === true){
					var proxy = changePwdItem.getProxy();
					proxy.url = me.URL_UPDATE;
					
					var dataItem = me.buildDataItem(changePwdItem);
					
					dataItem.save({
						success : function(record, operation) {
							MessageUtil.saveSuccess(); // Success Message
							
							MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
								function(button){
									window.close();
									
									if(recvData && recvData.loginView){
										recvData.loginView.close();
									}
								}
							);
						}
					});
				}
			}
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	// Get Form
	getForm : function(){
		var me = this;
		var detailView = me.lookupReference('app-changepassword');
		var infoForm = null;
		
		if(detailView == null){
			infoForm = me.getView();
		} else {
			infoForm = detailView.down('form');
		}
		
		return infoForm;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});