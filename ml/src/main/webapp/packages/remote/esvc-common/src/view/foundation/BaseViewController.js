Ext.define('ESVC.view.foundation.BaseViewController', {
	extend: 'Ext.app.ViewController',
	
	requires: [
   		'ESVC.view.foundation.ExcelPdfExport'
    ],
	
	excelPdfExportController : Ext.create('ESVC.view.foundation.ExcelPdfExport'),
	columnSettingSearchBizParm : {},
	/**
	 * =========================================================================================================================
	 * VIEW METHOD START
	 */
	// staffCd
	getStaffCd : function(){
		return ESVC.config.Token.getStaffCd(this.type);
	},
	
	// Madatory Check
	checkInputValueAtLastOne : function(view){
		var me = this;
		var arrReferences = view.refs;

		// json field array
		for (var refControl in arrReferences){
			if(refControl != undefined &&
			   Ext.String.startsWith(arrReferences[refControl].reference, 'ctl') &&
			   me.includeCheckInputControl(arrReferences[refControl])){
				
				if(arrReferences[refControl].xtype === 'tagfield'){
					if(arrReferences[refControl].getValue().length > 0){
						return true;
					}
				} else if(arrReferences[refControl].xtype === 'multiselector'){
					if(arrReferences[refControl].getStore().getData().length > 0){
						return true;
					}
				}else if(!StringUtil.isNullorEmpty(arrReferences[refControl].getValue())){
					return true;
				}
			}
		}
		
		MessageUtil.info('Information', 'check_input_at_last_one_value');
		
		return false;
	},
	
	// include Check input control
	includeCheckInputControl : function(control){
		if(control.xtype === 'checkboxfield' ||
		   control.xtype === 'container' ||
		   control.xtype === 'fieldset' ||
		   control.xtype === 'label'){
			return false;
		}
		
		return true;
	},
	
	// Create Param
	createParam : function(sourceItem, updateFieldNames){
		var me = this;
		var params = {};
		
		if(updateFieldNames){
			updateFieldNames.forEach(function(name){
				if(me.getItemValue(sourceItem, name) != undefined){
					params[name] = me.getItemValue(sourceItem, name);
				}
			});
		} else if(sourceItem.fields){
			sourceItem.fields.forEach(function(record, index, array){
				params[record.name] = me.getItemValue(sourceItem, record.name);
			});
		}
		
		return params;
	},
	
	// Listener - Data Change Search Param
	onDataChangeSearchParam : function(modelInstance, modifiedFieldNames, me){
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(store){
			store.clearFilter();
			store.removeAll();
		}
	},
	
	// Update Record No Commit
	updateRecordWithNoCommit : function(targetItem, sourceItem, updateFieldNames){
		var me = this;
		me.updateRecord(targetItem, sourceItem, updateFieldNames, false);
	},
	
	// Update Record Commit
	updateRecord : function(targetItem, sourceItem, updateFieldNames, isCommit){
		var me = this;
		var targetCommit = true;
		
		if(targetItem == null) return;
		
		if(isCommit !== undefined){
			targetCommit = isCommit;
		}
		
		if(updateFieldNames){
			updateFieldNames.forEach(function(name){
				if(me.getItemValue(sourceItem, name) != undefined && me.getItemValue(targetItem, name) != undefined){
					me.setItemValue(targetItem, name, me.getItemValue(sourceItem, name));
				}
			});
		} else if(targetItem.fields){
			targetItem.fields.forEach(function(record, index, array){
				if(me.getItemValue(sourceItem, record.name)){
					me.setItemValue(targetItem, record.name, me.getItemValue(sourceItem, record.name));
				}
			});
		}
		
		if(targetCommit){
			targetItem.commit();
		}
	},
	
	// Get Item Value
	getItemValue : function(item, name){
		if(item.get){
			return item.get(name);
		} else {
			return item[name];
		}
	},
	
	// Set Item Value
	setItemValue : function(item, name, value){
		if(item.set){
			item.set(name, value);
		} else {
			item[name] = value;
		}
	},
	
	// Get Record Concat String
	getRecordConcatString : function(record, keys){
		var me = this;
		var concatString = '';
		
		keys.forEach(function(name){
			if(me.getItemValue(record, name) != undefined){
				concatString += me.getItemValue(record, name);
			}
		});
		
		return concatString;
	},
	
	// onLoad Menu View
	loadMenuView : function(viewAlias, recvData){
		var me = this;
		var mainView = me.getView().findParentByType('app-main');
		
		mainView.getController().onLoadView(viewAlias, recvData);
	},
	
	// Gets Popup State Id
	getPopupStateId : function(viewAlias){
		var me = this;
		return Ext.String.format('state{0}{1}', me.type, viewAlias);
	},
	
	// Set Readonly control
	setReadOnlyForControl : function(readOnlyControls){
		var me = this;
		ViewUtil.setReadOnlyForControl(me, readOnlyControls);
	},
	
	// Set SearchParm
	setSearchParm : function(searchParm, dataChangeFunc){
		var me = this;
		
		searchParm.dataChange = dataChangeFunc;
		searchParm.controller = me;
	},
	/**
	 * VIEW METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getMatchRecordForControlAuthority : function(controlId){
		var matchRecord = null;
		var controlAuthorityItems = ESVC.config.Token.getControlAuthorityItems();
		
		if(controlAuthorityItems){
			var matchRecord = 
				Ext.Array.findBy(controlAuthorityItems, function(record){
					if(record.controlId == controlId){
						return true;
					}
				});
		}
		
		return matchRecord;
	},
	
	// Visible by Control ID
	visibleByControlId : function(controlId){
		var me = this;
		var matchRecord = me.getMatchRecordForControlAuthority(controlId); 

		if(matchRecord){
			if(matchRecord.visibleChk === 'Y') {
				return true;
			} else {
				return false;
			}
		}
		
		return null;
	},
	
	// Enable by Control ID
	enableByControlId : function(controlId){
		var me = this;
		var matchRecord = me.getMatchRecordForControlAuthority(controlId);
		
		if(matchRecord){
			if(matchRecord.enalbeChk === 'Y') {
				return true;
			} else {
				return false;
			}
		}
		
		return null;
	},
	
	// Set Visible by Control ID
	setVisibleByControlId : function(controlId){
		var me = this;
		var control = me.lookupReference(controlId);
		var matchRecord = me.getMatchRecordForControlAuthority(controlId); 

		if(matchRecord){
			if(matchRecord.visibleChk === 'Y') {
				control.setVisible(true);
			} else {
				control.setVisible(false);
			}
		}
	},
	
	// Set Enable by Control ID
	setEnableByControlId : function(controlId){
		var me = this;
		var control = me.lookupReference(controlId);
		var matchRecord = me.getMatchRecordForControlAuthority(controlId);
		
		if(matchRecord){
			if(matchRecord.enalbeChk === 'Y') {
				control.setDisabled(false);
			} else {
				control.setDisabled(true);
			}
		}
	},
	
	// Exists Patner Type
	existsPatnerType: function(patnerType){
		var patnerInfos = ESVC.config.Token.getPatnerInfos();

		if(patnerInfos){
			var matchRecord = 
				Ext.Array.findBy(patnerInfos, function(record){
					if(record.ptnrType == patnerType){
						return true;
					}
				});
			
			if(matchRecord){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	
	// Generate UUID
	generateUuid: function() {
		var me = this;
		var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    
	    return uuid;
	},

	// Refresh Control
	refreshControl:function(controlName){
		var me = this;
		var control = me.lookupReference(controlName);
		
		if(control){
			control.setValue("");
		}
	},
	
	// Convert Date to DateField, TimeField Control Name
	changeDateToControl:function(dateFieldName, timeFieldName){
		return DateUtil.changeDate(this, dateFieldName, timeFieldName);
	},
	
	// Time Format Renderer
	onTimeFormat: function(val) {
		if (val != '' && val.length == 4) {
	        return val.substr(0, 2) + ':' + val.substr(2, 2);
	    } else {
	    	return val;
	    }									
	},

	/**
	 * Returns the Mandatory check and String values ​​of the current date.
	 * @returns {
			dateString,
			dateValue
		}
	 */
	checkDate:function(dateControlName, isMandatory){
		return DateUtil.checkDate(this, dateControlName, isMandatory);
	},
	
	checkDateTime:function(dateControlName, isMandatory){
		return DateUtil.checkDateTime(this, dateControlName, isMandatory);
	},
	
	/**
	 * Check From To Date
	 * @returns {
			fromDtString,
			toDtString,
			fromDt,
			toDt
		}
	 */
	checkFromToDate:function(fromDateControlName, toDateControlName, isMandatory){
		return DateUtil.checkFromToDate(this, fromDateControlName, toDateControlName, isMandatory);
	},
	
	checkFromToDateTime:function(fromDateControlName, toDateControlName, isMandatory){
		return DateUtil.checkFromToDateTime(this, fromDateControlName, toDateControlName, isMandatory);
	},
	
	// Validate From to Date
	validateFromToDate:function(fromDate, toDate){
		return DateUtil.validateFromToDate(fromDate, toDate);
	},
	
	// Check Period Date
	checkPeriodDate:function(fromDateControlName, toDateControlName, maxDatePeriod, isMandatory){
		return DateUtil.checkPeriodDate(this, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory);
	},
	
	checkPeriodDateTime:function(fromDateControlName, toDateControlName, maxDatePeriod, isMandatory){
		return DateUtil.checkPeriodDateTime(this, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory);
	},
	
	// Validate Period Date
	validatePeriodDate:function(fromDate, toDate, maxDatePeriod){
		return DateUtil.validatePeriodDate(fromDate, toDate, maxDatePeriod);
	},
	
	// Date Setting
	setDateInDays:function(dateControlName, days){
		DateUtil.setDateInDays(this, dateControlName, days);
	},
	
	setDateInDaysStartTime:function(dateControlName, days){
		DateUtil.setDateInDaysStartTime(this, dateControlName, days);
	},
	
	setDateInDaysEndTime:function(dateControlName, days){
		DateUtil.setDateInDaysEndTime(this, dateControlName, days);
	},
	
	// Date Setting by standard date
	setDateInDaysByDate:function(dateControlName, days, standardDate){
		DateUtil.setDateInDaysByDate(this, dateControlName, days, standardDate);
	},
	
	setDateInDaysForDataItem:function(dataItem, fieldName, days){
		DateUtil.setDateInDaysForDataItem(dataItem, fieldName, days);
	},
	
	setDateInDaysForDataItemStartTime:function(dataItem, fieldName, days){
		DateUtil.setDateInDaysForDataItemStartTime(dataItem, fieldName, days);
	},
	
	setDateInDaysForDataItemEndTime:function(dataItem, fieldName, days){
		DateUtil.setDateInDaysForDataItemEndTime(dataItem, fieldName, days);
	},
	
	// Popup
	openCodePopup:function(xtype, targetControl, params){
		ViewUtil.openCodePopup(this, xtype, targetControl, params);
	},
	
	/**
	 * Set Popup Data
	 * 1. Set the value only if <returnValue.value>
	 * 2. If you are going to record, you do not need to set it in <afterSetCodePopupData ()>.
	 */
	setCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl){
			var control = me.lookupReference(targetControl);
			
			if(returnValue != null && returnValue.code && control){
				control.setValue(returnValue.code);

				if(returnValue.codeName && control.codeName){
					var codeNameControl = me.lookupReference(control.codeName);
					
					if(codeNameControl){
						codeNameControl.setValue(returnValue.codeName);
					}
				}
			}
		}
		
		// It is called after setting the default value.
		if(me.afterSetCodePopupData){
			me.afterSetCodePopupData(xtype, targetControl, returnValue);
		}
	},
	
	// Popup Target Control
	getValueTargetControlForCodePopup:function(me, targetControl){
		var control = me.lookupReference(targetControl);
		
		if(control){
			return control.getValue();
		} else {
			return null;
		}
	},
	
	// Set To ComboBox with LocalCache
	setComboBoxWithLocalCache: function(itemKey, storeName){
		var me = this;
		return ESVC.util.LocalCacheServiceUtil.setComboBoxWithLocalCache(me, itemKey, storeName);
	},
	
	// Get Local Cache Items
	getLocalCacheItems : function(itemKey){
		return ESVC.util.LocalCacheServiceUtil.getLocalCacheItems(itemKey);
	},
	
	// Get Local Cache Items for CodeName
	getLocalCacheItemsForCodeName : function(itemKey, code){
		return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(itemKey, code);
	},
	
	// Get Local Cache Items for Code
	getLocalCacheItemsForCode : function(itemKey, codeName){
		return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCode(itemKey, codeName);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL VIEW START
	 */
	// Save and Delete buttons. In the case of simple inquiry authority
	openRetrieveDetailPopup : function(record, title, modal, userDetailViewAlias){
		ViewUtil.openRetrieveDetailPopup(this, record, title, modal, userDetailViewAlias);
	},
	
	// Used to display Detail screen.
	openViewAliasDetailPopup : function(record, title, userDetailViewAlias, modal){
		ViewUtil.openViewAliasDetailPopup(this, record, title, userDetailViewAlias, modal);
	},
	
	// Used to display Detail screen.
	openDetailPopup : function(record, title, modal){
		// debugger
		ViewUtil.openDetailPopup(this, record, title, modal);
	},
	
	// Returns Detail View.
	getDetailBizView : function(){
		var me = this;
		var bizViewAlias = me.getView().detailViewAlias;
		if(bizViewAlias == null) return null;
		
		return me.lookupReference(bizViewAlias);
	},
	
	// Independency Parent View
	getParentView:function(){
		var me = this;
		return me.view.up("window").parentView;
	},
	
	// Detail Save, Delete Button Visible
	visibleDetailToolButton : function(toolName, visible){
		var me = this;
		var detailView = me.getDetailBizView();
		var toolButton = detailView.down(Ext.String.format('button[name={0}]', toolName));

		if(toolButton){
			toolButton.setVisible(visible);
		}
	},
	
	// Are there any changes to the detail grid?
	changesToTheDetailGrid : function(){
		var me = this;
		var store = me.getStore(me.DETAIL_GRID_STORE_NAME);
		
		if(store){
			if(store.getRemovedRecords().length > 0 ||
			   store.getModifiedRecords().length > 0){
				return true;
			} else {
				return false;
			}
		}
	},
	/**
	 * DETAIL VIEW END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GRID CONTROL START
	 */
	// Grid Duplication Check
	gridDupliationCheck:function(editor, context, store, params, ignorePhantom){
		GridUtil.dupliationCheck(this, editor, context, store, params, ignorePhantom);
	},
	
	// Grid Row Remove
	gridRemoveRow:function(grid, store, callBackFunc){
		GridUtil.removeRow(this, grid, store, callBackFunc);
	},
	
	// Grid Cancel Edit
	gridCancelEdit:function(rowEditing, context){
		GridUtil.cancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	gridEdit:function(edit, context, isDoNotReload){
		GridUtil.edit(edit, context, isDoNotReload);
	},
	
	// Cell Color Red
	renderRedColor: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		return me.getColorFormat("red", value);
	},
	
	// Cell Color Blue
	renderBlueColor: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		return me.getColorFormat("blue", value);
	},
	
	// Cell Color Blue
	renderGreenColor: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		return me.getColorFormat("green", value);
	},
	
	// Cell Color Red
	renderRedColorForFloat: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000.000');
		return me.getColorFormat("red", formatValue);
	},
	
	// Cell Color Blue
	renderBlueColorForFloat: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000.000');
		return me.getColorFormat("blue", formatValue);
	},
	
	// Cell Color Blue
	renderGreenColorForFloat: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000.000');
		return me.getColorFormat("green", formatValue);
	},
	
	// Cell Color Red
	renderRedColorForInt: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000');
		return me.getColorFormat("red", formatValue);
	},
	
	// Cell Color Blue
	renderBlueColorForInt: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000');
		return me.getColorFormat("blue", formatValue);
	},
	
	// Cell Color Blue
	renderGreenColorForInt: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var formatValue = Ext.util.Format.number(value, '0,000');
		return me.getColorFormat("green", formatValue);
	},
	
	// Gets Color Format
	getColorFormat : function(color, value){
		return Ext.String.format('<span style="color:{0}">{1}</span>', color, value);
	},
	/**
	 * GRID CONTROL END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Grid Excel Export
	onExportExcel: function(gridNameString, addString){
		var me = this;
		var grid = me.lookupReference(gridNameString);
		GridUtil.saveExcel(me, grid, addString);
	},
	
	// time format
	onTimeFormat:function(val){
		return DateUtil.timeFormat(val);
	},
	
	// Change UpperCase to Field Value
	onUpperCase: function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * CATOS BIZ VIEW HANDLER START
	 */
	// Export Excel with Server
	exportExcelPdfWithServer : function(gridNameString, searchBizParm, isExcel, addString){
		var me = this;
		me.excelPdfExportController.exportExcelPdfWithServer(me, gridNameString, searchBizParm, isExcel, addString);
	},
	
	// Grid Double Click
	onDblClickForContainerDetail: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
//		var columnName = 'status'; 
//		var url;
//		
//		if(record.get(columnName) && record.get(columnName) === 'Y'){
//			url = Ext.String.format('{0}cntr_no={1}', CONSTANTS.EXTERNAL_URL['CONTAINER_DETAIL'], record.get('containerNo'));
//		} else {
//			url = Ext.String.format('{4}cntr_no={0}&VSL_CD00={1}-{2}-{3}', 
//					record.get('containerNo'), record.get('vesselCode'), record.get('callYear'), record.get('callSeq'), CONSTANTS.EXTERNAL_URL['CONTAINER_DETAIL']);
//		}
//		
//		ViewUtil.openWindow(url);

		var me = this; 
		var title = {type: 'bundle', key: 'containerDetailTitle'};
		
		if(record == null) return;
		
		me.getView().detailViewAlias = 'app-containerdetail';
		me.openDetailPopup(record,title);
	
	},
	
	// Container Summary
	onContainerSummary : function(){
		var me = this;
		if(me.getSearchCondition){
			var searchBizParm = me.getSearchCondition(ViewUtil.MODE_SUMMARY);
			var title = TSB.locale.i18n.Bundle.instance.getMsg('summarySettingTitle');
			var popupAlias = 'app-summarysetting';
			
			searchBizParm['title'] = title;
			
			if(searchBizParm){
				ViewUtil.openCodePopup(me, popupAlias, null, searchBizParm);
			}
		}
	},
	
	// Search Condition Popup Load
	onSearchConditionPopup : function(){
		var me = this;
		var searchBizParm = {};
		var title = TSB.locale.i18n.Bundle.instance.getMsg('searchCondition');
		var popupAlias = 'popup-searchconditionpopup';
		
		searchBizParm['title'] = title;
		ViewUtil.openCodePopup(me, popupAlias, null, searchBizParm);
	},
	
	// Column Setting Popup Load
	onColumnSettingPopup : function(referenceName){
		var me = this;
		var title = TSB.locale.i18n.Bundle.instance.getMsg('columnSetting');
		var popupAlias = 'popup-columnsettingpopup';
		var grid = null;	
		if(me.getView().xtype === 'treelist'){
			grid = me.getView();
		}else{ 
			grid = me.lookupReference(referenceName);
		}
		
		me.columnSettingSearchBizParm['title'] = title;
		me.columnSettingSearchBizParm['grid'] = grid;
		ViewUtil.openCodePopup(me, popupAlias, null, me.columnSettingSearchBizParm);
	},
	
	updateViewStyle:function(view){
		var me = this;
		
		if(Ext.isDefined(view.dockedItems) && view.dockedItems !=null && view.dockedItems.length>0)
		{
			var length = view.dockedItems.length;
			for (var i = 0; i <= length; i++)
			{
				me.updateDetailStyle(view.dockedItems.get(i));
			}
		}
		
		if(Ext.isDefined(view.items) && view.items !=null && view.items.length>0)
		{
			var length = view.items.length;
			for (var i = 0; i <= length; i++)
			{
				me.updateDetailStyle(view.items.get(i));
			}
		}
		
		
	},
	updateDetailStyle:function(control){
		
		
		if(control !=null)
		{
		if (typeof control.isXType === "function") { 
		
				if(control.isXType('commoncodefield'))
				{
					control.getReferences().ctlField.setFieldStyle('background-color: #f0f8ff;');
//					control.items.get(1).setFieldStyle('background-color: #f0f8ff;');
					var ctlField = control.getReferences().ctlFieldLabel;
					if (control.allowBlank) {
						ctlField.setStyle({"font-weight":"normal"});
					}
					else {
						ctlField.setStyle({"font-weight":"bold"});
					}

				}
				else if(control.isXType('selectfield')) {
					var ctlField = control.getReferences().ctlField;

					if (ctlField.allowBlank) {
						ctlField.labelEl.setStyle({"font-weight":"normal"});
					}
					else {
						ctlField.labelEl.setStyle({"font-weight":"bold"});
					}
				}
				else if(control.isXType('combobox')){
					if(control.allowBlank)
					{
						control.setFieldStyle('background-color: #f0f8ff;');
						if(control.labelEl)
						{
							control.labelEl.setStyle({"font-weight":"normal"});
						}
						
					}else
					{
						control.setFieldStyle('background-color: #f0f8ff;');
						if(control.labelEl)
						{
							control.labelEl.setStyle({"font-weight":"bold"});
						}
						
					}
				}
				else if(control.isXType('textfield'))
				{
					
					// if(!control.readOnly)
					// {
						
					// 	if(control.allowBlank)
					// 	{
					// 		control.setFieldStyle('background-color: #f0f8ff;');
					// 		if(control.labelEl)
					// 		{
					// 			control.labelEl.setStyle({"font-weight":"normal"});		
					// 		}
												
					// 	}else
					// 	{
					// 		control.setFieldStyle('background-color: #f0f8ff;');
					// 		if(control.labelEl)
					// 		{
					// 			control.labelEl.setStyle({"font-weight":"bold"});
					// 		}
							
					// 	}
						
					// }

					if(!control.readOnly) {
						control.setFieldStyle('background-color: #f0f8ff;')
					}

					if(control.labelEl) {
						if(control.allowBlank) {
							control.labelEl.setStyle({"font-weight":"normal"});		
						}
						else {
							control.labelEl.setStyle({"font-weight":"bold"});
						}
					}

					 if(control.isXType('numberfield')){
						 control.setFieldStyle('text-align: right;');
					 }
					
				}
				
				else if(control.isXType('container')){
					var length = control.items.length;
					for (var i = 0; i <= length; i++)
					{
						var me = this;
						me.updateDetailStyle(control.items.get(i));
					}
				}
			
		}
		else
			{
		//	debugger;
			}
		}
		
	},

	disableExtraFunction:function(control){
		
	},
	
	openInvalidMessage:function(view){
		var messages = '';      
		var infoForm ;
		if(view && view.down('form') && view.down('form').form){
			infoForm = view.down('form');
		}else if(view && view.form){
			infoForm = view;
		}
		
		if(infoForm){			
			infoForm.form.getFields().filterBy(function(field) {
			    var valid = field.validate();
			    if(!valid)
		    	{
			    	var errors =  field.getErrors()
			    	for(var i= 0 ; i <errors.length; i ++)
		    		{
			    		var controlName;
			    		if(field.getFieldLabel())
		    			{
			    			controlName = field.getFieldLabel();
		    			}
			    		if(!controlName && field.ownerCt && field.ownerCt.getFieldLabel){
			    			controlName = field.ownerCt.getFieldLabel();
			    		}
			    		
			    		var validationMessage = controlName + " : " + errors[i] + "<br><br>";
			    		messages += validationMessage;
		    		}
		    	}
			  });
			
		}



		
		if(messages)
		{
			MessageUtil.error(MessageConstants.ERROR, messages , null);
		}else
		{
			MessageUtil.mandatoryFieldInValid();
		}
		
		  
		  
	},
	
	/**
	 * CATOS BIZ VIEW HANDLER END
	 * =========================================================================================================================
	 */

	initExtraParams:function(){
		var me = this;
		var keys = Object.keys(me.getViewModel().data);
		for(idx in keys){
			var key = keys[idx];
			var store = me.getViewModel().data[key];
			if(me.isStore(store)){
				store.onBefore('load', me.setExtraParams, me);
			}
		}
	},

	initExtraParams:function(key, paramName){
		var me = this;
		var store = me.getViewModel().data[key];
		if(me.isStore(store)){
			store.onBefore('load', me.setExtraParams, me);
			store.paramName = paramName;
		}
	},
	setExtraParams:function(store, operation, opts){
		var me = this;
		var paramName = store.paramName ? store.paramName : 'theSearch';
		var theSearch = me.getViewModel().get(paramName);
		var params;
		if(me.getSearchCondition){
			params = me.getSearchCondition();
		}
		else{
			params = me.createParam(theSearch);
		}
		store.proxy.setExtraParams(params);
	},

	isStore: function(store){
		return store && (store instanceof Ext.data.Store);
	},
});