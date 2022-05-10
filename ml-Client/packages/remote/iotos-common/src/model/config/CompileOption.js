Ext.define('Iotos.model.config.CompileOption', {
	extend: 'ESVC.model.foundation.dataitem.DataItem',
    fields: [
        { name: 'isDisplayCurrentTimeForPlugOut', type:'boolean'},
        { name: 'confirmChkTempAsExpTemp', type: 'boolean'},
        { name: 'confirmAirvent', type: 'boolean'}
    ]
});