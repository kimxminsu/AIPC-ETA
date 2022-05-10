Ext.define('ESVC.util.ServerServiceUtil', {
	singleton: true,
	alternateClassName: 'ServerServiceUtil',

	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	
	getPopupStore: function(param){
		var store = Ext.create('ESVC.store.Popup');
		
		ServerServiceUtil.loadPopupStore(store, param);

		return store;
	},

	loadPopupStore: function(store, param) {
		var params = {};
		
		if (param === null || param === undefined) {
			return null;
		}

		if (typeof param === 'string') {
			params['itemKey'] = param;
		} else {
			params['itemKey'] = param.data.itemKey;
			params['ixCD'] = param.data.ixCD;
			params['vesselCode'] = param.data.vesselCode;
			params['callYear'] = param.data.callYear;
			params['callSeq'] = param.data.callSeq;
			params['voyage'] = param.data.voyage;
			params['etaFrom'] = param.data.etaFrom;
			params['etaTo'] = param.data.etaTo;
			params['fromDate'] = param.data.fromDate;
			params['toDate'] = param.data.toDate;
			params['args'] = param.data.args; // js.sim 기타 항목을 넣을떼 사용 
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
	}
	
	//for cache
	// config: {
	// 	_store : null,
	// 	_storeArray: null
	// },
	
	// constructor: function(config) {
	// 	this.initConfig(config);
	// 	this.callParent(arguments);
	// },
	
	// getPopupStore: function(itemKey){
	// 	var store;

	// 	if (itemKey == undefined) 
	// 		store = this.getSotre();
	// 	else 
	// 		store = this.getSotreWithItemKey(itemKey);
		
	// 	return store;
	// },

	// setPopupStore: function(itemKey) {
	// 	var store = this.getSotreWithItemKey(itemKey);

	// 	this.setSotreWithItemKey(itemKey, store);
	// },

	// /**
	//  * =========================================================================================================================
	//  * PRIVATE METHOD START
	//  */
	// getSotre: function() {
	// 	if(this._store == null)
	// 		this._store = Ext.create('ESVC.store.Popup');

	// 	return this._store;
	// },

	// getSotreWithItemKey: function(itemKey) {
	// 	if(itemKey == undefined || itemKey == null) 
	// 		return null;
			
	// 	if (this._storeArray == null)
	// 		this._storeArray = {};

	// 	if (this._storeArray[itemKey] == null) {
	// 		this._storeArray[itemKey] = Ext.create('ESVC.store.Popup');

	// 		this.setSotreWithItemKey(itemKey, this._storeArray[itemKey]);
	// 	}

	// 	return this._storeArray[itemKey];
	// },

	// setSotreWithItemKey: function(itemKey, store) {
	// 	if(itemKey == undefined || itemKey == null) 
	// 		return;
	// 	if(store == undefined || store == null) 
	// 		return;

	// 	var params = {};
	// 	params['itemKey'] = itemKey;

	// 	store.load({
	// 		params: params,
	// 		callback: function(records, operation, success) {
	// 			if (success) {
	// 				if (records.length > 0) {

	// 				}
	// 			}
	// 		}
	// 	});
	// }
	// /**
	//  * =========================================================================================================================
	//  * PRIVATE METHOD END
	//  */
});