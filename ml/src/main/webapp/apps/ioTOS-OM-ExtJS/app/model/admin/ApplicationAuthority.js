Ext.define('IoTosOmExt.model.admin.ApplicationAuthority', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'pgmcode',
			type:'string'
		},
		{
			name:'useChk',
			type:'string'
		},
		{
			name: 'useChkChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('useChk', 'Y');
					} else {
						record.set('useChk', 'N');
					}
					
					return value;
				} else {
					if(record.get('useChk') === 'Y'){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'userType',
			type:'string'
		},
		{
			name:'userID',
			type:'string'
		},
		{
			name:'describe',
			type:'string'
		},
		{
			name:'roleID',
			type:'string'
		}
	],
	
    convertOnSet: false
});