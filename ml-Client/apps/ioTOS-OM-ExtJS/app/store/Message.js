Ext.define('IoTosOmExt.store.Message',{
	extend: 'Ext.data.Store',
	alias: 'store.message',
	model : 'IoTosOmExt.model.message.Message',
	pageSize: 50,
	proxy : {
		type : 'rest',
		url: IoTosOmExt.config.Locale.getRestApiDestUrl() + '/v1/notifications/messages',
        reader: {
            type: 'json',
//            successProperty: 'success',
            totalProperty: 'response.totalCount'
        }
	}
});