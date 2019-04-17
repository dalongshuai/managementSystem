// token验证
var express = require('express');
var router = express.Router();
global.jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

// 通知设置请求头 
router.all("*",(req,res,next) => {
    // 设置响应头 解决跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许携带的请求头
  
    // 执行下一步
    next();
  })
  
// 定义密钥
global.secretKey = "super-password";
  
  // 使用中间件验证token合法性
  router.use(expressJwt ({
            secret : secretKey 
        })
        .unless({
            path: ['/account/login']  //除了这些地址，其他的URL都需要验证
        }));
  
router.use(function (err, req, res, next) {
//当token验证失败时会抛出如下错误
if (err.name === 'UnauthorizedError') {   
    //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(401).send('无效的token');
}
}); 

module.exports = router;