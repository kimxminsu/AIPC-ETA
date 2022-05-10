Ext.define('TSB.grid.filters.filter.List', {
    override: 'Ext.grid.filters.filter.List',
    
    gridStoreListenersCfg: {
    	buffer: 10,
        add: 'onDataChanged',
        refresh: 'onDataChanged',
        remove: 'onDataChanged',
        update: 'onDataChanged'
    },
    
    getOptionsFromStore: function (store) {
        var me = this,
            data = store.getData(),
            map = {},
            ret = [],
            dataIndex = me.dataIndex,
            labelIndex = me.labelIndex,
            recData, idValue, labelValue;

        if (store.isFiltered() && !store.remoteFilter) {
            data = data.getSource();
        }

        // Use store type agnostic each method.
        // TreeStore and Store implement this differently.
        // In a TreeStore, the items array only contains nodes
        // below *expanded* ancestors. Nodes below a collapsed ancestor
        // are removed from the collection. TreeStores walk the tree
        // to implement each.
        store.each(function(record) {
            recData = record.data;

            idValue = recData[dataIndex];
            labelValue = recData[labelIndex];

            if (labelValue === undefined) {
                labelValue = idValue;
            }
            
            //TSB: To handle Null and Empty
            if(!idValue) {
                idValue = 'Tsb-Null';
                labelValue = '#Blank';
            }

            // TODO: allow null?
            //if ((allowNull || !Ext.isEmpty(value)) && !map[strValue1]) {
            if (!map[idValue]) {
                map[idValue] = 1;
                ret.push([idValue, labelValue]);
            }
        }, null, {
            filtered: true,     // Include filtered out nodes.
            collapsed: true     // Include nodes below collapsed ancestors.
        });

        return ret;
    },
    
    setValue: function () {
        var me = this,
            items = me.menu.items,
            value = [],
            i, len, checkItem;

        // The store filter will be updated, but we don't want to recreate the list store or the menu items in the
        // onDataChanged listener so we need to set this flag.
        // It will be reset in the onDatachanged listener when the store has filtered.
        me.preventDefault = true;

        for (i = 0, len = items.length; i < len; i++) {
            checkItem = items.getAt(i);

            if (checkItem.checked) {
            	//TSB: To handle Null and Empty
                if(checkItem.value === 'Tsb-Null') {
                    value.push('');
                } else {
                    value.push(checkItem.value);
                }
            }
        }

        // Only update the store if the value has changed
        if (!Ext.Array.equals(value, me.filter.getValue())) {
            me.filter.setValue(value);
            len = value.length;

            if (len && me.active) {
                me.updateStoreFilter();
            } else {
                me.setActive(!!len);
            }
        }
    }
});