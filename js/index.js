
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
	authType = AuthType.SIGN_IN;
	firebase.auth().signInWithEmailAndPassword(emailId, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  A(errorMessage);
		});
	
}

firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		  L(J(user));
		  switch(authType){
		  case AuthType.SESSION_RESUME:{
		  }case AuthType.SIGN_IN:{
			  nav("game.html");
			  break;
		  }case AuthType.SIGN_UP:{
			  firebase.database().ref().child('users').child(user.uid).set({
				  displayName : "User",
				  email : user.email,
				  photoURL : user.photoURL
			  }).then(function(){
				  nav("additional-details.html");				  
			  }).catch(function(){
				  A("Registration Faild");
			  });
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
	authType = AuthType.SIGN_UP;
	firebase.auth().createUserWithEmailAndPassword(emailId, password).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  A(errorMessage);
		});
}