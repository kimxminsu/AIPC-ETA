Ext.define('Iotos.model.login.Login', { 
	extend: 'Ext.data.Model',
	/****************************
	 * 수정 일자 : 2020.05.26
	 * 작 성 자  : 김용진
	 * TB_ACCESS_ROLE 데이터 연동
	 * **********************************/

    fields: [
	{
		name : 'userId',
		type : 'string'
	},
	{
		name : 'userName',
		type : 'number'
	},
	{
		name : 'userLevel',
		type : 'string'
	},
	{
		name : 'userGroup',
		type : 'number'
	},
	{
		name: 'role',
		type: 'string'
	}, 
	{
		name: 'password',
		type: 'string'
	}, 
	{
		name: 'tmnlCd',
		type: 'string'
	}
]
});