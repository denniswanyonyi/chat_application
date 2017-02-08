$(function() {
	var socket = io.connect();
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	var $chatBoard = $('#chat-board');
	var $registrationForm = $('#usernameForm');

	socket.emit('get users');

	$messageForm.submit(function(e) {
		e.preventDefault();
		socket.emit('send_message', $messageBox.val());
		$messageBox.val('');
	});

	$registrationForm.submit(function(e) {
		e.preventDefault();
		socket.emit('register user', $('#enteredUsername').val(), function(data) {

			// If user doesn't exist
			if(data.exists) {
				$('#usernameError').text('');
				
				$('.content').show();
				$('#registrationForm').hide();
			} else {
				$('#usernameError').text('The username already exists, pick another one');


			}
		});
		$('#enteredUsername').val('');
	});

	socket.on('notify signin', function(data) {
		$chatBoard.append('<div class="info text-center"> <span>'+ data + ' signed in</span></div>');
	});

	socket.on('logged out', function(data) {
		$chatBoard.append('<div class="info text-center"> <span>'+ data + ' signed out</span></div>');
	});

	socket.on('new message', function(data) {
		$chatBoard.append('<div class="msg"> <label>' + data.username + '</label><div>' + data.message + '</div><div class="timestamp" data-timestamp="'+ data.timestamp +'">Just now</div></div>');
	});

	socket.on('get users', function(data){

		if(data.length <= 0) {

		} else {
			var users = '';
			for (var i = 0; i < data.length; i++) {
				users += '<li>'+ data[i] + '<li/>';
			}
			$('#users').html(users);
		}
	});

	setInterval(function() {

		var timestamps = $('*[data-timestamp]');
		// console.log(timestamps);

		var now = new Date();

		timestamps.each(function() {
			// console.log($(this).data('timestamp'));

			var then = new Date($(this).data('timestamp'));
			var diff = now - then;
			
			// Less than one second
			if(diff < 1000) {
				$(this).text('Just now')
			} else if(diff < 60000) {
				// less than one minute
				$(this).text(parseInt(diff/1000) +' seconds');
			}
			else if(diff < 3600000) {
				// less than one hour ago
				$(this).text(parseInt(diff/60000) +' mins');
			}
			else if(diff <= 86400000) {
				// less than one day ago
				$(this).text(parseInt(diff/3600000) +' hrs');				
			} else {
				$(this).text(then.toDateString());
			}

		});
	}, 5000);
});