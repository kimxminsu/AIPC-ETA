Ext.define('Iotos.view.grid.GridColumnFilter', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.grid-columnfilter',
    width: '100%',
    enableKeyEvents: true,
    listeners: {
        keyup: function() {
            var grid = this.up('grid'),
                filterField = this,
                filters = grid.store.getFilters();
                
            if (filterField.value) {
                this.filter = filters.add({
                    id: this.up().dataIndex,
                    property: this.up().dataIndex,
                    value: filterField.value,
                    anyMatch: true,
                    caseSensitive: false
                });
            }
            else if (this.filter) {
                filters.remove(this.filter);
                this.filter = null;
            }
        },
        buffer: 500
    }
})