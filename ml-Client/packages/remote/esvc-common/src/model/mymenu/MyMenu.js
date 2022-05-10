Ext.define('ESVC.model.mymenu.MyMenu', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'category',
			type:'string'
		},
		{
			name:'pgmcode',
			type:'string'
		},
		{
			name:'topMenu',
			type:'string'
		},
		{
			name:'subMenu',
			type:'string'
		},
		{
			name:'myMenu',
			type:'string'
		},
		{
			name: 'myMenuChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('myMenu', CommonConstants.YES);
					} else {
						record.set('myMenu', CommonConstants.NO);
					}
					
					return value;
				} else {
					if(record.get('myMenu') === CommonConstants.YES){
						return true;
					} else {
						return false;
					}
				}
			},
	        depends: 'myMenu'
		}
	],
	
	convertOnSet: false
});