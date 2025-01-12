Ext.define('ESVC.model.popup.CommonCodePopup', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'code',
			type:'string'
		},
		{
			name:'name',
			type:'string'
		},
		{
			name:'codeWithName',
			calculate:function(data){
				return data.code + " : " + data.name;
			}
		},
		{
			name:'type',
			type:'string'
		},
		{
			name:'typeName',
			type:'string'
		},
		{
			name:'foreColor',
			type:'string'
		},
		{
			name:'backColor',
			type:'string'
		},
		{
			name:'value1',
			type:'string'
		},
		{
			name:'value2',
			type:'string'
		},
		{
			name:'value3',
			type:'string'
		},
		{
			name:'value4',
			type:'string'
		},
		{
			name:'value5',
			type:'string'
		},
		{
			name:'useCheck',
			type:'string'
		},
		{
			name:'defaultSelect',
			type:'string'
		},
		{
			name:'codeGroup',
			type:'string'
		},
		{
			name:'byte1',
			type:'auto'
		}
	]
});