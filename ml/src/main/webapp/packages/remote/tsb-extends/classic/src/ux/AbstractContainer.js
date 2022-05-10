Ext.define('TSB.ux.AbstractContainer', {
    /**
     * @memberOf erest.track_event
     */
    extend: 'Ext.container.Container',

    requires: [
        'Ext.data.StoreManager',
        'Ext.data.Store'
    ],
    
    config: {

        /**
         * @cfg {Ext.data.Store} store
         * The store that supplies data to this chart.
         */
        store: 'ext-empty-store'

    },
    
    constructor: function (config) {
//    	console.log('constructor');
        var me = this;
        me.callParent(arguments);
    },

    
    applyStore: function (store) {
//    	console.log('applyStore');
        return store && Ext.StoreManager.lookup(store);
    },
    
    updateStore: function (newStore, oldStore) {
//    	console.log('updateStore');
        var me = this;
        if (oldStore) {
            oldStore.un({
                add: 'onAdd',
                update: 'onUpdate',
                remove: 'onRemove',
                load: 'onLoad',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
            	add: 'onAdd',
                update: 'onUpdate',
                remove: 'onRemove',
	            load: 'onLoad',
	            scope: me,
	            order: 'after'
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onLoad();
    },

    rebind: function () {
//    	console.log('rebind');
        this.fireEvent('rebind', this);
    },


	/**
     * @private
     */
    onAdd: function (store, records, index, eOpts) {
//    	console.log('onAdd');
        var me = this;
        me.rebind('add', records);
    },
    
	/**
     * @private
     */
    onUpdate: function (store, record, operation, modifiedFieldNames, details, eOpts) {
//    	console.log('onUpdate');
        var me = this;
        if(operation === 'edit') {
            me.rebind('udpate', record);
        }
    },
    
	/**
     * @private
     */
    onRemove: function (store, records, index, isMove, eOpts) {
//    	console.log('onRemove');
        var me = this;
        
        me.rebind('remove', records);
    },
    
	/**
     * @private
     */
    onLoad: function () {
//    	console.log('onLoad');
        var me = this;
        var store = me.getStore();
         
        if (!store) {
        	return;
        }
         
        me.rebind('load', null);
    },


    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this chart.
     */
    bindStore: function (store) {
//    	console.log('bindStore');
    	var me = this;
        me.setStore(store);
    },

    // @private remove gently.
    destroy: function () {
//    	console.log('destroy');
        var me = this,
            emptyArray = [];
        me.store = null;
        me.cancelLayout();
        this.callParent(arguments);
    },

    toastMessage: function (message, title, type, modal) {
    	this.fireEvent('toastMessage', message, title, type, modal);
    }
});