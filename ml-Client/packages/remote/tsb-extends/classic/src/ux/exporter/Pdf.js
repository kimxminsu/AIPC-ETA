Ext.define('TSB.ux.exporter.Pdf', {
    extend: 'Ext.exporter.Base',
    alias: 'exporter.pdf',

    config: {
        /**
         * Default layout style applied to all cells
         */
        defaultLayoutStyle: {
            format: 'a4',
            orientation: 'portrait',	//portrait or landscape
            unit: 'mm',		//pt, mm, cm, in
            fontName: 'Arial'
        },
 
        /**
         * Default style applied to all cells
         */
        defaultStyle: {
        	alignment: {
        		vertical: 'Top'
        	},
        	font: {
        		fontName: 'Arial',
        		family: 'Swiss',
        		size: 11,
        		color: '#000000'
        	}
        },
        
        /**
         * Default style applied to the title
         */
        titleStyle: {
            alignment: {
                horizontal: 'Center',
                vertical: 'Center'
            },
            font: {
                fontName: 'Arial',
                family: 'Swiss',
                size: 18,
                color: '#1F497D'
            }
        },
 
        /**
         * Default style applied to the table headers
         */
        tableHeaderStyle: {
            alignment: {
                horizontal: 'Center',
                vertical: 'Center'
            },
            borders: [{
                position: 'Bottom',
                lineStyle: 'Continuous',
                weight: 1,
                color: '#4F81BD'
            }],
            font: {
                fontName: 'Arial',
                family: 'Swiss',
                size: 11,
                color: '#1F497D'
            }
        }
    },
    
    fileName: 'export.pdf',
    binary: true,
    format: '',
    orientation: '',
    unit: '',
    fontName: '',

    getContent: function(){
    	var me = this,
	        config = this.getConfig(),
	        data = config.data;
    	
    	var format = me.format || config.defaultLayoutStyle.format;
    	var orientation = me.orientation || config.defaultLayoutStyle.orientation;
    	var unit = me.unit || config.defaultLayoutStyle.unit;
    	var fontName = me.fontName || config.defaultLayoutStyle.fontName;
    	
    	var doc  = new jsPDF(orientation, unit, format);
    	doc.setFont(fontName);
    	
    	var exporter = Ext.Factory.exporter({
    	    type: 'html',
    	    includeGroups: true,
            includeSummary: true,
            fileName: config.fileName,
    		title: config.title,
    		data: config.data
    	});
    	
    	var specialElementHandlers = {
			'#editor': function(element, renderer){
				return true;
			},
			'.controls': function(element, renderer){
				return true;
			}
		};
    	
    	var html = exporter.getContent();
    	
    	//TODO: Need more study for fromHtml
    	doc.fromHTML(html, 15, 15, {
    		'width': 170,
    		'elementHandlers': specialElementHandlers
    	});
    	
    	return doc.output();
    }
//    getContent: function(){
//    	var me = this,
//    	config = this.getConfig(),
//    	data = config.data;
//    	
//    	var format = me.format || config.defaultLayoutStyle.format;
//    	var orientation = me.orientation || config.defaultLayoutStyle.orientation;
//    	var unit = me.unit || config.defaultLayoutStyle.unit;
//    	var fontName = me.fontName || config.defaultLayoutStyle.fontName;
//    	
//    	var doc  = new jsPDF(orientation, unit, format);
//    	doc.setFont(fontName);
//    	
//    	var defaultStyle = {
//    			name: 'table tbody td, table thead th',
//    			alignment: {
//    				vertical: 'Top'
//    			},
//    			font: {
//    				fontName: 'Arial',
//    				size: 10,
//    				color: '#000000'
//    			},
//    			borders: [{
//    				position: 'Left',
//    				lineStyle: 'Continuous',
//    				weight: 1,
//    				color: '#4F81BD'
//    			},{
//    				position: 'Right',
//    				lineStyle: 'Continuous',
//    				weight: 1,
//    				color: '#4F81BD'
//    			}]
//    	};
//    	
//    	var specialElementHandlers = {
//    			'#editor': function (element, renderer) {
//    				return true;
//    			}
//    	};
//    	
//    	var htmlExporter = Ext.create('Ext.exporter.text.Html', {
//    		fileName: config.fileName,
//    		title: config.title,
//    		data: config.data,
////    		defaultStyle: defaultStyle
//    	});
//    	htmlExporter.setDefaultStyle(defaultStyle);
//    	
//    	var html = htmlExporter.getContent();
//    	
////    	doc.setFontSize(10);	//not working
//    	
//    	doc.fromHTML(html, 15, 15);
////    	doc.fromHTML(html, 15, 15, {
////    		'width': 300,
////    		'elementHandlers': specialElementHandlers
////    	});
//    	
//    	return doc.output();
//    }
});