Ext.define('ESVC.model.common.export.GridCellItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'text',
			type:'string'
		},
		{
			name:'halign',
			type:'string'
		},
		{
			name:'childrens',
			mapping: 'childrensMap'
		},
		{
			name:'dataField',
			type:'string'
		},
		{
			name:'mergeX',
			type:'int'
		},
		{
			name:'mergeY',
			type:'int'
		},
		{
			name:'mergeX1',
			type:'int'
		},
		{
			name:'mergeY1',
			type:'int'
		}
	],
	associations: [{
	type: 'hasMany',
	name: 'childrensMap',
	model: 'ESVC.model.common.export.GridCellItem'
}]
});