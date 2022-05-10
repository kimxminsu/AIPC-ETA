Ext.define('ESVC.model.foundation.parm.UpdateBizParm',{
	extend: 'ESVC.model.foundation.parm.BizParm',
	field: [
        {
			name:'item',
			type:'ESVC.model.foundation.dataitem.DataItem'
		},
		{
			name:'items',
			type:'Ext.Array'
		}
	]	
});