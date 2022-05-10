Ext.define('IoTosOmExt.view.code.partnercode.PartnerCodeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.partnercode',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.code.partnercode.PartnerCode'
	],

	formulas : {
		isNotLineOperator : function(get) {
			if(get('theDetail')) {
            if(get('theDetail').data.ptnrType != PopupServiceConstants.PartnerType.LINE_OPERATOR) {
               return true;
            }else {
               return false;
            }
         }
		},
		isNotTrucker : function(get) {
			if(get('theDetail')) {
            if(get('theDetail').data.ptnrType != PopupServiceConstants.PartnerType.TRUCKER) {
               return true;
            }else {
               return false;
            }
         }
		},
	},
	
	stores:{
		partnerCodeTypeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		partnerCodeStore : {
			model : 'IoTosOmExt.model.code.partnercode.PartnerCode',
         pageSize : CommonConstants.PAGE_SIZE,
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/partnercode/partnercode'
            
         }
		},
		vanPoolTypeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		paymentTypeStore : {
			model : 'Iotos.model.Code',
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			}
		},
		partnerPersonStore : {
			model : 'IoTosOmExt.model.code.partnercode.PartnerCode',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/partnercode/partnerperson',
         }
		},
		partnerAgencyStore : {
			model : 'IoTosOmExt.model.code.partnercode.PartnerCode',
         proxy : {
            type : 'rest',
            url : IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/code/partnercode/partneragency',
         }
		}
	}
});