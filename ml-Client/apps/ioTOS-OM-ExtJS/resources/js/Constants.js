var CONSTANTS = {};
CONSTANTS.ROOT = "/";
CONSTANTS.ROOT_PATH = "/";

//When deploy must be PROD
//CONSTANTS.ENV = "PROD";
CONSTANTS.ENV = "DEV";

////Local
CONSTANTS.SERVER_CONTEXT = "";

//Application Code
CONSTANTS.PROJECT_TITLE = "Operation Management";
CONSTANTS.SYSTEM_CODE = "GWCT";	//GWCT
CONSTANTS.VERSION = '7.726.0010';

CONSTANTS.LOCALES =[
	{"code":"ko-KR", "codeName":"Korean"},
	{"code":"en-US", "codeName":"English"}
];

CONSTANTS.AUTO_LOGIN = "N"; // Auto Login
CONSTANTS.CUSTOMER = "DEV";	// Sample Menu visible
CONSTANTS.MODULE = 'Om';

var url = "http://localhost:80";
if((location.host).indexOf('1841') > 0){
	url = "http://localhost";
}else if((location.host).indexOf('443') > 0){ //build 모드
	url = "https://" + location.host;
}else{
	url = "http://" + location.host;
}
//CONSTANTS.SERVER_DNS = "http://localhost:80";
CONSTANTS.SERVER_DNS = url;
// CONSTANTS.SERVER_DNS = "http://10.177.11.40:8080";

/**DO NOT CHANGE ***START***/
CONSTANTS.AUTH_TYPE_LOCAL = "BASIC";
CONSTANTS.AUTH_TYPE_DEPLOY = "SESSION";
CONSTANTS.AUTH_TYPE = CONSTANTS.AUTH_TYPE_LOCAL; //Local Development Only

// MAIN DESIGN
CONSTANTS.MAIN_HEADER_HEIGHT = 36;
CONSTANTS.MENU_EXPANDED_WIDTH = 200;

// CONSTANTS.PGM_CODE = PGMCODE.OM //해당 모듈의 PGM_CODE는 있어야한다.
CONSTANTS.PGM_CODE = 'OM';


/**DO NOT CHANGE ***END***/