Ext.define('TSB.plugin.grid.GridExport', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.tsb-plugin-grid-gridexport',

	storeId: 'grid',
	exportType: 'excel',	//excel or pdf

    init: function (component) {
		component.on('click', this.exportExcelFn, this);
    },

    exportExcelFn: function(btn, e) {
     	//console.log(this, btn, btn.up('grid').getStore());
    	var me = this,
    		gridStore = btn.up('grid').getStore(),
    		grid = btn.up('grid').getView().grid;
	
    	//Start masking	
    	grid.getEl().mask('Loading...');

    	//******** convert to JASON *********
		//create record of excel model
		var title = btn.up().up().title,
			fileName = title.replace(' ','').concat('-' , Ext.Date.format(new Date(), 'YmdHis'));	//get Name
			
		var excelM = Ext.create('excelModel', {
    		title: title,
    		type: 'TEXT',
    		value: title.concat(' value'), //function(){return title.concat(' value');},
    		filename: title.replace(' ','').concat('-' , Ext.Date.format(new Date(), 'YmdHis')),
    		headerList: null,
    		rowList: null
    	});

    	//set header list
    	var headerM = excelM.headerList();
    	Ext.Array.each(grid.visibleColumnManager.columns, function(col){
			headerM.add({
				text: col.text,
				type: 'TEXT',
				dataField: col.dataIndex
			})
    	});
    	
    	//set row list
		Ext.Array.each(gridStore.data.items, function(row, idx){
			var rowItem = Ext.create('rowModel', {
				value: idx + 1,
				type: 'ROW'
			});
			
			//set row data list
			var dataM = rowItem.dataList();
			Ext.Array.each(grid.visibleColumnManager.columns, function(col){
				//generate row number value of row-nubmerer field
				var val = function(){
					if (col.initialCls === "x-row-numberer") {
						return idx + 1;
					} else {
						return row.data[col.dataIndex];
					}
				}
				
				dataM.add({
					text: val(),
					type: 'TEXT',
					dataField: col.dataIndex
				});				
			});
			
	    	var rowM = excelM.rowList();
	    	rowM.add(rowItem);
		});
		//******** END *********
			
		//set store
		var exportUrl = function() {
			if (me.exportType === 'excel'){
				return CONSTANTS.EXCEL_EXPORT_URL;
			} else if (me.exportType === 'pdf') {
				return CONSTANTS.PDF_EXPORT_URL;
			}
		}
		
		
		var taskStore = new Ext.data.Store({
			model: 'excelModel',
			proxy: {
				type: 'rest',
				disableCaching: false,
				url: exportUrl(),
				reader: {
					type: 'json',
					rootproperty: 'response.data'
				}, 
				writer: {
					type: 'json-custom-writer-for-nested-model',	//To handle associated JSON data
					writeAllFields: true,		
					rootProperty: 'data'
				}
			},
	        listeners: {
	            write: function (store, operation) {
	            	if (operation.getResponse().statusText === 'Created' ){
	            		grid.getEl().unmask();
	            		
	            		var result = Ext.decode(operation.getResponse().responseText);
	            		var url = CONSTANTS.EXCELSERVER_DNS + result.response.data[0].url;
	            		
	            		console.log(url);
	            		//DOWNLOAD FILE from Web folder.
	            		//Add dom of "a" tag to get file. we can change the href 
						var el = Ext.DomHelper.append(Ext.getBody(), {
						    tag: 'a',
						    href: url, ///TEST_ExcelFile.xlsx',
						    html: 'A link',
						    target: '_self'
						}, true);

						//check web folder.
						el.dom.href = url;
//if you want more ...						
//						el.on('click', function() {
//							//TODO						
//							//console.log(el.dom);
//						});
						
						//fire click event
						el.dom.click();
						

	            	}	            
	            }
			
//	            write: function (store, operation) {
//	            	if (operation.getResponse().statusText === 'Created' ){
//	            		grid.getEl().unmask();
//	            		
//	            		var result = Ext.decode(operation.getResponse().responseText);
////	            		var url = CONSTANTS.EXCELSERVER_DNS + result.response.data[0].url;
//	            		var url = CONSTANTS.SERVER_DNS + result.response.data[0].url;
//						
//	            		var onError = function(e) {
//	            			console.log(e);
//	            		}
//	            		
//	            		var downloadReq = new XMLHttpRequest();
//	            		downloadReq.open("GET", url, true);
//	            		downloadReq.responseType = 'blob';
//	            		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
//	            		
//	            		downloadReq.onload = function(e) {
//							if (this.status == 200) {
//								var blob = new Blob(
//									[ this.response ],
//									{
//										type : 'application/vnd.ms-excel'
//								});
//								var downloadUrl = URL.createObjectURL(blob);
//								var a = document.createElement("a");
//								a.href = downloadUrl;
//								a.download = "PortRotation.xlsx";
//								a.setAttribute("data-bypass","");
//								document.body.appendChild(a);
//								a.click();
//							} else {
//								console.log('Unable to download excel.');
//							}
//	            			
//	            		}
	            			
//            			 window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
//	            				    fs.root.getFile('image.xlsx', {create: true}, function(fileEntry) {
//	            				      fileEntry.createWriter(function(writer) {
//
////	            				        writer.onwrite = function(e) { ... };
////	            				        writer.onerror = function(e) { ... };
//
//	            				        var blob = new Blob([downloadReq.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
//
//	            				        writer.write(blob);
//
//	            				      }, onError);
//	            				    }, onError);
//	            				  }, onError);
//	            		}
	            		
	            		//downloadReq.overrideMimeType("text/plain; charset=x-user-defined");
	            		//downloadReq.overrideMimeType("data:application/vnd.ms-excel;");
//	            		downloadReq.send();
//	            	}	            
//	            }			
			
			
			
	        }			
		});	 	

		taskStore.insert(0, excelM);
		//console.log('store', taskStore);
		//console.log(Ext.encode(excelM.getData(true)));
		taskStore.sync();
		
    }
});

/**
below resuls are something different. this is very important.
excelM.getData(true) - get data with all of associations.
if we don't use "json-custom-writer-for-nested-model" of json writer, the store.data.items[].data hasn't any associations.
Below is diff. between "json-custom-writer-for-nested-model"

	without "json-custom-writer-for-nested-model".
			structure
				-store.data.items[].headerList[]
				-store.data.items[].rowList[]
				-store.data.items[].data
				----title
				----type
				----value
				----filename
	
	use "json-custom-writer-for-nested-model"
			structure
				-store.data.items[].data
				----headerList[]
				----rowList[]
				----title
				----type
				----value
				----filename	

	[TEST] Remove "type: 'json-custom-writer-for-nested-model' of proxy-writer and then address below code before store.sync().
		console.log('store', taskStore);
		console.log(Ext.encode(excelM.getData(true)));
		
		the results of above two logs are different.
	
	Thus, to send data with association, we have to use Ext.apply to set getAssociationData() to record.data.
 */
Ext.define('JsonExtended', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.json-custom-writer-for-nested-model',


    constructor: function(config) {
        this.callParent(arguments);
    },

    getRecordData: function (record, operation) {
        record.data = this.callParent(arguments);
        Ext.apply(record.data, record.getAssociatedData());
        return record.data;
    }
});

Ext.define('dataModel', {
	extend: 'Ext.data.Model',
	fields: [
	    {name: "chartImage", type: "string"}, 
	    {name: "dataField", type: "string"}, 
	    {name: "text", type: "string"}, 
	    {name: "type", type: "string"}, 
	    {name: "value", type: "string"}
    ]
});

Ext.define('rowModel', {
	extend: 'Ext.data.Model',	
	fields: [
	    {name: "chartImage", type: "string"}, 
	    {name: "dataField", type: "string"}, 
	    {name: "text", type: "string"}, 
	    {name: "type", type: "string"}, 
	    {name: "value", type: "string"},
	    {name: "dataList", persist:true}
	],
	hasMany: { 
		model: 'dataModel',
		name: 'dataList',
		associationKey: 'dataList'
	}	
});

Ext.define('headerModel', {
	extend: 'Ext.data.Model',	
	fields: [
	    {name: "chartImage", type: "string"},      
	    {name: "dataField", type: "string"},      
	    {name: "text", type: "string"}, 
	    {name: "type", type: "string"}
	]
});

Ext.define('excelModel', {
	extend: 'Ext.data.Model',
    fields: [                                     
	    {name: "title", type: "string"},
	    {name: "type", type: "string"},
	    {name: "value", type: "string"},
	    {name: "filename", type: "string"}
	],
	hasMany: [
	    {	
	    	model: 'headerModel',
	    	name: 'headerList',	
	    	associationKey: 'headerList'
	    },
	    {
	    	model: 'rowModel',
	    	name: 'rowList',	
	    	associationKey: 'rowList'
	    }
    ]
});	