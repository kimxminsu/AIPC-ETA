Ext.define('Iotos.view.grid.GridSearch', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.grid-search',
    enableKeyEvents: true,
    autoSearch: true,
    dataIndex: '',
    triggers:{
        search: {
            cls: 'x-form-search-trigger',
            handler: function() {
                this.setFilter(this.dataIndex)
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function() {
                this.setValue('')
                if(!this.autoSearch) this.setValue('');
            }
        }
    },
    setFilter: function() {
        var grid = this.up('grid'),
            filterField = this,
            filters = grid.store.getFilters();
            
        if (filterField.value) {
            this.filter = filters.add({
                id: this.dataIndex,
                property: this.dataIndex,
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
    listeners: {
        keyup: function() {
            if(this.autoSearch) this.setFilter(this.dataIndex)
        },
        buffer: 500
    }
})