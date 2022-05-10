Ext.define('Iotos.model.yarddefine.YSlotUsage', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.08.27
	 * 작 성 자  : 김용진
	 * YSlotUsage
	 * **********************************/    
    
    fields: [
        {
            name: 'block',
            type: 'string'
        },
        {
            name: 'bay',
            type: 'int'
        },
        {
            name: 'row', 
            type: 'int'
        },
        { 
            name: 'tier', 
            type: 'int' 
        },
        { 
            name: 'cpo',
            type: 'int'
        },
        { 
            name: 'dgChk',
            type: 'string'
        },
        { 
            name: 'rfChk',
            type: 'string'
        },
        { 
            name: 'akChk',
            type: 'string'
        },
        { 
            name: 'niuRsn',
            type: 'string'
        },
        { 
            name: 'cntrHeight86',
            type: 'string'
        },
        { 
            name: 'cntrHeight96',
            type: 'string'
        }
    ]
});