Ext.define('Iotos.model.yarddefine.TPCoverage', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * TP Coverage
	 * **********************************/

	fields: [
		{ name: 'tp', type: 'string'},
		{ name: 'block', type: 'string'},
		{ name: 'bayIdx', type: 'auto'},
		{ name: 'rowIdx', type: 'auto'}
		]
});