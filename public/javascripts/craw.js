var request = require("request");
var cheerio = require("cheerio");
var iconv = require('iconv-lite')
// require()
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
var options = {
    method: 'GET',
    url: "http://bbs.hupu.com/bxj-",
    encoding: null,
    headers: headers
};
var num = 1;
var link = "http://bbs.hupu.com/bxj-";
// setInterval(getData, 1);
//cheerio 可以简单粗暴的理解为服务器端 jQuery 选择器
function getData(num) {
    options.url = link + num;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var html = iconv.decode(body, 'gbk')
        var $ = cheerio.load(html, {decodeEntities: false});
        var items = [];
        $('#pl .p_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                href: $element.children('a').attr('href'),
                title: $element.children('a').text()
            });
        });
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            add([items[i]['href'], items[i]['title']]);
        }
        console.log(options.url + "请求成功" + num)

    });
    // connection.end();
}

setInterval(function () {
    getData(num++);
}, 1000 );

///////////////////////////////////////
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'nodedb',
});
var TEST_TABLE = 'bxj';

/**
 * 查询
 */
function select() {
    connection.connect();
    connection.query(
        'SELECT * FROM ' + TEST_TABLE,
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log("%d\t%s\t%s", results[i].id, results[i].title, results[i].url);
                }
            }
            connection.end();
        }
    );
}

/**
 * 增加
 */
function add(userAddSql_Params) {
    var userAddSql = 'INSERT INTO bxj(url,title) VALUES(?,?)';
    // var userAddSql_Params = ['Wilson', 55];
    connection.query(userAddSql, userAddSql_Params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('-------INSERT----------');
        console.log('INSERT ID:', userAddSql_Params);
        console.log('#######################');
    });

}


