Ext.define('Iotos.model.yarddefine.TerminalLayoutPosition', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Terminal Layout Position
	 * **********************************/

	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'seq', type: 'auto'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'}
		]
});