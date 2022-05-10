Ext.define('Aipc.Main.model.admin.PartnerSelection', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'check',
			type:'string'
		},
		{
			name: 'checkChecked',
			type: 'bool',
			convert:function(value, record){
				if(value != undefined){
					if(value === true){
						record.set('check', CommonConstants.YES);
					} else {
						record.set('check', CommonConstants.NO);
					}
					
					return value;
				} else {
					if(record.get('check') === CommonConstants.YES){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		{
			name:'partnerType',
			type:'string'
		},
		{
			name:'partnerCode',
			type:'string'
		},
		{
			name:'alliance',
			type:'string'
		},
		{
			name:'allianceCode',
			type:'string'
		},
		{
			name:'groupID',
			type:'string'
		},
		{
			name:'partnerTypeName',
			type:'string'
		},
		{
			name:'ownerCode',
			type:'string'
		},
		{
			name:'displayDescription',
			type:'string',
			convert:function(value, record){
				return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.PARTNER_TYPE, record.get('partnerType'));
			}
		}
	],
	
	convertOnSet: false
});