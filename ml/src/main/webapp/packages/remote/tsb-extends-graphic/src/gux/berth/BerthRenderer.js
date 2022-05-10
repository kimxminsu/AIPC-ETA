Ext.define('TSB.gux.berth.BerthRenderer', {
    /**
     * @memberOf TSB.gux.berth.BerthRenderer
     */
	extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite'
	],
	
    config: {
    	viewMode: 'auto',
        innerRect: [0, 0, 1, 1],
        resizing: 0,
        div: null,
        isCompleted: false
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },	    

    alias: 'widget.app-berthrenderer',
    
    scrollX: 0,
	scrollY: 0,

    performLayout: function () {
		
		if (this.resizing === 1) {
			return;
		}

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
    	
    	console.log('meta start');
		//Define meta object
		me.meta = new Object();
		
		//Base Unit
		me.meta.baseTimeUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseTimeUnit')).data.value);
		me.meta.baseTimeUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseTimeUnitOrign')).data.value);
		me.meta.baseBerthUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBerthUnit')).data.value);
		me.meta.baseBerthUnitOrign = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBerthUnitOrign')).data.value);
		me.meta.baseFixedUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseFixedUnit')).data.value);	//Pixel per meter
		
		//View Mode
		me.meta.berthLayout = 'top'; //Berth Position - Default
		me.meta.berthLayout = me.storeMeta.getAt(me.storeMeta.findExact('key','berthLayout')).data.value;
		me.meta.berthDirection = 'RTL'; //Berth Direction - Default
		me.meta.berthDirection = me.storeMeta.getAt(me.storeMeta.findExact('key','berthDirection')).data.value;
		me.meta.bittDirection = 'RTL'; //Bitt Direction - Default
		me.meta.bittDirection = me.storeMeta.getAt(me.storeMeta.findExact('key','bittDirection')).data.value;
		me.meta.alongsideProjection = 'OTI'; //alongsideProjection Direction - Default
		me.meta.alongsideProjection = me.storeMeta.getAt(me.storeMeta.findExact('key','alongsideProjection')).data.value;

		//Width Values
		me.meta.baseWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseWidth')).data.value);	//Pixel per meter
		me.meta.baseFixedBerthWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseFixedBerthWidth')).data.value);	//Fixed Pixel for jetties
		me.meta.defaultVesselWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','defaultVesselWidth')).data.value);	//Fixed Pixel for jetties
		me.meta.timelineArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','timelineArea')).data.value);
		
		//Height Values
		me.meta.baseHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseHeight')).data.value);	//Pixel per hour
		me.meta.stsCoverageArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','stsCoverageArea')).data.value);
		me.meta.terminalNameArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','terminalNameArea')).data.value);
		me.meta.berthNameArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthNameArea')).data.value);
		me.meta.meterArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','meterArea')).data.value);
		me.meta.bittArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','bittArea')).data.value);
		
		//View Options
		me.meta.viewSTSCoverage = me.storeMeta.getAt(me.storeMeta.findExact('key','viewSTSCoverage')).data.value;
		me.meta.viewTerminalName = me.storeMeta.getAt(me.storeMeta.findExact('key','viewTerminalName')).data.value;
		me.meta.viewBerthName = me.storeMeta.getAt(me.storeMeta.findExact('key','viewBerthName')).data.value;
		me.meta.viewMeter = me.storeMeta.getAt(me.storeMeta.findExact('key','viewMeter')).data.value;
		me.meta.viewBitt = me.storeMeta.getAt(me.storeMeta.findExact('key','viewBitt')).data.value;
		
		//Offsets
		me.meta.timelineHoursOffset = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','timelineHoursOffset')).data.value);
		me.meta.berthMeterGuideOffset = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthMeterGuideOffset')).data.value);
		me.meta.berthLengthOffset = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthLengthOffset')).data.value);

		//Colors
		me.meta.bittColor = me.storeMeta.getAt(me.storeMeta.findExact('key','bittColor')).data.value;
		me.meta.bittLineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','bittLineColor')).data.value;
		me.meta.berthLineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','berthLineColor')).data.value;
		me.meta.berthTypeLineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','berthTypeLineColor')).data.value;
		me.meta.vesselGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselGuideColor')).data.value;
		me.meta.vesselBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselBackcolor')).data.value;
		me.meta.vesselPlannedBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselPlannedBackcolor')).data.value;
		me.meta.vesselBerthedBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselBerthedBackcolor')).data.value;
		me.meta.vesselDepartedBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselDepartedBackcolor')).data.value;
		me.meta.vesselNameColor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselNameColor')).data.value;
		me.meta.vesselBerthInfoBoxBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','vesselBerthInfoBoxBackcolor')).data.value;
		me.meta.currentDateColor = me.storeMeta.getAt(me.storeMeta.findExact('key','currentDateColor')).data.value;
		me.meta.holidayColor = me.storeMeta.getAt(me.storeMeta.findExact('key','holidayColor')).data.value;
		me.meta.saturdayColor = me.storeMeta.getAt(me.storeMeta.findExact('key','saturdayColor')).data.value;
		me.meta.workdayColor = me.storeMeta.getAt(me.storeMeta.findExact('key','workdayColor')).data.value;
		me.meta.berthBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','berthBackcolor')).data.value;
		me.meta.timelineBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','timelineBackcolor')).data.value;
		me.meta.timelineForecolor = me.storeMeta.getAt(me.storeMeta.findExact('key','timelineForecolor')).data.value;
		me.meta.hourGuideColor = me.storeMeta.getAt(me.storeMeta.findExact('key','hourGuideColor')).data.value;
		me.meta.terminalNameColor = me.storeMeta.getAt(me.storeMeta.findExact('key','terminalNameColor')).data.value;
		me.meta.berthNameColor = me.storeMeta.getAt(me.storeMeta.findExact('key','berthNameColor')).data.value;
		me.meta.meterNameColor = me.storeMeta.getAt(me.storeMeta.findExact('key','meterNameColor')).data.value;
		me.meta.bittNameColor = me.storeMeta.getAt(me.storeMeta.findExact('key','bittNameColor')).data.value;
		me.meta.planGuidelineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','planGuidelineColor')).data.value;
		me.meta.planForecolor = me.storeMeta.getAt(me.storeMeta.findExact('key','planForecolor')).data.value;
		me.meta.planBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','planBackcolor')).data.value;
		me.meta.planTextcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','planTextcolor')).data.value;
		me.meta.defaultFontColor = me.storeMeta.getAt(me.storeMeta.findExact('key','defaultFontColor')).data.value;
		
		// tooltip
		me.meta.tooltipHeaderBackColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipHeaderBackColor')).data.value;
		me.meta.tooltipBodyBackColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipBodyBackColor')).data.value;
		me.meta.tooltipHeaderForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipHeaderForeColor')).data.value;
		me.meta.tooltipBodyForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipBodyForeColor')).data.value;
		me.meta.tooltipETDForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipETDForeColor')).data.value;
		me.meta.tooltipVesselNameForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipVesselNameForeColor')).data.value;

		
		//FontSize
		me.meta.terminalNameFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','terminalNameFontSize')).data.value);
		me.meta.berthNameFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthNameFontSize')).data.value);
		me.meta.stsFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','stsFontSize')).data.value);
		me.meta.meterFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','meterFontSize')).data.value);
		me.meta.bittFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','bittFontSize')).data.value);
		me.meta.dateTimeFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','dateTimeFontSize')).data.value);
		me.meta.vesselFontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','vesselFontSize')).data.value);
		
		//Font Type
		me.meta.fontType = me.storeMeta.getAt(me.storeMeta.findExact('key','fontType')).data.value;
		
		//Fixed Size
		var viewSTSCoverageOffset = me.meta.viewSTSCoverage === 'Y' ? 1 : 0;
		var viewTerminalNameOffset = me.meta.viewTerminalName === 'Y' ? 1 : 0;
		var viewBerthNameOffset = me.meta.viewBerthName === 'Y' ? 1 : 0;
		var viewMeterOffset = me.meta.viewMeter === 'Y' ? 1 : 0;
		var viewBittOffset = me.meta.viewBitt === 'Y' ? 1 : 0;
		me.meta.berthHeight = me.meta.baseFixedUnit * (me.meta.stsCoverageArea * viewSTSCoverageOffset + me.meta.terminalNameArea * viewTerminalNameOffset + me.meta.berthNameArea * viewBerthNameOffset + me.meta.meterArea * viewMeterOffset + me.meta.bittArea * viewBittOffset);
		me.meta.timelineWidth = me.meta.timelineArea * me.meta.baseFixedUnit;
		
		//For caclulating view size
		var totalMeterLength = 0, fixedLengthCnt = 0;
		me.berths.each(function(record,idx){
			if(record.data.drawable === 1) {
				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					totalMeterLength += parseFloat(record.data.length);
				} else {
					fixedLengthCnt++;
				}
			}
		});
		
		me.meta.berthWidth = me.meta.baseBerthUnit * (me.meta.baseWidth * totalMeterLength + me.meta.baseFixedBerthWidth * fixedLengthCnt);
		me.meta.windowWidth = me.meta.berthWidth;
		
		me.meta.days = 30;	//Default 30 days
		if(me.storeMeta.findExact('key','fromDate') > -1 && me.storeMeta.findExact('key','toDate') > -1 ){
			me.meta.fromDate = Ext.Date.parse(me.storeMeta.getAt(me.storeMeta.findExact('key','fromDate')).data.value, "Y-m-d");
			me.meta.toDate = Ext.Date.parse(me.storeMeta.getAt(me.storeMeta.findExact('key','toDate')).data.value, "Y-m-d");
			me.meta.days = Ext.Date.diff(me.meta.fromDate, me.meta.toDate, Ext.Date.DAY) + 1;
		} else {
			me.meta.days = Ext.Date.getDaysInMonth(new Date());
			me.meta.fromDate = Ext.Date.getFirstDateOfMonth(new Date());
			me.meta.toDate = Ext.Date.getLastDateOfMonth(new Date());
		}

		me.meta.windowHeight = me.meta.baseTimeUnit * me.meta.baseHeight * 24 * me.meta.days;	
		me.meta.viewWidth = me.meta.timelineWidth + me.meta.berthWidth;
		me.meta.viewHeight = me.meta.berthHeight + me.meta.windowHeight;
		
    	console.log('meta end');
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
		me.getSurface('main').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('plan').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		
		me.getSurface('mask').setRect([me.scrollX,0,me.meta.timelineWidth,me.meta.viewHeight]);	//Timeline
		me.getSurface('blink').setRect([0,me.scrollY,me.meta.viewWidth,me.meta.berthHeight]);	//Berth
		me.getSurface('legend').setRect([me.scrollX,me.scrollY,me.meta.timelineWidth,me.meta.berthHeight]);	//Rigit Top Coner Box

		me.resizing = 0;
		
		//Create Planning Sprite
		var planSurface = me.getSurface('plan');
		me.bodySprite = planSurface.add({
			type: 'rect',
	        strokeStyle: me.meta.planForecolor,
	        fillStyle: me.meta.planBackcolor,
	        fillOpacity: 0.5,	//1: Solid
	    	hidden: true,
	    	customId: 'id-berthplan-body'
	    });

		me.guidelineLTSprite = planSurface.add({
			type: 'line',
        	strokeStyle: me.meta.planGuidelineColor,
        	lineDash: [2,2],
        	hidden: true
		});
		me.guidelineLBSprite = planSurface.add({
			type: 'line',
			strokeStyle: me.meta.planGuidelineColor,
			lineDash: [2,2],
			hidden: true
		});
		me.guidelineTLSprite = planSurface.add({
			type: 'line',
			strokeStyle: me.meta.planGuidelineColor,
			lineDash: [2,2],
			hidden: true
		});
		me.guidelineTRSprite = planSurface.add({
			type: 'line',
			strokeStyle: me.meta.planGuidelineColor,
			lineDash: [2,2],
			hidden: true
		});
		me.resizeT = planSurface.add({
			// type: 'rect',
			type: 'triangle',
	        strokeStyle: me.meta.planForecolor,
	        fillStyle: me.meta.planForecolor,
	        fillOpacity: 1,
	    	hidden: true,
			customId: 'id-berthplan-resizeT',
			hideOnMove: true
	    }); 
		me.resizeB = planSurface.add({
			// type: 'rect',
			type: 'triangle',
			strokeStyle: me.meta.planForecolor,
			fillStyle: me.meta.planForecolor,
			fillOpacity: 1,
			hidden: true,
			customId: 'id-berthplan-resizeB',
			hideOnMove: true
		}); 
		me.textLeftPos = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType,
			fillStyle: me.meta.planTextcolor,
			textAlign: 'left',
			textBaseline: 'top',
			hidden: true,
			customId: 'id-berthplan-body'
		}); 
		me.textRightPos = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType,
			fillStyle: me.meta.planTextcolor,
			textAlign: 'right',
			textBaseline: 'top',
			hidden: true,
			customId: 'id-berthplan-body'
		}); 
		me.textTimePos = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType,
			fillStyle: me.meta.planTextcolor,
			textAlign: 'center',
			textBaseline: 'top',
			hidden: true,
			customId: 'id-berthplan-body'
		});
		me.addPlanTooltipSprites(planSurface);
		me.addTobePlanSprites(planSurface);
	},
	
	addPlanTooltipSprites : function(planSurface){
		var me = this;

		me.bodyTooltipSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.bittColor,
			lineWidth : 0.5,
	        fillStyle: me.meta.tooltipBodyBackColor,
	        fillOpacity: 1,	//1: Solid
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
		});
		
		me.bodyTooltipHeaderSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.bittColor,
			lineWidth : 0.5,
	        fillStyle: me.meta.tooltipHeaderBackColor,
	        fillOpacity: 1,	//1: Solid
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
		});
		
		me.bodyTooltipVslCallIdSprite = planSurface.add({
			type: 'text',
	        font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipHeaderForeColor,
			textAlign: 'center',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
		});
		
		me.bodyTooltipVslNameSprite = planSurface.add({
			type: 'text',
	        font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipVesselNameForeColor,
			textAlign: 'left',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
		});
		
		me.bodyTooltipETASprite = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipBodyForeColor,
			textAlign: 'left',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
		});
		
		me.bodyTooltipETDSprite = planSurface.add({
			type: 'text',
	        font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipETDForeColor,
			textAlign: 'left',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-berthplan-bodyTooltip',
	    });
	},

	addTobePlanSprites(planSurface) {
		var me = this;
		me.bodyTobePlanETBRectSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.planTextcolor,
			lineWidth : 0.5,
			fillStyle: me.meta.tooltipBodyBackColor,
			fillOpacity: 1,	//1: Solid
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});

		me.bodyTobePlanStartingBittRectSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.planTextcolor,
			lineWidth : 0.5,
			fillStyle: me.meta.tooltipBodyBackColor,
			fillOpacity: 1,	//1: Solid
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});

		me.bodyTobePlanETURectSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.planTextcolor,
			lineWidth : 0.5,
			fillStyle: me.meta.tooltipBodyBackColor,
			fillOpacity: 1,	//1: Solid
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});

		me.bodyTobePlanETBTextSprite = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.defaultFontColor,
			textAlign: 'center',
			textBaseline: 'middle',
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});

		me.bodyTobePlanBittsTextSprite = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.defaultFontColor,
			textAlign: 'center',
			textBaseline: 'middle',
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});

		me.bodyTobePlanETUTextSprite = planSurface.add({
			type: 'text',
			font: me.meta.vesselFontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.defaultFontColor,
			textAlign: 'center',
			textBaseline: 'middle',
			hidden: true,
			customId: 'id-berthplan-bodyTobePlan',
		});
	},
    
    redraw: function (record, change) {
        var me = this,
            rect = me.getMainRect();
        
        if(!rect) {
            return;
        }
        console.log("redraw start");
        // console.log(change);
        // console.log(record);
        
		me.berths = me.storeBerth;
	    me.bitts = me.storeBitt;
	    me.plans = me.storeBerthPlan;

        me.initializeMetaValue();
    	me.removeAll(true);
    	me.initializeDrawComponent();
    	
        var berthSurface = me.getSurface('blink');
        var timelineSurface = me.getSurface('mask');
        var legendSurface = me.getSurface('legend');
        var windowSurface = me.getSurface('main');
    	
        //Draw Berth Structure
		config =  {
		    meta: me.meta,       
		    berths: me.berths,
		    bitts: me.bitts,
			x: 0,
			y: 0
		};
		berthSurface.add(Ext.create('widget.app-berthstructuredraw', config));
    	
        //Draw Timeline Structure
		config =  {
		    meta: me.meta,
		    berths: me.berths,
			x: 0,
			y: me.meta.berthHeight
		};
		timelineSurface.add(Ext.create('widget.app-berthtimelinedraw', config));
		
		//Draw Legend Box
		config =  {
				meta: me.meta,
				x: 0,
				y: 0
		};
		legendSurface.add(Ext.create('widget.app-berthlegenddraw', config));

		 
        //Draw Main Berth Window
		config =  {
		    meta: me.meta,
		    berths: me.berths,
		    bitts: me.bitts,
		    plans: me.plans,
		    viewMode:  me.viewMode,
			x: me.meta.timelineWidth,
			y: me.meta.berthHeight
		};
		windowSurface.add(Ext.create('widget.app-berthwindowdraw', config));
		
		// renders all the sprites in the surface
		berthSurface.renderFrame();		
		timelineSurface.renderFrame();
		legendSurface.renderFrame();
		windowSurface.renderFrame();

		me.isCompleted = true;
		
		console.log("redraw end");
    },
	
	getBerthPlanTimeRule: function(rec, type) {
		var me = this;
		if(type === 'arrival') {
			return rec.atb ? rec.atb : rec.etb ? rec.etb : rec.eta;
		} else {
			if( me.viewMode === 'auto'){
				var currentTime = new Date();
				var calcTime = rec.etu ? rec.etu : rec.etd
				
				return rec.atu ? rec.atu : (calcTime > currentTime ? calcTime : currentTime);
			}else{
				
				return rec.atu ? rec.atu : rec.etu ? rec.etu : rec.etd;
			}
		}
	},
	
	getBerthingWidth: function(rec) {
		var me = this;
		var berthingWidth;
		
		if(rec.berthAlongside === 'S' || rec.berthAlongside === 'P') {	//Starboard or Portside
			berthingWidth = parseFloat(rec.loa);
		} else {	//Bow or Stern
			var w = parseFloat(rec.width);
			berthingWidth = w > 1 ? w : me.meta.defaultVesselWidth;	//Temp = 1. Need to be decided
		}
		
		return berthingWidth;
	},
	
	getSelectedBerthPlanIndexes: function(x, y) {
		var me = this;
		var indexes = new Array();
		
		//Global Flag for Planning
		// me.isPlanning = false;
		
		//Filter out Berth Area, Timeline Area
		if(x < me.meta.timelineWidth || y < me.meta.berthHeight) {
			return null;
		}
		
		//Draw Berth Plan
		me.plans.each(function(record,idx){
			var berthCdIdx = me.berths.findExact('berthCd', record.data.berthCd);
			if(berthCdIdx > -1) {
				berthRecord = me.berths.getAt(berthCdIdx);
				if(berthRecord.data.drawable === 1) {
					var pos = me.getBerthPlanPos(record.data);
					
					if(x >= pos[0] + me.meta.timelineWidth && x <= pos[0] + pos[2] + me.meta.timelineWidth
						&& y >= pos[1] + me.meta.berthHeight && y <= pos[1] + pos[3] + me.meta.berthHeight) {
						indexes.push(idx);
					}
				}
			}
		});
		
		return indexes;
	}, 

	getSelectedBerthPlanIndexesById: function(jpvcNo) {
		var me = this;
		var indexes = new Array();
		var x, y;
		//Global Flag for Planning
		me.isPlanning = false;
		
		//Draw Berth Plan
		me.plans.each(function(record,idx){
			var berthCdIdx = me.berths.findExact('berthCd', record.data.berthCd);
			if(berthCdIdx > -1) {
				berthRecord = me.berths.getAt(berthCdIdx);
				if(berthRecord.data.drawable === 1) {
					if(record.data.jpvcNo===jpvcNo){
						indexes.push(idx);
					}
				}
			}
		});
		
		return indexes;
	},

	getMinDistViolateVessels : function(rec){
		var me = this;
		var overlappedVessels = [];
		var minDist = 20 * me.meta.baseWidth;

		var currPos = me.getBerthPlanPos(rec);
		var currXMin = currPos[0];
		var currXMax = currPos[0] + currPos[2];
		var currYMin = currPos[1];
		var currYMax = currPos[1] + currPos[3];

		me.plans.each(function(record,idx){
			if(record.get('jpvcNo') !== rec.jpvcNo){
				var recPos = me.getBerthPlanPos(record.data);
				var recXMin = recPos[0];
				var recXMax = recPos[0] + recPos[2];
				var recYMin = recPos[1];
				var recYMax = recPos[1] + recPos[3];

				if(me.inRange(recYMin, currYMin, currYMax) || me.inRange(recYMax, currYMin, currYMax)
					|| me.inRange(currYMin, recYMin, recYMax) || me.inRange(currYMax, recYMin, recYMax)){			// If within date range
					if(me.inRange(recXMin, currXMin, currXMax) || me.inRange(recXMax, currXMin, currXMax)){			// If overlap selected vessel
						overlappedVessels.push(rec);
					} else if(me.inRange(currXMin, recXMin, recXMax) || me.inRange(currXMax, recXMin, recXMax)){	// If overlap record vessel
						overlappedVessels.push(rec);
					} else if(Math.abs(recXMin - currXMax) < minDist || Math.abs(recXMax - currXMin) < minDist){	// If within minimum distance
						overlappedVessels.push(rec);
					}
				}

			}
		});

		return overlappedVessels;
	},

	inRange : function(x, min, max) {
		return ((x-min)*(x-max) <= 0);
	},

	selectBerthPlan: function(rec) {
		var me = this;
		var pos = me.getBerthPlanPos(rec);
		
		me.renderBerthPlanSprites(pos, rec)
		me.lastEventPos = pos;
	},
	
	renderBerthPlanSprites: function(pos, rec, opts, div) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var planInfo = me.getBerthPlanInfo(pos, rec);
		var leftPos = me.meta.berthDirection === 'RTL' ? planInfo[1] : planInfo[0];
		var rightPos = me.meta.berthDirection === 'RTL' ? planInfo[0] : planInfo[1];
		var startPos = me.meta.berthDirection === 'RTL' ? rightPos : leftPos;
		
		var flagPos = true, flagTime = true;
		
		if(opts && div) {
			if(opts[0].pressed && opts[1].pressed && div === 'id-berthplan-body') {
				var rx = startPos % opts[0].value;
				var ry = parseInt(Ext.Date.format(planInfo[2], 'i')) % opts[1].value;
				
				if(startPos % opts[0].value !== 0 || parseInt(Ext.Date.format(planInfo[2], 'i')) % opts[1].value !== 0) {
					planSurface.renderFrame();
					return;
				}
			} else {
				if(opts[0].pressed && div === 'id-berthplan-body') {
					if(startPos % opts[0].value !== 0) {
						planSurface.renderFrame();
						return;
					}
				}
				
				if(opts[1].pressed && (div === 'id-berthplan-body' || div === 'id-berthplan-resizeT')) {
					if(parseInt(Ext.Date.format(planInfo[2], 'i')) % opts[1].value !== 0) {
						planSurface.renderFrame();
						return;
					}
					
				}
				
				if(opts[1].pressed && div === 'id-berthplan-resizeB') {
					if(parseInt(Ext.Date.format(planInfo[3], 'i')) % opts[1].value !== 0) {
						planSurface.renderFrame();
						return;
					}
				}
			}
			
		}
		
		if(planInfo[5] === 'EDJ' || planInfo[5] === 'WRF' || planInfo[5] === 'NDJ') {
			me.textLeftPos.setAttributes({
				x: pos[0] + me.meta.timelineWidth,
				y: pos[1] + pos[3] / 3 + me.meta.berthHeight,
				text: leftPos,
				hidden: false
			});
			me.textRightPos.setAttributes({
				x: pos[0] + pos[2] + me.meta.timelineWidth,
				y: pos[1] + pos[3] / 3 + me.meta.berthHeight,
				text: rightPos,
				hidden: false
			});
		}
		
		me.textTimePos.setAttributes({
			x: pos[0] + me.meta.timelineWidth + pos[2] / 2,
			y: pos[1] + pos[3] / 2 + me.meta.berthHeight,
			text: Ext.Date.format(planInfo[2], 'd-m H:i') + ' ~ ' + Ext.Date.format(planInfo[3], 'd-m H:i'),
			hidden: false
		});
		
		me.bodySprite.setAttributes({
			x: pos[0] + me.meta.timelineWidth,
			y: pos[1] + me.meta.berthHeight,
			width: pos[2],
			height: pos[3],
			hidden: false
		}); 
		me.guidelineLTSprite.setAttributes({
			fromX: pos[0] + me.meta.timelineWidth,
			fromY: pos[1] + me.meta.berthHeight,
			toX: me.meta.timelineWidth,
			toY: pos[1] + me.meta.berthHeight,
			hidden: false
		});
		me.guidelineLBSprite.setAttributes({
			fromX: pos[0] + me.meta.timelineWidth,
			fromY: pos[1] + pos[3] + me.meta.berthHeight,
			toX: me.meta.timelineWidth,
			toY: pos[1] + pos[3] + me.meta.berthHeight,
			hidden: false
		});
		me.guidelineTLSprite.setAttributes({
			fromX: pos[0] + me.meta.timelineWidth,
			fromY: pos[1] + me.meta.berthHeight,
			toX: pos[0] + me.meta.timelineWidth,
			toY: me.meta.berthHeight,
			hidden: false
		});
		me.guidelineTRSprite.setAttributes({
			fromX: pos[0] + pos[2] + me.meta.timelineWidth,
			fromY: pos[1] + me.meta.berthHeight,
			toX: pos[0] + pos[2] + me.meta.timelineWidth,
			toY: me.meta.berthHeight,
			hidden: false
		});
		me.resizeT.setAttributes({
			translationX: pos[0] + pos[2] / 2 + me.meta.timelineWidth,
			translationY: pos[1] +  me.meta.berthHeight - 8,
			size: 8,
			hidden: false,
			cursor : 'n-resize'
		});
		me.resizeB.setAttributes({
			translationX: pos[0] + pos[2] / 2 + me.meta.timelineWidth,
			translationY: pos[1] + pos[3] + me.meta.berthHeight + 8,
			size: 8,
			rotation : 180,
			hidden: false,
			cursor : 's-resize'
		});
		me.renderBerthPlanTooltipSprites(pos, rec, opts, div);

		planSurface.renderFrame();
	},

	renderBerthPlanTooltipSprites : function(pos, rec, opts, div){
		var me = this;
		var windowWidth = me.getSize().width;
		var windowHeight = me.getSize().height;
		var tooltipWidth = 150;
		var tooltipHeight = 100;

		var planWidth = pos[0]+pos[2];
		var planHeight = pos[1];
		var tooltipTextOffsetTop = (tooltipHeight/5 - me.meta.vesselFontSize)/2;
		var tooltipTextOffsetLeft = 5;
		var tooltipMarginLeft = 8;
		var scrollbarWidth = 15;

		var tooltipCurrPos = {
			x :	windowWidth-planWidth-scrollbarWidth-me.meta.timelineWidth,
			y : windowHeight - planHeight - me.meta.berthHeight
		}

		var tooltipXPos;
		var tooltipYPos;
		if(tooltipWidth+tooltipMarginLeft > tooltipCurrPos.x){
			tooltipXPos = pos[0] + me.meta.timelineWidth - (tooltipWidth + tooltipMarginLeft);
		} else {
			tooltipXPos = pos[0] + me.meta.timelineWidth + pos[2] + tooltipMarginLeft;
		}

		if(tooltipHeight > tooltipCurrPos.y){
			tooltipYPos = windowHeight - 100;
		} else {
			tooltipYPos = pos[1] + me.meta.berthHeight;
		}

		me.bodyTooltipSprite.setAttributes({
			x: tooltipXPos,
			y: tooltipYPos,
			width: tooltipWidth,
			height: tooltipHeight,
			hidden: false
		});

		me.bodyTooltipHeaderSprite.setAttributes({
			x: tooltipXPos,
			y: tooltipYPos,
			width: tooltipWidth,
			height: tooltipHeight/5,
			hidden: false
		});

		me.bodyTooltipVslCallIdSprite.setAttributes({
			x: tooltipXPos + tooltipWidth/2,
			y: tooltipYPos +tooltipTextOffsetTop,
			hidden: false,
			text : rec.jpvcNo
		});

		me.bodyTooltipVslNameSprite.setAttributes({
			x: tooltipXPos + tooltipTextOffsetLeft,
			y: me.bodyTooltipVslCallIdSprite.attr.y + tooltipHeight/5,
			hidden: false,
			text : rec.vesselName
		});

		me.bodyTooltipETASprite.setAttributes({
			x: tooltipXPos + tooltipTextOffsetLeft,
			y: me.bodyTooltipVslNameSprite.attr.y + tooltipHeight/5,
			hidden: false,
			text: "ETA : " + Ext.Date.format(rec.eta, 'd-m H:i'),
		});

		me.bodyTooltipETDSprite.setAttributes({
			x: tooltipXPos + tooltipTextOffsetLeft,
			y: me.bodyTooltipETASprite.attr.y + tooltipHeight/5,
			hidden: false,
			text: "ETD : " + Ext.Date.format(rec.etd, 'd-m H:i'),
		});
	},

	renderTobePlanSprites : function(pos, rec, opts, div){
		var me = this;
		var planInfo = me.getBerthPlanInfo(pos, rec);
		var windowWidth = me.getSize().width;
		var windowHeight = me.getSize().height;

		let etbWidth = 120, etuWidth = 120, startingBittWidth = 50
			, leftOverWidth = 0, widthRemaining = 0, scrollThickness = 15;
		let spriteHeight = 20;

		let totalWidth = etbWidth + etuWidth + startingBittWidth;

		var basePos = {
			x : pos[0] + me.meta.timelineWidth,
			y : pos[1] + pos[3] + me.meta.berthHeight
		};

		leftOverWidth = totalWidth - pos[2];
		widthRemaining = windowWidth - me.meta.timelineWidth - basePos.x - scrollThickness;

		if(leftOverWidth > widthRemaining){
			basePos.x = windowWidth - totalWidth;
		}

		me.bodyTobePlanETBRectSprite.setAttributes({
			x: basePos.x,
			y: basePos.y,
			width: etbWidth,
			height: spriteHeight,
			hidden: false
		});

		me.bodyTobePlanStartingBittRectSprite.setAttributes({
			x: basePos.x + etbWidth,
			y: basePos.y,
			width: startingBittWidth,
			height: spriteHeight,
			hidden: false
		});

		me.bodyTobePlanETURectSprite.setAttributes({
			x: basePos.x + etbWidth + startingBittWidth,
			y: basePos.y,
			width: etuWidth,
			height: spriteHeight,
			hidden: false
		});

		me.bodyTobePlanETBTextSprite.setAttributes({
			x: basePos.x + (etbWidth/2),
			y: basePos.y + spriteHeight/2,
			hidden: false,
			text: Ext.Date.format(planInfo[2], 'd-m H:i') + " ETB",
		});

		me.bodyTobePlanBittsTextSprite.setAttributes({
			x: basePos.x + etbWidth + (startingBittWidth/2),
			y: basePos.y + spriteHeight/2,
			hidden: false,
			text: planInfo[0],
		});

		me.bodyTobePlanETUTextSprite.setAttributes({
			x: basePos.x + etbWidth + startingBittWidth + (etuWidth/2),
			y: basePos.y + spriteHeight/2,
			hidden: false,
			text: Ext.Date.format(planInfo[3], 'd-m H:i') + " ETU",
		});
	},
	
	hideTooltip : function(isMove){
		var me = this;
		var surface = me.getSurface('plan');
		var items = surface.getItems();

		for(var i=0;i<items.length;i++){
			if(items[i].customId == 'id-berthplan-bodyTooltip' || (isMove && items[i].hideOnMove)){
				items[i].setAttributes({
					hidden: true
				});
			}
		}
	},

	hideTobeSprites : function(){
		var me = this;
		var surface = me.getSurface('plan');
		var items = surface.getItems();

		for(var i=0;i<items.length;i++){
			if(items[i].customId == 'bodyTobePlan'){
				items[i].setAttributes({
					hidden: true
				});
			}
		}
	},

	validatePlanning: function (div, rec) {
		var me = this;
		
		if(div === 'id-berthplan-body') {
			if(rec.atu || rec.atd){
				toastMessageTask.delay(200, null, me, ['berthplan_atu_exists_msg', null, 'warn', false]);
				return false;
			} else if(rec.atb) {
				toastMessageTask.delay(200, null, me, ['berthplan_atb_exists_msg', null, 'warn', false]);
				return false;
			}
		} else if(div === 'id-berthplan-resizeT') {
			if(rec.atb) {
				toastMessageTask.delay(200, null, me, ['berthplan_atb_exists_msg', null, 'warn', false]);
				return false;
			}
		} else if(div === 'id-berthplan-resizeB') {
			if(rec.atu) {
				toastMessageTask.delay(200, null, me, ['berthplan_atu_exists_msg', null, 'warn', false]);
				return false;
			}
		}
		
		return true;
	},
	
	onSpriteMouseDown: function(e, div) {
		var me = this;
		var surface = me.getSurface('plan');
		var xy = surface.getEventXY(e),
            x = xy[0],
			y = xy[1];

		if(div === 'id-berthplan-body' || div === 'id-berthplan-resizeT' || div === 'id-berthplan-resizeB') {
			if(!me.isPlanning) {
				me.isPlanning = true;
				me.lastEventX = x;
				me.lastEventY = y;
				me.div = div;
			}
		}
	},
	
	onMouseMove: function(e, div, rec, opts) {
		var me = this;
		var surface = me.getSurface('plan');

		if(me.isPlanning) {
			var xy = surface.getEventXY(e),
			x = xy[0],
			y = xy[1];
			
			var flag = me.validatePlanning(div, rec);

			if(div === 'id-berthplan-body' && flag) {
				me.lastEventPos[0] = me.lastEventPos[0] + (x - me.lastEventX);
				me.lastEventPos[1] = me.lastEventPos[1] + (y - me.lastEventY);
				me.lastEventX = x;
				me.lastEventY = y;
				me.renderBerthPlanSprites(me.lastEventPos, rec, opts, div);
				me.renderTobePlanSprites(me.lastEventPos, rec, opts, div);
				me.hideTooltip(true);
				surface.renderFrame();
			} else if(div === 'id-berthplan-resizeT' && flag) {
				me.lastEventPos[1] = me.lastEventPos[1] + (y - me.lastEventY);
				me.lastEventPos[3] = me.lastEventPos[3] - (y - me.lastEventY);
				me.lastEventY = y;
				if(me.lastEventPos[1] >= me.lastEventPos[1] + me.lastEventPos[3]) {
					me.onMouseLeave();
				} else {
					me.renderBerthPlanSprites(me.lastEventPos, rec, opts, div);
					me.hideTooltip(false);
					me.hideTobeSprites();
					surface.renderFrame();
				}
			} else if(div === 'id-berthplan-resizeB' && flag) {
				me.lastEventPos[3] = me.lastEventPos[3] + (y - me.lastEventY);
				me.lastEventY = y;
				
				if(me.lastEventPos[1] >= me.lastEventPos[1] + me.lastEventPos[3]) {
					me.onMouseLeave();
				} else {
					me.renderBerthPlanSprites(me.lastEventPos, rec, opts, div);
					me.hideTooltip(false);
					me.hideTobeSprites();
					surface.renderFrame();
				}
			}
		}
	},
	
	onSpriteMouseUp: function(e, div, rec, prevrec) {
		var me = this;
		var surface = me.getSurface('plan');
		var planedRecord;
		if(div === 'id-berthplan-body' || div === 'id-berthplan-resizeT' || div === 'id-berthplan-resizeB') {
			var xy = surface.getEventXY(e),
			x = xy[0],
			y = xy[1];
			
			if(me.isPlanning && x > me.meta.timelineWidth) {
				planedRecord = me.doPlanning([me.bodySprite.attr.x - me.meta.timelineWidth, me.bodySprite.attr.y - me.meta.berthHeight, me.bodySprite.attr.width, me.bodySprite.attr.height], rec, prevrec, div);
			} else {
				planedRecord = null;
			}

			me.onMouseLeave();
			return planedRecord;
		}
	},
	
	onMouseLeave: function() {
		var me = this;
		var surface = me.getSurface('plan');
		for(var i=0;i<surface.getItems().length;i++){
			surface.getItems()[i].setAttributes({
				hidden: true
			});
		}
		
		me.isPlanning = false;
		surface.renderFrame();
	},
	
	getBerthPlanPos: function(rec) {
		var me = this;

		var x, x2, y, w, h;
		var mins;
		var startPos, endPos;
		var arrTime = me.getBerthPlanTimeRule(rec, 'arrival');
		var depTime = me.getBerthPlanTimeRule(rec, 'departure');
		var berthingWidth = me.getBerthingWidth(rec);
		
		// Validation
		if(rec.startPos && rec.startPos > 0){
			startPos = rec.startPos;
			if(rec.berthAlongside === 'S' || rec.berthAlongside === 'P') {	//Starboard or Portside
				endPos = rec.startPos + rec.loa;
			}else{
				endPos = rec.startPos + (me.meta.defaultVesselWidth * me.meta.baseBerthUnit * me.meta.baseWidth);
			}
		}else{
			startPos = 0;
			endPos = 0;
		}
		
		if(me.meta.fromDate > arrTime){
			arrTime = me.meta.fromDate;
		}
		
		// if(arrTime>depTime){
		// 	arrTime = depTime;
		// 	depTime = Ext.Date.add(depTime, Ext.Date.HOUR, 8);
		// }
		if(depTime == null || arrTime>depTime){
			depTime = arrTime;
			depTime = Ext.Date.add(depTime, Ext.Date.HOUR, 8);
		}

		mins = Ext.Date.diff(me.meta.fromDate, arrTime, Ext.Date.MINUTE);
		y = me.meta.baseTimeUnit * me.meta.baseHeight * mins / 60;
		
		mins = Ext.Date.diff(arrTime, depTime, Ext.Date.MINUTE);
		h = me.meta.baseTimeUnit * me.meta.baseHeight * mins / 60;

		//Draw Berths
		var berthX =  0;
		var berthTpX = 0;
		var preRecord;

		me.berths.each(function(record,idx){
			if(record.data.drawable === 1) {

				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					var length = parseFloat(record.data.length) * me.meta.baseWidth * me.meta.baseBerthUnit;
				} else {
					var length = me.meta.baseFixedBerthWidth * me.meta.baseBerthUnit;
				}
				
				if(preRecord && (preRecord.data.terminalCd !== record.data.terminalCd || preRecord.data.berthTp !== record.data.berthTp)) {
					berthTpX += berthX;
					berthX = 0;
				}
				
				if(record.data.berthCd === rec.berthCd) {
					//if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					if(record.data.berthTp === 'WRF') {
						if(startPos === 0 && endPos === 0) {
							x = berthTpX + berthX + length / 2  - berthingWidth / 2 * me.meta.baseBerthUnit * me.meta.baseWidth;
							w = me.meta.baseBerthUnit * me.meta.baseWidth * berthingWidth;
						} else {
							x = berthTpX + startPos * me.meta.baseBerthUnit * me.meta.baseWidth;
							x2 =  berthTpX + endPos * me.meta.baseBerthUnit * me.meta.baseWidth;
							w = x2 - x;
						} 
					} else {
						w = length * 8 / 10;
						x = berthTpX + berthX + length / 2 - w / 2;
					}
					
					return false;
				}
				
				berthX += length;
				preRecord = record;
			}
		});

		if(me.meta.berthDirection === 'RTL') {
			x = me.meta.windowWidth - x - w;
		}
		
		return [x, y, w, h];
	},
	
	getBerthPlanInfo: function (newpos, rec) {
		var me = this;
		var startPos, endPos, etb, etu;
		var x, w, newBerthCd, newBerthTp;
		
		if(me.meta.berthDirection === 'RTL') {
			x = (me.meta.windowWidth - newpos[0] - newpos[2]) / (me.meta.baseBerthUnit * me.meta.baseWidth);
		} else {
			x = newpos[0] / (me.meta.baseBerthUnit * me.meta.baseWidth);
		}
		w = newpos[2] / (me.meta.baseBerthUnit * me.meta.baseWidth);
		
		var berthX =  0;
		var berthTpX = 0;
		var preRecord;
		me.berths.each(function(record,idx){
			if(record.data.drawable === 1) {
				
				if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
					var length = parseFloat(record.data.length);
				} else {
					//Special treat for the jetty
					var length = me.meta.baseFixedBerthWidth / me.meta.baseWidth;
				}
				
				if(preRecord && (preRecord.data.terminalCd !== record.data.terminalCd || preRecord.data.berthTp !== record.data.berthTp)) {
					berthTpX += berthX;
					berthX = 0;
				}	
				
				if(x + w / 2 >= berthTpX + berthX && x + w / 2 <= berthTpX + berthX + length) {
					if(record.data.berthTp === 'EDJ' || record.data.berthTp === 'WRF' || record.data.berthTp === 'NDJ') {
						var berthingWidth = me.getBerthingWidth(rec);
						w = berthingWidth > 0 ? berthingWidth : w
						startPos = parseInt(x - berthTpX);
						endPos = parseInt(x + w - berthTpX);
					} else {
						startPos = 0;
						endPos = 0;
					}
					newBerthCd = record.data.berthCd;
					newBerthTp = record.data.berthTp;
					
					return false;
				}
							
				berthX += length;
				preRecord = record;
			}
		});

		var etbmins = newpos[1] * 60 / (me.meta.baseTimeUnit * me.meta.baseHeight);
		var etumins = (newpos[1] + newpos[3]) * 60 / (me.meta.baseTimeUnit * me.meta.baseHeight);

		etb = Ext.Date.add(me.meta.fromDate, Ext.Date.MINUTE, etbmins);
		etu = Ext.Date.add(me.meta.fromDate, Ext.Date.MINUTE, etumins);

		return [startPos, endPos, etb, etu, newBerthCd, newBerthTp];
	},
	
	doPlanning: function (newpos, rec, prevrec, div) {
		var me = this;
		var startPos, endPos, etb, etw, etc, etu, etd, newBerthCd;
		
		var planInfo = me.getBerthPlanInfo(newpos, rec);

		if(prevrec.data){
			prevrec = prevrec.data;
		}
		
		var calEta, calEtw, calEtc, calEtu, calEtd;
		if(prevrec){
			calEta = Ext.Date.diff(prevrec.eta, prevrec.etb,  Ext.Date.MINUTE);
			calEtw = prevrec.etw ? Ext.Date.diff(prevrec.etb, prevrec.etw,  Ext.Date.MINUTE) : null;
			calEtc = prevrec.etc ? Ext.Date.diff(prevrec.etu, prevrec.etc,  Ext.Date.MINUTE) : null;
			calEtu = Ext.Date.diff(prevrec.etc ? prevrec.etc : prevrec.etb, prevrec.etu,  Ext.Date.MINUTE);
			calEtd = Ext.Date.diff(prevrec.etu, prevrec.etd,  Ext.Date.MINUTE);
			
			startPos = planInfo[0];
			endPos = planInfo[1];
			etb = planInfo[2];
			etu = planInfo[3];
			newBerthCd = planInfo[4];
			
			eta = Ext.Date.add(planInfo[2], Ext.Date.MINUTE, -calEta);
			etw = calEtw ? Ext.Date.add(etb, Ext.Date.MINUTE, calEtw) : null;
			etc = calEtc ? Ext.Date.add(etu, Ext.Date.MINUTE, calEtc) : null;
			etd = Ext.Date.add(etu, Ext.Date.MINUTE, calEtd);

			if(!div){
				div = me.div;
			}
			if(div && !(div === 'id-berthplan-body' && prevrec.atb) 
					&& !(div==='id-berthplan-body' && me.meta.fromDate > prevrec.etb)
					&& !(div==='id-berthplan-body' && me.meta.toDate < prevrec.etu)){
				if(div === 'id-berthplan-resizeB') {
					eta = prevrec.eta;
					etb = prevrec.etb;
					etw = prevrec.etw;
				}else if(div === 'id-berthplan-resizeT') {
					etc = prevrec.etc;
					etu = prevrec.etu;
					etd = prevrec.etd;
				}
				me.plans.getById(rec.id).set({
					eta: eta,
					etb: etb,
					etw: etw,
					etc: etc,
					etu: etu,
					etd: etd,
					startPos: startPos,
					endPos: endPos,
					berthCd: newBerthCd
				});
				me.plans.sync({
					callback: function(records,success){
						if(me.getMinDistViolateVessels(rec).length > 0
							&& (!rec.atu || rec.atu === "" || !rec.atd || rec.atd === "")){
							MessageUtil.info('Information','berthplan_set_min_distance');
						}
					}
				});
			}
		}
		return me.plans.getById(rec.id);
	},
	
	onScroll: function (x, y) {
		var me = this;
		var berthSurface = me.getSurface('blink');
		var timelineSurface = me.getSurface('mask');
		var legendSurface = me.getSurface('legend');

		berthSurface.setRect([0,y,me.meta.viewWidth,me.meta.berthHeight]);
		berthSurface.renderFrame();
		
		timelineSurface.setRect([x,0,me.meta.timelineWidth,me.meta.viewHeight]);
		timelineSurface.renderFrame();
		
		legendSurface.setRect([x,y,me.meta.timelineWidth,me.meta.berthHeight]);
		legendSurface.renderFrame();
		
		me.scrollX = x;
		me.scrollY = y;
	},
	
	getBaseBerthUnit: function(width) {
		var me = this;
		var scrollbarOffset = 15;
		var baseUnit = (width - me.meta.timelineWidth - scrollbarOffset) / me.meta.berthWidth * me.meta.baseBerthUnit;
		return baseUnit;
	},
	
	getCurrentDayPosition: function(days){
		var me = this;
		var dayHeight, currentDayPostion=0;
		
		dayHeight = 24 * me.meta.baseHeight * me.meta.baseTimeUnit;
		for(var i=0; i<days-1; i++)	{
			currentDayPostion+=dayHeight;
		}
		
		return currentDayPostion;
	},


});

var toastMessageTask = new Ext.util.DelayedTask(function() {
	var me = this;
	me.toastMessage(arguments[0], arguments[1], arguments[2], arguments[3]);
});