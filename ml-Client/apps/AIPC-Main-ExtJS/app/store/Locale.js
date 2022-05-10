Ext.define('Aipc.Main.store.Locale',{
	extend: 'Ext.data.Store',
	alias: 'store.locale',
	model : 'ESVC.model.common.meta.MetaValue',
	proxy : {
	    type: 'ajax',
	    url: 'resources/temp/locale.json',
	    reader: {
           type: 'json',
           rootProperty: 'data'
	    }
	}
});