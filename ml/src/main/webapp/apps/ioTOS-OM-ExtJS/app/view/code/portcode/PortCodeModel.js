Ext.define('IoTosOmExt.view.code.portcode.PortCodeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.portcode',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.portcode.PortCode'
	],

	formulas : {
		setDisabledOrReadOnlyWhenUNLo : {
			bind : '{theDetail.portTypeOption}',
			get : function(value) {
				if(value && value.portTypeOption == 'UNLo') {
					return true;
				}else if(value && value.portTypeOption == 'OPR'){
					return false;
				}else if(value == null) {
					return true;
				}
			}
		},
		setDisabledOrReadOnlyWhenOPR : {
			bind : '{theDetail.portTypeOption}',
			get : function(value) {
				if(value && value.portTypeOption == 'UNLo') {
					return false;
				}else if(value && value.portTypeOption == 'OPR'){
					return true;
				}
			}
		}
	},
	
	stores:{
		portCodeStore:{
			model: 'IoTosOmExt.model.code.portcode.PortCode',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/portcode/portcode'
			}
		},
		partnerCodeStore : {
			model: 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		}
	}
});