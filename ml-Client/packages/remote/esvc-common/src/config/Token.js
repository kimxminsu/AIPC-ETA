Ext.define('ESVC.config.Token', {
	singleton: true,
	alternateClassName: 'Token',
	
	config: {
		tokenType: '',
		accessToken: '',
		activeCode: '',
		bussinessTel: '',
		expiresInSeconds: -1,
		userGroups: '',
		userId: '',
		userName: '',
		email: '',
		roleId: '',
		userType: '',
		telNo: '',
		mobileNo: '',
		ptnrCode: '',
		roleCode: '',
		userLevel: '',
		ptnrType : '',
		idNo:'',
		userTypeNm: '',
		agencyCode: '',
		deptCd: '',
		deptNm: '',
		addr: '',
		emailAddr: '',
		isSupervisor: '',
		ptnrNm: '',
		holdChk: '',
		accountHold: '',
		isMPTSBreakBulkBilling: '',
		isSystemAdmin: '',
		patnerInfos: null,
		AccessAuthorityMapItem : null,
		controlAuthorityItems : null,
		useAdminGroup: 'N',
		partnerList: null,
		partners: null,
		partnerCode: null,
		partnerType: null,
		staffCD : null,
		groupID : null,
		jpvc:'',
		pgmCode : null
	},

	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},

	getStaffCd : function(viewId){
		var me = Token;
		// var userId = me.getStaffCD();
		var userId = "aipc";
		var pgmCode = me.getPgmCode();

		var length = userId.length;

		if(length<11){
			for(var i=length; i<11; i++){
				userId += ' ';
			}
		}
		
		// '-' 부분 추가 김용진 2020-09-01
		var staffCd = userId + pgmCode + '-' + StringUtil.firstUpperCase(viewId);
		
		if(staffCd.length <=25){
			return staffCd;
		} else {
			return staffCd.substr(0,25);
		}
		
		return staffCd;
		// return 'john';
	},
	
	// Set Profile - KHH - 2019.06.27
	setProfile : function(data){
		ESVC.config.Token.setUserName(data.user.lclNm);
		ESVC.config.Token.setUseAdminGroup(data.useAdminGroup);
		ESVC.config.Token.setUserLevel(data.user.userLevel);
		ESVC.config.Token.setUserType(data.user.userKind);
		ESVC.config.Token.setGroupID(data.user.userGroup);
		ESVC.config.Token.setPartnerList(data.user.partnerList);
		ESVC.config.Token.setPartners(data.user.partnerList);
		ESVC.config.Token.setTelNo(data.user.htelNo);
		ESVC.config.Token.setBussinessTel(data.user.dtelNo);

		// Control Authority
		if(data.authorityMap.controlAuthorityItems){
			ESVC.config.Token.setControlAuthorityItems(data.authorityMap.controlAuthorityItems);
		}

		if(data.user.partnerList && data.user.partnerList.length > 0){
			data.user.partnerList = data.user.partnerList.reverse();
			
			ESVC.config.Token.setPartnerType(data.user.partnerList[0].partnerType);
			ESVC.config.Token.setPartnerCode(data.user.partnerList[0].partnerCode);
		}
		ESVC.config.Token.setStaffCD(data.user.staffCd);
		
		/* 2020-07-10 김용진 */
		// ESVC.config.Token.setPgmCode(data.pgmCode); Token 인증 됬을 시, userId와 pgmCode를 Token.js에 입력해 줌
		ESVC.config.Token.setEmail(data.user.emailAddr);
	},

	tokenLifeCycleChecker: function(){
		var me = Token; 
		if (me.getExpiresInSeconds() > 0){
			//Apply offset -5 mins
			me.tokenLifeCycleCheckTask.delay(me.getExpiresInSeconds() * 1000 - 5 * 60 * 1000);
			console.log('# excute delayed checker function with new token expires in seconds [tokenLifeCycleCheckTask.delay] : ' + me.getExpiresInSeconds());
		}
	},

	tokenLifeCycleCheckTask: new Ext.util.DelayedTask( function() {
		var me = Token;
		
		var item = Ext.create('ESVC.model.foundation.CredentialItem', {
			accessToken: me.getAccessToken(),
			requestServerName: window.location.hostname
		});
		
		var proxy = item.getProxy();
		
		if(CONSTANTS.AUTH_TYPE === 'AAD') {
			proxy.url = ESVC.config.Locale.getRestApiDestUrl() + '/oauth2/adal/newtoken';
		}else{
			proxy.url = ESVC.config.Locale.getRestApiDestUrl() + '/auth/newtoken';
		}
		
		item.save({
            callback: function(record, operation, success) {
            	if(success) {
					ESVC.config.Token.setAccessToken(record.data.accessToken);
					ESVC.config.Token.setExpiresInSeconds(record.data.expiresInSec);
					ESVC.config.Token.tokenLifeCycleChecker();
            	} else {
            		var exceptionMessage = '', stackTrace = '', message = '';
					var response = operation.getError().response;
					var res = Ext.decode(response.responseText, true);
					if(res) {
						message = res.error.message;
						exceptionMessage = res.error.exceptionMessage == null ? '' : res.error.exceptionMessage;
						stackTrace = res.error.stackTrace == null ? '' : res.error.stackTrace;
					}
					
					ESVC.config.Token.tokenLifeCycleCheckTask.cancel();
					if(CONSTANTS.AUTH_TYPE === 'AAD') {
						window.location.reload();
					} else {
						Ext.widget('app-lock');
					}
            	}
            }
		});
	})
});