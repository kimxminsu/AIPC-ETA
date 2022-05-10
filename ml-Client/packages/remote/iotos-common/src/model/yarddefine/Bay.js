Ext.define('Iotos.model.yarddefine.Bay', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.08.27
	 * 작 성 자  : 김용진
	 *  Berth
	 * **********************************/    
    
    fields: [
        {
            name: 'block',
            type: 'string'
        },
        {
            name: 'name2',
            type: 'string'
        },
        {
            name: 'name4', 
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
            name: 'accessDir',
            type: 'string'
        },
        { 
            name: 'nosVoid',
            type: 'int'
        },
        { 
            name: 'maxRow',
            type: 'int'
        },
        { 
            name: 'isLocked',
            type: 'boolean'
        },
        { 
            name: 'ex20Chk',
            type: 'string'
        },
        { 
            name: 'ex40Chk',
            type: 'string'
        },
        { 
            name: 'ex45Chk',
            type: 'string'
        },
        { 
            name: 'cPOs',
            type: 'auto'
        }
    ]
});