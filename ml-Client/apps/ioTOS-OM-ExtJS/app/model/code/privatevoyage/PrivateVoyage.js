Ext.define('IoTosOmExt.model.code.privatevoyage.PrivateVoyage', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{ 
      name: 'fieldValue'
   },{ 
      name: 'vslNm'
   },{ 
      name: 'vslLnm'
   },{ 
      name: 'vslCd'
   },{ 
      name: 'callYear'
   },{ 
      name: 'callSeq'
   },{ 
      name: 'userVoyage'
   },{ 
      name: 'inLane'
   },{ 
      name: 'outLane'
   },{ 
      name: 'atd', 
      type: 'date',
      dateFormat: 'time'
   },{ 
      name: 'etb',
      type: 'date',
      dateFormat: 'time'
   },{ 
      name: 'atw', 
      type: 'date',
      dateFormat: 'time'
   },{ 
      name: 'atc',
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'atb', 
      type: 'date' , 
      dateFormat: 'time'
   },{ 
      name: 'iVoyNo', 
   },{ 
      name: 'oVoyNo',
   },{ 
      name: 'operator', 
   },{ 
      name: 'netTon', 
   },{ 
      name: 'docClose'
   },{ 
      name: 'iBaplieChk'
   },{ 
      name: 'oBaplieChk'
   },{ 
      name: 'movinsChk'
   },{ 
      name: 'vvd'
   },{ 
      name: 'refNo'
   },{ 
      name: 'folderExtractID'
   },{ 
      name: 'logStatus'
   },{ 
      name: 'closeChk'
   },{
      name: 'status'
   },{ 
      name: 'bargeChk'
   },{ 
      name: 'domesticChk'
   },{ 
      name: 'storageType'
   },{ 
      name: 'berthNo'
   },{ 
      name: 'alongSide'
   },{ 
      name: 'eta',
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'etwl', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'etd', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'longtermEta', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'longtermEtb', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'longtermEtd', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'disQty', 
   },{ 
      name: 'loadQty'
   },{ 
      name: 'shiftQty'
   },{ 
      name: 'yardClose', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'atal', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'etc',
      type: 'date',
      dateFormat: 'time'
   },{ 
      name: 'deptType'
   },{ 
      name: 'vesselDepartureType'
   },{ 
      name: 'vesselScheduleType'
   },{ 
      name: 'strgVslCd'
   },{ 
      name: 'vesselName'
   },{ 
      name: 'vesselCode'
   },{ 
      name: 'inVoyage'
   },{ 
      name: 'outVoyage'
   },{ 
      name: 'ptnrCode'
   },{ 
      name: 'priVslCd'
   },{ 
      name: 'priInVoy'
   },{ 
      name: 'priOutVoy'
   },{ 
      name: 'engSnm'
   },{ 
      name: 'priYardOpen', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'priYardClose', 
      type: 'date', 
      dateFormat: 'time'
   },{
      name: 'priDocClose', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'priDocClose2', 
      type: 'date' , 
      dateFormat: 'time'
   },{ 
      name: 'userVoy', 
      type: 'string'
   },{ 
      name: 'ptnrCodeList'
   }]
});