Ext.define('IoTosOmExt.model.code.partnercode.PartnerCode', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name: 'ptnrType'
   },{ 
      name: 'ptnrCode'
   },{ 
      name: 'engSnm'
   },{ 
      name: 'engLnm'
   },{
      name: 'regNo'
   },{ 
      name: 'rePresentative'
   },{
      name: 'telNo'
   },{ 
      name: 'faxNo'
   },{ 
      name: 'zipCd'
   },{ 
      name: 'addr'
   },{ 
      name: 'internet'
   },{ 
      name: 'curr'
   },{ 
      name: 'unusedChk',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'truckerChk',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{
      name: 'cntrSztp'
   },{ 
      name: 'berthNo'
   },{ 
      name: 'vanType'
   },{ 
      name: 'paymentType'
   },{ 
      name: 'chkedInvFdate'
   },{ 
      name: 'invFdate',
      type : 'date', 
      dateFormat : 'time'
   },{ 
      name: 'chkedInvTdate'
   },{ 
      name: 'invTdate',
      type : 'date', 
      dateFormat : 'time'   
   },{ 
      name: 'bankAccount'
   },{ 
      name: 'costCenter'
   },{ 
      name: 'lclSnm'
   },{ 
      name: 'lclLnm'
   },{ 
      name: 'userCode'
   },{ 
      name: 'account'
   },{ 
      name: 'staffCd'
   },{ 
      name: 'updateTime',
      type : 'date', 
      dateFormat : 'time'
   },{ 
      name: 'priority'
   },{ 
      name: 'creditNo'
   },{ 
      name: 'defenseChk'
   },{ 
      name: 'foreColor'
   },{ 
      name: 'backColor'
   },{ 
      name: 'sztpChk', 
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'country'
   },{ 
      name: 'personList'
   },{ 
      name: 'delPersonList'
   },{ 
      name: 'person'
   },{ 
      name: 'dtelNo'
   },{ 
      name: 'dfaxNo'
   },{ 
      name: 'pagerNo'
   },{ 
      name: 'cellularNo'
   },{ 
      name: 'emailAddr'
   },{ 
      name: 'agencyCodeList'
   },{ 
      name: 'agencyCode'
   },{ 
      name: 'carrierCode'
   },{ 
      name: 'taxAuthority'
   },{ 
      name: 'profession'
   },{ 
      name: 'paymentTerm'
   },{ 
      name: 'vatChk',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'delAll'
   },{ 
      name: 'graceHours'
   },{ 
      name: 'customerId'
   },{ 
      name: 'payerUnusedChk',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'customerGrp'
   },{ 
      name: 'einvoiceAcceptChk',
      convert : function(value, record) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'payerEmailAddr'
   },{ 
      name: 'createTime', 
      type : 'date', 
      dateFormat : 'time'
   }]
});