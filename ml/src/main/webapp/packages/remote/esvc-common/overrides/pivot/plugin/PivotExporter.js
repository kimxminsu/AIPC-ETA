/**
 * This plugin allows pivot grid data export using various exporters. Each exporter should extend
 * the {@link Ext.exporter.Base} class.
 *
 * Two new methods are created on the pivot grid by this plugin:
 *
 *  - saveDocumentAs(config): saves the document
 *  - getDocumentData(config): returns the document content
 *
 * Example usage:
 *
 *
 *      {
 *          xtype: 'pivotgrid',
 *          plugins: {
 *              pivotexporter: true
 *          }
 *      }
 *
 *      pivot.saveDocumentAs({
 *          type: 'xlsx',
 *          title: 'My export',
 *          fileName: 'myExport.xlsx'
 *      });
 *
 *
 * When the exported data needs to be formatted then the {@link Ext.pivot.dimension.Item#exportStyle}
 * can be used on either left axis or aggregate dimensions.
 *
 *      {
 *          xtype: 'pivotgrid',
 *
 *          matrix: {
 *              aggregate: [{
 *                  dataIndex:  'value',
 *                  header:     'Total',
 *                  aggregator: 'sum',
 *                  exportStyle: {
 *                      format: 'Currency',
 *                      alignment: {
 *                          horizontal: 'Right'
 *                      }
 *                  }
 *              }],
 *
 *              leftAxis: [{
 *                  dataIndex:  'date',
 *                  header:     'Transaction date',
 *                  exportStyle: {
 *                      format: 'Short Date',
 *                      alignment: {
 *                          horizontal: 'Right'
 *                      }
 *                  }
 *              },{
 *                  dataIndex:  'company',
 *                  header:     'Company',
 *                  sortable:   false
 *              }]
 *          }
 *          // ...
 *      }
 *
 */
Ext.define('ESVC.pivot.plugin.PivotExporter', {
	override: 'Ext.pivot.plugin.Exporter',
     

    /**
     * @inheritdoc
     */
    prepareData: function(config){
        var me = this,
            table, matrix, group, columns, headers, total, i, j, dLen, tLen,
            dataIndexes, row, value, cells;
       
        me.matrix = matrix = me.cmp.getMatrix();
        me.onlyExpandedNodes = (config && config.onlyExpandedNodes);

        if(!me.onlyExpandedNodes){
            me.setColumnsExpanded(matrix.topAxis.getTree(), true);
        }

        columns = Ext.clone(matrix.getColumnHeaders());
        headers = me.getColumnHeaders(columns, config);
        dataIndexes = me.getDataIndexColumns(columns);

        if(!me.onlyExpandedNodes){
            me.setColumnsExpanded(matrix.topAxis.getTree());
        }

        group = {
            columns: headers,
            groups: []
        };
        me.extractGroups(group, matrix.leftAxis.getTree(), dataIndexes);

        tLen = matrix.totals.length;
        dLen = dataIndexes.length;

        if(tLen) {
            group.summaries = [];
            for (i = 0; i < tLen; i++) {
                total = matrix.totals[i];

                row = {
                    cells: [{
                        value: total.title
                    }]
                };

                for (j = 1; j < dLen; j++) {
                    value = total.record.data[dataIndexes[j].dataIndex];
                    //2020/04/24ByAnna) replace '' instead of '0' in summary group item
                    row.cells.push({
//                        value: (value == null || value === 0) && matrix.showZeroAsBlank ? '' : value
                    	  value: (Ext.isEmpty(value)|| (value === 0 && this.matrix.showZeroAsBlank))  ? ((dataIndexes[j].dataIndex).indexOf("c") === -1 ? '':0) : value
                              	
                    });
                }
                group.summaries.push(row);
            }
        }

        me.matrix = me.onlyExpandedNodes = null;

        return new Ext.exporter.data.Table(group);
    },

    /**
     * Extract data from left axis groups.
     *
     * @param group
     * @param items
     * @param columns
     *
     * @returns {Object}
     *
     * @private
     */
    extractGroups: function(group, items, columns){
        var i, j, iLen, cLen, doExtract, item, row,
            subGroup, record, value, cells;

        iLen = items.length;
        for(i = 0; i < iLen; i++){
            item = items[i];

            if(item.record){
                group.rows = group.rows || [];

                cells = [];
                row = {
                    cells: cells
                };
                for(j = 0; j < columns.length; j++){
                    value = item.record.data[columns[j].dataIndex];
                    //2020/04/24ByAnna) replace '' instead of '0' in summary group item
                    cells.push({
//                        value: (value == null || value === 0) && this.matrix.showZeroAsBlank  ? '' : value
                    	  value: (Ext.isEmpty(value)|| (value === 0 && this.matrix.showZeroAsBlank))  ? ((columns[j].dataIndex).indexOf("c") === -1 ? '':0) : value
                    });
                }
                group.rows.push(row);
            }else if(item.children){
                group.groups = group.groups || [];

                subGroup = {
                    text: item.name
                };
                doExtract = this.onlyExpandedNodes ? item.expanded : true;

                if(doExtract) {
                    this.extractGroups(subGroup, item.children, columns);
                }

                subGroup.summaries = [];
                cells = [{
                    value: (doExtract ? item.getTextTotal() : item.value)
                }];
                row = {
                    cells: cells
                };

                record = (item.expanded ? item.records.expanded : item.records.collapsed);
                cLen = columns.length;
                for(j = 1; j < cLen; j++){
                    value = record.data[columns[j].dataIndex];
                  //2020/04/24ByAnna) replace '' instead of '0' in summary group item
                    cells.push({
//                        value: (value == null || value === 0) && this.matrix.showZeroAsBlank  ? '' : value
                    	  value: (Ext.isEmpty(value)|| (value === 0 && this.matrix.showZeroAsBlank))  ? ((columns[j].dataIndex).indexOf("c") === -1 ? '':0) : value
                    	
                    });
                }
                subGroup.summaries.push(row);
                group.groups.push(subGroup);
            }
        }
    }


});
