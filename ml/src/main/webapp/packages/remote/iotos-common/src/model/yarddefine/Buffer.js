Ext.define('Iotos.model.yarddefine.Buffer', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Buffer
	 * **********************************/

	fields: [
		{ name: 'buffer', type: 'string'},
		{ name: 'block', type: 'string'},
		{ name: 'bayIdx', type: 'auto'},
		{ name: 'rowIdx', type: 'auto'},
		{ name: 'mxTier', type: 'auto'},
		{ name: 'passTier', type: 'auto'},
		{ name: 'tpType', type: 'string'},
		{ name: 'tpCoverageSourceList', type: 'auto'}
		]
});