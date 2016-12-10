//mysql.js
//首先需要安装nodejs 的mysql包
//npm install mysql
//编写nodejs与mysql交互的代码

function DataBase() {
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
        var userAddSql_Params = ['Wilson', 55];
        connection.query(userAddSql, userAddSql_Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('-------INSERT----------');
            console.log('INSERT ID:', userAddSql_Params);
            console.log('#######################');
        });
        connection.end();
    }
}


module.exports = DataBase;