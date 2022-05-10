Ext.define('Iotos.model.yarddefine.YardZone', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 *  YardZone
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'blockArea', type: 'string'},
		{ name: 'x', type: 'int'},
		{ name: 'y', type: 'int'}
		]
});