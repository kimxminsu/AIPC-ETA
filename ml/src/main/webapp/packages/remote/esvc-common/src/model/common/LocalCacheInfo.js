Ext.define('ESVC.model.common.LocalCacheInfo', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'key',
		type: 'string'
	}, {
		name: 'code',
		type: 'string'
	}, {
		name: 'codeName',
		type: 'string'
	}, {
		name:'items',
		mapping: 'localCacheInfoMap'
	}
	],
    associations: [{
		type: 'hasMany',
		name: 'localCacheInfoMap',
		model: 'ESVC.model.common.LocalCacheInfo'
	}]
});