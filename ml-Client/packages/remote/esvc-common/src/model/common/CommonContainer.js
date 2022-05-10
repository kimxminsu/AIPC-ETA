Ext.define('ESVC.model.common.CommonContainer', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'containerNo',
			type:'string'
		},
		{
			name:'containerSeq',
			type:'string'
		},
		{
			name:'ixCD',
			type:'string'
		},
		{
			name:'status',
			type:'string'
		},
		{
			name:'vesselCode',
			type:'string'
		},
		{
			name:'callYear',
			type:'string'
		},
		{
			name:'callSeq',
			type:'string'
		},
		{
			name:'userVoyage',
			type:'string'
		},
		{
			name:'vesselName',
			type:'string'
		},
		{
			name:'prevVessel',
			type:'string'
		},
		{
			name:'prevYear',
			type:'string'
		},
		{
			name:'prevSeq',
			type:'string'
		},
		{
			name:'prevUserVoy',
			type:'string'
		},
		{
			name:'prevVesselName',
			type:'string'
		},
		{
			name:'operator',
			type:'string'
		},
		{
			name:'operator2',
			type:'string'
		},
		{
			name:'inVoyage',
			type:'string'
		},
		{
			name:'outVoyage',
			type:'string'
		},
		{
			name:'nextInVoyage',
			type:'string'
		},
		{
			name:'nextOutVoyage',
			type:'string'
		},
		{
			name:'inLane',
			type:'string'
		},
		{
			name:'outLane',
			type:'string'
		},
		{
			name:'sztp',
			type:'string'
		},
		{
			name:'sztp2',
			type:'string'
		},
		{
			name:'privateSztp',
			type:'string'
		},
		{
			name:'fullEmpty',
			type:'string'
		},
		{
			name:'weight',
			type:'integer'
		},
		{
			name:'por',
			type:'string'
		},
		{
			name:'pol',
			type:'string'
		},
		{
			name:'pod',
			type:'string'
		},
		{
			name:'nextPod',
			type:'string'
		},
		{
			name:'fpod',
			type:'string'
		},
		{
			name:'fdest',
			type:'string'
		},
		{
			name:'deliveryType',
			type:'string'
		},
		{
			name:'cargoType',
			type:'string'
		},
		{
			name:'imdg',
			type:'string'
		},
		{
			name:'unno',
			type:'string'
		},
		{
			name:'packingGrp',
			type:'string'
		},
		{
			name:'temp',
			type:'string'
		},
		{
			name:'temp2',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'bookingNo',
			type:'string'
		},
		{
			name:'puOrderNo',
			type:'string'
		},
		{
			name:'referenceNo',
			type:'string'
		},
		{
			name:'jobOrderNo',
			type:'string'
		},
		{
			name:'jobOrderNo2',
			type:'string'
		},
		{
			name:'jobOrderSeq2',
			type:'string'
		},
		{
			name:'owner',
			type:'string'
		},
		{
			name:'forwarder',
			type:'string'
		},
		{
			name:'consignee',
			type:'string'
		},
		{
			name:'overHeight',
			type:'integer'
		},
		{
			name:'overFore',
			type:'integer'
		},
		{
			name:'overAfter',
			type:'integer'
		},
		{
			name:'overPort',
			type:'integer'
		},
		{
			name:'overStarboard',
			type:'integer'
		},
		{
			name:'overslotHeight',
			type:'integer'
		},
		{
			name:'overslotPort',
			type:'integer'
		},
		{
			name:'overslotStarboard',
			type:'integer'
		},
		{
			name:'reserveType',
			type:'string'
		},
		{
			name:'reserveSeq',
			type:'string'
		},
		{
			name:'inDispatchMode',
			type:'string'
		},
		{
			name:'outDispatchMode',
			type:'string'
		},
		{
			name:'inTerminalDate',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'inDate',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'outDate',
			type:'date',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'inOut',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'sealNo1',
			type:'string'
		},
		{
			name:'sealNo2',
			type:'string'
		},
		{
			name:'sealNo3',
			type:'string'
		},
		{
			name:'choldCheck',
			type:'string'
		},
		{
			name:'tholdCheck',
			type:'string'
		},
		{
			name:'inspectCheck',
			type:'string'
		},
		{
			name:'inspectType',
			type:'string'
		},
		{
			name:'inspectDate',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				return value;
			}
		},
		{
			name:'inTransType',
			type:'string'
		},
		{
			name:'outTransType',
			type:'string'
		},
		{
			name:'inTrucker',
			type:'string'
		},
		{
			name:'outTrucker',
			type:'string'
		},
		{
			name:'truckerName',
			type:'string'
		},
		{
			name:'inDriver',
			type:'string'
		},
		{
			name:'outDriver',
			type:'string'
		},
		{
			name:'handlingInstruction',
			type:'string'
		},
		{
			name:'handlingInstructionY',
			type:'string'
		},
		{
			name:'absoluteConstraints',
			type:'string'
		},
		{
			name:'inTrainVoyNo',
			type:'string'
		},
		{
			name:'outTrainVoyNo',
			type:'string'
		},
		{
			name:'inTrailerNo',
			type:'string'
		},
		{
			name:'outTrailerNo',
			type:'string'
		},
		{
			name:'inTruckNo',
			type:'string'
		},
		{
			name:'outTruckNo',
			type:'string'
		},
		{
			name:'inGateOrderNo',
			type:'string'
		},
		{
			name:'outGateOrderNo',
			type:'string'
		},
		{
			name:'yardBlockType',
			type:'string'
		},
		{
			name:'yardPositionBlock',
			type:'string'
		},
		{
			name:'yardPositionBay',
			type:'string'
		},
		{
			name:'yardPositionRow',
			type:'string'
		},
		{
			name:'yardPositionTier',
			type:'string'
		},
		{
			name:'yardPositionArea',
			type:'string'
		},
		{
			name:'bayIndex',
			type:'string'
		},
		{
			name:'rowIndex',
			type:'string'
		},
		{
			name:'loadingPositionBay',
			type:'string'
		},
		{
			name:'loadingPositionRow',
			type:'string'
		},
		{
			name:'loadingPositionTier',
			type:'string'
		},
		{
			name:'dischargingPositionBay',
			type:'string'
		},
		{
			name:'dischargingPositionRow',
			type:'string'
		},
		{
			name:'dischargingPositionTier',
			type:'string'
		},
		{
			name:'dischargingPositionHD',
			type:'string'
		},
		{
			name:'dischargingPositionHatchIndex',
			type:'string'
		},
		{
			name:'dischargingPositionBaySeq',
			type:'string'
		},
		{
			name:'loadingPositionHD',
			type:'string'
		},
		{
			name:'loadingPositionHatchIndex',
			type:'string'
		},
		{
			name:'loadingPositionBaySeq',
			type:'string'
		},
		{
			name:'containerCondition',
			type:'string'
		},
		{
			name:'defectiveCode',
			type:'string'
		},
		{
			name:'damageCondition',
			type:'string'
		},
		{
			name:'cleanCode',
			type:'string'
		},
		{
			name:'unplugInstr',
			type:'string'
		},
		{
			name:'airVent',
			type:'integer'
		},
		{
			name:'rehandleCode',
			type:'string'
		},
		{
			name:'commodity',
			type:'string'
		},
		{
			name:'remark',
			type:'string'
		},
		{
			name:'containerId',
			type:'string'
		},
		{
			name:'checkDate',
			type:'string'
		},
		{
			name:'tableName',
			type:'string'
		},
		{
			name:'stackDays',
			type:'integer'
		},
		{
			name:'holdStateIndicator',
			type:'string'
		},
//		{
//			name:'holdStateItems',
//			type:'dataitemlist'
//		},
//		{
//			name:'dangerousDetailItems',
//			type:'dataitemlist'
//		},
//		{
//			name:'containerDamageItems',
//			type:'dataitemlist'
//		},
//		{
//			name:'bundleItems',
//			type:'dataitemlist'
//		},
//		{
//			name:'historyItems',
//			type:'dataitemlist'
//		},
		{
			name:'voyage',
			type:'string'
		},
		{
			name:'containerUID',
			type:'string'
		},
		{
			name:'gateOrderNo',
			type:'string'
		},
		{
			name:'gateTrucker',
			type:'string'
		},
		{
			name:'containerType',
			type:'string'
		},
		{
			name:'eta',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
			
		},
		{
			name:'etd',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'ata',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'atd',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue;
					
					if(record.get('colDateTime')){
						colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
					} else {
						colDateValue = value;
					} 
					
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'soNo',
			type:'string'
		},
		{
			name:'bundleContainer',
			type:'string'
		},
		{
			name:'bundleSztp',
			type:'string'
		},
		{
			name:'bundleSztp2',
			type:'string'
		},
		{
			name:'vgm',
			type:'string'
		},
		{
			name:'qjobCode',
			type:'string'
		}
		]

});