Ext.define('ESVC.model.common.meta.MetaValue', {
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
		name: 'keyNm',
		type: 'string'
	}, {
		name: 'keyVal',
		type: 'string'
	}, {
		name: 'keyDesc',
		type: 'string'
	}]
});