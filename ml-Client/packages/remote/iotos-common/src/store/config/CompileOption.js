Ext.define('Iotos.store.CompileOption',{
	extend: 'Ext.data.Store',
	alias: 'store.compileoption',
	model : 'Iotos.model.config.CompileOption',
    storeId: 'compileOptionStore',
	proxy : {
	    type: 'rest',
	    url: ESVC.config.Locale.getRestApiDestUrl() + '/dm/compileOption'
	}
});