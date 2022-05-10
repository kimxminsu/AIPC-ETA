Ext.define('Iotos.model.yarddefine.Terminal', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * Terminal
	 * **********************************/

	fields: [
		{ name: 'tmnlCd', type: 'string'},
		{ name: 'tmnlNm', type: 'string'},
		{ name: 'port', type: 'string'},
		{ name: 'length', type: 'auto'},
		{ name: 'height', type: 'auto'},
		{ name: 'extX', type: 'auto'},
		{ name: 'extY', type: 'auto'},
		{ name: 'emptyChar', type: 'string'},
		{ name: 'unSegregationChk', type: 'string'},
		{ name: 'strgVsl', type: 'string'},
		{ name: 'teu', type: 'auto'},
		{ name: 'terminalCapacitySourceList', type: 'auto'},
		{ name: 'layoutAxis', type: 'string'},
		{ name: 'berthDir', type: 'string'},
		{ name: 'normalYSlotHorizontalGap', type: 'auto'},
		{ name: 'normalYSlotVerticalGap', type: 'auto'},
		{ name: 'scYSlotHorizontalGap', type: 'auto'},
		{ name: 'scYSlotVerticalGap', type: 'auto'},
		{ name: 'qcCoverageByBitt', type: 'string'},
		{ name: 'useYSlotUsage', type: 'string'}
		]
});