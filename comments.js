// Create web server
// 1. Load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var ROOT_DIR = "html/";
var comments = [];
var server = http.createServer(function (req, res) {
    // 2. Read request info
    console.log(req.method + " " + req.url);
    if (req.method == "POST") {
        // Read data
        var reqData = '';
        req.on('data', function (chunk) {
            reqData += chunk;
        });
        req.on('end', function () {
            var postParams = JSON.parse(reqData);
            console.log("Post Params: " + postParams);
            comments.push(postParams);
            res.writeHead(200);
            res.end();
        });
    }
    else if (req.method == "GET") {
        // 3. Parse the URL
        var urlObj = url.parse(req.url, true, false);
        // 4. Read the file
        fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
            if (err) {
                // 5.1 Send 404
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            else {
                // 5.2 Send file
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});
server.listen(8080);
console.log("Server running at http://localhost:8080");
//# sourceMappingURL=comments.js.map

