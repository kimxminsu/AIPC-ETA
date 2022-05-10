Ext.define('Iotos.locale.i18n.Bundle', {
    extend: 'TSB.locale.i18n.Bundle',
    requires: [
        'Ext.app.Application',
        'TSB.locale.i18n.reader.Property',
        'TSB.locale.i18n.reader.Json'
    ],

    constructor: function(config){
        var me = this;
        let vocabularyResourcePath = "/packages/remote/iotos-common/resources/locale";
        let messageResourcePath = "/packages/remote/iotos-common/resources/locale";

        var configBg ={
            lang: config.lang,
            noCache: config.noCache
        }
        me.callParent([config]);

        if(location.port !== "1841"){
            vocabularyResourcePath = '/extjs/'+ CONSTANTS.PGM_CODE + '/classic/resources/iotos-common/locale';
            messageResourcePath = '/extjs/'+ CONSTANTS.PGM_CODE + '/classic/resources/iotos-common/locale';
        }
        config = {
            bundle: 'VocabularyResource',
            // path: '/packages/remote/iotos-common/resources/locale',
            path: vocabularyResourcePath,
            lang: configBg.lang,
            noCache: configBg.noCache
        }
        me.vocabularyBundle = Ext.create('TSB.locale.i18n.Bundle', Ext.apply({
            autoLoad: true,
            listeners:{
                load: me.onBundleLoad
            }
        }, config));

        config = {
            bundle: 'MessageResource',
            path: messageResourcePath,
            lang: configBg.lang,
            noCache: configBg.noCache
         }
        me.messageBundle = Ext.create('TSB.locale.i18n.Bundle', Ext.apply({
            autoLoad: true,
            listeners:{
                load: me.onBundleLoad
            }
        }, config));
    },

    
    onBundleLoad: function(store, records, success, op) {
        if(success
            && TSB.locale.i18n.Bundle.instance
            && TSB.locale.i18n.Bundle.instance.vocabularyBundle && TSB.locale.i18n.Bundle.instance.vocabularyBundle.isLoaded()
            && TSB.locale.i18n.Bundle.instance.messageBundle && TSB.locale.i18n.Bundle.instance.messageBundle.isLoaded())
        {
            TSB.locale.i18n.Bundle.instance.fireEvent('loaded');
        }
    },
    
    /**
     * @method: getMsg
     * Returns the content associated with the bundle key or {bundle key}.undefined if it is not specified.
     * @param: key {String} Bundle key.
     * @param: values {Mixed...} if the bundle key contains any placeholder then you can add any number of values
     * that will be replaced in the placeholder token.
     * @return: {String} The bundle key content.
     */
    getMsg: function(key /*values...*/){
        var values = [].splice.call(arguments, 1),
            rec = this.getById(key),
            decoded = key + '.undefined',
            args;
        
        if(values != null &&
           (values.length == 1) && 
           (values[0] instanceof Array)){
        	values = values[0];
        }
        
        if(rec){
            decoded = Ext.util.Format.htmlDecode(rec.get('value'));

            if(values){
                args = [decoded].concat(values);
                decoded = Ext.String.format.apply(null, args);
            }
        }
        else{
            rec = this.vocabularyBundle.getById(key);
            if(rec){
                decoded = Ext.util.Format.htmlDecode(rec.get('value'));
                if(values){
                    args = [decoded].concat(values);
                    decoded = Ext.String.format.apply(null, args);
                }
            }
            else{
                rec = this.messageBundle.getById(key);
                if(rec){
                    decoded = Ext.util.Format.htmlDecode(rec.get('value'));
                    if(values){
                        args = [decoded].concat(values);
                        decoded = Ext.String.format.apply(null, args);
                    }
                }
            }
        }

        return decoded;
    },

    getMsgbyValue: function(key,  placeholders){
        var values = [].splice.call(placeholders, 0),
            rec = this.getById(key),
            decoded = key + '.undefined',
            args;

        if(rec){
            decoded = Ext.util.Format.htmlDecode(rec.get('value'));

            if(values){
                args = [decoded].concat(values);
                decoded = Ext.String.format.apply(null, args);
            }
        }else{
            rec = this.vocabularyBundle.getById(key);
            if(rec){
                decoded = Ext.util.Format.htmlDecode(rec.get('value'));
                if(values){
                    args = [decoded].concat(values);
                    decoded = Ext.String.format.apply(null, args);
                }
            }
            else{
                rec = this.messageBundle.getById(key);
                if(rec){
                    decoded = Ext.util.Format.htmlDecode(rec.get('value'));
                    if(values){
                        args = [decoded].concat(values);
                        decoded = Ext.String.format.apply(null, args);
                    }
                }
            }
        }
        
        return decoded;
    },

    	/**
	* @public
	* @method setLanguage
	* @param lang {String} in the format:
	*  xx-YY where:
	*      xx: Language code (2 characters lowercase) 
	*      YY: Country code (2 characters upercase). 
	*/    
	setLanguage: function(lang){
        var me = this, proxy = this.getProxy(), currentDate = new Date(), isPermitted = false;
        
        if (me.previousLoadDate) {
            if (Ext.Date.getElapsed(currentDate, me.previousLoadDate) > 500) {
                isPermitted = true;
            }
        } else {
            isPermitted = true;
        }
        
        if (isPermitted) {
            me.language = lang;
            proxy.setUrl(me.buildURL(me.language));
            proxy.on('exception', me.loadParent, me, {single: true});
            me.load();
            me.previousLoadDate = currentDate;
            
            if(me.messageBundle) me.messageBundle.setLanguage(lang);
            if(me.vocabularyBundle) me.vocabularyBundle.setLanguage(lang);
        }
	}

}, function(){

    //hook on Ext.Base
    Ext.override(Ext.Base, {
        initConfig: function(instanceConfig) {
            var me = this,
                cfg = me.self.getConfigurator(),
                k;

            me.initConfig = Ext.emptyFn; // ignore subsequent calls to initConfig
            me.initialConfig = instanceConfig || {};

            for(k in instanceConfig){
                if(instanceConfig.hasOwnProperty(k) && instanceConfig[k] && typeof instanceConfig[k] === 'object' && instanceConfig[k].type && instanceConfig[k].type === 'bundle'){
                    if(!instanceConfig[k].placeholders){
                    	instanceConfig[k] = TSB.locale.i18n.Bundle.instance.getMsg(instanceConfig[k].key);
                    } else {
                    	instanceConfig[k] = TSB.locale.i18n.Bundle.instance.getMsgbyValue(instanceConfig[k].key, instanceConfig[k].placeholders);
                    }
                }
            }

            cfg.configure(me, instanceConfig);

            return me;
        }
    });

    //initialize bundle before app launch
    Ext.override(Ext.app.Application, {
        onBeforeLaunch: function() {
            var me = this,
                overridden = this.onBeforeLaunch.$previous,
                ns;
            if(me.bundle){
                //configure the bundle instance and defer launch until bundle launch
                me.bundle = Ext.create('Iotos.locale.i18n.Bundle', Ext.apply({
                    autoLoad: true,
                    listeners: {
                        loaded: function(){
                            overridden.apply(me);
                        }
                    }
                }, me.bundle));
                TSB.locale.i18n.Bundle.instance = me.bundle;
            }else{
                me.callOverridden();
            }
        }
    });
});
