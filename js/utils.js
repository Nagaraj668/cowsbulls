function A(msg) {
	alert(msg);
}

function L(msg) {
	console.log(msg);
}

function J(obj) {
	return JSON.stringify(obj);
}

function nav(path) {
	window.location.href = path;
}

var AuthType = {
	SESSION_RESUME : 0,
	SIGN_IN : 1,
	SIGN_UP : 2,
	UNAUTHORIZED : 3
};

function validateWord(word) {
	var flag = false;
	if (word != null && word != undefined && word.length == 4 && !checkDuplicate(word)) {
		flag = true;
	}
	return flag;
}

function checkDuplicate(str){
    for(var i = 0; i < str.length; i++){
        var re = new RegExp("[^"+ str[i] +"]","g");
        if(str.replace(re, "").length >= 2){
            return true;
        }
    }
    return false;
}