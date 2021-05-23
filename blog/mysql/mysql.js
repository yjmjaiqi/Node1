var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
    host:"localhost",
    port:"3306",//默认端口
    user:"root",
    password:"123456",
    database:"vtest",
    multipleStatements:true,
    timezone:"SYSTEM"
});
//建立连接
db.connect((err)=>{
    if(err){
        console.log("Mysql连接失败");
    }else
    console.log("Mysql连接成功");
})

module.exports=db;