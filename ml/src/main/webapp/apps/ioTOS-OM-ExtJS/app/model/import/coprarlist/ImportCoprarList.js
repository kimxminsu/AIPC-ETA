Ext.define('IoTosOmExt.model.import.coprarlist.ImportCoprarList', {
   extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [{
      name:'shiftAccount'
   },{
      name:'consigneeEDI'
   },{
      name:'vesselAssign',
      type : 'boolean'
   },{
      name:'railAssign',
      type : 'boolean'
   },{
      name:'tpId'
   },{
      name:'rowLock'
   },{
      name:'displaySetTempF'
   }]
});

