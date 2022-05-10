Ext.define('Iotos.model.Menu', { 
	extend: 'Ext.data.Model',
	/****************************
	 * 수정 일자 : 2020.05.26
	 * 작 성 자  : 김용진
	 * TB_ACCESS_ROLE 데이터 연동
	 * **********************************/
	

    fields: [
	{
		name : 'menuNm',
		type : 'string'
	},
	{
		name : 'depth',
		type : 'number'
	},
	{
		name : 'masterMenuId',
		type : 'string'
	},
	{
		name : 'seq',
		type : 'number'
	},
	{
		name: 'menuCaption',
		type: 'string'
	}, 
	{
		name: 'screenNm',
		type: 'string'
	}, 
	{
		name: 'screenCaption',
		type: 'string'
	}, 
	{
		name: 'upperMenuId',
		type: 'string'
	}, 
	{
		name: 'menuType',
		type: 'string'
	}, 
	{
		name: 'openType',
		type: 'string'
	},
	{
		name: 'bizCfgUse',
		type: 'string'
	},
	
	/*****2020.05.26 추가 사항*****/
	{
		name : 'menuName',
		type : 'string'
	},
	{
		name: 'screenName',
		type: 'string'
	}, 
	{
		name : "menuCaption",
		type : "string"
	},{
		name : "topMenu",
		type : "string"
	},{
		name : "icon",
		type : "string"
	}
	/******************************/
]
});