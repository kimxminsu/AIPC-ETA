Ext.define('IoTosOmExt.util.OmCommonMethod', {
	singleton: true,
   alternateClassName: 'OmCommonMethod',

   isNullOrEmpty : function(value) {
      if(value == null || value == undefined || value == '') {
         return true;
      }else {
         return false;
      }
   },

   setColumnConfig(grid, columnName, config, flag) {
      var columns = grid.getColumns();
      
      if(OmCommonMethod.isNullOrEmpty(grid)
         || OmCommonMethod.isNullOrEmpty(columnName)
         || OmCommonMethod.isNullOrEmpty(config)
         || (flag == null)
      ){
         return;
      }

		columns.forEach(function(column) {
			if(column.text == columnName) {
            if(config == CodeConstantsOM.gridColumnConfig.HIDDEN) {
               column.setHidden(flag);
            }
			}
		});
   }
});