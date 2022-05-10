Ext.define('ESVC.model.common.export.GridItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'thousandSeparator',
			type:'string'
		},
		{
			name:'decimalPoint',
			type:'string'
		},
		{
			name:'headColumnCount',
			type:'int'
		},
		{
			name:'headers',
			mapping: 'headersMap'
		}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'headersMap',
		model: 'ESVC.model.common.export.GridCellItem'
	}]
});