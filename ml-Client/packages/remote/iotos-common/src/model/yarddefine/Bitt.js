Ext.define('Iotos.model.yarddefine.Bitt', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Bitt
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'berth', type: 'string'},
		{ name: 'index', type: 'auto'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'},
		{ name: 'position', type: 'auto'},
		{ name: 'yardId', type: 'string'},
		{ name: 'pX', type: 'auto'},
		{ name: 'eX', type: 'auto'},
		{ name: 'backcolor', type: 'string'},
		{ name: 'forecolor', type: 'string'}
		]
});