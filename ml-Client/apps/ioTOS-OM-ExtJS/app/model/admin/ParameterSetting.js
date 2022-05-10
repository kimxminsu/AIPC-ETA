Ext.define('IoTosOmExt.model.admin.ParameterSetting', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'category',
			type:'string'
		},
		{
			name:'code',
			type:'string'
		},
		{
			name:'settingChk',
			type:'string'
		},
		{
			name:'value',
			type:'string'
		},
		{
			name:'description',
			type:'string'
		}

	]
});