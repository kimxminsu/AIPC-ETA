Ext.define('Iotos.model.yarddefine.GC', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * GC
	 * **********************************/

	fields: [
		{ name: 'name', type: 'string'},
		{ name: 'index', type: 'auto'},
		{ name: 'boomupTime', type: 'auto'},
		{ name: 'speed', type: 'auto'},
		{ name: 'wLoad', type: 'auto'},
		{ name: 'lift', type: 'auto'},
		{ name: 'widthLeft', type: 'auto'},
		{ name: 'widthRight', type: 'auto'},
		{ name: 'wph', type: 'auto'},
		{ name: 'foreColor', type: 'string'},
		{ name: 'backColor', type: 'string'},
		{ name: 'startPos', type: 'auto'},
		{ name: 'endPos', type: 'auto'},
		{ name: 'fromBitt', type: 'string'},
		{ name: 'fromBittDtl', type: 'auto'},
		{ name: 'toBitt', type: 'string'},
		{ name: 'toBittDtl', type: 'auto'},
		{ name: 'powerPos', type: 'string'},
		{ name: 'group', type: 'auto'},
		{ name: 'maxRow', type: 'auto'},
		{ name: 'yardId', type: 'string'},
		{ name: 'outReach', type: 'auto'},
		{ name: 'backReach', type: 'auto'},
		{ name: 'railSpan', type: 'auto'},
		{ name: 'mobileCraneChk', type: 'string'},
		{ name: 'equtype1', type: 'string'},
		{ name: 'remark', type: 'string'},
		{ name: 'referenceId', type: 'string'},
		{ name: 'twinliftchk', type: 'string'},
		{ name: 'tandems', type: 'string'},
		{ name: 'twinWgtTolerance', type: 'auto'},
		{ name: 'qcBreadth20Bays', type: 'auto'},
		{ name: 'maxTotalTandemWgt', type: 'auto'},
		{ name: 'tandemWgtTolerance', type: 'auto'},
		{ name: 'tandemHeightTolerance', type: 'auto'},
		{ name: 'tandem20LiftChk', type: 'string'},
		{ name: 'tandem40LiftChk', type: 'string'},
		{ name: 'localName', type: 'string'},
		{ name: 'sapCd', type: 'string'},
		{ name: 'craneType', type: 'string'},
		{ name: 'unUsedChk', type: 'auto'},
		{ name: 'isTandem', type: 'auto'}
		]
});