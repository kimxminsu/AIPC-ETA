Ext.define('TSB.app.ViewController', {
    override: 'Ext.app.ViewController',

    // [KHH.COMP.2018.11.13]
    initViewModel: function(obj) {
        var screenAlias;
        if (obj.xtype) {
            screenAlias = obj.xtype;
        } else {
            screenAlias = obj.getView().xtype;
        }
        
        if (screenAlias) {
            var store = Ext.create('Ext.data.Store', {
            	storeId: 'componentAuthorizationStore',
                fields: [{
                    name:'screenType',
                    type:'string'
                },{
                    name:'itemId',
                    type:'string'
                },{
                    name:'disabled',
                    type:'boolean'
                },{
                    name:'hidden',
                    type:'boolean'
                }],

                proxy: {
                    type: 'rest',
                    url: ESVC.config.Locale.getRestApiDestUrl() + '/v1/authority/components'
                }
            });
        }
        
        var accessMenuItems = ESVC.config.Token.getAccessAuthorityMapItem();
        if(accessMenuItems){
        	for(var i=0; i<accessMenuItems.length; i++){
        		if(accessMenuItems[i].menuCaption==screenAlias){
         			if(accessMenuItems[i].csave == "N"){
         				var btn = Ext.ComponentQuery.query(screenAlias+' #btnSave')[0];
         				if(btn != null){
         					btn.setVisible(false);
         				}
        			}
        			if(accessMenuItems[i].cdelete == "N"){
        				var btn = Ext.ComponentQuery.query(screenAlias+' #btnDelete')[0];
        				var detailView = this.getDetailBizView();
        				if(btn != null){
         					btn.setVisible(false);
         				}
        			}
        			if(accessMenuItems[i].cinsert == "N"){
        				var btn = Ext.ComponentQuery.query(screenAlias+' #btnAdd')[0];
        				if(btn != null){
         					btn.setVisible(false);
         				}
        			}
        			
        		} 
        	}
        }
       
//        store.load({
//            params: {
//                systemCode: 'ESVC',
//                screenId: screenAlias
//            },            
//            callback: function(records, operation, success) {
//                if (success) {
//                    for(var i = 0; i < store.getCount(); i++) {
//                        var components = Ext.ComponentQuery.query(screenAlias + ' #' + store.getAt(i).data.itemId);
//                        
//                        Ext.each(components, function(component){
//                            if (component.xtype === 'grid') {
//                                if (store.getAt(i).data.disabled) {
//                                    var plugins = component.getPlugins();
//                                    Ext.each(plugins, function(plugin) {
//                                        if (plugin.alias.length > 0 && (plugin.alias[0] === 'plugin.rowediting' || plugin.alias[0] === 'plugin.cellediting')) {
//                                            plugin.disable(); 
//                                        }
//                                    });
//                                    
//                                    if(component.viewConfig && component.viewConfig.plugins && component.viewConfig.plugins.ptype === 'gridviewdragdrop') {
//                                        component.getView().getPlugin(component.viewConfig.plugins.pluginId).init(component);
//                                    }                                    
//                                }
//                                
//                                component.setHidden(store.getAt(i).data.hidden);
//                                
//                            } else if (component.xtype === 'button') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                                if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'segmentedbutton') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                                if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'textfield') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                            	if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'filefield') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                            	if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            }
//                        }); 
//                    }
//                }
//            }
//        });
    }
    
});