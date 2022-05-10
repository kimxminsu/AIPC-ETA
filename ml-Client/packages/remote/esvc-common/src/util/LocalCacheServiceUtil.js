Ext.define('ESVC.util.LocalCacheServiceUtil', {
	singleton: true,
	alternateClassName: 'LocalCacheServiceUtil',	

	config: {
		localCacheStore : null
	},
	
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	
	// Set To ComboBox with LocalCache
	setComboBoxWithLocalCache : function(me, itemKey, storeName){
		var store = me.getStore(storeName);
		var items = LocalCacheServiceUtil.getLocalCacheItems(itemKey);
		
		if(items){
			store.setData(items);
			store.commitChanges();
		}

		return store;
	},

	// Get Local Cache Items
	/**
	 * 
	 * @param {string} itemKey 
	 * @param {*} removeCode string or Array<String>
	 * @param {*} firstValue boolean or CodeItem
	 * @returns Array
	 */
	getLocalCacheItems : function(itemKey, removeCode, firstValue){
		var me = LocalCacheServiceUtil;
		var localCacheInfoStore = me.getLocalCacheStore();
		
		var idx = localCacheInfoStore.findExact('key', itemKey);
		var cacheItems = null;
		
		if(idx >= 0){
			cacheItems = localCacheInfoStore.getAt(idx).get('items');
		}
		
		if (Ext.isDefined(removeCode) && removeCode !=null) {
			cacheItems = cacheItems.filter(function (el) {
				if(Array.isArray(removeCode)){
					return (removeCode.includes(el.code) == false);
				}
				else{
			    return (el.code !== removeCode);
				}
			});
		}
		
		if (Ext.isDefined(firstValue) && firstValue !=null) {
			if(typeof firstValue == 'boolean'){
				if(firstValue)
					firstValue = {code:'', codeName:'All'};
				else
					firstValue = null;
			}
			
			if(firstValue){
				var addCacheItems = new Array();
				addCacheItems.push(firstValue);
				cacheItems.forEach( function( v, i ){
					addCacheItems.push(v);
				});
				
				return addCacheItems;
			}
		}
		
		return cacheItems;
	},

	// Get Local Cache Items for CodeName
	getLocalCacheItemsForCodeName : function(itemKey, code){
		var me = LocalCacheServiceUtil;
		var codeName = null;
		var cacheItems = me.getLocalCacheItems(itemKey);

		if(cacheItems != null){
			var matchRecord = 
				Ext.Array.findBy(cacheItems, function(record){
					if(record.code == code){
						return true;
					}
				});
			
			if(matchRecord){
				return matchRecord.codeName;
			} else {
				return null;
			}
		}
		
		return codeName;
	},
	
	// Get Local Cache Items for Code
	getLocalCacheItemsForCode : function(itemKey, codeName){
		var me = LocalCacheServiceUtil;
		var code = null;
		var cacheItems = me.getLocalCacheItems(itemKey);

		if(cacheItems != null){
			var matchRecord = 
				Ext.Array.findBy(cacheItems, function(record){
					if(record.codeName == codeName){
						return true;
					}
				});
			
			if(matchRecord){
				return matchRecord.code;
			} else {
				return null;
			}
		}
		
		return code;
	},
	
	getLocalStore: function(itemKey) {		
		var store = Ext.create('ESVC.store.Popup');

		LocalCacheServiceUtil.loadLocalStore(store, itemKey);

		return store;
	},

	loadLocalStore: function(store, itemKey) {
		var items = null;

		if ((store === null || store === undefined)
		 || (StringUtil.isNullorEmpty(itemKey) === true)) {
			return null;
		}

		items = LocalCacheServiceUtil.getLocalCacheItems(itemKey);
		if(items){
			store.setData(items);
			store.commitChanges();
		}

		return store;
	}
});