var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'nodedb',
});
var TEST_TABLE = 'bxj';
connection.connect();
app.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})
app.get('/getinfo', function (req, res) {
    var num = req.query.page
    var response = [];

    connection.query(
        'SELECT * FROM ' + TEST_TABLE + " limit " + num * 100 + ",100",
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }

            for (var i = 0; i < 50; i++) {
                response[i] = (results[i].id, results[i].title, results[i].url);
                console.log("%d\t%s\t%s", results[i].id, results[i].title, results[i].url);
            }
            res.end(JSON.stringify(results))

        }
    );
})
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})