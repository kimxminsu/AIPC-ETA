Ext.define('TSB.ux.form.field.TextNumberField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.textnumberfield',

    maskRe: /[0-9.]/,
    precision : 0,
    fieldStyle: 'text-align: right;',
    // onFocus: function() {
    //     this.callParent(arguments);
    //     var v = this.getValue();
    //     if (Ext.isNumeric(v)) {
    //         this.setRawValue(this.rawToValue(v));
    //     }
    // },
    
    onBlur: function() {
        this.callParent(arguments);
        var v = this.getValue();
        if (Ext.isNumeric(v)) {
            this.setRawValue(this.getChangedValue(v));
        }
    },

  
    
    getChangedValue: function(v) {
//         cast to float
        if (!Ext.isEmpty(v)) {
            var pcRe = /^(\d*(?:\.\d*)?)\s*%$/,
                dcRe = /^\d*(?:\.\d*)?$/,
                floatValue,
                match;
            if (match = dcRe.test(v)) {
	            floatValue = v * 1;
            } else if (match = pcRe.exec(v)) {
                floatValue = match[1] / 100;
            } else {
                // invalid input
	            return undefined;
            }
            floatValue = Number.parseFloat(floatValue);
            if (isNaN(floatValue)) {
                return undefined;
            } else {
                return floatValue.toFixed(this.precision);
            }
        } else {
            return undefined;
        }
    }
});
