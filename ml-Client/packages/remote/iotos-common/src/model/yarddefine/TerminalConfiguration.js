Ext.define('Iotos.model.yarddefine.TerminalConfiguration', {
    extend: 'ESVC.model.foundation.dataitem.DataItem',

    /****************************
	 * 수정 일자 : 2020.09.09
	 * 작 성 자  : 김용진
	 * **********************************/

    fields: [
        { name: 'tmnlCd', type: 'string'},
        { name: 'expireLogin', type: 'int'},
        { name: 'expireTerm', type: 'int'},
        { name: 'expireRetry', type: 'int'}
        ]
});