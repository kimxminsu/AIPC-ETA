Ext.define('ESVC.view.usercontrol.VesselSelectController', {
    extend: 'ESVC.view.foundation.usercontrol.PopupFieldViewController',
    alias: 'controller.vesselselect',
    requires: [],

    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME: 'vesselSelectList',
	VESSEL_STATUS_COMBOBOX_STORE: 'vesselStatusCombo',			// MOVE TYPE COMBO STORE NAME
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
		
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	onLoad:function(){
        var me = this;
		var refs = me.getReferences();
		me.view.selectionData = null;
		
        var date = new Date();
        refs.numCallYear.setValue(date.getFullYear());
        
        me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_STATUS, me.VESSEL_STATUS_COMBOBOX_STORE); 				// MOVE TYPE COMBO
        
	},
	onVesselSelectionListLoad:function(){
        var me = this;
		var refs = me.getReferences();
		me.onSearch();
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
    onFind : function(){
    	var me = this;
    	me.openVesselSelectionListPopup();
    },
    onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	
    	var params = me.getSearchCondition();
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
					}
				}
			}
		});
	},
	openVesselSelectionListPopup: function(){   
		var me = this;
		var parentView = me.getParentView();
		var refs = me.getView().getReferences();
		var vslCode = refs.txVslCd.value;       
		var status = refs.cbStatus.value;       
		var callYear = refs.numCallYear.getValue();  
		var callSeq = refs.cbCallSeq.getValue();
		var userVoy = refs.txPortVoy.value;
		var vslName = refs.txVslNm.value;
		var params = {
			vesselCode : vslCode,     
			callYear : callYear,      
			callSeq : callSeq,        
			userVoyage : userVoy,     
			vesselName : vslName,   
			departStatus : status   
		};
		ViewUtil.openCodePopup(parentView, 'popup-vesselselectionlist',me, params, me.afterSetCodePopupData, me);		
    },
    
    getParentView : function(){
    	var me = this;
    	var parent = me.getParent(me.getView());
    	
    	if(me.getView().parent){
			parent = me.getView().parent;
		}
		
    	return parent.getController(); 
    },
    
    onClearClick : function(){
    	var me = this;
    	me.onClear(null, null);
    },
    
    onClear : function(year, vesselCode){
    	var me = this;
        var refs = me.getReferences();
        var date = new Date();

        refs.numCallYear.suspendEvents();
        refs.txVslCd.suspendEvents();
        
        if(!StringUtil.isNullorEmpty(vesselCode)){
        	refs.txVslCd.setValue(vesselCode);
        } else {
        	refs.txVslCd.setValue("");
        }
    	
    	if(!StringUtil.isNullorEmpty(year)){
    		refs.numCallYear.setValue(year);
    	} else {
    		refs.numCallYear.setValue(date.getFullYear());
    	}
        
        refs.cbCallSeq.setValue('');
        refs.cbCallSeq.store.removeAll();
    	refs.txInVoy.setValue("");
    	refs.txOutVoy.setValue("");
    	refs.txETB.setValue("");
    	refs.txPortVoy.setValue("");
    	refs.txVslNm.setValue("");
    	refs.txInLane.setValue("");
    	refs.txOutLane.setValue("");
    	refs.txATD.setValue("");
        refs.cbStatus.setValue('0');
        me.view.selectionData = null;
        refs.numCallYear.resumeEvents();
        refs.txVslCd.resumeEvents();
    },
    
    onVesselCodeChange : function(control, newValue, oldValue, eOpts){
    	var me = this;
    	var refs = me.getReferences();
    	var returnValue = newValue.toUpperCase();
    	control.setValue(returnValue);
    	
    	if(newValue === 'TBA'){
    		var vvdData = {vesselCode:'TBA', callYear:'0000', callSeq:'0000'};
    		me.setVvd(vvdData);
    	} else if(newValue.length === 4 && refs.numCallYear.getValue() != null){
    		me.setCallSeq();
    	} else {
    		me.onClear(refs.numCallYear.getValue(), refs.txVslCd.getValue());
    	}
    },
    
    onCallSeqChange : function(control, newValue, oldValue, eOpts){
        var me = this.view;
        var refs = me.getReferences();
        var data = me.data;
        if(oldValue==null||newValue==null|| data==null) return;
        for(var i=0; i<data.length;i++){    
            if(newValue == data[i].callSeq){
                if(data[i].atd=="" || data[i].atd==null)
                    refs.cbStatus.setValue("1");
                else
                    refs.cbStatus.setValue("2");
                refs.txVslCd.setValue(data[i].vesselCode);
                refs.numCallYear.setValue(data[i].callYear);
                refs.cbCallSeq.setValue(data[i].callSeq);
                refs.txInVoy.setValue(data[i].inVoyage);
                refs.txOutVoy.setValue(data[i].outVoyage);
                refs.txETB.setValue(Ext.Date.format(data[i].etb,'d/m/Y h:i:s'));
                refs.txPortVoy.setValue(data[i].userVoyage);
                refs.txVslNm.setValue(data[i].vesselName);
                refs.txInLane.setValue(data[i].inLane);
                refs.txOutLane.setValue(data[i].outLane);
                refs.txATD.setValue(Ext.Date.format(data[i].atd,'d/m/Y h:i:s'));
                
				var oldData = me.selectionData;
                
                me.selectionData = data[i];
                me.fireEvent('change', me, oldData, data[i]);
            }
        }
    },

    onDblClick : function(){
        var me = this;
        var refs = me.getView().getReferences();
        var grid = me.lookupReference('refVesselSelectionListGrid');
        var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		me.view.data = store;
		var window = this.getView().up('window');
		
		var returnValue = {
				data : selection,
				store : store
		}
    	window.returnValue = returnValue;
    	window.close();
    },
    onCallYearChange : function(control, newValue, oldValue, eOpts){
        if(oldValue == null) return;
        
        if(newValue === '0'){
        	control.setValue('0000');
        }
        
        var me = this;
        var refs = me.getReferences();
    	refs.txVslCd.setValue("");
    	refs.cbCallSeq.setValue("");
        refs.cbCallSeq.store.removeAll();
    	refs.txInVoy.setValue(""); 
    	refs.txOutVoy.setValue("");
    	refs.txETB.setValue("");
    	refs.txPortVoy.setValue("");
    	refs.txVslNm.setValue("");
    	refs.txInLane.setValue("");
    	refs.txOutLane.setValue("");
    	refs.txATD.setValue("");
        refs.cbStatus.setValue('0');
        var oldData = me.view.selectionData;
        me.view.selectionData = null;
        me.getView().fireEvent('change', me.getView(), oldData, null);
    },
    getSearchCondition : function(){
		var me = this;
     	
    	return me.getView().recvData;
		
	},
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = targetControl;
		var refs = targetControl.getReferences();
		
		var a = me.lookupReference('refVesselSelectionListGrid');
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(returnValue.data){
			refs.cbCallSeq.store.removeAll();
	        refs.txVslCd.setValue(returnValue.data.get('vesselCode'));
	        
	        refs.numCallYear.suspendEvents();
	        refs.numCallYear.setValue(returnValue.data.get('callYear'));
	        refs.numCallYear.resumeEvents();
	        
	        refs.cbCallSeq.setValue(returnValue.data.get('callSeq'));
	        refs.txInVoy.setValue(returnValue.data.get('inVoyage'));
	        refs.txOutVoy.setValue(returnValue.data.get('outVoyage'));
	        refs.txETB.setValue(Ext.Date.format(returnValue.data.get('etb'),'d/m/Y h:i:s'));
	        refs.txPortVoy.setValue(returnValue.data.get('userVoyage'));
	        refs.txVslNm.setValue(returnValue.data.get('vesselName'));
	        refs.txInLane.setValue(returnValue.data.get('inLane'));
	        refs.txOutLane.setValue(returnValue.data.get('outLane'));
	        refs.txATD.setValue(Ext.Date.format(returnValue.data.get('atd'),'d/m/Y h:i:s'));
	        if(returnValue.data.get('atd')=="" || returnValue.data.get('atd')==null)
	            refs.cbStatus.setValue("1");
	        else
	            refs.cbStatus.setValue("2");
	        var items = returnValue.store.data.items;
	        var data = new Array;
	        for(var i=0; i<items.length; i++){
	            if(items[i].get('vesselCode') == returnValue.data.get('vesselCode')){
	                refs.cbCallSeq.getStore().insert(i,[{comName : items[i].get('callSeq'), comCode : items[i].get('callSeq')}]);
	                data.push(items[i].data);
	            } 
	        }
	        me.view.data = data;
	        var oldData = me.view.selectionData;
	        me.view.selectionData = returnValue.data.data;
	        me.getView().fireEvent('change', me.getView(), oldData, returnValue.data.data);
	        
		} else {
	        var oldData = me.view.selectionData;
	        me.view.selectionData = null;
	        me.getView().fireEvent('change', me.getView(), oldData, null);
			targetControl.getViewModel().setData({theVsl:null});
		}
	},

	getVvd: function() {
		var me = this;
		
		if (me.view.selectionData !== undefined && me.view.selectionData !== null) {
			return me.view.selectionData.vesselCode + '-' + me.view.selectionData.callYear + '-' + me.view.selectionData.callSeq;
		}
		else {
			return '';
		}
	},
	
	// set external VVD
	setVvd : function(vvd){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	
		refs.numCallYear.suspendEvents();
		
		if(vvd == null){
			me.onClear();
			return;
		} else if(StringUtil.isNullorEmpty(vvd.vesselCode) ||
		   StringUtil.isNullorEmpty(vvd.callYear) ||
		   StringUtil.isNullorEmpty(vvd.callSeq)){
			me.onClear(vvd.callYear, vvd.vesselCode);
			return;
		}
		
		store.load({
			params: vvd,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length === 1) {
						var returnValue = {
								data : records[0],
								store : store
						}
						me.afterSetCodePopupData(null, me, returnValue);
						refs.numCallYear.resumeEvents();
					}
				}
			}
		});
	},
	
	setCallSeq : function(){
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	
		var vslCode = refs.txVslCd.value;       
		var status = refs.cbStatus.value;       
		var callYear = refs.numCallYear.getValue();  
		var callSeq = refs.cbCallSeq.getValue();
		var userVoy = refs.txPortVoy.value;
		var vslName = refs.txVslNm.value;
		var params = {
			vesselCode : vslCode,     
			callYear : callYear,      
			callSeq : callSeq,        
			userVoyage : userVoy,     
			vesselName : vslName,   
			departStatus : status   
		};
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length === 1) {
						var returnValue = {
								data : records[0],
								store : store
						}
						me.afterSetCodePopupData(null, me, returnValue);
					}
				}
			}
		});
	}
});