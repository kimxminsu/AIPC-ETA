Ext.define('ESVC.model.common.export.FileExportServiceBizParm', {
	extend : 'ESVC.model.foundation.parm.BizParm',
	fields: [
		{
			name:'classID',
			type:'string'
		},
		{
			name:'serviceID',
			type:'string'
		},
		{
			name:'searchConditions',
			mapping: 'stringValueMap'
		}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'stringValueMap',
		model: 'ESVC.model.common.export.StringValueItem'
	}]
});