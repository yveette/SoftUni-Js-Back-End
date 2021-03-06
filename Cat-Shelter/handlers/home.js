const url = require('url');
const fs = require('fs');
const path = require('path');

const cats = require('../data/cats');
const breeds = require('../data/breeds');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        // show home html view
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.write(404, {
                    "Content-Type": "text/plain"
                });
                res.write(404);
                res.end();
                return;
            }
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}