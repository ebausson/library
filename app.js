var connect = require("connect");
var User = require('./User.js');

var server = connect.createServer(
	connect.favicon('static/favicon.ico'),
	connect.logger(":status   :date - :url"),
	connect.basicAuth(function(user, pass){
		return User.authenticate({ user: user, pass: pass });
  })
);

server.use("/static", connect.static(__dirname + '/static'));
server.use("/request", function (req, res, next) {
	// Every request gets the same "Hello Connect" response.
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("Hello Connect");
});
server.listen(3000);
