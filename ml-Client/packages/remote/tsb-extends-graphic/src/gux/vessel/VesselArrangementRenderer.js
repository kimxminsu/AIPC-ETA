Ext.define('TSB.gux.vessel.VesselArrangementRenderer', {
    /**
     * @memberOf TSB.gux.vessel.VesselArrangementRenderer
     */
	extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite',
		'TSB.gux.vessel.PlanSpriteComposite'
	],
	
    config: {
    	//GENERAL_ARRANGEMENT: General Arrangement, LONG_HATCH: long hatch graph, LONG_HATCH_SIMPLE: long hatch graph simple (navigator)
        viewMode: 'GENERAL_ARRANGEMENT',	
        innerRect: [0, 0, 1, 1],
        resizing: 0,
		drawable: 0,
		ioType: 0,
        isCompleted: false
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },	    

    alias: 'widget.app-vesselarrangementrenderer',

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
    	
		me.vsl = me.storeVslStruc.data.getAt(0).data;
		me.bays = me.storeVslStruc.data.getAt(0).bays(0).data;
		
		//Define meta object
		me.meta = new Object();
		
		//Base Unit
		me.meta.baseUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseUnit')).data.value);
		me.meta.baseUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseUnitOrign')).data.value);
		me.meta.baseTimeUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseTimeUnit')).data.value);
		me.meta.baseTimeUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseTimeUnitOrign')).data.value);
		
		//View Mode
		me.meta.bayDirection = 'RTL'; //Bay Direction - Default
		me.meta.bayDirection = me.storeMeta.getAt(me.storeMeta.findExact('key','bayDirection')).data.value;
		
		//Width Values
		me.meta.baseWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseWidth')).data.value);
		me.meta.padLeft = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padLeft')).data.value);
		me.meta.padRight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padRight')).data.value);
		me.meta.marginBow = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginBow')).data.value);
		me.meta.marginStern = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginStern')).data.value);
		me.meta.baseBayGap = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBayGap')).data.value);
		me.meta.baseHatchGap = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHatchGap')).data.value);
		me.meta.timelineWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','timelineWidth')).data.value) * me.meta.baseUnit;
		me.meta.amountSummaryWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','amountSummaryWidth')).data.value) * me.meta.baseUnit;
		
		//Height Values
		me.meta.baseHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHeight')).data.value);
		me.meta.bayNoAreaHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','bayNoAreaHeight')).data.value);
		me.meta.padTop = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padTop')).data.value);
		me.meta.padBottom = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padBottom')).data.value);
		me.meta.marginTop = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginTop')).data.value);
		me.meta.marginBottom = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginBottom')).data.value);
		me.meta.hatchCoverAreaHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','hatchCoverAreaHeight')).data.value);
		me.meta.timelineMinutesOffset = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','timelineMinutesOffset')).data.value);
		
		//Colors
		me.meta.bayGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','bayGuideColor')).data.value;
		me.meta.holdGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','holdGuideColor')).data.value;
		me.meta.vesselGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselGuideColor')).data.value;
		me.meta.evenFontColor = me.storeMeta.getAt(me.storeMeta.findExact('key','evenFontColor')).data.value;
		me.meta.oddFontColor = me.storeMeta.getAt(me.storeMeta.findExact('key','oddFontColor')).data.value;
		me.meta.planRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','planRectStrokeColor')).data.value;
		me.meta.selectedRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','selectedRectStrokeColor')).data.value;
		me.meta.selectedRectFillColor = me.storeMeta.getAt(me.storeMeta.findExact('key','selectedRectFillColor')).data.value;
		me.meta.segmentRectStrokeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','segmentRectStrokeColor')).data.value;
		me.meta.timelineBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','timelineBackcolor')).data.value;
		me.meta.timelineForecolor = me.storeMeta.getAt(me.storeMeta.findExact('key','timelineForecolor')).data.value;
		
		
		//FontSize
		me.meta.fontSizeBayNo = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeBayNo')).data.value);
		me.meta.fontSizeSummary = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSizeSummary')).data.value);
		me.meta.fontType = me.storeMeta.getAt(me.storeMeta.findExact('key','fontType')).data.value;
		
		//Mode
		me.meta.countMode = me.storeMeta.getAt(me.storeMeta.findExact('key','countMode')).data.value;
		if(me.viewMode === 'LONG_HATCH_SUMMARY') {
			me.meta.countMode = 'sum';
		}
		
		//Calculated Bay Width, Height
		me.meta.bayWidth = me.meta.baseUnit * me.meta.baseWidth;
		me.meta.bayHeight = me.meta.baseUnit * me.meta.baseHeight;
		
		var funnelOffset = me.vsl.funnelIndex > -1 ? me.meta.bayWidth * 2 : 0;
		me.meta.vesselWidth = me.meta.bayWidth * me.getBayUnits() + me.meta.baseHatchGap * me.vsl.noHatches * me.meta.baseUnit + me.meta.bayWidth * 2 + funnelOffset;
		me.meta.vesselHeight = me.meta.bayHeight * (me.vsl.maxTierEndIndex - me.vsl.maxTierStartIndex + 1) + me.meta.baseUnit * me.meta.bayNoAreaHeight * 2 + me.meta.hatchCoverAreaHeight * me.meta.baseUnit;
		
		//Gap between Summary/Planning & Crane Working Window
		me.meta.summaryGap = 5 * me.meta.baseUnit;
//		me.meta.craneWorkingWindowGap = 10 * me.meta.baseUnit;
		
		//Summary
		me.meta.summaryWidth = me.meta.vesselWidth + me.meta.baseUnit * (me.meta.padLeft + me.meta.padRight + me.meta.marginBow + me.meta.marginStern);
		if(me.viewMode === 'LONG_HATCH_SUMMARY') {
			me.meta.summaryHeight = me.meta.vesselHeight;
		} else {
			me.meta.summaryHeight = me.meta.vesselHeight * 1.5;
		}
		
		me.meta.summaryDisWidth = me.meta.summaryWidth;
		me.meta.summaryDisHeight = me.meta.summaryHeight * 2 / 5;
		
		me.meta.summaryLodWidth = me.meta.summaryWidth;
		me.meta.summaryLodHeight = me.meta.summaryHeight * 2 / 5;
		
		me.meta.summaryTtlWidth = me.meta.summaryWidth;
		me.meta.summaryTtlHeight = me.meta.summaryHeight * 1 / 5;
		
		
		//assignmentWindow Area
		me.meta.startTime = me.getOverallStartTime();
		me.meta.hours = me.meta.startTime ? 48 : 0;		//TODO: Need to calculate the hours later	
		
		//For phase 1, no need crane working window
		me.meta.craneWorkingWindowHeight = 0;
//		me.meta.craneWorkingWindowHeight = me.meta.baseUnit * me.meta.baseTimeUnit * me.meta.hours * 60;
		me.meta.craneWorkingWindowWidth = me.meta.vesselWidth + me.meta.baseUnit * (me.meta.padLeft + me.meta.padRight + me.meta.marginBow + me.meta.marginStern);
		
		if(me.viewMode === 'LONG_HATCH_SUMMARY') {
			me.meta.vesselHeight = 0;
		}
		me.meta.vesselAreaHeight = me.meta.vesselHeight + me.meta.baseUnit * (me.meta.padTop + me.meta.padBottom + me.meta.marginTop + me.meta.marginBottom);
		
		me.meta.assignmentHeight = me.meta.summaryHeight+ me.meta.summaryGap + me.meta.bayNoAreaHeight * me.meta.baseUnit;
		
		//For calculating the total view size
		var planningWidthOffset = me.planMode ? (me.meta.timelineWidth + me.meta.amountSummaryWidth) : 0;
		var planningHeightOffset = me.planMode || me.viewMode === 'LONG_HATCH_SUMMARY' ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight: 0;
		me.meta.viewWidth = me.meta.vesselWidth + me.meta.baseUnit * (me.meta.padLeft + me.meta.padRight + me.meta.marginBow + me.meta.marginStern) + planningWidthOffset;
		me.meta.viewHeight = me.meta.vesselAreaHeight + planningHeightOffset;
    },
    
    initializeDrawComponent: function() {
    	var me = this;
		//Set View Size
		me.resizing = 1;
		//ToDo: verify it is necessary or not (setLocalXY)
		//me.setLocalXY(0, 0);
		me.setSize(me.meta.viewWidth,me.meta.viewHeight);
		me.setMainRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('background').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('main').setRect([0,me.meta.vesselAreaHeight+me.meta.assignmentHeight,me.meta.viewWidth, me.meta.craneWorkingWindowHeight]);
		me.getSurface('plan').setRect([0,me.scrollY?me.scrollY:0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('mask').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('blink').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);		//BLINKING
		me.resizing = 0;
		
		var planSurface = me.getSurface('mask');
		me.hatchSelectionSprite = planSurface.add({
			type: 'planspritecomposite',
			meta: me.meta,
			cellPosX: 0,
			cellPosY: 0,
			cellWidth: 0,
			cellHeight: 0,
			hidden: true,
			customId: 'id-plan' 		//should be set to recognize each other protractor
		});	
		
		me.planSelectionSprite = planSurface.add({
			type: 'planspritecomposite',
			meta: me.meta,	
			cellPosX: 0,
			cellPosY: 0,
			cellWidth: 0,
			cellHeight: 0,
			hidden: true,
			customId: 'id-planSelection' 		//should be set to recognize each other protractor
		});	
		
	},
	
	onUpdateBayCount: function(bayCountStore){
		var me = this;
		me.storeBayCount = bayCountStore;
		me.redraw(); 
	},
    
    redraw: function () {
        var me = this,
            rect = me.getMainRect();
        
        if(!rect) {
            return;
		}
		me.initializeMetaValue();
    	me.removeAll(true);
    	me.initializeDrawComponent();
    	
    	//On purpose, prevent drawing for the fit to window function
    	if(me.drawable === 0) return;
    	
        //Main excluded pad-top, left, right, bottom
        var targetSurface = me.getSurface('plan');
        var craneWindowSurface = me.getSurface('main');
    	
        //Draw View Rect & Vessel Shape
        var firstBayHoldTierEndIndex, lastBayHoldTierEndIndex, deckhouseBayHoldTierEndIndex, funnelBayHoldTierEndIndex;
        for(var i=0;i<me.vsl.noBays;i++){
    		var bay = me.bays.getAt(i).data;
    		
    		if(i===0) firstBayHoldTierEndIndex = bay.holdTierEndIndex;
    		if(i===me.vsl.noBays-1) lastBayHoldTierEndIndex = bay.holdTierEndIndex;
    		deckhouseBayHoldTierEndIndex = bay.holdTierEndIndex;
    		if(bay.hatchNo ===  me.vsl.deckhouseIndex) deckhouseBayHoldTierEndIndex = bay.holdTierEndIndex;
    		funnelBayHoldTierEndIndex = bay.holdTierEndIndex;
    		if(bay.hatchNo ===  me.vsl.funnelIndex) funnelBayHoldTierEndIndex = bay.holdTierEndIndex;
    	}
    	
    	//Draw View Rect & Vessel Shape
		config =  {
		    meta: me.meta,
		    vsl: me.vsl,
		    bays: me.bays,
			x: 0,
			y: 0,
			viewMode: me.viewMode,
			planMode: me.planMode,
			ioType: me.ioType,
			firstBayHoldTierEndIndex: firstBayHoldTierEndIndex, 
			lastBayHoldTierEndIndex: lastBayHoldTierEndIndex, 
			deckhouseBayHoldTierEndIndex: deckhouseBayHoldTierEndIndex, 
			funnelBayHoldTierEndIndex: funnelBayHoldTierEndIndex,
			printOpts: me.printOpts
		};
		targetSurface.add(Ext.create('widget.app-vesselarrangementgeneraldraw', config));
		
        //Calculate 
        var podBays  = new Array();
        var maxAmount = 0;
        
        //Initialize
		for(var i=0;i<me.vsl.noBays;i++){
			bay = me.bays.getAt(i).data;
			bay.noDisH = 0;
			bay.noDisD = 0;
			bay.noDisSftH = 0;
			bay.noDisSftD = 0;
			bay.noLodH = 0;
			bay.noLodD = 0;
			bay.noLodSftH = 0;
			bay.noLodSftD = 0;
		}
		

		//There is no vessel structure mapping with discharging asc, needs to find from the cellposition
		//Discharged are discharging container and shifting container
		// var bayIndex = -1, rowIndex = -1, tierIndex = -1;
		for(var i=0; i < me.storeAsc.data.length; i++) {
			// bayIndex = me.storeAsc.getAt(i).data.bayIdx;
			// rowIndex = me.storeAsc.getAt(i).data.rowIdx;
			// tierIndex = me.storeAsc.getAt(i).data.tierIdx;
			// if(me.storeAsc.getAt(i).data.ibonShip){
			// 	var hd = me.storeAsc.getAt(i).data.dhStrP;
			// 	if(hd === 'D') bay.noDisD++;					
			// 	else if(hd === 'H') bay.noDisH++;
			// }else if(me.storeAsc.getAt(i).data.obonShip){
			// 	var hd = me.storeAsc.getAt(i).data.dhStrP;
			// 	if(hd === 'D') bay.noLodD++;					
			// 	else if(hd === 'H') bay.noLodH++;
			// }

			// if(!nullChk_(me.storeAsc.getAt(i).data.dbay) && !nullChk_(me.storeAsc.getAt(i).data.drow)
			// && !nullChk_(me.storeAsc.getAt(i).data.dtier)){
			// 	var hd = me.storeAsc.getAt(i).data.dhStrP;
			// 	if(hd === 'D') bay.noDisD++;					
			// 	else if(hd === 'H') bay.noDisH++;
			// }else if(!nullChk_(me.storeAsc.getAt(i).data.lbay) && !nullChk_(me.storeAsc.getAt(i).data.lrow)
			// && !nullChk_(me.storeAsc.getAt(i).data.ltier)){
			// 	var hd = me.storeAsc.getAt(i).data.dhStrP;
			// 	if(hd === 'D') bay.noLodD++;					
			// 	else if(hd === 'H') bay.noLodH++;
			// }



			// if((me.storeAsc.getAt(i).data.opr === 'D' && !me.storeAsc.getAt(i).data.cellPosition)
			// || (me.storeAsc.getAt(i).data.opr === 'L' && me.storeAsc.getAt(i).data.sftCntr === 'Y' && me.storeAsc.getAt(i).data.prevPosition)) {
			if((me.storeAsc.getAt(i).data.ixCd === CodeConstants.IX_IMPORT && !nullChk_(me.storeAsc.getAt(i).data.dbay) && !nullChk_(me.storeAsc.getAt(i).data.drow)
			&& !nullChk_(me.storeAsc.getAt(i).data.dtier) 
			
			)){
				// var bayNo = me.storeAsc.getAt(i).data.prevPosition.substring(0,2);
				var bayIndex = me.storeAsc.getAt(i).data.ibBayIdx; //me.getBayIndex(me.bays, bayNo);
				
				if(bayIndex > -1){
					var bay = me.bays.getAt(bayIndex).data;
					// var tierNo = me.storeAsc.getAt(i).data.prevPosition.substring(4,6);
					var tierIndex = me.storeAsc.getAt(i).data.ibTierIdx;//me.getTierIndex(bay, tierNo);
					
					if (tierIndex > -1){
						// var rowNo = me.storeAsc.getAt(i).data.prevPosition.substring(2,4);
						var rowIndex = me.storeAsc.getAt(i).data.ibRowIdx; //me.getRowIndex(bay, rowNo, tierIndex);
						// var hd = tierIndex > bay.holdTierEndIndex ? 'D' : 'H';
						var hd = me.storeAsc.getAt(i).data.dhStrP;
						if(rowIndex > -1) {
							// if(hd === 'H') {
							// 	// if(me.storeAsc.getAt(i).data.rstTime == 0){
							// 	if(me.storeAsc.getAt(i).data.pod === me.pol) {
							// 		bay.noDisH++;
							// 	} else {
							// 		bay.noDisSftH++;
							// 	}
							// } else {
							// 	// if(me.storeAsc.getAt(i).data.rstTime == 0){
							// 	if(me.storeAsc.getAt(i).data.pod === me.pol) {
							// 		bay.noDisD++;
							// 	} else {
							// 		bay.noDisSftD++;
							// 	}
							// }
						}
					}
				}
			}
		}
		
    	if(me.storeAsc.getCount() > 0) {
    		
    		for(var i=0;i<me.vsl.noBays;i++){
    			bay = me.bays.getAt(i).data;
				var rows = bay.rowEndIndex + 1;
				var tiers = bay.deckTierEndIndex + 1;
				var cellInfo, cntrInfo;
				var podTiers  = new Array();
				for(var a = 0 ; a < me.storeBayCount.data.length ; a++){
					var item = me.storeBayCount.getAt(a).data;
					if(i + 1 == item.bay){
						if(item.holdDeck === CodeConstants.HoldDeck.Deck){
							if(item.jobType === CodeConstants.VesselJobType.DISCHARGING){
								bay.noDisD = item.quantity;
							}else if(item.jobType === CodeConstants.VesselJobType.LOADING){
								bay.noLodD = item.quantity;
							}
						}else if(item.holdDeck === CodeConstants.HoldDeck.Hold){
							if(item.jobType === CodeConstants.VesselJobType.DISCHARGING){
								bay.noDisH = item.quantity;
							}else if(item.jobType === CodeConstants.VesselJobType.LOADING){
								bay.noLodH = item.quantity;
							}
						}
					} 
				}
				for(var k=0;k<tiers;k++) {
					// This is for General Arrangement Drawing
					// Calculate Top POD per tier For General Arrangement
					var map = new Ext.util.HashMap();
					
					if(me.ioType == CodeConstants.PlanType.LOAD){
						for(var j=0;j<rows;j++) {
							if(bay.outcells[k][j].value > 0) {
								cellInfo = bay.outcells[k][j];
								if (cellInfo.status === 'S' && me.storeAsc.getById(cellInfo.id)) {
									cntrInfo = me.storeAsc.getById(cellInfo.id).data;
									var cnt = isNaN(map.get(cntrInfo.pod)) ? 1 : map.get(cntrInfo.pod) + 1;
									
						// 			//This is for General Arrangement Drawing
						// 			//Calculate Top POD per tier For General Arrangement
									map.add(cntrInfo.pod, cnt);
								}
							}
						}
					}else if(me.ioType == CodeConstants.PlanType.DISCHARGE){
						for(var j=0;j<rows;j++) {
							if(bay.cells[k][j].value > 0) {
								cellInfo = bay.cells[k][j];
								if (cellInfo.status === 'S' && me.storeAsc.getById(cellInfo.id)) {
									cntrInfo = me.storeAsc.getById(cellInfo.id).data;
									var cnt = isNaN(map.get(cntrInfo.pod)) ? 1 : map.get(cntrInfo.pod) + 1;
									
						// 			//This is for General Arrangement Drawing
						// 			//Calculate Top POD per tier For General Arrangement
									map.add(cntrInfo.pod, cnt);
								}
							}
						}
					}else{
						for(var j=0;j<rows;j++) {
							if(bay.cells[k][j].value > 0) {
								cellInfo = bay.cells[k][j];
								if (cellInfo.status === 'S' && me.storeAsc.getById(cellInfo.id)) {
									cntrInfo = me.storeAsc.getById(cellInfo.id).data;
									var cnt = isNaN(map.get(cntrInfo.pod)) ? 1 : map.get(cntrInfo.pod) + 1;
									map.add(cntrInfo.pod, cnt);
								}
							}

							if(bay.outcells[k][j].value > 0) {
								cellInfo = bay.outcells[k][j];
								if (cellInfo.status === 'S' && me.storeAsc.getById(cellInfo.id)) {
									cntrInfo = me.storeAsc.getById(cellInfo.id).data;
									var cnt = isNaN(map.get(cntrInfo.pod)) ? 1 : map.get(cntrInfo.pod) + 1;
									map.add(cntrInfo.pod, cnt);
								}
							}
						}
					}
					
					//This is for General Arrangement Drawing
					//Calculate Top POD per tier For General Arrangement
					var maxCnt = 0, maxPod = "";
					map.each(function(key, value, length){
						if(value > maxCnt) {
							maxCnt = value;
							maxPod = key
						}
					});
					podTiers.push([maxPod, maxCnt, maxPod !== "" ? true : false]);
				}
				podBays.push(podTiers);
			} 
    		
//    		//To calculate Crane Intensity
//    		me.totalMoves = 0;
//    		me.longCraneMoves = 0;
//    		var hatchMoves = new Array();
    		
    		//Max Amount
			for(var i=0;i<me.vsl.noBays;i++){
				bay = me.bays.getAt(i).data;
				
				if(bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH > maxAmount) {
					maxAmount = bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH;
				}
				
				if(bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD > maxAmount) {
					maxAmount = bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD;
				}
				
////				//To calculate Crane Intensity
////	    		me.totalMoves += bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD;
//	    		var hatchIdx = -1
//	    		for(var j=0;j<hatchMoves.length;j++) {
//	    			if(hatchMoves[j].hatchNo === bay.hatchNo) {
//	    				hatchIdx = j;
//	    				break;
//	    			}
//	    		}
//	    		
//	    		if(hatchIdx === -1) {
//	    			hatchMoves.push({
//	    				hatchNo: bay.hatchNo,
//	    				moves: bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD
//	    			});
//	    		} else {
//	    			hatchMoves[hatchIdx].moves += bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD;
//	    		}
			}
			
//			//TODO: need formular how to calculate long crane for 3 bays
//			//To calculate Crane Intensity
//			for(var i=0;i<hatchMoves.length;i++){
//				if(hatchMoves[i].moves > me.longCraneMoves) {
//					me.longCraneMoves = hatchMoves[i].moves;
//				}
//			}
    	}
    	
    	//Draw Bays
		var hatchCount = 0, accBayUnits = 0
    	var preHatchNo, hatchNo, bay, preBay, postBay, preHoldNo, holdNo;
    	var offsetHchX = 0; 
		for(var i=0;i<me.vsl.noBays;i++){
    		bay = me.bays.getAt(i).data;
    		postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    		hatchNo = bay.hatchNo;
    		holdNo = bay.holdNo;
			
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			hatchCount++;
    			preHatchNo = hatchNo;
    			
    			offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    			accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    			
    			if(podBays.length > 0 && bay.bayListInHatch.length === 3) {
    				for(var j=0;j<tiers;j++){
    					var a = podBays[bay.bayListInHatch[0]][j]
    					var b = podBays[bay.bayListInHatch[1]][j]
    					var c = podBays[bay.bayListInHatch[2]][j]
    					
    					if(b[1] > a[1] && b[1] > c[1]){
    						a[2] = false;
    						c[2] = false;
    					} else {
    						b[2] = false;
    					}
    				}
    			}
    		}
    		
    		
    		var bayX = me.getBayX(offsetHchX, bay, preBay, postBay, false);
    		var bayX40 = me.getBayX(offsetHchX, bay, preBay, postBay, true);
    		
    		//Draw General Arrangement
    		var config =  {
    		    meta: me.meta,       
    			vsl: me.vsl,
    			bays: me.bays,
    			asc: me.storeAsc,
    			storeCraneAssignmentPlan: me.storeCraneAssignmentPlan,
				svc: me.storeSvc,
				ports : me.storePort,
    			bay: bay,
    			preBay: preBay,
    			postBay: postBay,
    			offsetHchX: offsetHchX,
    			bayX: bayX,
    			bayX40: bayX40,
    			preHatchNo: preBay ? preBay.hatchNo : 0,
    			preHoldNo: preHoldNo,
    			holdNo: holdNo,
    			viewMode: me.viewMode,
    			planMode: me.planMode,
    			firstBayHoldTierEndIndex: firstBayHoldTierEndIndex,
    			podBays: podBays[i],
    			maxAmount: maxAmount
    		};
    		targetSurface.add(Ext.create('widget.app-vesselarrangementbaydraw', config));
    		
    		//Hold
			if (preHoldNo !== holdNo) {
    			preHoldNo = holdNo;
			}
    		
	    	preBay = bay;
    	}
		
		targetSurface.renderFrame();
		
		//For phase 1, no need crane working window
//		if(me.planMode) {
//			var config =  {
//				meta: me.meta,       
//				vsl: me.vsl,
//				bays: me.bays,
//				vslDis: me.vslDis,
//				baysDis: me.baysDis,
//				asc: me.storeAsc,
//				storeCraneAssignmentPlan: me.storeCraneAssignmentPlan,
//				svc: me.storeSvc,
//				storeCrane: me.storeCrane,
//				storeProductivity: me.storeProductivity,
//				planMode: me.planMode,
//			};
//			craneWindowSurface.add(Ext.create('widget.app-vesselarrangementcranewindowdraw', config));
//			craneWindowSurface.renderFrame();
//		}
		
		me.isCompleted = true;
		
		//To fire event after complete the redraw
    	//It is useful for the printing to get the image
    	me.fireEvent('redrawdone', me);
    },
    
    getOverallStartTime: function() {
    	var me = this;
    	
    	var startTime = null;
    	
    	for(var i=0;i<me.storeCraneAssignmentPlan.getDataSource().getCount();i++) {
    		var record = me.storeCraneAssignmentPlan.getDataSource().items[i];
    		
    		if(startTime) {
    			if(record.data.startTime < startTime) {
					startTime = record.data.startTime;
				}
    		} else {
				if(record.data.startTime) {
					startTime = record.data.startTime;
				}
    		}
    		
    	}
    	
    	return startTime;
    },

	showHatchSelection: function(posX, posY, width, height) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
    		if (items[i].getCustomId() === 'id-plan'){
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
	
	hideHatchSelection: function(){
		var me = this;
		var planSurface = me.getSurface('plan');
		var items = planSurface.getItems();
		for(var i = items.length - 1; i > -1; i--){
			if (items[i].getCustomId() === 'id-plan'){
			    var sCell = items[i].setAttributes({
			    	hidden: true
			    }); 
			    break;
			}			
		}		
	    planSurface.renderFrame();	
	},
	
	getValueY: function(value) {
		var me = this;
		var margin = me.meta.baseUnit * (me.meta.padTop + me.meta.padBottom + me.meta.marginTop + me.meta.marginBottom + me.meta.bayNoAreaHeight);
		
		if(me.viewMode === 'LONG_HATCH_SUMMARY') {
			margin = me.meta.baseUnit * (me.meta.padTop + me.meta.marginTop + me.meta.bayNoAreaHeight);
		}
		
		if(value === 'SumDisD') {
			return margin + me.meta.vesselHeight + me.meta.summaryGap;
		}
		
		if(value === 'SumDisH') {
			return margin + me.meta.vesselHeight + me.meta.summaryGap + me.meta.summaryDisHeight / 2;
		}
		
		if(value === 'SumLodD') {
			return margin + me.meta.vesselHeight + me.meta.summaryGap + me.meta.summaryDisHeight;
		}
		
		if(value === 'SumLodH') {
			return margin + me.meta.vesselHeight + me.meta.summaryGap + me.meta.summaryDisHeight + me.meta.summaryLodHeight / 2;
		}
		
		if(value === 'SumTtl') {
			return margin + me.meta.vesselHeight + me.meta.summaryGap + me.meta.summaryDisHeight + me.meta.summaryLodHeight;
		}
		
	},
	
	getHoldY: function(firstBayHoldTierEndIndex) {
		var me = this;
		return me.getImageBowPos(firstBayHoldTierEndIndex);
	},
	
	/**
	 * 
	 * @param hatchCount: Hatch Index
	 * @param accBayUnits: Accumulated Physical 20ft Bay Counts in Hatch
	 * @returns: X position of Hatch
	 */
	getHatchX: function(hatchCount, accBayUnits) {
		var me = this;
		var deckhouseOffset = hatchCount > me.vsl.deckhouseIndex ? me.meta.bayWidth * 2 : 0;
		var funnelOffset = me.vsl.funnelIndex > -1 ? hatchCount > me.vsl.funnelIndex ? me.meta.bayWidth * 2 : 0 : 0;
		var planningWidthOffset = me.planMode ? me.meta.bayDirection === 'RTL' ? me.meta.amountSummaryWidth : me.meta.timelineWidth : 0;
		
		if(me.meta.bayDirection === 'RTL') {
			return me.meta.viewWidth - (me.meta.padRight + me.meta.marginBow + (hatchCount - 1) * me.meta.baseHatchGap) * me.meta.baseUnit 
			- accBayUnits * me.meta.bayWidth - deckhouseOffset - funnelOffset - planningWidthOffset;
		} else {
			return (me.meta.padRight + me.meta.marginBow + (hatchCount - 1) * me.meta.baseHatchGap) * me.meta.baseUnit 
			+ accBayUnits * me.meta.bayWidth + deckhouseOffset + funnelOffset + planningWidthOffset;
		}
	},
	
	getHatchXbyBay: function(offsetHchX, bay) {
		var me = this;
		var offset = me.meta.bayDirection === 'RTL' ? 1 : 0;
		
		return offsetHchX - me.getHatchWidth(bay) * offset;
	},
	
	getHatchWidth: function(bay) {
		var me = this;
		
		return bay.bayListInHatch.length > 1 ? me.meta.bayWidth * 2 : parseInt(bay.name) % 2 === 0 ? me.meta.bayWidth * 2 : me.meta.bayWidth;
	},
	
	getCellY: function(bay, tierIdx){
		var me = this;
		var hdOffset = tierIdx > bay.holdTierEndIndex ? me.meta.hatchCoverAreaHeight * me.meta.baseUnit : 0;
		var planningHeightOffset = me.planMode ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight : 0;
		
		value = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom) * me.meta.baseUnit - me.meta.bayHeight * (tierIdx + 1) - hdOffset - planningHeightOffset;
		return value;
	},
	
	/**
	 * 
	 * @param offsetHchX
	 * @param bay
	 * @param preBay
	 * @param postBay
	 * @param flag:	true returns 40ft bay X, false returns current bay X
	 * @returns
	 */
	getBayX: function(offsetHchX, bay, preBay, postBay, flag) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";
		
		if(me.meta.bayDirection === 'RTL') {
			if(bayType === '40') {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return flag ? offsetHchX - me.meta.bayWidth * 2 : null;
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return flag ? offsetHchX - me.meta.bayWidth * 2 : null;
				}
				
				if(preBay && preBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX - me.meta.bayWidth * 2;
				}
				
				if(postBay && postBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX - me.meta.bayWidth * 2;
				}
			} else {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					if(parseInt(preBay.name) % 2 === 0){
						//3rd bay
						return offsetHchX - me.meta.bayWidth * 2;
					}
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					if(parseInt(postBay.name) % 2 === 0){
						//first bay
						return offsetHchX - me.meta.bayWidth;
					}
				}
				
				//20' Dedicated Bay
				return offsetHchX - me.meta.bayWidth;
				
			}
		} else {
			if(bayType === '40') {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return flag ? offsetHchX : null;
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return flag ? offsetHchX : null;
				}
				
				if(preBay && preBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX;
				}
				
				if(postBay && postBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX;
				}
			} else {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					if(parseInt(preBay.name) % 2 === 0){
						//3rd bay
						return offsetHchX + me.meta.bayWidth;
					}
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					if(parseInt(postBay.name) % 2 === 0){
						//first bay
						return offsetHchX;
					}
				}
				
				//20' Dedicated Bay
				return offsetHchX;
			}
		}
		
	},
	
	getBayNoX: function(offsetHchX, bay, preBay, postBay) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";
		
		if(me.meta.bayDirection === 'RTL') {
			if(bayType === '40') {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return offsetHchX - me.meta.bayWidth ;
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return offsetHchX - me.meta.bayWidth;
				}
				
				if(preBay && preBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX - me.meta.bayWidth;
				}
				
				if(postBay && postBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX - me.meta.bayWidth;
				}
			} else {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					if(parseInt(preBay.name) % 2 === 0){
						//3rd bay
						return offsetHchX - me.meta.bayWidth * 2 + me.meta.bayWidth / 2;
					}
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					if(parseInt(postBay.name) % 2 === 0){
						//first bay
						return offsetHchX - me.meta.bayWidth + me.meta.bayWidth / 2;
					}
				}
				
				//20' Dedicated Bay
				return offsetHchX - me.meta.bayWidth + me.meta.bayWidth / 2;
			}
		} else {
			if(bayType === '40') {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return offsetHchX + me.meta.bayWidth;
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					//3bay hatch
					return offsetHchX + me.meta.bayWidth;
				}
				
				if(preBay && preBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX + me.meta.bayWidth;
				}
				
				if(postBay && postBay.hatchNo !== bay.hatchNo) {
					//40ft dedicated bay
					return offsetHchX + me.meta.bayWidth;
				}
			} else {
				if(preBay && preBay.hatchNo === bay.hatchNo) {
					if(parseInt(preBay.name) % 2 === 0){
						//3rd bay
						return offsetHchX + me.meta.bayWidth + me.meta.bayWidth / 2;
					}
				}
				
				if(postBay && postBay.hatchNo === bay.hatchNo) {
					if(parseInt(postBay.name) % 2 === 0){
						//first bay
						return offsetHchX + me.meta.bayWidth / 2;
					}
				}
				
				//20' Dedicated Bay
				return offsetHchX + me.meta.bayWidth / 2;
			}
		}
		
	},
	
	getBayWidth: function(bay) {
		var me = this;
		var bayType = parseInt(bay.name) % 2 === 0 ? "40" : "20";
		
		if(bayType === '40') {
			return me.meta.bayWidth * 2;
		} else {
			return me.meta.bayWidth;
		}
	},
	
	getBayUnits: function(specificHatchNo) {
		var me = this;
    	var units = 0;
    	var preHatchNo, hatchNo, holdNo, bay, preBay, postBay;
    	
    	for(var i=0;i<me.vsl.noBays;i++){
    		bay = me.bays.getAt(i).data;
    		postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    		hatchNo = bay.hatchNo;
    		holdNo = bay.holdNo;
    		
    		//Hatch
    		if (preHatchNo !== hatchNo) {
    			units++;
    			preHatchNo = hatchNo;
    			
    			if(postBay && postBay.hatchNo === bay.hatchNo){
    				units++;
    			} else if(postBay && postBay.hatchNo !== bay.hatchNo){
    				if(parseInt(bay.name) % 2 === 0){
    					units++;
    				}
    			} else {
    				if(parseInt(bay.name) % 2 === 0){
    					units++;
    				}
    			}
    		}
    		
	    	preBay = bay;
	    	
	    	if(specificHatchNo && specificHatchNo === hatchNo) {
	    		break;
	    	}
    	}
    	
    	return units;
	},
	
	getImageBowPos: function(firstBayHoldTierEndIndex) {
		var me = this;
		var x, y, w, h;
		var BOW_OFFSET_HEIGHT = 29;
		var BOW_IMAGE_WIDTH = 24;
		var BOW_IMAGE_HEIGHT = 98;
		var planningWidthOffset = me.planMode ? me.meta.bayDirection === 'RTL' ? me.meta.amountSummaryWidth : me.meta.timelineWidth : 0;
		
		if(me.meta.bayDirection === 'RTL') {
			x = me.meta.viewWidth - (me.meta.padRight + me.meta.marginBow) * me.meta.baseUnit - planningWidthOffset;
		} else {
			x = (me.meta.padRight + me.meta.marginBow) * me.meta.baseUnit - BOW_IMAGE_WIDTH * me.meta.baseUnit + planningWidthOffset;
		}
		
		var planningHeightOffset = me.planMode ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight : 0;
		var hdOffset = me.meta.hatchCoverAreaHeight * me.meta.baseUnit / 2;
		y = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom) * me.meta.baseUnit - me.meta.bayHeight * (firstBayHoldTierEndIndex + 1) - hdOffset - planningHeightOffset - BOW_OFFSET_HEIGHT * me.meta.baseUnit;
		
		w = BOW_IMAGE_WIDTH * me.meta.baseUnit;
		h = BOW_IMAGE_HEIGHT * me.meta.baseUnit;
		
		return [x, y, w, h];
		
	},
	
	getImageDeckhousePos: function(deckhouseBayHoldTierEndIndex) {
		var me = this;
		var x, y, w, h;
		var DECKHOUSE_IMAGE_WIDTH = me.meta.bayWidth * 2;
    	var DECKHOUSE_IMAGE_HEIGHT = me.meta.vesselHeight / 2;
    	var deckhouseOffset = me.meta.bayWidth * 2 - me.meta.baseUnit * 2;
    	var funnelOffset = me.vsl.funnelIndex > -1 ? me.vsl.deckhouseIndex > me.vsl.funnelIndex ? me.meta.bayWidth * 2 - me.meta.baseUnit * 2 : 0 : 0;
    	var planningWidthOffset = me.planMode ? me.meta.bayDirection === 'RTL' ? me.meta.amountSummaryWidth : me.meta.timelineWidth : 0;
		
		if(me.meta.bayDirection === 'RTL') {
			x = me.meta.viewWidth - (me.meta.padRight + me.meta.marginBow + me.vsl.deckhouseIndex * me.meta.baseHatchGap) * me.meta.baseUnit - me.getBayUnits(me.vsl.deckhouseIndex) * me.meta.bayWidth - deckhouseOffset - funnelOffset - planningWidthOffset;
		} else {
			x = (me.meta.padRight + me.meta.marginBow + me.vsl.deckhouseIndex * me.meta.baseHatchGap) * me.meta.baseUnit + me.getBayUnits(me.vsl.deckhouseIndex) * me.meta.bayWidth + funnelOffset + planningWidthOffset;
		}
		
		var planningHeightOffset = me.planMode ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight : 0;
		var hdOffset = me.meta.hatchCoverAreaHeight * me.meta.baseUnit / 2;
		y = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom) * me.meta.baseUnit - me.meta.bayHeight * (deckhouseBayHoldTierEndIndex + 1) - hdOffset - planningHeightOffset - DECKHOUSE_IMAGE_HEIGHT;
		
		w = DECKHOUSE_IMAGE_WIDTH;
		h = DECKHOUSE_IMAGE_HEIGHT;
		
		return [x, y, w, h];
	},
	
	getImagefunnelPos: function(funnelBayHoldTierEndIndex) {
		var me = this;
		var x, y, w, h;
		var FUNNEL_IMAGE_WIDTH = me.meta.bayWidth * 2;
    	var FUNNEL_IMAGE_HEIGHT = me.meta.vesselHeight / 2;
    	var deckhouseOffset = me.vsl.deckhouseIndex < me.vsl.funnelIndex ? me.meta.bayWidth * 2 - me.meta.baseUnit * 2 : 0;
    	var funnelOffset = me.meta.bayWidth * 2 - me.meta.baseUnit * 2;
    	var planningWidthOffset = me.planMode ? me.meta.bayDirection === 'RTL' ? me.meta.amountSummaryWidth : me.meta.timelineWidth : 0;
		
		if(me.meta.bayDirection === 'RTL') {
			x = me.meta.viewWidth - (me.meta.padRight + me.meta.marginBow + me.vsl.funnelIndex * me.meta.baseHatchGap) * me.meta.baseUnit - me.getBayUnits(me.vsl.funnelIndex) * me.meta.bayWidth - deckhouseOffset - funnelOffset - planningWidthOffset;
		} else {
			x = (me.meta.padRight + me.meta.marginBow + me.vsl.funnelIndex * me.meta.baseHatchGap) * me.meta.baseUnit + me.getBayUnits(me.vsl.funnelIndex) * me.meta.bayWidth  + deckhouseOffset + planningWidthOffset;
		}
		
		var planningHeightOffset = me.planMode ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight : 0;
		var hdOffset = me.meta.hatchCoverAreaHeight * me.meta.baseUnit / 8;
		y = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom) * me.meta.baseUnit - me.meta.bayHeight * (funnelBayHoldTierEndIndex + 1) - hdOffset - planningHeightOffset - FUNNEL_IMAGE_HEIGHT;
		
		w = FUNNEL_IMAGE_WIDTH;
		h = FUNNEL_IMAGE_HEIGHT;
		
		return [x, y, w, h];
	},
	
	getImagePropellerPos: function(lastBayHoldTierEndIndex, firstBayHoldTierEndIndex) {
		var me = this;
		var x, y, w, h;
		var PROPELLER_IMAGE_WIDTH = 33;
    	var PROPELLER_IMAGE_HEIGHT = 41;
    	var BOW_OFFSET_HEIGHT = 29;
		var BOW_IMAGE_WIDTH = 24;
		var BOW_IMAGE_HEIGHT = 98;
		var planningWidthOffset = me.planMode ? me.meta.bayDirection === 'RTL' ? me.meta.amountSummaryWidth : me.meta.timelineWidth : 0;
		
		if(me.meta.bayDirection === 'RTL') {
			x = me.meta.viewWidth - me.meta.vesselWidth - (me.meta.padRight + me.meta.marginBow) * me.meta.baseUnit - planningWidthOffset;
		} else {
			x = me.meta.vesselWidth + (me.meta.padLeft + me.meta.marginBow - PROPELLER_IMAGE_WIDTH) * me.meta.baseUnit + planningWidthOffset;
		}
		
		var planningHeightOffset = me.planMode ? me.meta.assignmentHeight + me.meta.craneWorkingWindowHeight : 0;
		var hdOffset = me.meta.hatchCoverAreaHeight * me.meta.baseUnit / 2;
		y = me.meta.viewHeight - (me.meta.padBottom + me.meta.marginBottom) * me.meta.baseUnit 
			- me.meta.bayHeight * (lastBayHoldTierEndIndex + 1) - hdOffset - planningHeightOffset
			+ (BOW_IMAGE_HEIGHT - BOW_OFFSET_HEIGHT - PROPELLER_IMAGE_HEIGHT) * me.meta.baseUnit;
		
		w = PROPELLER_IMAGE_WIDTH * me.meta.baseUnit;
		if(lastBayHoldTierEndIndex === firstBayHoldTierEndIndex) {
			h = PROPELLER_IMAGE_HEIGHT * me.meta.baseUnit;
		} else if(lastBayHoldTierEndIndex < firstBayHoldTierEndIndex) {
			h = PROPELLER_IMAGE_HEIGHT * me.meta.baseUnit - (firstBayHoldTierEndIndex - lastBayHoldTierEndIndex) * me.meta.bayHeight;
		} else {
			h = PROPELLER_IMAGE_HEIGHT * me.meta.baseUnit + (lastBayHoldTierEndIndex - firstBayHoldTierEndIndex) * me.meta.bayHeight;
		}
		
		return [x, y, w, h];
	},
	//new x, y만 이용해서 bay 찾기 (hatchIndex 찾기 위해)
	getBayByXY: function(x, y) {
		var me = this;
		var surface = me.getSurface('plan');
    	var hatchCount = 0, accBayUnits = 0;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0; 
		var vesselHeight = me.meta.vesselHeight;
		
		if(y > 0){
			for(var i=0;i<me.vsl.noBays;i++){
    			bay = me.bays.getAt(i).data;
    			postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    			hatchNo = bay.hatchNo;
    			
    			//Hatch
    			if (preHatchNo !== hatchNo) {
    				hatchCount++;
    				preHatchNo = hatchNo;
    				
    				offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    				accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    			}
    			
    			var bayX = me.getBayX(offsetHchX, bay, preBay, postBay, true)
    			if(me.meta.bayDirection === 'RTL') {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay;
    				}
    			} else {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay;
    				}	
    			}
    			preBay = bay;
    		}
		}
	},
	
	getBay: function(e) {
		var me = this;
		var surface = me.getSurface('plan');
    	var hatchCount = 0, accBayUnits = 0;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0; 
    	var xy = surface.getEventXY(e);
    	var x = xy[0], y = xy[1];
    	var vesselHeight = me.meta.vesselHeight;
    	if(me.viewMode === 'LONG_HATCH_SUMMARY') {
    		vesselHeight = me.meta.summaryHeight;
    	}
    	
    	if(y > 0 && y < vesselHeight + me.meta.baseUnit * (me.meta.padTop + me.meta.padBottom + me.meta.marginTop + me.meta.marginBottom)) {
    		for(var i=0;i<me.vsl.noBays;i++){
    			bay = me.bays.getAt(i).data;
    			postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    			hatchNo = bay.hatchNo;
    			
    			//Hatch
    			if (preHatchNo !== hatchNo) {
    				hatchCount++;
    				preHatchNo = hatchNo;
    				
    				offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    				accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    			}
    			
    			var bayX = me.getBayX(offsetHchX, bay, preBay, postBay, true)
    			if(me.meta.bayDirection === 'RTL') {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay;
    				}
    			} else {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay;
    				}	
    			}
    			preBay = bay;
    		}
    	}
	},
	
	adjustCraneAssignmentSequence: function(removedItem) {
		var me = this;
		
		for(var i=0;i<me.storeCraneAssignmentPlan.getCount();i++) {
			if(me.storeCraneAssignmentPlan.getAt(i).data.equipmentNo === removedItem.data.equipmentNo) {
				
				if(me.storeCraneAssignmentPlan.getAt(i).data.sequence > removedItem.data.sequence) {
					me.storeCraneAssignmentPlan.getAt(i).set({
						sequence: me.storeCraneAssignmentPlan.getAt(i).data.sequence - 1
					});
				}
			}
		}
		
	},
	
	/**
	 * 
	 * @param jobMode
	 * @param hd
	 * @param bay
	 * @param unit: VAN, MOVE, TWIN_MOVE, TANDEM_MOVE, ETC
	 */
	getPlanningUnits: function(jobMode, hd, bay, unit) {
		var me = this;
		var noDisD = 0, noDisSftD = 0, noDisH = 0, noDisSftH = 0, noLodD = 0, noLodSftD = 0, noLodH = 0, noLodSftH = 0;
		
		//TODO: calculate amount based on unit
		
		for(var i=0;i<bay.bayListInHatch.length;i++) {
			noDisD += me.bays.getAt(bay.bayListInHatch[i]).data.noDisD; 
			noDisSftD += me.bays.getAt(bay.bayListInHatch[i]).data.noDisSftD; 
			noDisH += me.bays.getAt(bay.bayListInHatch[i]).data.noDisH; 
			noDisSftH += me.bays.getAt(bay.bayListInHatch[i]).data.noDisSftH; 
			noLodD += me.bays.getAt(bay.bayListInHatch[i]).data.noLodD; 
			noLodSftD += me.bays.getAt(bay.bayListInHatch[i]).data.noLodSftD; 
			noLodH += me.bays.getAt(bay.bayListInHatch[i]).data.noLodH; 
			noLodSftH += me.bays.getAt(bay.bayListInHatch[i]).data.noLodSftH; 
		}
		
		if(jobMode === 'D') {
			if(hd === 'D') {
				return noDisD + noDisSftD;
			} else {
				return noDisH + noDisSftH;
			}
		} else {
			if(hd === 'D') {
				return noLodD + noLodSftD;
			} else {
				return noLodH + noLodSftH;
			}
		}
	},
	
	getMaxPlannedSequence: function(jobMode, hd, bay, theCraneItem) {
		var me = this;
		var maxSequence = 0;
		
		for(var i=0;i<me.storeCraneAssignmentPlan.getCount();i++) {
			if(me.storeCraneAssignmentPlan.getAt(i).data.equipmentNo === theCraneItem.data.equipmentNo) {
				
				if(me.storeCraneAssignmentPlan.getAt(i).data.sequence > maxSequence) {
					maxSequence = me.storeCraneAssignmentPlan.getAt(i).data.sequence;
				}
			}
		}
		
		return maxSequence;
	},
	//general arrangement view bay cell에 표시할 qc item
	getPlannedItemsListInSection: function(job, hd, bay) {
		var me = this;
		var items = new Array();

		if(job == 'D'){
			jobMode = CodeConstants.IOMode.IN;
		}else if(job === 'L'){
			jobMode = CodeConstants.IOMode.OUT;
		}
		for(var i=0;i<me.storeCraneAssignmentPlan.getCount();i++) {
			if(me.storeCraneAssignmentPlan.getAt(i).data.deckHoldStr === hd
				&& me.storeCraneAssignmentPlan.getAt(i).data.ioModeStr === jobMode
				//Due to String and Number comparision
				&& me.storeCraneAssignmentPlan.getAt(i).data.hatchIndex === bay.hatchNo) {		
				
				items.push(me.storeCraneAssignmentPlan.getAt(i));
			}
		}
		
		return items;
	},
	
	getPlannedItemsList: function(jobMode, hd, bay, theCraneItem) {
		var me = this;
		var items = new Array();
		
		for(var i=0;i<me.storeCraneAssignmentPlan.getCount();i++) {
			if(me.storeCraneAssignmentPlan.getAt(i).data.hd === hd
				&& me.storeCraneAssignmentPlan.getAt(i).data.workMode === jobMode
				&& me.storeCraneAssignmentPlan.getAt(i).data.hatchNo === bay.hatchNo		//Due to String and Number comparision
				&& me.storeCraneAssignmentPlan.getAt(i).data.equipmentNo === theCraneItem.data.equipmentNo) {
				
				items.push(me.storeCraneAssignmentPlan.getAt(i));
			}
		}
		
		return items;
	},
	
	onPlanningAssignment: function(jobMode, hd, bay, workMode, planInfo, theCraneItem) {
		var me = this;
		var planned = 0;
		var plannedItemsList = me.getPlannedItemsList(jobMode, hd, bay, theCraneItem);
		var plannedItemsListInSection = me.getPlannedItemsListInSection(jobMode, hd, bay);
		
		//TODO: How to handle two same crane assignment
		//For the time being, prevent multi-crane assignment
		
		if(workMode === 'erase') {
			//TODO: How to handle two same crane assignment
			//Delete All of theCrane
			if(plannedItemsList.length > 0) {
				for(var i=0;i<plannedItemsList.length;i++) {
					me.storeCraneAssignmentPlan.remove(plannedItemsList[i]);
					me.adjustCraneAssignmentSequence(plannedItemsList[i]);
				}
			}
		} else {
			if(plannedItemsListInSection.length === 0 && me.getPlanningUnits(jobMode, hd, bay, planInfo.unit) > 0) {
				var rec = Ext.create('IoTosSpExt.model.vessel.CraneAssignment', {
					origin: planInfo.origin,
					ascId: planInfo.ascId,
					tag: planInfo.tag,
					craneAssignmentId: me.generateUuid(),
					equipmentNo: theCraneItem.data.equipmentNo,
					workType: 'C',	//Container
					workMode: jobMode,
					hatchNo: bay.hatchNo,
					hd: hd,
					sequence: me.getMaxPlannedSequence(jobMode, hd, bay, theCraneItem) + 1,
					startTime: planInfo.startTime,
					foreColor: theCraneItem.data.foreColor,
					backColor: theCraneItem.data.backColor
				});
				rec.phantom = true;
				me.storeCraneAssignmentPlan.add(rec);
				
				//TODO: How to handle two same crane assignment
//				if(plannedItemsList.length > 1) {
//				} else if(plannedItemsList.length === 1) {
//				} else if(plannedItemsList.length === 0) {
//				}
			}
		}
	},

	onPlanSlot: function(x, y){
		var me = this;
		var hatchIndex = me.getHatchIndex(x, y);
		var planSlot = null;
		if(hatchIndex >= 1){
			planSlot = me.getPlanSlotStore(hatchIndex, x, y);
			if(planSlot.data.deckHold <= 0 && planSlot.data.jobMode <= 0){
				return null;
			}
		}
		return planSlot;
	},

	getPlanSlotStore: function(hatchIndex, x, y){
		var me = this;
		var a = 0, b = 0;
		var hd, jobMode;
		var planSlots = Ext.create('Ext.data.Model', {
			hatchIndex : 0,
			hd : 0,
			jobMode : 0
		});

		//Dis - Deck
		a = me.getValueY('SumDisD');
		b = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 2;
		if(y >= a && y <= b) {
			hd = CodeConstants.DeckHoldType.DECK;
			jobMode = CodeConstants.IOModeType.IN;
		}
		//Dis - Hold
		a = me.getValueY('SumDisH');
		b = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 2;
		if(y >= a && y <= b) {
			hd = CodeConstants.DeckHoldType.HOLD;
			jobMode = CodeConstants.IOModeType.IN;
		}
		//Load - Deck
		a = me.getValueY('SumLodD');
		b = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 2;
		if(y >= a && y <= b) {
			hd = CodeConstants.DeckHoldType.DECK;
			jobMode = CodeConstants.IOModeType.OUT;
		}
		//Load - Hold
		a = me.getValueY('SumLodH');
		b = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 2;
		if(y >= a && y <= b) {
			hd = CodeConstants.DeckHoldType.HOLD;
			jobMode = CodeConstants.IOModeType.OUT;
		}

		planSlots.set({
			hatchIndex : hatchIndex,
			hd : hd,
			jobMode : jobMode
		});
		return planSlots;

	},

	getHatchIndex: function(x, y){
		var me = this;
		var surface = me.getSurface('plan');
    	var hatchCount = 0, accBayUnits = 0;
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0; 
		var vesselHeight = me.meta.vesselHeight;
		
		if(y > 0){
			for(var i=0;i<me.vsl.noBays;i++){
    			bay = me.bays.getAt(i).data;
    			postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    			hatchNo = bay.hatchNo;
    			
    			//Hatch
    			if (preHatchNo !== hatchNo) {
    				hatchCount++;
    				preHatchNo = hatchNo;
    				
    				offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    				accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    			}
    			
    			var bayX = me.getBayX(offsetHchX, bay, preBay, postBay, true)
    			if(me.meta.bayDirection === 'RTL') {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay.hatchNo;
    				}
    			} else {
    				if(x > bayX && x < bayX + me.getBayWidth(bay)) {
    					return bay.hatchNo;
    				}	
    			}
    			preBay = bay;
    		}
		}
	},
	
	onPlanning: function(x, y, width, height, workMode, planInfo, theCraneItem) {
		var me = this;
		var x2 = x + width;
		var y2 = y + height;
		var hatchCount = 0, accBayUnits = 0
    	var preHatchNo, hatchNo, bay, preBay, postBay;
    	var offsetHchX = 0; 
    	var maxHatchNo = me.bays.getAt(me.vsl.noBays - 1).data.hatchNo;
    	var planned = 0;
    	var offset = me.meta.bayDirection === 'RTL'? 1: -1;

		var planSlot = me.onPlanSlot(x, y);
		var planSlot2 = me.onPlanSlot(x2, y2);
		var mouseClick = null;

		var vslSchData = Ext.ComponentQuery.query('app-vessellist')[0].getController().getVesselSchData();

		if(workMode === 'plan'){
			mouseClick = 'left';
		}else{ //erase
			mouseClick = 'right';
		}
		if(planSlot && planSlot2){			
			if(planSlot.data.jobMode != planSlot2.data.jobMode){
				var planSlots = Ext.create('Ext.data.Model', {
					isOk: false,
					message: 'sameiotype_msg'
				});
				return planSlots;
			}
			// for(var i = 0 ; i < me.bays.length ; i++){
			// 	if(hatchIndex == me.bays.getAt(i).data.hatchNo){
			// 		if(deckHold == CodeConstants.DeckHoldType.DECK){
			// 			me.bays.getAt(i).data.noDisD;
			// 		}
			// 	}
			// }
			var planSlots = Ext.create('Ext.data.Model', {
				hatchIndex : planSlot.data.hatchIndex,
				deckHold : planSlot.data.hd,
				toHatchIndex : planSlot2.data.hatchIndex,
				toDeckHold : planSlot2.data.hd,
				qcName : theCraneItem.data.qcName,
				io: planSlot.data.jobMode,
				workMode : mouseClick,
				cacheItem: vslSchData,
				isOk: true
			});			

			return planSlots;

			// me.storeCraneAssignmentPlan.suspendEvents();
	
			// me.storeCraneAssignmentPlan.add(planSlots);
			// me.storeCraneAssignmentPlan.resumeEvents();
		}else{
			var planSlots = Ext.create('Ext.data.Model', {
				isOk: false,
				message: 'qcareaselect_msg'
			});
			return planSlots;
		}
		

		

		// for(var i=0;i<me.vsl.noBays;i++){
    	// 	bay = me.bays.getAt(i).data;
    	// 	postBay = i < me.vsl.noBays - 1 ? me.bays.getAt(i+1).data : null;
    	// 	hatchNo = bay.hatchNo;
    	// 	holdNo = bay.holdNo;
    		
    	// 	//Hatch
    	// 	if (preHatchNo !== hatchNo) {
    	// 		hatchCount++;
    	// 		preHatchNo = hatchNo;
    			
    	// 		offsetHchX = me.getHatchX(hatchCount, accBayUnits);
    	// 		accBayUnits += bay.bayListInHatch.length === 1 ? parseInt(bay.name) % 2 === 0 ? 2 : 1 : 2;
    			
    	// 		var hatchWidth = me.getHatchWidth(bay);
    	// 		var a = offsetHchX - hatchWidth * offset;
		// 		var b = offsetHchX;

		// 		if((x >= a && x <= b) || (x2 > a && x2 <= b) || (x <= a && x2 >= b)) {
		// 			var hd, jobMode;
					
		// 			var a = me.getValueY('SumDisD');
		// 			var b = me.getValueY('SumDisD') + me.meta.summaryDisHeight / 2;
		// 			if((y >= a && y <= b) || (y2 > a && y2 < b) || (y <= a && y2 >= b)) {
		// 				planSections.push({
		// 					hd: 'D',
		// 					jobMode: 'D',
		// 					bay: bay,
		// 					sortKey: ('0' + bay.hatchNo).slice(-2) + '1' + '1'
		// 					//Sort key =  Biggest Hatch, Discahrge, Deck
		// 				});
		// 			}
					
		// 			var a = me.getValueY('SumDisH');
		// 			var b = me.getValueY('SumDisH') + me.meta.summaryDisHeight / 2;
		// 			if((y >= a && y <= b) || (y2 > a && y2 < b) || (y <= a && y2 >= b)) {
		// 				planSections.push({
		// 					hd: 'H',
		// 					jobMode: 'D',
		// 					bay: bay,
		// 					sortKey: ('0' + bay.hatchNo).slice(-2) + '1' + '0'
		// 					//Sort key =  Biggest Hatch, Discahrge/Load, Deck/Hold
		// 				});
		// 			}
					
		// 			var a = me.getValueY('SumLodD');
		// 			var b = me.getValueY('SumLodD') + me.meta.summaryLodHeight / 2;
		// 			if((y >= a && y <= b) || (y2 > a && y2 < b) || (y <= a && y2 >= b)) {
		// 				planSections.push({
		// 					hd: 'D',
		// 					jobMode: 'L',
		// 					bay: bay,
		// 					sortKey: ('0' + bay.hatchNo).slice(-2) + '0' + '0'
		// 					//Sort key =  Biggest Hatch, Discahrge/Load, Hold/Deck
		// 				});
		// 			}
					
		// 			var a = me.getValueY('SumLodH');
		// 			var b = me.getValueY('SumLodH') + me.meta.summaryLodHeight / 2;
		// 			if((y >= a && y <= b) || (y2 > a && y2 < b) || (y <= a && y2 >= b)) {
		// 				planSections.push({
		// 					hd: 'H',
		// 					jobMode: 'L',
		// 					bay: bay,
		// 					sortKey: ('0' + bay.hatchNo).slice(-2) + '0' + '1'
		// 					//Sort key =  Biggest Hatch, Discahrge/Load, Hold/Deck
		// 				});
		// 			}
		// 		}	
    	// 	}    		
	    // 	preBay = bay;
    	// }
		
		
		// if(planSections.length > 0) {
		// 	//Sort per lowest TierNo and lowest RowNo
		// 	planSections = me.sortByKey(planSections, 'sortKey', 'DESC');
			
		// 	me.storeCraneAssignmentPlan.suspendEvents();
			
		// 	for(var p=0;p<planSections.length;p++) {
		// 		planned += me.onPlanningAssignment(planSections[p].jobMode, planSections[p].hd, planSections[p].bay, workMode, planInfo, theCraneItem);
				
		// 	}
		// 	me.storeCraneAssignmentPlan.resumeEvents();
		// }	
		
	},
	
	onMouseDown: function(e, workMode) {
		var me = this;
		
		if(workMode) {
			var surface = me.getSurface('mask');
			var xy = surface.getEventXY(e),
		            x = xy[0],
		            y = xy[1];
			
			if(!me.tmpPlanSelectionSprite){
				me.lastEventX = x;
		        me.lastEventY = y;
		        
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
		
		if(workMode) {
			var surface = me.getSurface('mask');
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
		            cellHeight: y2 - y1
		        });
		        
		        surface.renderFrame();
		    }
        }
	},
	
	onMouseUp: function(e, workMode, planInfo, theCraneItem) {
		var me = this;
		var rst = null;
		var planFlag = false;
		
		if(workMode === 'plan' || workMode === 'erase') {
			if(me.tmpPlanSelectionSprite){
				var planFlag = true;	//For future validation
				
				if(planFlag) {
					var items = me.onPlanning(me.tmpPlanSelectionSprite.attr.cellPosX, 
							me.tmpPlanSelectionSprite.attr.cellPosY, 
							me.tmpPlanSelectionSprite.attr.cellWidth, 
							me.tmpPlanSelectionSprite.attr.cellHeight,
							workMode,
							planInfo,
							theCraneItem);
					
					if(items != null){
						if(!items.data.isOk){
							if(items.data.message){
								me.fireEvent('toastMessage', items.data.message);
							}							
							// return null;
						}else{

						}
					}
					
					me.onMouseLeave(e, workMode);
					return items;
				}
				me.onMouseLeave(e, workMode);
			}
			
		} else if(workMode === 'view') {
			var bay = me.getBay(e);
			
			me.onMouseLeave(e, workMode);
			return bay;
		}
	},
	
	onMouseLeave: function(e, workMode) {
		var me = this;
		
		if(workMode){
			var surface = me.getSurface('mask');
			
			if(me.tmpPlanSelectionSprite){
				me.tmpPlanSelectionSprite.setAttributes({
					hidden: true
				});
				me.tmpPlanSelectionSprite= null;
		
				surface.renderFrame();
			}
		}
	},
	
	onScroll: function (x, y) {
		var me = this;
		var craneSurface = me.getSurface('plan');
		
		craneSurface.setRect([0,y,me.meta.viewWidth,me.meta.vesselAreaHeight + me.meta.assignmentHeight]);
		craneSurface.renderFrame();
		
		me.scrollX = x;
		me.scrollY = y;
	},
	
	getCraneIntensity: function(craneWorkDist) {
		var me = this;
		
		//To calculate Crane Intensity
		me.totalMoves = 0;
		me.longCraneMoves = 0;
		var hatchMoves = new Array();
		
		//Max Amount
		for(var i=0;i<me.vsl.noBays;i++){
			var bay = me.bays.getAt(i).data;
			
			//To calculate Crane Intensity
    		me.totalMoves += bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD;
    		
    		var hatchIdx = -1
    		for(var j=0;j<hatchMoves.length;j++) {
    			if(hatchMoves[j].hatchNo === bay.hatchNo) {
    				hatchIdx = j;
    				break;
    			}
    		}
    		
    		if(hatchIdx === -1) {
    			hatchMoves.push({
    				hatchNo: bay.hatchNo,
    				moves: bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD
    			});
    		} else {
    			hatchMoves[hatchIdx].moves += bay.noDisH + bay.noDisSftH + bay.noLodH + bay.noLodSftH + bay.noDisD + bay.noDisSftD + bay.noLodD + bay.noLodSftD;
    		}
		}
		
		//To calculate Crane Intensity
		if(craneWorkDist === '40') {
			for(var i=0;i<hatchMoves.length;i++){
				if(hatchMoves[i].hatchNo !== me.vsl.deckhouseIndex) {
					var moves = hatchMoves[i].moves;
					for(var j=1;j<2;j++) {
						if(i+j< hatchMoves.length) {
							moves += hatchMoves[i+j].moves;
						}
					}
					
					if(moves > me.longCraneMoves) {
						me.longCraneMoves = moves;
					}
				}
			}
			
		} else {
			for(var i=0;i<hatchMoves.length;i++){
				var moves = hatchMoves[i].moves;
				var j=0;
				if(i+1< hatchMoves.length && hatchMoves[i].hatchNo != me.vsl.deckhouseIndex) {
					j++;
					moves += hatchMoves[i+j].moves;
				}

				if(i+2< hatchMoves.length && hatchMoves[i+1].hatchNo != me.vsl.deckhouseIndex) {
					j++;
					moves += hatchMoves[i+j].moves;
				}
				
				if(moves > me.longCraneMoves) {
					me.longCraneMoves = moves;
				}
			}
		}
		
		if(me.longCraneMoves > 0) {
			return me.totalMoves / me.longCraneMoves;
		}
		return 0;
	},
	
	
//	getBaseUnit: function(width, height) {
//		var me = this;
//		if(!me.meta) return 0;
//		
//		var baseWidth = width / me.meta.viewWidth * me.meta.baseUnit;
//		return baseWidth;
//	},
	
	getBaseUnit: function(width, height) {
		var me = this;
		if(!me.meta) return 0;
		
		var baseWidth = width / me.meta.viewWidth * me.meta.baseUnit;
		var baseHeight = height / me.meta.viewHeight * me.meta.baseUnit;
		
		return baseWidth < baseHeight ? baseWidth : baseHeight;
	},
	
	getFirstBayByHatchNo: function(bays, hatchNo) {
		for(var i=0;i<bays.length;i++) {
			if(bays.getAt(i).data.hatchNo === hatchNo) {
				return bays.getAt(i).data;
			}
		}
		return null;
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
	}
});

