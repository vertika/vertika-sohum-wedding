 Util = {
	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	},

	containsNumber(val) {
		return !!val.match(/\d+/g);
	},

	tooShort(val){
		return val.trim().length < 7;
	},

	outOfBounds(val){
		return val < 0 || val > 13;
	}
};

export default Util;