// mysql连接
const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost", // 服务器地址
    user : "root",      // 数据库用户名
    password : "root",  // 数据库密码
    database : "smms",   // 数据库名
    table:"users"
})

// 测试连接
connection.connect(()=>{
  console.log("数据库连接成功")
})

// 暴露出去
module.exports = connection;