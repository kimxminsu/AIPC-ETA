Ext.define('ESVC.model.common.export.FileExportBizParm', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'fileName',
			type:'string'
		},
		{
			name:'refNo',
			type:'string'
		},
		{
			name:'showTitle',
			type:'boolean'
		},
		{
			name:'isExcel',
			type:'boolean'
		},
		{
			name:'showBorder',
			type:'boolean'
		}
	],
	
	hasOne: [
        {
        	name: 'gridItem',
	        model: 'ESVC.model.common.export.GridItem',
	        associationKey: 'gridItem',
	        getterName: 'getGridItem',
	        associatedName: 'gridItem'
        },
        {
        	name: 'searchDataBizParm',
	        model: 'ESVC.model.common.export.FileExportServiceBizParm',
	        associationKey: 'searchDataBizParm',
	        getterName: 'getSearchDataBizParm',
	        associatedName: 'searchDataBizParm'
        }
    ]
});