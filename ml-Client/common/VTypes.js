Ext.apply(Ext.form.VTypes, {
	'phone': function() {
		var re = /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/;
		return function(v) {
			return re.test(v);
		};
	}(),
	'phoneText': 'The phone number format is wrong, ie: 123-456-7890 (dashes optional) Or (123) 456-7890',
	'fax': function() {
		var re = /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/;
		return function(v) {
			return re.test(v);
		};
	}(),
	'faxText': 'The fax format is wrong',
	'zipCode': function() {
		var re = /^\d{5}(-\d{4})?$/;
		return function(v) {
			return re.test(v);
		};
	}(),
	'zipCodeText': 'The zip code format is wrong, e.g., 94105-0011 or 94105',
	'ssn': function() {
		var re = /^\d{3}-\d{2}-\d{4}$/;
		return function(v) {
			return re.test(v);
		};
	}(),
	'ssnText': 'The SSN format is wrong, e.g., 123-45-6789'
});

Ext.apply(Ext.form.VTypes, {
	'cntrNoText': 'ID has Only Number and English character',
	'cntrNoMask': /([A-Z0-9])/,
	'cntrNoRe': /([A-Z]{1,})([0-9]{1,})/,//validation
	'cntrNo': function (v) {
		return this.cntrNoRe.test(v);
	},

	'idText': 'ID has Only Number and English character',
	'idMask': /([A-Z0-9a-z])/, //입력가능
	'idRe': /([A-Za-z]{1,})([0-9]{1,})/,//validation
	'id': function (v) {
		return this.idRe.test(v);
	},

	'passMask': /(.*[A-Za-z0-9~`!@#$%\^&*()-+=])/, //Mask는 입력 가능한 값
	//A-Za-z0-9 영 대소문자, 숫자 입력 가능 ~`!@#$%\^&*()-+= 해당 특수문자 입력 가능
	//(.*[]) [] 안의 문자 입력 가능 . 줄바꿈 제외하고 어느 문자든 가능 * 0 or more match 가능
	'passRe': /(.*[0-9]){1,}(.*[~`!@#$%\^&*()-+=]){1,}/,
	//{1, } 앞 () 안의 항목 중 한 개 이상 포함
	'pass': function (v) {
		if(this.passRe.test(v) != true){
			this.passText = "문자, 숫자, 특수문자를 최소 1가지 이상 입력하십시오";
		}
		return this.passRe.test(v);	    		
	},

	'passMatchMask': /(.*[A-Za-z0-9~`!@#$%\^&*()-+=])/,
	'passMatchRe': /(.*[0-9]){1,}(.*[~`!@#$%\^&*()-+=]){1,}/,
	'passMatch':function(v){
		var password = Ext.ComponentQuery.query('#password')[0]; 
		if(v != password.getValue()){ //password 필드의 값과 password check의 값이 다른 경우
			this.passMatchText ="Password doesn't match"; //password 불일치 메세지 출력
		}
		return (v == password.getValue()); //같을 경우만 true 출력
	},	

	'phoneNumText': 'Phone number need this form ex:  010-123-1234, 010-1234-5678',
	'phoneNumMask': /[\-0-9]/,
	'phoneNumRe': /([0-9]{3}-[0-9]{3,4}-[0-9]{4})/,
	'phoneNum': function (v) {
	   return this.phoneNumRe.test(v);
   }
});
