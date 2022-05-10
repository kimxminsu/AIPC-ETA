Ext.define('Aipc.Main.model.authority.AuthMenuItem', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'systemCode',
		type:'string'
	}, {
		name: 'menuId',
		type:'string'
	}, {
		name: 'upperMenuId',
		type:'string'
	}, {
		name: 'menuOrder',
		type:'string'
	}, {
		name: 'screenPathAddress',
		type:'string'
	}, {
		name: 'screenIconDefineCode',
		type:'string'
	}, {
		name: 'menuUseYn',
		type:'string'
	}, {
		name: 'beanId',
		type:'string'
	}, {
		name: 'septYn',
		type:'string'
	},{
		name: 'apiUri',
		type:'string'
	},{
		name: 'menuDescription',
		type:'string'
	},{
		name: 'popupYn',
		type:'string'
	},{
		name: 'menuTypeCode',
		type:'string'
	},{
		name: 'menuScreenName',
		type:'string'
	},{
		name: 'localeTypeCode',
		type:'string'
	},{
		name: 'screenNameUseYn',
		type:'string'
	},{
		name: 'buttonId',
		type:'string'
	},{
		name: 'menuButtonName',
		type:'string'
	},{
		name: 'buttonAuthDlgtCheckYn',
		type:'string'
	},{
		name: 'buttonUseYn',
		type:'string'
	},{
		name: 'apiUrl',
		type:'string'
	},{
		name: 'apiMethod',
		type:'string'
	},{
		name: 'apiMenuId',
		type:'string'
	},{
		name: 'apiDescription',
		type:'string'
	},{
		name: 'mode',
		type:'string'
	},{
		name: 'depth',
		type:'string'
	}]

});