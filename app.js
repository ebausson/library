// node API
var fs  = require("fs");                            // filesystem API
var url = require("url");                        // URL parsing API

// node modules
var connect = require("connect");                // connect middleware
var couchdb = require('couchdb');                // noSQL database

// application modules
var User = require('./js/UserManager.js');




var DEBUG = true;
var indexPage = null;

var server = connect.createServer(
    connect.logger("*** :status   :date - :url"),
    connect.favicon(__dirname + '/static/favicon.ico'),
    connect.cookieParser(),
    connect.session({secret:'some secret String'})
);


var dbNamespace = 'library_';
var dbProvider  = couchdb.createClient(5984, '127.0.0.1');
var db          = dbProvider.db(dbNamespace + 'db');




// ****************************
// **  dispatching requests  **
// ****************************

// static file serving
server.use("/static", connect.static(__dirname + '/static'));


// authentication request handling
server.use("/auth", function(req, res) {
    var parameters = getParameters(req.url);
    var response = User.authenticate(db, parameters.user, parameters.password);
    if (! response.success) {
        res.writeHead(401, {"Content-Type": "text/plain"});
    }
    res.end(JSON.stringify(response));
    return;
});

server.use("/account/create", function(req, res) {
    var parameters = getParameters(req.url);
    var response = User.createAccount(db, parameters.user, parameters.password);
    
    res.end(JSON.stringify(response));
    return;
});


// other requests
server.use("/request", function(req, res) {
    User.isAuth(req, res) | function(req, res) {
    //TODO
    res.end("TODO")}();
});


// "root" handling
server.use("/", function (req, res) {
    getIndex(req, res);
});

server.listen(3000);






// *************
// **  Utils  **
// *************

function getIndex(req, res) {
    //generating index page if requiered
    if ( DEBUG || ! indexPage) {
        var cssFilesDir     = "/static/css/";
        var jsFilesDir      = "/static/js/";
        
        indexPage = "";
        indexPage += '<html>\n';
        indexPage += '<head>\n';
        indexPage += '<title>Library</title>\n';
        indexPage += '\n';
        indexPage += '<!-- stylesheets -->\n';
        indexPage += '<link rel="stylesheet" type="text/css" href="static/ext-4.0.2a/resources/css/ext-all.css" />\n';
        var cssFiles = fs.readdirSync(__dirname + cssFilesDir);
        for (var i in cssFiles) {
            indexPage += '<link rel="stylesheet" type="text/css" href="' +cssFilesDir + cssFiles[i] + '" />\n';
        }
        indexPage += '\n';
        indexPage += '<!-- scripts -->\n';
        indexPage += '<script type="text/javascript" src="static/ext-4.0.2a/ext-all-debug-w-comments.js"></script>\n';
        indexPage += '<script type="text/javascript" src="static/app.js"></script>\n';
        var jsFiles = fs.readdirSync(__dirname + jsFilesDir);
        for (var i in jsFiles) {
            indexPage += '<script type="text/javascript" src="' +jsFilesDir + jsFiles[i] + '"></script>\n';
        }
        indexPage += '\n';
        indexPage += '</head>\n';
        indexPage += '<body></body>\n';
        indexPage += '</html>\n';
    }
    
    res.end(indexPage);
    return;
    
    
    // Old Version
    /*
    var filename = __dirname + "/index.html";
    
    fs.readFile(filename, function(err, file) {
        if(err) {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err + "\n");
            return;
        } else {
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(file);
        }
    });
    */
};

function getParameters(url) {
    var response = {};
    var query = url.split('?')[1];
    if (query) {
        queryEntries = query.split('&');
        for (var i = 0; i < queryEntries.length; i++) {
            var splittedQueryEntry = queryEntries[i].split('=');
            if (splittedQueryEntry[1]) {
                response[splittedQueryEntry[0]] = splittedQueryEntry[1];
            }
        }
    }
    return response;
}
