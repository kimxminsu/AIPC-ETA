Ext.define('Iotos.model.yarddefine.BlockTierPri', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * BlockTierPri
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'rowIdx', type: 'string'},
		{ name: 'tier', type: 'string'},
		{ name: 'blockUse', type: 'string'},
		{ name: 'equType', type: 'string'},
		{ name: 'priority', type: 'auto'}
		]
});