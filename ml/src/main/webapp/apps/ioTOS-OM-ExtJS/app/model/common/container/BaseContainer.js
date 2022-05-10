Ext.define('IoTosOmExt.model.common.container.BaseContainer', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [{
      name:'absConst'
   },{
      name:'airvent'
   },{
      name:'airventUnit'
   },{
      name:'area'
   },{
      name:'bay'
   },{
      name:'bayIdx'
   },{
      name:'blNo'
   },{
      name:'block'
   },{
      name:'bookingNo'
   },{
      name:'bookingSeq'
   },{
      name:'callSeq'
   },{
      name:'callYear'
   },{
      name:'cargoType'
   },{
      name:'choldChk'
   },{
      name:'cleanCode'
   },{
      name:'cntrCond'
   },{
      name : 'cntrLength'
   },{
      name : 'cntrType'
   },{
      name : 'cntrHeightWidth'
   },{
      name : 'weightGroup'
   },{
      name : 'cntrLogNo'
   },{
      name : 'stackDays'
   },{
      name:'cntrId'
   },{
      name:'cntrUid'
   },{
      name:'cntrNo'
   },{
      name:'cntrSeq'
   },{
      name:'cntrState'
   },{
      name:'cod'
   },{
      name:'commodity'
   },{
      name:'commodityDesc'
      
   },{
      name:'consignee'
      
   },{
      name:'consigneeName'
      
   },{
      name:'dbay'
      
   },{
      name:'dbaySeq' 
   },{
      name:'defectiveCode'
   },{
      name:'delv'
   },{
      name:'dequNo'
   },{
      name:'dgChk'
   },{
      name:'dhatchIdx' 
   },{
      name:'dhd' 
   },{
      name:'dispatchMode' 
   },{
      name:'dispatchMode2'
   },{
      name:'dmgChk' 
   },{
      name:'dmgCond' 
   },{
      name:'domesticChk' 
   },{
      name:'drow' 
   },{
      name:'dtier' 
   },{
      name:'ediTemp'
   },{
      name:'ediTempF'
   },{
      name:'egearChk' 
   },{
      name:'emtyChk',
      convert : function(value) {
         if(value == true || value == 'Y') {
            return true;
         }else {
            return false;
         }
      } 
   },{
      name:'fdest' 
   },{
      name:'fe' 
   },{
      name:'forwarder' 
   },{
      name:'fpod' 
   },{
      name:'gateOdrNo' 
   },{
      name:'gateOdrNo2' 
   },{
      name:'gway' 
   },{
      name:'fgway' 
   },{
      name:'handleInstr' 
   },{
      name:'imdg' 
   },{
      name:'inDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'inLane'
   },{
      name:'inTmnlDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'inspectChk' 
   },{
      name:'ixCd' 
   },{
      name:'jobOdrNo' 
   },{
      name:'jobOdrNo2' 
   },{
      name:'lbay' 
   },{
      name:'lbaySeq' 
   },{
      name:'lclFcl' 
   },{
      name:'lequNo' 
   },{
      name:'lhatchIdx' 
   },{
      name:'lhd' 
   },{
      name:'lrow' 
   },{
      name:'ltier' 
   },{
      name:'netWgt' 
   },{
      name:'osHeight' 
   },{
      name:'osPort' 
   },{
      name:'osStbd' 
   },{
      name:'outDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'outLane' 
   },{
      name:'ovAft' 
   },{
      name:'ovFore' 
   },{
      name:'ovHeight' 
   },{
      name:'ovPort' 
   },{
      name:'ovStbd' 
   },{
      name:'doorStatus' 
   },{
      name:'flipDir' 
   },{
      name:'overlandChk' 
   },{
      name:'owner' 
   },{
      name:'orgCntrId' 
   },{
      name:'pod' 
   },{
      name:'pol' 
   },{
      name:'por' 
   },{
      name:'powerCode' 
   },{
      name:'preinfoChk' 
   },{
      name:'presealChk' 
   },{
      name:'prevCntrId' 
   },{
      name:'prevSeq' 
   },{
      name:'prevUserVoy' 
   },{
      name:'prevVsl' 
   },{
      name:'prevVVD' 
   },{
      name:'prevYear' 
   },{
      name:'pSztp'
   },{
      name:'ptnrCode' 
   },{
      name:'recvDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'puPlanDate2',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'rehandleCode' 
   },{
      name:'rehandleRsn' 
   },{
      name:'rehandleStaff' 
   },{
      name:'releaseChk' 
   },{
      name:'releaseChk2' 
   },{
      name:'remark' 
   },{
      name:'returnRsn' 
   },{
      name:'rowIdx' 
   },{
      name:'roww'
   },{
      name:'rsrvSeq'  
   },{
      name:'rsrvType' 
   },{
      name:'sealNo1' 
   },{
      name:'sealNo2' 
   },{
      name:'sealNo3' 
   },{
      name:'setTempC'
   },{
      name:'setTempF'
   },{
      name:'shiftAcc' 
   },{
      name:'shiftRsn' 
   },{
      name:'shiftTime' 
   },{
      name:'shiftType'
   },{
      name:'soNo' 
   },{
      name:'socChk',
      convert : function(value) {
         if(value == true || value == 'Y') {
            return true;
         }else {
            return false;
         }
      } 
   },{
      name:'storageCode' 
   },{
      name:'stuffChk' 
   },{
      name:'sztp' 
   },{
      name:'sztp2' 
   },{
      name:'tableName' 
   },{
      name:'tholdChk' 
   },{
      name:'tier' 
   },{
      name:'transType' 
   },{
      name:'transType2' 
   },{
      name:'trnVoy' 
   },{
      name:'trnVoy2' 
   },{
      name:'truckNo' 
   },{
      name:'truckNo2' 
   },{
      name:'trucker' 
   },{
      name:'trucker2' 
   },{
      name:'unno' 
   },{
      name:'unplugInstr' 
   },{
      name:'userVoy' 
   },{
      name:'vslCd' 
   },{
      name:'wgt' 
   },{
      name:'yhandleInstr'
   },{
      name:'yspecialType'
   },{
      name:'packingGrp'
   },{
      name:'jobOdrSeq2'
   },{
      name:'sicNo'
   },{
      name:'sicNo2' 
   },{
      name:'isSecondVsl' 
   },{
      name:'hazardousInformationItems',
      mapping : 'hazardousInformationItemList'
   },{
      name:'yardId' 
   },{
      name:'fireCode' 
   },{
      name:'ifreeTime',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'dfreeTime',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'packChk' 
   },{
      name:'customAppNo' 
   },{
      name:'customApp//type' 
   },{
      name:'pod2' 
   },{
      name:'bundleCntr' 
   },{
      name:'plugChk' 
   },{
      name:'dummy1' 
   },{
      name:'dummy2' 
   },{
      name:'dummy3' 
   },{
      name:'dummy4' 
   },{
      name:'dummy5' 
   },{
      name:'railRehandleCode' 
   },{
      name:'railRehandleCode2' 
   },{
      name:'railRehandleRsn' 
   },{
      name:'railRehandleRsn2' 
   },{
      name:'dwagonNo' 
   },{
      name:'dwagonSeq' 
   },{
      name:'dwagonPos' 
   },{
      name:'lwagonNo' 
   },{
      name:'lwagonSeq' 
   },{
      name:'lwagonPos' 
   },{
      name:'inVgm' 
   },{
      name:'vgm' 
   },{
      name:'vgmChk' 
   },{
      name:'otherTmnlVoy' 
   },{
      name:'cmh'
   },{
      name:'priPor' 
   },{
      name:'priFdest' 
   },{
      name:'gateinCate'
   },{
      name:'toDepot' 
   },{
      name:'fromDepot' 
   },{
      name:'tareWgt' 
   },{
      name:'customOffice' 
   },{
      name:'returnPlace' 
   },{
      name:'chgRsnSealNo1' 
   },{
      name:'chgRsnSealNo2' 
   },{
      name:'chgRsnSealNo3' 
   },{
      name:'cntrRmk1' 
   },{
      name:'deductWgt' 
   },{
      name:'totalWgt' 
   },{
      name:'customsId' 
   },{
      name:'doChk' 
   },{
      name:'doNo' 
   },{
      name:'billDelv' 
   },{
      name:'oprExpireDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'returnExpireDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'toBeReturned' 
   },{
      name:'orgEmty' 
   },{
      name:'subsidiaryRisk' 
   },{
      name:'marinePollut' 
   },{
      name:'limitedQty' 
   },{
      name:'vgmAuthNo'  
   },{
      name:'vgmDate',
      type: 'date',
      dateFormat: 'time'
   },{
      name:'vgmPersonInfo'  
   },{
      name:'machineStatus'  
   },{
      name:'documentChk'  
   },{
      name:'detNeedChk'  
   },{
      name:'jobOdrSeq'  
   },{
      name:'loadPos'  
   },{
      name:'disPos'  
   },{
      name : 'backUpItem'
   }],

   associations : [{
      type : 'hasMany',
      name : 'hazardousInformationItemList',
      model : 'IoTosOmExt.model.common.hazardousinformation.HazardousInformation'
   }]
});