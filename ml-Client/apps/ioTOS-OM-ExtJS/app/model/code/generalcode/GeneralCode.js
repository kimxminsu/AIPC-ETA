Ext.define('IoTosOmExt.model.code.generalcode.GeneralCode', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
   
   fields : [{
      name : 'gnrlType',
   },{
      name : 'gnrlCode',
   },{
      name : 'gnrlNm',
   },{
      name : 'checkDefault',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{
      name : 'checkBill',
   },{
      name : 'foreColor',
   },{
      name : 'backColor',
   },{
      name : 'codeGroup',
   },{
      name : 'revenueUnit',
   },{
      name : 'cntrWise',
   },{
      name : 'cntrWiseChk',
   },{
      name : 'rate',
   },{
      name : 'blockArea',
   },{
      name : 'priority',
   },{
      name : 'defaultSelect',
   },{
      name : 'symbol',
   },{
      name : 'needAuth',
   },{
      name : 'fPod',
   },{
      name : 'customerCode',
   },{
      name : 'codeUsage',
   },{
      name : 'holdChk',
   }]
});