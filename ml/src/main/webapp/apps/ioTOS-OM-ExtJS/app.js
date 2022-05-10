/*
 * This call registers your application to be launched when the browser is ready.
 */
Ext.application({
    name: 'IoTosOmExt',

    extend: 'IoTosOmExt.Application'
});

Ext.onReady(function(){
	Ext.Loader.loadScript({
		url: './resources/js/VTypes.js',
		scope: this,
		onLoad : function(){
//				console.log('##### Load VType OK');;
		},
		onError : function(){
//				console.log('##### Load VType Failed');;
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

		
    /* 1. 로그인 & 메인 앱 */
    fn_startMainApplication_('IoTosOmExt.Application');

    /* 2. 로그인 생략: 개발자용 */
    // fn_startMainApplication_('IoTosOmExt.Application', 'john', 'success');
});