Ext.define('ESVC.model.common.meta.MetaEntity', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'sysCd',
		type: 'string'
	}, {
		name: 'cfgTp',
		type: 'string'
	}, {
		name: 'cfgId',
		type: 'string'
	}, {
		name: 'cfgNm',
		type: 'string'
	}, {
		name: 'cfgDesc',
		type: 'string'
	},{
		name: 'updDt',
		type: 'date',
		dateFormat: 'time'
	}]
});