authenticate(function(user) {
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
}, function() {
	nav("index.html");
});

function onUsernameClick() {

}

function onGlobalFriendsShown() {
	var usersRef = firebase.database().ref('users');
	usersRef
			.on(
					'child_added',
					function(data) {
						var player = data.val();
						var photo = player.photoURL;
						if(photo == undefined){
							photo = "images/ic_account_circle_black_48dp_2x.png"
						}
						var playerCellHtml = '<div class="col-sm-2 player-cell-wrapper" style="height: 190px">'
								+ '<div  class="player-cell box-1" style="margin: 0px !important">'
								+ '<img alt="" src="'
								+ photo
								+ '" class="profile-picture">'
								+ '<div style="margin-top: 3px; margin-bottom: 3px">'
								+ player.displayName
								+ '</div>'
								+ '</div></div>';
						$("#player-wrapper").append(playerCellHtml);
						$(".player-cell").css('width',
								$(".player-cell-wrapper").width() + 'px');
						$(".player-cell").css('height',
								$(".player-cell-wrapper").height() + 'px');
						$(".profile-picture")
								.css(
										'width',
										($(".player-cell-wrapper").width() - 20)
												+ 'px');
						$(".profile-picture").css(
								'height',
								($(".player-cell-wrapper").height() - 40)
										+ 'px');
					});

}
