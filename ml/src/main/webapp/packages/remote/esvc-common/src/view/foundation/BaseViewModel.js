Ext.define('ESVC.view.foundation.BaseViewModel', {
	extend: 'Ext.app.ViewModel',
	
	/**
	 * =========================================================================================================================
	 * MEHTOD START
	 */
	getBindValue: function(name) {
		var me = this;
		var bindName = me.getBindName(name);

		if (StringUtil.isNullorEmpty(bindName) == true) {
			return '';
		}
		else {
			return me.get(bindName);	
		}
	},

	setBindValue: function(name, value) {
		var me = this;
		var bindName = me.getBindName(name);

		if (StringUtil.isNullorEmpty(bindName) == true) {
			return;
		}

		me.set(bindName, value);
	},

	getBindName: function(name) {
		var itemStr;

		if (name === undefined || name === null) {
			return '';
		}

		if (Ext.isString(name)) {
			itemStr = name;
		}
		else {
			itemStr = name.value

			if (itemStr instanceof Ext.app.bind.Binding) {
				itemStr = name.value.stub.path;
			}
		}

		return itemStr.replace('{','').replace('}','');
	 }
	/**
	 * MEHTOD END
	 * =========================================================================================================================
	 */
});