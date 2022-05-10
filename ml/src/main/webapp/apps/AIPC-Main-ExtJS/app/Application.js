/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Aipc.Main.Application', {
  extend: 'Ext.app.Application',
  
  name: 'Aipc.Main',

  requires: [
  'Iotos.locale.i18n.Bundle',
  'Aipc.Main.config.Locale',
  'ESVC.config.Token',
  'Ext.direct.RemotingProvider',
  'Ext.direct.PollingProvider'
],

uses : [
      'Ext.window.Toast'
],

stores: [],

controllers: ['Aipc.Main.controller.Main'],
views: [
  'Aipc.Main.view.exception.Message'
],

   //global function
bundle: {
  bundle: 'Application',
  lang: 'defaultLanguage',
  path: 'resources/locale',
  noCache: true
},

  //add
  init:function(){
  console.log('Application init');
  // ESVC.config.Token.setStaffCd("module");
  // ESVC.config.Token.setUserId("user")
},
  launch: function () {
  console.log('##### Application.launch');
  me = this;
  // Check whether the browser supports LocalStorage
  // It's important to note that this type of application could use
  // any type of storage, i.e., Cookies, LocalStorage, etc.
  var supportsLocalStorage = Ext.supports.LocalStorage;

  if (!supportsLocalStorage) {

    // Alert the user if the browser does not support localStorage
    Ext.Msg.alert('Your Browser Does Not Support Local Storage');
    return;
  }
  
  // This is for capturing event for all client-server communication
  Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
    
    if((Aipc.Main.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false) ||
      Aipc.Main.getApplication().forcedBlocking === true){
      var title = TSB.locale.i18n.Bundle.instance.getMsg('progressing_title');
      var msg = TSB.locale.i18n.Bundle.instance.getMsg('progressing_msg');
      Ext.MessageBox.show({
        title : title, 
        msg: msg,
        width:320,
        height:0,
        wait:true,
        waitConfig: {interval:200, text:''}
         });
    }
    
    conn.cors = true;
    conn.withCredentials = true;
    conn.useDefaultXhrHeader = false;
    conn.setDefaultXhrHeader({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'
    });
    
    if(CONSTANTS.AUTH_TYPE === CONSTANTS.AUTH_TYPE_LOCAL) {
      conn.setDefaultHeaders({
        'Authorization': ESVC.config.Token.getTokenType() + ' ' + ESVC.config.Token.getAccessToken()
      });
    }
  });
  
  // This is for capturing event for all client-server communication
  Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
    if((Aipc.Main.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false) &&
      Aipc.Main.getApplication().forcedBlocking === false){
      Ext.MessageBox.hide();
    }
  });
  
  // This is for capturing Exception for all client-server communication
  Ext.Ajax.on('requestexception', function(conn, response, options) {
    if(Aipc.Main.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false){
      Ext.MessageBox.hide();
    }
    
    if (response.status === 401 || response.status === 403 
        || response.status === 400 || response.status === 404
        || response.status === 406 || response.status === 409
        || response.status === 422) {
      
      if(response.status === 401) {
        Ext.toast({
                      html: ViewUtil.getLabel("no_authorized_timeout"),
                      closable: false,
                      align: 't',
                      slideInDuration: 300,
                      minWidth: 400
        });
        setTimeout(function(){
                      window.open(Locale.getRestHome(), "_self");
        }, 1000);
      } else {
        var res = Ext.decode(response.responseText, true);
        if(res) {
          Ext.toast({
            html: res.error.code + '<br>' + res.error.exceptionMessage,
            closable: false,
            align: 't',
            slideInDuration: 300,
            minWidth: 400
          });
        } else {
          if(response.request.proxy != null && response.request.proxy.messageEnable == null
            && response.request.proxy.messageEnable != false){
            Ext.toast({
              html: response.statusText + '<br>' + response.responseText,
              closable: false,
              align: 't',
              slideInDuration: 300,
              minWidth: 400
            });
          }
        }
      }
    } else if (response.status === 500) {
      var res = Ext.decode(response.responseText, true);
      if(res) {
        var exceptionCode = res.error.code;
        var message = res.error.errorMessage;
        var errorId = res.error.errorId;
        var stackTrace = res.error.stackTrace == null ? '' : res.error.stackTrace;
        
        // KHH.2019.06.04
        if(message == undefined){
          if(res.error.errorId){
            var parameters = null;
            
            if(res.error.parameters){
              parameters = res.error.parameters;
            }
            
            var bundleMessage = TSB.locale.i18n.Bundle.instance.getMsg(res.error.errorId, parameters);
            
            if(bundleMessage.indexOf('undefined') > 0){
              message = 'Error Code : ' + res.error.code;
            } else {
              message = bundleMessage;
            }
          }
        }
        
        if(exceptionCode === 500) {
          Ext.widget('app-message', {
            status : exceptionCode,
            statusText : errorId,
            message : message,
            stackTrace : stackTrace
          });
        } else if(exceptionCode === 600) {
          if(response.request.proxy != null && response.request.proxy.messageEnable == null
              && response.request.proxy.messageEnable != false){
            MessageUtil.error('fail_msg', message);
          }
        } else {
          Ext.toast({
            html: exceptionCode + ': ' + message,
            closable: false,
            align: 't',
            slideInDuration: 300,
            minWidth: 400
          });	
        }
    } else {
        Ext.toast({
          html: response.statusText + '<br>' + response.responseText,
          closable: false,
          align: 't',
          slideInDuration: 300,
          minWidth: 400
        });	
      }
    } else if(response.status === 0) {
      //Server is not available
      var errorMessage;
      if(response.statusText) {
        //Connection Timeout
        errorMessage = response.statusText;
        if(response.timedout) {
          errorMessage += ' : Time Out';
        }
      } else {
        //Server is not available
        errorMessage = 'Internet Connection Error: communication failure : ERR_CONNECTION_REFUSED';
      }
      
      Ext.toast({
        html: errorMessage,
        closable: false,
        align: 't',
        slideInDuration: 300,
        minWidth: 400
      });
      
    } else if(response.status === -1) {
      Ext.toast({
        html: response.statusText,
        closable: false,
        align: 't',
        slideInDuration: 300,
        minWidth: 400
      });	
      
    } else {
      //Unknown Exception
      Ext.toast({
        html: '500: There is internal server error. Please try again later or contact Administrator',
        closable: false,
        align: 't',
        slideInDuration: 300,
        minWidth: 400
      });
    }

  });
  
  
  //For Ext.direct
  Ext.REMOTING_API.url = Aipc.Main.config.Locale.getDirectApiDestUrl() + '/router';
  Ext.direct.Manager.addProvider(Ext.REMOTING_API);
  
  Ext.POLLING_MESSAGE_API.url = Aipc.Main.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/getMessage/event1';
  Ext.direct.Manager.addProvider(Ext.POLLING_MESSAGE_API);
  Ext.direct.Manager.getProvider('messagePollProvider').disconnect();
  
  Ext.POLLING_SHARING_API.url = Aipc.Main.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/shareMessage/event2';
  Ext.direct.Manager.addProvider(Ext.POLLING_SHARING_API);
  Ext.direct.Manager.getProvider('sharingPollProvider').disconnect();
  
  Ext.POLLING_OSPIF_API.url = Aipc.Main.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/getOspInterfaceMessage/event3';
  Ext.direct.Manager.addProvider(Ext.POLLING_OSPIF_API);
  Ext.direct.Manager.getProvider('ospInterfacePollProvider').disconnect();
  
  Ext.direct.Manager.on('exception', function(e) { 
    Ext.toast({
      html: 'Internet disconnection happened. Please try again later or contact Administrator',
      closable: false,
      align: 't',
      slideInDuration: 300,
      minWidth: 400
    });
  });
  },

  onAppUpdate: function () {
    window.location.reload(true);
}
});
