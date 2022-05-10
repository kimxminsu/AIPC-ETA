Ext.define('TSB.grid.plugin.Exporter', {
    override: 'Ext.grid.plugin.Exporter',
    
    getCell: function(store, record, colDef) {
        var v = record.get(colDef.dataIndex);
        
        //Overriding code to prevent &, <, >, ', and "
        v = Ext.util.Format.htmlDecode(v); 
        
        return {
            value: colDef.fn(v, null, record, store.indexOf(record), colDef.colIndex, store, this.cmp.getView())
        };
    }   
});