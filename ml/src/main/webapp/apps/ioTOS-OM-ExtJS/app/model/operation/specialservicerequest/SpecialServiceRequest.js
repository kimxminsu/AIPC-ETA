Ext.define('IoTosOmExt.model.operation.specialservicerequest.SpecialServiceRequest', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [{
      name:'ssrId'
   },{
      name:'ssrNo'
   },{
      name:'ssrCode'
   },{
      name:'nonCntr'
   },{
      name:'requestDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'volume'
   },{
      name:'payerType'
   },{
      name:'payer'
   },{
      name:'completeDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'paymentType'
   },{
      name:'cashCheck'
   },{
      name:'creditCheck'
   },{
      name:'chargeByRequest'
   },{
      name:'chargeByRequestApply'
   },{
      name:'visitCode'
   },{
      name:'generatedBy'
   },{
      name:'inSystem'
   },{
      name:'vesselAssign'
   },{
      name:'createUser'
   },{
      name:'railAssign'
   },{
      name:'rowLock'
   },{
      name:'isDomesticChk',
      type : 'boolean'
   },{
      name:'printCheck'
   },{
      name:'latestDate'
   },{
      name:'soRefNo'
   },{
      name : 'cntrItems'
   },{
      name : 'remainSSRCode'
   }]
});