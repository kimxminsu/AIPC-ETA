Ext.define('TSB.grid.plugin.CellEditing', {
    override: 'Ext.grid.plugin.CellEditing',
    onEditComplete: function(ed, value, startValue) {
        var me = this,
            context = ed.context,
            view, record;
 
        view = context.view;
        record = context.record;
        context.value = value;
 
        // Only update the record if the new value is different than the 
        // startValue. When the view refreshes its el will gain focus 
        if (!record.isEqual(value, startValue)) {
        	//Make it uppercase on purpose
        	//Error in case of numberfield
//        	record.set(context.column.dataIndex, value ? value.toUpperCase() : value);
        	
        	record.set(context.column.dataIndex, value);
        	
            // Changing the record may impact the position 
            context.rowIdx = view.indexOf(record);
        }
 
        me.fireEvent('edit', me, context);
 
        // We clear down our context here in response to the CellEditor completing. 
        // We only do this if we have not already started editing a new context. 
        if (me.context === context) {
            me.setActiveEditor(null);
            me.setActiveColumn(null);
            me.setActiveRecord(null);
            me.editing = false;
        }
    }
});