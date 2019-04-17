// 引入路由
var router = require("./token.js")
var connection = require('./conn.js') 

// 接收添加账号请求 : /accountadd
router.post("/accountadd",(req,res) => {
  
  // 接收前端数据
  let {username,password,region} = req.body;

  // 把数据存入数据库
  // 写sql语句
  const sqlStr = `insert into users(username,password,region) values("${username}","${password}","${region}")`;

  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
        if(err){
          throw err;
        }
        res.send("1");
  })
})

// 接收删除数据请求
router.get("/accountdelete",(req,res) => {
  // 获取请求的id
  let {id} = req.query;

  // 写sql语句
  let sqlStr = `delete from users where id = ${id}`

  console.log(sqlStr);

  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows > 0){
      res.send({code:0, reason:"数据删除成功"})
    }else{
      res.send({code:1, reason:"数据删除失败"})
    }
  })

  //

})

// 接收修改数据请求
router.post("/editaccount",(req,res) => {

  // 接收数据
  let { newname, oldpassword, group, id} = req.body;

  // 创建sql语句
  let sqlStr = `update users set username = "${newname}",password="${oldpassword}",region="${group}" where id = "${id}"`;

  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    let sqlStr = `select * from users where id = ${id}`;
    connection.query(sqlStr,(err,data) => {
      if(err) throw err
      res.send(data);
    })
  })



})

// 接收批量删除请求
router.get("/batchremove",(req,res) => {
  
  // 接收数据
  let id = req.query;
  let arrId=[];
  for(let i in id){
    arrId.push(id[i])
  }

  // 写sql语句
  let sqlStr = `delete from users where id in (${arrId})`

  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err) throw err

    // 判断状态 响应给前端
    if(data.affectedRows > 0){
      res.send({code:0, reason:"数据删除成功"})
    }else{
      res.send({code:1, reason:"数据删除失败"})
    }
  })
})

// 接收分页数据请求
router.get("/pagingData",(req,res) => {
  // 接收请求的数据
  let {pageSize, currentPage} = req.query;

  // 跳过  当前页面 - 1 * 显示条数  的数据
  let n = (currentPage - 1) * pageSize

  // 写sql语句
  let sqlStr = `select * from users`;

  // let sqlStr2 = `select * from users order by ctime desc limit ${n},${pageSize}`
  
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    let total = data.length;
    sqlStr += ` order by ctime desc limit ${n},${pageSize}`
    connection.query(sqlStr,(err, data) => {
      if(err) throw err
      res.send({total,data});
    })
  })
})

// 接收登录请求
router.post("/login",(req,res) => {

  // 接收数据
  let {username, password} = req.body;

  // 写sql语句
  const sqlStr = `select * from users where username = "${username}" and password = "${password}"`
  // 运行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    
    // 判断
    if(data.length > 0){
      // 密钥
      let secretKey = "super-password"
      // 对象浅拷贝 生成完美对象
      const obj = Object.assign({},data[0]);

      // 生成token
      let token = jwt.sign(obj,secretKey,{
        // token过期时间
        expiresIn:60*60*12  // 1小时后过期
      })
      res.send({code:0,reason:"登录成功!",token})
    }else{
      res.send({code:1,reason:"登录失败!"})
    }
  })
})

// 接收检查原密码请求
router.post("/checkoldpassword",(req,res) => {
     let oldpassword = req.body.value;
     if(oldpassword == req.user.password){
       res.send({code:0})
     }else {
       res.send({code:1})
     }
})  

// 保存修改后的密码
router.post("/savachangepassword",(req,res) => {

  // 接收数据
  let {newpassword} = req.body;

  let id = req.user.id;

  // sql
  let sqlStr = `update users set password = "${newpassword}" where id = ${id}`

  // 执行
  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    if(data.affectedRows > 0){
      res.send({code:0,reason:"修改成功,请重新登录"})
    }else{
      res.send({code:1,reason:"修改失败"})
    }
  })
})

// 接收获取用户名请求
router.get("/getusername",(req,res) => {
      let {username,avatarurl} = req.user
      res.send({username,avatarurl});
})

// 接收获取用户组请求
router.post("/getregion",(req,res) => {
    let roles = [];
    if(req.user.region === "超级管理员"){
      roles.push("admin")
    }else if(req.user.region === "普通用户"){
      roles.push("normal")
    }
    res.send(roles);
})

// 接收上传头像

// 文件上传第三方模块
const multer = require('multer');

// 配置存储路径 重命名
const storage = multer.diskStorage({
    destination: 'public/upload', // 文件上传到服务器要放入的目录
    // 文件名（重命名）
    filename: function (req, file, cb) {  // 123.jpb
        var fileFormat =(file.originalname).split("."); // [4, jpg] 把文件的名字变为数组
        var filename = new Date().getTime();  // 获取当前时间戳
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 上传对象
const upload = multer({
    storage,
});


router.post("/uploadavatar",upload.single("file"),(req,res) => {
  // console.log(req.file) 文件信息
  let imgurl = "/upload/"+req.file.filename;

  let id = req.user.id;

  // 写sql拼接图片地址 存入数据库
  let sqlStr = `update users set avatarurl = "${imgurl}" where id = ${id}`

  // 执行
  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    if(data.affectedRows > 0){
      res.send({code:0,reason:"上传成功!",imgurl});
    }else{
      res.send({code:1,reason:"上传成功!"});
    }
  })

  
})


module.exports = router;
