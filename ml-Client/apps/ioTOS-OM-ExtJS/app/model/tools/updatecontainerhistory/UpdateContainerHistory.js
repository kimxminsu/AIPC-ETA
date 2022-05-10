Ext.define('IoTosOmExt.model.tools.containerupdatehistory.ContainerUpdateHistory', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
   fields: [{
      name:'vslCd'
   },{
      name:'callYear'
   },{
      name:'callSeq'
   },{
      name:'cntrNo'
   },{
      name:'cntrId'
   },{
      name:'dataField'
   },{
      name:'oldValue'
   },{
      name:'newValue'
   },{
      name:'updateTime',
      type: 'date',
      dateFormat: 'time'
   }]   
});