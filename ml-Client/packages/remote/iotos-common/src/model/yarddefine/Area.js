Ext.define('Iotos.model.yarddefine.Area', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 *  Area
	 * **********************************/

    fields: [
        { name: 'name', type: 'string'},
        { name: 'index', type: 'auto'},
        { name: 'use1', type: 'string'},
        { name: 'use2', type: 'string'},
        { name: 'wdChk', type: 'string'},
        { name: 'icChk', type: 'string'},
        { name: 'x', type: 'auto'},
        { name: 'y', type: 'auto'},
        { name: 'w', type: 'auto'},
        { name: 'l', type: 'auto'},
        { name: 'deg', type: 'auto'},
        { name: 'tgs', type: 'auto'},
        { name: 'capacity', type: 'auto'},
        { name: 'yardId', type: 'string'},
        { name: 'maxBay', type: 'auto'},
        { name: 'maxRow', type: 'auto'},
        { name: 'maxTier', type: 'auto'},
        { name: 'workQty', type: 'string'},
        { name: 'workQtyBackColor', type: 'string'},
        { name: 'workQtyForeColor', type: 'string'},
        { name: 'foreColor', type: 'string'},
        { name: 'backColor', type: 'string'},
        { name: 'remark', type: 'string'},
        { name: 'sideLift', type: 'string'},
        { name: 'carrierType', type: 'string'}
        ]
});