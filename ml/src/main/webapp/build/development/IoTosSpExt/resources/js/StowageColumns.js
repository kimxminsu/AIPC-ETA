var STOWAGCOLUMNS = [{
	header : 'CUD',
	reference: 'refCudColumn',
	dataIndex : 'cud',
	width : 80,
	align : 'center',
	hideable: false,
	hidden: true,
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value === 'C' ? 'Created' : value === 'U' ? 'Updated' : value === 'D' ? 'Deleted' : '';
	}
}, {
	header : 'Stowage ID',
	dataIndex : 'ascId',
	width : 100,
	align : 'center',
	hidden : true,
	hideable: false
}, 
// {
// 	header : 'Load List ID',
// 	dataIndex : 'oblId',
// 	width : 100,
// 	align : 'center',
// 	hidden : true,
// 	hideable: false
// }, 
{
	header : 'P.Mode',
	dataIndex : 'planMode',
	tooltip: 'Plan Mode <br> L: Load List Plan <br> P: Palette Plan <br> A: Auto Pre-Plan',
	width : 50,
	align : 'center',
	filter: 'list',
	hidden : true,
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';color: #B22222;font-weight: bold';
		return value;
	}
}, 
// {
// 	header : 'IND',
// 	dataIndex : 'indicators',
// 	tooltip: 'Indicators <br> S: Shift/Restow <br> C: COD',
// 	width : 50,
// 	align : 'center',
// 	hidden : false,
// 	filter: 'list',
// 	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
// 		metaData.style =  'background: ' + '#F0F8FF' + ';color: #B22222;font-weight: bold';
// 		if(value === 'SHIFT') {
// 			return 'S';
// 		} else if(value === 'COD') {
// 			return 'C';
// 		} else {
// 			return '';
// 		}
// 	}
// }, {
// 	header : 'Overstow',
// 	dataIndex : 'irrOverStow',
// 	tooltip: 'Y: Overstow',
// 	width : 50,
// 	align : 'center',
// 	hidden : false,
// 	filter: 'list',
// 	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
// 		metaData.style =  'background: ' + '#F0F8FF' + ';color: #B22222;font-weight: bold';
// 		if(value === 'Y') {
// 			return 'Y';
// 		} else {
// 			return '';
// 		}
// 	}
// }, 
{
	header : 'Container No.',
	dataIndex : 'cntrNo',
	width : 130,
	align : 'center',
	filter: {
        type: 'string',
        itemDefaults: {
            emptyText: 'Search for...'
        }
    },
    // editor:{  
	// 	xtype: 'textfield',
	// 	maxLength : 12,
	// 	enforceMaxLength : true,
	// 	selectOnFocus: true,
	// 	vtype : 'alphanum',
	// 	listeners: {
	// 		change: function(field, newValue, oldValue){
	// 			if(newValue) field.setValue(newValue.toUpperCase());
	// 		}
	// 	}
	// }
},
{
	header : 'Status',
	dataIndex : 'state',
	width : 90,
	align : 'center',
	filter: {
        type: 'string',
        itemDefaults: {
            emptyText: 'Search for...'
        }
	},
	renderer: function(value) {
		if(value === CodeConstants.CntrState.RESERVED) return 'Reserved';
		else if(value === CodeConstants.CntrState.BOOKING) return 'Booking';
		else if(value === CodeConstants.CntrState.STACKING) return 'Stacking';
		else if(value === CodeConstants.CntrState.IN_PROGRESS_INCOMING) return 'Incoming';
		else if(value === CodeConstants.CntrState.IN_PROGRESS_OUTGOING) return 'Outcoming';
		else if(value === CodeConstants.CntrState.UNDER_SHIFTING) return 'Shifting';
		else if(value === CodeConstants.CntrState.DELIVERED) return 'Delivered';
	}
},  {
	header : 'Bay\n(D)',
	dataIndex : 'dbay',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'Row\n(D)',
	dataIndex : 'drow',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'Tier\n(D)',
	dataIndex : 'dtier',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'Bay\n(L)',
	dataIndex : 'lbay',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'Row\n(L)',
	dataIndex : 'lrow',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'Tier\n(L)',
	dataIndex : 'ltier',
	width : 50,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
},{
	header : 'Sztp',
	dataIndex : 'sztp',
	width : 70,
	align : 'center',
	filter: 'list',
},{
	header : 'Sztp2',
	dataIndex : 'sztp2',
	width : 70,
	align : 'center',
	filter: 'list',
},
{
	header : 'POL',
	dataIndex : 'pol',
	tooltip: 'Port of Loading',
	width : 60,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'POD',
	dataIndex : 'pod',
	tooltip: 'Port of Discharge',
	width : 60,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'WGT',
	dataIndex : 'weight',
	tooltip: 'Weight',
	width : 65,
	align : 'right',
	filter: 'list',
	formatter: 'number("0,000")',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'FE',
	dataIndex : 'fe',
	tooltip: 'F: Full <br> E: Empty',
	width : 50,
	align : 'center',
	filter: 'list',
	// editor : {
	// 	xtype : 'combo',
	// 	store: {
	// 		fields: [{
	// 			name: 'code', type: 'string'
	// 		}, {
	// 			name: 'name', type: 'string'
	// 		}],
	// 	    data: [{
	// 	    	code: 'F', name: 'F'
	// 	    }, {
	// 	    	code: 'E', name: 'E'
	// 	    }]
	// 	},
	// 	queryMode: 'local',
	// 	displayField: 'name',
	// 	valueField: 'code'
	// }
},  {
	header : 'Cargo\nType',
	dataIndex : 'cargoType',
	tooltip: 'Cargo Type',
	width : 70,
	align : 'center',
	filter: 'list',
	renderer: function(value) {
		if(value === CodeConstants.CargoType.GENERAL) return 'General';
		else if(value === CodeConstants.CargoType.EMPTY) return 'Empty';
		else if(value === CodeConstants.CargoType.REEFER) return 'Reefer';
		else if(value === CodeConstants.CargoType.DANGEROUS) return 'Dangerous';
		else if(value === CodeConstants.CargoType.EMPTY_DANGEROUS) return 'EmptyDangerous';
		else if(value === CodeConstants.CargoType.DANGEROUS_REEFER) return 'DangerousReefer';
		else if(value === CodeConstants.CargoType.BUNDLE) return 'Bundle';
		else if(value === CodeConstants.CargoType.BREAK_BULK) return 'BreakBulk';
		else if(value === CodeConstants.CargoType.OVER_DIMENSION) return 'OverDimension';
		else if(value === CodeConstants.CargoType.FRAGILE) return 'Fragile';
	}
},  {
	header : 'IMDG',					//Need Edit Window for DG
	dataIndex : 'imdg',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'UNNo',
	dataIndex : 'unno',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'Packing\nGroup',
	dataIndex : 'packingGrp',
	tooltip: 'Packing Group',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'Temp',
	dataIndex : 'temperature',
	tooltip: 'Temperature',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'OPR',
	dataIndex : 'opr',
	tooltip: 'Operator',
	width : 60,
	align : 'center',
	filter: 'list',
	// editor:{  
	// 	xtype: 'textfield',
	// 	maxLength : 3,
	// 	enforceMaxLength : true,
	// 	selectOnFocus: true,
	// 	vtype : 'alphanum',
	// 	listeners: {
	// 		change: function(field, newValue, oldValue){
	// 			if(newValue) field.setValue(newValue.toUpperCase());
	// 		}
	// 	}
	// }
}, 
{
	header : 'Delivery',
	dataIndex : 'delv',
	tooltip: 'Delivery Mode',
	width : 110,
	align : 'center',
	renderer: function(value) {
		if(value === CodeConstants.Delivery.DIRECT_DELIVERY) return 'Direct Delivery';
		else if(value === CodeConstants.Delivery.TRANSSHIPMENT) return 'Trans Shipment';
		else if(value === CodeConstants.Delivery.HOTCONNECTION) return 'Hot Connection';
		else if(value === CodeConstants.Delivery.TS_TO_OTHER_TERMINAL) return 'Ts To Other Terminal';
		else if(value === CodeConstants.Delivery.TS_FROM_OTHER_TERMINAL) return 'Ts From Other Terminal';
		else if(value === CodeConstants.Delivery.SHIFTING) return 'Shifting';
		else if(value === CodeConstants.Delivery.DIRECT_LOADING_TS_FROM_OTHER_TERMINAL) return 'Direct Loading to other Terminal';
		else if(value === CodeConstants.Delivery.RE_EXPORT) return 'Re Export';
		else if(value === CodeConstants.Delivery.NORMAL) return 'Normal';
		else if(value === CodeConstants.Delivery.TO_BE_TS_TO_SAME_VESSEL) return 'To be TS to Same Vessel';
	}
	// editor : {
	// 	xtype : 'textfield',
	// 	maxLength : 1,
	// 	enforceMaxLength : true,
	// 	selectOnFocus : true,
	// 	vtype : 'alphanum',
	// 	listeners: {
	// 		change: function(field, newValue, oldValue){
	// 			if(newValue) field.setValue(newValue.toUpperCase());
	// 		}
	// 	}
	// },
},
{
	header : 'Shifting\nTime',
	dataIndex : 'rstTime',
	tooltip: 'Shifting Time',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : '2nd\nVessel',
	dataIndex : 'preVessel',
	tooltip: 'Second Vessel',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : '2nd\nYear',
	dataIndex : 'preCallYear',
	tooltip: 'Second CallYear',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : '2nd\nSeq.',
	dataIndex : 'preCallSeq',
	tooltip: 'Second CallSeq',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : '2nd Confirm\nStatus',
	dataIndex : 'preRehandleCode',
	tooltip: 'Second Confirm Status',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'Bay Seq\n(D)',
	dataIndex : 'seqNo',
	tooltip: 'Seq No',
	width : 80,
	align : 'center',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		if(value <= 0){
			return record.get('seqNoP');
		}
		return value;
	}
}, {
	header : 'Handling\nInstr.',
	dataIndex : 'hi',
	tooltip: 'Handling Instr',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'Absolute\nConst', //ac
	dataIndex : 'ac',
	tooltip: 'Absolute Const',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'OsH',
	dataIndex : 'osh',
	tooltip: 'Over-Slot Height',
	width : 80,
	align : 'center',
	filter: 'list'
}, {
	header : 'OsP',
	dataIndex : 'osp',
	tooltip: 'Over-Slot Portside',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OsS',
	dataIndex : 'oss',
	tooltip: 'Over-Slot StarBoard',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OvA',
	dataIndex : 'ova',
	tooltip: 'Over-Dimension Afterward',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OvF',
	dataIndex : 'ovf',
	tooltip: 'Over-Dimension Forrward',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OvH',
	dataIndex : 'ovh',
	tooltip: 'Over-Dimension Height',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OvP',
	dataIndex : 'ovp',
	tooltip: 'Over-Dimension Portside',
	width : 80,
	align : 'center',
	filter: 'list'
},{
	header : 'OvS',
	dataIndex : 'ovs',
	tooltip: 'Over-Dimension StarBoard',
	width : 80,
	align : 'center',
	filter: 'list'
},
//}, {
//	header : 'Label',
//	dataIndex : 'specialLab',
//	width : 80,
//	align : 'center',
//	filter: 'list',
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//		    data: [{
//		    	code: 'RF', name: 'RF'
//		    }, {
//		    	code: 'BN', name: 'BN'
//		    }, {
//		    	code: 'DM', name: 'DM'
//		    }, {
//		    	code: 'BB', name: 'BB'
//		    }, {
//		    	code: 'OG', name: 'OOG'
//		    }]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	},
//	hidden : true,
//	hideable: false
// }, 
{
	header : 'Cell',
	dataIndex : 'cellPosition',
	width : 80,
	align : 'center',
	hidden:true,
	filter: {
        type: 'string',
        itemDefaults: {
            emptyText: 'Search for...'
        }
    },
    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'PLR',
	dataIndex : 'receiptPlace',
	tooltip: 'Place Receipt',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true,
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'POR',
	dataIndex : 'por',
	tooltip: 'Port of Registry',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'DEST',
	dataIndex : 'dest',
	tooltip: 'Destination',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'FPOD',
	dataIndex : 'finalPod',
	tooltip: 'Final POD',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'POD2',
	dataIndex : 'secondPod',
	tooltip: 'Optional POD',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, 
// {
// 	header : 'SzTp',
// 	dataIndex : 'sztp',
// 	width : 80,
// 	align : 'center',
// 	filter: 'list',
// 	editor : {
// 		xtype : 'textfield',
// 		maxLength : 4,
// 		enforceMaxLength : true,
// 		selectOnFocus : true,
// 		vtype : 'alphanum',
// 		listeners: {
// 			change: function(field, newValue, oldValue){
// 				if(newValue) field.setValue(newValue.toUpperCase());
// 			}
// 		}
// 	}
// }, 
//}, {
//	header : 'SzTpISO',
//	dataIndex : 'sztp2',
//	width : 80,
//	align : 'center',
//	filter: 'list',
//	editor : {
//		xtype : 'textfield',
//		maxLength : 4,
//		enforceMaxLength : true,
//		selectOnFocus : true,
//		vtype : 'alphanum',
//		listeners: {
//			change: function(field, newValue, oldValue){
//				if(newValue) field.setValue(newValue.toUpperCase());
//			}
//		}
//	}
{
	header : 'HC',
	dataIndex : 'hq',
	tooltip: 'Height Category <br> H: High Cubic <br> N: Normal',
	width : 50,
	align : 'center',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'WG',
	dataIndex : 'weightGroup',
	tooltip: 'Weight Group',
	width : 50,
	align : 'center',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'VGM',
	dataIndex : 'vgm',
	width : 70,
	align : 'center',
	filter: {
		type: 'boolean',
		yesText: 'Y',
		noText: 'N'
	},
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		if(value === null || value === 0) {
			return 'N';
		} else {
			return 'Y';
		}
	}
}, {
	header : 'VgmIdx',
	dataIndex : 'itnlVgmIdx',
	width : 70,
	align : 'center',
	hideable: false,
	hidden: true
}, {
	header : 'RF',
	dataIndex : 'rfTemp',
	tooltip: 'Reefer Temperature',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 6,
		enforceMaxLength : true,
		selectOnFocus : true,
		maskRe: /[-?\d{2}(\d{1}|.\d{1}){1}(c|C|f|F){1}]/,
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
		//Need Custom VType for temperature -.CF Number
	}
}, {
	header: 'RZ',
	dataIndex: 'riskZone',
	tooltip: 'Risk Zone',
	width: 100, align: 'center', 
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'ImdgIdx',
	dataIndex : 'itnlImdgIdx',
	width : 80,
	align : 'right',
	hidden : true,
	hideable: false,
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
},{
	header : 'L/FCL',
	dataIndex : 'lclFcl',
	width : 100,
	align : 'center',
	hidden : true,
	hideable: false
}, {
	header : 'Trans Type',
	dataIndex : 'transType',
	width : 80,
	align : 'center',
	hidden : true,
	hideable: false
}, {
	header : 'OvDH',
	dataIndex : 'ovDimHeight',
	tooltip: 'Over-Dimension Height',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvDF',
	dataIndex : 'ovDimForeWard',
	tooltip: 'Over-Dimension Fore',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvDA',
	dataIndex : 'ovDimAftWard',
	tooltip: 'Over-Dimension Aft',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvDP',
	dataIndex : 'ovDimPort',
	tooltip: 'Over-Dimension Portside',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvDS',
	dataIndex : 'ovDimStarBoard',
	tooltip: 'Over-Dimension Starboard',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvSH',
	dataIndex : 'ovSlotHeight',
	tooltip: 'Over-Slot Height',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 1,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvSP',
	dataIndex : 'ovSlotPort',
	tooltip: 'Over-Slot Portside',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 1,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'OvSS',
	dataIndex : 'ovSlotStarBoard',
	tooltip: 'Over-Slot Starboard',
	width : 80,
	align : 'right',
	editor : {
		xtype : 'textfield',
		maxLength : 1,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'PrevCOD',
	dataIndex : 'prevPortCod',
	tooltip: 'Previous COD Port',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'PrevCell',
	dataIndex : 'prevPosition',
	tooltip: 'Previous Cell Position',
	width : 80,
	align : 'center',
	filter: {
        type: 'string',
        itemDefaults: {
            emptyText: 'Search for...'
        }
    },
	editor : {
		xtype : 'textfield',
		maxLength : 7,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'numeric'
	}
}, {
	header : 'Shift',
	dataIndex : 'sftCntr',
	width : 50,
	align : 'center',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	},
	hidden : true,
	hideable: false
}, {
	header : 'SftPort',
	dataIndex : 'sftPort',
	tooltip: 'Shift/Restow Port',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 5,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'SftRsn',
	dataIndex : 'sftRsn',
	tooltip: 'Shift/Restow Reason',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'SftAcc',
	dataIndex : 'sftAcc',
	tooltip: 'Shift/Restow Account',
	width : 80,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 6,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype : 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
//}, {
//	header : 'SftTp',
//	dataIndex : 'sftType',
//	width : 50,
//	align : 'center',
//	hidden : true,
//	hideable: false,
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//		    data: [{
//		    	code: '1', name: '1'
//		    }, {
//		    	code: '2', name: '2'
//		    }]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	}
}, {
	header : 'SftCat',
	dataIndex : 'sftCate',
	tooltip: 'Shift/Restow Category',
	width : 50,
	align : 'center',
	hidden : true,
	hideable: false,
	editor : {
		xtype : 'combo',
		store: {
			fields: [{
				name: 'code', type: 'string'
			}, {
				name: 'name', type: 'string'
			}],
		    data: [{
		    	code: 'C', name: 'C'
		    }, {
		    	code: 'B', name: 'B'
		    }, {
		    	code: 'R', name: 'R'
		    }, {
		    	code: 'T', name: 'T'
		    }]
		},
		queryMode: 'local',
		displayField: 'name',
		valueField: 'code'
	}
}, {
	//Handling Instruction Code must come from DB
	header : 'HI',
	dataIndex : 'hndlInst',
	tooltip: 'Handling Instruction',
	width : 50,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype: 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//		    data: [{
//		    	code: 'TS', name: 'TS'
//		    }, {
//		    	code: 'OD', name: 'OD'
//		    }, {
//		    	code: 'OT', name: 'OT'
//		    }, {
//		    	code: 'OP', name: 'OP'
//		    }, {
//		    	code: 'EQ', name: 'EQ'
//		    }, {
//		    	code: 'UD', name: 'UD'
//		    }, {
//		    	code: 'UT', name: 'UT'
//		    }, {
//		    	code: 'UW', name: 'UW'
//		    }]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	}
}, {
	header : 'HI2',
	dataIndex : 'hndlInst2',
	tooltip: '2nd Handling Instruction',
	width : 50,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype: 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//			data: [{
//				code: 'TS', name: 'TS'
//			}, {
//				code: 'OD', name: 'OD'
//			}, {
//				code: 'OT', name: 'OT'
//			}, {
//				code: 'OP', name: 'OP'
//			}, {
//				code: 'EQ', name: 'EQ'
//			}, {
//				code: 'UD', name: 'UD'
//			}, {
//				code: 'UT', name: 'UT'
//			}, {
//				code: 'UW', name: 'UW'
//			}]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	}
}, {
	header : 'HI3',
	dataIndex : 'hndlInst3',
	tooltip: '3rd Handling Instruction',
	width : 50,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype: 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//			data: [{
//				code: 'TS', name: 'TS'
//			}, {
//				code: 'OD', name: 'OD'
//			}, {
//				code: 'OT', name: 'OT'
//			}, {
//				code: 'OP', name: 'OP'
//			}, {
//				code: 'EQ', name: 'EQ'
//			}, {
//				code: 'UD', name: 'UD'
//			}, {
//				code: 'UT', name: 'UT'
//			}, {
//				code: 'UW', name: 'UW'
//			}]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	}
//}, {
//	header : 'ABS',
//	dataIndex : 'absConstraint',
//	width : 50,
//	align : 'center',
//	editor : {
//		xtype : 'textfield',
//		maxLength : 2,
//		enforceMaxLength : true,
//		selectOnFocus : true,
//		vtype: 'alphanum',
//		listeners: {
//			change: function(field, newValue, oldValue){
//				if(newValue) field.setValue(newValue.toUpperCase());
//			}
//		}
//	}
//	editor : {
//		xtype : 'combo',
//		store: {
//			fields: [{
//				name: 'code', type: 'string'
//			}, {
//				name: 'name', type: 'string'
//			}],
//		    data: [{
//		    	code: 'AB', name: 'AB'
//		    }, {
//		    	code: 'AL', name: 'AL'
//		    }, {
//		    	code: 'HS', name: 'HS'
//		    }, {
//		    	code: 'IS', name: 'IS'
//		    }, {
//		    	code: 'BC', name: 'BC'
//		    }, {
//		    	code: 'NO', name: 'NO'
//		    }]
//		},
//		queryMode: 'local',
//		displayField: 'name',
//		valueField: 'code'
//	}
}, {
	header : 'FD',
	dataIndex : 'flipDirection',
	tooltip: 'Flip Direction',
	width : 50,
	align : 'center',
	filter: 'list',
	editor : {
		xtype : 'combo',
		store: {
			fields: [{
				name: 'code', type: 'string'
			}, {
				name: 'name', type: 'string'
			}],
		    data: [{
		    	code: 'A', name: 'A'
		    }, {
		    	code: 'F', name: 'F'
		    }]
		},
		queryMode: 'local',
		displayField: 'name',
		valueField: 'code'
	}
}, {
	header : 'Door',
	dataIndex : 'doorStatus',
	tooltip: 'Door Status',
	width : 50,
	align : 'center',
	editor : {
		xtype : 'combo',
		store: {
			fields: [{
				name: 'code', type: 'string'
			}, {
				name: 'name', type: 'string'
			}],
		    data: [{
		    	code: 'O', name: 'O'
		    }, {
		    	code: 'C', name: 'C'
		    }, {
		    	code: 'L', name: 'L'
		    }, {
		    	code: 'R', name: 'R'
		    }]
		},
		queryMode: 'local',
		displayField: 'name',
		valueField: 'code'
	}
}, {
	header : 'VoyNo',
	dataIndex : 'voyNo',
	width : 80,
	align : 'center',
	hidden : true,
	hideable: false
}, {
	header : 'S.Vsl',
	dataIndex : 'secondVslCd',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 4,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'S.Voy',
	dataIndex : 'secondVoyNo',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 12,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Book No',
	dataIndex : 'blNo',
	tooltip: 'Booking No',
	width : 100,
	align : 'left',
	filter: {
        type: 'string',
        itemDefaults: {
            emptyText: 'Search for...'
        }
    },
	editor : {
		xtype : 'textfield',
		maxLength : 16,
		enforceMaxLength : true,
		selectOnFocus : true,
		vtype: 'alphanum',
		listeners: {
			change: function(field, newValue, oldValue){
				if(newValue) field.setValue(newValue.toUpperCase());
			}
		}
	}
}, {
	header : 'Rmk',
	dataIndex : 'specialRmk',
	tooltip: 'Special Remark',
	width : 150,
	align : 'left',
	filter: 'list',
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		metaData.style =  'background: ' + '#F0F8FF' + ';'
		return value;
	}
}, {
	header : 'STS',
	dataIndex : 'gcNo',
	width : 50,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 2,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Seq',
	dataIndex : 'seqNo',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 4,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Y.Blk',
	dataIndex : 'yardBlock',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Y.Bay',
	dataIndex : 'yardBay',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Y.Row',
	dataIndex : 'yardRow',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 3,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Y.Tier',
	dataIndex : 'yardTier',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 1,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'DgCgTp',
	dataIndex : 'dgCgTp',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'textfield',
		maxLength : 1,
		enforceMaxLength : true,
		inputType : 'search',
		selectOnFocus : true
	},
	hidden : true,
	hideable: false
}, {
	header : 'Cust.Hold',
	dataIndex : 'customHold',
	width : 80,
	align : 'center',
	editor : {
		xtype : 'combo',
//			editable : false,	//if false, then drag change is possible
		store: {
			fields: [{
				name: 'code', type: 'string'
			}, {
				name: 'name', type: 'string'
			}],
		    data: [{
		    	code: 'C', name: 'C'
		    }]
		},
		queryMode: 'local',
		displayField: 'name',
		valueField: 'code'
	},
	hidden : true,
	hideable: false
}]	