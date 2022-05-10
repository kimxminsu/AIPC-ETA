Ext.define('ESVC.view.popup.CommonCodePopupController', {
	extend: 'ESVC.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.commoncodepopup',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refCommonCodePopupGrid',	// MAIN GRID NAME
	MAIN_STORE_NAME : 'commonCodePopup',     		// Main Store Name
	GRID_ALL_CHECK_STRING : '*',					// GRID ALL SELECT STRING
	CODE_VALUE_SPLIT_STRING : ',',					// CODE VALUES SPLIT STRING
//	GRID_ALL_REPLACE_YN : 'Y',						// * REPLACE Y: OK, N: AS IS
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
		refs.ctlSearchCode.focus();
		me.initializeControl();
		me.onSearch();
	},
	
	initializeControl:function(){
		var me = this;
		var popupType = ViewUtil.POPUPTYPE_MULTI;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);

		if(me.getView().recvData.popupType){
			popupType = me.getView().recvData.popupType; 
		}

		if(popupType === ViewUtil.POPUPTYPE_SINGLE){
			grid.selModel.setSelectionMode(ViewUtil.POPUPTYPE_SINGLE);
			grid.selModel.allowDeselect = false;
		} else {
			grid.selModel.setSelectionMode(ViewUtil.POPUPTYPE_MULTI);
		}
	},
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var isLocalCache = me.getView().recvData.isLocalCache;
		var params = me.getSearchCondition();
		
		if(params == null){
			return;
		}
		
		if(isLocalCache){
			me.setComboBoxWithLocalCache(params.itemKey, me.MAIN_STORE_NAME);
			me.setGridSelection();
		} else {
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							me.setGridSelection();
						}
					}
					
					// 마스크 누르면 꺼지게 하는 UI
					me.getView().mon(Ext.getBody(), 'click', function(el, e){
						me.onCancel();
					}, me.getView(), { delegate: '.x-mask' });
				}
			});
		}
	},
	
	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	store.clearFilter();
    	
    	newValue = newValue.replace('&amp;', '').replace('nbsp;', '');
    	
    	store.filter([{
			filterFn: function(item) {
		    	return (item.get('name').replace(' ', '').toUpperCase().trim().search(newValue.replace(' ', '').toUpperCase()) != -1) ||
		    		   (item.get('code').replace(' ', '').toUpperCase().trim().search(newValue.replace(' ', '').toUpperCase()) != -1);
		    }
    	}]);
    	
    	field.setValue(newValue.toUpperCase());
	},

	onDblClick: function(control, td, cellIndex, record, tr, rowIndex, e, eOpts )  {
		var me = this;
		var window = me.getView().up('window');
		window.returnValue = me.getReturnData(record);
       	window.close();
	},
	
	onSelectionchange:function(control, selected, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		
			
		if((me.getView().recvData.useReplaceAll == null || me.getView().recvData.useReplaceAll == 'Y') 
				&& grid.getStore().getDataSource().length == selected.length){
			
			refs.ctlCodeValue.setValue(me.GRID_ALL_CHECK_STRING);
		
		} else {
			var returnItem = me.getReturnData();
			
			if(returnItem == null){
				refs.ctlCodeValue.setValue('');
			} else {
				refs.ctlCodeValue.setValue(returnItem.code);
			}
		}
	},

	onOk:function(){
		var me = this;
		var refs = me.getReferences();
		var window = this.getView().up('window');
    	window.returnValue = me.getReturnData();
    	window.returnValue.code = refs.ctlCodeValue.getValue();
    	
       	window.close();
	},
	
	onCancel:function(){
		var me = this;
		var window = this.getView().up('window');
    	window.returnValue = null;
       	window.close();
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getArrayCodeValues:function(){
		var me = this;
		var codeValue = '';
		
		if(me.getView().recvData.codeValue){
			codeValue = me.getView().recvData.codeValue;
		}
		
		if(codeValue != null && codeValue !== ''){
			return codeValue.split(me.CODE_VALUE_SPLIT_STRING);
		} else {
			return null;
		}
	},
	
	setGridSelection:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var selectRowIndex = -1;
		var arrCodeValue = me.getArrayCodeValues();
		var arrSelectedRecord = new Array();
		var codeValue = me.getView().recvData.codeValue;

		if(arrCodeValue != null){
			 if (codeValue === me.GRID_ALL_CHECK_STRING){
				store.each(function(record){
					arrSelectedRecord.push(record);
				});
				
				grid.setSelection(arrSelectedRecord);
			} else {
				var selectRecord = null;
				
				arrCodeValue.forEach(function(code, index, array){
					selectRowIndex = store.findExact('code', code);
					
					if(selectRowIndex >= 0){
						selectRecord = store.getAt(selectRowIndex);
						arrSelectedRecord.push(selectRecord);
					}
				});
				
				if(arrSelectedRecord.length > 0){
					grid.setSelection(arrSelectedRecord);
					
					if(arrSelectedRecord.length == 1){
						if(grid.getView().getRow(selectRowIndex)){
							grid.getView().getRow(selectRowIndex).scrollIntoView();
						}
					}
				}
			}
		}
	},
	
	getReturnData:function(record){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = null;
		
		if((selection == null || selection.length == 0) &&
		   record != undefined &&
		   record != null){
			returnItem = record;
		} else {
			if(selection != null){
				var codeValues = '';
				var codeNameValues = '';

				selection.forEach(function(record, index, array){
					if(index != 0){
						codeValues += me.CODE_VALUE_SPLIT_STRING;
						codeNameValues += me.CODE_VALUE_SPLIT_STRING;
					}
					
					codeValues += record.data.code;
					codeNameValues += record.data.name;
				});
				
				returnItem = {
					code : codeValues,
					name : codeNameValues,
					item : selection
				}
			}
		}
		
		return returnItem;
	},
	
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getView().recvData;
		return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});