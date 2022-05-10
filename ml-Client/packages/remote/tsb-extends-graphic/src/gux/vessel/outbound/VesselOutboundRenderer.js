Ext.define('TSB.gux.vessel.VesselOutRenderer', {
    /**
     * @memberOf TSB.gux.vessel.VesselRenderer
     */
	extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite',
		'TSB.gux.vessel.PlanSpriteComposite'
	],
	
    config: {
        viewMode: 'bay',
		bayList: null,
		bays : null,
        innerRect: [0, 0, 1, 1],
        resizing: 0,
        isCompleted: false,
		baySeq : [],
		ioType: null,
		planSize: 20,
		sequence: 0
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },	    

    alias: 'widget.app-vesseloutrenderer',

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
    	
		me.vsl = me.storeVslStruc.data.getAt(0).data
		me.bays = me.storeVslStruc.data.getAt(0).bays(0).data
		
		//Hatch Define
		me.hatchList = new Array();
		var pos = 1;
		for(var i=0;i<me.bayList.length;i++){
			if(me.hatchList.length === 0) {
				me.hatchList.push(me.bayList[i]);
			} else {
				if(me.bays.getAt(me.hatchList[i-pos]).data.hatchNo!== me.bays.getAt(me.bayList[i]).data.hatchNo){
					me.hatchList.push(me.bayList[i]);
				} else {
					pos++;
				}
			}
		}
		
		//Define meta object
		me.meta = new Object();
		
		//Actual Value
		me.meta.generalContainerHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','generalContainerHeight')).data.value);
		me.meta.highCubeContainerHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','highCubeContainerHeight')).data.value);
		
		//Base Unit
		me.meta.baseVesselUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseVesselUnit')).data.value);
		me.meta.baseHoldUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHoldUnit')).data.value);
		me.meta.baseHatchUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHatchUnit')).data.value);
		me.meta.baseBayUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBayUnit')).data.value);
		me.meta.baseVesselUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseVesselUnitOrign')).data.value);
		me.meta.baseHoldUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHoldUnitOrign')).data.value);
		me.meta.baseHatchUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHatchUnitOrign')).data.value);
		me.meta.baseBayUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBayUnitOrign')).data.value);
		
		//var baseUnit, fontSizeOffset;
		if(me.viewMode === 'vessel') {
			me.meta.baseUnit = me.meta.baseVesselUnit;
			me.meta.baseUnitOrign = me.meta.baseVesselUnitOrign;
			me.meta.fontSizeOffset = 0;
		} else if(me.viewMode === 'hold') {
			me.meta.baseUnit = me.meta.baseHoldUnit;
			me.meta.baseUnitOrign = me.meta.baseHoldUnitOrigin;
			me.meta.fontSizeOffset = 2;
		} else if(me.viewMode === 'hatch') {
			me.meta.baseUnit = me.meta.baseHatchUnit;
			me.meta.baseUnitOrign = me.meta.baseHatchUnitOrign;
			me.meta.fontSizeOffset = 4;
		} else if(me.viewMode === 'bay') {
			me.meta.baseUnit = me.meta.baseBayUnit;
			me.meta.baseUnitOrign = me.meta.baseBayUnitOrign;
			me.meta.fontSizeOffset = 6;
		}
		
		//View Mode
		me.meta.bayDirection = 'RTL'; //Bay Direction - Default
		me.meta.bayDirection = me.storeMeta.getAt(me.storeMeta.findExact('key','bayDirection')).data.value;
		me.meta.tierNoPlace = me.storeMeta.getAt(me.storeMeta.findExact('key','tierNoPlace')).data.value;
		me.meta.visibilityScale = me.storeMeta.getAt(me.storeMeta.findExact('key','visibilityScale')).data.value;
		//TODO: Bay Alignment in Hatch
		me.meta.baysInHatchAlign = me.storeMeta.getAt(me.storeMeta.findExact('key','baysInHatchAlign')).data.value;		//h: horizontal, v: vertical, z: zig zag
		me.meta.baysInHatchAlign4TwoBayMode = me.storeMeta.getAt(me.storeMeta.findExact('key','baysInHatchAlign4TwoBayMode')).data.value;		//F: 20/40 in Fore Bay, A: 20/40 in Aft Bay
		me.meta.baysInHatch = me.storeMeta.getAt(me.storeMeta.findExact('key','baysInHatch')).data.value;
		me.meta.baysInHatchOfVessel = me.storeMeta.getAt(me.storeMeta.findExact('key','baysInHatchOfVessel')).data.value;
		me.meta.sizeMark = me.storeMeta.getAt(me.storeMeta.findExact('key','sizeMark')).data.value;
		me.meta.structureView = me.storeMeta.getAt(me.storeMeta.findExact('key','structureView')).data.value;
		me.meta.highCubicViewMode = me.storeMeta.getAt(me.storeMeta.findExact('key','highCubicViewMode')).data.value;
		me.meta.viewStackWeight = 'N';//me.storeMeta.getAt(me.storeMeta.findExact('key','viewStackWeight')).data.value;
		me.meta.viewVisibility = me.storeMeta.getAt(me.storeMeta.findExact('key','viewVisibility')).data.value;
		me.meta.viewHatchCoverClearance = me.storeMeta.getAt(me.storeMeta.findExact('key','viewHatchCoverClearance')).data.value;
		me.meta.viewMode4HatchCoverClearance = me.storeMeta.getAt(me.storeMeta.findExact('key','viewMode4HatchCoverClearance')).data.value;
		me.meta.viewCellGuideClearance = me.storeMeta.getAt(me.storeMeta.findExact('key','viewCellGuideClearance')).data.value;
		me.meta.viewTerminalLimit = me.storeMeta.getAt(me.storeMeta.findExact('key','viewTerminalLimit')).data.value;
		me.meta.viewLashingResult = me.storeMeta.getAt(me.storeMeta.findExact('key','viewLashingResult')).data.value;
		me.meta.viewCargoHoldLine = me.storeMeta.getAt(me.storeMeta.findExact('key','viewCargoHoldLine')).data.value;
		me.meta.viewRowTierNo = me.storeMeta.getAt(me.storeMeta.findExact('key','viewRowTierNo')).data.value;
		
		//Width Values
		if (/hatch|bay/.test(me.viewMode)) {
			me.meta.baseWidth = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','baseWidthHatchBay')).data.value);
		} else {
			me.meta.baseWidth = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','baseWidthVesselHold')).data.value);
		}
		me.meta.tierNoAreaWidth = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','tierNoAreaWidth')).data.value);
		me.meta.padleft = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','pad-left')).data.value);
		me.meta.padright = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','pad-right')).data.value);
		
		//Height Values
		me.meta.baseHeight = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHeight')).data.value);
		me.meta.hatchCoverAreaHeight = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','hatchCoverAreaHeight')).data.value);
		me.meta.hatchCoverHeight = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','hatchCoverHeight')).data.value);
		me.meta.bayNoAreaHeight = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','bayNoAreaHeight')).data.value);
		me.meta.stackWeightAreaHeight = me.meta.viewStackWeight === 'Y' ? parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','stackWeightAreaHeight')).data.value) : 0;
		me.meta.visibilityAreaHeight = me.meta.viewVisibility === 'Y' ? parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','visibilityAreaHeight')).data.value) : 0;
		me.meta.deckLashingAreaHeight = me.meta.viewLashingResult === 'Y' ? parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','deckLashingAreaHeight')).data.value) : 0;
		me.meta.cellGuideClearanceAreaHeight = me.viewMode !== 'vessel' && me.meta.viewCellGuideClearance === 'Y' ? parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','cellGuideClearanceAreaHeight')).data.value) : 0;
		me.meta.rowNoAreaHeight = me.meta.viewRowTierNo === 'N' ? 0 : parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','rowNoAreaHeight')).data.value);
		me.meta.deckGapAreaHeight = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','deckGapAreaHeight')).data.value);
		me.meta.padtop = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','pad-top')).data.value);
		me.meta.padbottom = parseInt(me.storeMeta.getAt(me.storeMeta.findExact('key','pad-bottom')).data.value);
		
		//Calculated Bay Width, Height
		var tierNoWidth = me.meta.viewRowTierNo === 'N' ? 0 : me.meta.tierNoPlace === 'B' ? me.meta.tierNoAreaWidth * 2 : me.meta.tierNoAreaWidth;
		me.meta.bayWidth = parseInt(me.meta.baseUnit * (me.meta.baseWidth * (me.vsl.maxRowEndIndex - me.vsl.maxRowStartIndex + 1) + tierNoWidth + me.meta.padleft + me.meta.padright));
		me.meta.bayHeight = parseInt(me.meta.baseUnit * (me.meta.baseHeight * (me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1) + me.meta.hatchCoverAreaHeight + me.meta.bayNoAreaHeight + me.meta.stackWeightAreaHeight * 2 + me.meta.rowNoAreaHeight * 2 + me.meta.cellGuideClearanceAreaHeight + me.meta.deckGapAreaHeight + me.meta.deckLashingAreaHeight + me.meta.visibilityAreaHeight + me.meta.padtop + me.meta.padbottom));
		me.meta.bayWidthInset = parseInt(me.meta.bayWidth - me.meta.baseUnit * (me.meta.padleft + me.meta.padright));
		me.meta.bayHeightInset = parseInt(me.meta.bayHeight - me.meta.baseUnit * (me.meta.padtop + me.meta.padbottom));
		me.meta.cellWidth = parseInt(me.meta.baseUnit * me.meta.baseWidth);
		me.meta.cellHeight = parseInt(me.meta.baseUnit * me.meta.baseHeight);
		
		//Colors
		me.meta.cellGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','cellGuideColor')).data.value;
		me.meta.bayGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','bayGuideColor')).data.value;
		me.meta.hatchGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','hatchGuideColor')).data.value;
		me.meta.hatchCoverColor = me.storeMeta.getAt(me.storeMeta.findExact('key','hatchCoverColor')).data.value;
		me.meta.hatchCoverClearanceColor = me.storeMeta.getAt(me.storeMeta.findExact('key','hatchCoverClearanceColor')).data.value;
		me.meta.generalFontColor = me.storeMeta.getAt(me.storeMeta.findExact('key','generalFontColor')).data.value;
		me.meta.planRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','planRectStrokeColor')).data.value;
		me.meta.selectedRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','selectedRectStrokeColor')).data.value;
		me.meta.selectedRectFillColor = me.storeMeta.getAt(me.storeMeta.findExact('key','selectedRectFillColor')).data.value;
		me.meta.segmentRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','segmentRectStrokeColor')).data.value;
		me.meta.messageEmptyColor = me.storeMeta.getAt(me.storeMeta.findExact('key','messageEmptyColor')).data.value;
		me.meta.messageColor = me.storeMeta.getAt(me.storeMeta.findExact('key','messageColor')).data.value;
		me.meta.terminalLimitColorPOL = me.storeMeta.getAt(me.storeMeta.findExact('key','terminalLimitColorPOL')).data.value;
		me.meta.terminalLimitColorPOD = me.storeMeta.getAt(me.storeMeta.findExact('key','terminalLimitColorPOD')).data.value;
		
		//FontSize
		me.meta.fontSizeHold = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeHold')).data.value);
		me.meta.fontSizeBayNo = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeBayNo')).data.value);
		me.meta.fontSizeRowTier = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeRowTier')).data.value);
		me.meta.fontSizeStackWeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeStackWeight')).data.value);
		me.meta.fontSizeHatchCoverClearance = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeHatchCoverClearance')).data.value);
		me.meta.fontType = me.storeMeta.getAt(me.storeMeta.findExact('key','fontType')).data.value
		me.meta.fontSizeCell = 10;
		me.meta.hatchQClength = 8 * (me.meta.baseVesselUnit / me.meta.baseVesselUnitOrign);
		me.meta.hatchQCMargin = 10.5 * (me.meta.baseVesselUnit / me.meta.baseVesselUnitOrign);
		//FontSize - Cell
		//Calculates width of char - Ext.draw.TextMeasurer.measureText('A', '10px Courier')
			//if it should change the font, fontSizeCell should be changed by the process of below sampling.
		//result of width sampling for Courier
			//width of a char vs fontsize  -- result of cellWidth for  4char's / '7char's
			//4 : 6px, 7px		-- 16/28	**//but not applicable for google/firefox, It should change browser minimum font size.
			//5 : 9px, 8px		-- 20/35	**//but not applicable for google/firefox, It should change browser minimum font size.
			//6 : 10px			-- 24/42
			//7 : 11px, 12px	-- 28/49
			//8 : 13px, 14px	-- 32/56
			// cell width for 4char's is for vessel/hold.
			// others for hatch / bay
		if(/vessel/.test(me.viewMode)) {
			me.meta.fontSizeCell = 10;
			me.meta.fontSizeCell = me.meta.fontSizeCell * (me.meta.baseVesselUnit / me.meta.baseVesselUnitOrign);

		} else if(/hold/.test(me.viewMode)) {
			me.meta.fontSizeCell = 8;
			me.meta.fontSizeCell = me.meta.fontSizeCell * (me.meta.baseHoldUnit / me.meta.baseHoldUnitOrign);

		} else if(/hatch/.test(me.viewMode)) {
			me.meta.fontSizeCell = 6;
			me.meta.fontSizeCell = me.meta.fontSizeCell * (me.meta.baseHatchUnit / me.meta.baseHatchUnitOrign);

		} else if(/bay/.test(me.viewMode)) {
			me.meta.fontSizeCell = 8.5;
			me.meta.fontSizeCell = me.meta.fontSizeCell * (me.meta.baseBayUnit / me.meta.baseBayUnitOrign);			
		}
		
//		if(/vessel|hold/.test(me.viewMode)) {
//			if (me.meta.cellWidth < 24) {
//				me.meta.fontSizeCell = 8;
//		//	} else if (me.meta.cellWidth >= 20 && me.meta.cellWidth < 24) {
//		//		me.fontSizeCell = 8;
//			} else if (me.meta.cellWidth >= 24 && me.meta.cellWidth < 28) {
//				me.meta.fontSizeCell = 10;
//			} else if (me.meta.cellWidth >= 28) {
//				me.meta.fontSizeCell = 12;
//			}
//			
//		} else if(/hatch/.test(me.viewMode)) {
//			if (me.meta.cellWidth < 30) {
//				me.meta.fontSizeCell = 6;
//			} else if (me.meta.cellWidth >= 30 && me.meta.cellWidth < 40) {
//				me.meta.fontSizeCell = 8;
//			} else if (me.meta.cellWidth >= 40 && me.meta.cellWidth < 49) {
//				me.meta.fontSizeCell = 10;
//			} else if (me.meta.cellWidth >= 49) {
//				me.meta.fontSizeCell = 12;
//			}
//		
//		} else if(/bay/.test(me.viewMode)) {
//			if (me.meta.cellWidth < 35) {
//				me.meta.fontSizeCell = 8;
//			} else if (me.meta.cellWidth >= 35 && me.meta.cellWidth < 40) {
//				me.fontSizeCell = 8;
//			} else if (me.meta.cellWidth >= 40 && me.meta.cellWidth < 49) {
//				me.meta.fontSizeCell = 10;
//			} else if (me.meta.cellWidth >= 49) {
//				me.meta.fontSizeCell = 12;
//			}			
//		}		
			
		//For split upper and lower hatches for general plan view (vessel)
		me.upperNoHatches = parseInt(me.vsl.noHatches/2) + parseInt(me.vsl.noHatches)%2;
		me.lowerNoHatches = me.vsl.noHatches - me.upperNoHatches;
		
		if(me.viewMode === 'bay') {
			me.meta.hatchWidth = me.meta.bayWidth;
			me.meta.hatchHeight = me.meta.bayHeight;
		} else if(me.viewMode === 'vessel') {
			me.meta.hatchWidth = me.meta.baysInHatchOfVessel === '3' ? me.meta.bayWidth * 2 : me.meta.bayWidth;
			me.meta.hatchHeight = me.meta.bayHeight * 2;
		} else {
			me.meta.hatchWidth = me.meta.baysInHatch === '3' ? me.meta.bayWidth * 2 : me.meta.bayWidth;
			me.meta.hatchHeight = me.meta.bayHeight * 2;
		}
		
		//For caclulating the total view size
		if(me.viewMode === 'bay') {
			me.meta.viewWidth = me.meta.bayWidth;
			me.meta.viewHeight = me.meta.bayHeight;
		}else if(me.viewMode === 'hatch') {
			me.meta.viewWidth = me.meta.hatchWidth;
			me.meta.viewHeight = me.meta.hatchHeight;
		}else if(me.viewMode === 'hold') {
			me.meta.viewWidth = me.meta.hatchWidth * me.hatchList.length;
			me.meta.viewHeight = me.meta.hatchHeight;
		}else {			
			me.meta.viewWidth = me.meta.hatchWidth * me.upperNoHatches;
			me.meta.viewHeight = me.meta.hatchHeight * 2;
		}
		
		//ToDo: Print Draw
//		if(me.renderMode === 'print') {
//			var offsetRateX = me.printOpts.width / me.meta.viewWidth;
//			var offsetRateY = me.printOpts.height / (me.meta.viewHeight - 200);	//200 is Title area 
//			
//			me.initializeMetaValue4Print(offsetRateX, offsetRateY);
//		}
    },
    
    initializeDrawComponent: function() {
    	var me = this;
		//Set View Size
		me.resizing = 1;
		//ToDo: verify it is necessary or not (setLocalXY)
		//me.setLocalXY(0, 0);
		
		var width = Math.round(me.meta.viewWidth);
		var height = Math.round(me.meta.viewHeight);
		
		me.setSize(width,height);
		me.setMainRect([0,0,width,height]);
		me.getSurface('background').setRect([0,0,width,height]);
		me.getSurface('main').setRect([0,0,width,height]);
		me.getSurface('plan').setRect([0,0,width,height]);
		me.getSurface('mask').setRect([0,0,width,height]);
		me.getSurface('blink').setRect([0,0,width,height]);		//BLINKING
		
		me.resizing = 0;
		
		var planSurface = me.getSurface('plan');
		me.outcellselectionSprite = planSurface.add({
			type: 'planspritecomposite',
			meta: me.meta,
			cellPosX: 0,
			cellPosY: 0,
			cellWidth: 0,
			cellHeight: 0,
			hidden: true,
			customId: 'id-outcellselection' 		//should be set to recognize each other protractor
		});	
		
		me.planSelectionSprite = planSurface.add({
			type: 'planspritecomposite',
			meta: me.meta,	
			cellPosX: 0,
			cellPosY: 0,
			cellWidth: 0,
			cellHeight: 0,
			hidden: true,
			direction: '',
			customId: 'id-planSelection' 		//should be set to recognize each other protractor
		});	
		
		me.segmentSelectionSprite = planSurface.add({
			type: 'planspritecomposite',
			meta: me.meta,	
			cellPosX: 0,
			cellPosY: 0,
			cellWidth: 0,
			cellHeight: 0,
			hidden: true,
			customId: 'id-segmentSelection' 		//should be set to recognize each other protractor
		});	

    },
    
    redraw: function (record, change) {
        var me = this,
            rect = me.getMainRect();
        if(!rect) {
            return;
		}

//        var start = new Date().getTime();
        //Check partial drawing
        var partialIndex = -1;
        if(!record) {
        	if (!change || change === 'meta') {
        		me.initializeMetaValue();
        	}
        	
        	me.removeAll(true);
        	me.initializeDrawComponent();
        	
            //Port List Array for checking Overstow
        	me.portList = new Array();
        	if(me.storeSvc.data.length > 0) {
        		var isAddable = false;
    			for(var i=0;i<me.storeSvc.data.getAt(0).port(0).data.length;i++){
    				if(me.storeSvc.data.getAt(0).port(0).data.getAt(i).data.portCode === me.pol
    						&& me.storeSvc.data.getAt(0).port(0).data.getAt(i).data.userVoyage === me.polVoyage) {
    					
    					isAddable = true;
    				}
					
    				if(isAddable) {
    					me.portList.push(me.storeSvc.data.getAt(0).port(0).data.getAt(i).data.portCode);
    				}
    			}
        	}
        } else {
	        for(var i=0;i<me.bayList.length;i++){
	        	for(var j=0;j<me.bays.getAt(me.bayList[i]).data.bayListInHatch.length;j++) {
					//Inbound
	        		if(record.data.lbay) {
	        			if(me.bays.getAt(me.bays.getAt(me.bayList[i]).data.bayListInHatch[j]).data.name === record.data.lbay) {
	        				partialIndex = me.bayList[i];
	        				break;
						} 
					//Outbound
	        		} else if(record.data.lbay) {
	        			if(me.bays.getAt(me.bays.getAt(me.bayList[i]).data.bayListInHatch[j]).data.name === record.data.lbay) {
	        				partialIndex = me.bayList[i];
	        				break;
	        			}
					}
					
					// else if(record.data.hatchIndex) { //Bay View 내 QCview 드로잉
					// 	if(me.bays.getAt(me.bays.getAt(me.bayList[i]).data.bayListInHatch[j]).data.hatchNo === record.data.hatchIndex) {
	        		// 		partialIndex = me.bayList[i];
	        		// 		break;
					// 	}
						
					// }else {
	        		// 	if(me.bays.getAt(me.bays.getAt(me.bayList[i]).data.bayListInHatch[j]).data.name === record.getPrevious('lbay')) {
	        		// 		partialIndex = me.bayList[i];
	        		// 		break;
	        		// 	}
	        		// }
	        	}	        	
	        }
        }
        
        //Main excluded pad-top, left, right, bottom
        var targetSurface = me.getSurface('main');
    	
    	if(!record) {
	        //Draw View Rect
			config =  {
			    meta: me.meta,       
				x: 0,
				y: 0,
				renderMode: me.renderMode,
				printOpts: me.printOpts
			};
			targetSurface.add(Ext.create('widget.app-vesseloutgeneraldraw', config));
		}
    	
		//Arrange Bay Position
    	var index = 0;
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay, preHoldNo, holdNo;
    	var offsetHchX = 0, offsetHchY = 0;
		var offsetHoldX = 0, offsetHoldY = 0;
		
		var assignmentStore = IoTosSpExt.getApplication().qcSchedule;
		var vslStore = IoTosSpExt.getApplication().caspVslStructure;
		var hatchs = vslStore.data.getAt(0).hatchs(0).data;
		
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
			
				var bayX = me.getBayX(offsetHchX, bay.name);
				var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
				var x = bayX + me.meta.baseUnit * me.meta.padright;
				var y = me.getRowValueY(bay, bayY, 'HoldStackWeight') + me.meta.baseUnit;

    			if(!record) {
    				//Draw Hatch Info
					config =  {
					    meta: me.meta,       
						hatchNo: hatchNo,
						x: offsetHchX,
						y: offsetHchY,
						equX: x,
						equY: y,
						customId: 'hatchdraw',
						ioType: CodeConstants.PlanType.LOAD
					};
					//plan ioType
					//deckHold
					targetSurface.add(Ext.create('widget.app-vesselouthatchdraw', config));
					

					//qcIcon
					var hatch = hatchs.getAt(hatchNo - 1).data;
					//Draw Hatch Info
					config =  {
						meta: me.meta,     
						hatch: hatch,
						hatchNo: hatchNo,
						viewMode: me.viewMode,
						x: offsetHchX,
						y: offsetHchY,
						selectedQCs: me.selectedQCs,
						equX: x,
						equY: y,
						customId: 'qcdraw'
					};
					//plan ioType
					//deckHold
					targetSurface.add(Ext.create('widget.app-vesseloutqcdraw', config));
					
			    } else if(partialIndex > -1 && me.bays.getAt(partialIndex).data.hatchNo === hatchNo){
			    	//Partial Draw
					var hatchItem;
			    	for(var s=0;s<targetSurface.getItems().length;s++) {
			    		if(targetSurface.getItems()[s].hatchNo && targetSurface.getItems()[s].hatchNo === hatchNo && targetSurface.getItems()[s].customId == 'hatchdraw') {
			    			hatchItem = targetSurface.getItems()[s]
			    			break;
			    		}
			    	}
			    	
			    	if(hatchItem){
			    		targetSurface.renderSprite(hatchItem);
					}
					
					var hatchQCItem;
					for(var s=0;s<targetSurface.getItems().length;s++) {
			    		if(targetSurface.getItems()[s].hatchNo && targetSurface.getItems()[s].hatchNo === hatchNo && targetSurface.getItems()[s].customId == 'qcdraw') {
							hatchQCItem = targetSurface.getItems()[s];
							
							hatchQCItem.selectedQCs = me.selectedQCs;
			    			break;
			    		}
			    	}
			    	
			    	if(hatchQCItem){
			    		targetSurface.renderSprite(hatchQCItem);
					}

				}
			}
			
    		//Hold
    		if (preHoldNo !== holdNo && me.viewMode === 'vessel') {
    			preHoldNo = holdNo;
    			
    			offsetHoldX = me.getHoldX(hatchCount);
    			offsetHoldY = me.getHoldY(hatchCount);
    			
    			if(!record) {
    				//Draw Hatch Info
					config =  {
					    meta: me.meta,       
						holdNo: holdNo,
						x: offsetHoldX,
						y: offsetHoldY
					};
					targetSurface.add(Ext.create('widget.app-vesseloutholddraw', config));
					
			    } else if(partialIndex > -1 && me.bays.getAt(partialIndex).data.holdNo === holdNo){
			    	//Partial Draw
			    	var holdItem;
			    	for(var s=0;s<targetSurface.getItems().length;s++) {
			    		if(targetSurface.getItems()[s].holdNo && targetSurface.getItems()[s].holdNo === holdNo) {
			    			holdItem = targetSurface.getItems()[s]
			    			break;
			    		}
			    	}
			    	
			    	if(holdItem){
			    		targetSurface.renderSprite(holdItem);
			    	}
				}
    		}
    		
    		bayCount++;
    		
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
    		if(!record) {
    			// console.log('** bay draw **');
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
				    asc: me.storeOutbound,
					serviceLane: me.storeSvc,
					ports: me.storePort,
				    slotMeta: me.storeSlotMeta,
					alongSide: me.alongSide,
				    cellDisplayOption: me.cellDisplayOption || 'POD',									//POD, POL, POD2 - by user config
				    maskType: me.maskType,	//Loadable Mark
				    blinkType: '',		//BLINKING
				    pol: me.pol,
				    polVoyage: me.polVoyage,
				    polTerminal: me.polTerminal,
				    polBerth: me.polBerth,
				    pod: me.pod,
				    podTerminal: me.podTerminal,
				    podBerth: me.podBerth,
				    filterItems: me.filterItems,
					selectedItems: me.selectedItems,
					selectedQCs: me.selectedQCs,
					planSize: me.planSize
			    };
				
			    targetSurface.add(Ext.create('widget.app-vesseloutbaydraw', config));
				
		    } else if(partialIndex > -1 && me.bays.getAt(partialIndex).data.hatchNo === hatchNo){
		    	//Partial Draw
				var bayItem;
		    	for(var s=0;s<targetSurface.getItems().length;s++) {
		    		if(targetSurface.getItems()[s].bay && targetSurface.getItems()[s].bay.name === bay.name) {
		    			var bayItem = targetSurface.getItems()[s];
		    			
		    			bayItem.filterItems = me.filterItems;
		    			bayItem.selectedItems = me.selectedItems;
		    			break;
		    		}
		    	}
		    	if(bayItem){
					
					bayItem.bay = bay;
					// console.log('draw bay ' + bayItem.bay.name);
		    		targetSurface.renderSprite(bayItem);
		    	}
		    }
		    
	    	preBay = bay;
    	}
    	
    	if(!record) {
//    		 var renderStart = new Date().getTime();
    		console.log('redraw all');
    		targetSurface.renderFrame();
//    		var renderElapsed = new Date().getTime() - renderStart;
//        	console.log("RenderFrame: " + renderElapsed);
        	
    		//BLINKING
    		// should not connect else if for above.. : loadable mark & blinking option can be set, so we have to concern for concurrency.
    		if (me.blinkType) {
    			me.blinkDraw();
    		}
        }
    	
    	me.isCompleted = true;
    	
    	//To fire event after complete the redraw
    	//It is useful for the printing to get the image
    	me.fireEvent('redrawdone', me, record);
    	
//    	var elapsed = new Date().getTime() - start;
//    	console.log("Elapse Redraw(): " + elapsed);
    },
    
    //Not In Use
    maskDraw: function (record) {
        var me = this,
            rect = me.getMainRect();
            
        if(!rect) {
            return;
        }
        
        //Main excluded pad-top, left, right, bottom
        var targetSurface = me.getSurface('mask');
		
        //Check partial drawing
        var partialIndex = -1;
        if(!record) {
        	targetSurface.removeAll();
        	targetSurface.clear();
        	
        } else {
	        for(var i=0;i<me.bayList.length;i++){
	        	if(me.bays.getAt(me.bayList[i]).data.name === record.data.lbay) {
	        		partialIndex = me.bayList[i];
	        		break;
	        	}
	        }
        }
        
		
		//Arrange Bay Position
    	var index = 0;
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0, offsetHchY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    			
    			if(!record) {
    				//Draw Hatch Info
					config =  {
					    meta: me.meta,       
						hatchNo: hatchNo,
						viewMode: me.viewMode,
						asc: me.storeOutbound,
						x: offsetHchX,
						y: offsetHchY,
						maskType: me.maskType
					};
					targetSurface.add(Ext.create('widget.app-vesselouthatchdraw', config));
					
			    } else if(partialIndex > -1 && me.bays.getAt(partialIndex).data.hatchNo === hatchNo){
			    	//Partial Draw
			    	var hatchItem;
			    	for(var s=0;s<targetSurface.getItems().length;s++) {
			    		if(targetSurface.getItems()[s].hatchNo && targetSurface.getItems()[s].hatchNo === hatchNo) {
			    			hatchItem = targetSurface.getItems()[s]
			    			break;
			    		}
			    	}
			    	
			    	if(hatchItem){
			    		targetSurface.renderSprite(hatchItem);
			    	}
				}
    		}
    		
			//Bay Width, Height, X, Y
    		var bayX = me.getBayX(offsetHchX, bay.name);
    		var bayY = me.getBayY(offsetHchY, bay.name, bayCount);

		    if(!record) {
    			if(me.viewMode === 'bay') {
    				preBay = bay.index > 0 ? me.bays.getAt(bay.index - 1).data : null;
    	    		postBay = bay.index < me.bays.length ? me.bays.getAt(bay.index + 1).data : null;
    			}
    			
    		    var config = {
				    meta: me.meta,
				    asc: me.storeOutbound,
	                bay: bay,
				    preBay: preBay,
				    postBay: postBay,
				    vsl: me.vsl,
				    bayX: bayX,
				    bayY: bayY,
				    viewMode: me.viewMode,
				    maskType: me.maskType,
				    blinkType: ''				//BLINKING
			    };
				
			    targetSurface.add(Ext.create('widget.app-vesseloutbaydraw', config));
				
		    } else if(partialIndex > -1 && me.bays.getAt(partialIndex).data.hatchNo === hatchNo){
		    	//Partial Draw
		    	var bayItem;
		    	for(var s=0;s<targetSurface.getItems().length;s++) {
		    		if(targetSurface.getItems()[s].bay && targetSurface.getItems()[s].bay.name === bay.name) {
		    			var bayItem = targetSurface.getItems()[s]
		    			break;
		    		}
		    	}
		    	
		    	if(bayItem){
		    		bayItem.bay = bay;
		    		targetSurface.renderSprite(bayItem);
		    	}
		    }
			
	    	preBay = bay;
    	}
    	
    	if(!record) {	
    		targetSurface.renderFrame();
        }
    },    

    
    //BLINKING
    blinkDraw: function () {
        var me = this,
            rect = me.getMainRect();
            
        if(!rect) {
            return;
        }
        
        //Main excluded pad-top, left, right, bottom
        var targetSurface = me.getSurface('blink');
        targetSurface.removeAll();
		targetSurface.clear();
		
		//Arrange Bay Position
    	var index = 0;
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0, offsetHchY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    		}
    		
    		bayCount++;
    		
			//Bay Width, Height, X, Y
    		var bayX = me.getBayX(offsetHchX, bay.name);
    		var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
		
		    var cellPosX, cellPosY;
		    config = {
			    meta: me.meta,
                bay: bay,
			    preBay: preBay,
			    postBay: postBay,
			    vsl: me.vsl,
			    bayX: bayX,
			    bayY: bayY,
			    asc: me.storeOutbound,
			    pol: me.pol,
			    polVoyage: me.polVoyage,
			    polTerminal: me.polTerminal,
			    polBerth: me.polBerth,
			    pod: me.pod,
			    podTerminal: me.podTerminal,
			    podBerth: me.podBerth,
			    viewMode: me.viewMode,
			    maskType: '',
			    blinkType: me.blinkType		//BLINKING
		    };
			
		    targetSurface.add(Ext.create('widget.app-vesseloutbaydraw', config));
			
	    	preBay = bay;
    	}
    	
		if(!me.blinkTask){
			var flag = 1;
			me.blinkTask = Ext.TaskManager.start({
				run: function() {
					
					flag > 0 ? me.getSurface('blink').clear():  me.getSurface('blink').renderFrame();
					flag = flag * -1;
				},
				interval: 1000
			});
		}     	
    },    
    
    getMiscOffsetY: function() {
    	var me = this;
    	return me.renderMode === 'print' && me.printOpts ? me.printOpts.headerHeight : 0;
	},

    
    getHoldX: function(hatchCount) {
    	var me = this;
		if(me.meta.bayDirection === 'RTL') {
			return me.meta.viewWidth - me.meta.hatchWidth * (hatchCount <= me.upperNoHatches ? hatchCount : hatchCount - me.upperNoHatches);
		} else {
			return me.meta.hatchWidth * (hatchCount <= me.upperNoHatches ? hatchCount - 1 : hatchCount - me.upperNoHatches - 1);
		}
	},
	
	getHoldY: function(hatchCount) {
		var me = this;
		var offset = me.getMiscOffsetY();
		var value = hatchCount <= me.upperNoHatches ? 0 : me.meta.hatchHeight;
		return value + offset;
	},
    
    getHatchX: function(hatchCount) {
		var me = this;
		if(me.meta.bayDirection === 'RTL') {
			return me.meta.viewWidth - me.meta.hatchWidth * (hatchCount <= me.upperNoHatches ? hatchCount : hatchCount - me.upperNoHatches);
		} else {
			return me.meta.hatchWidth * (hatchCount <= me.upperNoHatches ? hatchCount - 1 : hatchCount - me.upperNoHatches - 1);
		}
	},
	
    getHatchY: function(hatchCount) {
		var me = this;
		var offset = me.getMiscOffsetY();
		var value = hatchCount <= me.upperNoHatches ? 0 : me.meta.hatchHeight;
		return value + offset;
	},
	
	getBayX: function(offsetHchX, bayNo) {
		var me = this;
		var res = offsetHchX;
		if(me.viewMode === 'bay') {
			res = offsetHchX;
		} else if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2'){
			res = offsetHchX;
		} else if(me.viewMode !== 'vessel' && me.meta.baysInHatch === '2'){
			res = offsetHchX;
		} else {
			res = offsetHchX + (parseInt(bayNo) % 2 === 0 ? 0 : me.meta.bayWidth);
		}
		return res;
	},
	
	getBayY: function(offsetHchY, bayNo, bayCount) {
		var me = this;
		var offset = 0;	//Already offset from parameter
		var value;
		if(me.viewMode === 'bay') {
			value = 0;
		} else if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2'){
			if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
				//bayCount 3이면 한 해치의 3베이 중 마지막 베이 1, 2, 3 > 3
				value = offsetHchY + (bayCount === 3 ?  me.meta.bayHeight : 0);
			} else {
				value = offsetHchY + (bayCount === 1 ? 0 : me.meta.bayHeight);
			}
		} else if(me.viewMode !== 'vessel' && me.meta.baysInHatch === '2'){
			if(me.meta.baysInHatchAlign4TwoBayMode === 'F') {
				value = offsetHchY + (bayCount === 3 ?  me.meta.bayHeight : 0);
			} else {
				value = offsetHchY + (bayCount === 1 ? 0 : me.meta.bayHeight);
			}
		} else {
			if(parseInt(bayNo) % 2 === 0){ //짝수 베이
				value = offsetHchY + me.meta.bayHeight / 2;
			} else {
				value = offsetHchY + (bayCount === 1 ? 0 : me.meta.bayHeight);
			}
		}
		return value + offset;
	},

	onPlanSlot: function(planInfoStore){
		var me = this;
		// var vslStore = IoTosSpExt.getApplication().caspVslStructure;
		var bays = me.bays;
		var startCellPos = new Array();
		var endCellPos = new Array();
		var x = planInfoStore.data.x;
		var y = planInfoStore.data.y;
		var x2 = planInfoStore.data.w;
		var y2 = planInfoStore.data.h;
		var loadList = planInfoStore.data.loadList;
		var yardCntrSelectionList = planInfoStore.data.yardCntrSelectionList;
		var actionMode = planInfoStore.data.actionMode;
		var workMode = planInfoStore.data.workMode;
		var planMode = planInfoStore.data.planMode;
		var planSlots = planInfoStore.data.planSlots;
		var planInfo = planInfoStore.data.planinfo;
		var direction = planInfoStore.data.direction;
		var cacheItem = planInfoStore.data.cacheItem;
		var menu = planInfoStore.data.menu;
		var seqNo = planInfoStore.data.seqNo;
		var twin = planInfoStore.data.twin;
		var planDirection = planInfoStore.data.planDirection;
		var loadingOption = planInfoStore.data.loadingOption;
		var qcInfo = null;
		var assignmentStore = IoTosSpExt.getApplication().qcSchedule;
		var planSize = planInfoStore.data.planSize;

		var startCellPoss= me.getCellPositionWithoutCellStructure(x, y, false);
		var endCellPoss = me.getCellPositionWithoutCellStructure(x2, y2, false);

		var new20X = new Array(); var new20X2 = new Array();
		var new40X = new Array(); var new40X2 = new Array();
		if(startCellPoss.length > 0 && endCellPoss.length > 0){
			for(var i = 0 ; i < startCellPoss.length ; i++){
				if(parseInt(me.bays.getAt(startCellPoss[i][0]).data.name) % 2 != 0){ // bay size odd
					new20X = startCellPoss[i];
				}
			}

			for(var i = 0 ; i < endCellPoss.length ; i++){
				if(parseInt(me.bays.getAt(endCellPoss[i][0]).data.name) % 2 != 0){ // bay size odd
					new20X2 = endCellPoss[i];
				}
			}

			for(var i = 0 ; i < startCellPoss.length ; i++){
				if(parseInt(me.bays.getAt(startCellPoss[i][0]).data.name) % 2 == 0){ // bay size even
					new40X = startCellPoss[i];
				}
			}

			for(var i = 0 ; i < endCellPoss.length ; i++){
				if(parseInt(me.bays.getAt(endCellPoss[i][0]).data.name) % 2 == 0){ // bay size odd
					new40X2 = endCellPoss[i];
				}
			}
			
			if(planSize == 20){
				if(direction == '>'){
					if(startCellPoss) startCellPos = new20X;
					if(endCellPoss) endCellPos = new20X2;
				}else{
					if(startCellPoss) startCellPos = new20X2;
					if(endCellPoss) endCellPos = new20X;
				}
			}else{
				if(direction == '>'){
					if(startCellPoss) startCellPos = new40X;
					if(endCellPoss) endCellPos = new40X2;
				}else{
					if(startCellPoss) startCellPos = new40X2;
					if(endCellPoss) endCellPos = new40X;
				}
			}			

			if(startCellPos.length > 0 && endCellPos.length > 0){
				//서로 다른 bay X
				if(startCellPos[0] != endCellPos[0]){
					planSlots.push({
						isOk: false,
						message: 'samebaydh_msg'
					});				
					return planSlots;
				}

				if(me.viewMode === 'bay'){
					var startBay = me.bays.getAt(me.bayList[0]).data;
				}else{
					var startBay = me.bays.getAt(me.bayList[startCellPos[0]]).data;
				}
				// var startBay = me.bays.getAt(me.bayList[startCellPos[0]]).data;
				var startTierIndex = startCellPos[2];
				var startHd = startTierIndex > startBay.holdTierEndIndex ? 'D' : 'H';
				// var enlbay = me.bays.getAt(me.bayList[endCellPos[0]]).data;
				if(me.viewMode === 'bay'){
					var enlbay = me.bays.getAt(me.bayList[0]).data;
				}else{
					var enlbay = me.bays.getAt(me.bayList[endCellPos[0]]).data;
				}
				var endTierIndex = endCellPos[2];
				var endHd = endTierIndex > enlbay.holdTierEndIndex ? 'D' : 'H';

				//서로 다른 deck hold X
				if(startHd != endHd){
					planSlots.push({
						isOk: false,
						message: 'samebaydh_msg'
					});
					return planSlots;
				}

				//지울 때 sequence 있는지 검토 XXX
				if(planMode == 'S'){
					var seq = null;
					var cellInfo = bays.getAt(startCellPos[0]).data.outcells[startCellPos[2]][startCellPos[1]];
					if(cellInfo.status === 'S'){
						seq = this.storeOutbound.getById(cellInfo.id).data.obSeqNo;
					}		
					//드래그인지 검토
				
				
					// if((menu === 'mnuInsertSEQ' && (seqNo == null || seqNo == '') ) || (menu === 'menuRemoveSEQnPRF' && 
					// 	(startCellPos[0] == endCellPos[0] && startCellPos[1] == endCellPos[1] && startCellPos[2] == endCellPos[2]) && (seq == null || seq == '')) ){ //remove

					// 	return false;
					// } 
				}

				if(planMode === CodeConstants.OutboundPlanMode.OB_QC){
					//드래그한 위치에 해당되는 qc 있는지 확인
					var index = assignmentStore.findBy((record) => record.get('isSelected') == true 
					&& record.get('hatchIndex') == startBay.hatchNo && record.get('deckHoldStr') == startHd && record.get('ioMode') == CodeConstants.PlanType.LOAD
					&& record.get('hatchIndex') == enlbay.hatchNo && record.get('deckHoldStr') == endHd );
					if(index > -1){
						qcInfo = assignmentStore.getAt(index);
					}else{
						if(actionMode != 'erase'){
							planSlots.push({
								isOk: false,
								message: 'MSG_CTSP_03001'
							});
							return planSlots;
						}
					}
				}

				planSlots.push({
					bayIndex : startCellPos[0],
					rowIndex : startCellPos[1],
					tierIndex: startCellPos[2],
					toBayIndex: endCellPos[0],
					toRowIndex: endCellPos[1],
					toTierIndex: endCellPos[2],
					ioType: CodeConstants.PlanType.LOAD,
					planMode: planMode,
					actionMode: actionMode,
					menu: menu,
					insertSeq: seqNo,
					qcInfo : qcInfo,	
					planInfo : planInfo,
					planDirection: planDirection,
					loadingOption: loadingOption,
					selectedContainerList : loadList,
					yardCntrSelectionList: yardCntrSelectionList,
					planSize: planSize,
					twin: twin,
					cacheItem: cacheItem,
					isOk: true
				});
			}else{
				if((planSize == 20 && (new40X.length > 0 && new40X2.length > 0)) || (planSize == 40 && (new20X.length > 0 && new20X2.length > 0))){
					if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode === CodeConstants.OutboundPlanMode.OB_Ship || workMode === CodeConstants.OutboundPlanMode.OB_PRF || workMode === CodeConstants.OutboundPlanMode.OB_QC || workMode === CodeConstants.ROBPlanMode.RST2_TO_RST1) MessageUtil.infoToast('Plan Size', 'areawithplansize_msg', planSize);
				}
			}	
		}else{
			if(loadingOption == CodeConstants.LoadingPlanOptionType.SHIP2YARD && loadList != null && loadList.length > 0){
				if(me.selectedItems.length > 0){
					// for(var i = 0; i < me.selectedItems.length ; i++){

					// }
					planSlots.push({
						bayIndex : me.selectedItems[0].data.obBayIdx,
						rowIndex : me.selectedItems[0].data.obRowIdx,
						tierIndex: me.selectedItems[0].data.obTierIdx,
						toBayIndex: me.selectedItems[me.selectedItems.length - 1].data.obBayIdx,
						toRowIndex: me.selectedItems[me.selectedItems.length - 1].data.obRowIdx,
						toTierIndex: me.selectedItems[me.selectedItems.length - 1].data.obTierIdx,
						ioType: CodeConstants.PlanType.LOAD,
						planMode: planMode,
						actionMode: 'write',
						menu: menu,
						insertSeq: seqNo,
						qcInfo : qcInfo,	
						planInfo : planInfo,
						planDirection: planDirection,
						loadingOption: loadingOption,
						selectedContainerList : loadList,
						yardCntrSelectionList: yardCntrSelectionList,
						planSize: planSize,
						twin: twin,
						cacheItem: cacheItem,
						isOk: true
					});
				}else{
					planSlots.push({
						isOk: false,
						message: 'selectshipcell_msg'
					});
					return planSlots;
				}				
			}
		}

		return planSlots;
	},

	checkPlanSlot: function(x, y, x2, y2){
		var me = this;
		var startCellPos = me.getCellPositionWithStackable(x, y, false);
		var endCellPos = me.getCellPositionWithStackable(x, y, false);
		planSlots.push({
			hd: hd,
			bidx : startCellPos[0],
			ridx: j,
			tidx: k,
			bayNo : bay.name,
			rowNo: rowNo,
			tierNo: bay.tierNo[k],
			sortKey: bay.name + bay.tierNo[k] + rowNo,
			x: me.getCellX(bay, bayX, j, hd),
			y: me.getCellY(bay, bayY, k)
		});
		// for(var h=0;h<2;h++) {
		// 	var hd, hq, hy1, hy2, tier, tiers;
		// 	if(h===0) {
		// 		//Hold
		// 		hd = 'H';
		// 		hy1 = me.getCellY(bay, bayY, bay.holdTierEndIndex) - me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
		// 		hy2 = bayY + me.meta.bayHeight;
		// 		tier = 0;
		// 		tiers = bay.holdTierEndIndex + 1;
		// 	} else {
		// 		//Deck
		// 		hd = 'D';
		// 		hy1 = bayY;
		// 		hy2 = me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.baseUnit * me.meta.baseHeight;
		// 		tier = bay.deckTierStartIndex;
		// 		tiers = bay.deckTierEndIndex + 1;
		// 	}

		// 	if((y>=hy1 && y<=hy2) || (y2>=hy1 && y2<=hy2) || (y<=hy1 && y2>=hy2)){
		// 		for(var j=0;j<bay.rowEndIndex+1;j++) {
		// 			var rx = me.getCellX(bay, bayX, j, hd);
		// 			if((x >= rx && x < rx + me.meta.baseUnit * me.meta.baseWidth) || 
		// 			(x2 >= rx && x2 < rx + me.meta.baseUnit * me.meta.baseWidth) ||
		// 			(x <= rx && x2 > rx )){
		// 				var accumulatedHgt = 0, hq, hgt;
		// 				for(var k=tier;k<tiers;k++) {
		// 					hgt = me.meta.generalContainerHeight;
		// 					if(me.meta.highCubicViewMode === 'Y') {
		// 						var cellInfo = bay.outcells[k][j];
		// 						if(cellInfo.status === 'S') {
		// 							//Need to check NULL due to mirror planning
		// 							if(me.storeOutbound.getById(cellInfo.id)) {
		// 								hgt = me.storeOutbound.getById(cellInfo.id).data.height;
		// 							}
		// 						} else if(cellInfo.status === 'X') {
		// 							var id = cellInfo.postId || cellInfo.preId; 
		// 							hgt = me.storeOutbound.getById(id).data.height;
		// 						}
								
		// 						//Make 0 for accumulatedHgt for start of deck
		// 						accumulatedHgt = k === bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
		// 						accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
		// 					}
		// 					var ty = me.getCellY(bay, bayY, k) - accumulatedHgt;
		// 					if((y >= ty && y < ty + me.getCellHeight(hgt)) || 
		// 					(y2 >= ty && y2 < ty + me.getCellHeight(hgt)) ||
		// 					(y <= ty && y2 > ty)){
		// 						var rowNo = hd === 'H' ? bay.holdRowNo[j] : bay.deckRowNo[j];
		// 						if(!nullChk_(rowNo)){
		// 							planSlots.push({
		// 								hd: hd,
		// 								ridx: j,
		// 								tidx: k,
		// 								bidx : bay.index,
		// 								bayNo : bay.name,
		// 								rowNo: rowNo,
		// 								tierNo: bay.tierNo[k],
		// 								sortKey: bay.name + bay.tierNo[k] + rowNo,
		// 								x: me.getCellX(bay, bayX, j, hd),
		// 								y: me.getCellY(bay, bayY, k)
		// 							});
		// 							console.log(bay.index + ' ' + bay.name+ ' ' +rowNo + ' ' + bay.tierNo[k]);
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	},
	
	getCellX: function(bay, bayX, rowIdx, hd){
		var me = this;
		var tierNoPlaceOffset = me.meta.viewRowTierNo === 'N' ? 0 : (me.meta.tierNoPlace === 'L' || me.meta.tierNoPlace === 'B') ? me.meta.tierNoAreaWidth * me.meta.baseUnit : 0;
		
		if(hd==='H'){
			var offset;
	        if(parseInt(bay.box[rowIdx] / 4) === (rowIdx + me.vsl.maxRowStartIndex))
	        	offset = parseInt(bay.box[rowIdx]) % 4;
	        else
	        	offset = - (4 - parseInt(bay.box[rowIdx]) % 4);
	        
	        return bayX + tierNoPlaceOffset + parseInt(me.meta.baseUnit * (me.meta.baseWidth * rowIdx + me.meta.baseWidth * offset / 4 + me.meta.padleft));
		} else {
			return bayX + tierNoPlaceOffset + parseInt(me.meta.baseUnit * (me.meta.baseWidth * rowIdx + me.meta.padleft));  
		}
		
	},

	getCellY: function(bay, bayY, tierIdx){
		var me = this;
		var value = bayY + me.meta.bayHeight - (me.meta.padbottom + me.meta.rowNoAreaHeight + me.meta.stackWeightAreaHeight + me.meta.cellGuideClearanceAreaHeight + (tierIdx > bay.holdTierEndIndex ? me.meta.hatchCoverAreaHeight : 0)) * me.meta.baseUnit - me.meta.cellHeight * (tierIdx + 1);
		return value;
	},
	
	getCellHeight: function(height) {
		var me = this;
		var value; 
		if(height) {
			value = parseInt(Math.round(me.meta.cellHeight * height / me.meta.generalContainerHeight));
		} else {
			value = me.meta.cellHeight;
		}
		return value;
	},
	
	getRowValueY: function(bay, bayY, value) {
		var me = this;
		if(value === 'HoldRowNo') {
			return me.getCellY(bay, bayY, 0) + me.meta.cellHeight;
		}
		
		if(value === 'HoldStackWeight') {
			return me.getCellY(bay, bayY, 0) + me.meta.cellHeight + me.meta.baseUnit * me.meta.rowNoAreaHeight;
		}
		
		if(value === 'CellGuideClearance') {
			return me.getCellY(bay, bayY, 0) + me.meta.cellHeight + me.meta.baseUnit * (me.meta.rowNoAreaHeight + me.meta.stackWeightAreaHeight);
		}
		
		if(value === 'DeckRowNo') {
			return me.getCellY(bay, bayY, bay.deckTierEndIndex) - me.meta.baseUnit * (me.meta.rowNoAreaHeight + me.meta.stackWeightAreaHeight + me.meta.deckGapAreaHeight + me.meta.deckLashingAreaHeight + me.meta.visibilityAreaHeight);
		}
		
		if(value === 'DeckLashingResult') {
			return me.getCellY(bay, bayY, bay.deckTierEndIndex) - me.meta.baseUnit * (me.meta.rowNoAreaHeight + me.meta.stackWeightAreaHeight + me.meta.deckGapAreaHeight);
		}
		
		if(value === 'VisibilityResult') {
			return me.getCellY(bay, bayY, bay.deckTierEndIndex) - me.meta.baseUnit * (me.meta.rowNoAreaHeight + me.meta.stackWeightAreaHeight + me.meta.deckGapAreaHeight + me.meta.deckLashingAreaHeight);
		}
		
		if(value === 'DeckStackWeight') {
			return me.getCellY(bay, bayY, bay.deckTierEndIndex) - me.meta.baseUnit * (me.meta.stackWeightAreaHeight + me.meta.deckGapAreaHeight);
		}
		
		if(value === 'HatchCover') {
			return me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.cellHeight + me.meta.hatchCoverAreaHeight / 2 * me.meta.baseUnit - me.meta.hatchCoverHeight * me.meta.baseUnit;
		}
		
		if(value === 'HatchCoverArea') {
			return me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.cellHeight;
		}
	},
	
	getCellXYWithPosition: function(bayNo, rowNo, tierNo) {
		var me = this;
		
		//Arrange Bay Position
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0, offsetHchY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    		}
    		
    		bayCount++;
    		
    		if(bay.name === bayNo) {
    		
				//Bay Width, Height, X, Y
				var bayX = me.getBayX(offsetHchX, bay.name);
				var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
				
				//Tier
				var tierIndex = me.getTierIndex(bay, tierNo); 
				var rowIndex = me.getRowIndex(bay, rowNo, tierIndex);
				
				var hd = tierIndex > bay.holdTierEndIndex ? 'D' : 'H';
				
				
				//TODO: High Cubic Height
				
			    var y = me.getCellY(bay, bayY, tierIndex);
		        var x = me.getCellX(bay, bayX, rowIndex, hd);

				return [x, y]
    		}
    		
	    	preBay = bay;
    	}
		
		return null;

	},
	
	getBayXYWithPosition: function(bayNo) {
		var me = this;
		
		//Arrange Bay Position
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0, offsetHchY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    		}
    		
    		bayCount++;
    		
    		if(bay.name === bayNo) {
    		
				//Bay Width, Height, X, Y
				var bayX = me.getBayX(offsetHchX, bay.name);
				var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
				
				return [bayX, bayY]
    		}
    		
	    	preBay = bay;
    	}
		
		return null;

	},
	
	getSegmentXY: function(bayNo, hd, segment) {
		var me = this;
		
		//Arrange Bay Position
    	var hatchCount = 0, bayCount;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0, offsetHchY = 0;
    	
    	for(var i=0;i<me.bayList.length;i++){
    		bay = me.bays.getAt(me.bayList[i]).data;
    		postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
    		hatchNo = bay.hatchNo;
    				
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			bayCount = 0;
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
    		}
    		
    		bayCount++;
    		
    		if(bay.name === bayNo) {
    		
				//Bay Width, Height, X, Y
				var bayX = me.getBayX(offsetHchX, bay.name);
				var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
				
				//Segment
				var st=-1, ed=-1;
				var baySegment = hd === 'H' ? bay.holdRowSegment : bay.deckRowSegment;
				for(var j=0;j<bay.rowEndIndex + 1;j++){
					if(baySegment[j] === segment) {
						if(st === -1) {
							st = j;
						}
						ed = j;
					}
				}
				
				var x = me.getCellX(bay, bayX, st, hd);
				var x1 = me.getCellX(bay, bayX, ed, hd);
				var w = x1 - x + me.meta.cellWidth; 
				
				var y, y1, h;
				if(hd === 'H') {
					y = me.getCellY(bay, bayY, bay.holdTierEndIndex) - me.meta.baseUnit * me.meta.hatchCoverAreaHeight / 2;;
					y1 = me.getCellY(bay, bayY, 0);
				} else {
					y = me.getCellY(bay, bayY, bay.deckTierEndIndex) - me.meta.baseUnit * me.meta.deckGapAreaHeight;
					y1 = me.getCellY(bay, bayY, bay.holdTierEndIndex + 1);
				}
				var h = y1 - y + me.meta.cellHeight;

				return [x, y, w, h];
    		}
    		
	    	preBay = bay;
    	}
		
		return null;

	},

	showoutcellselection: function(posX, posY, width, height) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
    		if (items[i].getCustomId() === 'id-outcellselection'){
    		    var sCell = items[i].setAttributes({
    		    	cellPosX: posX,
    		    	cellPosY: posY,
    		    	cellWidth: width,
    		    	cellHeight: height,
    		    	hidden: false
    		    }); 
    		    break;
    		}			
		}		
	    planSurface.renderFrame();
		
	},
	
	showSegmentSelection: function(posX, posY, width, height) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
			if (items[i].getCustomId() === 'id-segmentSelection'){
				var sCell = items[i].setAttributes({
					cellPosX: posX,
					cellPosY: posY,
					cellWidth: width,
					cellHeight: height,
					hidden: false
				}); 
				break;
			}			
		}		
		planSurface.renderFrame();
		
	},
	
	hideoutcellselection: function(){
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
			if (items[i].getCustomId() === 'id-outcellselection'){
			    var sCell = items[i].setAttributes({
			    	hidden: true
			    }); 
			    break;
			}			
		}		
	    planSurface.renderFrame();	
	},

	getBayInfo: function(e, x, y) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var bays = new Array();
		
		for(var i=0;i<me.bayList.length;i++){
			bay = me.bays.getAt(me.bayList[i]).data;
			postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
			hatchNo = bay.hatchNo
			
			if (preHatchNo !== hatchNo) {
				bayCount = 0;
				hatchCount++;
				preHatchNo = hatchNo;
				
				offsetHchX = me.getHatchX(hatchCount);
    			offsetHchY = me.getHatchY(hatchCount);
			}
			
			bayCount++;
			
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			if((x >= bayX && x < bayX + me.meta.bayWidth) && (y >= bayY && y < bayY + me.meta.bayHeight)){
				bays.push(bay);
			}
			
	    	preBay = bay;
		}
		
		if(bays.length > 0) {
			//Priority 40ft bay
			if(bays.length > 1) {
				
				if(e.button === 0) {
					if(parseInt(bays[0].name) % 2 !== 0) {
						return bays[0];
					} else {
						return bays[1];
					}
                } else {
                	if(parseInt(bays[0].name) % 2 === 0) {
                		return bays[0];
                	} else {
                		return bays[1];
                	}
                }
				
				
			} else {
				return bays[0];
			}
		} 
	},
	
	getCellPosition: function(x, y, bDrawoutcellselection) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var bayIdx = new Array(), rowIdx = new Array(), tierIdx = new Array(), isBay, isRow, isTier;
		var cellPos = new Array();
		var rx, ty, hq, hgt;
		
		me.hideoutcellselection();
		
		for(var i=0;i<me.bayList.length;i++){
			isBay = false, isRow = false, isTier = false
			
			bay = me.bays.getAt(me.bayList[i]).data;
			postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
			hatchNo = bay.hatchNo
			
			if (preHatchNo !== hatchNo) {
				bayCount = 0;
				hatchCount++;
				preHatchNo = hatchNo;
				
				offsetHchX = me.getHatchX(hatchCount);
				offsetHchY = me.getHatchY(hatchCount);
			}
			
			bayCount++;
			
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			if((x >= bayX && x < bayX + me.meta.bayWidth) && (y >= bayY && y < bayY + me.meta.bayHeight)){
				isBay = true;
			}
			
			if(isBay){
				//Hold or Deck Row
				var hd = y < me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.cellHeight ? 'D' : 'H';
				
				var ridx = -1
				for(var j=0;j<bay.rowEndIndex+1;j++) {
					rx = me.getCellX(bay, bayX, j, hd);
					if(x >= rx && x < rx + me.meta.baseUnit * me.meta.baseWidth){
						isRow = true;
						ridx = j;
						break;
					}
				}
				
				//Tier
				if(isRow){
					var tidx = -1;
					var accumulatedHgt = 0;
					for(var j=0;j<bay.deckTierEndIndex+1;j++) {
						hgt = me.meta.generalContainerHeight;
						
						if(me.meta.highCubicViewMode === 'Y') {
							var cellInfo = bay.outcells[j][ridx];
							if(cellInfo.id != ''){
								//console.log(i + ' ' + j);
							}
							if(cellInfo.status === 'S') {
								hgt = me.storeOutbound.getById(cellInfo.id).data.height;
							} else if(cellInfo.status === 'X') {
								var id = cellInfo.postId || cellInfo.preId; 
								hgt = me.storeOutbound.getById(id).data.height;
							}
							
							accumulatedHgt = j === bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
							accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
						}
						ty = me.getCellY(bay, bayY, j) - accumulatedHgt;
						
						if(y >= ty && y < ty + me.getCellHeight(hgt)){
							isTier = true;
							tidx = j
							break;
						}
					}
				}
				
				
				if(isTier && isRow) {
					bayIdx.push(me.bayList[i]);
					rowIdx.push(ridx);
					tierIdx.push(tidx);
				}
				
			}
			
			preBay = bay;
		}
		
		if(bayIdx) {
			for(var i=0;i<bayIdx.length;i++){
				bayIdx[i];
				rowIdx[i];
				tierIdx[i];
				
				var bayNo = me.bays.getAt(bayIdx[i]).data.name;
				var tierNo = me.bays.getAt(bayIdx[i]).data.tierNo[tierIdx[i]];
				if(tierIdx[i] > me.bays.getAt(bayIdx[i]).data.holdTierEndIndex) {
					var rowNo = me.bays.getAt(bayIdx[i]).data.deckRowNo[rowIdx[i]];
				}else{
					var rowNo = me.bays.getAt(bayIdx[i]).data.holdRowNo[rowIdx[i]];
				}
				
				//if Cell structure is okay
				if (me.bays.getAt(bayIdx[i]).data.outcells[tierIdx[i]][rowIdx[i]].value > 0) {
//					console.log(i + ' > Index : bay-row-tier = ' + bayIdx[i] + '-' + rowIdx[i] + '-' + tierIdx[i] + ' | Name : bay-row-tier = ' + bayNo + '-' + rowNo + '-' + tierNo);
					
					var cell = [bayIdx[i],rowIdx[i],tierIdx[i]];
					cellPos.push(cell);
					
					if (bDrawoutcellselection) {
						var rowGap = 0.5, x, cellWidth;
						if (/hatch|bay/.test(me.viewMode)) {
				    		cellWidth = me.meta.cellWidth - rowGap * me.meta.baseUnit * 2;
				    		x = rx + rowGap * me.meta.baseUnit;
				    	} else {
				    		cellWidth = me.meta.cellWidth;
				    		x = rx
				    	}
						me.showoutcellselection(x, ty, cellWidth, me.getCellHeight(hgt));
					}
				} 
			}
		}
		
		return cellPos;
	},

	hideCellSelection: function(){
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
			if (items[i].getCustomId() === 'id-cellSelection'){
			    var sCell = items[i].setAttributes({
			    	hidden: true
			    }); 
			    break;
			}			
		}		
	    planSurface.renderFrame();	
	},

	getCellPositionWithoutCellStructure: function(x, y, bDrawoutcellselection) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var bayIdx = new Array(), rowIdx = new Array(), tierIdx = new Array(), isBay, isRow, isTier;
		var cellPos = new Array();
		var rx, ty, hq, hgt;
		
		me.hideoutcellselection();
		
		for(var i=0;i<me.bayList.length;i++){
			isBay = false, isRow = false, isTier = false
			
			bay = me.bays.getAt(me.bayList[i]).data;
			postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
			hatchNo = bay.hatchNo
			
			if (preHatchNo !== hatchNo) {
				bayCount = 0;
				hatchCount++;
				preHatchNo = hatchNo;
				
				offsetHchX = me.getHatchX(hatchCount);
				offsetHchY = me.getHatchY(hatchCount);
			}
			
			bayCount++;
			
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			if((x >= bayX && x < bayX + me.meta.bayWidth) && (y >= bayY && y < bayY + me.meta.bayHeight)){
				isBay = true;
			}
			
			if(isBay){
				//Hold or Deck Row
				var hd = y < me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.cellHeight ? 'D' : 'H';
				
				var ridx = -1
				for(var j=0;j<bay.rowEndIndex+1;j++) {
					rx = me.getCellX(bay, bayX, j, hd);
					if(x >= rx && x < rx + me.meta.baseUnit * me.meta.baseWidth){
						isRow = true;
						ridx = j;
						break;
					}
				}
				
				//Tier
				if(isRow){
					var tidx = -1;
					var accumulatedHgt = 0;
					for(var j=0;j<bay.deckTierEndIndex+1;j++) {
						hgt = me.meta.generalContainerHeight;
						
						if(me.meta.highCubicViewMode === 'Y') {
							var cellInfo = bay.outcells[j][ridx];
							if(cellInfo.id != ''){
								//console.log(i + ' ' + j);
							}
							if(cellInfo.status === 'S') {
								hgt = me.storeOutbound.getById(cellInfo.id).data.height;
							} else if(cellInfo.status === 'X') {
								var id = cellInfo.postId || cellInfo.preId; 
								hgt = me.storeOutbound.getById(id).data.height;
							}
							
							accumulatedHgt = j === bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
							accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
						}
						ty = me.getCellY(bay, bayY, j) - accumulatedHgt;
						
						if(y >= ty && y < ty + me.getCellHeight(hgt)){
							isTier = true;
							tidx = j
							break;
						}
					}
				}
				
				
				if(isTier && isRow) {
					bayIdx.push(me.bayList[i]);
					rowIdx.push(ridx);
					tierIdx.push(tidx);
				}
				
			}
			
			preBay = bay;
		}
		
		if(bayIdx) {
			for(var i=0;i<bayIdx.length;i++){
				bayIdx[i];
				rowIdx[i];
				tierIdx[i];
				
				var bayNo = me.bays.getAt(bayIdx[i]).data.name;
				var tierNo = me.bays.getAt(bayIdx[i]).data.tierNo[tierIdx[i]];
				if(tierIdx[i] > me.bays.getAt(bayIdx[i]).data.holdTierEndIndex) {
					var rowNo = me.bays.getAt(bayIdx[i]).data.deckRowNo[rowIdx[i]];
				}else{
					var rowNo = me.bays.getAt(bayIdx[i]).data.holdRowNo[rowIdx[i]];
				}
				
				//if bay row tier No ok
				if (!nullChk_(bayNo) && !nullChk_(rowNo) && !nullChk_(tierNo)) {
					var cell = [bayIdx[i],rowIdx[i],tierIdx[i]];
					cellPos.push(cell);
					
					if (bDrawoutcellselection) {
						var rowGap = 0.5, x, cellWidth;
						if (/hatch|bay/.test(me.viewMode)) {
				    		cellWidth = me.meta.cellWidth - rowGap * me.meta.baseUnit * 2;
				    		x = rx + rowGap * me.meta.baseUnit;
				    	} else {
				    		cellWidth = me.meta.cellWidth;
				    		x = rx
				    	}
						me.showoutcellselection(x, ty, cellWidth, me.getCellHeight(hgt));
					}
				} 
			}
		}
		
		return cellPos;
	},
	
	getCellPositionWithStackable: function(x, y, bDrawSelection) {
		var me = this;
		var bDrawoutcellselection = bDrawSelection || false;
		var cellPos = me.getCellPosition(x, y, bDrawoutcellselection);
		
		if(cellPos) {
			for(var i=0;i<cellPos.length;i++){
				var idx = cellPos[i];
				if (me.bays.getAt(idx[0]).data.outcells[idx[2]][idx[1]].status === 'S') {
					return [idx[0],idx[1],idx[2]];
				}
			}
		}
		
		return null;

	},

	getCntrByPosition: function(bayIdx, rowIdx, tierIdx, zeroIndex){
		//index가 0에서 시작하는지 1에서 시작하는지
		if(zeroIndex == false){
			var bay = bayIdx - 1; var row = rowIdx - 1; var tier = tierIdx - 1;
		}else{
			var bay = bayIdx; var row = rowIdx; var tier = tierIdx;
		}

		var cntrId = this.bays.getAt(bay).data.outcells[tier][row].id;
		return this.storeOutbound.getById(cntrId);
	},
	
	getContainerId: function(x, y, bSelection) {
		var me = this;
		var bDrawSelection = bSelection || false;
		var cellPos = me.getCellPositionWithStackable(x, y, bDrawSelection);
		
		if(cellPos) {
			var bayIdx = cellPos[0];
			var rowIdx = cellPos[1];
			var tierIdx = cellPos[2];
			
			return me.bays.getAt(bayIdx).data.outcells[tierIdx][rowIdx].id;
		} else {
			return null;
		}
	},
	
	checkBayWithPrePlanCondition: function(bay, preBay, postBay, planinfo) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";
		
		if(!planinfo.planSzTp) {
			me.toastMessage('selectcontainersizetype_msg', 'Warning', 'warn', false);
			return false;
		}
		
		var size = planinfo.planSzTp.data.sizeCode.substr(0,1) === '2' ? '2' : '4';
		
		if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') {
			
			if(!preBay) {
				//First Bay
				
				if(postBay && postBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
					
				}else if(postBay && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
						
				}else if(postBay && postBay.hatchNo === bay.hatchNo && bayType === '20') {
					//20ft fore bay
					if(size !== '2') return false
					
				}else {
					//Logically exception case
					return false;
				}
				
			}else if(!postBay) {
				//Last Bay
				
				if(preBay && preBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
					
				}else if(preBay && preBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
					
				}else if(preBay && preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 1 && bayType === '20') {
					//20ft rear bay and 20ft preBay (Which is 2 20ft dedicated hatch)
					if(size !== '2') return false
						
				}else if(preBay && preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 0 && bayType === '20') {
					//20ft rear bay and 40ft preBay (Which is normal 3 bays)
					if(size !== '2') return false
				}else {
					//Logically exception case
					return false;
				}
				
			}else if(preBay && postBay){
				//Normal 2 or 3 bay case
				
				if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
						
				}else if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && postBay.hatchNo === bay.hatchNo && bayType === '40') {
					//40ft normal 3 bays case (40ft is in middle)
					if(size !== '4') return false
				
				}else if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo === bay.hatchNo && bayType === '20') {
					//20ft fore bay
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 1 && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft rear bay and 20ft preBay (Which is 2 20ft dedicated hatch)
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 0 && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft rear bay and 40ft preBay (Which is normal 3 bays)
					if(size !== '2') return false
					
				}else {
					//Logically exception case
					return false;
				}
			}else {
				//General View with only 1 bay is logically exception case
				return false;
			}
			
		} else {
			
			if(bayType === '40') {
				if(size === '2') return false;
				
			} else {
				if(size !== '2') return false;
			}
		}
		
		return true;
	},
	
	checkBayWithLoadList: function(bay, preBay, postBay, size) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";
		
		size = size === '2' ? '2' : '4';
		
		if(me.viewMode === 'vessel' && me.meta.baysInHatchOfVessel === '2') {
			
			if(!preBay) {
				//First Bay
				
				if(postBay && postBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
					
				}else if(postBay && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
						
				}else if(postBay && postBay.hatchNo === bay.hatchNo && bayType === '20') {
					//20ft fore bay
					if(size !== '2') return false
					
				}else {
					//Logically exception case
					return false;
				}
				
			}else if(!postBay) {
				//Last Bay
				
				if(preBay && preBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
					
				}else if(preBay && preBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
					
				}else if(preBay && preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 1 && bayType === '20') {
					//20ft rear bay and 20ft preBay (Which is 2 20ft dedicated hatch)
					if(size !== '2') return false
						
				}else if(preBay && preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 0 && bayType === '20') {
					//20ft rear bay and 40ft preBay (Which is normal 3 bays)
					if(size !== '2') return false
				}else {
					//Logically exception case
					return false;
				}
				
			}else if(preBay && postBay){
				//Normal 2 or 3 bay case
				
				if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo !== bay.hatchNo && bayType === '40') {
					//40ft dedicated bay
					if(size !== '4') return false
						
				}else if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft dedicated bay
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && postBay.hatchNo === bay.hatchNo && bayType === '40') {
					//40ft normal 3 bays case (40ft is in middle)
					if(size !== '4') return false
				
				}else if(preBay.hatchNo !== bay.hatchNo && postBay.hatchNo === bay.hatchNo && bayType === '20') {
					//20ft fore bay
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 1 && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft rear bay and 20ft preBay (Which is 2 20ft dedicated hatch)
					if(size !== '2') return false
					
				}else if(preBay.hatchNo === bay.hatchNo && parseInt(preBay.name) % 2 === 0 && postBay.hatchNo !== bay.hatchNo && bayType === '20') {
					//20ft rear bay and 40ft preBay (Which is normal 3 bays)
					if(size !== '2') return false
					
				}else {
					//Logically exception case
					return false;
				}
			}else {
				//General View with only 1 bay is logically exception case
				return false;
			}
			
		} else {
			
			if(bayType === '40') {
				if(size === '2') return false;
				
			} else {
				if(size !== '2') return false;
			}
		}
		
		return true;
	},
	
	checkOverStackWeight: function(bay, rowIndex, hd) {
		var me = this;
		if(hd === 'H') {
			if(((bay.stackWeightHold[rowIndex] ? bay.stackWeightHold[rowIndex] : 0) 
				- (bay.accumulatedStackWeightHold[rowIndex] ? bay.accumulatedStackWeightHold[rowIndex] : 0) / 100) < 0){
				
				return true;
			} else {
				return false;
			}
		} else if(hd == 0){
			return false;
		} else {
			if(((bay.stackWeightDeck[rowIndex] ? bay.stackWeightDeck[rowIndex] : 0) 
					- (bay.accumulatedStackWeightDeck[rowIndex] ? bay.accumulatedStackWeightDeck[rowIndex] : 0) / 100) < 0){
				
				return true;
			} else {
				return false;
			}
		}
	},
	
	checkOverHatchCoverClearance: function(bay, rowIndex) {
		var me = this;
		var clearance = parseInt((bay.hatchCoverClearance[rowIndex] ? bay.hatchCoverClearance[rowIndex] : 0) * 10);
		var allowance = bay.availableStackSlotsHold[rowIndex] * me.meta.generalContainerHeight + clearance;
		
		if(allowance - bay.accumulatedStackHeightHold[rowIndex] < 0) {
			return true;
		} else {
			return false;
		}
	},
	
	checkTerminalOutReachValidation: function(bay, rowIndex, tierIndex, hd, terminalInfo) {
		var me = this;
		var outReachValid = true;
		
		if(terminalInfo.preferSideAlongSide !== null && terminalInfo.preferSideAlongSide !== '' 
	    	&& terminalInfo.outReach !== null && terminalInfo.outReach !== '') {
	    	
	    	if(parseInt(terminalInfo.outReach) < bay.rowEndIndex + 1) {
	    		if(terminalInfo.preferSideAlongSide === 'STB') {
	    			var outReachIdx = bay.rowEndIndex + 1 - parseInt(terminalInfo.outReach);
	    			if(rowIndex < outReachIdx) {
	    				outReachValid = false;
	    			}
	    		} else {
	    			var outReachIdx = parseInt(terminalInfo.outReach) - 1;
	    			if(rowIndex > outReachIdx) {
	    				outReachValid = false;
	    			}
	    		}
	    	}
	    }
    	
		return outReachValid;
	},
	
	checkTerminalMaxHcOnDeckValidation: function(bay, rowIndex, tierIndex, terminalInfo) {
		var me = this;
		var maxHcOnDeckValid = true;
		
		//Check MaxHcOnDeck only for Deck
		if(terminalInfo.maxHcOnDeck !== null && terminalInfo.maxHcOnDeck !== '') {
			if(parseInt(terminalInfo.maxHcOnDeck) < bay.deckTierEndIndex + 1 - bay.holdTierEndIndex ) {
				var hcHeight = me.meta.highCubeContainerHeight * parseInt(terminalInfo.maxHcOnDeck); 
				
				if(bay.accumulatedStackHeightDeck[rowIndex] +  me.meta.highCubeContainerHeight > hcHeight) {
					maxHcOnDeckValid = false;
				}
			}
		}
		
		return maxHcOnDeckValid;
	},
	
	checkMostOuterRow: function(bay, rowIdx, tierIdx, hd) {
		var me = this;
		var rows = bay.rowEndIndex + 1;
		var maxRowIdx = 0, minRowIdx = -1, isFirstSlot = false;
		
		if(bay.bayListInHatch.length === 3) {
			//Need to check entire bays in hatch
			for(var b=0;b<bay.bayListInHatch.length;b++) {
				var bay2 = me.bays.getAt(bay.bayListInHatch[b]).data;
				rows = bay2.rowEndIndex + 1;
				
				for(var i=0;i<rows;i++) {
					if(bay2.outcells[tierIdx][i].value > 0) {
						if(minRowIdx === -1) {
							minRowIdx = i;
							maxRowIdx = i;
						} else {
							if(i < minRowIdx) minRowIdx = i;
							if(i > maxRowIdx) maxRowIdx = i;
						}
						
					}
				}
			}
			
			//Check portside
			if(minRowIdx === rowIdx) return true;
			
			//Check Starboard side
			if(maxRowIdx === rowIdx) return true;
			
		} else {
			//Single Bay Check is okay
			for(var i=0;i<rows;i++) {
				if(bay.outcells[tierIdx][i].value > 0) {
					if(!isFirstSlot) {
						//Check Port side
						isFirstSlot = true;
						if(i===rowIdx) return true;
					}
					
					maxRowIdx = i;
				}
			}
			
			//Check Starboard side
			if(maxRowIdx === rowIdx) return true;
		}
		
		
		return false;
	},
	
	checkImdgViolation: function(bay, rowIdx, tierIdx, hd, planItem) {
		var me = this;
		var preBay
		var postBay
		var preBay = bay.index > 0 ? me.bays.getAt(bay.index - 1).data : null;
    	var postBay = bay.index < me.bays.length - 1 ? me.bays.getAt(bay.index + 1).data : null;
    	
    	
		me.imdgIrregularCheckSummaryStore;
		me.imdgCompanyRuleHoldExceptionStore;
		me.imdgRuleStore;
		me.ascImdgAllStore;
		
		//Clear Filter
		me.imdgIrregularCheckSummaryStore.clearFilter();
		
		//Need to check if Reefer and DG container
		//cargoType === 'RF' || cargoType === 'DG'
		if(planItem.data.rfTemp || planItem.data.imdg) {
			
			for(var r=0;r<me.imdgIrregularCheckSummaryStore.getCount();r++) {
				var rule = me.imdgIrregularCheckSummaryStore.getAt(r);
				
				if(planItem.data.imdg) {
					var planImdgItems = me.ascImdgAllStore.query('stowId', planItem.data.stowId);
				
					//General rule
					//Check IMDG Class, UNNO, Packing Group Check
					if(rule.data.ruleCode === 'GNL01') {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
							
							if(!imdgRuleItem) {
								rule.data.items.push(planItem);
								break;
							}
						}
					}
					
					//DG slotted in not allowed DG slot Violation
					if(rule.data.ruleCode === 'GNL02') {
						if(bay.outcells[tierIdx][rowIdx].value > 0 && bay.outcells[tierIdx][rowIdx].notDG === 'Y') {
							rule.data.items.push(planItem);
						}
					}
					
					
					//Company rule
					if(me.customerCode === 'MSK') {
						//No dangerous goods allowed in outboard rows in any bays except fumigated cargo
						if(rule.data.ruleCode === 'COM01') {
							if(hd === 'D') {
								//Only Fumigate UNNO = 3359 is allowed, so only check main is okay
								if(planItem.data.unno !== '3359' && me.checkMostOuterRow(bay, rowIdx, tierIdx, hd)) {
									rule.data.items.push(planItem);
								}
							}
						}
						
						//No dangerous goods allowed on bay 01, 02 in positions not protected by the break water
						if(rule.data.ruleCode === 'COM02') {
							if(hd === 'D' && bay.hatchNo === 1) {
								if(bay.name === '01' || bay.name === '02') {
									if(me.vsl.breakWaterInUse > 0) {
										if(tierIdx - bay.holdTierEndIndex > me.vsl.breakWaterHeight) {
											rule.data.items.push(planItem);
										}
										
									} else {
										rule.data.items.push(planItem);
									}
									
								}
							}
						}
						
						//No dangerous goods allowed on bay 03 in positions not protected by loaded units on bay 01
						if(rule.data.ruleCode === 'COM03') {
							if(hd === 'D' && bay.hatchNo === 1) {
								if(bay.name === '03') {
									var foreBay = me.bays.getAt(0).data;
									if(!(foreBay.outcells[tierIdx][rowIdx].value > 0 && foreBay.outcells[tierIdx][rowIdx].status === 'S')) {
										rule.data.items.push(planItem);
									}
								}
							}
						}
						
						//Temperature controlled cargo (UN3113-20 and UN3233-40) must be stowed in bottom tier, at least 4 x 20 bays away from living quarters, close to the ships side with doors accessible for jettisoning cargo
						if(rule.data.ruleCode === 'COM04') {
							//must be deck and stowed in bottom tier
							for(var i=0;i<planImdgItems.getCount();i++) {
								var patt = new RegExp(planImdgItems.getAt(i).data.unno);
								if(patt.test("3113,3114,3115,3116,3117,3118,3119,3120,3233,3234,3235,3236,3237,3238,3239,3240")) {
									if(!(hd === 'D' && me.get20BayUnitsToStructure(bay, me.vsl.deckhouseIndex) >= 4 && tierIdx === bay.deckTierStartIndex)) {
										rule.data.items.push(planItem);
										break;
									}
								}
							}
							
						}
						
						//Class 1.1 and 1.2 shall not be loaded on the forward most hatches
						if(rule.data.ruleCode === 'COM05') {
							if(hd === 'D' && bay.hatchNo === 1) {
								for(var i=0;i<planImdgItems.getCount();i++) { 
									if(/1.1|1.1A|1.1B|1.1C|1.1D|1.1E|1.1F|1.1G|1.1J|1.1L/.test(planImdgItems.getAt(i).data.imdg) 
											|| /1.2|1.2B|1.2C|1.2D|1.2E|1.2F|1.2G|1.2H|1.2J|1.2K|1.2L/.test(planImdgItems.getAt(i).data.imdg)
											) {
										
										rule.data.items.push(planItem);
										break;
									}
								}
							}
						}
						
						//During winter time no dangerous goods allowed on bay 01, 02, 03 on Atlantic and Pacific crossings
						if(rule.data.ruleCode === 'COM06') {
							if(hd === 'D' && bay.hatchNo === 1) {
								rule.data.items.push(planItem);
							}
						}
						
						//Marine pollutants shall preferably be stowed under deck – where IMDG Code stowage provisions permit for that UNNO
						if(rule.data.ruleCode === 'COM07') {
							//Prefered in Hold, so if Deck the warning
							if(hd === 'D') {
								for(var i=0;i<planImdgItems.getCount();i++) {
									if(planImdgItems.getAt(i).data.marinePollutant) {
										rule.data.items.push(planItem);
										break;
									}
								}
							}
						}
						
						//Dangerous goods on the exceptions list must not be loaded under deck (Annex 1)
						if(rule.data.ruleCode === 'COM08') {
							if(hd === 'H') {
								var isViolated = false;
								for(var i=0;i<planImdgItems.getCount();i++) {
									for(var j=0;j<me.imdgCompanyRuleHoldExceptionStore.getCount();j++) {
										if(me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.state === 'HOLD_EXCEPTION') {
											var packingGrp = planImdgItems.getAt(i).data.packingGrp.replace('1', 'I').replace('2', 'II').replace('3', 'III');
											var annexPackingGroup = me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.packingGrp.replace('1', 'I').replace('2', 'II').replace('3', 'III');
											
											if(planImdgItems.getAt(i).data.limitedQuantities === '1' || planImdgItems.getAt(i).data.limitedQuantities === 'Y') {
												//Do not check if LQ
											} else {
												if(planImdgItems.getAt(i).data.imdg === me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.imdg
														&& planImdgItems.getAt(i).data.unno === me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.unno) {
													
													if(annexPackingGroup) {
														if(packingGrp === annexPackingGroup) {
															rule.data.items.push(planItem);
															isViolated = true;
															break;
														}
													} else {
														rule.data.items.push(planItem);
														isViolated = true;
														break;
													}
												}
											}
										}
									}
									
									if(isViolated) break;
								}
							}
						}
						
						//Dangerous goods on the exceptions CLASS must not be loaded under deck
						if(rule.data.ruleCode === 'COM11') {
							if(hd === 'H') {
								var isViolated = false;
								for(var i=0;i<planImdgItems.getCount();i++) {
									var planImdgItem = planImdgItems.getAt(i);
									var imdgRuleItem = me.getImdgRuleItem(planImdgItem);
									var imdg = planImdgItem.data.imdg;
									
									if(imdgRuleItem) {
										var applyImdgNos = new Array();
										if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
											imdg = '9';
											applyImdgNos.push(imdg);
											
										} else {
											applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
										}
										for(var n=0;n<applyImdgNos.length;n++) {
											for(var j=0;j<me.imdgCompanyRuleHoldExceptionStore.getCount();j++) {
												if(me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.state === 'HOLD_CLASS_EXCEPTION') {
													if(me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.imdg === applyImdgNos[n] 
														|| me.imdgCompanyRuleHoldExceptionStore.getAt(j).data.extendClassOrDivision === applyImdgNos[n]) {
														
														rule.data.items.push(planItem);
														isViolated = true;
														break;
													}
												}
											}
											
											if(isViolated) break;
										}
									}
									
									if(isViolated) break;
								}
							}
						}
						
						//Prohibited Dangerous Goods in first fore/aft Cargo Hold of Accommodation and Engine Casing Section/Funnel",
						if(rule.data.ruleCode === 'COM09') {
							if(hd === 'H') {
								var deckHouseHoldNo = me.getCargoHoldNoByHatchNo(me.vsl.deckhouseIndex);
								var funnelHoldNo = me.getCargoHoldNoByHatchNo(me.vsl.funnelIndex);
								
								if(bay.holdNo === deckHouseHoldNo || bay.holdNo === deckHouseHoldNo+1) {
									rule.data.items.push(planItem);
								}
								
								if(bay.holdNo === funnelHoldNo || bay.holdNo === funnelHoldNo+1) {
									rule.data.items.push(planItem);
								}
							}
						}
						
						//Prohibited Dangerous Goods in first 40ft (60ft in case 20ft dedicated) fore/aft Cargo Hold of Accommodation and Engine Casing Section/Funnel",
						if(rule.data.ruleCode === 'COM10') {
							if(hd === 'D') {
								var bayUnitsToDeckhouse = me.get20BayUnitsToStructure(bay, me.vsl.deckhouseIndex);
								var bayUnitsToFunnel = me.get20BayUnitsToStructure(bay, me.vsl.funnelIndex);
								
								//Deckhouse
								if(me.vsl.deckhouseIndex > -1) {
									if(bay.hatchNo <= me.vsl.deckhouseIndex) {
										var isBay20DedicatedDeckhouse = me.isBay20DedicatedOfStructure(me.vsl.deckhouseIndex, 'F');
										var checkBayUnits = isBay20DedicatedDeckhouse ? 3 : 2;
										if(bayUnitsToDeckhouse < checkBayUnits) {
											rule.data.items.push(planItem);
										}
									} else {
										var isBay20DedicatedDeckhouse = me.isBay20DedicatedOfStructure(me.vsl.deckhouseIndex, 'A');
										var checkBayUnits = isBay20DedicatedDeckhouse ? 3 : 2;
										if(bayUnitsToDeckhouse < checkBayUnits) {
											rule.data.items.push(planItem);
										}
									}
								}
								
								//Funnel
								if(me.vsl.funnelIndex > -1) {
									if(bay.hatchNo <= me.vsl.funnelIndex) {
										var isBay20DedicatedFunnel = me.isBay20DedicatedOfStructure(me.vsl.funnelIndex, 'F');
										var checkBayUnits = isBay20DedicatedFunnel ? 3 : 2;
										if(bayUnitsToFunnel < checkBayUnits) {
											rule.data.items.push(planItem);
										}
									} else {
										var isBay20DedicatedFunnel = me.isBay20DedicatedOfStructure(me.vsl.funnelIndex, 'A');
										var checkBayUnits = isBay20DedicatedFunnel ? 3 : 2;
										if(bayUnitsToFunnel < checkBayUnits) {
											rule.data.items.push(planItem);
										}
									}
								}
							}
						}
						
					}
					
					
					//Vessel DoC Validation 
					//Hold, Deck
					if((rule.data.ruleCode === 'DOC01' && hd === 'H') || (rule.data.ruleCode === 'DOC02' && hd === 'D')) {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var isImdgAllowed = false;
							var planImdgItem = planImdgItems.getAt(i);
							var imdgRuleItem = me.getImdgRuleItem(planImdgItem);
							var imdg = planImdgItem.data.imdg;
							
							if(imdgRuleItem) {
								var applyImdgNos = new Array();
								if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
									imdg = '9';
									applyImdgNos.push(imdg);
									
								} else {
									applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
								}
								
								for(var n=0;n<applyImdgNos.length;n++) {
									var imdgDoCLength = hd === 'H' ? bay.holdImdgDoC.length : bay.deckImdgDoC.length;
									for(var j=0;j<imdgDoCLength;j++) {
										var imdgDoC = hd === 'H' ? bay.holdImdgDoC[j] : bay.deckImdgDoC[j];
										var imdgDoCImdgNo = imdgDoC.trim().replace('X', '').replace('Y', '').replace('Z', '').replace('Q', '').replace('U', '').replace('V', '');
										
										if(imdgDoCImdgNo.length < 3) {
											var value = parseFloat(imdgDoCImdgNo) > 10 ? parseFloat(imdgDoCImdgNo) / 10 : parseFloat(imdgDoCImdgNo);
											imdgDoCImdgNo = value.toString();
										} else {
											var value = parseFloat(imdgDoCImdgNo.substring(0, 2)) / 10;
											var code = imdgDoCImdgNo.substring(2, 3);
											imdgDoCImdgNo = value.toString() + code;
										}
										
										if(imdgDoCImdgNo === applyImdgNos[n]) {
											isImdgAllowed = true;
											
											var isFlashPointAllowed = true;
											var isFlashPointExist = false;
											var patt = new RegExp('X');
											var isFlashPointX = patt.test(imdgDoC);
											if(isFlashPointX) {
												isFlashPointExist = true;
												if(parseFloat(planImdgItems.getAt(i).data.flashPoint) < me.vsl.flashPoint[0]) {
													isFlashPointAllowed = false;
												}
											}
											
											var patt = new RegExp('Y');
											var isFlashPointY = patt.test(imdgDoC);
											if(isFlashPointY) {
												isFlashPointExist = true;
												if(parseFloat(planImdgItems.getAt(i).data.flashPoint) >= me.vsl.flashPoint[0] && parseFloat(planImdgItems.getAt(i).data.flashPoint) <= me.vsl.flashPoint[2]) {
													isFlashPointAllowed = false;
												}
											}
											
											var patt = new RegExp('Z');
											var isFlashPointZ = patt.test(imdgDoC);
											if(isFlashPointZ) {
												isFlashPointExist = true;
												if(parseFloat(planImdgItems.getAt(i).data.flashPoint) > me.vsl.flashPoint[2]) {
													isFlashPointAllowed = false;
												}
											}
											
											var isCargoAllowed = true;
											var isCargoExist = false;
											var patt = new RegExp('Q');
											var isCargoLiquid = patt.test(imdgDoC);
											if(isCargoLiquid) {
												isCargoExist = true;
												if(imdgRuleItem.data.state === 'Liquid') {
													isCargoAllowed = false;
												}
											}
											
											var patt = new RegExp('U');
											var isCargoSolid = patt.test(imdgDoC);
											if(isCargoSolid) {
												isCargoExist = true;
												if(imdgRuleItem.data.state === 'Solid') {
													isCargoAllowed = false;
												}
											}
											
											var patt = new RegExp('V');
											var isCargoGas = patt.test(imdgDoC);
											if(isCargoGas) {
												isCargoExist = true;
												if(imdgRuleItem.data.state === 'Gas') {
													isCargoAllowed = false;
												}
											}
											
											
											if(isFlashPointExist && isCargoExist) {
												if(!isFlashPointAllowed && !isCargoAllowed) {
													isImdgAllowed = false;
													break;
												}
											} else if(isFlashPointExist) {
												if(!isFlashPointAllowed) {
													isImdgAllowed = false;
													break;
												}
											} else if(isCargoExist) {
												if(!isCargoAllowed) {
													isImdgAllowed = false;
													break;
												}
											}
										}
									}
									
									if(!isImdgAllowed) {
										rule.data.items.push(planItem);
										break;
									}
								}
								
								if(!isImdgAllowed) {
									break;
								}
							}
						}
					}
					
					
					//IMDG Segregation
					//1. Marine Pollutant
					if(rule.data.ruleCode === 'SEG01' && hd === 'D') {
						var isImdgAllowed = true;
						for(var i=0;i<planImdgItems.getCount();i++) {
							if(planImdgItems.getAt(i).data.limitedQuantities === '1' || planImdgItems.getAt(i).data.limitedQuantities === 'Y') {
								//Do not check if LQ
							} else {
								var isMarinePollutant = false;
								if(planImdgItems.getAt(i).data.marinePollutant === 'P') {
									isMarinePollutant = true;
								} else {
									var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
									if(imdgRuleItem) {
										if(imdgRuleItem.data.marinePollutant === 'P') {
											isMarinePollutant = true;
										}
									}
									
								}
								
								if(isMarinePollutant) {
									if(me.checkMostOuterRow(bay, rowIdx, tierIdx, hd)) {
										isImdgAllowed = false;
										rule.data.items.push(planItem);
										break;
									}
								}
							}
						}
					}
					
					//2. Stowage Category
					if(rule.data.ruleCode === 'SEG02') {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var planImdgItem = planImdgItems.getAt(i);
							var imdgRuleItem = me.getImdgRuleItem(planImdgItem);
							if(imdgRuleItem) {
								if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
									//Do not check Stowage Category
								} else {
									if(imdgRuleItem.data.extendStowage && imdgRuleItem.data.extendStowageValue) {
										//extendStowageValue === 'ON' means On Deck Only
										if(imdgRuleItem.data.extendStowageValue === 'ON' && hd ==='H') {
											rule.data.items.push(planItem);
											break;
										}
										
									}
								}
							}
						}
					}
					
					//3. Shade from Radiant Heat
					if(rule.data.ruleCode === 'SEG03' && hd === 'D') {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
							if(imdgRuleItem) {
								if(planImdgItems.getAt(i).data.limitedQuantities === '1' || planImdgItems.getAt(i).data.limitedQuantities === 'Y') {
									//Do not check if LQ
								} else {
									if(imdgRuleItem.data.shadeFromRadiant === 'Y') {
										
										//1. Check Most Outer Row
										if(me.checkMostOuterRow(bay, rowIdx, tierIdx, hd)) {
											rule.data.items.push(planItem);
											break;
										} else {
											
											//Top Tier
											if(tierIdx === bay.deckTierEndIndex && bay.outcells[tierIdx][rowIdx].value > 0) {
												rule.data.items.push(planItem);
												break;
											}
											
											if(bay.pos === 'M' || (bay.pos !== 'M' && bay.bayListInHatch.length < 3)) {
												//40ft or 20ft dedicated or 2x20ft bays
												//Only check within bay
												
												//Port Side
												if(!(rowIdx - 1 >= 0 && bay.outcells[tierIdx][rowIdx - 1].value > 0 && bay.outcells[tierIdx][rowIdx - 1].status === 'S')) {
													if(bay.bayListInHatch.length < 3) {
														rule.data.items.push(planItem);
														break;
													} else {
														if(!(rowIdx - 1 >= 0 && preBay.outcells[tierIdx][rowIdx - 1].value > 0 && preBay.outcells[tierIdx][rowIdx - 1].status === 'S'
															&& postBay.outcells[tierIdx][rowIdx - 1].value > 0 && postBay.outcells[tierIdx][rowIdx - 1].status === 'S')) {
															
															rule.data.items.push(planItem);
															break;
														}
													}
												}
												
												//Starboard Side
												if(!(rowIdx + 1 <= bay.rowEndIndex && bay.outcells[tierIdx][rowIdx + 1].value > 0 && bay.outcells[tierIdx][rowIdx + 1].status === 'S')) {
													if(bay.bayListInHatch.length < 3) {
														rule.data.items.push(planItem);
														break;
													} else {
														if(!(rowIdx + 1 >= 0 && preBay.outcells[tierIdx][rowIdx + 1].value > 0 && preBay.outcells[tierIdx][rowIdx + 1].status === 'S'
															&& postBay.outcells[tierIdx][rowIdx + 1].value > 0 && postBay.outcells[tierIdx][rowIdx + 1].status === 'S')) {
															
															rule.data.items.push(planItem);
															break;
														}
													}
												}
												
												//Top Side
												if(!(tierIdx + 1 <= bay.deckTierEndIndex && bay.outcells[tierIdx + 1][rowIdx].value > 0 && bay.outcells[tierIdx + 1][rowIdx].status === 'S')) {
													if(bay.bayListInHatch.length < 3) {
														rule.data.items.push(planItem);
														break;
													} else {
														if(!(tierIdx + 1 <= bay.deckTierEndIndex && preBay.outcells[tierIdx + 1][rowIdx].value > 0 && preBay.outcells[tierIdx + 1][rowIdx].status === 'S'
															&& postBay.outcells[tierIdx + 1][rowIdx].value > 0 && postBay.outcells[tierIdx + 1][rowIdx].status === 'S')) {
															
															rule.data.items.push(planItem);
															break;
														}
													}
												}
												
											} else {
												//20ft with Normal 3 bays
												var adj40ftBay = bay.pos === 'F' ? postBay : preBay;
												
												//Port Side
												if(!((rowIdx - 1 >= 0 && bay.outcells[tierIdx][rowIdx - 1].value > 0 && bay.outcells[tierIdx][rowIdx - 1].status === 'S')
														|| (adj40ftBay.outcells[tierIdx][rowIdx - 1].value > 0 && adj40ftBay.outcells[tierIdx][rowIdx - 1].status === 'S' ))) {
													rule.data.items.push(planItem);
													break;
												}
												
												//Starboard Side
												if(!((rowIdx + 1 <= bay.rowEndIndex && bay.outcells[tierIdx][rowIdx + 1].value > 0 && bay.outcells[tierIdx][rowIdx + 1].status === 'S')
														|| (rowIdx + 1 <= adj40ftBay.rowEndIndex && adj40ftBay.outcells[tierIdx][rowIdx + 1].value > 0 && adj40ftBay.outcells[tierIdx][rowIdx + 1].status === 'S' ))) {
													rule.data.items.push(planItem);
													break;
												}
												
												//Top Side
												if(!((tierIdx + 1 <= bay.deckTierEndIndex && bay.outcells[tierIdx + 1][rowIdx].value > 0 && bay.outcells[tierIdx + 1][rowIdx].status === 'S')
														|| (tierIdx + 1 <= adj40ftBay.deckTierEndIndex && adj40ftBay.outcells[tierIdx + 1][rowIdx].value > 0 && adj40ftBay.outcells[tierIdx + 1][rowIdx].status === 'S'))) {
													rule.data.items.push(planItem);
													break;
												}
												
											}
										}
									}
								}
							}
						}
					}
					
					//4. Clear Living Quarters
					if(rule.data.ruleCode === 'SEG04') {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
							if(imdgRuleItem) {
								if(planImdgItems.getAt(i).data.limitedQuantities === '1' || planImdgItems.getAt(i).data.limitedQuantities === 'Y') {
									//Do not check if LQ
								} else {
									if(imdgRuleItem.data.clearLivingQuarters === 'Y') {
										if(me.get20BayUnitsToStructure(bay, me.vsl.deckhouseIndex) < 1) {
											rule.data.items.push(planItem);
											break;
										}
									}
								}
							}
						}
					}
					
					//5. Protected from Source of Heat
					if(rule.data.ruleCode === 'SEG05') {
						for(var i=0;i<planImdgItems.getCount();i++) {
							var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
							
							if(imdgRuleItem) {
								if(planImdgItems.getAt(i).data.limitedQuantities === '1' || planImdgItems.getAt(i).data.limitedQuantities === 'Y') {
									//Do not check if LQ
								} else {
									if(imdgRuleItem.data.sourcesOfHeat === '1') {
										//Heating Position
										if(bay.outcells[tierIdx][rowIdx].value > 0 && bay.outcells[tierIdx][rowIdx].heatPosition === 'Y') {
											rule.data.items.push(planItem);
											break;
										}
										
										//Engine Room
										if(hd === 'H' && me.vsl.engineRoomInUse > 0) {
											var engineRoomPos1BayIdx = me.getBayIndex(me.bays, me.vsl.engineRoomPosition1);
											var engineRoomPos2BayIdx = me.getBayIndex(me.bays, me.vsl.engineRoomPosition2);
											if(engineRoomPos1BayIdx > -1 && engineRoomPos2BayIdx > -1) {
												if(bay.index >= engineRoomPos1BayIdx && bay.index <= engineRoomPos2BayIdx) {
													//All tiers on top of engine room not allowed
													rule.data.items.push(planItem);
													break;
												}
											}
										}
									}
								}
							}
						}
					}
					
					//6. Segregation Group 26 - Deck Two Container Space
					//from goods of classes 2.1 and 3 when stowed on deck of a containership a minimum distance of two container spaces athwartship shall be maintained,
					//1 x 20 away for Fore, Aft
					//2 x 20 away for rows
					//Same Tier not possible
					if(rule.data.ruleCode === 'SEG06' && hd === 'D') {
						//Deck: For i = bsc(argB).dG(6) To bsc(argB).dG(7)
						//Hold: For i = bsc(argB).dG(1) + 1 To bsc(argB).dG(3)
						var resultArray = new Array();
						var startIndex = bay.dgBayIndex[6] - 1;
						var endIndex = bay.dgBayIndex[7] - 1;
//						var startIndex = bay.dgBayIndex[2] - 1;
//						var endIndex = bay.dgBayIndex[3] - 1;
//						var startIndex = bay.dgBayIndex[4] - 1;
//						var endIndex = bay.dgBayIndex[5] - 1;
						
						for(var j=startIndex;j<=endIndex;j++) {
							for(var i=0;i<planImdgItems.getCount();i++) {
								var planImdgItem = planImdgItems.getAt(i);
								var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
								var imdg = planImdgItem.data.imdg;
								
								if(imdgRuleItem) {
									if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
										//Do not check if LQ
									} else {
										//classNumberChange has priority
										if(imdgRuleItem.data.classNumberChange) {
											var value = parseFloat(imdgRuleItem.data.classNumberChange) > 10 ? parseFloat(imdgRuleItem.data.classNumberChange) / 10 : parseFloat(imdgRuleItem.data.classNumberChange);
											imdg = value.toString();
										}
										
										var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
										for(var n=0;n<applyImdgNos.length;n++) {
											//Define Result Object
											var results = me.checkSG26BayBoundary(planItem, planImdgItem, imdgRuleItem, applyImdgNos[n], hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
											if(results.length > 0) {
												resultArray.push({
													planItem: planItem,
													planImdgItem: planImdgItem,
													results: results
												});
											}
										}
									}
								}
							}
						}
						
						if(resultArray.length > 0) {
							me.setSG26RuleItem(resultArray);
						}
					}
					
					//7. Segregation Code 1, 2, 3, 4 
					//Check for all
					if(rule.data.ruleCode === 'SEG07') {
						//Deck: For i = bsc(argB).dG(6) To bsc(argB).dG(7)
						//Hold: For i = bsc(argB).dG(1) + 1 To bsc(argB).dG(3)
						var resultArray = new Array();
						for(var h=0;h<2;h++) {
							var startIndex, endIndex;
							if(h === 0) {
								if(me.getCntrTypeOpenClose(planItem) === 'OT') {
									//Open
									startIndex = bay.dgBayIndex[8] - 1;
									endIndex = bay.dgBayIndex[9] - 1;
								} else {
									//Close
									startIndex = bay.dgBayIndex[6] - 1;
									endIndex = bay.dgBayIndex[7] - 1;
								}
								
							} else {
								startIndex = bay.dgBayIndex[6] - 1;
								endIndex = bay.dgBayIndex[7] - 1;
//								startIndex = bay.dgBayIndex[2] - 1;
//								endIndex = bay.dgBayIndex[3] - 1;
							}
							
							for(var j=startIndex;j<=endIndex;j++) {
								for(var i=0;i<planImdgItems.getCount();i++) {
									var planImdgItem = planImdgItems.getAt(i);
									var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
									var imdg = planImdgItem.data.imdg;
									
									if(imdgRuleItem) {
										if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
											//Do not check if LQ
										} else {
											//classNumberChange has priority
											if(imdgRuleItem.data.classNumberChange) {
												var value = parseFloat(imdgRuleItem.data.classNumberChange) > 10 ? parseFloat(imdgRuleItem.data.classNumberChange) / 10 : parseFloat(imdgRuleItem.data.classNumberChange);
												imdg = value.toString();
											}
											
											var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
											for(var n=0;n<applyImdgNos.length;n++) {
												//Define Result Object
												var results = me.checkSegregationBayBoundary(planItem, planImdgItem, imdgRuleItem, applyImdgNos[n], hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
												if(results.length > 0) {
													resultArray.push({
														planItem: planItem,
														planImdgItem: planImdgItem,
														results: results
													});
												}
											}
										}
									}
								}
							}
						}
						
						
						if(resultArray.length > 0) {
							me.setSegregationRuleItem(resultArray);
						}
					}
				}
			
			
				if(planItem.data.rfTemp || planItem.data.imdg) {
					//Potential Sources of Ignition for Class 1 (7.1.4.4.4)
					//6 m Horizontal distance
					//Bay = fore/aft 1 bay
					//Row = 3 rows
					//Tier = cannot place any tier
					if(rule.data.ruleCode === 'SEG11') {
						//Deck: For i = bsc(argB).dG(6) To bsc(argB).dG(7)
						//Hold: For i = bsc(argB).dG(1) + 1 To bsc(argB).dG(3)
						var resultArray = new Array();
						var startIndex = bay.dgBayIndex[6] - 1;
						var endIndex = bay.dgBayIndex[7] - 1;
//						var startIndex = bay.dgBayIndex[2] - 1;
//						var endIndex = bay.dgBayIndex[3] - 1;
//						var startIndex = bay.dgBayIndex[4] - 1;
//						var endIndex = bay.dgBayIndex[5] - 1;
						
						for(var j=startIndex;j<=endIndex;j++) {
							
							if(planItem.data.rfTemp) {
								var results = me.checkSourceOfIgnition4Class1BayBoundary(true, planItem, null, null, null, hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
								resultArray.push({
									planItem: planItem,
									planImdgItem: null,
									results: results
								});
							}
							
							if(planItem.data.imdg) {
								for(var i=0;i<planImdgItems.getCount();i++) {
									var planImdgItem = planImdgItems.getAt(i);
									var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
									var imdg = planImdgItem.data.imdg;
									
									if(imdgRuleItem) {
										if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
											//Do not check if LQ
										} else {
											//classNumberChange has priority
											if(imdgRuleItem.data.classNumberChange) {
												var value = parseFloat(imdgRuleItem.data.classNumberChange) > 10 ? parseFloat(imdgRuleItem.data.classNumberChange) / 10 : parseFloat(imdgRuleItem.data.classNumberChange);
												imdg = value.toString();
											}
											
											var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
											for(var n=0;n<applyImdgNos.length;n++) {
												//Define Result Object
												var results = me.checkSourceOfIgnition4Class1BayBoundary(false, planItem, planImdgItem, imdgRuleItem, applyImdgNos[n], hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
												if(results.length > 0) {
													resultArray.push({
														planItem: planItem,
														planImdgItem: planImdgItem,
														results: results
													});
												}
											}
										}
									}
								}
							}
						}
						
						if(resultArray.length > 0) {
							me.setIgnitionRuleItem(rule, resultArray);
						}
					}
					
					
					//Potential Sources of Ignition for Flammable Gases and Liquids (7.4.2.3.2)
					//6 m Horizontal distance
					//Bay = fore/aft 1 bay
					//Row = 1 rows
					//Tier = cannot place any tier
					if(rule.data.ruleCode === 'SEG12') {
						//Deck: For i = bsc(argB).dG(6) To bsc(argB).dG(7)
						//Hold: For i = bsc(argB).dG(1) + 1 To bsc(argB).dG(3)
						var resultArray = new Array();
						var startIndex = bay.dgBayIndex[6] - 1;
						var endIndex = bay.dgBayIndex[7] - 1;
//						var startIndex = bay.dgBayIndex[2] - 1;
//						var endIndex = bay.dgBayIndex[3] - 1;
//						var startIndex = bay.dgBayIndex[4] - 1;
//						var endIndex = bay.dgBayIndex[5] - 1;
						
						for(var j=startIndex;j<=endIndex;j++) {
							
							if(planItem.data.rfTemp) {
								var results = me.checkSourceOfIgnition4FlammableBayBoundary(true, planItem, null, null, null, hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
								resultArray.push({
									planItem: planItem,
									planImdgItem: null,
									results: results
								});
							}
							
							if(planItem.data.imdg) {
								for(var i=0;i<planImdgItems.getCount();i++) {
									var planImdgItem = planImdgItems.getAt(i);
									var imdgRuleItem = me.getImdgRuleItem(planImdgItems.getAt(i));
									var imdg = planImdgItem.data.imdg;
									
									if(imdgRuleItem) {
										if(planImdgItem.data.limitedQuantities === '1' || planImdgItem.data.limitedQuantities === 'Y') {
											//Do not check if LQ
										} else {
											//classNumberChange has priority
											if(imdgRuleItem.data.classNumberChange) {
												var value = parseFloat(imdgRuleItem.data.classNumberChange) > 10 ? parseFloat(imdgRuleItem.data.classNumberChange) / 10 : parseFloat(imdgRuleItem.data.classNumberChange);
												imdg = value.toString();
											}
											
											var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(imdg, imdgRuleItem);
											for(var n=0;n<applyImdgNos.length;n++) {
												//Define Result Object
												var results = me.checkSourceOfIgnition4FlammableBayBoundary(false, planItem, planImdgItem, imdgRuleItem, applyImdgNos[n], hd, bay, rowIdx, tierIdx, me.bays.getAt(j).data);
												resultArray.push({
													planItem: planItem,
													planImdgItem: planImdgItem,
													results: results
												});
											}
										}
									}
								}
							}
						}
						
						if(resultArray.length > 0) {
							me.setIgnitionRuleItem(rule, resultArray);
						}
					}
				}
			}
			
			//Check imdgIrregularCheckSummaryStore
			for(var i=0;i<me.imdgIrregularCheckSummaryStore.getCount();i++) {
				if(me.imdgIrregularCheckSummaryStore.getAt(i).data.items.length > 0) {
					return false;
				}
			}
			
		}
		
		
		return true;
	},
	
	getCntrTypeOpenClose: function(cntrItem) {
		var me = this;
		if(/FP|FR|OS|OT|PW|SL/.test(cntrItem.data.type)) {
			return 'OT';
		}
		return 'CT';
	},
	
	getImdgNoWithSubsidiaryRisk: function(imdg, imdgRuleItem) {
		var me = this;
		var subRisks = new Array();
		
		subRisks.push(imdg);
		if(imdgRuleItem.data.subsidiaryRisk) {
			var tempSubRisks = imdgRuleItem.data.subsidiaryRisk.split('/');
			for(var i=0;i<tempSubRisks.length;i++) {
				//Subsidiary Risk there is no 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 so there is no surfix A-N
				if(parseFloat(tempSubRisks[i])) {
					subRisks.push(tempSubRisks[i]);
				}
			}
		}
		
		return subRisks;
	},
	
	getImdgRuleItem: function(imdgItem) {
		var me = this;
		var packingGrp = imdgItem.data.packingGrp.replace('1', 'I').replace('2', 'II').replace('3', 'III');
		var imdgId = imdgItem.data.imdg + ':' + imdgItem.data.unno + ':' + packingGrp;
		return me.imdgRuleStore.getById(imdgId);
	},
	
	setSegregationRuleItem: function(resultArray) {
		var me = this;
		
		for(var i=0;i<resultArray.length;i++) {
			
			var results = resultArray[i].results
			if(results.length > 0) {
				for(var j=0;j<results.length;j++) {
					var result = results[j];
					for(var k=0;k<result.targetImdgItems.length;k++) {
						var ruleCode;
						
						if(result.targetImdgItems[k].segregationClass === '1') {
							ruleCode = 'SEG07';
						} else if(result.targetImdgItems[k].segregationClass === '2') {
							ruleCode = 'SEG08';
						} else if(result.targetImdgItems[k].segregationClass === '3') {
							ruleCode = 'SEG09';
						} else if(result.targetImdgItems[k].segregationClass === '4') {
							ruleCode = 'SEG10';
						}
						
						if(ruleCode) {
							var rule = me.imdgIrregularCheckSummaryStore.findRecord('ruleCode', ruleCode);
							var planItemFlag = false;
							var targetItemFlag = false;
							for(var r=0;r<rule.data.items.length;r++) {
								if(rule.data.items[r].id === result.planItem.id) {
									planItemFlag = true;
								}
								
								if(rule.data.items[r].id === result.targetItem.id) {
									targetItemFlag = true;
								}
							}
							
							if(!planItemFlag) {
								rule.data.items.push(result.planItem);
							}
							
							if(!targetItemFlag) {
								rule.data.items.push(result.targetItem);
							}
							
							//To compare plan and target
							rule.data.details.push({
								planItem: result.planItem,
								planImdgItem: result.planImdgItem,
								targetItem: result.targetItem,
								targetImdgItem: result.targetImdgItems[k].targetImdgItem
							});
						}
					}
				}
			}
		}
	},
	
	setIgnitionRuleItem: function(rule, resultArray) {
		var me = this;
		
		for(var i=0;i<resultArray.length;i++) {
			
			var results = resultArray[i].results
			if(results.length > 0) {
				for(var j=0;j<results.length;j++) {
					var result = results[j];
					var planItemFlag = false;
					var targetItemFlag = false;
					for(var r=0;r<rule.data.items.length;r++) {
						if(rule.data.items[r].id === result.planItem.id) {
							planItemFlag = true;
						}
						
						if(rule.data.items[r].id === result.targetItem.id) {
							targetItemFlag = true;
						}
					}
					
					if(!planItemFlag) {
						rule.data.items.push(result.planItem);
					}
					
					if(!targetItemFlag) {
						rule.data.items.push(result.targetItem);
					}
					
					//No need for Ingition for cross check
//					//To compare plan and target
//					rule.data.details.push({
//						planItem: result.planItem,
//						planImdgItem: result.planImdgItem,
//						targetItem: result.targetItem,
//						targetImdgItem: result.targetImdgItem
//					});
				}
			}
		}
	},
	
	checkSegregationBayBoundary: function(planItem, planImdgItem, imdgRuleItem, imdg, hd, bay, rowIdx, tierIdx, targetBay) {
		var me = this;
		var rows = bay.rowEndIndex + 1;
		var tiers = bay.deckTierEndIndex + 1;
		var resultArray = new Array();
		
		//Check Fore Aft Bay: bay vs. targetBay
		for(var k=0;k<tiers;k++) {
			//Check Row to port side
			for(var j=0;j<rows;j++) {
				if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S') {
					var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
					if(planItem.id !== targetItem.id) {
						if(targetItem.data.imdg) {
							var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
							var result = me.checkSegregationBayRowWise(hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, targetImdgItems);
							if(result) {
								resultArray.push(result);
							}
						}
					}
				}
			}
		}
		
		//If bay and row wise are violated, then no need to check tierwise
		if(resultArray.length > 0) return resultArray;
		
		//In case bay.name === targetBay.name 
		if(bay.name === targetBay.name) {
			
			//Check inside cargos in same container 
			var targetImdgItems = me.ascImdgAllStore.query('stowId', planItem.data.stowId);
			var targetItem = planItem;
			var result = me.checkSegregationTierWise(hd, bay, planItem, planImdgItem, tierIdx, imdgRuleItem, imdg, targetItem, tierIdx, targetImdgItems);
			if(result) {
				resultArray.push(result);
			}
			
			//tiers due to check my container inside
			for(var k=tierIdx;k<tiers;k++) {
				if(bay.outcells[k][rowIdx].value > 0 && bay.outcells[k][rowIdx].status === 'S') {
					var targetItem = me.storeOutbound.getById(bay.outcells[k][rowIdx].id);
					if(targetItem.data.imdg) {
						var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
						var result = me.checkSegregationTierWise(hd, bay, planItem, planImdgItem, tierIdx, imdgRuleItem, imdg, targetItem, k, targetImdgItems);
						if(result) {
							resultArray.push(result);
						}
					}
				}
			}
			
			//Check Tier to the down tiers
			for(var k=0;k<tierIdx;k++) {
				if(bay.outcells[k][rowIdx].value > 0 && bay.outcells[k][rowIdx].status === 'S') {
					var targetItem = me.storeOutbound.getById(bay.outcells[k][rowIdx].id);
					if(targetItem.data.imdg) {
						var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
						var result = me.checkSegregationTierWise(hd, bay, planItem, planImdgItem, tierIdx, imdgRuleItem, imdg, targetItem, k, targetImdgItems);
						if(result) {
							resultArray.push(result);
						}
					}
				}
			}
		}
		
		return resultArray;
	},
	
	checkSegregationBayRowWise: function(hd, bay, planItem, planImdgItem, rowIdx, planImdgRuleItem, planImdgNo, targetBay, targetItem, targetRowIdx, targetTierIdx, targetImdgItems) {
		var me = this;
		var violatedTargetImdgItems = new Array();
		
		for(var t=0;t<targetImdgItems.getCount();t++) {
			var targetImdgItem = targetImdgItems.getAt(t);
			var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
			var targetImdgNo = targetImdgItem.data.imdg;
			
			if(targetImdgItem.data.limitedQuantities === '1' || targetImdgItem.data.limitedQuantities === 'Y') {
				//Do not check if LQ
			} else {
				if(targetImdgRuleItem && targetImdgRuleItem.data.unno != planImdgRuleItem.data.unno) {
					//classNumberChange has priority
					if(targetImdgRuleItem.data.classNumberChange) {
						var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
						targetImdgNo = value.toString();
					}
					
					//Get plan and target Segregation Class and apply bigger one
					var planClassIndex = me.getSegregationClassIndex(planImdgNo);
					var planSegregationClassArray = planImdgRuleItem.data.extendSegregation.split(',');
					
					var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(targetImdgNo, targetImdgRuleItem);
					for(var n=0;n<applyImdgNos.length;n++) {
						var targetClassIndex = me.getSegregationClassIndex(applyImdgNos[n]);
						var targetSegregationClassArray = targetImdgRuleItem.data.extendSegregation.split(',');
						var applicableImdgSegreationClass = me.getApplicableImdgSegreationClass(planSegregationClassArray[targetClassIndex], targetSegregationClassArray[planClassIndex]);
						if(applicableImdgSegreationClass === '1' || applicableImdgSegreationClass === '2' || applicableImdgSegreationClass === '3') {
							if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
								
								if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
									if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
										violatedTargetImdgItems.push({
											segregationClass: applicableImdgSegreationClass,
											targetImdgItem: targetImdgItem
										});
									}
								}
							}
						} else if(applicableImdgSegreationClass === '4') {
							if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
								if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
									violatedTargetImdgItems.push({
										segregationClass: applicableImdgSegreationClass,
										targetImdgItem: targetImdgItem
									});
								}
							}
						}
					}
					
					//extendSegregation2 - Only for 1 Away From and 2 Separated From
					if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
						//Check Plan vs. Target
						if(planImdgRuleItem.data.extendSegregation2) {
							//getExtendSegregation2Types return group and segregation class
							var extendSegregation2Types = me.getExtendSegregation2Types(planImdgRuleItem.data.extendSegregation2); 
							if(extendSegregation2Types.length > 0) {
								for(var i=0;i<extendSegregation2Types.length;i++) {
									var group = extendSegregation2Types[i].group;
									var applicableImdgSegreationClass = extendSegregation2Types[i].segregationClass;
									
									if(targetImdgRuleItem.data.cargoType1 && targetImdgRuleItem.data.cargoType1 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
									
									if(targetImdgRuleItem.data.cargoType2 && targetImdgRuleItem.data.cargoType2 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
									
									if(targetImdgRuleItem.data.cargoType3 && targetImdgRuleItem.data.cargoType3 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
								}
							}
						}
						
						//Check Target vs. Plan
						if(targetImdgRuleItem.data.extendSegregation2) {
							//getExtendSegregation2Types return group and segregation class
							var extendSegregation2Types = me.getExtendSegregation2Types(targetImdgRuleItem.data.extendSegregation2); 
							if(extendSegregation2Types.length > 0) {
								for(var i=0;i<extendSegregation2Types.length;i++) {
									var group = extendSegregation2Types[i].group;
									var applicableImdgSegreationClass = extendSegregation2Types[i].segregationClass;
									
									if(planImdgRuleItem.data.cargoType1 && planImdgRuleItem.data.cargoType1 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
									
									if(planImdgRuleItem.data.cargoType2 && planImdgRuleItem.data.cargoType2 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
									
									if(planImdgRuleItem.data.cargoType3 && planImdgRuleItem.data.cargoType3 === group) {
										if(me.isSegregationRowViolated(applicableImdgSegreationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
											if(me.isSegregationBayViolated(applicableImdgSegreationClass, hd, bay, planItem, targetBay, targetItem)) {
												violatedTargetImdgItems.push({
													segregationClass: applicableImdgSegreationClass,
													targetImdgItem: targetImdgItem
												});
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		if(violatedTargetImdgItems.length > 0) {
			return {
				hd: hd,
				planItem: planItem,
				planImdgItem: planImdgItem,
				targetItem: targetItem,
				targetImdgItems: violatedTargetImdgItems
			};			
		} else {
			return null;
		}
		
	},
	
	checkSegregationTierWise: function(hd, bay, planItem, planImdgItem, tierIdx, planImdgRuleItem, planImdgNo, targetItem, targetTierIdx, targetImdgItems) {
		var me = this;
		var violatedTargetImdgItems = new Array();
		
		for(var t=0;t<targetImdgItems.getCount();t++) {
			var targetImdgItem = targetImdgItems.getAt(t);
			var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
			var targetImdgNo = targetImdgItem.data.imdg;
			
			if(targetImdgItem.data.limitedQuantities === '1' || targetImdgItem.data.limitedQuantities === 'Y') {
				//Do not check if LQ
			} else {
				//No need to check same cargo in same container
				if(targetImdgRuleItem && targetImdgRuleItem.data.unno != planImdgRuleItem.data.unno) {
					//classNumberChange has priority
					if(targetImdgRuleItem && targetImdgRuleItem.data.classNumberChange) {
						var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
						targetImdgNo = value.toString();
					}
					
					var planClassIndex = me.getSegregationClassIndex(planImdgNo);
					var planSegregationClassArray = planImdgRuleItem.data.extendSegregation.split(',');
					var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(targetImdgNo, targetImdgRuleItem);
					for(var n=0;n<applyImdgNos.length;n++) {
						//Get plan and target Segregation Class and apply bigger one
						var targetClassIndex = me.getSegregationClassIndex(applyImdgNos[n]);
						var targetSegregationClassArray = targetImdgRuleItem.data.extendSegregation.split(',');
						var applicableImdgSegreationClass = me.getApplicableImdgSegreationClass(planSegregationClassArray[targetClassIndex], targetSegregationClassArray[planClassIndex]);
						if(applicableImdgSegreationClass === '1' || applicableImdgSegreationClass === '2' || applicableImdgSegreationClass === '3') {
							if(hd === me.getHoldDeck(bay, targetTierIdx)) {
								if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
									violatedTargetImdgItems.push({
										segregationClass: applicableImdgSegreationClass,
										targetImdgItem: targetImdgItem
									});
								}
							}
						} else if(applicableImdgSegreationClass === '4') {
							if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
								violatedTargetImdgItems.push({
									segregationClass: applicableImdgSegreationClass,
									targetImdgItem: targetImdgItem
								});
							}
						}
					}
					
					//extendSegregation2 - Only for 1 Away From and 2 Separated From
					if(hd === me.getHoldDeck(bay, targetTierIdx)) {
						//Check Plan vs. Target
						if(planImdgRuleItem.data.extendSegregation2) {
							//getExtendSegregation2Types return group and segregation class
							var extendSegregation2Types = me.getExtendSegregation2Types(planImdgRuleItem.data.extendSegregation2);
							if(extendSegregation2Types.length > 0) {
								for(var i=0;i<extendSegregation2Types.length;i++) {
									var group = extendSegregation2Types[i].group;
									var applicableImdgSegreationClass = extendSegregation2Types[i].segregationClass;
									
									if(targetImdgRuleItem.data.cargoType1 && targetImdgRuleItem.data.cargoType1 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
									
									if(targetImdgRuleItem.data.cargoType2 && targetImdgRuleItem.data.cargoType2 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
									
									if(targetImdgRuleItem.data.cargoType3 && targetImdgRuleItem.data.cargoType3 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
								}
							}
						}
						
						//Check Target vs. Plan
						if(targetImdgRuleItem.data.extendSegregation2) {
							//getExtendSegregation2Types return group and segregation class
							var extendSegregation2Types = me.getExtendSegregation2Types(targetImdgRuleItem.data.extendSegregation2);
							if(extendSegregation2Types.length > 0) {
								for(var i=0;i<extendSegregation2Types.length;i++) {
									var group = extendSegregation2Types[i].group;
									var applicableImdgSegreationClass = extendSegregation2Types[i].segregationClass;
									
									if(planImdgRuleItem.data.cargoType1 && planImdgRuleItem.data.cargoType1 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
									
									if(planImdgRuleItem.data.cargoType2 && planImdgRuleItem.data.cargoType2 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
									
									if(planImdgRuleItem.data.cargoType3 && planImdgRuleItem.data.cargoType3 === group) {
										if(me.isSegregationTierViolated(applicableImdgSegreationClass, planItem, tierIdx, targetItem, targetTierIdx)) {
											violatedTargetImdgItems.push({
												segregationClass: applicableImdgSegreationClass,
												targetImdgItem: targetImdgItem
											});
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		if(violatedTargetImdgItems.length > 0) {
			return {
				hd: hd,
				planItem: planItem,
				planImdgItem: planImdgItem,
				targetItem: targetItem,
				targetImdgItems: violatedTargetImdgItems
			};			
		} else {
			return null;
		}
	},
	
	isSegregationBayViolated: function(segregationClass, hd, bay, planItem, targetBay, targetItem) {
		var me = this;
		
		if(segregationClass === '1') {
			
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//Deck: ONE Container Space
				//Hold: ONE Container Space or one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(unit < 1) {
						if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
							return true;
						}
					}
				}
				
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Closed vs. Open
				//NO RESTRICTION
				
			} else {
				//Close vs. Close
				//NO RESTRICTION
			}
			
		} else if(segregationClass === '2') {
			
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//Deck: ONE Container Space
				//Hold: one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
				
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Closed vs. Open
				//Deck: ONE Container Space
				//Hold: ONE Container Space or one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(unit < 1) {
						if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
							return true;
						}
					}
				}
				
			} else {
				//Close vs. Close
				//Deck: ONE Container Space
				//Hold: ONE Container Space or one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(unit < 1) {
						if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
							return true;
						}
					}
				}
			}
			
		} else if(segregationClass === '3') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//Deck: two Container Space
				//Hold: two Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 2) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 2) {
						return true;
					}
				}
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Closed vs. Open
				//Deck: ONE Container Space
				//Hold: one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
				
			} else {
				//Close vs. Close
				//Deck: ONE Container Space
				//Hold: one Bulkhead
				var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
				if(hd === 'D') {
					if(unit < 1) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
			}
			
		} else if(segregationClass === '4') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//Deck: two Container Space
				//Hold: two Bulkhead
				var lcgs = me.getLcgBetweenBays(hd, bay, targetBay);
				if(hd === 'D') {
					if(lcgs < 24) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 2) {
						return true;
					}
				}
				
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Closed vs. Open
				//Deck: 24 M
				//Hold: one Bulkhead
				var lcgs = me.getLcgBetweenBays(hd, bay, targetBay);
				if(hd === 'D') {
					if(lcgs < 24) {
						return true;
					}
				} else {
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 2) {
						return true;
					}
				}
				
			} else {
				//Close vs. Close
				//Deck: 24 M
				//Hold: one Bulkhead
				var lcgs = me.getLcgBetweenBays(hd, bay, targetBay);
				if(hd === 'D') {
					if(lcgs < 24) {
						return true;
					}
				} else {
					//ONE BULKHEAD AND MINMUM HORIZONTAL DISTANCE OF 24 METRES
					if(lcgs < 24 || Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
			}
			
		}
		
		return false;
	},
	

	isSegregationRowViolated: function(segregationClass, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx) {
		var me = this;
		
		if(segregationClass === '1') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//ONE Container Space
				if(Math.abs(rowIdx - targetRowIdx) <= 1) {
					return true;
				}
				
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {	
				//Closed vs. Open
				//NO RESTRICTION
				
			} else {
				//Close vs. Close
				//NO RESTRICTION
			}
			
		} else if(segregationClass === '2') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				if(hd === 'D') {
					//Two Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 2) {
						return true;
					}
					
				} else {
					//ONE Bulkhead space
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
				
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {		
				//Closed vs. Open
				if(hd === 'D') {
					//ONE Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 1) {
						return true;
					}
					
				} else {
					//TWO Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 2) {
						return true;
					}
				}
				
			} else {
				//Close vs. Close
				//ONE Container Space
				if(Math.abs(rowIdx - targetRowIdx) <= 1) {
					return true;
				}
			}
			
		} else if(segregationClass === '3') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				if(hd === 'D') {
					//Three Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 3) {
						return true;
					}
					
				} else {
					//TWO Bulkhead space
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 2) {
						return true;
					}
				}
			
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {	
				//Closed vs. Open
				if(hd === 'D') {
					//TWO Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 2) {
						return true;
					}
					
				} else {
					//ONE Bulkhead space
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
				
			} else {
				//Close vs. Close
				if(hd === 'D') {
					//TWO Container Space
					if(Math.abs(rowIdx - targetRowIdx) <= 2) {
						return true;
					}
					
				} else {
					//ONE Bulkhead space
					if(Math.abs(parseInt(bay.holdNo) - parseInt(targetBay.holdNo)) < 1) {
						return true;
					}
				}
			}
			
		} else if(segregationClass === '4') {
			//PROHIBITED
			return true;
			
		}
		
		return false;
	},
	
	isSegregationTierViolated: function(segregationClass, planItem, tierIdx, targetItem, targetTierIdx) {
		var me = this;
		
		if(segregationClass === '1') {
			if(me.getCntrTypeOpenClose(planItem) === 'OT' && me.getCntrTypeOpenClose(targetItem) === 'OT') {
				//Open vs. Open
				//Not permitted
				return true;
			
			} else if(me.getCntrTypeOpenClose(planItem) === 'OT' || me.getCntrTypeOpenClose(targetItem) === 'OT') {	
				//Closed vs. Open
				//OPEN ON TOP OF CLOSED PERMITTED
				//Otherwise not permitted
				if(tierIdx < targetTierIdx) {
					if(/FP|FR|OS|OT|PW|SL/.test(planItem.data.type)) {
						return true;
					}
				} else {
					if(/FP|FR|OS|OT|PW|SL/.test(targetItem.data.type)) {
						return true;
					}
				}
				
			} else {
				//Close vs. Close
				//ONE ON TOP OF THE OTHER PERMITTED
				
				//In case same tier in same container then violated
				if(tierIdx === targetTierIdx) {
					return true;
				}
			}
			
		} else if(segregationClass === '2') {
			//NOT IN THE SAME VERTICAL LINE UNLESS SEGREGATED BY  A DECK
			return true;
			
		} else if(segregationClass === '3') {
			//NOT IN THE SAME VERTICAL LINE UNLESS SEGREGATED BY  A DECK
			return true;
			
		} else if(segregationClass === '4') {
			//PROHIBITED
			return true;
			
		}
		
		return false;
	},
	
	getApplicableImdgSegreationClass: function(planSegregationClass, targetSegregationClass) {
		var me = this;
		
		if(planSegregationClass === targetSegregationClass) {
			return targetSegregationClass;
		} else if(/1|2|3|4/.test(planSegregationClass) && /1|2|3|4/.test(targetSegregationClass)){
			if(parseInt(planSegregationClass) > parseInt(targetSegregationClass)) {
				return planSegregationClass;
			} else {
				return targetSegregationClass;
			}
		} else if(/1|2|3|4/.test(planSegregationClass) && !/1|2|3|4/.test(targetSegregationClass)){
			return planSegregationClass;
		} else if(!/1|2|3|4/.test(planSegregationClass) && /1|2|3|4/.test(targetSegregationClass)){
			return targetSegregationClass;
		} else {
			return targetSegregationClass;
		}
	},
	
	getSegregationClassIndex: function(imdg) {
		var me = this;
		if(/1.1|1.1A|1.1B|1.1C|1.1D|1.1E|1.1F|1.1G|1.1J|1.1L/.test(imdg)) {
			return 0;
		} else if(/1.2|1.2B|1.2C|1.2D|1.2E|1.2F|1.2G|1.2H|1.2J|1.2K|1.2L/.test(imdg)) {
			return 1;
		} else if(/1.3|1.3C|1.3G|1.3H|1.3J|1.3K|1.3L/.test(imdg)) {
			return 2;
		} else if(/1.4|1.4B|1.4C|1.4D|1.4E|1.4F|1.4G|1.4S/.test(imdg)) {
			return 3;
		} else if(/1.5|1.5D/.test(imdg)) {
			return 4;
		} else if(/1.6|1.6N/.test(imdg)) {
			return 5;
		} else if(imdg === '2') {
			return 6;
		} else if(imdg === '2.1') {
			return 7;
		} else if(imdg === '2.2') {
			return 8;
		} else if(imdg === '2.3') {
			return 9;
		} else if(imdg === '3') {
			return 10;
		} else if(imdg === '4.1') {
			return 11;
		} else if(imdg === '4.2') {
			return 12;
		} else if(imdg === '4.3') {
			return 13;
		} else if(imdg === '5.1') {
			return 14;
		} else if(imdg === '5.2') {
			return 15;
		} else if(imdg === '6.1') {
			return 16;
		} else if(imdg === '6.2') {
			return 17;
		} else if(imdg === '7') {
			return 18;
		} else if(imdg === '8') {
			return 19;
		} else if(imdg === '9') {
			return 20;
		}
	},
	
	getExtendSegregation2Types: function(extendSegregation2) {
		var me = this;
		var returnValues = new Array();
		var values = extendSegregation2.split(',');
		for(var i=0;i<values.length;i++) {
			if(/1|2|3|4/.test(values[i])) {
				returnValues.push({
					group: (i+1).toString(),
					segregationClass: values[i]
				});
			}
		}
		
		return returnValues;
	},
	
	isSegregationViolated: function(targetItem) {
		var me = this;
		if(targetItem) {
			var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
			
			for(var t=0;t<targetImdgItems.getCount();t++) {
				var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
				var targetImdgNo = targetImdgItems.getAt(t).data.imdg;
				
				//classNumberChange has priority
				if(targetImdgRuleItem && targetImdgRuleItem.data.classNumberChange) {
					var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
					targetImdgNo = value.toString();
				}
				
				if(targetImdgNo === '2.1' || targetImdgNo === '3') {
					return targetItem;
				}
			}
		}
		
		return null;
	},
	
	setSG26RuleItem: function(resultArray) {
		var me = this;
		
		for(var i=0;i<resultArray.length;i++) {
			
			var results = resultArray[i].results
			if(results.length > 0) {
				for(var j=0;j<results.length;j++) {
					
					var result = results[j];
					var ruleCode = 'SEG06';
					
					if(ruleCode) {
						var rule = me.imdgIrregularCheckSummaryStore.findRecord('ruleCode', ruleCode);
						var planItemFlag = false;
						var targetItemFlag = false;
						for(var r=0;r<rule.data.items.length;r++) {
							if(rule.data.items[r].id === result.planItem.id) {
								planItemFlag = true;
							}
							
							if(rule.data.items[r].id === result.targetItem.id) {
								targetItemFlag = true;
							}
						}
						
						if(!planItemFlag) {
							rule.data.items.push(result.planItem);
						}
						
						if(!targetItemFlag) {
							rule.data.items.push(result.targetItem);
						}
						
						for(var k=0;k<result.targetImdgItems.length;k++) {
							//To compare plan and target
							rule.data.details.push({
								planItem: result.planItem,
								planImdgItem: result.planImdgItem,
								targetItem: result.targetItem,
								targetImdgItem: result.targetImdgItems[k]
							});
						}
					}
				}
			}
		}
		
		
	},
	
	checkSG26BayBoundary: function(planItem, planImdgItem, imdgRuleItem, imdg, hd, bay, rowIdx, tierIdx, targetBay) {
		var me = this;
		var rows = bay.rowEndIndex + 1;
		var tiers = bay.deckTierEndIndex + 1;
		var resultArray = new Array();
		
		//Check Fore Aft Bay: bay vs. targetBay
		for(var k=bay.deckTierStartIndex;k<tiers;k++) {
			//Check All Row 
			for(var j=0;j<rows;j++) {
				if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S') {
					var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
					if(targetItem.data.imdg) {
						var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
						var result = me.checkSG26BayRowWise(hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, targetImdgItems);
						if(result) {
							resultArray.push(result);
						}
					}
				}
			}
		}
		
		return resultArray;
	},
	
	checkSG26BayRowWise: function(hd, bay, planItem, planImdgItem, rowIdx, planImdgRuleItem, planImdgNo, targetBay, targetItem, targetRowIdx, targetTierIdx, targetImdgItems) {
		var me = this;
		var violatedTargetImdgItems = new Array();
		
		for(var t=0;t<targetImdgItems.getCount();t++) {
			var targetImdgItem = targetImdgItems.getAt(t);
			var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
			var targetImdgNo = targetImdgItem.data.imdg;
			
			if(targetImdgItem.data.limitedQuantities === '1' || targetImdgItem.data.limitedQuantities === 'Y') {
				//Do not check if LQ
			} else {
				if(targetImdgRuleItem && targetImdgRuleItem.data.unno != planImdgRuleItem.data.unno) {
					//classNumberChange has priority
					if(targetImdgRuleItem && targetImdgRuleItem.data.classNumberChange) {
						var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
						targetImdgNo = value.toString();
					}
					
					var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(targetImdgNo, targetImdgRuleItem);
					for(var n=0;n<applyImdgNos.length;n++) {
						
						//SG26
						//TODO: value will be changed to Y -> 26 in Phase 2
						if((planImdgRuleItem.data.segregationSg === 'Y' && (applyImdgNos[n] === '2.1' || applyImdgNos[n] === '3')) 
								|| (targetImdgRuleItem.data.segregationSg === 'Y' && (planImdgNo === '2.1' || planImdgNo === '3'))) {
							
							if(me.isSG26RowViolated(hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
								if(me.isSG26BayViolated(hd, bay, planItem, targetBay, targetItem)) {
									violatedTargetImdgItems.push(targetImdgItem);
								}
							}
						}
					}
				}
			}
		}
		
		if(violatedTargetImdgItems.length > 0) {
			return {
				hd: hd,
				planItem: planItem,
				planImdgItem: planImdgItem,
				targetItem: targetItem,
				targetImdgItems: violatedTargetImdgItems
			};
		} else {
			return null;
		}
		
	},
	
	
	isSG26BayViolated: function(hd, bay, planItem, targetBay, targetItem) {
		var me = this;
		var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
		if(unit < 1) {
			return true;
		}
		
		return false;
	},
	
	isSG26RowViolated: function(hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx) {
		var me = this;
		
		
		if(Math.abs(rowIdx - targetRowIdx) <= 2) {
			return true;
		}

		return false;
	},
	
	checkSourceOfIgnition4Class1BayBoundary: function(isPlanItemReefer, planItem, planImdgItem, imdgRuleItem, imdg, hd, bay, rowIdx, tierIdx, targetBay) {
		var me = this;
		var rows = bay.rowEndIndex + 1;
		var tiers = bay.deckTierEndIndex + 1;
		var resultArray = new Array();
		
		if(isPlanItemReefer) {
			//Check DG
			//Check Fore Aft Bay: bay vs. targetBay
			for(var k=0;k<tiers;k++) {
				//Check Row to port side
				for(var j=0;j<rows;j++) {
					if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S') {
						var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
						//No check for same container
						if(planItem.id !== targetItem.id) {
							if(targetItem.data.imdg) {
								var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
								var result = me.checkSourceOfIgnition4Class1BayRowWise(isPlanItemReefer, bay.outcells[tierIdx][rowIdx], hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, targetImdgItems);
								if(result) {
									resultArray.push(result);
								}
							}
						}
					}
				}
			}
			
		} else {
			//Check Reefer
			//Check Fore Aft Bay: bay vs. targetBay
			for(var k=0;k<tiers;k++) {
				//Check Row to port side
				for(var j=0;j<rows;j++) {
					if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S' 
						&& (targetBay.outcells[k][j].reefer === 'Y' || targetBay.outcells[k][j].reeferPP === 'Y')) {
						
						var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
						//No check for same container
						if(planItem.id !== targetItem.id) {
							if(targetItem.data.rfTemp) {
								var result = me.checkSourceOfIgnition4Class1BayRowWise(isPlanItemReefer, bay.outcells[tierIdx][rowIdx], hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, null);
								if(result) {
									resultArray.push(result);
								}
							}
						}
					}
				}
			}
		}
		
		
		
		return resultArray;
	},
	
	checkSourceOfIgnition4Class1BayRowWise: function(isPlanItemReefer, planCell, hd, bay, planItem, planImdgItem, rowIdx, planImdgRuleItem, planImdgNo, targetBay, targetItem, targetRowIdx, targetTierIdx, targetImdgItems) {
		var me = this;
		
		if(isPlanItemReefer) {
			//Check DG
			if(planCell.reefer === 'Y' || planCell.reeferPP === 'Y') {
				for(var t=0;t<targetImdgItems.getCount();t++) {
					var targetImdgItem = targetImdgItems.getAt(t);
					var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
					var targetImdgNo = targetImdgItem.data.imdg;
					
					if(targetImdgItem.data.limitedQuantities === '1' || targetImdgItem.data.limitedQuantities === 'Y') {
						//Do not check if LQ
					} else {
						if(targetImdgRuleItem) {
							//classNumberChange has priority
							if(targetImdgRuleItem && targetImdgRuleItem.data.classNumberChange) {
								var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
								targetImdgNo = value.toString();
							}
							
							var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(targetImdgNo, targetImdgRuleItem);
							for(var n=0;n<applyImdgNos.length;n++) {
								if(/1.1|1.1A|1.1B|1.1C|1.1D|1.1E|1.1F|1.1G|1.1J|1.1L|1.2B|1.2C|1.2D|1.2E|1.2F|1.2G|1.2H|1.2J|1.2K|1.2L|1.3C|1.3G|1.3H|1.3J|1.3K|1.3L|1.4B|1.4C|1.4D|1.4E|1.4F|1.4G|1.4S|1.5D|1.6N/.test(applyImdgNos[n])) {
									if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
										
										if(me.isSourceOfIgnition4Class1BayViolated(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem)) {
											if(me.isSourceOfIgnition4Class1RowViolated(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
												return {
													hd: hd,
													isPlanItemReefer: isPlanItemReefer,
													planItem: planItem,
													planImdgItem: null,
													targetItem: targetItem,
													targetImdgItem: targetImdgItem
												};
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
		} else {
			if(/1.1|1.1A|1.1B|1.1C|1.1D|1.1E|1.1F|1.1G|1.1J|1.1L|1.2B|1.2C|1.2D|1.2E|1.2F|1.2G|1.2H|1.2J|1.2K|1.2L|1.3C|1.3G|1.3H|1.3J|1.3K|1.3L|1.4B|1.4C|1.4D|1.4E|1.4F|1.4G|1.4S|1.5D|1.6N/.test(planImdgNo)) {
				//Check Reefer on Target
				if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
					if(me.isSourceOfIgnition4Class1BayViolated(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem)) {
						if(me.isSourceOfIgnition4Class1RowViolated(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
							return {
								hd: hd,
								isPlanItemReefer: isPlanItemReefer,
								planItem: planItem,
								planImdgItem: planImdgItem,
								targetItem: targetItem,
								targetImdgItem: null
							};
						}
					}
				}
			}
			
		}
		
		
		return null;
	},
	
	isSourceOfIgnition4Class1BayViolated: function(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem) {
		var me = this;
		var reeferBay = targetBay;
		var imdgBay = bay;
		if(isPlanItemReefer) {
			reeferBay = bay;
			imdgBay = targetBay;
		}
		
		var reeferPlusPos = 'A';
		if(reeferBay.reeferPlugPos && reeferBay.reeferPlugPos === 1) {
			reeferPlusPos = 'F';
		}
		
		var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
		
		//1 Bay distance required from Reefer Plug
		if(reeferBay.index > imdgBay.index) {
			//Reefer Plus Pos = Fore
			if(reeferPlusPos === 'F') {
				if(unit < 1) {
					return true;
				}
			} else {
				if(unit < 0) {
					return true;
				}
			}
		} else {
			//Reefer Plus Pos = Fore
			if(reeferPlusPos === 'F') {
				if(unit < 0) {
					return true;
				}
			} else {
				if(unit < 1) {
					return true;
				}
			}
		}
		
		return false;
	},
	

	isSourceOfIgnition4Class1RowViolated: function(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx) {
		var me = this;
		
		if(Math.abs(rowIdx - targetRowIdx) <= 3) {
			return true;
		}
		
		return false;
	},
	
	checkSourceOfIgnition4FlammableBayBoundary: function(isPlanItemReefer, planItem, planImdgItem, imdgRuleItem, imdg, hd, bay, rowIdx, tierIdx, targetBay) {
		var me = this;
		var rows = bay.rowEndIndex + 1;
		var tiers = bay.deckTierEndIndex + 1;
		var resultArray = new Array();
		
		if(isPlanItemReefer) {
			//Check DG
			//Check Fore Aft Bay: bay vs. targetBay
			for(var k=0;k<tiers;k++) {
				//Check Row to port side
				for(var j=0;j<rows;j++) {
					if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S') {
						var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
						//No check for same container
						if(planItem.id !== targetItem.id) {
							if(targetItem.data.imdg) {
								var targetImdgItems = me.ascImdgAllStore.query('stowId', targetItem.data.stowId);
								var result = me.checkSourceOfIgnition4FlammableBayRowWise(isPlanItemReefer, bay.outcells[tierIdx][rowIdx], hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, targetImdgItems);
								if(result) {
									resultArray.push(result);
								}
							}
						}
					}
				}
			}
			
		} else {
			//Check Reefer
			//Check Fore Aft Bay: bay vs. targetBay
			for(var k=0;k<tiers;k++) {
				//Check Row to port side
				for(var j=0;j<rows;j++) {
					if(targetBay.outcells[k][j].value > 0 && targetBay.outcells[k][j].status === 'S' 
						&& (targetBay.outcells[k][j].reefer === 'Y' || targetBay.outcells[k][j].reeferPP === 'Y')) {
						
						var targetItem = me.storeOutbound.getById(targetBay.outcells[k][j].id);
						//No check for same container
						if(planItem.id !== targetItem.id) {
							if(targetItem.data.rfTemp) {
								var result = me.checkSourceOfIgnition4FlammableBayRowWise(isPlanItemReefer, bay.outcells[tierIdx][rowIdx], hd, bay, planItem, planImdgItem, rowIdx, imdgRuleItem, imdg, targetBay, targetItem, j, k, null);
								if(result) {
									resultArray.push(result);
								}
							}
						}
					}
				}
			}
		}
		
		return resultArray;
	},
	
	checkSourceOfIgnition4FlammableBayRowWise: function(isPlanItemReefer, planCell, hd, bay, planItem, planImdgItem, rowIdx, planImdgRuleItem, planImdgNo, targetBay, targetItem, targetRowIdx, targetTierIdx, targetImdgItems) {
		var me = this;
		
		if(isPlanItemReefer) {
			//Check DG
			if(planCell.reefer === 'Y' || planCell.reeferPP === 'Y') {
				for(var t=0;t<targetImdgItems.getCount();t++) {
					var targetImdgItem = targetImdgItems.getAt(t);
					var targetImdgRuleItem = me.getImdgRuleItem(targetImdgItems.getAt(t));
					var targetImdgNo = targetImdgItem.data.imdg;
					
					if(targetImdgItem.data.limitedQuantities === '1' || targetImdgItem.data.limitedQuantities === 'Y') {
						//Do not check if LQ
					} else {
						if(targetImdgRuleItem) {
							//classNumberChange has priority
							if(targetImdgRuleItem && targetImdgRuleItem.data.classNumberChange) {
								var value = parseFloat(targetImdgRuleItem.data.classNumberChange) > 10 ? parseFloat(targetImdgRuleItem.data.classNumberChange) / 10 : parseFloat(targetImdgRuleItem.data.classNumberChange);
								targetImdgNo = value.toString();
							}
							
							var applyImdgNos = me.getImdgNoWithSubsidiaryRisk(targetImdgNo, targetImdgRuleItem);
							for(var n=0;n<applyImdgNos.length;n++) {
								if(applyImdgNos[n] === '2.1' || applyImdgNos[n] === '3') {
									if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
										if(me.isSourceOfIgnition4FlammableBayViolated(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem)) {
											if(me.isSourceOfIgnition4FlammableRowViolated(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
												return {
													hd: hd,
													isPlanItemReefer: isPlanItemReefer,
													planItem: planItem,
													planImdgItem: null,
													targetItem: targetItem,
													targetImdgItem: targetImdgItem
												};
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
		} else {
			if(planImdgNo === '2.1' || planImdgNo === '3') {
				//Check Reefer on Target
				if(hd === me.getHoldDeck(targetBay, targetTierIdx)) {
					if(me.isSourceOfIgnition4FlammableBayViolated(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem)) {
						if(me.isSourceOfIgnition4FlammableRowViolated(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx)) {
							return {
								hd: hd,
								isPlanItemReefer: isPlanItemReefer,
								planItem: planItem,
								planImdgItem: planImdgItem,
								targetItem: targetItem,
								targetImdgItem: null
							};
						}
					}
				}
			}
		}
		
		
		return null;
	},
	
	isSourceOfIgnition4FlammableBayViolated: function(isPlanItemReefer, hd, bay, planItem, targetBay, targetItem) {
		var me = this;
		var reeferBay = targetBay;
		var imdgBay = bay;
		if(isPlanItemReefer) {
			reeferBay = bay;
			imdgBay = targetBay;
		}
		
		var reeferPlusPos = 'A';
		if(reeferBay.reeferPlugPos && reeferBay.reeferPlugPos === 1) {
			reeferPlusPos = 'F';
		}
		
		var unit = me.get20BayUnitsBetweenBays(bay, targetBay);
		
		//1 Bay distance required from Reefer Plug
		if(reeferBay.index > imdgBay.index) {
			//Reefer Plus Pos = Fore
			if(reeferPlusPos === 'F') {
				if(unit < 1) {
					return true;
				}
			} else {
				if(unit < 0) {
					return true;
				}
			}
		} else {
			//Reefer Plus Pos = Fore
			if(reeferPlusPos === 'F') {
				if(unit < 0) {
					return true;
				}
			} else {
				if(unit < 1) {
					return true;
				}
			}
		}
		
		return false;
	},
	

	isSourceOfIgnition4FlammableRowViolated: function(isPlanItemReefer, hd, bay, planItem, rowIdx, targetBay, targetItem, targetRowIdx) {
		var me = this;
		
		if(Math.abs(rowIdx - targetRowIdx) <= 1) {
			return true;
		}
		
		return false;
	},

	setQCWithPlan: function(io, hd, seq, hatch, record){
		var me = this;
		var id = record.id;
		var isSelected = false;
		hatch.data.qcs[io][hd][seq].isSelected = isSelected;
		// hatch.data.qcs[io][hd][seq].item = item;

	},

	setQCInitialSelect: function(io, hd, seq, hatch, record, isSelected){
		var me = this;
		hatch.data.qcs[io][hd][seq].id = record.id;
		// hatch.data.qcs[io][hd][seq].item = record;
		record.data.isSelected = isSelected;

	},
	
	setCellWithPlan: function(rowIndex, tierIndex, hd, bay, preBay, postBay, workMode, actionMode, record) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";

		//Calculate Accumulated Stack Weight & Height
		var offset = (actionMode !== 'erase' && workMode !== 'shift') ? 1 : -1;
		var stackMark = (actionMode !== 'erase' && workMode !== 'shift') ? 'S' : null;
		var occupiedMark = (actionMode !== 'erase' && workMode !== 'shift') ? 'X' : null;
		var id = (actionMode !== 'erase' && workMode !== 'shift') ? record.id : null;
		
		var weight = parseInt(record.data.weight) * offset;
//		var wgt2 = Math.round(weight / 2);

		var hgt = record.data.height * offset + (record.data.ovh != 0 ? record.data.ovh * offset : 0) * 10;
		var isOverStackWeight = false;
		var isOverHatchCoverClearance = false;
		var seqNo = record.data.obSeqNo;
		var size2 = record.data.size2;
		var equNo = record.data.obEquNo;
		var imdg = record.data.imdg;
		var heightCodeForDisplay = record.data.heightCodeForDisplay;
		var cargoType = record.data.cargoType;
		var state = record.data.state;
		var ibDone = record.data.ibDone;
		var obDone = record.data.obDone;
		var ibDual = record.data.ibDual;
		var obDual = record.data.obDual;
		var unno = record.data.unno;
		var cntrType = record.data.cntrType;
		var bottomText = record.data.bottomText;
		var prfObId = record.data.prfObId;

		/**
    	 * Stacking Weight Calculation Logic
    	 * 1. Separate
    	 * 		40': 0 for 20'
    	 * 		20': only heavy one among two goes to 40'
    	 * 
    	 * 2. CASP: TODO
    	 * 		40': Wgt / 2 goes to 20'
    	 * 		20': Average of two goes to 40'
    	 */
		
		//Set planning value to current Bay 
		bay.outcells[tierIndex][rowIndex].status = stackMark;
		bay.outcells[tierIndex][rowIndex].id = id;
		//edit
		bay.outcells[tierIndex][rowIndex].obSeqNo = seqNo;
		bay.outcells[tierIndex][rowIndex].size2 = size2;
		bay.outcells[tierIndex][rowIndex].obEquNo = equNo;
		bay.outcells[tierIndex][rowIndex].imdg = imdg;
		bay.outcells[tierIndex][rowIndex].heightCodeForDisplay = heightCodeForDisplay;
		bay.outcells[tierIndex][rowIndex].cargoType = cargoType;
		bay.outcells[tierIndex][rowIndex].state = state;
		bay.outcells[tierIndex][rowIndex].ibDone = ibDone;
		bay.outcells[tierIndex][rowIndex].obDone = obDone;
		bay.outcells[tierIndex][rowIndex].ibDual = ibDual;
		bay.outcells[tierIndex][rowIndex].obDual = obDual;
		bay.outcells[tierIndex][rowIndex].unno = unno;
		bay.outcells[tierIndex][rowIndex].cntrType = cntrType;
		bay.outcells[tierIndex][rowIndex].bottomText = bottomText;
		bay.outcells[tierIndex][rowIndex].cntrType = cntrType;
		bay.outcells[tierIndex][rowIndex].prfObId = prfObId;
		
		
		if(record.data.planMode !== 'A') {
			if(hd === 'H') {
				bay.accumulatedStackWeightHold[rowIndex] += weight;
				bay.accumulatedStackHeightHold[rowIndex] += hgt;
				
				//Check Irregular Hatch Cover Clearance
				if(me.checkOverHatchCoverClearance(bay, rowIndex)){
					isOverHatchCoverClearance = true;
				}
			} else {
				bay.accumulatedStackWeightDeck[rowIndex] += weight;
				bay.accumulatedStackHeightDeck[rowIndex] += hgt;
			}
			
			//Check Irregular StackWeight
			if(me.checkOverStackWeight(bay, rowIndex, hd)){
				isOverStackWeight = true;
			}
		}
		
		//Set planning value to other Bay 
		if(bayType === '40') {
			if(preBay && preBay.hatchNo === bay.hatchNo) {
				if(preBay.outcells[tierIndex][rowIndex].value > 0) {
					preBay.outcells[tierIndex][rowIndex].postId = id;
					preBay.outcells[tierIndex][rowIndex].status = occupiedMark;
					
					if(record.data.planMode !== 'A') {
						
						//Calculate Accumulated Stack Weight & Height
						if(hd === 'H') {
							preBay.accumulatedStackHeightHold[rowIndex] += hgt;
							
							//Check Irregular Hatch Cover Clearance
							if(me.checkOverHatchCoverClearance(preBay, rowIndex)){
								isOverHatchCoverClearance = true;
							}
						} else {
							preBay.accumulatedStackHeightDeck[rowIndex] += hgt;
						}
						
						//Check Irregular StackWeight
						if(me.checkOverStackWeight(preBay, rowIndex, hd)){
							isOverStackWeight = true;
						}
					}
				}
			}
			
			if(postBay && postBay.hatchNo === bay.hatchNo) {
				if(postBay.outcells[tierIndex][rowIndex].value > 0) {
					postBay.outcells[tierIndex][rowIndex].preId = id;
					postBay.outcells[tierIndex][rowIndex].status = occupiedMark;
					
					if(record.data.planMode !== 'A') {
						
						//Calculate Accumulated Stack Weight & Height
						if(hd === 'H') {
							postBay.accumulatedStackHeightHold[rowIndex] += hgt;
							
							//Check Irregular Hatch Cover Clearance
							if(me.checkOverHatchCoverClearance(postBay, rowIndex)){
								isOverHatchCoverClearance = true;
							}
						} else {
							postBay.accumulatedStackHeightDeck[rowIndex] += hgt;
						}
						
						//Check Irregular StackWeight
						if(me.checkOverStackWeight(postBay, rowIndex, hd)){
							isOverStackWeight = true;
						}
					}
				}
			}
		} else {
			
			var adjBayIndex = bay.pos === 'F' ? bay.bayListInHatch[bay.bayListInHatch.length - 1] : bay.bayListInHatch[0];
			var adjBay = me.bays.getAt(adjBayIndex).data;
			if(adjBay.outcells[tierIndex][rowIndex].value > 0 
					&& adjBay.outcells[tierIndex][rowIndex].status === 'S'
					&& me.storeOutbound.getById(adjBay.outcells[tierIndex][rowIndex].id) 
					&& me.storeOutbound.getById(adjBay.outcells[tierIndex][rowIndex].id).data.planMode !== 'A') {
				
				
				var adjWgt = parseInt(me.storeOutbound.getById(adjBay.outcells[tierIndex][rowIndex].id).data.weight);
				weight = parseInt(record.data.weight) > adjWgt ? (parseInt(record.data.weight) - adjWgt) * offset : 0;
			}
			
			if(preBay && preBay.hatchNo === bay.hatchNo) {
				if(parseInt(preBay.name) % 2 === 0){
					if(preBay.outcells[tierIndex][rowIndex].value > 0) {
						preBay.outcells[tierIndex][rowIndex].postId = id;
						
						if((actionMode !== 'erase' && workMode !== 'shift') || ((actionMode === 'erase' || workMode === 'shift') && !preBay.outcells[tierIndex][rowIndex].preId && !preBay.outcells[tierIndex][rowIndex].postId)) {
							preBay.outcells[tierIndex][rowIndex].status = occupiedMark;
						}
						
						if(record.data.planMode !== 'A') {
							
							//Calculate Accumulated Stack Weight & Height
							if(hd === 'H') {
								preBay.accumulatedStackWeightHold[rowIndex] += weight;
								
								if(!preBay.outcells[tierIndex][rowIndex].preId) {
									preBay.accumulatedStackHeightHold[rowIndex] += hgt;
									
								} else if (preBay.outcells[tierIndex][rowIndex].preId && me.storeOutbound.getById(preBay.outcells[tierIndex][rowIndex].preId).data.planMode === 'A') {
									preBay.accumulatedStackHeightHold[rowIndex] += hgt;
								}
								
//								if(!preBay.outcells[tierIndex][rowIndex].preId && !preBay.outcells[tierIndex][rowIndex].postId) {
//									preBay.accumulatedStackHeightHold[rowIndex] += hgt;
//								} else if (preBay.outcells[tierIndex][rowIndex].preId && preBay.outcells[tierIndex][rowIndex].postId) {
//									if(me.storeOutbound.getById(preBay.outcells[tierIndex][rowIndex].preId).data.planMode === 'A'
//										|| me.storeOutbound.getById(preBay.outcells[tierIndex][rowIndex].postId).data.planMode === 'A') {
//										preBay.accumulatedStackHeightHold[rowIndex] += hgt;
//									}
//								}
								
								//Check Irregular Hatch Cover Clearance
								if(me.checkOverHatchCoverClearance(preBay, rowIndex)){
									isOverHatchCoverClearance = true;
								}
							} else {
								preBay.accumulatedStackWeightDeck[rowIndex] += weight;
								
								if(!preBay.outcells[tierIndex][rowIndex].preId) {
									preBay.accumulatedStackHeightDeck[rowIndex] += hgt;
									
								} else if (preBay.outcells[tierIndex][rowIndex].preId && me.storeOutbound.getById(preBay.outcells[tierIndex][rowIndex].preId).data.planMode === 'A') {
									preBay.accumulatedStackHeightHold[rowIndex] += hgt;
								}
								
//								if((!preBay.outcells[tierIndex][rowIndex].preId && !preBay.outcells[tierIndex][rowIndex].postId) 
//										|| (preBay.outcells[tierIndex][rowIndex].preId && preBay.outcells[tierIndex][rowIndex].postId)) {
//									preBay.accumulatedStackHeightDeck[rowIndex] += hgt;
//								}
							}
							
							//Check Irregular StackWeight
							if(me.checkOverStackWeight(preBay, rowIndex, hd)){
								isOverStackWeight = true;
							}
						}
					}
				}
			}
			
			if(postBay && postBay.hatchNo === bay.hatchNo) {
				if(parseInt(postBay.name) % 2 === 0){
					if(postBay.outcells[tierIndex][rowIndex].value > 0) {
						postBay.outcells[tierIndex][rowIndex].preId = id;
						
						if((actionMode !== 'erase' && workMode !== 'shift') || ((actionMode === 'erase' || workMode === 'shift') && !postBay.outcells[tierIndex][rowIndex].preId && !postBay.outcells[tierIndex][rowIndex].postId)) {
							postBay.outcells[tierIndex][rowIndex].status = occupiedMark;
						}
						
						if(record.data.planMode !== 'A') {
							
							//Calculate Accumulated Stack Weight & Height
							if(hd === 'H') {
								postBay.accumulatedStackWeightHold[rowIndex] += weight;
								
								if(!postBay.outcells[tierIndex][rowIndex].postId) {
									postBay.accumulatedStackHeightHold[rowIndex] += hgt;
									
								} else if (postBay.outcells[tierIndex][rowIndex].postId && me.storeOutbound.getById(postBay.outcells[tierIndex][rowIndex].postId).data.planMode === 'A') {
									postBay.accumulatedStackHeightHold[rowIndex] += hgt;
								}
								
//								if(!postBay.outcells[tierIndex][rowIndex].preId && !postBay.outcells[tierIndex][rowIndex].postId) {
//									postBay.accumulatedStackHeightHold[rowIndex] += hgt;
//								} else if (postBay.outcells[tierIndex][rowIndex].preId && postBay.outcells[tierIndex][rowIndex].postId) {
//									if(me.storeOutbound.getById(postBay.outcells[tierIndex][rowIndex].preId).data.planMode === 'A'
//										|| me.storeOutbound.getById(postBay.outcells[tierIndex][rowIndex].postId).data.planMode === 'A') {
//										postBay.accumulatedStackHeightHold[rowIndex] += hgt;
//									}
//								}
								
								//Check Irregular Hatch Cover Clearance
								if(me.checkOverHatchCoverClearance(postBay, rowIndex)){
									isOverHatchCoverClearance = true;
								}
							} else {
								postBay.accumulatedStackWeightDeck[rowIndex] += weight;
								
								if(!postBay.outcells[tierIndex][rowIndex].postId){
									postBay.accumulatedStackHeightDeck[rowIndex] += hgt;
								
								} else if (postBay.outcells[tierIndex][rowIndex].postId && me.storeOutbound.getById(postBay.outcells[tierIndex][rowIndex].postId).data.planMode === 'A') {
									postBay.accumulatedStackHeightHold[rowIndex] += hgt;
								}
								
//								if((!postBay.outcells[tierIndex][rowIndex].preId && !postBay.outcells[tierIndex][rowIndex].postId) 
//										|| (postBay.outcells[tierIndex][rowIndex].preId && postBay.outcells[tierIndex][rowIndex].postId)) {
//									postBay.accumulatedStackHeightDeck[rowIndex] += hgt;
//								}
							}
							
							//Check Irregular StackWeight
							if(me.checkOverStackWeight(postBay, rowIndex, hd)){
								isOverStackWeight = true;
							}
						} 
					}
				}
			}
		}
		
		// if(isOverStackWeight) {
		// 	me.toastMessage('overstackweightwarn_msg', 'Warning', 'warn', false);
		// }
		
		// if(isOverHatchCoverClearance) {
		// 	me.toastMessage('overhatchcoverclearancewarn_msg', 'Warning', 'warn', false);
		// }
		
//		console.log(preBay.name + ': ' + preBay.accumulatedStackHeightDeck[rowIndex]);
//		console.log(bay.name + ': ' + bay.accumulatedStackHeightDeck[rowIndex]);
//		console.log(postBay.name + ': ' + postBay.accumulatedStackHeightDeck[rowIndex]);
	},
	
	/**
	 * return 
	 * 		0: No
	 * 		1: Okay
	 */
	onPlanningConstraintsCheck: function(ridx, tidx, hd, bay, preBay, postBay, workMode, planinfo, planItem, planningConstraintsStore) {
		var me = this;
		var notAllowedSmallOverLarge = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedSmallOverLarge')).data.value;
		var notAllowedAirContainer = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedAirContainer')).data.value;
		var notAllowedPODTerminalRestriction = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedPODTerminalRestriction')).data.value;
		var notAllowedPOLTerminalRestriction = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedPOLTerminalRestriction')).data.value;
		var notAllowedReeferWithoutPlug = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedReeferWithoutPlug')).data.value;
		var notAllowed45None45Slot = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowed45None45Slot')).data.value;
		var notAllowed48None48Slot = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowed48None48Slot')).data.value;
		var notAllowed53None53Slot = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowed53None53Slot')).data.value;
		var notAllowedRussianStowOnDeck = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedRussianStowOnDeck')).data.value;
		var notAllowedImdgViolation = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedImdgViolation')).data.value;
		var planSize, planPod, planPodTerminal;
		
		//Set current plan size
		planSize = parseInt(planItem.data.size);
		planPod = planItem.data.pod;
		planPodTerminal = planItem.data.podTerminal;
		
		if(tidx > 0 && tidx !== bay.deckTierStartIndex) {
			if(bay.outcells[tidx-1][ridx].value > 0) {
				if(bay.outcells[tidx-1][ridx].status === 'S') {
					var underSlotCntr = me.storeOutbound.getById(bay.outcells[tidx-1][ridx].id);
					if(underSlotCntr) {
						if(planSize < parseInt(underSlotCntr.data.size)) {
							//Not Allowed small over large 20 over 40, 40 over 45, etc.
							if(notAllowedSmallOverLarge && notAllowedSmallOverLarge === 'ON') {
								// me.toastMessage('notAllowedSmallOverLarge', 'Alert', 'alert', false);
								// return 0;
							} else if(notAllowedSmallOverLarge && notAllowedSmallOverLarge === 'WARN') {
								// me.toastMessage('notAllowedSmallOverLarge', 'Warning', 'warn', false);
							}
						}
					}
					
				} else if(bay.outcells[tidx-1][ridx].status === 'X') {
					if(planSize === 20) {
						//Not Allowed small over large 20 over 40, 40 over 45, etc.
						if(notAllowedSmallOverLarge && notAllowedSmallOverLarge === 'ON') {
							// me.toastMessage('notAllowedSmallOverLarge', 'Alert', 'alert', false);
							// return 0;
						} else if(notAllowedSmallOverLarge && notAllowedSmallOverLarge === 'WARN') {
							// me.toastMessage('notAllowedSmallOverLarge', 'Warning', 'warn', false);
						}
						
					} else {
						
						if(bay.bayListInHatch.length === 3 && (!bay.outcells[tidx-1][ridx].preId || !bay.outcells[tidx-1][ridx].postId)) {
							//No container in below
							//Not Allowed Air Container Constraint
							// if(notAllowedAirContainer && notAllowedAirContainer === 'ON') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Alert', 'alert', false);
							// 	return 0;
							// } else if(notAllowedAirContainer && notAllowedAirContainer === 'WARN') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Warning', 'warn', false);
							// }
						}
					}
					
					
				} else {
					//No container in below
					//Not Allowed Air Container Constraint

					if(tidx - 1 == bay.deckTierStartIndex || tidx - 1 == 0){
						
					}else{
						// if(notAllowedAirContainer && notAllowedAirContainer === 'ON') {
						// 	me.toastMessage('notAllowedAirContainer_msg', 'Alert', 'alert', false);
						// 	return 0;
						// } else if(notAllowedAirContainer && notAllowedAirContainer === 'WARN') {
						// 	me.toastMessage('notAllowedAirContainer_msg', 'Warning', 'warn', false);
						// }
					}

				}
			}
			
			if(planSize === 40 && bay.outcells[tidx-1][ridx].value <= 0) {
				//Air(Hanging) Container Check for Odd slot in aft/fore
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					if(preBay.outcells[tidx-1][ridx].value > 0) {
						//Air(Hanging) Container Check
						if(!preBay.outcells[tidx-1][ridx].id) {
							//No container in below
							//Not Allowed Air Container Constraint
							// if(notAllowedAirContainer && notAllowedAirContainer === 'ON') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Alert', 'alert', false);
							// 	return 0;
							// } else if(notAllowedAirContainer && notAllowedAirContainer === 'WARN') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Warning', 'warn', false);
							// }
						}
					}
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					if(postBay.outcells[tidx-1][ridx].value > 0) {
						//Air(Hanging) Container Check
						if(!postBay.outcells[tidx-1][ridx].id) {
							//No container in below
							//Not Allowed Air Container Constraint
							// if(notAllowedAirContainer && notAllowedAirContainer === 'ON') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Alert', 'alert', false);
							// 	return 0;
							// } else if(notAllowedAirContainer && notAllowedAirContainer === 'WARN') {
							// 	me.toastMessage('notAllowedAirContainer_msg', 'Warning', 'warn', false);
							// }
						}
					}
				}
			}
		}
		
		//Reefer without Plug
		// if((planItem.data.rfTemp !== null && planItem.data.rfTemp !== '') || planItem.data.cargoType === 'RF') {
		// 	if(bay.outcells[tidx][ridx].value > 0 && !bay.outcells[tidx][ridx].status) {
		// 		if (!((bay.outcells[tidx][ridx].reefer != null && bay.outcells[tidx][ridx].reefer === 'Y')
		// 			|| (bay.outcells[tidx][ridx].reeferPP != null && bay.outcells[tidx][ridx].reeferPP === 'Y'))){
		// 			if(notAllowedReeferWithoutPlug && notAllowedReeferWithoutPlug === 'ON') {
		// 				me.toastMessage('notAllowedReeferWithoutPlug_msg', 'Alert', 'alert', false);
		// 				return 0;
		// 			} else if(notAllowedReeferWithoutPlug && notAllowedReeferWithoutPlug === 'WARN') {
		// 				//Irregular Check for Reefer
		// 				planItem.data.irrReefer = 'Y';
		// 				me.toastMessage('notAllowedReeferWithoutPlug_msg', 'Warning', 'warn', false);
		// 			} else {
		// 				//Irregular Check for Reefer
		// 				planItem.data.irrReefer = 'Y';
		// 			}
		// 		}
		// 	}
		// }
		
		//notAllowedRussianStowOnDeck
		if(bay.pos === 'M' && tidx > bay.holdTierEndIndex) {
			if(bay.outcells[tidx][ridx].value > 0 && !bay.outcells[tidx][ridx].status) {
				
				//Check below is 20ft in on deck
				if(tidx-1 >= 0 && tidx-1 > bay.holdTierEndIndex &&  bay.outcells[tidx-1][ridx].value > 0 && bay.outcells[tidx-1][ridx].status === 'X') {
					//Check the LCG between 20ft bays
					if(bay.bayListInHatch.length === 3) {
						//LCG is meter, 76 is mm
						if(preBay && postBay && Math.abs(preBay.deckLcg - postBay.deckLcg) * 1000 - 6096 > 76) {
							if(notAllowedRussianStowOnDeck && notAllowedRussianStowOnDeck === 'ON') {
								// me.toastMessage('notAllowedRussianStowOnDeck_msg', 'Alert', 'alert', false);
								// return 0;
							} else if(notAllowedRussianStowOnDeck && notAllowedRussianStowOnDeck === 'WARN') {
								planItem.data.irrRussianStow = 'Y';
								// me.toastMessage('notAllowedRussianStowOnDeck_msg', 'Warning', 'warn', false);
							} else {
								planItem.data.irrRussianStow = 'Y';
							}
						}
					}
				}
			}
		}
		
		//notAllowed45None45Slot
		if(planItem.data.size === '45') {
			if(bay.outcells[tidx][ridx].value > 0 && !bay.outcells[tidx][ridx].status) {
				if (!(bay.outcells[tidx][ridx].c45ft != null && bay.outcells[tidx][ridx].c45ft === 'Y')){
					if(notAllowed45None45Slot && notAllowed45None45Slot === 'ON') {
						me.toastMessage('notAllowed45None45Slot_msg', 'Alert', 'alert', false);
						return 0;
					} else if(notAllowed45None45Slot && notAllowed45None45Slot === 'WARN') {
						planItem.data.irr45Size = 'Y';
						me.toastMessage('notAllowed45None45Slot_msg', 'Warning', 'warn', false);
					} else {
						planItem.data.irr45Size = 'Y';
					}
				}
			}
		}
		
		//notAllowed48None48Slot
		if(planItem.data.size === '48') {
			if(bay.outcells[tidx][ridx].value > 0 && !bay.outcells[tidx][ridx].status) {
				if (!(bay.outcells[tidx][ridx].c48ft != null && bay.outcells[tidx][ridx].c48ft === 'Y')){
					if(notAllowed48None48Slot && notAllowed48None48Slot === 'ON') {
						me.toastMessage('notAllowed48None48Slot_msg', 'Alert', 'alert', false);
						return 0;
					} else if(notAllowed48None48Slot && notAllowed48None48Slot === 'WARN') {
						planItem.data.irr48Size = 'Y';
						me.toastMessage('notAllowed48None48Slot_msg', 'Warning', 'warn', false);
					} else {
						planItem.data.irr48Size = 'Y';
					}
				}
			}
		}
		
		//notAllowed53None53Slot
		if(planItem.data.size === '53') {
			if(bay.outcells[tidx][ridx].value > 0 && !bay.outcells[tidx][ridx].status) {
				if (!(bay.outcells[tidx][ridx].c53ft != null && bay.outcells[tidx][ridx].c53ft === 'Y')){
					if(notAllowed53None53Slot && notAllowed53None53Slot === 'ON') {
						me.toastMessage('notAllowed53None53Slot_msg', 'Alert', 'alert', false);
						return 0;
					} else if(notAllowed53None53Slot && notAllowed53None53Slot === 'WARN') {
						planItem.data.irr53Size = 'Y';
						me.toastMessage('notAllowed53None53Slot_msg', 'Warning', 'warn', false);
					} else {
						planItem.data.irr53Size = 'Y';
					}
				}
			}
		}
		
		
		//Terminal Limits - POL
		if(notAllowedPOLTerminalRestriction && notAllowedPOLTerminalRestriction !== 'OFF') {
			var terminalInfo = me.getTerminalInfo(me.storeSvc, me.pol, me.polTerminal, me.polBerth);
			if(terminalInfo && !me.checkTerminalOutReachValidation(bay, ridx, tidx, hd, terminalInfo)) {
				if(notAllowedPOLTerminalRestriction === 'ON') {
					me.toastMessage('invalidterminaloutreachwarnpol_msg', 'Alert', 'alert', false);
					return 0;
				} else if(notAllowedPOLTerminalRestriction === 'WARN') {
					me.toastMessage('invalidterminaloutreachwarnpol_msg', 'Warning', 'warn', false);
				}
			}
			if(terminalInfo && hd === 'D' && !me.checkTerminalMaxHcOnDeckValidation(bay, ridx, tidx, terminalInfo)) {
				if(notAllowedPOLTerminalRestriction === 'ON') {
					me.toastMessage('invalidterminalmaxhcdeckwarnpol_msg', 'Alert', 'alert', false);
					return 0;
				} else if(notAllowedPOLTerminalRestriction === 'WARN') {
					me.toastMessage('invalidterminalmaxhcdeckwarnpol_msg', 'Warning', 'warn', false);
				}
			}
		}
		
		//Terminal Limits - POD
		if(notAllowedPODTerminalRestriction && notAllowedPODTerminalRestriction !== 'OFF') {
//			var berthCode = me.getBerthCode(me.storeSvc, planPod, planPodTerminal);
//			terminalInfo = me.getTerminalInfo(me.storeSvc, planPod, planPodTerminal, berthCode);
			terminalInfo = me.getTerminalInfo(me.storeSvc, planPod, planPodTerminal, planinfo.podBerth);
			if(terminalInfo && !me.checkTerminalOutReachValidation(bay, ridx, tidx, hd, terminalInfo)) {
				if(notAllowedPODTerminalRestriction === 'ON') {
					me.toastMessage('invalidterminaloutreachwarnpod_msg', 'Alert', 'alert', false);
					return 0;
				} else if(notAllowedPODTerminalRestriction === 'WARN') {
					me.toastMessage('invalidterminaloutreachwarnpod_msg', 'Warning', 'warn', false);
				}
			}
			if(terminalInfo && hd === 'D' && !me.checkTerminalMaxHcOnDeckValidation(bay, ridx, tidx, terminalInfo)) {
				if(notAllowedPODTerminalRestriction === 'ON') {
					me.toastMessage('invalidterminalmaxhcdeckwarnpod_msg', 'Alert', 'alert', false);
					return 0;
				} else if(notAllowedPODTerminalRestriction === 'WARN') {
					me.toastMessage('invalidterminalmaxhcdeckwarnpod_msg', 'Warning', 'warn', false);
				}
			}
		}
		
		//IMDG Violation Check
		//Collect Consolidate Message
		if(notAllowedImdgViolation && notAllowedImdgViolation !== 'OFF') {
			
			//Initialize imdgIrregularCheckSummaryStore
			for(var i=0;i<me.imdgIrregularCheckSummaryStore.getCount();i++) {
				me.imdgIrregularCheckSummaryStore.getAt(i).data.items = new Array();
			}
			
			if(!me.checkImdgViolation(bay, ridx, tidx, hd, planItem)) {
				//Check imdgIrregularCheckSummaryStore
				var warn = 0;
				for(var i=0;i<me.imdgIrregularCheckSummaryStore.getCount();i++) {
					if(me.imdgIrregularCheckSummaryStore.getAt(i).data.items.length > 0) {
						me.imdgViolatedCount++;
						me.imdgViolatedRules.push(me.imdgIrregularCheckSummaryStore.getAt(i).data.rule);
//						me.imdgViolatedMessage += me.imdgViolatedCount + ') ' + me.imdgIrregularCheckSummaryStore.getAt(i).data.rule + '<br>';
						me.imdgViolatedWarn += me.imdgIrregularCheckSummaryStore.getAt(i).data.level === 'warn' ? 0 : 1;
						warn += me.imdgIrregularCheckSummaryStore.getAt(i).data.level === 'warn' ? 0 : 1;
					}
				}
				
				if(notAllowedImdgViolation === 'ON') {
					if(warn > 0) {
						return 0;
					}
				}
			}
		}
		
		
//		//IMDG Violation Check
//		if(notAllowedImdgViolation && notAllowedImdgViolation !== 'OFF') {
//			//Initialize imdgIrregularCheckSummaryStore
//			for(var i=0;i<me.imdgIrregularCheckSummaryStore.getCount();i++) {
//				me.imdgIrregularCheckSummaryStore.getAt(i).data.items = new Array();
//			}
//			
//			if(!me.checkImdgViolation(bay, ridx, tidx, hd, planItem)) {
//				//Check imdgIrregularCheckSummaryStore
//				var message = '', warn = 0, count = 0;
//				for(var i=0;i<me.imdgIrregularCheckSummaryStore.getCount();i++) {
//					if(me.imdgIrregularCheckSummaryStore.getAt(i).data.items.length > 0) {
//						count++;
//						message += count + ') ' + me.imdgIrregularCheckSummaryStore.getAt(i).data.rule + '<br>';
//						warn += me.imdgIrregularCheckSummaryStore.getAt(i).data.level === 'warn' ? 0 : 1;
//					}
//				}
//				
//				if(notAllowedImdgViolation === 'ON') {
//					if(warn === 0) {
//						me.toastMessageNoDelay(message, 'Warning', 'warn', true, true);
//					} else {
//						me.toastMessageNoDelay(message, 'Alert', 'alert', true, true);
//						return 0;
//					}
//				} else if(notAllowedImdgViolation === 'WARN') {
//					me.toastMessageNoDelay(message, 'Warning', 'warn', true, true);
//				}
//			}
//		}
		
		return 1;
	},
	
	/**
	 * 
	 * For return
	 * 	0: when no slot available (remain current loadlist)
	 * 	1: when planning done or planning constraint error (move to next loadlist)
	 */
	onPlanningAssignment: function(ridx, tidx, hd, bay, preBay, postBay, workMode, actionMode, planinfo, shiftInfo, loadList, items, plannedIndex, planningConstraintsStore, bidx) {
		var me = this;
		var planned = 0;
		var lbay = bay.name;
    	var drow = hd === 'H' ? bay.holdRowNo[ridx] : bay.deckRowNo[ridx];
    	var dtier = bay.tierNo[tidx];
		var ascStore =  IoTosSpExt.getApplication().outCntr;

    	if(actionMode === 'erase') {
    		//Erase
			if(bay.outcells[tidx][ridx].value > 0) {
				if(bay.outcells[tidx][ridx].status === 'S' && bay.outcells[tidx][ridx].id !== null) {
					
					//Erase or back to loadlist is allowed for loading containers and shifting containers
					var record = me.storeOutbound.getById(bay.outcells[tidx][ridx].id);
					if (record && (record.data.pol === planinfo.pol || record.data.sftCntr === 'Y')) {
						
						var erase = false;
						var notAllowedEraseWithoutPOD = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedEraseWithoutPOD')).data.value;
						if(notAllowedEraseWithoutPOD === 'ON') {
							if (record.data.pod === planinfo.pod) {
								erase = true;
							}
						} else {
							erase = true;
						}
						
						if(erase) {
							var eraseProcessing = false;
							if(workMode === 'shift') {
								//Cancel Shift/Restow
								//Nothing to do. Cancelling process is in vessel explorer
								
							} else {
								//Palette Plan
								if(workMode === 'plan-p') {
									if (record.data.planMode === 'P' && record.data.sftCntr !== 'Y') {
										eraseProcessing = true;
									}
								} else if(workMode === 'plan-l') {
		    						if(planinfo.prePlanMode) {
		    							if (record.data.planMode === 'A' && record.data.sftCntr !== 'Y') {
											eraseProcessing = true;
										}
		    						} else {
		    							if (record.data.planMode === 'L'
		    								//in case of import edi, there is no planMode for loading containers
		    								|| !record.data.planMode
		    								|| record.data.sftCntr === 'Y') {
											eraseProcessing = true;
										}
		    						}
								}
							}
							
							if(eraseProcessing) {
								items.push(record);
								me.setCellWithPlan(ridx, tidx, hd, bay, preBay, postBay, workMode, actionMode, record);
								
								//Shifted in Stowage from Loadlist
								//Plan with LoadList by Manual
								//Plan with LoadList by Auto
								if(record.data.planMode === 'L' 
										//in case of import edi, there is no planMode for loading containers	
										|| !record.data.planMode
										|| record.data.sftCntr === 'Y') {
									record.set({
										cellPosition: null,
										lbay: null,
										drow: null,
										dtier: null,
										planMode: record.data.planMode === 'L' ? null : record.data.planMode,
										planType: null,
										operationMode: 'L',		//in case of import edi, there is no operationMode for loading containers
										irrReefer: 'N',
										irrOverStow: 'N',
										irrAir: 'N',
										irrStack: 'N',
										irr45Size: 'N',
										irrRussianStow: 'N'
									}, {
										silent: true
									});
								} else {
									me.storeOutbound.remove(record);
								}
								planned = 1;
							}
						}
					}
				}
			}				
			
    	} else {
    		
    		if(workMode === 'shift') {
    			if(bay.outcells[tidx][ridx].value > 0) {
    				if(bay.outcells[tidx][ridx].status === 'S' && bay.outcells[tidx][ridx].id !== null) {
    					//Rule: Allow shifting for POL & POD is not equal to current POL
    					if (me.storeOutbound.getById(bay.outcells[tidx][ridx].id).get('pol') !== planinfo.pol &&
    							me.storeOutbound.getById(bay.outcells[tidx][ridx].id).get('pod') !== planinfo.pol) {
    						
    						var rec = me.storeOutbound.getById(bay.outcells[tidx][ridx].id);
    						//Terminal Limits - POL
    						var notAllowedPOLTerminalRestriction = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedPOLTerminalRestriction')).data.value;
    						var planable = true;
    						if(notAllowedPOLTerminalRestriction && notAllowedPOLTerminalRestriction !== 'OFF') {
    							var terminalInfo = me.getTerminalInfo(me.storeSvc, me.pol, me.polTerminal, me.polBerth);
    							if(terminalInfo && !me.checkTerminalOutReachValidation(bay, ridx, tidx, hd, terminalInfo)) {
    								if(notAllowedPOLTerminalRestriction === 'ON') {
    									me.toastMessage('invalidterminaloutreachwarnpol_msg', 'Alert', 'alert', false);
    									planable = false;
    								} else if(notAllowedPOLTerminalRestriction === 'WARN') {
    									me.toastMessage('invalidterminaloutreachwarnpol_msg', 'Warning', 'warn', false);
    								}
    							}
    							if(terminalInfo && hd === 'D' && !me.checkTerminalMaxHcOnDeckValidation(bay, ridx, tidx, terminalInfo)) {
    								if(notAllowedPOLTerminalRestriction === 'ON') {
    									me.toastMessage('invalidterminalmaxhcdeckwarnpol_msg', 'Alert', 'alert', false);
    									planable = false;
    								} else if(notAllowedPOLTerminalRestriction === 'WARN') {
    									me.toastMessage('invalidterminalmaxhcdeckwarnpol_msg', 'Warning', 'warn', false);
    								}
    							}
    						}
    						
    						if(planable) {
    							rec.set({
    								prevPosition: rec.data.prevPosition && rec.data.prevPosition !== '' ? rec.data.prevPosition: rec.data.cellPosition,
									cellPosition: '',
									lbay: '',
									drow: '',
									dtier: '',
									operationMode: 'L',
									sftPort: planinfo.pol,	//set shift port
									sftTerminal: planinfo.polTerminal,	//set shift terminal
									sftRsn: shiftInfo.sftRsn,
									sftAcc: shiftInfo.sftAcc,
									sftType: shiftInfo.sftType	//Not In Use
    							}, {
    								silent: true
    							});
    							items.push(rec);
    							me.setCellWithPlan(ridx, tidx, hd, bay, preBay, postBay, workMode, actionMode, rec);
    						}
    						planned = 1;
    					}
    				}
    			}
    			
    		} else if(workMode === 'move') {
    			if(bay.outcells[tidx][ridx].value > 0) {
    				if(bay.outcells[tidx][ridx].status === null && bay.outcells[tidx][ridx].id === null) {
    					
    					//Move Plan
    					if(plannedIndex < loadList.length && loadList[plannedIndex].data.cellPosition) {
    						//loadList = Asc List for Move
    						//Need to clone due to later to redraw moved bays
    						var rec = loadList[plannedIndex];
    						var recClone = loadList[plannedIndex].clone();
    						
    						if(me.onPlanningConstraintsCheck(ridx, tidx, hd, bay, preBay, postBay, workMode, planinfo, rec, planningConstraintsStore)) {
    							
    							//Remove Data
    							var mRidx, mTidx, mHD, mBay, mPreBay, mPostBay;
    							var bayIndex = me.getBayIndex(me.bays, rec.data.lbay);
    							var mBay = me.bays.getAt(bayIndex).data;
    							var mPreBay = mBay.index > 0 ? me.bays.getAt(mBay.index - 1).data : null;
    							var mPostBay = mBay.index < me.bays.length - 1 ? me.bays.getAt(mBay.index + 1).data : null;
    							var mTidx = me.getTierIndex(mBay, rec.data.dtier);
    							var mRidx = me.getRowIndex(mBay, rec.data.drow, mTidx);
    							var mHD = mTidx > mBay.holdTierEndIndex ? 'D' : 'H';
    							
    							me.setCellWithPlan(mRidx, mTidx, mHD, mBay, mPreBay, mPostBay, workMode, 'erase', rec);
    							
    							//Assign New Position
    							rec.set({
    								cellPosition: lbay + drow + dtier,
    								lbay: lbay,
    								drow: drow,
    								dtier: dtier
    							}, {
									silent: true
    							});
    							me.setCellWithPlan(ridx, tidx, hd, bay, preBay, postBay, workMode, actionMode, rec);
    							items.push(recClone);	//This is required to handle move in explorer 
    						}
    						planned = 1;
    					}
    				}
    			}
    			
    		} else {
    			//Plan
    			if(bay.outcells[tidx][ridx].value > 0) {    				 					
					if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip) {
						if(nullChk_(bay.outcells[tidx][ridx].status) && nullChk_(bay.outcells[tidx][ridx].id)) {   
							//Loading List Plan
							if(plannedIndex < loadList.length /*&& !loadList[plannedIndex].data.cellPosition*/) {
								
								var rec = me.storeOutbound.getById(loadList[plannedIndex].id);
								if(rec.data.pod == planinfo.pod) {
									// rec.data.podTerminal = planinfo.podTerminal;
								}
								if(me.onPlanningConstraintsCheck(ridx, tidx, hd, bay, preBay, postBay, workMode, planinfo, rec, planningConstraintsStore)) {
									var record = ascStore.getAt(ascStore.find('cntrNo', rec.data.cntrNo));

									planned = 1;
								}
							}
						}						
					} else if(workMode === CodeConstants.OutboundPlanMode.OB_Ship) {
						//Loading List Plan
						if(plannedIndex < loadList.length /*&& !loadList[plannedIndex].data.cellPosition*/) {
														
							var rec = me.storeOutbound.getById(loadList[plannedIndex].id);
							if(rec.data.pod == planinfo.pod) {
								// rec.data.podTerminal = planinfo.podTerminal;
							}
							if(me.onPlanningConstraintsCheck(ridx, tidx, hd, bay, preBay, postBay, workMode, planinfo, rec, planningConstraintsStore)) {
								var record = ascStore.getAt(ascStore.find('cntrNo', rec.data.cntrNo));

								planned = 1;
							}
						}
					}    				
    			}
    		} 
    	}
    	
    	return planned;
	},
	
	//This is for flexibility to choose multiple bay
	onPlanning: function(planInfoStore) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;

		var x = planInfoStore.data.x;
		var y = planInfoStore.data.y;
		var width = planInfoStore.data.w;
		var height = planInfoStore.data.h;
		var workMode = planInfoStore.data.workMode;
		var actionMode = planInfoStore.data.actionMode;
		var planinfo = planInfoStore.data.planinfo;
		var shiftInfo = planInfoStore.data.shiftInfo;
		var loadList = planInfoStore.data.loadList;
		var planningConstraintsStore = planInfoStore.data.planningConstraintsStore;
		var seqNo = planInfoStore.data.seqNo;
		var loadingOption = planInfoStore.data.loadingOption;
		var direction = planInfoStore.data.direction; //left to right / right to left 마우스 방향
		var x2 = x + width;
		var y2 = y + height;
		var items = new Array();
		var lbay, drow, dtier, gsztp, weight;
		var planned = 0, plannedIndex = -1;
		var bayList = new Array();
		var shiftCancelItems = new Array();	//for cancel Shift/Restow
		var updatedItems = new Array();	//for seq
		var planSlots = new Array();
		//Initialize IMDG Violated Message
		me.imdgViolatedWarn = 0;
		me.imdgViolatedCount = 0;
		me.imdgViolatedRules = new Array();

		planInfoStore.set({
			w: x2,
			h: y2,
			planSlots: planSlots
		});

		//Make planSlot
		if(actionMode === 'erase') {
			if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode == CodeConstants.OutboundPlanMode.OB_Ship){
				planInfoStore.set('planMode', workMode);
				if(seqNo != null){
					planInfoStore.set({
						menu: 'mnuInsertSEQ',
						seqNo : seqNo
					});
					planSlots = me.onPlanSlot(planInfoStore);
				}else{
					if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip) planInfoStore.set('menu', 'menuRemoveSEQnPRF');
					else if(workMode === CodeConstants.OutboundPlanMode.OB_Ship) planInfoStore.set('menu', 'mnuRemoveSEQ');

					if(loadingOption === CodeConstants.LoadingPlanOptionType.SHIP2YARD) planInfoStore.set('menu', 'mnuRemoveSelection');
					planSlots = me.onPlanSlot(planInfoStore);
				}
			}else if(workMode === CodeConstants.OutboundPlanMode.OB_PRF){
				planInfoStore.set({
					planMode: CodeConstants.OutboundPlanMode.OB_PRF,
					menu : CodeConstants.Menu.MENU_REMOVE_PRF
				});

				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode === CodeConstants.OutboundPlanMode.OB_QC){
                planInfoStore.set({
                    planMode: CodeConstants.OutboundPlanMode.OB_QC,
                    menu: CodeConstants.Menu.MENU_REMOVE_QC
                });
				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode === CodeConstants.ROBPlanMode.RST2_TO_RST1){
                planInfoStore.set({
                    planMode: CodeConstants.ROBPlanMode.RST2_TO_RST1,
                    menu: CodeConstants.Menu.MENU_RETURN_RST
                });
				planSlots = me.onPlanSlot(planInfoStore);
			}
		}else{ //write 모드 등
			if(workMode == CodeConstants.OutboundPlanMode.OB_PRFnShip){ // Sequence 03
				planInfoStore.set('planMode', CodeConstants.OutboundPlanMode.OB_PRFnShip);
				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode == CodeConstants.OutboundPlanMode.OB_Ship){ // Sequence 03				
				planInfoStore.set('planMode', CodeConstants.OutboundPlanMode.OB_Ship);				
				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode == CodeConstants.OutboundPlanMode.OB_QC){
				planInfoStore.set('planMode', CodeConstants.OutboundPlanMode.OB_QC);
				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode == CodeConstants.OutboundPlanMode.OB_PRF){
				planInfoStore.set('planMode', CodeConstants.OutboundPlanMode.OB_PRF);
				planSlots = me.onPlanSlot(planInfoStore);
			}else if(workMode == CodeConstants.ROBPlanMode.RST2_TO_RST1){
				planInfoStore.set('planMode', CodeConstants.ROBPlanMode.RST2_TO_RST1);
				planSlots = me.onPlanSlot(planInfoStore);
			}
		}

		if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode === CodeConstants.OutboundPlanMode.OB_QC || workMode === CodeConstants.OutboundPlanMode.OB_PRF){
			// return updatedItems;
			return planSlots;
		} else {
		
			if(me.imdgViolatedCount > 0) {
				//Return IMDG Global Message
				me.imdgViolatedRules.sort();
				var uniqueImdgViolatedRules = new Array();
				me.imdgViolatedRules.forEach(function(value, index){
					if(uniqueImdgViolatedRules.indexOf(value) === -1) uniqueImdgViolatedRules.push(value);
				});
				
				var imdgViolatedMessage = '';
				for(var i=0;i<uniqueImdgViolatedRules.length;i++) {
					imdgViolatedMessage += (i+1) + ') ' + uniqueImdgViolatedRules[i] + '<br>';
				}
				
				var notAllowedImdgViolation = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedImdgViolation')).data.value;
				if(notAllowedImdgViolation === 'ON') {
					if(me.imdgViolatedWarn === 0) {
						me.toastMessageNoDelay(imdgViolatedMessage, 'Warning', 'warn', true, true);
					} else {
						me.toastMessageNoDelay(imdgViolatedMessage, 'Alert', 'alert', true, true);
					}
				} else if(notAllowedImdgViolation === 'WARN') {
					me.toastMessageNoDelay(imdgViolatedMessage, 'Warning', 'warn', true, true);
				}	
			}

			//default
			return planSlots; //items
		}
		
			
	},

	onMoveSort: function(planSlots){
		var me = this;
		planSlots.sort(function (a, b){
			if(a.y == b.y){
				return a.x > b.x ? 1 : -1;
			}
			return a.y < b.y ? 1 : -1;
		});

		return planSlots;
	},
	
	onPlanSlotSort: function(planSlots, seqMode, direction){
		var me = this;
		
		if(seqMode == 'h'){
			if(direction === '>'){
				//left to right < desc > asc
				planSlots.sort(function (a, b){
					if(a.tidx == b.tidx){
						return a.ridx > b.ridx ? 1 : -1;
					}
					return a.tidx < b.tidx ? 1 : -1;
				});
			}else if(direction === '<'){
				//right to left
				planSlots.sort(function (a, b){
					if(a.tidx == b.tidx){
						return a.ridx < b.ridx ? 1 : -1;
					}
					return a.tidx < b.tidx ? 1 : -1;
				});
			}
		}else{
			//vertical
			if(direction === '>'){
				//left to right < desc > asc
				planSlots.sort(function (a, b){
					if(a.ridx == b.ridx){
						return a.tidx > b.tidx ? 1 : -1;
					}
					return a.ridx < b.ridx ? 1 : -1;
				});
			}else if(direction === '<'){
				//right to left
				planSlots.sort(function (a, b){
					if(a.ridx == b.ridx){
						return a.tidx < b.tidx ? 1 : -1;
					}
					return a.ridx < b.ridx ? 1 : -1;
				});
			}
		}
		
		return planSlots;
	},
	
	
	onInquiringAssignment: function(ridx, tidx, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, plannedIndex) {
		var me = this;
		var planned = 0;
		var lbay = bay.name;
		var drow = hd === 'H' ? bay.holdRowNo[ridx] : bay.deckRowNo[ridx];
		var dtier = bay.tierNo[tidx];
		
		if(workMode === 'view') {
			if(bay.outcells[tidx][ridx].value > 0) {
				if(bay.outcells[tidx][ridx].status === 'S' && bay.outcells[tidx][ridx].id !== null) {
					var rec = me.storeOutbound.getById(bay.outcells[tidx][ridx].id);
					items.push(rec);
					planned = 1;
				}
			}						            		
		}else if(workMode === CodeConstants.OutboundPlanMode.OB_Ship){
			if(bay.outcells[tidx][ridx].value > 0) {
				if(bay.outcells[tidx][ridx].status === 'S' && bay.outcells[tidx][ridx].id !== null && (bay.outcells[tidx][ridx].obSeqNo == 0 || bay.outcells[tidx][ridx].obSeqNo == undefined)) {
					var rec = me.storeOutbound.getById(bay.outcells[tidx][ridx].id);
					items.push(rec);
					planned = 1;
				}
			}	
		}
		
		return planned;
	},
	
	onNewPlanningCheck: function(x, y, width, height, workMode, actionMode, planinfo, loadList, planningConstraintsStore) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var x2 = x + width;
		var y2 = y + height;
		var items = new Array();
		var lbay, drow, dtier, gsztp, weight;
		var planned = 0, plannedIndex = -1;
		var bayList = new Array();
		
		for(var i=0;i<me.bayList.length;i++){
			bay = me.bays.getAt(me.bayList[i]).data;
			if(me.viewMode === 'bay') {
				preBay = me.bayList[i] > 0 ? me.bays.getAt(me.bayList[i] - 1).data : null;
				postBay = me.bayList[i] < me.bays.length - 1 ? me.bays.getAt(me.bayList[i] + 1).data : null;
			} else {
				postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
			}
			hatchNo = bay.hatchNo
			
			if (preHatchNo !== hatchNo) {
				bayCount = 0;
				hatchCount++;
				preHatchNo = hatchNo;
				
				offsetHchX = me.getHatchX(hatchCount);
				offsetHchY = me.getHatchY(hatchCount);
			}
			
			bayCount++;
			
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			//Do not check this for inquiry
//			var planFlag = me.checkBayWithPlanCondition(bay, preBay, postBay, planinfo);
			var planFlag = true;
			if(planFlag) {
				
				//Checking bay area are in planning area
				if(((x >= bayX && x < bayX + me.meta.bayWidth) || 
						(x2 >= bayX && x2 < bayX + me.meta.bayWidth) ||
						(x <= bayX && x2 > bayX ))
					
					&& ((y >= bayY && y < bayY + me.meta.bayHeight) || 
							(y2 >= bayY && y2 < bayY + me.meta.bayHeight) ||
							(y <= bayY && y2 > bayY))) {
					
					for(var h=0;h<2;h++) {
						var hd, hq, hy1, hy2, tier, tiers;
						if(h===0) {
							//Hold
							hd = 'H';
							hy1 = me.getCellY(bay, bayY, bay.holdTierEndIndex) - me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
							hy2 = bayY + me.meta.bayHeight;
							tier = 0;
							tiers = bay.holdTierEndIndex + 1;
						} else {
							//Deck
							hd = 'D';
							hy1 = bayY;
							hy2 = me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.baseUnit * me.meta.baseHeight;
							tier = bay.deckTierStartIndex;
							tiers = bay.deckTierEndIndex + 1;
						}
						
						
						if((y>=hy1 && y<=hy2) || (y2>=hy1 && y2<=hy2) || (y<=hy1 && y2>=hy2)){
							for(var j=0;j<bay.rowEndIndex+1;j++) {
								var rx = me.getCellX(bay, bayX, j, hd);
								if((x >= rx && x < rx + me.meta.baseUnit * me.meta.baseWidth) || 
										(x2 >= rx && x2 < rx + me.meta.baseUnit * me.meta.baseWidth) ||
										(x <= rx && x2 > rx )){
									
									var accumulatedHgt = 0, hq, hgt;
									for(var k=tier;k<tiers;k++) {
										hgt = me.meta.generalContainerHeight;
										
										if(me.meta.highCubicViewMode === 'Y') {
											var cellInfo = bay.outcells[k][j];
											if(cellInfo.status === 'S') {
												//Need to check NULL due to mirror planning
												if(me.storeOutbound.getById(cellInfo.id)) {
													hgt = me.storeOutbound.getById(cellInfo.id).data.height;
												}
											} else if(cellInfo.status === 'X') {
												var id = cellInfo.postId || cellInfo.preId; 
												hgt = me.storeOutbound.getById(id).data.height;
											}
											
											//Make 0 for accumulatedHgt for start of deck
											accumulatedHgt = k === bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
											accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
										}
										
										var ty = me.getCellY(bay, bayY, k) - accumulatedHgt;
										if((y >= ty && y < ty + me.getCellHeight(hgt)) || 
												(y2 >= ty && y2 < ty + me.getCellHeight(hgt)) ||
												(y <= ty && y2 > ty)){
											
											planned += me.onPlanningAssignment(j, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, null, loadList, items, planned, planningConstraintsStore); 
											
											var is2PS = false, is2FA = false;
											if(planinfo.planMirrorMode === '2PS') {		//Port and Starboard
												is2PS = true;
											} else if(planinfo.planMirrorMode === '2FA') {	//Fore and Aft
												is2FA = true;
											} else if(planinfo.planMirrorMode === '4M') {
												is2PS = true;
												is2FA = true;
											}
											
											var bay2, preBay2, postBay2;
											bay2 = bay.pos === 'F' ? me.bays.getAt(bay.bayListInHatch[bay.bayListInHatch.length-1]).data : me.bays.getAt(bay.bayListInHatch[0]).data;
											preBay2 = bay2.index !== 0 ? me.bays.getAt(bay2.index - 1).data : null;
											postBay2 = bay2.index < me.bays.length - 1 ? me.bays.getAt(bay2.index + 1).data : null;
											
											var mirrorRidx = me.getMirrorRowIndex(hd, bay, j);
											
											if(bay.size === '20' && bay.bayListInHatch.length > 1) {	//Not 20ft dedicated bay
												//Fore/Aft
												if(is2FA) {
													planned += me.onPlanningAssignment(j, k, hd, bay2, preBay2, postBay2, workMode, actionMode, planinfo, items, planned); 
												}
												
												//Port/Star
												if(is2PS) {
													planned += me.onPlanningAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
												
												//Port/Star of Fore/Aft
												if(is2FA && is2PS) {
													planned += me.onPlanningAssignment(mirrorRidx, k, hd, bay2, preBay2, postBay2, workMode, actionMode, planinfo, items, planned);
												}
												
											} else if(bay.size === '20' && bay.bayListInHatch.length === 1) {	
												//Port/Star
												if(is2PS) {
													planned += me.onPlanningAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
												
											} else if(bay.size === '40') {
												//Port/Star
												if(is2PS) {
													planned += me.onPlanningAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
											}
										}
									}
								}
							}
						}
					}
				}
				
			}
			
			preBay = bay;
		}
		
		return planned;
	},

	onInquiringQC: function(x, y, width, height, workMode, actionMode, planinfo, isQC) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var qcPlan = null;
		var items = me.selectedQCs;
		if(width > 3 || height > 3){ //drag X click OK
			return false;
		}

		for(var i=0;i<me.bayList.length;i++){
			bay = me.bays.getAt(me.bayList[i]).data;
			hatchNo = bay.hatchNo;
			hatchCount++;
			offsetHchX = me.getHatchX(hatchCount);
			offsetHchY = me.getHatchY(hatchCount);

			var hatchHd = 0;
			var idx = -1;
			if(x >= offsetHchX && x < offsetHchX + me.meta.hatchWidth && y >= offsetHchY && y < offsetHchY + me.meta.hatchHeight / 2){
				var startY = offsetHchY + me.meta.hatchHeight/2 - me.meta.hatchQCMargin * 2;
				var deckHoldY = offsetHchY + me.meta.hatchHeight/2 - me.meta.hatchQCMargin;
				var endY = deckHoldY + me.meta.hatchQClength;
				if(y >= startY && y < deckHoldY){
					hatchHd = CodeConstants.DeckHoldType.DECK;
				}else if(y >= deckHoldY && y < endY){
					hatchHd = CodeConstants.DeckHoldType.HOLD; //hold
				}
				if(hatchHd >= CodeConstants.DeckHoldType.DECK){
					var startX = offsetHchX + me.meta.hatchQCMargin + me.meta.baseUnit;
					var idxX = offsetHchX + me.meta.hatchQCMargin + me.meta.baseUnit + me.meta.hatchQClength;
					var endX = idxX + me.meta.hatchQClength;
					if(x >= startX && x < idxX){
						idx = 0;
					}else if(x >= idxX && x < endX){
						idx = 1;
					}
					if(idx > -1){
						if(me.hatchs.getAt(hatchCount - 1).data.qcs[CodeConstants.PlanType.LOAD][hatchHd][idx].id != null){ //그래픽 화면 아이템
							//assignmentStore 내의 item
							
							qcPlan = me.storeQC.getById(me.hatchs.getAt(hatchCount - 1).data.qcs[CodeConstants.PlanType.LOAD][hatchHd][idx].id);
							qcPlan.data.isSelected = true;
							items.push(qcPlan);
							if(items.length > 0){
								for(var i = 0 ; i < items.length ; i++){
									//hatchIndex hd ioMode는 같으나 다른 qc인 경우 (seq 다름)
									//선택한 QCicon의 다른 쪽을 false 시킨다
									if(items[i].data.hatchIndex == hatchCount && items[i].data.deckHold == hatchHd &&
										items[i].data.ioMode == CodeConstants.PlanType.LOAD && items[i].data.id != qcPlan.id){
										me.storeQC.getById(items[i].id).data.isSelected = false;
										items.splice(i, 1);										
									}
								}
							}
							break;
						}						
					}
				}
			}
		}
		return items;
	},
	
	onInquiring: function(x, y, width, height, workMode, actionMode, planinfo, isQC) {
		var me = this;
		var hatchCount = 0, bayCount;
		var preHatchNo, hatchNo, bay, preBay, postBay;
		var offsetHchX = 0, offsetHchY = 0;
		var x2 = x + width;
		var y2 = y + height;
		var items = new Array();
		var lbay, drow, dtier, gsztp, weight;
		var planned = 0, plannedIndex = -1;
		var bayList = new Array();
		var planSlots = Ext.create('Ext.data.Model', {
			deckHold: null,
			hatchNo : null,
			ioType : CodeConstants.PlanType.LOAD
		});
		
		for(var i=0;i<me.bayList.length;i++){
			bay = me.bays.getAt(me.bayList[i]).data;
			if(me.viewMode === 'bay') {
				preBay = me.bayList[i] > 0 ? me.bays.getAt(me.bayList[i] - 1).data : null;
				postBay = me.bayList[i] < me.bays.length - 1 ? me.bays.getAt(me.bayList[i] + 1).data : null;
			} else {
				postBay = i < me.bayList.length - 1 ? me.bays.getAt(me.bayList[i+1]).data : null;
			}
			hatchNo = bay.hatchNo
			
			if (preHatchNo !== hatchNo) {
				bayCount = 0;
				hatchCount++;
				preHatchNo = hatchNo;
				
				offsetHchX = me.getHatchX(hatchCount);
				offsetHchY = me.getHatchY(hatchCount);
				
				//deckHold
				//index
			}
			
			bayCount++;
			
			//Bay Width, Height, X, Y
			var bayX = me.getBayX(offsetHchX, bay.name);
			var bayY = me.getBayY(offsetHchY, bay.name, bayCount);
			
			//Do not check this for inquiry
//			var planFlag = me.checkBayWithPlanCondition(bay, preBay, postBay, planinfo);
			var planFlag = true;
			if(planFlag) {
				
				//Checking bay area are in planning area
				if(((x >= bayX && x < bayX + me.meta.bayWidth) || 
						(x2 >= bayX && x2 < bayX + me.meta.bayWidth) ||
						(x <= bayX && x2 > bayX ))
					
					&& ((y >= bayY && y < bayY + me.meta.bayHeight) || 
							(y2 >= bayY && y2 < bayY + me.meta.bayHeight) ||
							(y <= bayY && y2 > bayY))) {
					
					for(var h=0;h<2;h++) {
						var hd, hq, hy1, hy2, tier, tiers;
						if(h===0) {
							//Hold
							hd = 'H';
							hy1 = me.getCellY(bay, bayY, bay.holdTierEndIndex) - me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
							hy2 = bayY + me.meta.bayHeight;
							tier = 0;
							tiers = bay.holdTierEndIndex + 1;
						} else {
							//Deck
							hd = 'D';
							hy1 = bayY;
							hy2 = me.getCellY(bay, bayY, bay.deckTierStartIndex) + me.meta.baseUnit * me.meta.baseHeight;
							tier = bay.deckTierStartIndex;
							tiers = bay.deckTierEndIndex + 1;
						}
						
						
						if((y>=hy1 && y<=hy2) || (y2>=hy1 && y2<=hy2) || (y<=hy1 && y2>=hy2)){
							for(var j=0;j<bay.rowEndIndex+1;j++) {
								var rx = me.getCellX(bay, bayX, j, hd);
								if((x >= rx && x < rx + me.meta.baseUnit * me.meta.baseWidth) || 
										(x2 >= rx && x2 < rx + me.meta.baseUnit * me.meta.baseWidth) ||
										(x <= rx && x2 > rx )){
									
									var accumulatedHgt = 0, hq, hgt;
									for(var k=tier;k<tiers;k++) {
										hgt = me.meta.generalContainerHeight;
										
										if(me.meta.highCubicViewMode === 'Y') {
											var cellInfo = bay.outcells[k][j];
											if(cellInfo.status === 'S') {
												//Need to check NULL due to mirror planning
												if(me.storeOutbound.getById(cellInfo.id)) {
													hgt = me.storeOutbound.getById(cellInfo.id).data.height;
												}
											} else if(cellInfo.status === 'X') {
												var id = cellInfo.postId || cellInfo.preId; 
												hgt = me.storeOutbound.getById(id).data.height;
											}
											
											//Make 0 for accumulatedHgt for start of deck
											accumulatedHgt = k === bay.holdTierEndIndex + 1 ? 0 : accumulatedHgt;
											accumulatedHgt += (me.getCellHeight(hgt) - me.meta.cellHeight);
										}
										
										var ty = me.getCellY(bay, bayY, k) - accumulatedHgt;
										if((y >= ty && y < ty + me.getCellHeight(hgt)) || 
												(y2 >= ty && y2 < ty + me.getCellHeight(hgt)) ||
												(y <= ty && y2 > ty)){
											
											planned += me.onInquiringAssignment(j, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
											
											//if(j == 0 && k == 0){
											// if(isQC){
											// 	console.log(hd + ' ' + bay.hatchNo);

											// 	planSlots.set({
											// 		deckHold: hd,
											// 		hatchNo : bay.hatchNo
											// 	});
											// 	return planSlots;
											// }
											var is2PS = false, is2FA = false;
											if(planinfo.planMirrorMode === '2PS') {		//Port and Starboard
												is2PS = true;
											} else if(planinfo.planMirrorMode === '2FA') {	//Fore and Aft
												is2FA = true;
											} else if(planinfo.planMirrorMode === '4M') {
												is2PS = true;
												is2FA = true;
											}
											
											var bay2, preBay2, postBay2;
											bay2 = bay.pos === 'F' ? me.bays.getAt(bay.bayListInHatch[bay.bayListInHatch.length-1]).data : me.bays.getAt(bay.bayListInHatch[0]).data;
											preBay2 = bay2.index !== 0 ? me.bays.getAt(bay2.index - 1).data : null;
											postBay2 = bay2.index < me.bays.length - 1 ? me.bays.getAt(bay2.index + 1).data : null;
											
											var mirrorRidx = me.getMirrorRowIndex(hd, bay, j);
											
											if(bay.size === '20' && bay.bayListInHatch.length > 1) {	//Not 20ft dedicated bay
												//Fore/Aft
												if(is2FA) {
													planned += me.onInquiringAssignment(j, k, hd, bay2, preBay2, postBay2, workMode, actionMode, planinfo, items, planned); 
												}
												
												//Port/Star
												if(is2PS) {
													planned += me.onInquiringAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
//													planned += me.onInquiringAssignment(bay.rowEndIndex - j, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
												
												//Port/Star of Fore/Aft
												if(is2FA && is2PS) {
													planned += me.onInquiringAssignment(mirrorRidx, k, hd, bay2, preBay2, postBay2, workMode, actionMode, planinfo, items, planned);
//													planned += me.onInquiringAssignment(bay2.rowEndIndex - j, k, hd, bay2, preBay2, postBay2, workMode, actionMode, planinfo, items, planned);
												}
												
											} else if(bay.size === '20' && bay.bayListInHatch.length === 1) {	
												//Port/Star
												if(is2PS) {
													planned += me.onInquiringAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
//													planned += me.onInquiringAssignment(bay.rowEndIndex - j, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
												
											} else if(bay.size === '40') {
												//Port/Star
												if(is2PS) {
													planned += me.onInquiringAssignment(mirrorRidx, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
//													planned += me.onInquiringAssignment(bay.rowEndIndex - j, k, hd, bay, preBay, postBay, workMode, actionMode, planinfo, items, planned); 
												}
											}
										}
									}
								}
							}
						}
					}
				}
				
			}
			
			preBay = bay;
		}
		
		return items;
	},
	
	onMouseDown: function(e, workMode) {
		var me = this;
		
		if(workMode) {
			var surface = me.getSurface('plan');
			var xy = surface.getEventXY(e),
		            x = xy[0],
		            y = xy[1];

				
			if(!me.tmpPlanSelectionSprite){
				
				
				

				me.lastEventX = x;
		        me.lastEventY = y;
		        me.mousedowned = 1;
		        
		        me.tmpPlanSelectionSprite = me.planSelectionSprite;
		        
		        me.tmpPlanSelectionSprite.setAttributes({
		            cellPosX: x,
		            cellPosY: y,
		            cellWidth: 1,
		            cellHeight: 1,
		            hidden: false
		        });
		        
		        surface.renderFrame();
		    }
        }
	},
	
	onMouseMove: function(e, workMode) {
		var me = this;
		
		if(workMode && me.mousedowned) {
			var surface = me.getSurface('plan');
			var xy = surface.getEventXY(e),
		            x = xy[0],
		            y = xy[1];
			
			
			if(me.tmpPlanSelectionSprite){
				if (me.lastEventX < x) {
		        	x1 = me.lastEventX;
		        	x2 = x;
		        } else {
		        	x1 = x;
		        	x2 = me.lastEventX;
		        }
		        
		        if (me.lastEventY < y) {
		        	y1 = me.lastEventY;
		        	y2 = y;
		        } else {
		        	y1 = y
		        	y2 = me.lastEventY;
		        }
		        
		        me.tmpPlanSelectionSprite.setAttributes({
		            cellPosX: x1,
		            cellPosY: y1,
		            cellWidth: x2 - x1,
		            cellHeight: y2 - y1,
		            direction: '>',
		            seqMode: 'h'
		        });
		        
		        surface.renderFrame();
		    }
        }
	},
	
	onMouseUp: function(planInfoStore) {
		var me = this;
		var rst = null;
		var planFlag = false;
		var direction = '';
		var e = planInfoStore.data.e;
		var workMode = planInfoStore.data.workMode;
		var actionMode = planInfoStore.data.actionMode;
		var planinfo = planInfoStore.data.planinfo;
		var shiftInfo = planInfoStore.data.shiftInfo;
		var loadList = planInfoStore.data.loadList;
		var yardCntrSelectionList = planInfoStore.data.yardCntrSelectionList;
		var planningConstraintsStore = planInfoStore.data.planningConstraintsStore;
		var seqNo = planInfoStore.data.seqNo;
		var loadingOption = planInfoStore.data.loadingOption;
		var planSize = planInfoStore.data.planSize;
		var shiftMode = planInfoStore.data.shiftMode;
		var assignmentStore = IoTosSpExt.getApplication().qcSchedule;

		if(e != null){
			var xy = me.getSurface('plan').getEventXY(e);
		
			//left to right / Sequence 드래그 할 때 자동 계산됨
			if(xy[0] > me.lastEventX){
				direction = '>';
			}else{
				direction = '<';
			}
		}else{
			direction = '>';
		}
		
		if(workMode !== 'view'){
			if(me.tmpPlanSelectionSprite){
				//Erase Mode
				//check the pol and pod
				if(actionMode === 'erase') {	
					if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode === CodeConstants.OutboundPlanMode.OB_Ship || workMode === CodeConstants.OutboundPlanMode.OB_QC || workMode === CodeConstants.OutboundPlanMode.OB_PRF || workMode === CodeConstants.ROBPlanMode.RST2_TO_RST1){ //remove sequence
						// if(e.altKey)
						planFlag = true;						
					} else {
						if(planinfo.pol && planinfo.pol !== '') {
							//Check the erase constraints
							var notAllowedEraseWithoutPOD = planningConstraintsStore.getAt(planningConstraintsStore.findExact('key','notAllowedEraseWithoutPOD')).data.value;
							if(notAllowedEraseWithoutPOD === 'ON') {
								if(planinfo.pod && planinfo.pod !== '') {
									planFlag = true;
								} else {
									me.toastMessage('needpolpodselection_msg', 'Alert', 'alert', false);
								}
							} else {
								planFlag = true;
							}
						} else {
							me.toastMessage('needpolpodselection_msg', 'Alert', 'alert', false);
						}
					}					
				} else {
					//Write Mode
					/*if(workMode === 'plan-p') { 안 씀
						if(planinfo.pol && planinfo.pol !== '' && planinfo.pod && planinfo.pod !== '') {
							planFlag = true;
						} else {
							me.toastMessage('needpolpodselection_msg', 'Alert', 'alert', false);
						}
					}else */
					if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode === CodeConstants.OutboundPlanMode.OB_Ship) { //Loadlist plan-l
						if(planinfo.prePlanMode) {
							if(planinfo.pol && planinfo.pol !== '' && planinfo.pod && planinfo.pod !== '') {
								planFlag = true;
							} else {
								me.toastMessage('needpolpodselection_msg', 'Alert', 'alert', false);
							}
						} else {
							//loadlist length 필요하지 않나? 200715 주석해제
							if(loadList.length > 0 || yardCntrSelectionList.length > 0) {
								var newLoadList = new Array();
								var sizeNotMatchList = new Array();
								var isSeq = false;
								var isSizeMatch = true;
								for(var i = 0 ; i < loadList.length ; i++){
									if(loadList[i].data.obSeqNo > 0){
										isSeq = true;
									}else{
										if(loadList[i].data.sztp != null){
											if(loadList[i].data.sztp.substring(0, 1) == planSize.toString().substring(0, 1)){
												newLoadList.push(loadList[i]);
											}else{
												// isSizeMatch = false;
												sizeNotMatchList.push(loadList[i]);
											}
										}
									}
								}
								
// 								if(isSeq == false && isSizeMatch == true){
								//일부 있을 때
								if(sizeNotMatchList.length > 0){
									if(loadList.length == sizeNotMatchList.length) MessageUtil.infoToast('Plan Size', 'plansize_msg', planSize);
									else MessageUtil.infoToast('Plan Size', 'plansizesome_msg', planSize);
								}

                                if(newLoadList.length > 0){
									
                                	x = me.tmpPlanSelectionSprite.attr.cellPosX;
									y= me.tmpPlanSelectionSprite.attr.cellPosY;
									w = me.tmpPlanSelectionSprite.attr.cellWidth;
									h = me.tmpPlanSelectionSprite.attr.cellHeight;

									var items = me.onNewPlanningCheck(x, y, w, h, workMode, actionMode, planinfo, newLoadList, planningConstraintsStore);

									if(items != 0) planFlag = true;
									planInfoStore.set('loadList', newLoadList);
                                }else{
									if(yardCntrSelectionList.length > 0)
										planFlag = true;
                                }
								
							} else {
								if(loadingOption == CodeConstants.LoadingPlanOptionType.YARD2SHIP){
								    me.fireEvent('toastMessage', 'noloadinglistnoplan_msg');
								}else if(loadingOption == CodeConstants.LoadingPlanOptionType.SHIP2YARD){
									planFlag = true;
                                }
							}
						}
					} else if(workMode === CodeConstants.OutboundPlanMode.OB_PRFnShip || workMode === CodeConstants.OutboundPlanMode.OB_Ship || workMode === CodeConstants.ROBPlanMode.RST2_TO_RST1) {
						planFlag = true;
					} else if(workMode === CodeConstants.OutboundPlanMode.OB_PRF){
						if(planinfo.pod && planinfo.pod !== '') {
							planFlag = true;
						} else {
							me.toastMessage('needpolpodselection_msg', 'Alert', 'alert', false);
						}
					} else if(workMode === CodeConstants.OutboundPlanMode.OB_QC) {
						if(actionMode == 'erase'){
                            planFlag = true;
						}else{
							planFlag = true;
							// var index = assignmentStore.findBy((record) => record.get('isSelected') == true);
							// if(index > -1){
							// 	qcInfo = assignmentStore.getAt(index);
							// 	planFlag = true;
							// }else{
								
							// }
						}
					}
				}

				if(planFlag) {
					planInfoStore.set({
						planinfo: planinfo,
						direction: direction,
						x: me.tmpPlanSelectionSprite.attr.cellPosX,
						y: me.tmpPlanSelectionSprite.attr.cellPosY,
						w: me.tmpPlanSelectionSprite.attr.cellWidth,
						h: me.tmpPlanSelectionSprite.attr.cellHeight,
						// qcInfo: qcInfo
					});

					var items = me.onPlanning(planInfoStore);
					if(items.length > 0){
						if(!items[0].isOk){
							if(items[0].message){
								me.fireEvent('toastMessage', items[0].message);
							}else{
								// me.toastMessage('notallowedplanposition_msg', 'Alert', 'alert', false);
							}
							items = null;
						}else{
							//isOk true
						}
					}	
					
					me.onMouseLeave(e, workMode);
					return items; //Loadlist, Sequence > 이후 VesselExplorerController의 onSyncHandler로 감
				}
				me.onMouseLeave(e, workMode);
			}
			
		} else if(workMode === 'view') {
			var x, y, w, h;
			if(me.tmpPlanSelectionSprite){
				x = me.tmpPlanSelectionSprite.attr.cellPosX;
				y = me.tmpPlanSelectionSprite.attr.cellPosY;
				w = me.tmpPlanSelectionSprite.attr.cellWidth;
				h = me.tmpPlanSelectionSprite.attr.cellHeight;
				
				var items = me.onInquiring(x, y, w, h, workMode, actionMode, planinfo);

				//When assign, need to have both assign and select
				if(!(e.button === 0 && !e.altKey)) {
					me.onMouseLeave(e, workMode);
				}
				return items;
			}
		}

		if(workMode === CodeConstants.OutboundPlanMode.OB_Ship){
			if(loadingOption == CodeConstants.LoadingPlanOptionType.SHIP2YARD){
				if(loadList.length > 0) {
					var newLoadList = new Array();
					var sizeNotMatchList = new Array();
					var isSeq = false;
					var isSizeMatch = true;
					for(var i = 0 ; i < loadList.length ; i++){
						if(loadList[i].data.obSeqNo > 0){
							isSeq = true;
						}else{
							if(loadList[i].data.sztp != null){
								if(loadList[i].data.sztp.substring(0, 1) == planSize.toString().substring(0, 1)){
									newLoadList.push(loadList[i]);
								}else{
									// isSizeMatch = false;
									sizeNotMatchList.push(loadList[i]);
								}
							}
						}
					}
					
// 					if(isSeq == false && isSizeMatch == true){
					//일부 있을 때
					if(sizeNotMatchList.length > 0){
						if(loadList.length == sizeNotMatchList.length) MessageUtil.infoToast('Plan Size', 'plansize_msg', planSize);
						else MessageUtil.infoToast('Plan Size', 'plansizesome_msg', planSize);
					}

					if(newLoadList.length > 0){
						planFlag = true;
						planInfoStore.set('loadList', newLoadList);
					}					
				}

				if(planFlag) {
					planInfoStore.set({
						planinfo: planinfo,
						direction: direction
					});

					var items = me.onPlanning(planInfoStore);
					if(items.length > 0){
						if(!items[0].isOk){
							if(items[0].message){
								me.fireEvent('toastMessage', items[0].message);
							}else{
								// me.toastMessage('notallowedplanposition_msg', 'Alert', 'alert', false);
							}
							items = null;
						}else{
							//isOk true
						}
					}	
					
					me.onMouseLeave(e, workMode);
					return items; //Loadlist, Sequence > 이후 VesselExplorerController의 onSyncHandler로 감
				}
				me.onMouseLeave(e, workMode);
			}
		} 
	},

	
	onMouseUpQCIcon: function(planInfoStore){
		var me = this;
		var workMode = planInfoStore.data.workMode;
		var actionMode = planInfoStore.data.actionMode;
	    var planinfo =planInfoStore.data.planinfo;
		// if(workMode === 'view') {
		var x, y, w, h;
		if(me.tmpPlanSelectionSprite){
			x = me.tmpPlanSelectionSprite.attr.cellPosX;
			y = me.tmpPlanSelectionSprite.attr.cellPosY;
			w = me.tmpPlanSelectionSprite.attr.cellWidth;
			h = me.tmpPlanSelectionSprite.attr.cellHeight;
	
			var items = me.onInquiringQC(x, y, w, h, workMode, actionMode, planinfo, true);

			return items; //array
		}
		// }
	},
	
	onMouseLeave: function(e, workMode) {
		var me = this;
		if(workMode){
			var surface = me.getSurface('plan');
			
			if(me.tmpPlanSelectionSprite){
				me.tmpPlanSelectionSprite.setAttributes({
					hidden: true
				});
				me.tmpPlanSelectionSprite= null;
				surface.renderFrame();
			}
		}
	},
	
	onWorkModeChanged: function(workMode) {
		var me = this;
		var surface = me.getSurface('plan');
		
		for(var i=0;i<surface.getItems().length;i++){
			surface.getItems()[i].setAttributes({
				hidden: true
			});
		}
			
		surface.renderFrame();
	},
	
	onPortChanged: function(pol){
		var me = this;
		me.pol = pol;
		
		me.redraw(null, 'data');
	},
	
	onCellDisplayOptionChanged: function(cellDisplayOption) {
		var me = this;
		me.cellDisplayOption = cellDisplayOption;
		
		me.redraw(null, 'data');	
	},

	changePlanSize: function(planSize){
		var me = this;
		me.planSize = planSize;
		
		me.redraw(null, 'data');
	},
	
	onLoadableMarked: function(values) {
		var me = this;
		me.maskType = values;
		me.redraw();
	},
	
	onFilterApplied: function(items) {
		var me = this;
		me.filterItems = items;
		me.redraw();
	},

	onQCSelectApplied: function(selectedQCs){
		var me = this;
		me.selectedQCs = selectedQCs;
		console.log('qc select redraw outbound');
		var itemList = new Array();
		if(selectedQCs.length > 0){
			// var flag = true;
			for(var i = 0 ; i < selectedQCs.length ; i++){
				var flag = true;
				//hatchIndex = me.bays.getAt(i).data.hatchNo
				// if(selectedQCs[i] != null){
				// }else{
				// 	flag = false;
				// }
				for(var k = 0 ; k < me.bays.length ; k++){
					if(selectedQCs[i].data.hatchIndex == me.bays.getAt(k).data.hatchNo){
						var items = Ext.create('Ext.data.Model', {
							lbay: me.bays.getAt(k).data.name,
						});
						for(var j=0;j<itemList.length;j++) {
							if(items.data.lbay == itemList[j].data.lbay){
								flag = false;
							}
						}
						
						if(flag) {
							//Redraw partial index by selectedQCs.hatchIndex
							itemList.push(items);
							// bays.push(me.bays.getAt(k - 1).data.lbay);
							
						}
					}
				}
			}

			for(var a = 0; a < itemList.length ; a++){
				me.redraw(itemList[a], CodeConstants.OutboundPlanMode.OB_QC);
			}
		}
	},

	onSelectedItemUpdate: function(selectedItems){
		var me = this;
		me.selectedItems = selectedItems;
	},
	
	onSelectedItemApplied: function(selectedItems, items) {
		var me = this;
		me.selectedItems = selectedItems;
		
		//multiple bay selection
        var bays = new Array();
    	for(var i=0;i<items.length;i++) {
    	    var flag = true;
            for(var j=0;j<bays.length;j++) {
                if(bays[j] === items[i].data.dbay) {
                    flag = false;
                    break;
                }
            }

            if(flag) {
                //Redraw entire drawing
                bays.push(items[i].data.dbay);
                me.redraw(items[i], 'asc');
            }
    	}
	},
//	onSelectedItemApplied: function(items, item) {
//		var me = this;
//		me.selectedItems = items;
//		me.redraw(item);
//	},
	
	//BLINKING
	onBlinkOptionChanged: function(type, exp) {
		var me = this;
		if (me.blinkTask) {
			me.blinkTask.stopped = true;
			me.blinkTask = null;			
		}
		
		if (type === 'clear'){
			me.blinkType = null;
			var targetSurface = me.getSurface('blink');
			targetSurface.removeAll();
			targetSurface.clear();
			targetSurface.renderFrame();
		} else {
			me.blinkType = type;
			me.blinkDraw();
		}
	},
	
	getBaseUnit: function(width, height) {
		var me = this;
		var baseWidth = width / me.meta.viewWidth * me.meta.baseUnit;
		var baseHeight = height / me.meta.viewHeight * me.meta.baseUnit;
		
		return baseWidth < baseHeight ? baseWidth : baseHeight;
	},
	
	/**
	 * @private
	 */
	getTerminalInfo: function(serviceLane, port, terminal, berth) {
		var me = this;
		
		if(serviceLane.data.length > 0) {
			for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
				if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === port
					&& serviceLane.data.getAt(0).port(0).data.getAt(i).data.terminalCode === terminal
					&& serviceLane.data.getAt(0).port(0).data.getAt(i).data.berthCode === berth) {
					
					return serviceLane.data.getAt(0).port(0).data.getAt(i).data;
				}
			}
		}
	},
	
	/**
	 * @private
	 */
	getBerthCode: function(serviceLane, port, terminal) {
		var me = this;
		
		if(serviceLane.data.length > 0) {
			for(var i=0;i<serviceLane.data.getAt(0).port(0).data.length;i++){
				if(serviceLane.data.getAt(0).port(0).data.getAt(i).data.portCode === port
						&& serviceLane.data.getAt(0).port(0).data.getAt(i).data.terminalCode === terminal) {
					
					return serviceLane.data.getAt(0).port(0).data.getAt(i).data.berthCode;
				}
			}
		}
	},
	
	onTerminalLimitSet4POD: function(portCode, terminalCode, berthCode) {
		var me = this;
		var surface = me.getSurface('main');
		//var terminalInfo = me.getTerminalInfo(me.storeSvc, portCode, terminalCode, berthCode);
		
		for(var i=0;i<surface.getItems().length;i++){
			if(surface.getItems()[i].bay) {
				surface.getItems()[i].pod = portCode;
				surface.getItems()[i].podTerminal = terminalCode;
				surface.getItems()[i].podBerth = berthCode;
				surface.setConfig({dirty: true});
			}
		}
		surface.renderFrame();
	},
	
	setSpriteFillStyle: function(customId, color) {
		var me = this;
		var sprite = me.getSpriteByCustomId(me.getSurface('main'), customId);
		if(sprite) {
			sprite.setAttributes({
				fillStyle: color
			});
			me.getSurface('main').renderFrame();
		}
	},
	
	getSpriteByCustomId: function(surface, id) {
		var me = this;
		var items = surface.getItems();
		
		for(var i = items.length - 1; i > -1; i--){
    		if (items[i].customId && items[i].customId === id){
    		    return items[i];
    		}			
		}		
	},
	
	getBayIndex: function(bays, bayNo) {
		for(var i=0;i<bays.length;i++) {
			if(bays.getAt(i).data.name === bayNo) {
				return i;
			}
		}
		return -1;
	},
	
	getTierIndex: function(bay, tierNo) {
		for(var i=0;i<bay.tierNo.length;i++) {
			if(bay.tierNo[i] === tierNo) {
				return i;
			}
		}
		return -1;
	},
	
	getRowIndex: function(bay, rowNo, tierIndex) {
		if(tierIndex <= bay.holdTierEndIndex ) {
			for(var i=0;i<bay.holdRowNo.length;i++) {
				if(bay.holdRowNo[i] === rowNo) {
					return i;
				}
			}
		} else {
			for(var i=0;i<bay.deckRowNo.length;i++) {
				if(bay.deckRowNo[i] === rowNo) {
					return i;
				}
			}
		
		}
			
		return -1;
	}, 
	
	getHoldDeck: function(bay, tierIndex) {
		return tierIndex <= bay.holdTierEndIndex ? 'H' : 'D';
	},
	
	isBay20DedicatedOfStructure: function(structureIndex, foreAft) {
		var me = this;
		if(foreAft === 'A') {
			structureIndex += 1;
		}
		
		for(var i=0;i<me.bays.length;i++){
			if(me.bays.getAt(i).data.hatchNo === structureIndex) {
				if(me.bays.getAt(i).data.bayListInHatch.length === 1 && me.bays.getAt(i).data.pos !== 'M') {
					return true;
				}
			}
		}
		
		return false;
	},
	
	get20BayUnitsToStructure: function(bay, structureIndex) {
		var me = this;
		var bayCount = 0;
		var physicalIndex = bay.index;
		if(bay.hatchNo <= structureIndex) {
			if(bay.pos === 'M' && bay.bayListInHatch.length === 3) {
				physicalIndex = bay.index + 1;
			}
		} else {
			if(bay.pos === 'M' && bay.bayListInHatch.length === 3) {
				physicalIndex = bay.index - 1;
			}
		}
		
		if(bay.hatchNo <= structureIndex) {
			for(var i=0;i<me.bays.length;i++) {
				if(me.bays.getAt(i).data.index > physicalIndex && me.bays.getAt(i).data.hatchNo <= structureIndex) {
					if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 3) {
						//This is logical 40ft bay
					} else if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 1) {
						//40ft dedicated bay returns 2 x 20
						bayCount++;
						bayCount++;
					} else {
						bayCount++;
					}
				}
			}
			
		} else {
			
			for(var i=0;i<me.bays.length;i++) {
				if(me.bays.getAt(i).data.index < physicalIndex && me.bays.getAt(i).data.hatchNo > structureIndex) {
					if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 3) {
						//This is logical 40ft bay
					} else if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 1) {
						//40ft dedicated bay returns 2 x 20
						bayCount++;
						bayCount++;
					} else {
						bayCount++;
					}
				}
			}
		}
		
		return bayCount;
	},
	
	getLcgBetweenBays: function(hd, bay, bay2) {
		var me = this;
		var startBay = bay;
		var enlbay = bay2;
		
		if(bay.index > bay2.index) {
			startBay = bay2;
			enlbay = bay;
		}
		
		var startBayLcg = startBay.deckLcg - (startBay.pos === 'M' ? 6 : 3);
		var enlbayLcg = enlbay.deckLcg + (enlbay.pos === 'M' ? 6 : 3);
		if(hd === 'H') {
			startBayLcg = startBay.holdLcg - (startBay.pos === 'M' ? 6 : 3);
			enlbayLcg = enlbay.holdLcg + (enlbay.pos === 'M' ? 6 : 3);
		}
		
		return Math.abs(startBayLcg - enlbayLcg);
	},
	
	get20BayUnitsBetweenBays: function(bay, bay2) {
		var me = this;
		var bayCount = 0;
		var startBay = bay;
		var enlbay = bay2;
		var startIndex = bay.index;
		var endIndex = bay2.index;
		
		if(bay.index > bay2.index) {
			startBay = bay2;
			enlbay = bay;
			startIndex = bay2.index;
			endIndex = bay.index;
		}
		
		//If same bay then return 0
		if(startIndex === endIndex) return 0;
		
		var hatchNo, preBay, postBay;
		for(var i=startIndex;i<=endIndex;i++) {
			if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 3) {
				//This is logical 40ft bay
			} else if(me.bays.getAt(i).data.pos === 'M' && me.bays.getAt(i).data.bayListInHatch.length === 1) {
				//40ft dedicated bay returns 2 x 20
				bayCount++;
				bayCount++;
			} else {
				bayCount++;
			}
		}
		
		if(startBay.pos === 'M' && startBay.bayListInHatch.length === 3) {
			bayCount--;
		} else if(startBay.pos === 'M' && startBay.bayListInHatch.length === 1) {
			bayCount--;
			bayCount--;
		} else if(startBay.pos === 'A' || startBay.pos === 'F') {
			bayCount--;
		}
		
		if(enlbay.pos === 'M' && enlbay.bayListInHatch.length === 3) {
			bayCount--;
		} else if(enlbay.pos === 'M' && enlbay.bayListInHatch.length === 1) {
			bayCount--;
			bayCount--;
		} else if(enlbay.pos === 'A' || enlbay.pos === 'F') {
			bayCount--;
		}
		
		return bayCount;
	},
	
	getCargoHoldNoByHatchNo: function(hatchNo) {
		var me = this;
		
		for(var i=0;i<me.bays.length;i++){
			if(me.bays.getAt(i).data.hatchNo === hatchNo) {
				return me.bays.getAt(i).data.holdNo;
			}
		}
		
		return -1;
	},
	
	getMirrorRowIndex: function(hd, bay, ridx) {
		var me = this;
		var rowNo = hd==='H' ? bay.holdRowNo[ridx] : bay.deckRowNo[ridx];
		if(rowNo === '00') {
			return ridx;
		} else {
			var mirrorRowNo = parseInt(rowNo) % 2 === 0 ? ('0' + (parseInt(rowNo) - 1)).slice(-2) : ('0' + (parseInt(rowNo) + 1)).slice(-2);
			for(var m=0;m<=bay.rowEndIndex;m++) {
				if(hd==='H'){
					if(bay.holdRowNo[m] === mirrorRowNo) {
						return m;
					}
				} else {
					if(bay.deckRowNo[m] === mirrorRowNo) {
						return m;
					}
				}
			}
		}
		
		return ridx;
	}

});