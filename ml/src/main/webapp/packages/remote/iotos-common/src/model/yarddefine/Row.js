Ext.define('Iotos.model.yarddefine.Row', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.08.27
	 * 작 성 자  : 김용진
	 * Row
	 * **********************************/    
    
    fields: [
        {
            name: 'block',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'index', 
            type: 'int'
        },
        { 
            name: 'maxTier', 
            type: 'int' 
        },
        { 
            name: 'scDir',
            type: 'string'
        },
        { 
            name: 'maxBay',
            type: 'int'
        },
        { 
            name: 'isLocked',
            type: 'boolean'
        },
        { 
            name: 'CPOs',
            type: 'auto'
        }
    ]
});