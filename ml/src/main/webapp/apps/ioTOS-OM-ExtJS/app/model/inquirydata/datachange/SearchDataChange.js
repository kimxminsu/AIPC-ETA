Ext.define('IoTosOmExt.model.inquirydata.datachange.SearchDataChange', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name:'cntrNo'
   },{
      name:'cntrUid'
   },{
      name:'cntrId'
   },{
      name:'vslCd'
   },{
      name:'callYear'
   },{
      name:'callSeq'
   },{
      name:'outLane'
   },{
      name:'ptnrCode'
   },{
      name:'cntrNoBindingText'
   },{
      name:'classBindingText'
   },{
      name:'inTmnlDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'cntrNos'
   },{
      name:'classes'
   },{
      name:'tableName'
   },{
      name:'changeTFItoTRA'
   },{
      name:'changeTFEtoTRA'
   },{
      name:'isUseClassInOut',
      type : 'boolean'
   },{
      name:'isProvideCustoms',
      type : 'boolean'
   }]
});