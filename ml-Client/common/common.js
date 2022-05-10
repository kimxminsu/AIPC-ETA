/* WEB PGMCODE 상수 */
var PGMCODE = {
	BM : 'BM', // Berth Monitoring
	BP : 'BP', // Berth Planning
	BL : 'BL', // Billing
	CF : 'CF', // CFS
	CM : 'CM', // Customs Management
	DG : 'DG', // DG Cargo Operation
	DR : 'DR', // Delivery Reservation
	ED : 'ED', // EDI
	GT : 'GT', // Gate
	GC : 'GC', // Gate Checker
	OM : 'OM', // Operation Management
	PG : 'PG', // Purge
	QC : 'QC', // QC Driver
	RF : 'RF', // Reefer Cargo Operation
	RE : 'RE', // Reefer Checker (HHT)
	RM : 'RM', // Remarshalling
	RS : 'RS', // Resource Management
	SM : 'SM', // Security Management
	SP : 'SP', // Ship Planning
	ST : 'ST', // Statistics
	TC : 'TC', // Tally (HHT)
	TA : 'TA', // Tally (VMT)
	TM : 'TM', // Terminal Monitoring
	CD : 'CD', // Vessel Define
	WO : 'WO', // Web IP
	YD : 'YD', // Yard Define
	YQ : 'YQ', // Yard Equipment (VMT)
	YP : 'YP', // Yard Planning
	YT : 'YT', // Yard Tractor (VMT)
}

/* WEB Operation 상수 */
if((location.host).indexOf('1841') > 0){
	var url = "http://localhost";
}else if((location.host).indexOf('8443') > 0){ //build 모드
	var url = "https://" + location.host;
}else{
	var url = "http://" + location.host;
}

var iWeb = {
	URL: url,		// Server Url, default = ''
	OK_: 1,
	UNKNOWN_: 0,
	ERROR_: -1,
	ERR_REF_NEED_: -9,				// if refresh is need or not
	
    LOGIN_FM: "/common/login-fm",
    LOGIN_PROC: "/common/login-proc",
    LOGOUT_PROC: "/common/logout-proc",
	LOGIN_SUCCESS: false,
	
	CSRF_HeaderName : "",			// CSRF 정보
	CSRF_ParmName : "",
	CSRF_Token : "",
	
	USER_ID: '',
    USER_ID64: '',
    USER_PWD64: '',

	EXT_MAIN_APPLICATION: '',						// 모듈의 시작 메인 Application

	EXT_JS_MAIN: "/extjs/Main/index",				// Main Desktop
	EXT_JS_DM: "/extjs/DM/index",					// Data Management/Terminal Define
	EXT_JS_SP: "/extjs/SP/index",					// Ship Planning			
	EXT_JS_QCT: "/extjs/QCT/index",					// Qc Driver (QC Checker)
	EXT_JS_DR: "/extjs/DR/index",					// Delivery Reservation(DR)
	EXT_JS_OP_REEFER: "/extjs/RF/index",		// Reefer Operation
	EXT_JS_OP_GATE: "/extjs/GT/index",			// Gate Operation
	EXT_JS_OP_DG: "/extjs/DG/index",				// DG Operation
	EXT_JS_OM: "/extjs/OM/index",					// Operation Management(OM)
	EXT_JS_TM: "/extjs/TM/index",					// Terminal Monitoring(TM)
	EXT_JS_YP: "/extjs/YP/index",					// Yard Planning(YP)
 
    CRUD_C: "C",
    CRUD_R: "R",
    CRUD_L: "L",	// List (with Search)
    CRUD_U: "U",
    CRUD_D: "D",
    
    OAUTH_TOKEN_URI: '/oauth/token',
    OAUTH_TOKEN_BASIC: 'aW90b3Nfam9objpzdWNjZXNz',		// 개발자용: Credential_ID/Secret
    OAUTH_ACCESS_TOKEN: '',								// OAUTH
    OAUTH_REFRESH_TOKEN: '',
    OAUTH_EXPIRES_IN: 0,
	
	//RSA
	PUBLIC_KEY_MODULUS: '',
	PUBLIC_KEY_EXPONENT: '',

	WS_WEBSOCKET_URL: '/ws/connect-websocket',			// WebSocket 접속 주소
	WS_WEBSOCKET_TOPIC_PREFIX: '/ws/topic',				// 수신
	WS_WEBSOCKET_PUB_PREFIX: '/ws/pub',					// 송신
	WS_WEBSOCKET_TOPIC_ALL: '/ws/topic/all',
	WS_WEBSOCKET_TOPIC_TM: '/ws/topic/tm',			//TM

	WEB_TITLE: "ioTOS TotalSoftBank!",

	WEB_JARS_JQUERY: "/webjars/jquery/jquery.min.js",
	WEB_JARS_SOCKJS: "/webjars/sockjs-client/sockjs.min.js",
	WEB_JARS_STOM: "/webjars/stomp-websocket/stomp.min.js",

	MENU_WIDTH: 250,									// 좌측 메뉴 설정
	MENU_MICRO_WIDTH: 64,
    HEADER_HEIGHT: 45
};

/* 접속 URL 통합 관리 상수 */
var iUrl = {
	/* Data Managerment Url   -------------- */
	DM_TB_TMNL: "/dm/tmnlInfo",
	DM_TB_AREA: "/dm/area",
	DM_TB_BERTH: "/dm/berth",
	DM_TB_BERTH_LANE: "/dm/berthLane",
	DM_TB_BITT: "/dm/bitt",
	DM_TB_BLOCK: "/dm/block",
	DM_TB_BLOCK_USE: "/dm/blockUse",
	DM_TB_BLOCK_CFG: "/dm/blockCfg",
	DM_TB_HNO: "/dm/hno",
	DM_TB_VNO: "/dm/vno",
	DM_TB_YSLOT: "/dm/yslot",
	DM_TB_YSLOT_USAGE: "/dm/yslotUsage",
	DM_TB_FACILITY: "/dm/facility",
	
	DM_IOT_DEVICE: "/iot/device",
	DM_IOT_MESSAGE: "/iot/message",
	DM_IOT_CONFIG: "/iot/config",
	DM_IOT_CONFIG_UPDATE: "/iot/updateCfg",
	DM_IOT_DEVICE_XY: "/iot/device_xy",	/* Berth 기준 X,Y 좌표 포함 Device 위치정보 */
	DM_IOT_CHECK_LOG: "/iot/iotCheckingLog",	
	
	MAP_BPT_MAP: "/map.html",
		
	PORTINFO : '/main/portinfo',
	/********************** DM **********************/
	/********************** DR **********************/
   	/********************** OM **********************/
   OM_MASTER_CODE : '/om/common/codegeneral/codefrommaster',
   OM_COUNTRY_CODE : '/om/common/codegeneral/countrycode',
   OM_PARTNER_CODE : '/om/common/codegeneral/partnercode',
   OM_SERVICELANE_CODE : '/om/common/codegeneral/servicelanecode',
   OM_VSLSCH_VSL_CD : '/om/common/vesselschedule/vesselvslcd',
   OM_VSLSCH_CALL_SEQ : '/om/common/vesselschedule/vesselcallseq',

   OM_GENERAL_CODE: '/om/code/generalcode/generalcode',
   
   OM_CONTAINER_TYPE_CODE : '/om/code/containertypesize/containertypecode',
   OM_CONTAINER_SIZE_CODE : '/om/code/containertypesize/containersizecode',
   OM_CONTAINER_TYPE_SIZE_CODE : '/om/code/containertypesize/containertypesizecode',
   OM_OPERATOR_CODE : '/om/code/containertypesize/opeartorcode',

   OM_PORT_CODE : '/om/code/portcode/portcode',
   
   OM_SERVICELANE_DATA : '/om/code/servicelane/servicelanedata',
   OM_SERVICELANE_PORT : '/om/code/servicelane/servicelaneport',

   OM_PARTNER_CODE : '/om/code/partnercode/partnercode',
   OM_PARTNER_PERSON : '/om/code/partnercode/partnerperson',
   OM_PARTNER_AGENCY : '/om/code/partnercode/partneragency',

   OM_YARDDEFINE_BERTH : '/om/yarddefine/berth/berthcode',

   OM_PRIVATE_VOYAGE_VSLSCH : '/om/code/privatevoyage/vesselschedule',
   OM_PRIVATE_VOYAGE_OPR : '/om/code/privatevoyage/operator',

   OM_BOOKING_LIST : '/om/export/bookinglist/bookinglist',
   OM_BOOKING_LIST_DETAIL : '/om/export/bookinglist/bookinglistdetail',
   OM_BOOKING_LIST_GATE_IN_DETAIL : '/om/export/bookinglist/bookinglistgateindetail',

  

	/********************** OP **********************/

	/********************** SM **********************/
	/* USER */
	SM_TB_STAFF: "/sm/user/staff/searchItems",
	SM_TB_GROUP: "/sm/user/group/searchItems",
	USERTREE: "/sm/user/usertree/searchItems",

	/*PROGRAM */
	PGMCODE: "/sm/program/programcode/searchItems",
	SM_TB_BASICDEFINE: "/sm/program/programdefine/searchItems",
	SM_TB_BASICDEFINE_CTRL: "/sm/program/programcontrol/searchItems",
	SM_TB_BASICDEFINE_PROPERTY: "/sm/program/programproperty/searchItems",
	GROUPAUTHORITY: "/sm/user/groupauthority/searchItems", // 그룹 권한 가져오기

	/*AUTHORITY*/
	SM_TB_APPACCESS: "/sm/authority/appaccess/searchItems",
	SM_ACCESSROLEBYCONTOL: "/sm/authority/accessrolebycontrol/searchItems",
	SM_ACCESSROLEBYMENU: "/sm/authority/accessroleMenu/searchItems",
	SM_TB_ACCESSROLE: "/sm/authority/accessrole/searchItems",
	SM_TB_ACCESSROLECTRL: "/sm/authority/accessrolectrl/searchItems",


	PROGRAMSETTING: "/sm/programsetting",
	LOGINSTAFFINFO: "/sm/staffinfo",
	LOGINSTAFFMENU: "/sm/staffmenu",
	LOGINSTAFFCONTROL: "/sm/staffcontrol",





	/*LOGIN*/
	LOGIN: "/sm/login", //2020603 김용진 추가

	/*REFRENCE */
	SM_TB_FUNCTIONCLASSIFY: "/sm/functionclassify",

	/********************** TM **********************/
	TM_BLOCK_LIST : '/tm/config/BlockAreaConfiguration/blocklist',
	TM_BLOCK_AREA_LIST : '/tm/config/BlockAreaConfiguration/blockAreaList',
	TM_C3IT_CONNECT : '/tm/c3itconnect',
	TM_BLOCK_CONFIGURATION_DEFAULT : '/tm/config/BlockAreaConfiguration/defaultConfiguration',
	TM_BLOCK_CONFIGURATION_LIST : '/tm/config/BlockAreaConfiguration/configurationList',
	TM_BLOCK_DETAIL_CONFIGURATION : '/tm/config/BlockAreaConfiguration/detailConfiguration',
	TM_UPDATE_BLOCK_CONFIGURATION : '/tm/config/BlockAreaConfiguration/updateblockconfig',
	TM_UPDATE_ALL_BLOCK_CONFIGURATION : '/tm/config/BlockAreaConfiguration/updateallblockconfig',
	TM_EQUIPMENT_LIST : '/tm/config/YardEquipmentConfiguration/equipmentList',
	TM_EQUIPMENT_CONFIGURATION_DEFAULT : '/tm/config/YardEquipmentConfiguration/defaultConfiguration',
	TM_EQUIPMENT_CONFIGURATION_LIST : '/tm/config/YardEquipmentConfiguration/configurationList',
	TM_UPDATE_EQUIPMENT_CONFIGURATION : '/tm/config/YardEquipmentConfiguration/updateequipmentconfig',
	TM_UPDATE_ALL_EQUIPMENT_CONFIGURATION : '/tm/config/YardEquipmentConfiguration/updateallequipmentconfig',
	TM_UPDATE_EQUIPMENT_CONFIGURATION_SETTING : '/tm/config/YardEquipmentConfiguration/updateGridSetting',
	TM_QUEUE_CONFIGURATION_LIST : '/tm/config/QueueConfiguration/queueconfiglist',
	TM_UPDATE_QUEUE_CONFIGURATION : '/tm/config/QueueConfiguration/updatequeueconfig',
	/********************** YP **********************/
	POSITIONINGRULE : '/yp/positioningrule',
	/********************** SP **********************/
	SP_VSL_SCHEDULE : '/sp/vessellist',
	SP_META_DRAW_EXP: 'resources/data/MetaDrawVesselExplorer.json',		
	SP_META_DRAW_NAVI: 'resources/data/MetaDrawVesselNavigator.json',		
	SP_META_DRAW_CNTR: 'resources/data/MetaDrawContainerSlotTSB.json',		
	SP_META_PLAN_CONST: 'resources/data/MetaPlanningConstraints.json',		
	SP_META_COMP_RULE: 'resources/data/MetaImdgCompanyRuleTSB.json',

	SP_C_STOWAGE : '/sp/insertstowage',
	SP_R_STOWAGE : '/sp/selectstowage',
	SP_D_STOWAGE : '/sp/deletestowage',
	SP_U_STOWAGE : '/sp/updatestowageseq', 

	SP_VVD_PORTS : '/sp/selectvvdport',

	SP_DISCHARGE : 'D',
	SP_LOAD : 'L',
	SP_ALLOC: 'A',
	SP_DEALLOC: 'D',	
	
	/******************** OP-RF ********************/
	/******************** OP-DG ********************/
	/******************** OP-GT ********************/
};

/********************** Window **********************/
/* Toast 메시지 표시 */
function fn_toast_(localeTitle, localeMsg, params, duetime, icon) {
	if(!nullChk_(duetime)) duetime = 400;

	var title = TSB.locale.i18n.Bundle.instance.getMsg(localeTitle);
	
	if(title == null ||
	   title.indexOf('undefined') > 0 ){
		title = localeTitle;
	}
	
	var msg = TSB.locale.i18n.Bundle.instance.getMsg(localeMsg, params);
	
	if(msg == null ||
	   msg.indexOf('undefined') > 0 ){
		msg = localeMsg;
	}

	Ext.toast({
		html: msg,
		title: title,
		closable: false,
		align: 't',
		slideInDuration: duetime,
		minWidth: 400,
		height: 100
	});	
};

/* 알림 메시지 표시 */
function fn_alert(msgTitle, msgBody) {
	if(!nullChk_(msgBody)) {
		msgBody = msgTitle;
		msgTitle = "Info";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		buttons: Ext.Msg.OK,
		iconCls: 'accept',
		message: msgBody,
	});
}

/********************** Login **********************/
/* 로그인폼 */
function fn_loginFm_() {
	location = iWeb.LOGIN_FM;
}

/* 로그아웃 */
function fn_logout_() {
	var pmVV = iWeb.CSRF_ParmName;
	var tokenVV = iWeb.CSRF_Token;
	fn_post_(iWeb.URL + iWeb.LOGOUT_PROC , {tsb: 'TOS', [pmVV]: tokenVV});
}

/* 로그인 사용자 정보 */
function fn_userInfo_(uid64, upwd64) {
	iWeb.USER_ID64 = uid64;
	iWeb.USER_PWD64 = upwd64;
}

/* 인증: 토큰 */
function fn_myToken_() {
	return {access_token: iWeb.OAUTH_ACCESS_TOKEN, refresh_token: iWeb.OAUTH_REFRESH_TOKEN, expires_in: iWeb.OAUTH_EXPIRES_IN};
}

/* 인증: 토큰발급: 개발자용  */
function fn_getToken_(uid, upwd, ctlLogin) {
	var securedUsername, securedPassword;
	if(!nullChk_(uid) && uid.length > 1) {
		if(upwd !== undefined) {
			iWeb.USER_ID = uid;
			iWeb.USER_ID64 = btoa(uid);		// Base64 Encode
			iWeb.USER_PWD64 = btoa(upwd);
			securedUsername = iWeb.USER_ID64;
			securedPassword = iWeb.USER_PWD64;

			if(iWeb.PUBLIC_KEY_MODULUS.length != 0 && iWeb.PUBLIC_KEY_EXPONENT.length != 0){ // RSA 알고리즘이 적용되었을 때
				var rsa = new RSAKey();
				rsa.setPublic(iWeb.PUBLIC_KEY_MODULUS, iWeb.PUBLIC_KEY_EXPONENT);
				securedUsername = rsa.encrypt(iWeb.USER_ID64);
				securedPassword = rsa.encrypt(iWeb.USER_PWD64);
			}

			//console.log("Secured User Name : " + securedUsername);
			//console.log("Secured Password : " + securedPassword);
			
			Ext.Ajax.request({
				url: fn_server_(iWeb.OAUTH_TOKEN_URI),
				params : {grant_type: 'password', username: iWeb.USER_ID64, password: iWeb.USER_PWD64},
				method : 'POST',
				headers: { 'Authorization': 'Basic ' + iWeb.OAUTH_TOKEN_BASIC },                            
				success: function(response) {
					console.log("*** oauth.success ***");
					console.log(response.responseText);

					var oAuthResponse = Ext.decode(response.responseText);
					var authVo = oAuthResponse.DefaultOAuth2AccessToken;		// OAuth2 의 Tocken
					fn_oauth_(authVo.access_token, authVo.refresh_token, authVo.expires_in, true);


					ESVC.config.Token.setUserId(uid);
					ESVC.config.Token.setPgmCode(CONSTANTS.PGM_CODE);
					// ESVC.config.Token.setPassword(upwd);
					ESVC.config.Token.setAccessToken(authVo.access_token);
					ESVC.config.Token.setTokenType(authVo.token_type);

					fn_LoginUserInfo_(ctlLogin); //Login 성공 시 Token.js에 사용자 정보를 저장하는 함수. 2020.06.12 김용진
				},
				failure: function(response) {
					iWeb.USER_ID = "";
					console.log("*** oauth.failure!!! *** " + response.status);
					console.log(response.responseText);
					fn_loginSuccess_(false);
					var msg = '';
					if(response.status === 0) {
						msg = '[Error]: Failed to connect Server';
					} else {
						var err = JSON.parse(response.responseText);
						msg = "response status[" + response.status + "]: " + err.error;
					}
					if(ctlLogin !== undefined) ctlLogin.loginResult(false, msg);	// 실패(false)
				}
			});	
		}
	}
}

/* OAuth Token 값 설정 */
function fn_oauth_(aToken, rToken, expv, aState) {
	iWeb.OAUTH_ACCESS_TOKEN = aToken;
	iWeb.OAUTH_REFRESH_TOKEN = rToken;
	iWeb.OAUTH_EXPIRES_IN = expv;

	if(aState !== undefined) fn_loginSuccess_(aState);
}

/* RSA 값 설정 */
function fn_rsa_(keyModulus, keyExponent) {
	iWeb.PUBLIC_KEY_MODULUS = keyModulus;
	iWeb.PUBLIC_KEY_EXPONENT = keyExponent;
}

/* CSRF Token 값 설정 */
function fn_csrf_(headerName, parmName, tokenValue) {
	iWeb.CSRF_HeaderName = headerName;
	iWeb.CSRF_ParmName = parmName;
	iWeb.CSRF_Token = tokenValue;
}

function fn_loginSuccess_(vv) {
	if(vv !== undefined) {
		iWeb.LOGIN_SUCCESS = vv;
	}
	return iWeb.LOGIN_SUCCESS;
}

/* Service URL: Ajax 및 Proxy Url 설정 시 사용 */
function fn_server_(servicUrl, pParm) {
	if(servicUrl === undefined) {
		return iWeb.URL;
	}

	if(pParm !== undefined) {
		var nParm = JSON.stringify(pParm);
		return iWeb.URL + servicUrl + "?pm="+nParm;
	} else {
		return iWeb.URL + servicUrl;
	}
}


/************ String ************/
function nullChk_(value){
	if(typeof value === 'string'){
		if(value.trim() === ''){
			return true;
		}else{
			return false;
		}
	}else{ //obj
		if(value === undefined || value === null){
			return true;
		}else{
			return false;
		}
	}	
}

function equalChk_(a, b){
	if(!nullChk_(a) && a === b){
		return true;
	}
	return false;
}

/*
   function trim_(val){
	if(!nullChk_(val)){
		return '';
	}else{
		return val.trim();
	}
} */

function upperCaseFirstChar_(val){
	if(!nullChk_(val)){
		return '';
	}else{
		return val.substring(0, 1).toUpperCase() + val.substring(1);
	}
}

//protect sql injection
function convertHtml_(str){
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/\"/g,"&quot;");
	str = str.replace(/\'/g,"&#39;");
		
	return str;
}

function convertHtmlBack_(str){
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&quot;/g,'"');
	str = str.replace(/&#39;/g,"'");
	
	return str;
}

function inArray_(value, ext){
	//var ext = ['gif','png','jpg','jpeg','doc','docx','xls','xlsx','hwp', 'pdf'];
	for(var i = 0; i < ext.length ; i++){
		if(value == ext[i]){
			return true; //ext array exist > true
		}
	}
	return false;
}

function arrayToStr_(ext){
	var string = '';
	for(var i = 0; i < ext.length ; i++){
		string += ext[i] + ', ';
	}
	return string.substring(0, string.length -2);
}

/* 알림 메시지 표시 */
function fn_alert_(msgTitle, msgBody) {
	if(msgBody === undefined) {
		msgBody = msgTitle;
		msgTitle = "Information";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		buttons: Ext.Msg.OK,
		iconCls: 'x-fa fa-info',
		message: msgBody,
	});
}

/* 오류 메시지 표시 */
function fn_error_(msgTitle, msgBody) {
	if(msgBody === undefined) {
		msgBody = msgTitle;
		msgTitle = "Error";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		icon: Ext.Msg.ERROR,
		iconCls: 'error',
		buttons: Ext.Msg.OK,
		message: msgBody,
	});
}

/************ Locale ************/
function getLabel_(key){
	//return LiMainExtJS.getApplication().bundle.getMsg(key)
	return TSB.locale.i18n.Bundle.instance.getMsg(key);
}


/************ Grid Method ************/
function fn_syncStore_(store) {
	var url = store.getProxy().getUrl();
	if(!nullChk_(url)) {
		var me = this;
		var index = store.findBy((record) => !record.isValid());
		if(index != -1){
			var record = store.getAt(index);
			console.log(record);
			return record;
		}
		store.sync({
			success: function(resp) {
				if(resp.errCode < 0) {
					fn_toast_('fail_msg', 'savefail_msg', ' ' + resp.errMsg);
				} else {
					fn_toast_("Successfully Saved!");
					store.reload();
				}
			},
			failure: function(rec, op) {
				// TODO 다국어 처리를 위하여 ViewUtil.getLabel()로 값이 존재하는지 체크하는로직 추가 필요
				Ext.Msg.alert("Failed",rec.exceptions[0].getResponse().responseJson.errMsg);
			}
		});
		return null;
	}
	return null;
}
/* [Grid]: Record 데이터 수정(Update 이벤트) - 서버로 전송(Insert or Update 수행) */
function fn_createUpdateRecord_(record, store) {
	var url = store.getProxy().getUrl();
	if(!nullChk_(url) && !nullChk_(record)) {
		var me = this;
		// phantom : True when the record does not yet exist in a server-side database.
		if (record.phantom) {	 
			console.log('***** insert *****');
			record.set('crudType',iWeb.CRUD_C);
			record.set('id',"0");		// ExtJS에서 ID 임의값 할당오류방지
			
			store.sync({
				success: function(resp) {
					if(resp.errCode < 0) {
						//fn_toast_("Fail to create: " + resp.errMsg);
						fn_toast_('fail_msg', 'createfail_msg', ' ' + resp.errMsg);
					} else {
						fn_toast_("Successfully Created!");
						//MessageUtil.saveSuccess();
						store.reload();
					}
				}
			});
		} else {
			console.log('***** update ***** + writer RootProperty '+store.getProxy().getWriter().getRootProperty());
			record.set('crudType',iWeb.CRUD_U);
			store.sync({
				success: function(resp) {
					if(resp.errCode < 0) {
						//fn_toast_("Fail to update: " + resp.errMsg);
						fn_toast_('fail_msg', 'updatefail_msg', ' ' + resp.errMsg);
					} else {
						//fn_toast_("Successfully Updated!");
						//MessageUtil.infoToast('success_msg', 'updatesuccess_msg', ' test');
						fn_toast_('success_msg', 'updatesuccess_msg'); 
						store.reload();
					}
				}
			});
		}
	}
}

/* [Grid]: 새로운 Row 추가 - 입력모드 */
function fn_addRow_(grid, newRecord) {
	var store = grid.getStore();
	var storeModel = store.getModel();
	var record = storeModel.create();
	if(newRecord !== undefined) record = newRecord;	// 초기화된 newRecord로 대체
	var editor = grid.getPlugin('rowEditor');	// 고정명: editorPlugin
	
	editor.cancelEdit();
	
	var idx = 0;
	if(grid.getSelection() && grid.getSelection().length>0) {
		idx = store.indexOfId(grid.getSelection()[0].get('id'));
	}
	store.insert(idx, record);
	grid.getSelectionModel().select(record);
	editor.startEdit(record);
	
	return record;
}

// CELL EDITING
function fn_addRow2_(grid) {
	var store = grid.getStore();
	var storeModel = store.getModel();
	var record = storeModel.create();
	var editor = grid.getPlugin('cellEditor');	// 고정명: editorPlugin
	
	editor.cancelEdit();
	
	var idx = 0;
	if(grid.getSelection() && grid.getSelection().length>0) {
		idx = store.indexOfId(grid.getSelection()[0].get('id'));
	}
	store.insert(idx, record);
	grid.getSelectionModel().select(record);
	// editor.startEdit(record);
	
	return record;
}

/*
	[Grid]: Store에 데이터 로딩: 파라미터 조건
	store : 로드할 스토어
	params : 파라미터로 넘길 값 객체
	callback : 콜백 메서드
*/
function fn_getStoreLoad_(store, params, callback) {
	store.load({
		params: params,
		callback: function(rec, opr, success){
			var rootProperty = store.getProxy().getReader().getRootProperty();
			if(store.getProxy().getReader().getConfig().keepRawData){	
				console.log(store.getProxy().getReader().rawData);
			}else{
				console.log('Record length : ' + rec.length + ' Root property : ' + rootProperty);
			}

			if(callback){
				callback(rec, opr, success);
			}

			if(rec.length > 0){

			}else{
				fn_toast_('fail_msg', 'no_match_data_msg');
			}
		}
	})
	return null;
}

/* [Grid]: 선택 레코드 */
function fn_getSelectedRecord_(grid) {
	if(!nullChk_(grid)/* grid !== undefined && grid != null */) {
		var sRecord = nullChk_(grid.getSelection()) ? null : grid.getSelection()[0];
		return sRecord;
	}
	return null;
}

/* [Grid]: Record 삭제 - 서버로 전송(Delete) 수행 */
function fn_removeRecord_(store, record){
	var url = store.getProxy().getUrl();

	if(url !== undefined && record !== undefined && record !=null) {
		Ext.Msg.show({
			title: 'Remove Item',
			message: 'Do you want remove the Item?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(button) {
				if (button === 'ok') {
					record.set('crudType',iWeb.CRUD_D);
					store.remove(record);
					store.sync({
						success: function(resp) {
							if(resp.errCode < 0) {
								//fn_toast_("Fail to delete: " + resp.errMsg);
								fn_toast_('fail_msg', 'deletefail_msg', ' '+resp.errMsg);
							} else {
								//fn_toast_("Successfully Deleted!");
								fn_toast_('success_msg', 'deletesuccess_msg');
								//MessageUtil.infoToast('success_msg', 'deletesuccess_msg');
								store.reload();
							}
						}
					});
				}
			}
		});		
	} else {
		//fn_toast_("Select item to remove!");
		fn_toast_('Information', 'selectdeletedata_msg');
	}  
}

/* 시간지연 - 사용법: await sleep(2000);   */
function fn_sleep_(milliseconds) {
	const date = Date.now();
	var currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

/* WebSocket log visible */
var wsDebugmode = false;

function fn_ws_log_(visible){
	wsDebugmode = visible;
}

/* WebSocket 연결(요청) */
/* 
 * @param wsUrl 접속_URL
 * @param wsTopicID 토픽_ID
 * @param wsSubscribeFn 메시지 수신시 호출함수
 * @param wsCallBack 접속시도 후 호출함수

  예) fn_ws_connect_('/접속_URL', 'Topic', fn_SubscribeFn, fn_CallBack); 
  예) 수신메시지 내용: var msgRsv = JSON.parse(msg.body).content;
*/
var wsStompClient_ = null;
var wsConnected_ = false;

function fn_ws_connect_(wsUrl, wsTopicID, wsSubscribeFn, wsCallBack) {
	if(!wsConnected_) {
		var socket = new SockJS(wsUrl + '?access_token=' + iWeb.OAUTH_ACCESS_TOKEN);	// OAuth2.0
		wsStompClient_ = Stomp.over(socket);
		if(wsDebugmode){
			wsStompClient_.debug = f => f;
		}
		wsStompClient_.connect({}, function (frame) {
			if(wsDebugmode == false){
				console.log('[WS]: Connected: ' + frame);
			}
			wsConnected_ = true;
			if(wsTopicID !== undefined && wsSubscribeFn !== undefined) {
				// Topic에 Subscribe_Function 등록 = 해당 Topic 메시지 발생시 호출 되는 함수 
				
				if(typeof wsTopicID === 'string'){
					wsStompClient_.subscribe(wsTopicID, wsSubscribeFn);	
				}else if(typeof wsTopicID === 'object' && Array.isArray(wsTopicID)){ //여러개의 Topic 등록일 경우
					for(var i=0; i< wsTopicID.length; i++){
						// console.log(wsTopicID[i]);
						wsStompClient_.subscribe(wsTopicID[i], wsSubscribeFn);	
					}
				}
				
			} else {
				wsConnected_ = false;
			}
			if(wsCallBack !== undefined) wsCallBack(true);	// 콜백 호출(true) 호출
		});
	}
}

/* Websocket 연결(기본으로 접속) */
/* 
 * 예)  fn_ws_connect_default_(메시시 수신시 콜백함수, 연결접속 시도 후 콜백함수);
 * 
 * */
function fn_ws_connect_default_(wsSubscribeFn, wsCallBack) {
	fn_ws_connect_(fn_server_(iWeb.WS_WEBSOCKET_URL), iWeb.WS_WEBSOCKET_TOPIC_ALL, wsSubscribeFn, wsCallBack);
}

function fn_ws_connect_TM_(wsSubscribeFn, wsCallBack) {
	fn_ws_connect_(fn_server_(iWeb.WS_WEBSOCKET_URL), [iWeb.WS_WEBSOCKET_TOPIC_ALL,iWeb.WS_WEBSOCKET_TOPIC_TM], wsSubscribeFn, wsCallBack);
}

/* WebSocket 연결(해지) */
function fn_ws_disconnect_() {
    if (wsStompClient_ !== null) {
    	wsStompClient_.disconnect();
    }
    wsConnected_ = false;
    console.log("[WS]: Disconnected");
}

/* WebSocket 메시지 (전송 - Publish) */
function fn_ws_send_(wsUrl, uMsg) {
	if(wsStompClient_ ) {
		wsStompClient_.send(wsUrl, {}, uMsg);
	}
}

/* 로그인 폼 */
function fn_viewLogin_(msg) {
	//Ext Create로 창 열면 로그인 실패마다 로그인 창 새로 만들어서 변경
    var loginWin = Ext.ComponentQuery.query('app-login')[0];
	if(loginWin === undefined || loginWin === null){
		loginWin = Ext.create({xtype:'app-login'});
	}
    if(msg !== undefined) {
        loginWin.msgTextUpdate(msg);
    }
}

/* 메인 앱 */
function fn_startMainApp_() {
	// var iotosApp = Ext.application(iWeb.EXT_MAIN_APPLICATION);
	me.getApplication().getMainController().onLoadLocale();
}

/* 로그인 & 메인 앱 : AppName, UserID, UserPass, MainView */
function fn_startMainApplication_(appName,userId, uPass) {
	/* 1. 메인앱 지정 */
	iWeb.EXT_MAIN_APPLICATION = appName; 
	if(userId !== undefined && uPass !== undefined) {
		fn_getToken_(userId, uPass);   
	} else {
		/* 로그인 */
		if(iWeb.LOGIN_SUCCESS) { 
			fn_startMainApp_(); // 
		} else {
			fn_viewLogin_();
		}
	}
}

/* Ext.Ajax Request Json Format (POST) */
function fn_AjaxJson_(aUrl, aParms, aCallBack, aCallBackFail) {
	Ext.Ajax.request({
		url: fn_server_(aUrl),
		jsonData : aParms,							// J
		method : 'POST',
		success: function(response) {
			console.log("*** fn_AjaxJson_.success ***");
			if(aCallBack !== undefined) aCallBack(response);
		},
		failure: function(response) {
			console.log("*** fn_AjaxJson_.failure!!! ***");
			console.log(response.responseText);
			if(aCallBackFail !== undefined) aCallBackFail(response);
		}
	});	
}

/* Ext.Ajax Request (POST)*/
function fn_Ajax_(aUrl, aParms, aCallBack, aCallBackFail) {
	Ext.Ajax.request({
		url: fn_server_(aUrl),
		params : aParms,
		method : 'POST',
		proxy : {
			showProgressBar : false
		},
		success: function(response) {
			console.log("*** fn_Ajax_.success ***");
			if(aCallBack !== undefined) aCallBack(response);
		},
		failure: function(response) {
			console.log("*** fn_Ajax_.failure!!! ***");
			console.log(response.responseText);
			if(aCallBackFail !== undefined) aCallBackFail(response);
		}
	});	
}

/* POST: Just post submit, Don't care reply */
function fn_post_(url, params, domEl) {
	var form = document.createElement('form');
	if(domEl !== undefined) {
		domEl.appendChild(form);
	} else {
		document.body.appendChild(form);
	}
	form.action = url;
	form.method = 'POST';
	
	for (var i in params) {
		if (params.hasOwnProperty(i)) {
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = i;
			input.value = params[i];
			form.appendChild(input);
		}
	}
	form.submit();
}

/* 날짜포멧: YYYY-MM-DD */
function fn_YYYY_MM_DD_(uDate) {
	if(uDate === undefined) uDate = new Date(); // 오늘
	var mm = uDate.getMonth() + 1; // getMonth() is zero-based
	var dd = uDate.getDate();
	
	return uDate.getFullYear() + "-"
	+ ((mm>9 ? '' : '0') + mm) + "-"
	+ ((dd>9 ? '' : '0')) + dd;
}

/* Javascript 추가 등록: WebJar 내용 */
function fn_includeJS_(filePathName) { 
	var head = document.getElementsByTagName('head')[0]; 
	var script = document.createElement('script'); 
	script.src = filePathName; script.type = 'text/javascript'; 
	head.appendChild(script) 
}

/********************** 권한 검사 **********************/
/* 2020-06-05 김용진 
*  메뉴의 CRUD 권한 확인하는 함수*/
function fn_CRUDCheck_(screenName) {
	var accessMenuItems = ESVC.config.Token.getAccessAuthorityMapItem().accessAuthorityItems;
	if (accessMenuItems) {
		for (var i = 0; i < accessMenuItems.length; i++) {
			if (accessMenuItems[i].menuName == screenName) {
				var screenInfo = Ext.ComponentQuery.query(accessMenuItems[i].menuName)[0];
				if (accessMenuItems[i].inquiryValid == "Y") { // 현재 화면의 버튼이 activate/activate 상태인지 확인
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnSearch")[0]
					if (accessMenuItems[i].inquiryChk == "Y") { // 현재 화면읜 버튼에 대한 권한이 있는지 확인
						if (btn != null) {
							btn.setDisabled(false)
						}
					} else {
						if (btn != null) {
							btn.setDisabled(true)
						}
					}
				} else {
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnSearch")[0]
					if (btn != null) {
						btn.setDisabled(true)
					}
				}

				if (accessMenuItems[i].insertValid == "Y") { // 현재 화면의 버튼이 activate/activate 상태인지 확인
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnAdd")[0]
					if (accessMenuItems[i].insertChk == "Y") { // 현재 화면읜 버튼에 대한 권한이 있는지 확인
						if (btn != null) {
							btn.setDisabled(false)
						}
					} else {
						if (btn != null) {
							btn.setDisabled(true)
						}
					}
				} else {
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnAdd")[0]
					if (btn != null) {
						btn.setDisabled(true)
					}
				}

				if (accessMenuItems[i].deleteValid == "Y") { // 현재 화면의 버튼이 activate/activate 상태인지 확인
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnDelete")[0]
					if (accessMenuItems[i].deleteChk == "Y") { // 현재 화면의 버튼에 대한 권한이 있는지 확인
						if (btn != null) {
							btn.setDisabled(false)
						}
					} else {
						if (btn != null) {
							btn.setDisabled(true)
						}
					}
				} else {
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnDelete")[0]
					if (btn != null) {
						btn.setDisabled(true)
					}
				}

				if (accessMenuItems[i].saveValid == "Y") { // 현재 화면의 버튼이 activate/activate 상태인지 확인
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnSave")[0]
					if (accessMenuItems[i].saveChk == "Y") { // 현재 화면읜 버튼에 대한 권한이 있는지 확인
						if (btn != null) {
							btn.setDisabled(false)
						}
						screenName.accessSave = 'Y'
					} else {
						if (btn != null) {
							btn.setDisabled(true)
						}
						screenName.accessSave = 'N'
					}
				} else {
					var btn = Ext.ComponentQuery.query(accessMenuItems[i].menuName + " #btnSave")[0]
					if (btn != null) {
						btn.setDisabled(true)
					}
					screenName.accessSave = 'N'
				}
			}
		}
	}
	// fn_AccessEdit_(screenName)
	fn_AccessControl_(screenName)
}

/* 2020-06-05 김용진 
*  화면의 컴포넌트에 대한 접근 권한 확인하는 함수*/
function fn_AccessControl_(screenName) {
	var accessControlItems = ESVC.config.Token.getAccessAuthorityMapItem().controlAuthorityItems;
	if (accessControlItems) {
		for (var i = 0; i < accessControlItems.length; i++) {
			if (accessControlItems[i].subMenu == screenName) {
				var com = Ext.ComponentQuery.query(accessControlItems[i].subMenu + " #" + accessControlItems[i].controlId)[0];

				if(accessControlItems[i].propertyType == null || accessControlItems[i].propertyType == ""){
					var com = Ext.ComponentQuery.query(accessControlItems[i].subMenu + " #" + accessControlItems[i].ctrlId)[0];
				}

				if (accessControlItems[i].systemDefault == 'N') {
					if (accessControlItems[i].enableValue == 'Y' && accessControlItems[i].visibleValue == null) {
						if (com != null) {
							com.setDisabled(false);
						}
					} else if (accessControlItems[i].enableValue == 'N' && accessControlItems[i].visibleValue == null) {
						if (com != null) {
							com.setDisabled(true);
						}
					} else if (accessControlItems[i].visibleValue == 'Y' && accessControlItems[i].enableValue == null) {
						if (com != null) {
							com.setHidden(false);
						}
					} else if (accessControlItems[i].visibleValue == 'N' && accessControlItems[i].enableValue == null) {
						if (com != null) {
							com.setHidden(true);
						}
					} else {
						if (com != null) {
							com.setHidden(true);
						}
					}
				} else {
					if ((accessControlItems[i].enableValue == 'Y' || accessControlItems[i].enableValue == 'N') &&
						accessControlItems[i].visibleValue == null) {
						if (com != null) {
							com.setDisabled(true);
						}
					} else if ((accessControlItems[i].visibleValue == 'Y' || accessControlItems[i].visibleValue == 'N') &&
						accessControlItems[i].enableValue == null) {
						if (com != null) {
							com.setHidden(true);
						}
					} else {
						if (com != null) {
							com.setHidden(true);
						}
					}
					if (com != null) {
						com.setDisabled()
					}
				}
			}
		}
	}
}

// Update 권한이 없을 때, RowEditing이 발생하지 않도록 하는 함수
function fn_AccessEdit_(screenName) { 
	var screen = Ext.ComponentQuery.query(screenName)[0];
	var accessEdit = ESVC.config.Token.getAccessAuthorityMapItem().accessAuthorityItems
	for(var i = 0 ; i < accessEdit.length; i++){
		if(accessEdit[i].menuName == screen.xtype){
			if(accessEdit[i].saveValid == 'Y'){
				if(accessEdit[i].saveChk == 'Y'){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
	}
}

/* 로그인시 사용자의 정보를 받아오는 함수 ( Token.js 접근 ) */
/* 2020-06-05 김용진 */

function fn_LoginUserInfo_(ctlLogin) {
	var me = this;
	var item = Ext.create('ESVC.model.foundation.CredentialItem');

	item.set('id', 	ESVC.config.Token.getUserId());
	item.set('pgmCode', CONSTANTS.PGM_CODE);

	var proxy = item.getProxy();
	proxy.url = ESVC.config.Locale.getRestApiDestUrl() + iUrl.LOGIN;
	
	item.save({
		callback: function(record, operation, success) {
			// sessionStorage.setItem("Token", iWeb.OAUTH_ACCESS_TOKEN);
			if(success) {
				var authorityMapItem = record.data.authorityMap;
				ESVC.config.Token.setAccessAuthorityMapItem(record.data.authorityMap.accessAuthorityItems);
				ESVC.config.Token.setProfile(record.data); // KHH - 2019.06.27
				if (ctlLogin !== undefined) {
					ctlLogin.loginResult(true);	// 성공(true)
				} else {
					fn_startMainApp_();	// 메인앱 실행
				}
			} else {
				console.log("Failed")
				var msg = "Failed Login"

				if (ctlLogin !== undefined) ctlLogin.loginResult(false, msg);	// 실패(false)
				
			}
		}
	});
}

/* Session 만료 확인 함수*/
function checkSession(){
	var token = sessionStorage.getItem("Token");
	if(!token){
		console.log("세션이 만료되었습니다!!")
	}else{
		setTimeout("checkSession()",1000);
	}
}


/* 2DDrawing SlotId , Container Id -> real Id conversion */
function drawingIdTorealId(id) {
    let tmp_position = id.split("-");

    let block, bay, row, tier;
    if(tmp_position.length > 1 ){
        block = tmp_position[0];
        bay = String(parseInt(tmp_position[1]) - 1);
        row = tmp_position[2];
        tier = tmp_position[3];

        return block + "-" + bay + "-" + row + "-" + tier;
    }else{
        // area 
        return null;
    }
    
}

/* real Id -> 2DDrawing SlotId , Container Id conversion */
function realIdTodrawingId(id) {
    let tmp_position = id.split("-");

    let block, bay, row, tier;
    if(tmp_position.length > 1 ){
        block = tmp_position[0];
        bay = String(parseInt(tmp_position[1]) + 1);
        row = tmp_position[2];
        tier = tmp_position[3];

        return block + "-" + bay + "-" + row + "-" + tier;
    }else{
        // area 
        return null;
    }
    
}