Ext.define('Iotos.model.yarddefine.YSlot', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 *  YSlot
	 * **********************************/

	fields: [
		{ name: 'block', type: 'string'},
		{ name: 'bay', type: 'auto'},
		{ name: 'row', type: 'auto'},
		{ name: 'cpo', type: 'auto'},
		{ name: 'atmxtier', type: 'auto'},
		{ name: 'dgChk', type: 'string'},
		{ name: 'rfChk', type: 'string'},
		{ name: 'akChk', type: 'string'},
		{ name: 'niuRsn', type: 'string'},
		{ name: 'ex20Chk', type: 'string'},
		{ name: 'ex30Chk', type: 'string'},
		{ name: 'ex40Chk', type: 'string'},
		{ name: 'ex45Chk', type: 'string'},
		{ name: 'allowTwin', type: 'string'},
		{ name: 'x', type: 'auto'},
		{ name: 'y', type: 'auto'},
		{ name: 'endX', type: 'auto'},
		{ name: 'endY', type: 'auto'},
		{ name: 'maxWeight20', type: 'auto'},
		{ name: 'maxWeight40', type: 'auto'},
		{ name: 'maxWeight45', type: 'auto'},
		{ name: 'wgtGrpE', type: 'string'},
		{ name: 'wgtGrpL', type: 'string'},
		{ name: 'wgtGrpM', type: 'string'},
		{ name: 'wgtGrpH', type: 'string'},
		{ name: 'wgtGrpX', type: 'string'},
		{ name: 'key', type: 'string'},
		{ name: 'maxHeight', type: 'auto'}
		]
});