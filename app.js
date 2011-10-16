// node API
var fs  = require("fs");                            // filesystem API
var url = require("url");                        // URL parsing API

// node modules
var connect = require("connect");                // connect middleware
var couchdb = require('couchdb');                // noSQL database

// application modules
var UserManager = require('./js/user/UserManager.js');




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

// serving static file
server.use("/static", connect.static(__dirname + '/static'));


// user management
server.use("/user", function(req, res) {
    var result = UserManager.handleRequest(req, res, db);
    res.end(JSON.stringify(result));
    return;
});

// other requests
server.use("/request", function(req, res) {
    if (! UserManager.isUserAuth(req, res)) {
        //TODO
        res.end("TODO");
        return;
    };
    
    // starting here, we are sure
    
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
        var jsFiles = fs.readdirSync(__dirname + jsFilesDir);
        for (var i in jsFiles) {
            indexPage += '<script type="text/javascript" src="' +jsFilesDir + jsFiles[i] + '"></script>\n';
        }
        indexPage += '<script type="text/javascript" src="static/bootstrap.js"></script>\n';
        indexPage += '\n';
        indexPage += '</head>\n';
        indexPage += '<body></body>\n';
        indexPage += '</html>\n';
    }
    
    res.end(indexPage);
    return;
};
