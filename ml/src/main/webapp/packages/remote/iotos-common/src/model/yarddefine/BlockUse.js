Ext.define('Iotos.model.yarddefine.BlockUse', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * BlockUse
	 * **********************************/

	fields: [
		{ name: 'block', type: 'string'},
		{ name: 'seq', type: 'auto'},
		{ name: 'use', type: 'string'},
		{ name: 'startBay', type: 'auto'},
		{ name: 'endBay', type: 'auto'},
		{ name: 'reservedSlot', type: 'auto'}
		]
});