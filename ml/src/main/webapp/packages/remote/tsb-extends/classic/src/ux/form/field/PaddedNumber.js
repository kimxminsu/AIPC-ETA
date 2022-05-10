/*
 * KHH 2019.07.21
 * 1. zeroPadding
 *    1) Fill the left with a zero('0').
 *       ex) zeroPadding: 4 => '0001'
 * 2. getValue
 * 	  1) override method
 *       - Fill the left with the letter '0' as much as zeroPadding.
 * 3. onSpinUp
 * 	  1) override method
 *       - Spin up event
 *       - parseInt(me.getValue()) modifiy
 */
 
Ext.define('TSB.ux.form.field.PaddedNumber', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.paddednumber',

    /**
     * @cfg {Number} zeroPadding
     * Number of digits to pad
     * Defaults to 4
     */
    zeroPadding: 4,
   
    initComponent: function(){
      this.callParent();
    },
   
    /*
    * @private
    * Gets value from superclass
    * TODO: Need to convert anything here? Hmm
    */
    rawToValue: function(rawValue) {
      var value = this.callParent([rawValue]);
      return  value;
    },
   
    /**
    * @private
    * Gets raw value from superclass then append zero padding
    */
    valueToRaw: function(value) {
      value = this.callParent([value]);
      if(this.zeroPadding){
        value = Ext.String.leftPad(value, this.zeroPadding, '0');
      }
      return value;
    },
    
    /**
    * @private
    * Gets submit value from superclass then removes zero padding
    */
    getSubmitValue: function() {
      var value = this.callParent();
      if(this.zeroPadding && typeof(value) == 'string'){
        value = value.replace(/^0+/g, '');  
      }
      return value;
    },
    
    // Spin up event - parseInt(me.getValue()) modifiy
    onSpinUp: function() {
        var me = this;
        
        if (!me.readOnly) {
            me.setSpinValue(Ext.Number.constrain(parseInt(me.getValue()) + me.step, me.minValue, me.maxValue));
        }
    },
	
	// getValue override
    getValue : function() {
    	var value = this.callParent();
    	return Ext.String.leftPad(value, this.zeroPadding, '0');
    }
});