// * 서버의 VO 객체와 같은 이름으로 지정 *
Ext.define('Iotos.store.LoginUserInfo', {
    extend: 'Ext.data.Store',

    model: 'ESVC.model.foundation.CredentialItem',

    pageSize: 20,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        // headers : {'Authorization': 'bearer ' + iWeb.OAUTH_ACCESS_TOKEN},
        url: fn_server_(iUrl.LOGINSTAFFINFO),
        reader: {
            rootProperty: 'response.dataItem'
        }
    }
});
