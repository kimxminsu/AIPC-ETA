Ext.define('Iotos.model.yarddefine.Berth', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',
    
    /****************************
	 * 수정 일자 : 2020.08.27
	 * 작 성 자  : 김용진
	 *  Berth
	 * **********************************/

    fields: [
        { name: 'name'              , type: 'string' },
        { name: 'depth'             , type: 'auto' },
        { name: 'height'            , type: 'auto'},
        { name: 'length'            , type: 'auto' },
        { name: 'group'             , type: 'auto' },
        { name: 'berthId'           , type: 'auto' },
        { name: 'berthType'         , type: 'string' },
        /* BERTH TYPE DESCRIPTION */
        { name: 'displayBerthType'  , type: 'string' ,
            convert : function(value, record){
                return ESVC.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(CacheServiceConstants.BERTH_TYPE, record.get('berthType'));
            } 
        },
        { name: 'vesselType'        , type: 'string' },
        { name: 'yardId'            , type: 'string' },
        { name: 'staffCd'           , type: 'string' },
        { name: 'updateTime'        , type: 'date', dateFormat: 'time' },
        { name: 'endBerth'          , type: 'string' },
        { name: 'overhng'           , type: 'string' },
        { name: 'width'             , type: 'auto' },
        { name: 'overhngLeft'       , type: 'auto' },
        { name: 'overhngRight'      , type: 'auto' },
        { name: 'endberthLeft'      , type: 'auto' },
        { name: 'endberthRight'     , type: 'auto' },
        { name: 'y'                 , type: 'auto' },
        { name: 'deg'               , type: 'auto' },
        { name: 'x'                 , type: 'auto' },
        { name: 'SEdiBerth'         , type: 'string' },
        { name: 'alongside'         , type: 'string' },
        { name: 'maxLane'           , type: 'auto' }
    ]
});