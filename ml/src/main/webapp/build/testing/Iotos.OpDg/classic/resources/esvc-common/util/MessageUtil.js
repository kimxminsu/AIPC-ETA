/**
 * Message Utility
 */
var MessageUtil = function(){}

// Show Locale Message as alert window
MessageUtil.alert=function(localMsgType, localeMsg, params){
	var msgType = TSB.locale.i18n.Bundle.instance.getMsg(localMsgType);
	
	if(msgType == null ||
	   msgType.indexOf('undefined') > 0 ){
		msgType = localMsgType;
	}
	
	var msg = TSB.locale.i18n.Bundle.instance.getMsg(localeMsg, params);
	
	if(msg == null ||
	   msg.indexOf('undefined') > 0 ){
		msg = localeMsg;
	}
	
	Ext.Msg.alert(msgType, msg);
}

// Msg Message
MessageUtil.show=function(icon, localeTitle, localeMsg, params, callBack){
	var title = TSB.locale.i18n.Bundle.instance.getMsg(localeTitle);
	
	if(title == null ||
	   title.indexOf('undefined') > 0 ){
		title = localeTitle;
	}
	
	var msg = TSB.locale.i18n.Bundle.instance.getMsg(localeMsg, params);
	
	if(msg == null ||
	   msg.indexOf('undefined') > 0 ){
		msg = localeMsg;
	}
	
	var buttons = Ext.Msg.OK;
	
	if(icon == Ext.Msg.QUESTION){
		buttons = Ext.Msg.OKCANCEL;
	} else if (icon == Ext.Msg.OK){
		icon = Ext.Msg.INFO;
		buttons = Ext.Msg.OK;
	}
	
	Ext.Msg.show({
	    title: title,
	    msg: msg,
	    buttons: buttons,
	    icon: icon,
	    fn: function(button) {
			if(callBack){
				callBack(button);
			}
		}
	}).setAlwaysOnTop(true);
}

// Toast Message
MessageUtil.showToast=function(icon, localeTitle, localeMsg, params, callBack){
	var title = TSB.locale.i18n.Bundle.instance.getMsg(localeTitle);
	
	if(title == null ||
	   title.indexOf('undefined') > 0 ){
		title = localeTitle;
	}
	
	var msg = TSB.locale.i18n.Bundle.instance.getMsg(localeMsg, params);
	
	if(msg == null ||
	   msg.indexOf('undefined') > 0 ){
		msg = localeMsg;
	}
	
	Ext.toast({
		html: msg,
		title: title,
		iconCls: icon,
		closable: true,
		align: 't',
		slideInDuration: 300,
		minWidth: 400,
	});
}

// Warning Message
MessageUtil.warning=function(localeTitle, localeMsg, params){
	MessageUtil.show(Ext.Msg.WARNING, localeTitle, localeMsg, params);
}

// Error Message
MessageUtil.error=function(localeTitle, localeMsg, params){
	MessageUtil.show(Ext.Msg.ERROR, localeTitle, localeMsg, params);
}

// Info Message
MessageUtil.info=function(localeTitle, localeMsg, params){
	MessageUtil.show(Ext.Msg.INFO, localeTitle, localeMsg, params);
}

// Question Message
MessageUtil.question=function(localeTitle, localeMsg, params, callBack){
	MessageUtil.show(Ext.Msg.QUESTION, localeTitle, localeMsg, params, callBack);
}

//Confirmation Message
MessageUtil.confirmation=function(localeTitle, localeMsg, params, callBack){
	MessageUtil.show(Ext.Msg.OK, localeTitle, localeMsg, params, callBack);
}

// Info Toast Message
MessageUtil.infoToast=function(localeTitle, localeMsg, params){
	MessageUtil.showToast('x-fa fa-exclamation-circle', localeTitle, localeMsg, params);
}

// Warning Toast Message
MessageUtil.warningToast=function(localeTitle, localeMsg, params, callBack){
	MessageUtil.showToast('x-fa fa-exclamation-triangle', localeTitle, localeMsg, params, callBack);
}

// Show Save Success MessageBox
MessageUtil.saveSuccess=function(){
	MessageUtil.info('success_msg', 'savesuccess_msg');
}

//Show No Match MessageBox
MessageUtil.noMatchData=function(){
	MessageUtil.info('Information', 'no_match_data_msg');
}

// VesselSchedule Required
MessageUtil.vslRequied=function(){
	MessageUtil.info('Information', WebMessageConstants.VSL_SCHEDULE_REQUIREDFILED);
}


// Show Dupilcation fail MessageBox
MessageUtil.duplicationFail=function(){
	MessageUtil.error('fail_msg', 'dulicatesytemcd_msg');
}

// Show Mandatory Field invalid MessageBox
MessageUtil.mandatoryFieldInValid=function(){
	MessageUtil.warning('Warning', 'mandatoryForm_msg');
}

// Blocking Progressbar
MessageUtil.showBlockingProgressbar=function(){
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

MessageUtil.hideBlockingProgressbar=function(){
	Ext.MessageBox.hide();
}