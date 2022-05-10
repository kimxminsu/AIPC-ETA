Ext.define('ESVC.view.mymenu.MyMenuController', {
	extend: 'ESVC.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.mymenu',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refMyMenuGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'menulist',				// Main Store Name
	MYMENU_STORE_NAME: 'myMenu',				// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var myMenuStore = me.getStore(me.MYMENU_STORE_NAME);
		
		myMenuStore.load({
				params:{
					userId: ESVC.config.Token.getUserId(),
					pgmCode: ProjectUtil.getPgmCode()
				},
				callback:function(records,operation, success){
					if(!refs.refMyMenu.loaded){
						refs.refMyMenu.add(me.getMyMenu(myMenuStore));
						refs.refMyMenu.loaded = true;
					}
				}
		});
		
		me.updateViewStyle(me.getView());
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Create Esvc MyMenu
	getMyMenu : function(myMenuStore){
		var me = this;
		var menuStore = me.getView().recvData;
		
		var control = {
				xtype: 'app-mymenutree',
				reference: 'refMyMenuTree',
	        	copyStore: menuStore,
	        	myMenuStore: myMenuStore,
	        	viewScope : me
			}
		
		return control;
	},
	
    // 2020.06.02.Tonny.Kim
    onChangeMyMenu: function(){
		var me = this;
		var title = ViewUtil.getLabel('myMenu');
		var popupAlias = 'app-mymenudetail';
		var menuList = me.getView().recvData;
		
		me.openViewAliasDetailPopup(menuList, title, popupAlias);
	},
	
	// Rebind MyMenu
	onRebindMyMenu : function(){
		var me = this;
		var refs = me.getReferences();
		var myMenuStore = me.getStore(me.MYMENU_STORE_NAME);

		myMenuStore.load({
				params:{
					userId: ESVC.config.Token.getUserId(),
					pgmCode: ProjectUtil.getPgmCode()
				},
				callback:function(records,operation, success){
					if(success){
						refs.refMyMenuTree.myMenuStore = myMenuStore;
						refs.refMyMenuTree.rebind('load');
					}
				}
		});
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	onDetailLoad : function(){
		var me = this;
		var menuStore = me.getView().recvData;

		me.onSearch(menuStore);
	},
	
	// Search Event Handler
	onSearch : function(menuStore) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MYMENU_STORE_NAME);
		
		store.load({
			params : {
				userId: ESVC.config.Token.getUserId(),
				pgmCode: ProjectUtil.getPgmCode()
			},
			callback : function(records, operation, success) {
				if (success) {
					me.setMenu(menuStore);
				}
			}
		});
	},

	// Set Menu
	setMenu : function(menuStore){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var myMenuStore = me.getStore(me.MYMENU_STORE_NAME);
		var i = 0;
		var myMenuItem;

		menuStore.clearFilter();

		menuStore.each(function(record){
			addMyMenuItem = Ext.create('ESVC.model.mymenu.MyMenu');
			
			if(record.data.menuTypeCode != 'FOLDER'){
				addMyMenuItem.set('topMenu', record.get('upperMenuId'));
				addMyMenuItem.set('subMenu', record.get('menuId'));
				addMyMenuItem.set('pgmcode', ProjectUtil.getPgmCode());
				addMyMenuItem.set('staffCd', ESVC.config.Token.getUserId());
				
				var findIndex = myMenuStore.findExact('subMenu', record.get('menuId'));
				
				if(findIndex >= 0){
					var myMenuItem = myMenuStore.getAt(findIndex);
					addMyMenuItem.set('updateTime', myMenuItem.get('updateTime'));
					addMyMenuItem.set('myMenuChecked', true);
					addMyMenuItem.phantom = false; // Update
					addMyMenuItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
				} else {
					addMyMenuItem.set('myMenuChecked', false);
					addMyMenuItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
				}
				
				store.insert(i++, addMyMenuItem);
			}
		});
		
		store.commitChanges();
		me.getView().recvData = store;
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var myMenuStore = me.getStore(me.MYMENU_STORE_NAME);
		var updateParm = Ext.create('ESVC.model.foundation.parm.UpdateBizParm');
		
	    updateParm.getProxy().url = myMenuStore.getProxy().url;
	    updateParm.phantom = false; // Rest Update
	    updateParm.set('items', new Array());

		store.each(function(record) {
			var addItem = record.copy();	// Apply to Model Checkbox Value
			updateParm.get('items').push(addItem.data);
		});
		
		var controller = me.getParentView().getController();
		
		updateParm.save({
			success : function(record){
				controller.onRebindMyMenu();
				store.commitChanges();
				
				// exception - indexof
				var task = new Ext.util.DelayedTask(function() {
					var me = this;
				    me.onClose();
				});
				
				task.delay(11, null, me);
			}
		});
	},

	
	// Detail Close
	onClose: function(){
		var me = this;
		var window = this.getView().up('window');
		
       	window.close();
	},

	// Are there any changes to the detail grid?
	changesToTheDetail : function(bizViewAlias){
		var me = this;
		var refs = me.getReferences();
		var store = me.lookupReference(bizViewAlias).items.get(0).recvData;

		if(store){
			if(store.getRemovedRecords().length > 0 ||
			   store.getModifiedRecords().length > 0){
				return true;
			} else {
				return false;
			}
		}
		
		return false;
	}
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});