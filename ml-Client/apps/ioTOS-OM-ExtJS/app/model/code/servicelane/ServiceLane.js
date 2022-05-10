Ext.define('IoTosOmExt.model.code.servicelane.ServiceLane', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields : [{
      name : 'laneCd'
   },{
      name : 'laneName'
   },{
      name : 'consortiumCd'
   },{
      name : 'portLane'
   },{
      name : 'teuRatio'
   },{
      name : 'foreColor'
   },{
      name : 'backColor'
   },{
      name : 'ptnrCode'
   },{
      name : 'portSeq'
   },{
      name : 'callingPort'
   },{
      name : 'callingPortName'
   },{
      name : 'portForeColor'
   },{
      name : 'portBackColor'
   },{
      name : 'portPrefix'
   },{
      name : 'laneProd'
   },{
      name : 'unusedChk',
      convert : function(value) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   }],
});