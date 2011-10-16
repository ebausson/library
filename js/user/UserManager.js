var UserManager = exports;

UserManager.handleRequest = function(req, res, db) {
    var isLogged = UserManager.isUserAuth(req);
    var request = require('url').parse(req.url, true);
    console.log(request);
    
    // defining every possible unlogged request
    if ('/isLogged' == request.pathname) {
        return {success : true, isLogged : isLogged};
    }
    if ("/account/create" == request.pathname) {
        if (isLogged) {
            return {success : false, type : 'session', msg : 'Cannot create an account while logged in.'};
        } else {
            return UserManager.createAccount(request.query, db);
        }
    }
    
    // else if user isn't logged, send an error
    if ( ! isLogged ) {
        res.writeHead(401, {"Content-Type": "text/plain"});
        return {success : false, type : 'session', msg : 'Not logged'};
    }
    
    // logged user request management
    //TODO
    
    // unknown request
    return {success : false, type : 'session', msg : 'Not logged'};
}

UserManager.authenticate = function(query, db) {
    var response = {success : false};
    var username = query.username;
    var password = query.password;
    
    if ( ! username || username == "") {
        response.msg = 'Username not set';
        return response;
    }
    if ( ! password || password == "") {
        response.msg = 'Password not set';
        return response;
    }
    
    console.log("*** Login attempt by : " + username);
    //TODO
    
    return response;
}

UserManager.createAccount = function(query, db) {
    var response = {success : false};
    var username = query.username;
    var password = query.password;
    
    if ( ! username || username == "") {
        response.msg = 'Username not set';
        return response;
    }
    if ( ! password || password == "") {
        response.msg = 'Password not set';
        return response;
    }
    
    console.log("*** Account creation attempt with username : " + username);
    //TODO
    
    return response;
}

UserManager.getLibrary = function() {
    return {};
}

UserManager.isUserAuth = function(req, res){
    
    console.log(req.session);
    return false;
}

