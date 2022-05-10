/**
 * @author Maximiliano Fierro
 * @class TSB.locale.i18n.Bundle
 * @extends Ext.data.Store
 *
 * Bundle is used to load .properties bundle files based in language and expose the bundle's keys thru getMsg method.
 

        Ext.application({
            name: 'AppTest',
            requires: ['TSB.locale.i18n.Bundle'],

            bundle: {
                bundle: 'Application',
                lang: 'en-US',
                path: 'resources',
                noCache: true
            },

            launch: function(){
                Ext.create('Ext.panel.Panel',{
                    renderTo: Ext.getBody(),
                    tbar: Ext.create('Ext.toolbar.Toolbar',{
                        items: [{text: 'text'}]
                    }),
                    items:[{
                        height: 300,
                        html: this.bundle.getMsg('panel.html')
                    }],
                });
            }
        });

 */
Ext.define('TSB.locale.i18n.Bundle', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.app.Application',
        'TSB.locale.i18n.reader.Property',
        'TSB.locale.i18n.reader.Json'
    ],

    //@private
    defaultLanguage: '',

    autoLoad: false,
    //TODO: review this
    model : Ext.define('TSB.locale.i18n._modelBundle', {
                extend: 'Ext.data.Model',
                fields: ['key', 'value'],
                idProperty: 'key'
            }),
    /**
     * @cfg bundle {String} bundle name for properties file. Default to message
     */
    bundle: 'message',

    format : 'property',
    /**
     * @cfg path {String} URI to properties files. Default to resources
     */
    path: 'resources',
    
    /**
     * @cfg lang {String} Language in the form xx-YY where:
     *      xx: Language code (2 characters lowercase)
     *      YY: Country code (2 characters upercase).
     * Optional. Default to browser's language. If it cannot be determined default to en-US.
     */

    /**
     * @cfg noCache {boolean} whether or not to disable Proxy's cache. Optional. Defaults to true.
     */
	
     
    constructor: function(config){
        config = config || {};
        var me = this,
        	appLang = Ext.util.Cookies.get('applanguage'),
            localeLang = Locale.getLocale();
        if (appLang != null && appLang != 'null'){
        	localeLang = appLang || localeLang;
        }

        config.lang = localeLang;			
        //just set config value for explicit cause. 
        	//Actually, not used now anywhere, but the defaultLanguage (any configuration's properties) has get(set) method to using external.
        	//So, you might as well to set real value into the configuration. 
        me.defaultLanguage = localeLang;				
        
        //if config.lang is set, using config. but not set, using guessLanguage -> browser value of language
        var language = me.formatLanguageCode(config.lang || me.guessLanguage()),
            noCache = (config.noCache !== false),
            url, Model;
        
        //set language into cookie
        Ext.util.Cookies.set('applanguage', language);

        me.language = language;
        me.bundle = config.bundle || me.bundle;
        me.path = config.path || me.path;
        me.format = config.format || me.format;

        url = this.buildURL(language);

        delete config.lang;
        delete config.noCache;

        //console.log(localeLang);

        Ext.applyIf(config, {
            proxy:{
                type: 'ajax',
                url: url,
                noCache: noCache,
                reader: {
                    type: 'i18n.'+ me.format
                },
                //avoid sending limit, start & group params to server
                groupParam: '',
                limitParam: '',
                startParam: ''                
            }
        });

        me.callParent([config]);

        me.on('load', me.onBundleLoad, me);
        me.getProxy().on('exception', this.loadParent, this, {single: true});
    },

    /**
     * @private
     */
    guessLanguage: function(){
    	var navigatorLang = "";
    	
    	//check Chrome : navigator.languages/languages[]
    	//check MS or others : navigator.language/browserLanguage/userLanguage
    	if (navigator.languages && navigator.languages[0]){
    		navigatorLang = navigator.languages[0];
    	}
    	
        return (navigatorLang || navigator.language || navigator.browserLanguage || navigator.userLanguage);
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

        if(rec){
            decoded = Ext.util.Format.htmlDecode(rec.get('value'));

            if(values){
                args = [decoded].concat(values);
                decoded = Ext.String.format.apply(null, args);
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
        }

        
        return decoded;
    },

    /**
     * @private
     */
    onBundleLoad: function(store, records, success, op) {
        if(success){
            this.fireEvent('loaded');
        }
    },

    /**
     * @private
     */
    onProxyLoad: function(op){
        if(op.getRecords()){
            this.callParent(arguments);
        }
    },

    getResourceExtension: function(){
        return this.format === 'property' ? '.properties' : '.json';
    },

    /**
     * @private
     */
    buildURL: function(language){
        var url = '';
        if (this.path) url+= this.path + '/';
        url+=this.bundle;
        if (language) url+= '_'+language;
        url+=this.getResourceExtension();
        return url;
    },

    /**
     * @private
     */
    loadParent: function(){
        this.getProxy().url = this.buildURL();
        this.load();
    },

    /**
     * @private
     */
    formatLanguageCode: function(lang){
        var langCodes = lang.split('-'),
            primary, second;
        primary = (langCodes[0]) ? langCodes[0].toLowerCase() : '';
        second = (langCodes[1]) ? langCodes[1].toUpperCase() : '';

        return langCodes.length > 1 ? [primary, second].join('-') : primary;
    },

	/**
	* @public
	* @method getLanguage returns the current language
	* @return {String}
	*/
	getLanguage: function(){
	           return this.language;
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
                me.bundle = Ext.create('TSB.locale.i18n.Bundle', Ext.apply({
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
