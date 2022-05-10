Ext.define('IoTosOmExt.model.code.containertypesize.ContainerType', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields : [{
      name : 'gCode',
   },{
      name : 'gCodeDesc',
   },{
      name : 'code',
   },{
      name : 'codeDesc',
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