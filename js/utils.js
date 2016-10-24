function authenticate(success, failure, emailVerifyFlag) {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			if (emailVerifyFlag == undefined && !user.emailVerified) {
				// email not verified
				nav("email-verify.html");
			} else {
				firebase.database().ref().child("status").child(user.uid).child("request-status").on(
						"child_added",
						function(data) {
							firebase.database().ref().child("users").child(user.uid).child(
									"request-status").child(data.key).set(data.val() + 1);
						});

				firebase.database().ref().child("users").child(user.uid).child("request-status").on(
						"child_changed",
						function(data) {
							firebase.database().ref().child("users").child(user.uid).child(
							"request-status").child(data.key).set(data.val() + 1);
						});
				success(user);
			}
		} else {
			L("User is not signed in.");
			failure();
		}
	});
}

function requestStatus(uid, myuid, callback) {
	firebase.database().ref().child("users").child(uid).child("request-status").child(myuid)
}

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
	if (word != null && word != undefined && word.length == 4
			&& !checkDuplicate(word)) {
		flag = true;
	}
	return flag;
}

function checkDuplicate(str) {
	for (var i = 0; i < str.length; i++) {
		var re = new RegExp("[^" + str[i] + "]", "g");
		if (str.replace(re, "").length >= 2) {
			return true;
		}
	}
	return false;
}

function SL(msg) {
	var loadingHtml = '<div class="loading-box"'
			+ 'style="background: #fff; padding: 5px;" id="loading-msg">' + msg
			+ '...</div>';
	if (($("#loading-container").css('width')) == undefined)
		$("body").append("<div class='loading-container'></div>");
	$(".loading-container").html(loadingHtml);
	$("#loading-msg").css('visibility', "visible");
}

function HL() {
	$("#loading-msg").css('visibility', "hidden");
}

function random() {
	return Math.floor((Math.random() * 10) + 1);
}