Ext.define("TSB.data.writer.Json", {
  override: "Ext.data.writer.Json",

  // config: {
  //   allDataOptions: {
  //     persist: true,
  //     associated: true,
  //   },
  //   partialDataOptions: {
  //     changes: true,
  //     critical: true,
  //     associated: true,
  //   },
  // },

  constructor: function (config) {
    var me = this;
    me.setDateFormat("time");
    me.setRootProperty("data");
    me.setWriteAllFields(true);
    // me.setAllDataOptions({
    //   persist: true,
    //   associated: true,
    // });
    // me.setPartialDataOptions({
    //   changes: true,
    //   critical: true,
    //   associated: true,
    // });
    //    	me.setTransform(function(data, request){
    //			var me = this;
    //			var jsonData = data;
    //			var vrequest = request;
    //	    	var d = new Date();
    //	    	var n = d.getTimezoneOffset() / 60;
    //console.debug('Origin data to return : ', data);

    //	    	Ext.Array.each(request.getRecords(), function(rec){
    //	    		//console.log(rec.data);
    //	    		strnsformrec = rec;
    //	    		Ext.Array.each(rec.getFields(), function(f) {
    //	    			if(f.type === "date") {
    //	    	        	//To UTC "-", To GMT "+"
    //	    				//console.log(f.addHours(n));
    //	    				//console.log('Change GMT to UTC of [Column Name: ' + f.name + '], The Origin date time is changed from ', Ext.Date.format(strnsformrec.get(f.name), 'Y-m-d H:i:s'), ' to ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'Y-m-d H:i:s'));
    //	    				//console.log('But the data should be applied [data] object using [time] dateFormat only. the value of time is ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time'));
    //	    				if(jsonData[f.name] !== null) {
    //	    					jsonData[f.name] = Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time');
    //	    				}
    //	    			} else
    //	    			if (f.type == 'boolean' || f.type == 'bool') {	// added by Alex.Min(2015.04.29)
    //	    				if(jsonData[f.name] != undefined) {
    //	    					if (jsonData[f.name] == true) {
    //	    						jsonData[f.name] = 'Y';
    //							} else {
    //								jsonData[f.name] = 'N';
    //							}
    //	    				}
    //	    			}
    //	    			//If need to adjust for another value of data
    //	    			//console.debug(f);
    //	    		});
    //	    	});
    //	    	Ext.Array.each(request.getRecords(), function(rec){
    //	    		//console.log(rec.data);
    //	    		strnsformrec = rec;
    //	    		Ext.Array.each(rec.getFields(), function(f) {
    //	    			if(f.type === "date") {
    //	    	        	//To UTC "-", To GMT "+"
    //	    				//console.log(f.addHours(n));
    //	    				//console.log('Change GMT to UTC of [Column Name: ' + f.name + '], The Origin date time is changed from ', Ext.Date.format(strnsformrec.get(f.name), 'Y-m-d H:i:s'), ' to ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'Y-m-d H:i:s'));
    //	    				//console.log('But the data should be applied [data] object using [time] dateFormat only. the value of time is ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time'));
    //	    				if(jsonData[f.name] !== null) {
    //	    					jsonData[f.name] = Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time');
    //	    				}
    //	    			} else
    //	    		if (f.type == 'boolean' || f.type == 'bool') {	// added by Alex.Min(2015.04.29)
    //	    				if(jsonData[f.name] != undefined) {
    //	    					if (jsonData[f.name] == true) {
    //	    						jsonData[f.name] = 'Y';
    //							} else {
    //								jsonData[f.name] = 'N';
    //							}
    //	    				}
    //	    			}
    //	    			//If need to adjust for another value of data
    //	    			//console.debug(f);
    //	    		});
    //	    	});
    //	    	//console.debug("Adjusted data to return : ", data);
    //	        return data;
    //        });
    //
    //        me.initConfig(config);
    me.callParent(arguments);
  },
});

//to test directly into store-proxy-writer{...}
//        	dateFormat: 'time',
//        	transform: {
//	    	    fn: function(data, request) {
//	    			//me = this;
//	    			jsonData = data;
//	    			vrequest = request;
//	    	    	var d = new Date();
//	    	    	var n = d.getTimezoneOffset();
//	    	    	console.debug('Origin data to return : ', data);
//
//	    	    	Ext.Array.each(request.getRecords(), function(rec){
//	    	    		console.log(rec.data);
//	    	    		strnsformrec = rec;
//	    	    		Ext.Array.each(rec.getFields(), function(f) {
//	    	    			if(f.type === "date") {
//	    	    	        	//To UTC "-", To GMT "+"
//	    	    				//console.log(f.addHours(n));
//	    	    				console.log('Change GMT to UTC of [Column Name: ' + f.name + '], The Origin date time is changed from ', Ext.Date.format(strnsformrec.get(f.name), 'Y-m-d H:i:s'), ' to ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'Y-m-d H:i:s'));
//	    	    				console.log('But the data should be applied [data] object using [time] dateFormat only. the value of time is ', Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time'));
//	    	    				jsonData[f.name] = Ext.Date.format(Ext.Date.add(strnsformrec.get(f.name), Ext.Date.HOUR ,n), 'time');
//	    	    			}
//	    	    			//If need to adjust for another value of data
//	    	    			//console.debug(f);
//	    	    		});
//	    	    	});
//	    	    	console.debug("Adjusted data to return : ", data);
//	    	        return data;
//	    	    }//,
//	    	   // scope: this
//
//	    	}
//this.initConfig(config);
