Ext.define('IoTosOmExt.model.code.containertypesize.ContainerSize', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields : [{
      name : 'code1',
   },{
      name : 'code1Desc',
   },{
      name : 'code2',
   },{
      name : 'code2Desc',
   },{
      name : 'tunnel',
   },{
      name : 'sizeCode',
   },{
      name : 'useChk',
      convert : function(value) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   }]
});