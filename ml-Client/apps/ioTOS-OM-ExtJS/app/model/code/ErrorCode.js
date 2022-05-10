Ext.define('IoTosOmExt.model.code.ErrorCode', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'errCode',
		type:'string'
	},
	{
		name:'errName',
		type:'string'
	},
	{
		name:'errReason',
		type:'string'
	},
	{
		name:'msgId',
		type:'string'
	},
	{
		name:'msgVer',
		type:'string'
	},
	{
		name:'apkCheck',
		type:'string'
	},
	{
		name:'errType',
		type:'string'
	},
	{
		name:'displayErrType',
		type:'string',
		convert:function(value, record){
			return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.ERROR_TYPES, record.get('errType'));
		},
        depends: 'errType'
	},
	{
		name:'remapCheck',
		type:'string'
	},
	{
		name:'remapEnabled',
		type:'string'
	},
	{
		name:'apkEnabled',
		type:'string'
	},
	{
		name:'warnEnabled',
		type:'string'
	}
	]
});