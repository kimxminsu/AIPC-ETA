Ext.define('IoTosOmExt.model.inquirydata.datachange.DataChange', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [{
      name:'newQjobType'
   },{
      name:'qjobType'
   },{
      name:'newCntrNo'
   },{
      name:'checkDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'classIn'
   },{
      name:'classOut'
   },{
      name:'toppingChk'
   },{
      name:'isDomesticChk'
   },{
      name:'prevVslForFpod'
   },{
      name:'prevYearForFpod'
   },{
      name:'prevSeqForFpod'
   },{
      name:'dockReceipt'
   },{
      name:'isDockReceiptCheck'
   },{
      name:'isDoChk'
   },{
      name:'ediTempF'
   },{
      name:'isPositionChanged'
   },{
      name:'backUpItem'
   }]   
});