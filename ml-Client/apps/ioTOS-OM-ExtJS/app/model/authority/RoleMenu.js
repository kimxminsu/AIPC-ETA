Ext.define('IoTosOmExt.model.authority.RoleMenu', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'ptnrCode',
		type: 'string'
	}, {
		name: 'roleCode',
		type: 'string'
	}, {
		name: 'menuId',
		type: 'string'
	}, {
		name: 'menuName',
		type: 'string'
	}, {
		name: 'menuAuth',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'buttonAuth',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'create',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'retrieve',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'delete',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'save',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'print',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'authCreate',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'authRetrieve',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'authSave',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'authDelete',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'authPrint',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}, {
		name: 'change',
		type: 'string'
	}, {
		name: 'upperMenuId',
		type: 'string'
	},{
		name: 'systemCode',
		type: 'string'
	}, {
		name: 'apiAuth',
		type: 'bool',
		convert: function(v){
			   return (v === "Y" || v === true) ? true : false;
		}
	}]

});