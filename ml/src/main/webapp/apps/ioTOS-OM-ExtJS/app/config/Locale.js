Ext.define('IoTosOmExt.config.Locale', {
	singleton: true,
	alternateClassName: 'Locale',	

	config: {
		locale: 'en-US',		//'ko-KR', 'en-US'
		theme: 'crisp',
		rtl: false,

		timezone: 'UTC',
		thousandSeparator: ',',
		decimalSeparator: '.',
		currenyPrecision: 2,
		currencySign: '$',
		currencyCode: 'USD',
		shortDate: "d/m/Y", // <default : Y-m-d> 2020.04.10.Tonny.Kim
		excelExportDateTimeFormat: 'd/m/Y_His',
		startDay: 0,
		defaultDateFormat: 'd/m/Y H:i:s',
		defaultDateFormatWithNoSeconds: 'd/m/Y H:i',
		
		ediSender: 'MAE',
			
		initScheduleLimits: 20,
		
		serverDns: CONSTANTS.ENV === 'PROD' ? window.location.protocol + '//' + window.location.host : CONSTANTS.SERVER_DNS,
		serverContextRoot: null,
	},
	
	constructor: function(config) {
		console.log('Locale create');
		this.initConfig(config);
		this.callParent(arguments);
		this.setContextPath();
	},
	
	setContextPath : function() {
		if(StringUtil.isNullorEmpty(this.getServerContextRoot())){
			if(CONSTANTS.ENV === 'PROD'){
				this.setServerContextRoot(this.getContextPath());
			} else {
				this.setServerContextRoot(CONSTANTS.SERVER_CONTEXT);
			}
		}
	},
	
	getContextPath : function() {
		var paths = window.location.pathname.split("/");
		
		if(paths != null && paths.length > 1) contextRoot = "/"+paths[1];
		else contextRoot = CONSTANTS.SERVER_CONTEXT;
		
		return contextRoot;
	},
	
	getRestApiDestUrl: function() {
		return this.getServerDns() + this.getServerContextRoot();
	},
	
	getDirectApiDestUrl: function(config) {
		return this.getServerDns() + this.getServerContextRoot() + '/direct'
	},
	
	setLanguage : function(language){
		this.setLocale(language);
		TSB.locale.i18n.Bundle.instance.setLanguage(language);
	},
	
	getRestHome :function(){
		return window.location.origin + window.location.pathname;
	},

});