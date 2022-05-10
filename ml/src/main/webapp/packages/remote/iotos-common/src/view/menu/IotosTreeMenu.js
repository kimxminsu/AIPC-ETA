Ext.define('Iotos.view.menu.TreeMenu', {
	extend: 'TSB.ux.AbstractContainer',
	alias: 'widget.iotos-treemenu',
	requires: [
		'Ext.list.Tree'
	],
	viewScope: null,
	treeStore: null,

	layout: {
		type: 'border',
		align: 'stretch'
	},
	referenceHolder: true,
	constructor: function (config) {
		this.callParent(arguments);
		this.initConfig(config);
	},

	initEvents: function () {
		var me = this;
		me.callParent();
	},

	initComponent: function () {
		var me = this;
		//Ext.getBody().setStyle('overflow', 'hidden');
		Ext.apply(me, {

			items: [{
				region: 'north',
				layout: 'hbox',
				items: [{
					xtype: 'component',
					reference: 'senchaLogo',
					cls: 'sencha-logo',
					html: '<img src="resources/images/company-logo.png" class="main-logo"><span class="main-text">' + me.viewScope.getViewModel().get('title') + '</span>',
					width: iWeb.MENU_WIDTH,
				}, {
					split: false,
					border: false,
					flex: 1,
					xtype: 'app-header',
				}]
			}, {
				region: 'center',
				reference: 'mainContainerWrap',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [
					{
						border: false,
						layout: 'fit',
						scrollable: 'y',
						width: iWeb.MENU_WIDTH,
						xtype: 'treelist',
						ui: 'mainmenu',
						reference: 'reftreelist',
						itemId: 'navigationTreeList',
						expanderFirst: false,
						expanderOnly: false,
						singleExpand: true,
						store: me.treeStore,
						listeners: {
							itemclick: function (tree, items) {
								me.onMenuClick(items.node.data.rec, tree, items);
							}
						}
					}, {
						xtype: 'tabpanel',
						layout: 'fit',
						flex: 1,
						reference: 'mainCardPanel',
						itemId: 'contentPanel',
					}]
			}]
		});
		me.callParent();
	},

	onMenuClick: function (record, tree, items) {
		if (record) {
			if (!items.item._expandable) {
				if (record.data.screenNm) { // 접근 권한 부여 시 record.data.menuName  로 변경 
					this.setCurrentView(record, tree, { xtype: record.data.screenNm }); // 접근 권한 부여 시 record.data.menuName 로 변경 
				}
			}
		}
	},

	setCurrentView: function (rec, tree, cfg) {
		var me = this,
			refs = me.getReferences(),
			tabs = refs.mainCardPanel,
			id = rec.data.screenNm; // 접근 권한 부여 시 record.data.menuName 로 변경 
		tab = tabs.items.getByKey(id);
		if (!tab) {
			cfg.title = rec.data.menuNm; // 접근 권한 부여 시 record.data.menuCaption 로 변경 
			cfg.itemId = id;
			cfg.closable = true;
			cfg.iconCls = rec.data.icon;
			cfg.scrollable = true;
			cfg.record = rec;
			tab = tabs.add(cfg);
			if (tabs.getActiveTab() != null) {
				if (!nullChk_(tabs.getActiveTab().down('window'))) { //window open 상태에서 탭 이동시 에러 방지
					tabs.getActiveTab().down('window').close();
				} else if (!nullChk_(tabs.getActiveTab().down('grid'))) {
					if (tabs.getActiveTab().down('grid').getPlugin('rowEditor')) { //grid edit 모드에서 탭 이동시 에러 방지
						tabs.getActiveTab().down('grid').getPlugin('rowEditor').cancelEdit();
					}
				}
			}
		} else {
			tab.setConfig(cfg);
		}
		tabs.setActiveTab(tab);
	},

	rebind: function (type, records) {
		var me = this;
		var reftreelist = me.lookupReference('reftreelist');
		var titlename = me.viewScope.getViewModel().get('title');
		if (type === 'load') {
			me.treeStore = Ext.create('Ext.data.TreeStore', {
				type: 'tree',
				root: {
					expanded: true
				}
			});
			var root = me.treeStore.getRoot();
			me.getStore().sort([{ property: 'seq', direction: 'ASC' }]); // 접근 권한 부여 시  property : 'topMenu' 로 변경 
			me.getStore().each(function (record, idx) {

				// 기존 소스 코드
				var node = root.findChild('viewType', record.data.topMenu);
				node = node ? node : root;
				if(record.data.depth == 0 && record.data.screenNm == record.data.topMenu){
					node.appendChild({
						text : record.data.menuNm,
						iconCls : record.data.icon,
						viewType : record.data.screenNm,
						parent : record.data.screenNm,
						rec : record,
						leaf : true

					});
				}


			//  2020-06-05 김용진 
			//  사용자 접근 권한에 따른 TreeMenu 셋팅 (사용 시, 주석 제거) 
			// 	var node = root.findChild('viewType', record.data.topMenu);
			// 	node = node ? node : root;


			// 	if(record.data.menuName == "" || record.data.menuName == null){
			// 		node.appendChild({
			// 			text: record.data.topMenu,
			// 			iconCls: record.data.icon,
			// 			viewType: record.data.topMenu,
			// 			parent: record.data.topMenu,
			// 			rec: record,
			// 			leaf: true
			// 		});
			// 	}
			});

			// me.getStore().sort([{ property: 'topMenu', direction: 'DESC' }]); // 접근 권한 부여 시 주석 제거
			me.getStore().each(function (record, idx) {

				// 기존 소스 코드
				if(record.data.depth == 0 && record.data.screenNm != record.data.topMenu) {
					var node = root.findChild('viewType', record.data.topMenu);
					node = node ? node : root;

					node.appendChild({
						text : record.data.menuNm,
						iconCls : record.data.icon,
						viewType : record.data.screenNm,
						parent : record.data.screenNm,
						rec : record,
						leaf : true
					});

				}else if(record.data.depth != 0 && record.data.screenNm != record.data.topMenu){
					var node = me.treeStore.findNode('parent', record.data.topMenu);
					node.appendChild({
						text : record.data.menuNm,
						iconCls : record.data.icon,
						viewType : record.data.screenNm,
						parent : record.data.screenNm,
						rec : record,
						leaf : true
					});
				}

				//2020-06-05 김용진 
				//사용자 접근 권한에 따른 TreeMenu 셋팅 (사용 시, 주석 제거) 
				// if(record.data.depth == 0 && record.data.menuName != "" && record.data.menuName != null) {
				// 	var node = root.findChild('viewType', record.data.topMenu);
				// 	node = node ? node : root;
				// 	node.appendChild({
				// 		text : record.data.menuCaption,
				// 		iconCls : record.data.icon,
				// 		viewType : record.data.menuName,
				// 		parent : record.data.topMenu,
				// 		rec : record,
				// 		leaf : true
				// 	});
				// }else if(record.data.depth != 0 && record.data.menuName != "" && record.data.menuName != null){
				// 	count++;
				// 	var node = root.findChild('parent', record.data.topMenu);
				// 	node = node ? node : root;
				// 	node.appendChild({
				// 		text : record.data.menuCaption,
				// 		iconCls : record.data.icon,
				// 		viewType : record.data.menuName,
				// 		parent : record.data.topMenu,
				// 		rec : record,
				// 		leaf : true
				// 	});
				// }
			});

			if (reftreelist) {
				var treelist = me.items.get(1).items.get(0);
				treelist.setStore(me.treeStore);
			}
		} else if (type === 'add') {
			if (me.treeStore) {
				var root = me.treeStore.getRoot();
				for (var i = 0; i < records.length; i++) {
					var node = root.findChild('viewType', records[i].data.topMenu);
					node = node ? node : root;
					node.appendChild({
						text: records[i].data.menuNm,
						iconCls: 'x-fa ' + records[i].data.icon,
						//rowCls: 'nav-tree-badge nav-tree-badge-new', //Can add Badge
						viewType: records[i].data.formName,
						rec: records[i],
						leaf: true
					});
				}
			}
		} else if (type === 'update') {
			//ToDo: needs to test
			if (me.treeStore) {
				var root = me.treeStore.getRoot();
				var node = root.findChild('viewType', records.data.topMenu);
				var oldNode = node.findChild('viewType', records.data.screenNm)
				node = node ? node : root;
				node.replaceChild({
					text: records.data.menuNm,
					iconCls: 'x-fa ' + records.data.icon,
					//rowCls: 'nav-tree-badge nav-tree-badge-new', //Can add Badge
					viewType: records.data.formName,
					rec: records,
					leaf: true
				}, oldNode);
			}
		} else if (type === 'remove') {
			if (me.treeStore) {
				var root = me.treeStore.getRoot();
				for (var i = 0; i < records.length; i++) {
					var node = root.findChild('viewType', records[i].data.topMenu);
					var removeableNode = node.findChild('viewType', records[i].data.screenNm)
					node = node ? node : root;
					node.removeChild(removeableNode);
				}
			}
		}
	}
});