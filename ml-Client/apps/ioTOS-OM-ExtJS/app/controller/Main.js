Ext.define('IoTosOmExt.controller.Main', {
	extend: 'Ext.app.Controller',

    requires: [
		'IoTosOmExt.view.main.Main',
		'IoTosOmExt.config.Locale',
		],
	
	uses : [
        'Ext.window.Toast'
	],

	refs: [
	       { ref: 'mainmenu', selector: 'app-mainmenu' },
	       { ref: 'appMain', selector: 'app-main' }
	],
	
	listen: {
		component: {
			'*': {
				toastMessage: 'onToastMessage'
			}
		},
		controller: {
			'*': {
				toastMessage: 'onToastMessage'
			}
		}
	},
	
	onToastMessage: function(message, title, type, modal, isNotLocale, appendMessage) {
		var icon;
		if(type === 'alert') {
			icon = 'x-fa fa-exclamation-circle';
		} else if(type === 'warn') {
			icon = 'x-fa fa-exclamation-triangle';
		}
		
		var toastMessage = isNotLocale ? message : IoTosOmExt.getApplication().bundle.getMsg(message);
		if(appendMessage) {
			toastMessage += '<br>' + appendMessage;
		}
		
		if(modal) {
			Ext.MessageBox.show({
	            title: title,
	            msg: toastMessage,
	            buttons: Ext.MessageBox.OK,
	            scope: this,
	            icon: type === 'warn' ? Ext.MessageBox.WARNING : Ext.MessageBox.ERROR
	        });
		} else {
			Ext.toast({
				html: toastMessage,
				title: title,
				iconCls: icon,
				closable: true,
				align: 't',
				slideInDuration: 300,
				minWidth: 400,
				// hideDuration: 5000	//Do not set this value. it will impact closable
			});
		}
	},

	
	init: function() {
		var me = this;
		
		// console.log('window.location.protocol = ' + window.location.protocol);
		// console.log('window.location.hostname = ' + window.location.hostname);
		// console.log('window.location.host = ' + window.location.host);
		// console.log('window.location.origin = ' + window.location.origin);
		// console.log('window.location.pathname = ' + window.location.pathname);
		
		//Load 
		Ext.Loader.loadScript({
			url: './resources/js/VTypes.js',
			scope: this,
			onLoad : function(){
				console.log('##### Load VType OK');
			},
			onError : function(){
				console.log('##### Load VType Failed');
			}
		});
		
		//Prefer localStorage due to size of data
		if (Ext.supports.LocalStorage) {
			Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
		} else {
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		}
		
		
		Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e) {
			//prevent to goto prev page by backspace key
			if ((e.getTarget().type != 'text' && e.getTarget().type != 'search' && e.getTarget().type != 'password' && e.getTarget().type != 'textarea') && e.getKey() == '8') {
				e.preventDefault();
			}
			
			//prevent to goto prev page by ctrl/command + leftarrow key
			if(e.getKey() == '8' && e.ctrlKey) {
				e.preventDefault();
			}
			
			if (e.altKey && e.getTarget().type != 'text' && e.getTarget().type != 'search' && e.getTarget().type != 'password' && e.getTarget().type != 'textarea') {
				me.fireEvent('vesselExplorerKeyDown', e);
			}
		});
		
		//Set Title with Version
		if(CONSTANTS.VERSION)
		{
			Ext.getDoc().dom.title = CONSTANTS.PROJECT_TITLE + ' v' + CONSTANTS.VERSION;
		}else
		{
			Ext.getDoc().dom.title = CONSTANTS.PROJECT_TITLE + ' v' + Ext.manifest.version;
		}
		//Ext.versions.ext.version : framework version
		
		//Stop spinner
		var initSpinner = document.getElementById('initSpinner');
		initSpinner.style.display = 'none';

		if((location.host).indexOf('1841') > 0){// dev Mode
			/* 2. 로그인 생략: 개발자용 (빌드시 아래 주석)*/
			me.fn_startMainApplication('IoTosOmExt.Application', 'TSB', 'SUCCESS');
		}else{
			/* 1. 로그인 & 메인 앱 (빌드 시 아래 주석 해제)*/ 
			me.fn_startMainApplication('IoTosOmExt.Application');
		}
		this.control({
			'app-login': {
				destroy: this.onLoadLocale
			},
		});
	},
	
	fn_startMainApplication : function(appName,userId, uPass){
		var me = this;
		var token;
		var localStorageToken = false;
		var iWebToken = false;
		iWeb.EXT_MAIN_APPLICATION = appName;
		if(location.port == "1841"){ // 개발환경일 때
			if(userId !== undefined && uPass !== undefined){
				me.loadNoLogin(userId, uPass);
			}else{
				fn_viewLogin_();
			}
		}else{ // Build 환경일 때
			token = sessionStorage.getItem("Token"); // Token은 LocalStorage에 저장되어 있음
			if(token){
				localStorageToken = true;
			}
			if(iWeb.OAUTH_ACCESS_TOKEN){
				iWebToken = true;
				if(!localStorageToken){ //만약 localStorageToken과 iWeb.OAUTH_ACCESS_TOKEN 값이 다르다면 localStorage의 값을 우선적으로 사용
					token = iWeb.OAUTH_ACCESS_TOKEN;
				}
			}
			if(localStorageToken || iWebToken) {
				me.onLoadAuthority(token, "bearer");
			} else {
				fn_viewLogin_();
			}
		}
	},
	onLoadAuthority : function(oauth_access_token, tokenType){ // 접근 권한과 사용자 정보를 가져오는 메서드
		var me = this;
		var item = Ext.create('ESVC.model.foundation.CredentialItem');
		item.set('pgmCode', CONSTANTS.PGM_CODE);
		ESVC.config.Token.setPgmCode(CONSTANTS.PGM_CODE);
		ESVC.config.Token.setAccessToken(oauth_access_token);
		ESVC.config.Token.setTokenType(tokenType);
		var proxy = item.getProxy();
		proxy.url = ESVC.config.Locale.getRestApiDestUrl() + iUrl.LOGIN; // LOGiN 이름 수정
		var task = new Ext.util.DelayedTask(function () {
		item.save({
			callback: function(record, operation, success) {
				if(success) {
					var authorityMapItem = record.data.authorityMap;
					ESVC.config.Token.setAccessAuthorityMapItem(record.data.authorityMap.accessAuthorityItems);
					ESVC.config.Token.setProfile(record.data); // KHH - 2019.06.27
					me.onLoadLocale();	// 메인앱 실행
				} else {
					console.log("Failed");
					var msg = "Failed Login";
				}
			}
		});
	});
	task.delay(500);
	},


	
	loadNoLogin: function (userId, uPass) {
		var me = this;
		console.log("loadNoLogin")
		if (!nullChk_(userId) && userId.length > 1) {
			if (uPass !== undefined) {
				iWeb.USER_ID = userId;
				iWeb.USER_ID64 = btoa(userId);		// Base64 Encode
				iWeb.USER_PWD64 = btoa(uPass);
				console.log(iWeb.OAUTH_TOKEN_URI);
				console.log(iWeb.USER_ID64 + ' ' + iWeb.USER_PWD64);
				Ext.Ajax.request({
					url: fn_server_(iWeb.OAUTH_TOKEN_URI),
					params: { grant_type: 'password', username: iWeb.USER_ID64, password: iWeb.USER_PWD64 },
					method: 'POST',
					headers: { 'Authorization': 'Basic ' + iWeb.OAUTH_TOKEN_BASIC },
					success: function (response) {
						console.log("*** oauth.success ***");
						console.log(response.responseText);
						// var authVo = Ext.decode(response.responseText);
						var oAuthResponse = Ext.decode(response.responseText);
						var authVo = oAuthResponse.DefaultOAuth2AccessToken;		// OAuth2 의 Tocken
						fn_oauth_(authVo.access_token, authVo.refresh_token, authVo.expires_in, true);
						
						ESVC.config.Token.setUserId(userId);
						ESVC.config.Token.setStaffCD(userId);
						ESVC.config.Token.setPgmCode(CONSTANTS.PGM_CODE);
						ESVC.config.Token.setAccessToken(authVo.access_token);
						ESVC.config.Token.setTokenType(authVo.token_type);

						var item = Ext.create('ESVC.model.foundation.CredentialItem');

						// item.set('id', 	ESVC.config.Token.getUserId());
						item.set('pgmCode', CONSTANTS.PGM_CODE);
					
						var proxy = item.getProxy();
						proxy.url = ESVC.config.Locale.getRestApiDestUrl() + '/sm/login';
						var task = new Ext.util.DelayedTask(function () {
						item.save({
							callback: function (record, opr, success) {
								if(success) {
									var authorityMapItem = record.data.authorityMap;
									ESVC.config.Token.setAccessAuthorityMapItem(record.data.authorityMap.accessAuthorityItems);
									ESVC.config.Token.setProfile(record.data); // KHH - 2019.06.27
								} 
								me.onLoadLocale();
							}
						});
					});
					task.delay(500);
					},

					failure: function (response) {
						iWeb.USER_ID = "";
						console.log("*** oauth.failure!!! *** " + response.status);
						console.log(response.responseText);
						fn_loginSuccess_(false);
						var msg = '';
						if (response.status === 0) {
							msg = '[Error]: Failed to connect Server';
						} else {
							var err = JSON.parse(response.responseText);
							msg = "response status[" + response.status + "]: " + err.error;
						}
						fn_viewLogin_(msg)
					}
				});
			}
		}
	},
	
	onLoadLocale : function() {
		var me = this;
		var localeStore = Ext.create('IoTosOmExt.store.Locale');
		//TODO: Params should be configurable depending on accessed user info
		localeStore.load({
			params : {
				sysCd : 'ESVC',
				cfgTp : 'LOCALE',
				cfgId : 'TSB',
				keyNm : ''
			},

			callback : function(records, operation,success) {
				console.log('onLoadLocale callback');
				if (success) {
					IoTosOmExt.config.Locale.setLocale(this.findRecord('keyNm', 'locale').data.keyVal);
					IoTosOmExt.config.Locale.setTheme(this.findRecord('keyNm', 'theme').data.keyVal);
					IoTosOmExt.config.Locale.setRtl(this.findRecord('keyNm', 'rtl').data.keyVal === 'Y' ? true : false);
					IoTosOmExt.config.Locale.setTimezone(this.findRecord('keyNm','time_zone').data.keyVal);
					IoTosOmExt.config.Locale.setThousandSeparator(this.findRecord('keyNm','thousand_separator').data.keyVal);
					IoTosOmExt.config.Locale.setDecimalSeparator(this.findRecord('keyNm',	'decimal_separator').data.keyVal);
					IoTosOmExt.config.Locale.setCurrenyPrecision(parseInt(this.findRecord('keyNm','currency_precision').data.keyVal));
					IoTosOmExt.config.Locale.setCurrencySign(this.findRecord('keyNm','currency_sign').data.keyVal);
					IoTosOmExt.config.Locale.setStartDay(parseInt(this.findRecord('keyNm','start_day').data.keyVal));
					IoTosOmExt.config.Locale.setCurrencyCode(this.findRecord('keyNm','currency_code').data.keyVal);
					IoTosOmExt.config.Locale.setDefaultDateFormat(this.findRecord('keyNm','default_date_format').data.keyVal);

					Ext.util.Cookies.set('applanguage',IoTosOmExt.config.Locale.getLocale(),null,'/',null, true);
					Ext.util.Cookies.set('apptheme',IoTosOmExt.config.Locale.getTheme(),null,'/',null, true);
					Ext.util.Cookies.set('apprtl',IoTosOmExt.config.Locale.getRtl(),null,'/',null, true);
					Ext.util.Cookies.set('appstartday',IoTosOmExt.config.Locale.getStartDay(),null,'/',null, true);
					Ext.util.Cookies.set('appdefaultdateformat',IoTosOmExt.config.Locale.getDefaultDateFormat(),null,'/',null, true);

					//Stop spinner
					var initSpinner = document.getElementById('initSpinner');
					initSpinner.style.display = 'none';
					
					Ext.widget('app-main'); //invoke Main screen
				}
			}
		});
	},
	
	onRequestAccessToken: function(authorizationCode){
		var me = this;
		
		var item = Ext.create('ESVC.model.foundation.CredentialItem', {
			accessToken: authorizationCode,
			requestServerName: window.location.hostname
		});
		
		var proxy = item.getProxy();
		proxy.url = IoTosOmExt.config.Locale.getRestApiDestUrl() + '/oauth2/adal/token';
		
		//To prevent global catch for the exception
		Ext.Ajax.suspendEvent('requestexception');
		item.save({
			callback: function(record, operation, success) {
				if(success) {
					ESVC.config.Token.setTokenType('Bearer');
					ESVC.config.Token.setAccessToken(record.data.accessToken);
					ESVC.config.Token.setExpiresInSeconds(record.data.expiresInSec);
					ESVC.config.Token.tokenLifeCycleChecker();
					
					ESVC.config.Token.setUserId(record.data.userId);
					ESVC.config.Token.setPtnrCode(record.data.ptnrCode);
					ESVC.config.Token.setUserLevel(record.data.userLevel);
					ESVC.config.Token.setUserType(record.data.userType);
					
					setTimeout(function(){ 
						me.onLoadLocale();
		        	}, 300);
				} else {
					var jsonString = Ext.decode(operation.error.response.responseText);
					if(jsonString.error.code === 412){
						var failMsg = jsonString.error.message;
						var msg = jsonString.error.exceptionMessage + ". " + "Please contact your administrator.";
						
						Ext.Msg.alert(failMsg, msg, function() {
							Ext.MessageBox.hide();
							location.href = "./";
						});
						
					} else if(jsonString.error.code === 500){
						var exceptionMessage = jsonString.error.exceptionMessage == null ? '' : jsonString.error.exceptionMessage;
						var stackTrace = jsonString.error.stackTrace == null ? '' : jsonString.error.stackTrace;
						
						Ext.widget('app-message', {
							status : jsonString.error.code,
							statusText : jsonString.error.message,
							message : jsonString.error.message,
							exceptionMessage : exceptionMessage,
							stackTrace : stackTrace
						});
						
					} else {
						Ext.toast({
							html: 'The ID or Password entered is incorrect! Please try again.',
							closable: false,
							align: 't',
							slideInDuration: 300,
							minWidth: 400
						});
					}
				}
				
				//Resume global catch for the exception
				Ext.Ajax.resumeEvent('requestexception');
			}		
		})
	}
});