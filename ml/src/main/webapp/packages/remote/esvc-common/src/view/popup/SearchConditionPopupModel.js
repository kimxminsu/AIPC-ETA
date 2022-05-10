Ext.define('ESVC.view.popup.SearchConditionPopupModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.searchconditionpopup',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		searchConditionJson: {
			storeId: 'searchConditionJsonStore',
			proxy: {
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/v1/searchCondition/searchItems'
			}
		},
		
		searchCondition : {
			storeId: 'searchConditionStore',
			proxy: {
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/v1/searchCondition/searchItems'
			}
		}
	}
});