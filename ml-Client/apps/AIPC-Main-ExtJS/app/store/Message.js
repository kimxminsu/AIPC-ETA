Ext.define('Aipc.Main.store.Message',{
	extend: 'Ext.data.Store',
	alias: 'store.message',
	model : 'Aipc.Main.model.message.Message',
	pageSize: 50,
	proxy : {
		type : 'rest',
		url: Aipc.Main.config.Locale.getRestApiDestUrl() + '/v1/notifications/messages',
        reader: {
            type: 'json',
//            successProperty: 'success',
            totalProperty: 'response.totalCount'
        }
	}
});