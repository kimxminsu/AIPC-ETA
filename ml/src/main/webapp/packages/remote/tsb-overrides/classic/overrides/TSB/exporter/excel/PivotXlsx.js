Ext.define('TSB.exporter.excel.PivotXlsx', {
	override: 'Ext.exporter.excel.PivotXlsx',

	buildStoreRows: function(store){
        var result = {
                rows: [],
                cache: [],
                fields: [],
                uniqueValues: {}
            },
            fields, i, j, len, length, field, row, record, item, cache;
        
        //Differentiate the chained store to get the fields
        if(store.type === 'chained') {
            fields = store.source.model.getFields()
        } else {
            fields = store.model.getFields();
        }
        
        len = fields.length;
        for (i = 0; i < len; i++) {
            field = fields[i].getName();
            result.fields.push(field);
            result.uniqueValues[field] = [];
        }

        length = store.data.length;
        for (i = 0; i < length; i++) {
            row = [];
            cache = [];
            record = store.data.items[i];
            for (j = 0; j < len; j++) {
                field = result.fields[j];
                item = record.get(field);
                row.push({
                    value: item
                });
                cache.push(item);
                if(Ext.Array.indexOf(result.uniqueValues[field], item) === -1) {
                    result.uniqueValues[field].push(item);
                }
            }
            result.rows.push(row);
            result.cache.push(cache);
        }

        return result;
    },
});