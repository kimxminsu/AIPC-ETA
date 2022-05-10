Ext.define('IoTosOmExt.model.common.bargeoperation.BargeJob', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name:'IoMode',
   },{
      name:'orderTime',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'actualTime',
      type: 'date',
      dateFormat: 'time'
   }]
});