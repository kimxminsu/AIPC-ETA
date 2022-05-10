Ext.define('TSB.gux.warehouse.WarehouseStructureDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-warehousestructuredraw',
    
	mixins : [
          'TSB.gux.warehouse.WarehouseRenderer'          
	],
	
	meta: {},
	cell: {},
	bay: {},
	row: {},
	unused: {},
	cellData:{},
	warehouseInfo: {},
	x: 0,
	y: 0,
	
    render: function(surface, ctx) {
    	var me = this;
    	var unused = false;
		var x=0, y=0, width=0, height=0;
		
		x = me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(me.cellData.data.bayIdx) - 1) * me.meta.cellWidth));
		x+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(me.cellData.data.bayIdx) -1));
		
		y = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(me.cellData.data.rowwIdx) - 1) * me.meta.cellHeight));
		y+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(me.cellData.data.rowwIdx) - 1));

		width = me.meta.baseUnit * me.meta.cellWidth;
		height = me.meta.baseHUnit * me.meta.cellHeight;
		
		me.unused.each(function(record, idx){
			if(record.data.locId === me.cellData.data.locId){
				ctx.fillStyle = me.meta.unUsedBackColor;
				ctx.fillRect( x, y, width, height);
				unused = true;
			}
		});

		ctx.lineWidth = 1;
		ctx.strokeStyle = me.meta.lineColor;
		ctx.strokeRect(x, y, width, height);
		
		ctx.font = me.meta.fontSize + 'px ' + me.meta.fontType;
		if(unused){
			ctx.fillStyle = me.meta.unUsedForeColor;
		}else{
			ctx.fillStyle = me.meta.fontColor;
		}
		ctx.fillText(me.cellData.data.locNm, x + (me.meta.padLeft * me.meta.baseUnit) , y + (me.meta.padTop *  me.meta.marginHeight * me.meta.baseUnit));
    }
});