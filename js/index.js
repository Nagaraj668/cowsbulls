
var authType = AuthType.SESSION_RESUME;

function login() {
	var emailId = $("#emailId").val();
	var password = $("#password").val();
	if (emailId == "" || emailId == null) {
		$("#emailId").focus();
		alert("Please enter Email Id");
		return;
	}
	if (password == "" || password == null) {
		$("#password").focus();
		alert("Please enter Password");
		return;
	}
	firebase.auth().signInWithEmailAndPassword(emailId, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  A(errorMessage);
		});
	
}

firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		  switch(authType){
		  case AuthType.SESSION_RESUME:{
		  }case AuthType.SIGN_IN:{
			  nav("game.html");
			  break;
		  }case AuthType.SIGN_UP:{
			  nav("additional-details.html");
			  break;
		  }
		  }
	  } else {
		  L("User is not signed in.");
	  }
	});

function register() {
	var emailId = $("#emailId").val();
	var password = $("#password").val();
	if (emailId == "" || emailId == null) {
		$("#emailId").focus();
		alert("Please enter Email Id");
		return;
	}
	if (password == "" || password == null) {
		$("#password").focus();
		alert("Please enter Password");
		return;
	}
	firebase.auth().createUserWithEmailAndPassword(emailId, password).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  A(errorMessage);
		});
}