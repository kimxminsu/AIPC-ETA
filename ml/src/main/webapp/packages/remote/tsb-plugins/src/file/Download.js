Ext.define('TSB.plugin.file.Download', {
	extend: 'Ext.plugin.Abstract',
	alias: 'plugin.tsb-plugin-file-download',

	url: '',	//url of target file
	
    init: function (component) {
		component.on('click', this.download, this);
    },

    download: function(btn, e) {
    	var me = this;
		var url = this.url; 
		
		if (url === null || url === "") {
			//not applicable
		} else {
			//DOWNLOAD FILE from Web folder.
				//Add dom of "a" tag to get file. we can change the href 
			var el = Ext.DomHelper.append(Ext.getBody(), {
			    tag: 'a',
			    href: url, ///TEST_ExcelFile.xlsx',
			    html: 'A link',
			    target: '_self'
			}, true);
	
			//url from web folder.
			el.dom.href = url;
			
			//fire click event
			el.dom.click();
		}
    }
});
