firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var user = firebase.auth().currentUser;
		var name, email, photoUrl, uid;
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
	} else {
		L("User is not signed in.");
		nav("index.html");
	}
});


$(document).ready(function() {
	$.get("header.html", function(data) {
		$("#header").html(data);
	});
});

function onUsernameClick() {

}

function logout() {
	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});
}