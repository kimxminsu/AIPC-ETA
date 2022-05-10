/**
 * View Utility
 */
var ViewUtil = function(){}

ViewUtil.TOOL_SAVE = 'detailSave';
ViewUtil.TOOL_DELETE = 'detailDelete';
ViewUtil.POPUPTYPE_SINGLE = 'SINGLE';
ViewUtil.POPUPTYPE_MULTI = 'MULTI';
ViewUtil.MODE_SUMMARY = 'SUMMARY';

// Code POPUP
ViewUtil.openCodePopup = function(me, xtype, targetControl, params, afterSetCodePopupData, usercontrol, isModal){
	if(isModal == undefined){
		isModal = true;
	}
	var popupAlias = "popupAlias" + xtype;
	var win = me.lookupReference(popupAlias);
	var targetControlValue = null;
	
	if(targetControl){
		targetControlValue = me.getValueTargetControlForCodePopup(me, targetControl);
	}
	
	if (!win) {
		var listeners = {
			'close' : function(win) {
				// Call only if there is a value to return
				if(win.returnValue){
					me.setCodePopupData(xtype, targetControl, win.returnValue);

					if(afterSetCodePopupData){
						afterSetCodePopupData(xtype, targetControl, win.returnValue, usercontrol, me);
					}
				}
				
				win.destroy();
			}
		}
		
		win = ViewUtil.createWindow(popupAlias, isModal, listeners, me.type);

		var bizView = ViewUtil.addBizView(win, xtype);
		bizView.codeValue = targetControlValue;
		bizView.recvData = params;
		
		if(params != null && params.title != null){
			win.title = params.title;
		}
		
		me.getView().add(win);
	}
	
	win.parentView = me.getView();
	win.show();
	win.toFront();
}
ViewUtil.openCodePopup2 = function(me, xtype, targetControl, params, afterSetCodePopupData, usercontrol, isModal){
	if(isModal == undefined){
		isModal = true;
	}
	var popupAlias = "popupAlias" + xtype;
	var win = me.lookupReference(popupAlias);
	var targetControlValue = null;
	
	if(targetControl){
		targetControlValue = me.getValueTargetControlForCodePopup(me, targetControl);
	}
	
	if (!win) {
		var listeners = {
			'close' : function(win) {
				// Call only if there is a value to return 
				if(win.returnValue){
					me.setCodePopupData(xtype, targetControl, win.returnValue);

					if(afterSetCodePopupData){
						afterSetCodePopupData(xtype, targetControl, win.returnValue, usercontrol, me);
					}
				}
				
				win.destroy();
			}
		}
		
		win = ViewUtil.createWindow(popupAlias, isModal, listeners, me.type);

		var bizView = ViewUtil.addBizView(win, xtype);
		bizView.codeValue = targetControlValue;
		bizView.recvData = params;
		
		if(params != null && params.title != null){
			win.title = params.title;
		}
		
//		me.getView().add(win);
	}
	
	win.parentView = me.getView();
	win.show();
	win.toFront();
}
// Pop-up without Save, Delete buttons - Only Retrieve
ViewUtil.openRetrieveDetailPopup = function(me, record, userTitle, modal, userDetailViewAlias){
	ViewUtil.openDetailPopup(me, record, userTitle, modal, true, userDetailViewAlias);
}

//User Detail View Alias Define
ViewUtil.openViewAliasDetailPopup = function(me, record, userTitle, userDetailViewAlias, modal){
	ViewUtil.openDetailPopup(me, record, userTitle, modal, false, userDetailViewAlias);
}

// Open Detail Popup
ViewUtil.openDetailPopup = function(me, record, userTitle, isModal, isOnlyRetrieve, userDetailViewAlias){
	if(isModal == undefined){
		isModal = true;
	}
	
	if(isOnlyRetrieve == undefined){
		isOnlyRetrieve = false;
	}
	
	var title = Ext.String.format('{0} {1}', me.getView().getTitle(), TSB.locale.i18n.Bundle.instance.getMsg('detail'));
	
	if(userTitle){
		title = userTitle;
	}
	
	var bizViewAlias = me.getView().detailViewAlias;
	
	if(userDetailViewAlias){
		bizViewAlias = userDetailViewAlias;
	}
	
	if(bizViewAlias == null) return;
	
	var referenceName = bizViewAlias;	
	var win = me.lookupReference(bizViewAlias);
	var detailController = me;
	
	if (!win) {
		var listeners = {
				'beforeclose' : function(win) {
					var recvData = me.lookupReference(bizViewAlias).items.get(0).recvData;
					
					if(win.forcedClose){
						return true;
					} else if(recvData){
						var hasChange = false;

						if(me.changesToTheDetail){ 	// BizView Controller Define
							hasChange = me.changesToTheDetail(bizViewAlias);
						} else {
							hasChange = recvData.dirty;
							
							if(hasChange !== true){
								if(me.changesToTheDetailGrid && me.changesToTheDetailGrid()){ 	// BaseViewController
									hasChange = true;
								}
							}
						}
						
						if(hasChange){
							MessageUtil.question('confirmation', 'modity_save_confirm_msg', title, 
									function(button){
										if (button === 'ok') {
											if(recvData.reject)
											{
												recvData.reject();
											}											
											win.forcedClose = true;
											win.close();
								        } else if(button === 'cancel'){
								        	
								        };
									}
								);
							return false;
						} else {
							return true;
						}
					} else {
						return true;
					}
				},
				
				'close' : function(win) {
					win.destroy();
				}
			}
		win = ViewUtil.createWindow(referenceName, isModal, listeners, me.type);
		win.title = title;
		var bizView = ViewUtil.addBizView(win, bizViewAlias, "ref" + referenceName, detailController);
		
		if(record){
			bizView.recvData = record;
		}
		
		win.parentView = me.getView();
		me.getView().add(win);
	} else {
		var bizView = me.getDetailBizView();
		
		if(record){
			if(bizView.items.length > 0){
				if(bizView.items.get(0).recvData != null &&
				   bizView.items.get(0).recvData.commit){
					bizView.items.get(0).recvData.commit();
				}
				
				bizView.items.get(0).recvData = record;
			}
		}
		
		var eventArgs = null;
		var view = bizView.down("panel");
		
		if(view != null){
			if(view.events.afterrender && view.events.afterrender.listeners && view.events.afterrender.listeners.length > 0){
				eventArgs = view.events.afterrender.listeners[0].o;
			}
			
			view.fireEvent('afterrender', view, eventArgs, record);
		}
	}
	
	if(win.down("panel") != null && win.down("panel").getController()){
		detailController = win.down("panel").getController();
	}
	
	if(!isOnlyRetrieve){ // Only Retrieve
		win.tools = [];
		if(detailController.onDetailSave){
			var visibleSaveButton = true;
			
			if(detailController.visibleDetailSave){
				visibleSaveButton = detailController.visibleDetailSave(bizViewAlias); 
			}
			if(checkAccess(me, "save", record)){
				win.tools.push({
					xtype: 'button',
					iconCls: 'x-fa fa-save',
					text: '저장하기',
					name: 'detailSave',
					itemId:'btnDetailSave',
					margin : '0 5 0 0',
	//				cls: 'save-button',
					hidden : !visibleSaveButton,
					listeners: {
						click: function() {
							detailController.onDetailSave();
						}
					}
				});
			}
		}
		
		// In case of UPDATE, DELETE button is displayed.
		if(detailController.onDetailRemove){ // Activated only when the function of the DELETE button is implemented
			var visibleDeleteButton = true;
			
			if(detailController.visibleDetailDelete){
				visibleDeleteButton = detailController.visibleDetailDelete(bizViewAlias); 
			}
			
			if(record == null){
				visibleDeleteButton = false;
			}
			if(checkAccess(me, "delete")){
				win.tools.push({
					xtype: 'button',
					iconCls: 'x-fa fa-trash-o',
					text: 'Delete',
					name: 'detailDelete',
					itemId:'btnDetailDelete',
					margin : '0 5 0 0',
	//				cls: 'delete-button',
					hidden : !visibleDeleteButton,
					listeners: {
						click: function() {
							detailController.onDetailRemove();
						}
					}
		    	});
			}
		}
	}
	
	win.show();
	win.toFront();
}

// Create Window
ViewUtil.createWindow=function(referenceName, isModal, listeners, mainViewTypeName){
	return Ext.create('Ext.window.Window', {
		reference: referenceName,
		layout: 'fit',
		modal:isModal,
		iconCls: 'x-fa fa-globe',
		resizable: true,
		resizeHandles: 'all', 
		closeAction: 'destroy',
		constrain: false,
//		constrainHeader: true, //added by Brian (2019/09/04) : detail screen does not out of grid
		maximizable : false,
		scrollable: true,
		stateId: 'state' + mainViewTypeName + referenceName,
        stateful: true,
		listeners:listeners
	});
}

// Add BizView
ViewUtil.addBizView=function(win, xtype, referenceName, detailController){
	var className = Ext.ClassManager.getNameByAlias('widget.' + xtype);
	var bizView = ViewUtil.getCreateBizView(className, referenceName, detailController);
	
	if(!StringUtil.isNullorEmpty(bizView.title)){
		win.title = bizView.title;
		bizView.title = "";
	}
	
	win.width = bizView.width;
	win.height = bizView.height;
	
	if(bizView.resizable){
		win.resizable = bizView.resizable;
	}
	
	if(bizView.constrain){
		win.constrain = bizView.constrain;
	}
	
	if(bizView.maximizable){
		win.maximizable = bizView.maximizable;
	}
	
	win.add(bizView);
	
	return bizView;
}

// Create BizView
ViewUtil.getCreateBizView=function(className, referenceName, detailController){
   var bizView = Ext.create(className, {
		detailController: detailController
   });
      
   if(referenceName){
	   bizView.reference = referenceName;
   }
   
   return bizView;
}

// Set ReadOnly Control
ViewUtil.setReadOnlyForControl=function(me, readOnlyControls, isReadOnly){
	if(isReadOnly == undefined){
		isReadOnly = true;
	}
	
	readOnlyControls.forEach(function(controlName){
		var control = me.lookupReference(controlName);
		
		if(control != null && control.setReadOnly){
			control.setReadOnly(isReadOnly);
		}
	});
}

// Open Window
ViewUtil.openWindow=function(url){
//	window.open(url, 'detail', 'location=no, scrollbars=yes, menubar=no, status=no, toolbar=no, resizeable=yes, left=0, top=0, width=1000, height=800');
	window.open(url, 'detail');
}

checkAccess=function(me, value, record){
	var accessMenuItems = ESVC.config.Token.getAccessAuthorityMapItem();
    if(accessMenuItems){
    	for(var i=0; i<accessMenuItems.length;i++){
    		if(accessMenuItems[i].menuCaption == me.view.xtype){
    			if(value=="save"){
    				if(accessMenuItems[i].csave == "N" && record!=null){
    					return false;
    				}
    			}
    			if(value=="delete"){
    				if(accessMenuItems[i].cdelete == "N"){
    					return false;
    				}
    			}
    		} 
    	}
    }
    return true;
}
ViewUtil.getLabel=function(key){
	return TSB.locale.i18n.Bundle.instance.getMsg(key);
	
}