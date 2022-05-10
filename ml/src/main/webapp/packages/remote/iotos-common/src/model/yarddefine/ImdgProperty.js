Ext.define('Iotos.model.yarddefine.ImdgProperty', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * ImdgProperty
	 * **********************************/

	fields: [
		{ name: 'DICTIONARY_KEY_DELIMITER', type: 'string'},
		{ name: 'cls', type: 'string'},
		{ name: 'unno', type: 'string'},
		{ name: 'packingGrp', type: 'string'},
		{ name: 'subRisk1', type: 'string'},
		{ name: 'subRisk2', type: 'string'},
		{ name: 'limitQty', type: 'string'},
		{ name: 'equQty', type: 'string'}
		]
});