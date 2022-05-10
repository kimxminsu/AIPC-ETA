Ext.define("TSB.plugin.combo.RemoteToLocal", {
	extend: 'Ext.plugin.Abstract',
	alias: 'plugin.tsb-plugin-combo-remotetolocal',
 
	init: function(combo) {
		this.combo = combo;
		combo.queryMode = 'remote';
		this.callParent();
 
		combo.getStore().on('load', this.onComboStoreLoad, this);
	},
 
	onComboStoreLoad : function () {
		Ext.apply(this.combo, {queryMode: 'local'});
	}
});