Ext.define('ESVC.model.common.export.StringValueItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'key',
			type:'string'
		},
		{
			name:'value',
			mapping: 'string'
		}
	]
});