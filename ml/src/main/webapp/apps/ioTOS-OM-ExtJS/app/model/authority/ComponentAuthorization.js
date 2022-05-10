Ext.define('IoTosOmExt.model.authority.ComponentAuthorization', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',
    fields: [{
        name:'screenId',
        type:'string'
    },{
        name:'itemId',
        type:'string'
    },{
        name:'disabled',
        type:'boolean'
    },{
        name:'hidden',
        type:'boolean'
    }]
});