const suffixedNumToInt = (suffixedNum) => {
	const l = suffixedNum.length;
	return parseFloat(suffixedNum.substring(0,l)) * (suffix => {
		switch(suffix) {
			case "k": return 1000; break;
			case "m": return 1000000; break;
			case "b": return 1000000000; break;
			default: return 1; break;
		}
	})(suffixedNum.charAt(l-1));
};

module.exports.suffixedNumToInt = suffixedNumToInt;