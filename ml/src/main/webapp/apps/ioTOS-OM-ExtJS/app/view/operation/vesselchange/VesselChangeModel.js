Ext.define('IoTosOmExt.view.operation.vesselchange.VesselChangeModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.vesselchange',
	
	requires:[
		'Ext.data.proxy.Rest',
		'IoTosOmExt.model.operation.vesselchange.VesselChange'
	],

	formulas : {
		setDisabledReservedInyardGroup : {
			bind : '{theSearch.vesselChangeMode}',
			get : function(value) {
				if(value && value.assignMode == CodeConstantsOM.commonCode.EXPORT_CHANGE) {
					return false;
				}else {
					return true;
				}
			}
		},
		setDisabledAssignRollbackGroup : {
			bind : '{theSearch.vesselChangeMode}',
			get : function(value) {
				if(value && value.assignMode == CodeConstantsOM.commonCode.IMPORT_EXPORT
					|| value && value.assignMode == CodeConstantsOM.commonCode.REEXPORT
					|| value && value.assignMode == CodeConstantsOM.commonCode.IMPORT_STORAGE	
				) {
					return false;
				}else {
					return true;
				}
			}
		},
		setHiddenEmtyChk : {
			bind : '{theSearch.vesselChangeMode}',
			get : function(value) {
				if(value && value.assignMode == CodeConstantsOM.commonCode.IMPORT_EXPORT
					|| value && value.assignMode == CodeConstantsOM.commonCode.REEXPORT
				) {
					return true;
				}else {
					return false;
				}
			}
		},
		setHiddenRollBackChk : {
			bind : '{theSearch.assignRollback}',
			get : function(value) {
				if(value && value.assignRollback == CodeConstantsOM.commonCode.ASSIGN) {
					return true;
				}else {
					return false;
				}
			}
		},
		setHiddenApplyChk : {
			bind : '{theSearch.assignRollback}',
			get : function(value) {
				if(value && value.assignRollback == CodeConstantsOM.commonCode.ROLLBACK) {
					return true;
				}else {
					return false;
				}
			}
		}
	},
	
	stores:{
		vesselChangeStore:{
			model: 'IoTosOmExt.model.operation.vesselchange.VesselChange',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/om/operation/vesselchange/vesselchange'
			}
		},
		vvdPortCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
		},
		podCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
			},
			filters : [{
				property : 'code',
				value : CodeConstantsOM.commonCode.CURRENT_COUNTRY_CODE + CodeConstantsOM.commonCode.CURRENT_PORT_CODE
			}]
		},
		podCodeBackupStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
		},
		fDestCodeStore  : {
         model : 'Iotos.model.Code',
         proxy : {
            type : 'rest',
            url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/dm/code'
         }
      }
	}
});