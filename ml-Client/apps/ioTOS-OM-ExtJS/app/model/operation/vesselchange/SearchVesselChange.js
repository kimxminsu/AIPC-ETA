Ext.define('IoTosOmExt.model.operation.vesselchange.SearchVesselChange', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name:'vslCd'
   },{
      name:'callYear'
   },{
      name:'callSeq'
   },{
      name:'reservedCheck',
      type : 'boolean'
   },{
      name:'inYardCheck',
      type : 'boolean'
   },{
      name:'vesselChangeMode'
   },{
      name:'cntrNo'
   },{
      name:'cntrNoList'
   },{
		name:'cntrState'
	},{
		name:'cntrUid'
	},{
		name:'ioMode'
	},{
		name:'ixCd'
	},{
		name:'delv'
	},{
		name:'rehandleCode'
	},{
		name:'dispatchMode'
	},{
		name:'dispatchMode2'
	},{
		name:'por'
	},{
		name:'fdest'
	},{
		name:'priFdest'
	}]
});