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
			console.log(data);

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

	socket.on('new message', function(data) {
		$chatBoard.append('<div class="msg"> <label>' + data.username + '</label><div>' + data.message + '</div></div>');
	});

	socket.on('get users', function(data){

		if(data.length <= 0) {

		} else {
			var users = '';
			for (var i = 0; i < data.length; i++) {
				users += data[i] + '<br />';
			}
			$('#users').html(users);
		}
	});
});