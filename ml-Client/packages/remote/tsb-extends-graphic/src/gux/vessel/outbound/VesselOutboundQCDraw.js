//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.vessel.VesselOutQCDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-vesseloutqcdraw',
    
	meta: {},
	x: 0,
    y: 0,
    hatchNo: 0,
    hatch: null,
	equX: 0,
    equY: 0,
    viewMode: null,
    selectedQCs: [],
	
    render: function(surface, ctx) {
    	var me = this;
		// console.log("** qc draw ** " + me.hatchNo);
        //Draw General Rect
        // ctx.clearRect( me.x,
        //     me.y,
        //     me.meta.hatchWidth,
        //     me.meta.hatchHeight);

        ctx.strokeStyle = me.meta.hatchGuideColor;
        
        var colors = ['#5fa2dd', '#FFFFFF']; 

        var length = me.meta.bayNoAreaHeight * me.meta.baseUnit - (me.meta.baseUnit * 3);
        var ioType = CodeConstants.PlanType.LOAD;

        ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit + 'px ' + me.meta.fontType;
        ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
        ctx.fillStyle = '#000000';
        // ctx.fillText('D', me.equX, me.equY - length);
        // ctx.fillText('H', me.equX, me.equY);
    
  
        if (/vessel|hold/.test(me.viewMode)) {
            //me.meta.hatchHeight
            ctx.fillText('D', me.x, me.y + me.meta.hatchHeight/2 - me.meta.hatchQCMargin * 2);
            ctx.fillText('H', me.x, me.y + me.meta.hatchHeight/2 - me.meta.hatchQCMargin);
            var isSelectedItem = false;
            var qcInfo, qcSeq;

            var x = me.x + me.meta.hatchQCMargin + me.meta.baseUnit;
            var deckY = me.y + me.meta.hatchHeight/2 - me.meta.hatchQCMargin * 2;
            var holdY = me.y + me.meta.hatchHeight/2 - me.meta.hatchQCMargin;
            var length = me.meta.hatchQClength;
            //io 1 
            for(var hd = CodeConstants.DeckHoldType.DECK; hd <= CodeConstants.DeckHoldType.HOLD ; hd++){
                for(var idx = 0; idx < 2 ; idx++){
                    if(me.hatch.qcs[CodeConstants.PlanType.LOAD][hd][idx].id != null){ //value ixist
                        qcInfo = me.hatch.qcs[CodeConstants.PlanType.LOAD][hd][idx];
                        colors = ['#' + qcInfo.item.data.backColor, '#' + qcInfo.item.data.foreColor];
                        qcSeq = qcInfo.item.data.qcSeq;
                                                
                        //fill rect
                        ctx.fillStyle = colors[0];

                        if(hd == CodeConstants.DeckHoldType.DECK){ //DECK
                            ctx.fillRect(x + length * idx, deckY, length, length);
                            ctx.fillStyle = colors[1];//me.meta.generalFontColor;
                            if(qcSeq.length > 1){
                                ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit * 0.7 + 'px ' + me.meta.fontType;
                                ctx.fillText(qcSeq, x + length * idx, deckY + me.meta.padright * 0.5);
                            }else{
                            	ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit + 'px ' + me.meta.fontType;
                            	ctx.fillText(qcSeq, x + me.meta.baseUnit + length * idx, deckY);
                            }
                        }else{
                            ctx.fillRect(x + length * idx, holdY, length, length);
                            ctx.fillStyle = colors[1];//me.meta.generalFontColor;
                            if(qcSeq.length > 1){
                            	ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit * 0.7 + 'px ' + me.meta.fontType;
                            	ctx.fillText(qcSeq, x + length * idx, holdY + me.meta.padright * 0.5);
                            }else{
                            	ctx.font = 'bold ' + me.meta.fontSizeHold * me.meta.baseUnit + 'px ' + me.meta.fontType;
                            	ctx.fillText(qcSeq, x + me.meta.baseUnit + length * idx, holdY);
                            }
                        }   

                        if(me.selectedQCs.length > 0){
                            isSelectedItem = false;
                            for(var s=0;s<me.selectedQCs.length;s++) {
                                if(me.selectedQCs[s].id === qcInfo.id) {
                                    isSelectedItem = true;
                                    break;
                                }
                            }
                            if(isSelectedItem) {
                                ctx.strokeStyle = '#000000';
                                ctx.lineWidth = 2;
                                if(hd == CodeConstants.DeckHoldType.DECK){                                    
                                    ctx.strokeRect(x + length * idx, deckY, length, length);
                                }else{
                                    ctx.strokeRect(x + length * idx, holdY, length, length);
                                }
                                
                                //colors = ['gray', 'white'];	//Back, Fore

                            }
                        }
                    }
                }
            }
        }
    }
});