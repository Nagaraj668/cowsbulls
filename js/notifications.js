var name, email, photoUrl, uid;
authenticate(function(user) {
	var user = firebase.auth().currentUser;
	if (user != null) {
		name = user.displayName;
		email = user.email;
		photoUrl = user.photoURL;
		uid = user.uid;
	}
	if (name == null || name == "null" || name == "") {
		name = "User";
	}
	$("#username").text(name);
	if (photoUrl != null) {
		$("#photoPic").attr('src', photoUrl);
	}
}, function() {
	nav("index.html");
});

function appendNotifications(html, callback) {
	$('#notifyList').append(html);
	callback();
}

function onNotificationItemClick(element, code, gameType, name, uid, photoUrl,
		message, reqOn) {
	$('#reqDetails').show();
	$('#reqPhoto').attr('src', photoUrl);
	$('.active').removeClass('active');
	$(element).addClass('active');
	$('#requestorName').text(name);
	$('#reqOn').text(reqOn);
	$('#message').text(message);
	
}

$(document).ready(function() {
	$('#reqDetails').hide();
});