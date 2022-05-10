Ext.define('TSB.gux.vessel.VesselPrintRenderer', {
	 extend: 'TSB.gux.vessel.VesselRenderer',
	 
	requires: [
	],
	
    constructor: function (config) {
        this.callParent(arguments);
    },	    

    alias: 'widget.app-vesselprintrenderer',

    redraw: function () {
        var me = this,
            rect = me.getMainRect();
        
        if(!rect) {
            return;
        }
    	
        me.initializeMetaValue();
    	me.removeAll(true);
    	me.initializeDrawComponent();
    	
        //Main excluded pad-top, left, right, bottom
        var targetSurface = me.getSurface('main');
    	
    	//Draw View Rect
    	config =  {
    			meta: me.meta,       
    			x: 0,
    			y: 0,
    			renderMode: me.renderMode,
    			printOpts: me.printOpts
    	};
    	targetSurface.add(Ext.create('widget.app-vesselgeneraldraw', config));
    	
		//Arrange Bay Position
    	var index = 0;
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay, preHoldNo, holdNo;
    	var offsetHchX = 0, offsetHchY = 0;
    	var offsetHoldX = 0, offsetHoldY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    		holdNo = bay.holdNo;
    		
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    			
    			//Draw Hatch Info
    			config =  {
    					meta: me.meta,       
    					hatchNo: hatchNo,
    					viewMode: me.viewMode,
    					asc: me.storeAsc,
    					x: offsetHchX,
    					y: offsetHchY
    			};
    			targetSurface.add(Ext.create('widget.app-vesselhatchdraw', config));
    		}
    		
    		//Hold
    		if (preHoldNo !== holdNo && me.viewMode === 'vessel') {
    			preHoldNo = holdNo;
    			
    			offsetHoldX = me.getHoldX(hatchCount);
    			offsetHoldY = me.getHoldY(hatchCount);
    			
    			//Draw Hatch Info
    			config =  {
    					meta: me.meta,       
    					holdNo: holdNo,
    					x: offsetHoldX,
    					y: offsetHoldY
    			};
    			targetSurface.add(Ext.create('widget.app-vesselholddraw', config));
    		}
    		
    		bayCount++;
    		
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			if(me.viewMode === 'bay') {
				preBay = bay.index > 0 ? me.bays.getAt(bay.index - 1).data : null;
				postBay = bay.index < me.bays.length - 1 ? me.bays.getAt(bay.index + 1).data : null;
			}
			
			//Redraw All
			var config = {
					meta: me.meta,
					bay: bay,
					preBay: preBay,
					postBay: postBay,
					vsl: me.vsl,
					bayX: bayX,
					bayY: bayY,
					viewMode: me.viewMode,
					asc: me.storeAsc,
					serviceLane: me.storeSvc,
					slotMeta: me.storeSlotMeta,
					cellDisplayOption: me.cellDisplayOption || 'POD',									//POD, POL, POD2 - by user config
					maskType: me.maskType,	//Loadable Mark
					pol: me.pol,
					polVoyage: me.polVoyage,
					polTerminal: me.polTerminal,
					polBerth: me.polBerth,
					pod: me.pod,
					podTerminal: me.podTerminal,
					podBerth: me.podBerth
			};
			
			targetSurface.add(Ext.create('widget.app-vesselprintbaydraw', config));
		    
	    	preBay = bay;
    	}
    	
    	targetSurface.renderFrame();
    	
    	me.isCompleted = true;
    	
    	//To fire event after complete the redraw
    	//It is useful for the printing to get the image
    	me.fireEvent('redrawdone', me);
    	
//    	var elapsed = new Date().getTime() - start;
//    	console.log("Elapse Redraw(): " + elapsed);
    }
});