Ext.define('IoTosOmExt.model.operation.hold.Hold', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [{
      name:'holdSeq'
   },{
      name:'holdType'
   },{
      name:'holdCode'
   },{
      name:'holdChk'
   },{
      name:'chgReason'
   },{
      name:'customAppNo'
   },{
      name:'customAppType'
   },{
      name:'customAppDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'updateTime',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'facility'
   },{
      name:'checkHoldChk'
   },{
      name:'displayIXCd'
   },{
      name:'displayRehandleCode'
   },{
      name:'displayCntrState'
   },{
      name:'displayHoldCode'
   },{
      name:'yardPosition'
   },{
      name:'applyCheck'
   },{
      name:'updateStaffCd'
   },{
      name:'cntrState'
   },{
      name:'rowLock'
   }]
});