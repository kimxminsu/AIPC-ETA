Ext.define('TSB.ux.menu.TreeMenu', {
    extend: 'TSB.ux.AbstractContainer',
    alias: 'widget.tsb-treemenu',
    requires: [
               'Ext.list.Tree'
    ],

	viewScope: null,
	treeStore: null,
	layout: 'fit',
	
	reference: 'reftreemenu',
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
				ui : 'tsbtreemenu',
				reference: 'reftreelist',
				expanderFirst : false,
				expanderOnly : false,
				singleExpand : true,
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
    
    rebind: function (type, records) {
		var me = this;
        var reftreelist = me.lookupReference('reftreelist');
        
        if(type === 'load') {
        	me.treeStore = Ext.create('Ext.data.TreeStore', {
        		type: 'tree',
        		root: {
        			expanded: true
        		}
        	});
        
        	var root = me.treeStore.getRoot();
        	
        	me.store.filter('menuTypeCode', 'FOLDER');
        	
        	var favouriteRecord = me.store.findRecord('menuId', 'Favourites');
        	
        	if(favouriteRecord != null){
        		root.appendChild({
        			text: favouriteRecord.data.menuScreenName,
        			iconCls: favouriteRecord.data.screenIconDefineCode,
        			menuId: favouriteRecord.data.menuId,
    				parent: favouriteRecord.data.menuId,
        			viewType: favouriteRecord.data.upperMenuId,
        			rec: favouriteRecord,
        			leaf: true
        		});
        	}
        	
        	if(CONSTANTS.CUSTOMER === 'DEV'){
            	// [KHH.SAMPLEMENU.2018.11.14]
            	me.sampleStore.each(function(record, idx){
            		me.store.insert(idx, record);
            	});
        	}
        	
        	me.store.each(function(record, idx){
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
                			leaf: true
                		});
    				}
				}else{
					console.log(idx);
					var node = me.treeStore.findNode('parent', record.data.upperMenuId);
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
        	});
        	me.store.clearFilter();
        	me.store.each(function(record, idx){
//        		if(record.data.upperMenuId != 'ROOT'){
        		if(record.data.menuTypeCode != 'FOLDER'){
        			var node = me.treeStore.findNode('parent', record.data.upperMenuId);

        			if (node != null){
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
        		} else {
        			/**
        			 * Tonny.Kim.2019.05.15
        			 * Delete parent menu if there is no submenu
        			 */
        			var node = me.treeStore.findNode('menuId', record.data.menuId);
        			
        			if(node != null){
        				var parentMenu = me.store.findRecord('upperMenuId', node.get('menuId'));
        				
        				if(parentMenu == null){
        					root.removeChild(node);
        				}
        			}
				}
        	});
        	if(me.favouriteMenuStore != null){
        		        		
        		me.favouriteMenuStore.each(function(record, idx){
        			var node = root.findChild('menuId', 'Favourites');
            		node.appendChild({
            			text: record.data.menuScreenName,
            			iconCls: record.data.screenIconDefineCode,
            			menuId: record.data.menuId,
        				parent: record.data.menuId,
            			viewType: record.data.upperMenuId,
            			rec: record,
            			leaf: true
            		});
            	});
        	}
        	if(reftreelist) {
        		var treelist = me.items.items[0];
        		treelist.setStore(me.treeStore);
        	}
        } else if(type === 'add') {
        	if(me.treeStore) {
        		var root = me.treeStore.getRoot();
        		for(var i=0;i<records.length;i++) {
        			var node = root.findChild('viewType', records[i].data.topMenu);
        			node = node ? node : root;
            		node.appendChild({
            			text: records[i].data.formCaption,
            			iconCls: records[i].data.icon,
            			viewType: records[i].data.formName,
            			rec: records[i],
            			leaf: true
            		});
        		}
        	}
        } else if(type === 'update') {
        	if(me.treeStore) {
        		var root = me.treeStore.getRoot();
    			var node = root.findChild('viewType', records.data.topMenu);
    			var oldNode = node.findChild('viewType', records.data.formName)
    			node = node ? node : root;
        		node.replaceChild({
        			text: records.data.formCaption,
        			iconCls: records.data.icon,
        			viewType: records.data.formName,
        			rec: records,
        			leaf: true
        		}, oldNode);
        	}
        } else if(type === 'remove') {
        	if(me.treeStore) {
        		var root = me.treeStore.getRoot();
        		for(var i=0;i<records.length;i++) {
        			var node = root.findChild('viewType', records[i].data.topMenu);
        			var removeableNode = node.findChild('viewType', records[i].data.formName)
        			node = node ? node : root;
            		node.removeChild(removeableNode);
        		}
        	}
        }
    }
});