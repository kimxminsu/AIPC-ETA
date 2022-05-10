Ext.define('IoTosOmExt.model.documentservice.terminalservice.StoppageList', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
   fields: [
   { name : "equType",         type : "string" },
   { name : "stopSeq",         type : "string" },
   { name : "stopType",        type : "string",
      convert : function(value, record){
         return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.STOPPAGE_TYPE, record.get('stopType'));
      } 
   },
   { name : "equType",         type : "string" },
   { name : "equNo",           type : "string" },
   { name : "stopSTime",       type : "string" },
   { name : "stopETime",       type : "string" },
   { name : "stopPTiem",       type : "string" },
   { name : "resumePTime",     type : "string" },
   { name : "vslCd",           type : "string" },
   { name : "callYear",        type : "string" },
   { name : "callSeq",         type : "string" },
   { name : "stopRsn",         type : "string" },
   { name : "stopDesc",        type : "string" },
   { name : "remark",          type : "string" },
   { name : "mediumType",      type : "string",
      convert : function(value, record){
         return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.MEDIUM_TYPE, record.get('mediumType'));
      } 
   },
   { name : "shiftDate",       type : "string" },
   { name : "shiftNm",         type : "string" },
   { name : "stopMins",        type : "string",
      convert : function(value, record){
         return value ? parseFloat(value) : "";
      }
   },
   { name : "stopHours",       type : "string",
      convert : function(value, record){
         return value ? parseFloat(value) : "";
      }
   },
   { name : "billChk",         type : "string" },
   { name : "shiftNo",         type : "string" },
   ]   
});