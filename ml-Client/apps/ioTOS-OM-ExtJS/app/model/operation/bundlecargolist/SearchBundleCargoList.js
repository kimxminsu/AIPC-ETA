Ext.define('IoTosOmExt.model.operation.bundlecargolist.SearchBundleCargoList', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name:'vslCd'
   },{
      name:'callYear'
   },{
      name:'callSeq'
   },{
      name:'ixCd'
   },{
      name:'departureType'
   },{
      name:'searchPeriodFrom',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'searchPeriodTo',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'tableName'
   },{
      name:'cntrNo'
   },{
      name:'cntrId'
   },{
      name:'bundleCntr'
   },{
      name:'searchMode'
   }]
});