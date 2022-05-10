Ext.define('IoTosOmExt.view.code.generalcode.GeneralCodeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.generalcode',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.generalcode.GeneralCode'
	],
	
	stores:{
		generalCodeTypeStore : {
			model : 'Iotos.model.Code',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		generalCodeStore : {
			model : 'IoTosOmExt.model.code.generalcode.GeneralCode',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/generalcode/generalcode'
			}
		},
		codeGroupStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		fpodCodeStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		blockAreaStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		usedInStore : {
			model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		}
	}
});