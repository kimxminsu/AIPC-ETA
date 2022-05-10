Ext.define('ESVC.model.common.VesselScheduleItem', {
	extend : 'ESVC.model.foundation.dataitem.DataItem',
	fields : [
		{
			name : 'vesselName',
			type : 'string'
		},
		{
			name : 'vesselCode',
			type : 'string'
		},
		{
			name : 'callYear',
			type : 'string'
		},
		{
			name : 'callSeq',
			type : 'string'
		},
		{
			name : 'userVoyage',
			type : 'string'
		},
		{
			name : 'prevUserVoyage',
			type : 'string'
		},
		{
			name : 'inLane',
			type : 'string'
		},
		{
			name : 'prevInLane',
			type : 'string'
		},
		{
			name : 'outLane',
			type : 'string'
		},
		{
			name : 'prevOutLane',
			type : 'string'
		},
		{
			name : 'inVoyage',
			type : 'string'
		},
		{
			name : 'outVoyage',
			type : 'string'
		},
		{
			name : 'eta',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'etb',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'prevEtb',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'etw',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'etc',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'etd',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'prevEtd',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'ata',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'atb',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'atw',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'atc',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'atd',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'atr',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'yardOpen',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'yardClose',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'outCyIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'outCyCut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'inCyIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'inCyCut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'pilotOn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'pilotOff',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'anchorIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'anchorOut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'firstGateIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'lastGateIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'firstGateOut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'lastGateOut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'actualOutCyIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'actualOutCyCut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'actualInCyIn',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'actualInCyCut',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'docClose',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'customClose',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'longTermEta',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'etr',
			type : 'date',
			dateFormat : 'time'
		},
		{
			name : 'feederCheck',
			type : 'string'
		},
		{
			name : 'inboundEdiLocked',
			type : 'string'
		},
		{
			name : 'outboundEdiLocked',
			type : 'string'
		},
		{
			name : 'isClosingTimeOver',
			type : 'string'
		},
		{
			name : 'readyToMakePortLog',
			type : 'string'
		},
		{
			name : 'operator',
			type : 'string'
		},
		{
			name : 'owner',
			type : 'string'
		},
		{
			name : 'status',
			type : 'string'
		},
		{
			name : 'bargeCheck',
			type : 'string'
		},
		{
			name : 'domesticCheck',
			type : 'string'
		},
		{
			name : 'berthNo',
			type : 'string'
		},
		{
			name : 'alongSide',
			type : 'string'
		},
		{
			name : 'movinsEdiLocked',
			type : 'string'
		},
		{
			name : 'canceled',
			type : 'string'
		},
		{
			name : 'vesselCallID',
			type : 'string'
		},
		{
			name : 'stringETD',
			type : 'string'
		},
		{
			name : 'stringETB',
			type : 'string'
		},
		{
			name : 'allianceType',
			type : 'string'
		},
		{
			name : 'igNo',
			type : 'string'
		},
		{
			name : 'priorityCehck',
			type : 'string'
		},
		{
			name : 'requestedBy',
			type : 'string'
		},
		{
			name : 'remarks',
			type : 'string'
		},
		{
			name : 'vesselType',
			type : 'string'
		},
		{
			name : 'bowPosition',
			type : 'string'
		},
		{
			name : 'tableName',
			type : 'string'
		},
		{
			name : 'startCallSeq',
			type : 'string'
		},
		{
			name : 'callSeqRule',
			type : 'string'
		},
		{
			name : 'topTier',
			type : 'int'
        },
        {
            name : 'displayVVD',
            type : 'string',
        },
        {
            name : 'displaylongTermEta',
            type : 'string',
        },
        {
            name : 'displayeta',
            type : 'string',
        },
        {
            name : 'displayetb',
            type : 'string',
        },
        {
            name : 'displayetd',
            type : 'string',
        },
        {
            name : 'displayata',
            type : 'string',
        },
        {
            name : 'displayatb',
            type : 'string',
        },
        {
            name : 'displayatd',
            type : 'string',
        },
        {
            name : 'displayatw',
            type : 'string',
        },
        {
            name : 'displayatc',
            type : 'string',
        },
        {
            name : 'displayatr',
            type : 'string',
        },
        {
            name : 'displaydocClose',
            type : 'string',
        },
        {
            name : 'displayYardOpen',
            type : 'string',
        },
        {
            name : 'displayYardClose',
            type : 'string',
        }

	]
});