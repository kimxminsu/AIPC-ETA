Ext.define('ESVC.view.popup.SearchConditionPopupController', {
	extend: 'ESVC.view.foundation.BaseViewController',

	requires: [
		'ESVC.model.common.SearchCondition'
	],

	alias: 'controller.searchconditionpopup',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME : 'searchConditionJson',					// Search Condition Store Name
	SEARCH_CONDITION_GRID_REF_NAME : 'refSearchConditionGrid',	// Search Condition Grid Name
	SEARCH_CONDITION_STORE_NAME : 'searchCondition',			// Search Condition Store Name
	loadJsonString : null,										// SAVE JSON SEARCH CONDITION STRING
	DETAIL_MODEL_FULL_NAME : 'ESVC.model.common.SearchCondition',	// DETAIL MODEL
	DETAIL_ITEM_PROXY_URL : ESVC.config.Locale.getRestApiDestUrl() + '/v1/searchCondition/searchItems',	// DETAIL ITEM PROXY URL
	PREFIX_STRING : 'ctl',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		me.initializeControl();
		me.onSearch();
	},
	
	initializeControl:function(){
		var me = this;
		var grid = me.lookupReference(me.SEARCH_CONDITION_GRID_REF_NAME);
		var detailItem = Ext.create(me.DETAIL_MODEL_FULL_NAME);
		detailItem.set('id', null);
		me.getViewModel().setData({theDetail:detailItem});
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.generateSearchConditoinStore(records);
					}
				}
			}
		});
	},
	
	// Delete Button Event Handler
	onDelete : function(){
		var me = this;
		var grid = me.lookupReference(me.SEARCH_CONDITION_GRID_REF_NAME);
		var store = grid.getStore();
		
		me.gridRemoveRow(grid, store);
	},
	
	// List Grid Selection Change
	onSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if(selectRecords){
			refs.ctlSearchConditoinPopupDelete.setDisabled(false);
			refs.ctlSearchConditoinPopupOk.setDisabled(false);
		}
	},
	
	// Grid Double Click Event Handler
	onDblClick: function(control, td, cellIndex, record, tr, rowIndex, e, eOpts )  {
		var me = this;
		var window = me.getView().up('window');
		window.returnValue = me.getReturnData();
		
		me.onSearchConditionApply();
		
       	window.close();
	},

	// Ok Button Event Handler
	onOk:function(){
		var me = this;
		var window = this.getView().up('window');
    	window.returnValue = me.getReturnData();
    	
    	me.onSearchConditionApply();
    	
       	window.close();
	},
	
	onCancel:function(){
		var me = this;
		var window = this.getView().up('window');
    	window.returnValue = null;
       	window.close();
	},
	
	// Load Button Event Handler
	onLoadSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var jsonSearchControls = me.getJsonSearchControls();
		me.loadJsonString = Ext.JSON.encode(jsonSearchControls);
		
		var displayLoadSearchConditionString = me.displayLoadSearchCondition(jsonSearchControls);
		refs.ctlSearchConditionPopupLoadText.setValue(displayLoadSearchConditionString);
		refs.ctlLoadCondition.setCollapsed(false);
	},
	
	// Save Button
	onSave : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var infoForm = me.getView();
		
		if(infoForm.isValid()){
			me.saveProcess();
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Generate Search Condition Store
	generateSearchConditoinStore : function(records){
		var me = this;
		var arrJson = new Array();
		var searchConditionStore = me.getStore(me.SEARCH_CONDITION_STORE_NAME);
		var covertJsonObj;
		
		records.forEach(function(record){
			if(record.get('searchConditionsString')){
				covertJsonObj = me.buildGridItem(record);
				arrJson.push(covertJsonObj);
			}
		});
		
		searchConditionStore.setData(arrJson);
		searchConditionStore.commitChanges();
		me.generateGridColumn(searchConditionStore);
	},
	
	// buildGridItem
	buildGridItem : function(record){
		var me = this;
		var parentView = me.getParentView();
		var viewId = parentView.xtype;
     	var pgmCode = ESVC.config.Token.getPgmCode();
     	var jsonString = record.get('searchConditionsString');
     	var covertJsonObj = Ext.JSON.decode(jsonString);

     	covertJsonObj['id'] = record.get('id');
		covertJsonObj['view'] = viewId;
		covertJsonObj['pgmCode'] = pgmCode;
		
		return covertJsonObj;
	},
	
	// Save Process
	saveProcess : function(){
		var me = this;
		var parentView = me.getParentView();
		var viewId = parentView.xtype;
     	var pgmCode = ESVC.config.Token.getPgmCode();
		var detailItem = me.getViewModel().get('theDetail');
		
		detailItem.set('view', viewId);
		detailItem.set('pgmCode', pgmCode);
		detailItem.set('searchConditionsString', me.loadJsonString);
		
		var proxy = detailItem.getProxy();
		proxy.url = me.DETAIL_ITEM_PROXY_URL;
		
		detailItem.save({
			success : function(record){
				MessageUtil.saveSuccess(); // Success Message
				me.onOk();
			}
		});
	},
	
	// include
	includeInputControl : function(control){
		if(control.xtype === 'container' ||
		   control.xtype === 'fieldset'||
		   control.xtype === 'label'){
			return false;
		}
		
		return true;
	},
	
	// Control Value Json Convert
	getJsonSearchControls : function(){
		var me = this;
		var refs = me.getReferences();
		var parentView = me.getParentView();
		var arrReferences = parentView.getReferences();
		var jsonSearchControls = {};
		// json field array
		for (var refControl in arrReferences){
			if(refControl != undefined &&
			   Ext.String.startsWith(arrReferences[refControl].reference, 'ctl') &&
			   me.includeInputControl(arrReferences[refControl])){
				var control = arrReferences[refControl];
				
				/*if(control.xtype === 'label'){
					jsonObj[control.reference]= {
							value : control.text,
							displayValue : control.text
					}
					jsonSearchControls[control.reference] = jsonObj[control.reference];
					 
				} else */
				if(control.getValue){
					var jsonObj = {};
					
					if(control.xtype === 'app-vesselselectioncomponent'){
						if(control.getValue() == null){
							var date = new Date();
							
							jsonObj[control.reference] = {
									value : null,
									displayValue : ''
								};
						} else {
							jsonObj[control.reference] = {
									value : {
										vesselCode : control.getValue().vesselCode,
										callYear : control.getValue().callYear,
										callSeq : control.getValue().callSeq
									},
									displayValue : control.getDisplayValue()
								};
						}
					} else if (control.xtype === 'datefield' ||
							   control.xtype === 'datetimefield'){
						jsonObj[control.reference] = {
								value : Ext.Date.format(control.getValue(), control.format),
								displayValue : Ext.Date.format(control.getValue(), control.format)
							};
					} else if (control.xtype === 'tagfield'){
						if(control.getValue().length > 0){
							jsonObj[control.reference] = {
									value : control.getValue(),
									displayValue : control.getValue()
								};
						} else {
							jsonObj[control.reference] = {
									value : null,
									displayValue : null
							}
						}
					}   
					else {
						jsonObj[control.reference] = {
								value : control.getValue(),
								displayValue : control.getValue()
							};
					}
					
					jsonSearchControls[control.reference] = jsonObj[control.reference];
				}
			}
		}
		
		return jsonSearchControls;
	},
	
	// Display Load Search Condition
	displayLoadSearchCondition : function(jsonObject){
		var me = this;
		var parentView = me.getParentView();
		var arrReferences = parentView.getReferences();
		var returnString = '';
		var header;
		
		for (var controlName in jsonObject){
			var control = arrReferences[controlName];
			var controlData = jsonObject[controlName];
			
			if(control && controlData.value){
				header = me.getHeaderString(control);
				returnString += Ext.String.format('{0} : {1}', header, controlData.displayValue) + '\n';
			}
			
		}
		
		return returnString; 
	},
	
	// Get Header String
	getHeaderString : function(control){
		var me = this;
		
		var header = '';
		
		if(control.fieldLabel){
			header = control.fieldLabel;
		}
		
		if(control.displayFieldLabel){
			header = control.displayFieldLabel;
		}
		
		if(control.boxLabel){
			header = control.boxLabel;
		}
		
		if(StringUtil.isNullorEmpty(header)){
			header = control.reference.slice(control.reference.lastIndexOf(me.PREFIX_STRING) + me.PREFIX_STRING.length);
		}
		
		return header;
	},
	
	// Generate Grid Column
	generateGridColumn : function(searchConditionStore){
		var me = this;
		var grid = me.lookupReference(me.SEARCH_CONDITION_GRID_REF_NAME);
		var parentView = me.getParentView();
		var arrReferences = parentView.getReferences();
		var reconfigureColumns = [
				{ header:'ID',  dataIndex:'id', align:'center', width:100 }
			]

		// json field array
		for (var refControl in arrReferences){
			if(refControl != undefined &&
			   Ext.String.startsWith(arrReferences[refControl].reference, 'ctl') &&
			   me.includeInputControl(arrReferences[refControl])){
				var jsonObj = {};
				var control = arrReferences[refControl];
				var header = me.getHeaderString(control);
				var width = 100;
				
				if(control.labelWidth){
					width = control.labelWidth + 20;
				}
				
				if(control.xtype === 'checkboxfield' &&
				   !StringUtil.isNullorEmpty(control.boxLabel)){
					width = control.width;
				}
				
				var addColumn = { text: header,  tooltip: header, dataIndex: control.reference, renderer : 'renderSearchCondition', width:width};
				reconfigureColumns.push(addColumn);
			}
		}
		
		var newStore = new Ext.data.Store({
			data : searchConditionStore.data
        });
		
		grid.reconfigure(searchConditionStore, reconfigureColumns);
	},
	
	// Search Condition Grid Render
	renderSearchCondition: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		return value.displayValue;
	},
	
	// Search Condition Apply
	onSearchConditionApply : function(){
		var me = this;
		var window = this.getView().up('window');
		var arrReferences = window.parentView.refs;
		var grid = me.lookupReference(me.SEARCH_CONDITION_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var controlValue;
		
		if(selection == null) return;
		
		for (var controlName in selection.data){
			var control = arrReferences[controlName];
			var controlData = selection.get(controlName);
			
			if(control){
				if (control.xtype === 'datetimefield'){
					controlValue = Ext.util.Format.date(controlData.value, ESVC.config.Locale.getDefaultDateFormatWithNoSeconds());
				} else {
					controlValue = controlData.value;
				}
				
				control.setValue(controlValue);
			}
		}
	},
	
	// Get return data
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.SEARCH_CONDITION_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		return selection;
	},
	
	getSearchCondition : function(){
		var me = this;
		var parentView = me.getParentView();
		var viewId = parentView.xtype;
     	var pgmCode = ESVC.config.Token.getPgmCode();
     	
		var params = {
			pgmCode : pgmCode,
			view : viewId
		}
		
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});