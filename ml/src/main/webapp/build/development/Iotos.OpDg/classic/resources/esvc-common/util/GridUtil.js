/**
 * Grid Utility
 */
var GridUtil = function(){}

GridUtil.SPLIT_CHAR = '+';

// Grid RemoveRow
GridUtil.removeRow = function(me, grid, store, callBackFunc){ 
	var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
	
	if(selection == null) return;
	
	MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					store.remove(selection);
					store.sync({
						success: function(){
							if(callBackFunc){
								callBackFunc(me);
							}
						}
					});
				}
			}
		);
}

// Grid CancelEdit
GridUtil.cancelEdit = function(rowEditing, context){
	// Canceling editing of a locally added, unsaved record: remove it
	if (context.record.phantom) {
		context.store.remove(context.record);
	}
}

// Grid Edit
GridUtil.edit = function(edit, context, isDoNotReload){
	var isReload = false;
	
	if(isDoNotReload != undefined){
		isReload = !isDoNotReload;
	}
	
	if (context.record.phantom) {
		MessageUtil.question('add', 'infoinsert_msg', null, 
				function(button){
					if (button === 'ok') {
			        	context.store.sync({
							success: function(){
								if(isReload){
									context.store.reload();
								} else {
									context.store.commitChanges();
								}
								
								MessageUtil.saveSuccess(); // Success Message
							}
						});
			        }else if(button === 'cancel'){
			        	context.store.removeAt(context.rowIdx);
			        };
				}
			);
	} else {
		context.store.sync({
			success: function(){
				if(isReload){
					context.store.reload();
				} else {
					context.store.commitChanges();
				}
				
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	}
}

// Grid Duplication Check
GridUtil.dupliationCheck = function(me, editor, context, store, params, ignorePhantom){
	if(context.record.phantom == true || ignorePhantom == true) {
		store.load({
			params: params,
			callback: function(records, operation, success) {
				this.resumeEvent('edit');
				if (success) {
					if(records.length > 0){
						MessageUtil.duplicationFail();
						me.fireEvent('cancelEdit', editor, context);
					} else {
						me.fireEvent('edit', editor, context);
					}
				} else {
					me.fireEvent('cancelEdit', editor, context);
				}
			},
			scope: me
		});

		me.suspendEvent('edit');
	}
}

// Excel Export
GridUtil.saveExcel = function(me, grid, addString){
	var currentDate = new Date();
	var dateString = Ext.Date.format(currentDate, 'YmdHis');
	var excelFileName = "";
	var excelTitle = "";
	
	if(typeof addString !== 'string'){
		addString = null;
	}

	if(addString){
		excelFileName = Ext.String.format("{0}-{1}_{2}", me.getView().title, addString, dateString);
		excelTitle = Ext.String.format("{0} {1}", me.getView().title, addString);
	} else {
		excelFileName = Ext.String.format("{0}_{1}", me.getView().title, dateString);
		excelTitle = me.getView().title;
	}
	
	grid.saveDocumentAs({
    	type: 'xlsx',
    	title: excelTitle,
        fileName: excelFileName + ".xls"
    });
}

// Grid Get columns
GridUtil.getColumns = function(grid){
	
	var columns = null;//grid.columns;
	
	if(grid.columnManager && grid.columnManager.columns)
	{
		columns = grid.columnManager.columns;
	}
	
	if(columns == null)
	{
		columns = grid.columns;
	}
	return columns;
}

// Column Filter
GridUtil.settingColumn = function(grid){
	var headerCt = grid.headerCt;
    var columns = GridUtil.getColumns(grid);
    var	displayColumns = new Array();
    var lockedCount = 0;
    var columnCount = 0;
    
    if(grid.displayColumns){
    	
    	if(grid.lockedCount){
    		lockedCount = grid.lockedCount;
    	}
    	
    	// define display columns
    	grid.displayColumns.forEach(function(columnName){
    		var addColumn = Ext.Array.findBy(columns, function(column){
    						if(column.dataIndex === columnName){
    							column.isDisplay = true; 
    							return true;
    						}
    					});

    		if(addColumn){
    			displayColumns.push(addColumn);
    		}
    	});
		
    	// Column Visible/Lock 
		columns.forEach(function(column){
			var idx = displayColumns.indexOf(column);
			
			if(idx >= 0){
				column.setVisible(true);
				columnCount++;
				
				if(grid.enableLocking &&
				   column.xtype !== 'actioncolumn'){
					if(idx < lockedCount){
						grid.lock(column);
					}
				}
			} else {
				column.setVisible(false);
			}
    	});

		// Order columns
		var headerCt = grid.headerCt;

		for(var i=0;i<displayColumns.length;i++){
			if(grid.enableLocking){
	    		if(i >= lockedCount){
	    			headerCt = grid.getView().normalGrid.headerCt;
	    		} else {
	    			headerCt = grid.getView().lockedGrid.headerCt;
	    		}
			}
    		
    		headerCt.moveAfter(displayColumns[i], (displayColumns[i-1]||null));
    	}
		
		// selModel<CheckColumn> - first column move
		if(grid.enableLocking){
			headerCt = grid.getView().lockedGrid.headerCt;
		}
		
		var checkColumn = Ext.Array.findBy(headerCt.getGridColumns(), function(column){
								if(column.xtype === 'checkcolumn' &&
								   column.cls === 'x-selmodel-column'){
									return true;
								}
							});
		
		if(checkColumn){
			headerCt.moveBefore(checkColumn, (displayColumns[0]||null));
		}
    }
}

GridUtil.gridColumeStore = null;
GridUtil.projectGridColumnStore = null;

GridUtil.setGridColumns = function(grid, code){
	var gridColumnStore = GridUtil.gridColumeStore;
	var projectGridColumnStore = GridUtil.projectGridColumnStore;
	var idx = -1;
	
	if(projectGridColumnStore){
		idx = projectGridColumnStore.findExact('key', code);
	}
	
	if(idx > -1){
		var columns = projectGridColumnStore.getAt(idx).get('items');
		grid.reconfigure(columns);
	}else{
		idx = gridColumnStore.findExact('key', code);
		var columns = gridColumnStore.getAt(idx).get('items');
		grid.reconfigure(columns);
	}
}
GridUtil.getGridColumns = function(code){
	var gridColumnStore = GridUtil.gridColumeStore;
	var projectGridColumnStore = GridUtil.projectGridColumnStore;
	var idx = -1;
	
	if(projectGridColumnStore){
		idx = projectGridColumnStore.findExact('key', code);
	}
	
	if(idx > -1){
		return projectGridColumnStore.getAt(idx).get('items');
	}else{
		idx = gridColumnStore.findExact('key', code);
		return gridColumnStore.getAt(idx).get('items');
	}
}


GridUtil.groupingStore = null;
GridUtil.projectGroupingStore = null;

GridUtil.getGrouping = function(code){
	var groupingStore = GridUtil.groupingStore;
	var projectGroupingStore = GridUtil.projectGroupingStore;
	
	var idx = projectGroupingStore.findExact('key', code);
	if(idx > -1){
		return projectGroupingStore.getAt(idx).get('items');
	}else{
		idx = groupingStore.findExact('key', code);
		return groupingStore.getAt(idx).get('items');
	}
}
