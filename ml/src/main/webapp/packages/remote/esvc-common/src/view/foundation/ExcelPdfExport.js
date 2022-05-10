Ext.define('ESVC.view.foundation.ExcelPdfExport', {
	// Export Excel with Server
	exportExcelPdfWithServer : function(me, gridNameString, searchBizParm, isExcel, addString){
		var current = this;
		var grid = me.lookupReference(gridNameString);
		var exportItem = Ext.create('ESVC.model.common.export.FileExportBizParm');
		var proxy = exportItem.getProxy();
		proxy.url = ESVC.config.Locale.getRestApiDestUrl() + '/v1/fileexport/createFile';
		
		exportItem.set('isExcel', isExcel);
		
		if(addString === undefined){
			addString = me.getView().title;
		}
		
		// Check View Grid Data
		var gridStoreItems = grid.getStore().data.items; 
		if(gridStoreItems.length <= 0){
			return;
		}
		
		current.setExcelPdfExportSearchParam(exportItem, searchBizParm);
		
		var fileName = current.getExcelPdfExportFileName(addString);
		exportItem.set('fileName', fileName);
		var gridItem = Ext.create('ESVC.model.common.export.GridItem');
		
		var gridCellItem = null;
		var headers = new Array();
		var headerItem;
		var childrens = new Array();
		var rows = new Array();
		var rowItem;
		
		var columns = grid.getColumns();
		var headerCount=0;
		var headerRowCount=0;
		var columnText = '';
		columns.forEach(function(column){
			if(column.ownerCt.id.indexOf('gridcolumn')>-1){
				headerRowCount=1;
				return;
			}
		});
		columns.forEach(function(column){
			if(column.xtype !== 'rownumberer' &&
			   column.xtype !== 'checkcolumn' &&
			   column.hidden !== true) {
				if(column.ownerCt.id.indexOf('gridcolumn')>-1){
					var ownerCt = column.ownerCt;
					if(headerItem==null||headerItem.get('headerId')!=ownerCt.headerId){
						childrens = new Array();
						headerItem = current.setCellItem(ownerCt, ownerCt.text, headerCount, 0, headerCount, 0)
						headerItem.set('headerId',ownerCt.headerId);
						headerItem.set('type', 'TEXT');
 					}else{
 						headerItem.set('mergeX1', (headerItem.get('mergeX1')>headerCount?headerItem.get('mergeX'):headerCount));
 						headers.pop();
 					}
					var depth = current.getColumnDepth(column);
					gridCellItem = current.setCellItem(column, column.text, headerCount, depth, headerCount, depth);
					current.setExcelPdfExportColumnType(gridCellItem, column);
					childrens.push(gridCellItem.data);
					headerItem.set('childrens',childrens);
					headers.push(headerItem.data);
					headerCount++;
				}else{
					gridCellItem = current.setCellItem(column, column.text, headerCount, 0, headerCount, headerRowCount);
					current.setExcelPdfExportColumnType(gridCellItem, column);
					headers.push(gridCellItem.data);
					headerCount++;
				}
			}
		});
		gridItem.set('headColumnCount', headerCount);
		gridItem.set('headers', headers);
		gridItem.set('thousandSeparator', ESVC.config.Locale.getThousandSeparator());
		gridItem.set('decimalPoint', ESVC.config.Locale.getDecimalSeparator());
		gridItem.set('headRowCount',headerRowCount);
		var gridItems = new Array();
		gridItems.push(gridItem.data);
		exportItem.set('gridItem', gridItem.data);
		exportItem.set('showTitle', true);
		exportItem.set('showBorder', true);
		
		exportItem.save({
            callback: function(record, operation, success) {
            	if(success) {
            		if(record != null){
            			var content = record.get('content').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
    		        	Ext.exporter.File.saveBinaryAs(content, record.get('name'));
            		}
            	}
            }
		});
	},
	
	// Get Excel Export File Name
	getExcelPdfExportFileName : function(addString){
		var currentDate = new Date();
		var dateString = Ext.Date.format(currentDate, ESVC.config.Locale.getExcelExportDateTimeFormat());
		return Ext.String.format("{0}_{1}_{2}", addString, ESVC.config.Token.getUserId(), dateString);
	},
	
	// Set Excel Export Column Type
	setExcelPdfExportColumnType : function(gridCellItem, column){
		if(column.xtype === 'numbercolumn'){
			gridCellItem.set('type', 'NUMBER');
		} else {
			gridCellItem.set('type', 'TEXT');
		}
	},
	
	// Set Excel Export Search Parameter
	setExcelPdfExportSearchParam : function(exportItem, searchBizParm){
		if(searchBizParm==null) return;
		var searchDataBizParm = Ext.create('ESVC.model.common.export.FileExportServiceBizParm');
		var searchConditions = new Array();
		var searchCondition;

		for (var key in searchBizParm){
			searchCondition = Ext.create('ESVC.model.common.export.StringValueItem');
			searchCondition.set('key', key);
			searchCondition.set('value', searchBizParm[key]);
			searchConditions.push(searchCondition.data);
		}
		
		searchDataBizParm.set('searchConditions', searchConditions);
		searchDataBizParm.set('classID', searchBizParm.classID);
		
		var bizParmMetaInfo = Ext.create('ESVC.model.foundation.parm.BizParmMetaInfo');
		bizParmMetaInfo.set('serviceID', searchBizParm.serviceID);
		searchDataBizParm.set('bizParmMetaInfo', bizParmMetaInfo.data);
		
		exportItem.set('searchDataBizParm', searchDataBizParm.data);
	},
	setCellItem : function(item, text, mergeX, mergeY, mergeX1, mergeY1){
		var gridCellItem = Ext.create('ESVC.model.common.export.GridCellItem');
		gridCellItem.set('width', item.width);
		gridCellItem.set('text', text.replace('<br>', ' '));
		gridCellItem.set('halign', item.textAlign);
		gridCellItem.set('dataField', item.dataIndex);
		gridCellItem.set('mergeX', mergeX);
		gridCellItem.set('mergeY', mergeY);
		gridCellItem.set('mergeX1', mergeX1);
		gridCellItem.set('mergeY1', mergeY1);
		return gridCellItem;
	},
	getColumnDepth:function(column){
		var depth = 0;
		if(column.ownerCt.id.indexOf('gridcolumn')>-1){
			depth = this.getColumnDepth(column.ownerCt);
			depth++;
		}
		return depth;
	}
	
});