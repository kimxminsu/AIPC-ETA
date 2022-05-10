Ext.define('ESVC.view.foundation.usercontrol.PopupFieldViewController', {
	extend: 'ESVC.view.foundation.usercontrol.BaseUserController',	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Validation Code
	onValidationCode : function(store, params, compareFieldName, returnItemFieldNames){
		var me = this;
    	var fieldControl = this.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue();
    	var controlName = me.getView().reference;
    	var parent = me.getParent(me.getView());
		
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
    	var bizController = parent.getController();

		// 싱글 셀렉트여서 수정 가능한데 공백이 들어왔을 경우
		// 선택을 초기화 하는 코드
		if(StringUtil.isNullorEmpty(fieldValue) &&
		me.prevValue !== fieldValue &&
		me.getView().editableControl === true &&
		fieldControl.readOnly === false){
			fieldControl.setValue("");
					
			if(bizController.afterSetCodePopupData){
				bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
			}
			
			if(me.afterSetCodePopupData){
				me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null, me, parent);
			}

			return;
		}

    	if(
			StringUtil.isNullorEmpty(fieldValue) ||
    	   me.prevValue === fieldValue ||
    	   me.getView().editableControl === false ||
    	   fieldControl.readOnly === true){

    		return;
    	}
    	
    	fieldValue = fieldValue.toUpperCase();
    	
    	if(params){
    		params[compareFieldName] = fieldValue;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						var returnItem = {
								code : records[0].get(returnItemFieldNames.code),
								name : records[0].get(returnItemFieldNames.name),
								item : records[0]
						}
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
						}
						
						if(me.afterSetCodePopupData){
							me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem, me, parent);
						}
						
						if(fieldControl.getValue() !== returnItem.code){
							fieldControl.setValue(returnItem.code);
						}
					} else {
						fieldControl.setValue("");
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
						}
						
						if(me.afterSetCodePopupData){
							me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null, me, parent);
						}
					}
				}
			}
		});
	},
	
	// OPEN POPUP
	openPopup:function(popupAlias){
		var me = this;
		var parent = me.getParent(me.getView());
		var fieldControl = me.lookupReference("ctlField");
		var fieldValue = fieldControl.getValue();
		
		var searchParm = {};
		var updateFieldNames = me.getView().args ? me.getView().args : [];
		var theModel;
		if(me.getParentByAlias(me.getView()).xtype.includes('detail')){
			theModel = parent.getViewModel().get('theDetail');
		}
		else{
			theModel = parent.getViewModel().get('theSearch');
		}

		if(StringUtil.isNullorEmpty(me.getView().argsModel) == false){
			theModel = parent.getViewModel().get(me.getView().argsModel);
		}

		if(theModel){
			searchParm = me.createParam(theModel, updateFieldNames);
		}

    	if(me.getView().params){
    		me.getView().params.codeValue = fieldValue;
    		me.getView().params.args = Object.values(searchParm);
    		if(me.getView().visibleName === true){
    			me.getView().params.popupType = ViewUtil.POPUPTYPE_SINGLE;
    		}
    	}
		
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
		ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});