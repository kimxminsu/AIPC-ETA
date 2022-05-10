Ext.define('Iotos.model.yarddefine.Block', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.08.25
	 * 작 성 자  : 김용진
	 *  Block
	 * **********************************/

    fields: [
        { name: 'name', type: 'string' },
        { name: 'index', type: 'int' },
        { name: 'maxBay', type: 'int' },
        { name: 'maxRow', type: 'int' },
        { name: 'maxTier', type: 'int' },
        { name: 'passTier', type: 'int' },
        { name: 'facility', type: 'string' },
        {
            name: 'displayFacility', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.CODEMASTER_BLOCK_TYPE, record.get('facility'));
            }
        },
        { name: 'use1', type: 'string' },
        { name: 'use2', type: 'string' },
        { name: 'ytPos', type: 'string' },
        { name: 'ytEnter', type: 'string' },
        { name: 'ytAccDir', type: 'string' },
        { name: 'rtAccDir', type: 'string' },
        { name: 'rtPos', type: 'string' },
        { name: 'rtEnter', type: 'string' },
        { name: 'bayDir', type: 'string' },
        {
            name: 'displayBayDir', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.CODEMASTER_BLOCK_DIRECTION, record.get('bayDir'));
            }
        },
        { name: 'rowDir', type: 'string' },
        {
            name: 'displayRowDir', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.CODEMASTER_BLOCK_DIRECTION, record.get('rowDir'));
            }
        },
        { name: 'wdChk', type: 'string' },
        {
            name: 'displayWdChk', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.CODEMASTER_GROUNDING_TYPE, record.get('wdChk'));
            }
        },
        { name: 'icChk', type: 'string' },
        {
            name: 'displayIcChk', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.CODEMASTER_INTERCHANGE_TYPE, record.get('icChk'));
            }
        },
        { name: 'cDir', type: 'string' },
        { name: 'autoCheck', type: 'string' },
        {
            name: 'displayAutoCheck', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.YES_NO, record.get('autoCheck'));
            }
        },
        { name: 'laneId', type: 'string' },
        { name: 'laneSeq', type: 'int' },
        { name: 'x', type: 'float' },
        { name: 'y', type: 'float' },
        { name: 'w', type: 'float' },
        { name: 'l', type: 'float' },
        { name: 'deg', type: 'float' },
        { name: 'rfplug', type: 'string' },
        { name: 'symmetry', type: 'string' },
        { name: 'capacity', type: 'string' },
        { name: 'tgs', type: 'string' },
        { name: 'sqm', type: 'string' },
        { name: 'yardId', type: 'string' },
        { name: 'foreColor', type: 'string' },
        { name: 'backColor', type: 'string' },
        { name: 'sideLift', type: 'string' },
        {
            name: 'displaySideLeft', type: 'string',
            convert: function (value, record) {
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.YES_NO, record.get('sideLift'));
            }
        },
        { name: 'carrierType', type: 'string' },
        { name: 'bayPtn', type: 'string' },
        { name: 'rowPtn', type: 'string' },
        { name: 'bayGap', type: 'float' },
        { name: 'rowGap', type: 'float' },
        { name: 'blockTierPriSourceList', type: 'auto' },   // List<BlockTierPriItem>
        { name: 'blockUseSourceList', type: 'auto' },   // List<BlockUseItem>
        { name: 'carrierTypeSourceList', type: 'auto' },   // List<CarrierDirItem>
        { name: 'bufferSourceList', type: 'auto' },   // List<BufferItem>
        { name: 'bayList', type: 'auto' }, // List<BayItem>
        { name: 'rowList', type: 'auto' }, // List<RowItem>
        { name: 'yslotList', type: 'auto' }, // HashMap<String, YSlotItem>
        { name: 'yslotUsageList', type: 'auto' }, // List<YSlotUsageItem>
        { name: 'yardLocks', type: 'auto' },
        { name: 'slotLength', type: 'float' },
        { name: 'slotWidth', type: 'float' },
        { name: 'maxWeight20', type: 'int' }, //long Type
        { name: 'maxWeight40', type: 'int' }, //long Type
        { name: 'maxWeight45', type: 'int' }, //long Type
        { name: 'maxWeightTier', type: 'int' },
        { name: 'masterBlock', type: 'string' },
        { name: 'joinPos', type: 'string' },
        { name: 'laneIdx', type: 'int' }
    ]
});