Ext.define('TSB.gux.warehouse.WarehouseRenderer', {
    /**
     * @memberOf TSB.gux.berth.BerthRenderer
     */
	extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite'
	],
	
    config: {
        innerRect: [0, 0, 1, 1],
        resizing: 0,
        isCompleted: false
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },	    

    alias: 'widget.app-warehouserenderer',
    
    scrollX: 0,
    scrollY: 0,

    performLayout: function () {
		if (this.resizing === 1) return;
		this.resizing = 1;

        this.callParent();
        var me = this,
            drawRect = me.getSurface('main').getRect(),
            width = drawRect[2],
            height = drawRect[3],
            insetPadding = me.getInsetPadding(),
            shrinkBox = Ext.apply({}, insetPadding),
            mainRect;

        if (width <= 0 || height <= 0) {
            return;
        }

        width -= shrinkBox.left + shrinkBox.right;
        height -= shrinkBox.top + shrinkBox.bottom;

        mainRect = [0,0,10,10];

        me.setMainRect(mainRect);
        me.getSurface().setRect(mainRect);
        
        me.redraw();
        this.resizing = 0; 
    },

    initializeMetaValue: function() {
    	var me = this;
    	
		//Define meta object
		me.meta = new Object();
		
		var array = me.storeMeta.getAt(me.storeMeta.findExact('key','baseUnit')).data.value.split(',');
		
		me.meta.baseUnit = parseFloat(array[0]);
		me.meta.baseHUnit = parseFloat(array[1]);
		me.meta.baseCellWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseCellWidth')).data.value);
		me.meta.baseCellHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseCellHeight')).data.value);

		me.meta.padLeft = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padLeft')).data.value);
		me.meta.padRight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padRight')).data.value);
		me.meta.padTop = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padTop')).data.value);
		me.meta.padBottom = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padBottom')).data.value);
		me.meta.marginWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginWidth')).data.value);
		me.meta.marginHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginHeight')).data.value);
		
		me.meta.fontType = me.storeMeta.getAt(me.storeMeta.findExact('key','fontType')).data.value;
		me.meta.fontColor = me.storeMeta.getAt(me.storeMeta.findExact('key','fontColor')).data.value;
		me.meta.lineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','lineColor')).data.value;
		me.meta.fontSize = me.meta.baseUnit * parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSize')).data.value);
		me.meta.unUsedBackColor = me.storeMeta.getAt(me.storeMeta.findExact('key','unUsedBlockBackColor')).data.value;;
		me.meta.unUsedForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','unUsedBlockForeColor')).data.value;;
		
		me.meta.cellWidth = me.meta.baseCellWidth * (me.warehouseInfo.data.wth / me.warehouseInfo.data.bayQty);
		me.meta.cellHeight = me.meta.baseCellHeight * (me.warehouseInfo.data.len / me.warehouseInfo.data.rowwQty);
		
		me.meta.warehouseWidth = me.meta.baseUnit * (me.meta.padLeft + me.meta.padRight + (me.meta.cellWidth * me.warehouseInfo.data.bayQty) + (me.meta.marginWidth * (me.warehouseInfo.data.bayQty)));
		me.meta.warehousedHeight = me.meta.baseHUnit * (me.meta.padTop + me.meta.padBottom + (me.meta.cellHeight * me.warehouseInfo.data.rowwQty) + (me.meta.marginHeight * (me.warehouseInfo.data.rowwQty)));

		me.meta.viewWidth = me.meta.warehouseWidth;
		me.meta.viewHeight = me.meta.warehousedHeight;
    },
    
    initializeDrawComponent: function() {
       	var me = this;
		me.resizing = 1;
		me.setSize(me.meta.viewWidth, me.meta.viewHeight);
		me.setMainRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);

		me.getSurface('background').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		me.getSurface('main').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		
		me.getSurface('plan').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		
		me.resizing = 0;

		//Create Planning Sprite
		var planSurface = me.getSurface('plan');
//		me.bodySprite = planSurface.add({
//			type: 'rect',
//	        strokeStyle: me.meta.unUsedBackColor,
//	        fillStyle: me.meta.unUsedBackColor,
//	        fillOpacity: 0.5,	//1: Solid
//	    	hidden: true,
//	    	customId: 'id-warehousecell-body'
//	    });
    },
    
    redraw: function () {
        var me = this,
            rect = me.getMainRect();
        
        if(!rect) {
            return;
        }
        
	    me.meta = me.storeMeat;
	    me.cell = me.storeCell;
	    me.bay = me.storeBay;
	    me.row = me.storeRow;
	    me.unused = me.storeUnused;
	    me.warehouseInfo = me.selectedItem
	    
        me.initializeMetaValue();
    	me.removeAll(true);
    	me.initializeDrawComponent();
    
		var warehouseSurface = me.getSurface('main');
		
		me.cell.each(function(record, idx){
			if(record.data.locId){
				config =  {
						meta: me.meta,       
						cell: me.cell,       
						bay: me.bay,       
						row: me.row,       
						unused: me.unused,       
						cellData: record,       
						warehouseInfo: me.selectedItem
				};
				warehouseSurface.add(Ext.create('widget.app-warehousestructuredraw', config));
			}
		});
		warehouseSurface.renderFrame();
		
		me.isCompleted = true;
    },
    
	getBaseYardUnit: function(size) {
		var me = this;
		var scrollbarOffset = 15;
		
		var baseWidthUnit = (size[0] - scrollbarOffset) / (me.meta.viewWidth);
		var baseHeightUnit = (size[1] - scrollbarOffset) / (me.meta.viewWidth);
		return [baseWidthUnit, baseHeightUnit];
	},
    
	getSelectedCellIndexes: function(x, y) {
		var me = this;
		var indexes = new Array();
		
		var width = me.meta.baseUnit * me.meta.cellWidth;
		var height = me.meta.baseHUnit * me.meta.cellHeight;
		var positionX=0, positionY=0;
		me.storeCell.each(function(record,idx){
			positionX = me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(record.data.bayIdx) - 1) * me.meta.cellWidth));
			positionX+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(record.data.bayIdx) -1)); 
			
			positionY = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(record.data.rowwIdx) - 1) * me.meta.cellHeight));
			positionY+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(record.data.rowwIdx) - 1));
			
			if(	x >= positionX && x <= (positionX + width) && 
				y >= positionY && y <= (positionY + height)) {
				indexes.push(record);
			}
		});
		
		return indexes;
	},
	

	getCellPos: function(rec) {
		var me = this;
		var x, y, w, h;
		
		var w = me.meta.baseUnit * me.meta.cellWidth;
		var h = me.meta.baseHUnit * me.meta.cellHeight;
		x = me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(rec.bayIdx) - 1) * me.meta.cellWidth));
		x+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(rec.bayIdx) -1)); 
		
		y = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(rec.rowwIdx) - 1) * me.meta.cellHeight));
		y+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(rec.rowwIdx) - 1));
		
		return [x, y, w, h];
	},	
	
	selectWarehouseCell: function(rec) {
		var me = this;
		var pos = me.getCellPos(rec.data);
		
		me.renderWarehousePlanSprites(pos, rec)
	},
	
	renderWarehousePlanSprites: function(planInfo, rec, opts, div) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var leftPos = me.meta.berthDirection === 'RTL' ? planInfo[1] : planInfo[0];
		var rightPos = me.meta.berthDirection === 'RTL' ? planInfo[0] : planInfo[1];
		var startPos = me.meta.berthDirection === 'RTL' ? rightPos : leftPos;
		
		console.log('left = ' + leftPos + ',right=' + rightPos+ ',startPos=' + startPos + ', Loc Id = ' + rec.data.locId);
		var flagPos = true, flagTime = true;

		var bExists = false;
		
		me.unused.each(function(record, idx){
			if(record.data.locId === rec.data.locId){
				me.unused.remove(record);
				bExists = true;
			}
		});
		
		
		if(!bExists){
			rec.set('locUseYn','N');
			me.unused.insert(0, rec);
		}
		
//		var items = planSurface.getItems();
//		for(var i = items.length - 1; i > -1; i--){
//			if(items[i].customId){
//	    		if (items[i].customId === rec.locId){
//	    			planSurface.remove(items[i]);
//	    			bExists = true;
//	    		    break;
//	    		}			
//			}
//		}		
//		
//		if(bExists === false){
//			me.bodySprite = planSurface.add({
//				type: 'rect',
//		        strokeStyle: me.meta.unUsedBackColor,
//		        fillStyle: me.meta.unUsedBackColor,
//		        fillOpacity: 0.5,	//1: Solid
//		    	x: planInfo[0],
//				y: planInfo[1],
//				width: planInfo[2],
//				height: planInfo[3],
//				hidden: false,	    	
//		    	customId: rec.locId
//		    });
//			
//			rec.unused = 'true';
//		}
//		
//		planSurface.renderFrame();
	},	
	
	

//	getSelectedLaneIndexes: function(x, y) {
//		var me = this;
//		var indexes = new Array();
//
//		if(x < (me.meta.verticalLineArea + me.meta.horizontalLineHeight) || y < me.meta.horizontalLineArea) {
//			return null;
//		}
//
//		me.lanes.each(function(record,idx){
//			if(		x >= parseInt(record.data.positionX) && 
//					x <= (parseInt(record.data.positionX) + (parseInt(record.data.wdth) * me.meta.baseWidth * me.meta.baseYardUnit)) && 
//					y >= parseInt(record.data.positionY) && 
//					y <= (parseInt(record.data.positionY) + (parseInt(record.data.len) * me.meta.baseHeight * me.meta.baseYardUnitH))) {				
//				indexes.push(record);
//			}
//		});
//		
//		return indexes;
//	},
//	
//    selectMultiLane:function(pos){
//		var me = this;
//		var planSurface = me.getSurface('plan');
//
//		me.bodySprite.setAttributes({
//			x: pos[0],
//			y: pos[1],
//			width: pos[2],
//			height: pos[3],
//			hidden: false
//		});
//		
//		planSurface.renderFrame();
//    },
//	
//	selectClickedLane: function(rec) {
//		var me = this;
//		me.renderBerthPlanSprites(rec)
//	},
//	
//	renderBerthPlanSprites: function(rec) {
//		var me = this;
//		var planSurface = me.getSurface('plan');
//
//		//TODO
//		me.bodySprite.setAttributes({
//			x: parseInt(rec.data.positionX),
//			y: parseInt(rec.data.positionY),
//			width: parseInt(rec.data.wdth) * me.meta.baseWidth,
//			height: parseInt(rec.data.len) * me.meta.baseHeight,
//			hidden: false
//		}); 
//		
//		planSurface.renderFrame();
//	},

	onScroll: function (x, y) {
		var me = this;
		me.scrollX = x;
		me.scrollY = y;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Mouse evnets
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	onMouseDown: function(e){
//		var me = this;
//		var planSurface = me.getSurface('plan');
//		
//		var xy = planSurface.getEventXY(e),
//		x = xy[0],
//		y = xy[1];
//
//        var selectedLaneIndexes = me.getSelectedLaneIndexes(x, y);
//        if(selectedLaneIndexes) {
//        	if(selectedLaneIndexes.length <= 0 && !me.tmpPlanSelectionSprite) {
//        		me.lastEventX = x;
//        		me.lastEventY = y;
//        		
//        		me.tmpPlanSelectionSprite = me.bodySprite;
//
//        		me.tmpPlanSelectionSprite.setAttributes({
//		            x:x,
//		            y:y,
//		            width:1,
//		            height:1,
//		            hidden: false
//        		}); 
//        		
//        		planSurface.renderFrame();
//        	}else{
//        		//Erase selected lanes(start)
//        		var indexes = new Array();
//        		me.lanes.each(function(record,idx){
//    				if(record.data.selected =='Y' && !Ext.Array.contains(indexes, record.data.bkCd)){
//    					indexes.push(record.data.bkCd);
//    				};
//        		});
//        		me.lanes.each(function(record,idx){
//        			record.set('selected', 'N');
//        		});        		
//        		
//        		var blockLaneSurface = me.getSurface('main');
//        		for(var s=0;s<blockLaneSurface.getItems().length;s++) {
//        			if(Ext.Array.contains(indexes, blockLaneSurface.getItems()[s].blockNo)){
//        				blockLaneSurface.renderSprite(blockLaneSurface.getItems()[s]);
//        			}
//        		};
//        		//Erase selected lanes(end)
//
//        		// select one lane
//        		selectedLaneIndexes[0].data.selected='Y';
//        		me.bodySprite.setAttributes({
//        			x: parseInt(selectedLaneIndexes[0].data.positionX),
//        			y: parseInt(selectedLaneIndexes[0].data.positionY),
//        			width: parseInt(selectedLaneIndexes[0].data.wdth) * me.meta.baseWidth *  me.meta.baseYardUnit,
//        			height: parseInt(selectedLaneIndexes[0].data.len) * me.meta.baseHeight *  me.meta.baseYardUnitH,
//        			hidden: false
//        		}); 
//        		planSurface.renderFrame();
//        	}
//        }		
//	},
//
//	onMouseMove: function(e) {
//		var me = this;
//		
//		if(me.tmpPlanSelectionSprite) {
//			var planSurface = me.getSurface('plan');
//			
//	        var xy = planSurface.getEventXY(e),
//	        x = xy[0],
//	        y = xy[1];
//	        
//    		me.tmpPlanSelectionSprite.setAttributes({
//    			x: me.lastEventX,
//    			y: me.lastEventY,
//    			width: x - me.lastEventX,
//    			height: y - me.lastEventY,
//	            hidden: false
//    		}); 
//
//    		planSurface.renderFrame();
//		}
//	},
//	
//	onMouseUp: function(e){
//		var me = this;
//		
//		if(me.tmpPlanSelectionSprite) {
//			var planSurface = me.getSurface('plan');
//    		me.bodySprite.setAttributes({
//    			hidden: true
//    		}); 
//    		me.tmpPlanSelectionSprite= null;
//    
//    		var xy = planSurface.getEventXY(e),
//	        x = xy[0],
//	        y = xy[1];
//
//			if (me.lastEventX < x) {
//	        	x1 = me.lastEventX;
//	        	x2 = x;
//	        } else {
//	        	x1 = x;
//	        	x2 = me.lastEventX;
//	        };
//	        
//	        if (me.lastEventY < y) {
//	        	y1 = me.lastEventY;
//	        	y2 = y;
//	        } else {
//	        	y1 = y
//	        	y2 = me.lastEventY;
//	        };
//
//    		//Checking Selected Lanes
//    		var indexes = new Array();
//    		me.lanes.each(function(record,idx){
//				if(record.data.selected =='Y' && !Ext.Array.contains(indexes, record.data.bkCd)){
//					indexes.push(record.data.bkCd);
//				};
//    		});
//    		
//    		me.lanes.each(function(record,idx){
//    			if(		x1 <= parseInt(record.data.positionX) && 
//    					x2 >= (parseInt(record.data.positionX) + (parseInt(record.data.wdth) * me.meta.baseWidth)) && 
//    					y1 <= parseInt(record.data.positionY) && 
//    					y2 >= (parseInt(record.data.positionY) + (parseInt(record.data.len) * me.meta.baseHeight))) {		
//    				
//    				record.set('selected', 'Y');
//    				if(!Ext.Array.contains(indexes, record.data.bkCd)){
//    					indexes.push(record.data.bkCd);
//    				};
//    			}else{
//    				record.set('selected', 'N');
//    			}
//    		});
//
//    		var blockLaneSurface = me.getSurface('main');
//    		for(var s=0;s<blockLaneSurface.getItems().length;s++) {
//    			if(Ext.Array.contains(indexes, blockLaneSurface.getItems()[s].blockNo)){
//    				blockLaneSurface.renderSprite(blockLaneSurface.getItems()[s]);
//    			}
//    		}
//    		me.onMouseLeave(e);
//		}
//	},
//	
//	onMouseLeave: function(e){
//		var me = this;
//		var surface = me.getSurface('plan');
//		
//		for(var i=0;i<surface.getItems().length;i++){
//			surface.getItems()[i].setAttributes({
//				hidden: true
//			});
//		};
//		surface.renderFrame();
//	},
//
//	getBerthingWidth: function(rec) {
//		var me = this;
//		var berthingWidth;
//		
//		if(rec.berthAlongside === 'S' || rec.berthAlongside === 'P') {	//Starboard or Portside
//			berthingWidth = parseFloat(rec.loa);
//		} else {	//Bow or Stern
//			var w = parseFloat(rec.width);
//			berthingWidth = w > 1 ? w : me.meta.defaultVesselWidth;	//Temp = 1. Need to be decided
//		}
//		
//		return berthingWidth;
//	},
//	
//	validatePlanning: function (div, rec) {
//		var me = this;
//		
//		if(div === 'id-berthplan-body') {
//			if(rec.atb) {
//				toastMessageTask.delay(200, null, me, ['berthplan_atb_exists_msg', null, 'warn', false]);
//				return false;
//			}
//		} else if(div === 'id-berthplan-resizeT') {
//			if(rec.atb) {
//				toastMessageTask.delay(200, null, me, ['berthplan_atb_exists_msg', null, 'warn', false]);
//				return false;
//			}
//		} else if(div === 'id-berthplan-resizeB') {
//			if(rec.atu) {
//				toastMessageTask.delay(200, null, me, ['berthplan_atu_exists_msg', null, 'warn', false]);
//				return false;
//			}
//		}
//		
//		return true;
//	},
//	getBaseYardUnit: function(width) {
//		var me = this;
//		var scrollbarOffset = 15;
//		var baseUnit = (width - (me.meta.verticalLineArea + me.meta.verticalNumberArea) - scrollbarOffset) / me.meta.yardWidth * me.meta.baseYardUnit;
//		//var baseHeightUnit =
//		
//		return baseUnit;
//	},
//
//
//	
//	setYardMovementDataSynchronization:function(indexs){
//		var me = this;
//		var blockLaneSurface = me.getSurface('main');
//		for(var i = 0; i < blockLaneSurface.getItems().length; i++) {
//			if(blockLaneSurface.getItems()[i].blockNo == indexs){
//				blockLaneSurface.renderSprite(blockLaneSurface.getItems()[i]);
//			}
//		}
//	},
//	
//	stockRedraw:function(searchCondition){
//		var me = this;
//		me.searchCondition = searchCondition;
//		var blockLaneSurface = me.getSurface('main');
//
//		for(var i = 0; i < blockLaneSurface.getItems().length; i++) {
//			blockLaneSurface.getItems()[i].searchCriteria = searchCondition;
//			blockLaneSurface.renderSprite(blockLaneSurface.getItems()[i]);
//		}
//	}
});
//
//var toastMessageTask = new Ext.util.DelayedTask(function() {
//	var me = this;
//	me.toastMessage(arguments[0], arguments[1], arguments[2], arguments[3]);
//});