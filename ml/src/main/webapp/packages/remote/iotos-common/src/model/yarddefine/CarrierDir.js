Ext.define('Iotos.model.yarddefine.CarrierDir', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * CarrierDir
	 * **********************************/

	fields: [
		{ name: 'yardid', type: 'string'},
		{ name: 'block', type: 'string'},
		{ name: 'type', type: 'string'},
		{ name: 'pos', type: 'string'},
		{ name: 'enter', type: 'string'}
		]
});