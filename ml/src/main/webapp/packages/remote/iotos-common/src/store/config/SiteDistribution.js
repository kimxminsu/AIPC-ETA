Ext.define('Iotos.store.SiteDistribution',{
	extend: 'Ext.data.Store',
	alias: 'store.sitedistribution',
	model : 'Iotos.model.config.SiteDistribution',
	storeId: 'siteDistributionStore',
	proxy : {
	    type: 'rest',
	    url: ESVC.config.Locale.getRestApiDestUrl() + '/dm/siteDistribution'
	}
});