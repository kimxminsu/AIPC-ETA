/**
 * 2020.06.04.Tonny.Kim
 * 1. rebind
 *		- call from the [MainController.js] after MyMenu update.
 * 2. Replicate the <menuList> to use  
 * 3. <treeMyMenu.setStore()>
 * 		- Redraw the Menu Tree
 */
Ext.define('ESVC.view.mymenu.MyMenuTree', {
    extend: 'TSB.ux.AbstractContainer',
    alias: 'widget.app-mymenutree',
    requires: [
    	'Ext.list.Tree'
    ],

	viewScope: null,
	treeStore: null,
	layout: 'fit',
	
	referenceHolder: true,

    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },
    
    initEvents: function() {
        var me = this;
        me.callParent();
    },
    
    initComponent: function() {
        var me = this;
        var refs = me.getReferences();
		
		Ext.apply(me, {
		    items: [{
		    	xtype : 'treelist',
				reference: 'refTreeMyMenuMain',
				expanderOnly : false,
				store: me.treeStore,
				listeners : {
					itemclick : function(tree, items) {
						me.viewScope.fireEvent(
								'menuClick', items.node.data.rec);
					}
				}
		    }]
		});
        me.callParent();
    },
    
    cancelLayout : function(){
    	
    },
    
    rebind: function (type, records) {
        var me = this;
        var treeMyMenu = me.lookupReference('refTreeMyMenuMain');
        
        if(type === 'load') {
        	if(me.copyStore.data.length === 0) return;
        	
        	me.treeStore = Ext.create('Ext.data.TreeStore', {
        		type: 'tree',
        		root: {
        			expanded: true
        		}
        	});
        	
        	// MainController <onRebindMyMenu()> Call Tree Apply
        	if(treeMyMenu != null){
        		treeMyMenu.setStore(me.treeStore);
        	}
        	
        	var root = me.treeStore.getRoot();
        	
        	// Store Clone
    		var store = new Ext.data.Store();
    		
    		store.add(me.copyStore.getRange());
        	
        	store.filter('menuTypeCode', 'FOLDER');
        	
        	store.each(function(record, idx){
				if(record.data.upperMenuId == 'ROOT'){
					var node = root.findChild('menuId', record.data.menuId);
    				if(node == null){
    					root.appendChild({
                			text: record.data.menuScreenName,
                			iconCls: record.data.screenIconDefineCode,
                			menuId: record.data.menuId,
            				parent: record.data.menuId,
                			viewType: record.data.upperMenuId,
                			rec: record,
                			leaf: true,
                			expanded: true
                		});
    				}
				}else{
					var node = me.treeStore.findNode('parent', record.data.upperMenuId);
					node.appendChild({
            			text: record.data.menuScreenName,
            			iconCls: record.data.screenIconDefineCode,
            			menuId: record.data.menuId,
        				parent: record.data.menuId,
            			viewType: record.data.upperMenuId,
            			rec: record,
            			leaf: true,
            			expanded: true
            		});
				}        		
        	});
        	
        	store.clearFilter();
        	
        	store.each(function(record, idx){
        		if(record.data.menuTypeCode != 'FOLDER'){
        			var node = me.treeStore.findNode('parent', record.data.upperMenuId);

        			if (node != null){
        				var findIndex = me.myMenuStore.findExact('subMenu', record.data.menuId);

        				if(findIndex >= 0){
        					
    	            		node.appendChild({
    	            			text: record.data.menuScreenName,
    	            			iconCls: record.data.screenIconDefineCode,
    	            			menuId: record.data.menuId,
    	        				parent: record.data.menuId,
    	            			viewType: record.data.upperMenuId,
    	            			rec: record,
    	            			
    	            			leaf: true
    	            		});
        				}
        			}
        		} else {
        			var node = me.treeStore.findNode('menuId', record.data.menuId);
        			
        			if(node != null){
        				var parentMenu = store.findRecord('upperMenuId', node.get('menuId'));
        				
        				if(parentMenu == null){
        					root.removeChild(node);
        				}
        			}
        		}
        	});
        	
        	// Delete if no submenu exists
        	store.filter('menuTypeCode', 'FOLDER');
        	
        	me.treeStore.each(function(node, idx){
        		if(node.firstChild == null){
        			root.removeChild(node);
        		}
        	});
        }
    }
});