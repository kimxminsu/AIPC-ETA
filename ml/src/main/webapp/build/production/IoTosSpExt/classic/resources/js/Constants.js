var CONSTANTS = {};
CONSTANTS.ROOT = "/";
CONSTANTS.ROOT_PATH = "/";

//When deploy must be PROD
//CONSTANTS.ENV = "PROD";
CONSTANTS.ENV = "DEV";

////Local
CONSTANTS.SERVER_CONTEXT = "";

//Application Code
CONSTANTS.PROJECT_TITLE = " Ship Planning Service";
CONSTANTS.SYSTEM_CODE = "GWCT";	//GWCT
CONSTANTS.VERSION = '1.0.2'//'7.726.0010';

CONSTANTS.LOCALES =[
	{"code":"ko-KR", "codeName":"Korean"},
	{"code":"en-US", "codeName":"English"}
];

CONSTANTS.AUTO_LOGIN = "N"; // Auto Login
CONSTANTS.CUSTOMER = "DEV";	// Sample Menu visible
CONSTANTS.MODULE = 'Sp';
if((location.host).indexOf('1841') > 0){
	var url = "http://localhost";
}else if((location.host).indexOf('443') > 0){ //build 모드
	var url = "https://" + location.host;
}else{
	var url = "http://" + location.host;
}
CONSTANTS.SERVER_DNS = url;
// CONSTANTS.SERVER_DNS = "http://10.177.11.40:8080";

/**DO NOT CHANGE ***START***/
CONSTANTS.AUTH_TYPE_LOCAL = "BASIC";
CONSTANTS.AUTH_TYPE_DEPLOY = "SESSION";
CONSTANTS.AUTH_TYPE = CONSTANTS.AUTH_TYPE_LOCAL; //Local Development Only

// MAIN DESIGN
CONSTANTS.MAIN_HEADER_HEIGHT = 36;
CONSTANTS.MENU_EXPANDED_WIDTH = 200;

CONSTANTS.PGM_CODE = 'SP'; //PGMCODE.SP //해당 모듈의 PGM_CODE는 있어야한다.
CONSTANTS.IS_DIRECT = "";
CONSTANTS.TIME_LOG_DETAIL = '';

/**DO NOT CHANGE ***END***/