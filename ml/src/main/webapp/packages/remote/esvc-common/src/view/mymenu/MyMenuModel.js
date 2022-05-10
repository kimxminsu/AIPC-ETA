Ext.define('ESVC.view.mymenu.MyMenuModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.mymenu',

	requires: [
		'Ext.data.proxy.Rest',
		'ESVC.model.mymenu.MyMenu'
	],

	stores: {
		myMenu:{
			model: 'ESVC.model.mymenu.MyMenu',
			storeId: 'myMenuStore',
			autoLoad: false,
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: ESVC.config.Locale.getRestApiDestUrl() + '/v1/mymenu/searchItems'
			} 
		},
		
		menulist : {}
	}
});