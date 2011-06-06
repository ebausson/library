var User = exports;

User.authenticate = function(request) {
	var username = request.user;
	var password = request.pass;
	console.log(request);
	// todo : login
	return username == password;
}
