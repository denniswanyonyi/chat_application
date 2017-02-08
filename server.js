var express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').createServer(app),  // Edit this
	io = require('socket.io').listen(server),
	users = []; //["Dennis", "Fidel", "Milly", "Mary", "Protus"];

server.listen(2017);

app.use('/scripts', express.static(path.join(__dirname, 'libs')));
app.use('/styles', express.static(path.join(__dirname, 'css')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('send_message', function(data) {
		io.sockets.emit('new message', { message: data, username: socket.username, timestamp: new Date() });
	});

	function getUsers() {
		io.sockets.emit('get users', users.sort());
	};

	// Register a new user
	socket.on('register user', function(data, callback) {

		// If the user already exists, don't save again
		if(users.indexOf(data) != -1) {
			callback({ exists: false });
		} else {
			callback({ exists: true, username: data });
			io.sockets.emit('notify signin', data);

			socket.username = data;
			users.push(socket.username);
			getUsers();
		}
	});

	// Invoked to get an array of all online users;
	socket.on('get users', function(data, callback) {
		getUsers();
	});

	socket.on('disconnect', function(data) {
		if(!socket.username) return;

		io.sockets.emit('logged out', socket.username);
		users.splice(users.indexOf(socket.username), 1);
		getUsers();
	})
});