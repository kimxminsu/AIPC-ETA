Ext.define('Iotos.model.container.SearchCntrDefault', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
    fields: [
        { name: 'temperature', type:'string'},
        { name: 'imdgClass', type:'string'},
        { name: 'unno', type:'string'},
        { name: 'fe', type:'string'},
        { name: 'isOverSize', type:'boolean'},
        { name: 'currCargoType', type:'string'},
        { name: 'sztp', type:'string'},
        { name: 'sztp2', type:'string'},
        { name: 'cargoType', type:'string'},
        { name: 'defaultMaxValue', type:'number'},
        { name: 'laneCd', type:'string'},
        { name: 'vslCd', type:'string'},
        { name: 'wgt', type:'int'},
        { name: 'sztpCode', type:'string'},
        { name: 'oprCode', type:'string'},
        { name: 'newIsoCode', type:'string'},
        { name: 'cntrNo', type:'string'}
    ]
});