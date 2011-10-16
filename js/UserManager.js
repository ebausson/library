var User = exports;

User.authenticate = function(db, username, password) {
    var response = {success : false};
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

User.createAccount = function(db, username, password) {
    var response = {success : false};
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

User.getLibrary = function() {
    return {};
}

User.isAuth = function(req, res){
    console.log(req.session);
    return false;
}
