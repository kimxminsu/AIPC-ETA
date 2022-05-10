Ext.define('IoTosOmExt.model.common.hazardousinformation.HazardousInformation', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields : [{
      name : 'cntrId',
   },{
      name : 'dgSeq',
   },{
      name : 'vslCd',
   },{
      name : 'callYear',
   },{
      name : 'callSeq',
   },{
      name : 'cntrNo',
   },{
      name : 'unid'
   },{
      name : 'imdg'
   },{
      name : 'unno'
   },{
      name : 'packingGrp'
   },{
      name : 'properShipNm'
   },{
      name : 'extendClass'
   },{
      name : 'subsidiaryRisk'
   },{
      name : 'ems'
   },{
      name : 'flashPoint'
   },{
      name : 'marinePollut'
   },{
      name : 'limitedQty',
      // convert : function(value) {
      //    if(value == 'Y' || value == true) {
      //       return true;
      //    }else {
      //       return false;
      //    }
      // }
   },{
      name : 'wgt'
   },{
      name : 'parentTableType'
   },{
      name : 'parentTableName'
   },{
      name : 'staffCd'
   },{
      name : 'bookingNo'
   },{
      name : 'sztp'
   },{
      name : 'cargoType'
   },{
      name : 'cntrUid'
   },{
      name : 'ixCd'
   },{
      name : 'trnVoy'
   },{
      name : 'limitedQtyCheck',
      convert : function(value) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{
      name : 'itemList'
   },{
      name : 'imdgDescription'
   },{
      name : 'newVslCd'
   },{
      name : 'newCallYear'
   },{
      name : 'newCallSeq'
   },{
      name : 'cmplChk'
   },{
      name : 'dgChk'
   },{
      name : 'setTemp'
   },{
      name : 'fe'
   },{
      name : 'oversize'
   },{
      name : 'updateDgChkUsingVesselSchedule'
   }]
});