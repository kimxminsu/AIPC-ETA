Ext.define('Iotos.model.login.LoginParm', { 
	extend: 'Ext.data.Model',
	/****************************
	 * 수정 일자 : 2020.05.26
	 * 작 성 자  : 김용진
	 * TB_ACCESS_ROLE 데이터 연동
	 * **********************************/

    fields: [
	{
		name : 'id',
		type : 'string'
	},
	{
		name : 'pgmCode',
		type : 'number'
	},
	{
		name : 'token',
		type : 'string'
	},
	{
		name : 'oldPw',
		type : 'number'
	}
]
});