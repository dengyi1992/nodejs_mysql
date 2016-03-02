/**
 * Created by deng on 16-3-2.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'nodejs',
    port:3306
});
conn.connect();
var str="";
var options = {
    hostname: 'apis.baidu.com',
    path: '/txapi/world/world?num=8' ,
    method: 'GET',
    headers:{'apikey':'85f58fd70159426be3e4367cd5afa2cc'}

};


/* GET home page. */
router.get('/', function(req, res, next) {




    var reqs=http.request(options,function(ress){
        console.log('STATUS: ' + ress.statusCode);
        console.log('HEADERS: ' + JSON.stringify(ress.headers));
        ress.on('data',function(chunk){
            ress.setEncoding('utf8');
            console.log('data:'+chunk.toString());
            //var obj=JSON.parse(chunk.toString());
            //console.log(obj.status.toString())
            var obj=JSON.parse(chunk.toString()).newslist;
            res.json({'msg':'收到','body':obj[1].title});
            for (var i in obj){
                    console.log(obj[i].description);

            }

        });
    });
    reqs.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    reqs.end();

});

module.exports = router;