Ext.define('Iotos.model.yarddefine.TerminalLayout', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Terminal Layout
	 * **********************************/

	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'backColor', type: 'string'},
		{ name: 'foreColor', type: 'string'},
		{ name: 'positionSources', type: 'auto'}
		]
});