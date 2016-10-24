$(document).ready(function() {
	$.get("header.html", function(data) {
		$("#header").html(data);
	});
});

function logout() {
	firebase.auth().signOut();
}