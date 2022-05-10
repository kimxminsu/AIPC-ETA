Ext.define('Aipc.Main.model.admin.CommonFunctionAccessAuthority', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'roleID',
			type:'string'
		},
		{
			name:'pgmcode',
			type:'string'
		},
		{
			name:'subMenu',
			type:'string'
		},
		{
			name:'formName',
			type:'string'
		},
		{
			name:'cinquiry',
			type:'string'
		},
		{
			name: 'cinquiryChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('cinquiry', 'Y');
					} else {
						record.set('cinquiry', 'N');
					}
					
					return value;
				} else {
					if(record.get('cinquiry') === 'Y'){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'category',
			type:'string'
		},
		{
			name:'csave',
			type:'string'
		},
		{
			name: 'csaveChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('csave', 'Y');
					} else {
						record.set('csave', 'N');
					}
					
					return value;
				} else {
					if(record.get('csave') === 'Y'){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'cdelete',
			type:'string'
		},
		{
			name: 'cdeleteChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('cdelete', 'Y');
					} else {
						record.set('cdelete', 'N');
					}
					
					return value;
				} else {
					if(record.get('cdelete') === 'Y'){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'clock',
			type:'string'
		},
		{
			name:'cinsert',
			type:'string'
		},
		{
			name: 'cinsertChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('cinsert', 'Y');
					} else {
						record.set('cinsert', 'N');
					}
					
					return value;
				} else {
					if(record.get('cinsert') === 'Y'){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'userID',
			type:'string'
		},
		{
			name:'topMenu',
			type:'string'
		},
		{
			name:'menuCaption',
			type:'string'
		},
		{
			name:'formCaption',
			type:'string'
		},
		{
			name:'label',
			type:'string'
		},
		{
			name:'readFunction',
			type:'string'
		},
		{
			name:'saveFunction',
			type:'string'
		},
		{
			name:'insertFunction',
			type:'string'
		},
		{
			name:'deleteFunction',
			type:'string'
		},
		{
			name:'path',
			type:'string'
		},
		{
			name:'icon',
			type:'string'
		},
		{
			name:'enable',
			type:'string'
		},
		{
			name:'thread',
			type:'string'
		},
		{
			name:'depth',
			type:'string'
		},
		{
			name:'rootMenu',
			type:'string'
		},
		{
			name:'newCheck',
			type:'string'
		},
		{
			name:'multi',
			type:'string'
		},
		{
			name:'userType',
			type:'string'
		},
		{
			name:'selectRow',
			type:'string'
		},
		{
			name:'roleIDs',
			type:'string'
		},
		{
			name:'cgroup',
			type:'string'
		},
		{
			name:'menuSeq',
			type:'string'
		},
		{
			name:'topCaption',
			type:'string'
		},
		{
			name:'parentTopMenu',
			type:'string'
		},
		{
			name:'groupIcon',
			type:'string'
		},
		{
			name:'verticalSeq',
			type:'string'
		},
		{
			name:'groupSeq',
			type:'string'
		},
		{
			name:'type',
			type:'string'
		}
	],
	
    convertOnSet: false
});