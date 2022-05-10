// Ext.define('ESVC.plugin.CellClipboard', {
//     override: 'Ext.grid.plugin.Clipboard',
//     //!다른부분
//     config: {
//     	mode:'Cell', // 'Cell', 'Row'
//     },
    
    
//     getCellData: function (format, erase) {
//         var cmp = this.getCmp(),
//             selection = cmp.getSelectionModel().getSelected(),
//             ret = [],
//             isRaw = format === 'raw',
//             isText = format === 'text',
//             viewNode,
//             cell, data, dataIndex, lastRecord, column, record, row, view;

//         var mode = this.mode; //!다른부분

//         if(selection) {
//             selection.eachCell(function (cellContext) {
//                 column = cellContext.column,
//                     view = cellContext.column.getView();
//                 record = cellContext.record;
                
//                 //!다른부분
//                 if(mode && mode === 'Cell')
//                 {
//                     if(!column.dataIndex || column.dataIndex != cmp.selectedDataIndex)
//                     {
//                         debugger;
//                     }
//                 	return;
//                 }

//                 // Do not copy the check column or row numberer column
//                 if (column.ignoreExport) {
//                     return;
//                 }

//                 if (lastRecord !== record) {
//                     lastRecord = record;
//                     ret.push(row = []);
//                 }

//                 dataIndex = column.dataIndex;

//                 if (isRaw) {
//                     data = record.data[dataIndex];
//                 }
//                 else {
//                     // Try to access the view node.
//                     viewNode = view.all.item(cellContext.rowIdx);

//                     // If we could not, it's because it's outside of the rendered block - recreate it.
//                     if (!viewNode) {
//                         viewNode = Ext.fly(view.createRowElement(record, cellContext.rowIdx));
//                     }

//                     cell = viewNode.dom.querySelector(column.getCellInnerSelector());
//                     data = cell.innerHTML;

//                     if (isText) {
//                         data = Ext.util.Format.stripTags(data);
//                     }
//                 }

//                 row.push(data);

//                 if (erase && dataIndex) {
//                     record.set(dataIndex, null);
//                 }
//             });
//         }

//         return Ext.util.TSV.encode(ret);
    
//     }
// });
