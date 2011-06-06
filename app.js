var connect = require("connect");				// connect middleware
var fs = require("fs");							// filesystem API

var User = require('./User.js');


var DEBUG = true;

var server = connect.createServer(
	connect.logger("*** :status   :date - :url"),
	connect.favicon(__dirname + '/static/favicon.ico'),
    connect.cookieParser(),
    connect.session({secret:'some secret String'}),
	connect.basicAuth(function(user, pass){
		success = User.authenticate({ user: user, pass: pass });
		return success;
	})
);

server.use("/static", connect.static(__dirname + '/static'));
server.use("/request", function(req, res) {
	console.log("***");
	console.log(req.session);
	console.log("***");
	console.log("***");
	console.log(connect);
	console.log("***");
	console.log("***");
	//TODO
	
	res.end("TODO");
});
server.use("/", function (req, res) {
	getIndex(req, res);
});
server.listen(3000);



getIndex = function(req, res) {
	var filename = __dirname + "/index.html";
	
	fs.readFile(filename, function(err, file) {
		if(err) {
			console.log("***  " + err);
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.end(err + "\n");
			return;
		} else {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(file);
		}
	});
}
