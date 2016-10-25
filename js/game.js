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

$(document).ready(function() {
	$('#choose-word').hide();
	$('#choose-player').hide();
	$("#finalizerBlock").hide();
	$('.find').click(function() {
		$('.find').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		if ($(this).text().indexOf("system") != -1) {
			$("#word").attr("disabled", "disabled");
			$("#word").css("background", "#eee");
			$("#word").focus();
			$('#choose-word').hide();
			$('#choose-player').show();
		} else {
			$('#choose-word').show();
			$('#choose-player').hide();
			$("#word").attr("disabled", false);
			$("#word").focus();
			$("#word").css("background", "none");
		}
	});

	$('.player-btn').click(function() {
		$('.player-btn').removeClass('btn-primary');
		$(this).addClass('btn-primary');
	});

	$('#word').click(function() {
		$(this).select();
	});
});

function saveWord() {
	var word = $('#word').val();
	if (validateWord(word)) {
		SL("Validating word");
		$.get({
			url : "http://localhost/cab/CAB/server/valid-word.php",
			data : "word=" + word.toLowerCase()
		}, function(data) {
			if (data == 1) {
				HL();
				$('#choose-word').hide();
				$("#choose-player").show();
				$("#wordWrapper").prop("disabled", true);
				onGlobalFriendsShown2();
			} else if (data == 0) {
				HL();
				A("Please enter valid word");
				$('#word').val("");
				$('#word').focus();

			}
		});
	} else {
		A("Please enter valid word");
		$('#word').val("");
		$('#word').focus();
	}
}

function onGlobalFriendsShown(idtoappend) {
	var usersRef = firebase.database().ref('users');
	usersRef
			.on(
					'child_added',
					function(data) {
						var player = data.val();
						var photo = player.photoURL;
						if (photo == undefined) {
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

function onGlobalFriendsShown2(idtoappend) {
	var usersRef = firebase.database().ref('users');
	usersRef
			.on(
					'child_added',
					function(data) {
						if (data.key == uid)
							return;
						var player = data.val();
						var photo = player.photoURL;
						if (photo == undefined) {
							photo = "images/ic_account_circle_black_48dp_2x.png"
						}
						var playerCellHtml = '<div class="col-sm-4 player-cell-wrapper" style="height: 130px" onclick="onPlayerClicked(\''
								+ data.key
								+ '\', \''
								+ player.displayName
								+ '\', \''
								+ photo
								+ '\')" >'
								+ '<div  class="player-cell box-1" style="margin: 0px !important">'
								+ '<img alt="" src="'
								+ photo
								+ '" class="profile-picture">'
								+ '<div style="margin-top: 3px; margin-bottom: 3px">'
								+ player.displayName
								+ '</div>'
								+ '</div></div>';
						$("#player-wrapper-2").append(playerCellHtml);
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

function onPlayerClicked(selecteduid, name, photo) {
	$("#selectedPlayerStatus").text("Loading status...");
	$("#finalizerBlock").show();
	$("#selectedPlayerName").text(name);
	$("#selectedPlayerPhoto").attr("src", photo);
	requestStatus(selecteduid, uid, function(data) {
		L("data: "+data);
		if (data) {
			$("#selectedPlayerStatus").text("Online");
			$("#selectedPlayerStatus").addClass('label-success');
			$("#selectedPlayerStatus").removeClass('label-danger');
		} else {
			$("#selectedPlayerStatus").text("Offline");
			$("#selectedPlayerStatus").addClass('label-danger');
			$("#selectedPlayerStatus").removeClass('label-success');
		}
	});
}

function onSystemWord() {

}

function onFriendsWord() {

}