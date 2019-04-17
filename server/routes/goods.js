// 引入路由
var router = require("./token.js")
var connection = require('./conn.js') 

// 接收刷新列表请求
router.post("/goodslist",(req,res) => {

    // 接收数据
    let {pageSize,currentPage,region,keychar} = req.body;

    let n = (currentPage - 1) * pageSize;
    if(n<0){
        n=0
    }

    // 写sql
    let sqlStr = `select * from goods where 1=1`

    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        // 获取总条数
        let total = data.length;

        // 判断
        if(region !== "全部" && region !==""){
            sqlStr += ` and region="${region}"` 
        }

        if(keychar !==""){
            sqlStr += ` and (proname like "%${keychar}%" or procode like "%${keychar}%")` 
        }
        // 执行查询后的sql语句
        connection.query(sqlStr,(err,data) => {
            if(err) throw err
            total = data.length
        })

        // 将查询后的数据进行分页
        sqlStr += ` limit ${n},${pageSize}`
        connection.query(sqlStr,(err,data) => {
            if(err) throw err
            res.send({total,data})
        })
    })
})

// 接收添加商品请求
router.post("/goodsadd",(req,res) => {
    // 接收数据
    let {
        procode,
        proname,
        region,
        prosale,
        marketprice,
        innum,
        inprice,
        proweight,
        prounit, 
      } = req.body; 
        let promotionprice = ["未促销",(prosale*0.9).toFixed(2)];
        let repertory = innum;
        let repertorysum = innum * inprice;
        let salesum = innum * prosale;
    // 写sql语句   
    let sqlStr = `insert into goods(procode,proname,region,prosale,promotionprice,marketprice,repertory,repertorysum,salesum,innum,inprice,proweight,prounit) values(${procode},"${proname}","${region}",${prosale},"${promotionprice[1]}",${marketprice},${repertory},${repertorysum},${salesum},${innum},${inprice},${proweight},${prounit})`    
    
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if (err) throw err
        console.log(data);
    })
    res.send("1");
})

// 接收删除数据请求
router.get("/goodsdel",(req,res) => {

    // 接收数据
    let {id} = req.query;
    
    // 写sql语句
    let sqlStr = `delete from goods where id = ${id}`

    console.log(sqlStr)
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        if(data.affectedRows > 0){
            res.send({code:0,reason:"删除成功!"})
        }else{
            res.send({code:1,reason:"删除失败!"})
        }
    })
})

// 接收商品修改请求
router.post("/goodsedit",(req,res) => {

    // 接收数据
    let {id} = req.body;

    // sql
    let sqlStr = `select * from goods where id = ${id}`

    // 执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        res.send(data);
    })
})

// 接收商品保存修改请求
router.post("/goodseditsave",(req,res) => {

    // 接收数据
    let {id,region,proname,prosale,marketprice,promotionprice,repertory,repertorysum,salesum} = req.body;

    console.log(req.body);
    // sql
    let sqlStr = `update goods set region="${region}",proname="${proname}",prosale=${prosale},marketprice=${marketprice},promotionprice=${promotionprice},repertory=${repertory},repertorysum=${repertorysum},salesum=${salesum} where id=${id}`

    // 执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        // 数据回显
        sqlStr = `select * from goods where id = ${id}`
        connection.query(sqlStr,(err,data) => {
            if(err) throw err
            res.send(data);
        })
    })
})

// 接收批量删除请求
router.get("/batchremove",(req,res) => {

    // 接收数据
    let id = req.query.id;
    
    //sql
    let sqlStr = `delete from goods where id in (${id})`

    console.log(sqlStr)

    // 执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        if(data.affectedRows > 0){
            res.send({code:0,reason:"删除成功!"})
        }else{
            res.send({code:1,reason:"删除失败!"})
        }
    })
})

// 接收商品查询请求
router.get("/getsearch",(req, res) => {
    // 接收数据
    let { region, keychar} = req.query;

    // sql
    let sqlStr = `select * from goods where 1=1`;

    // 判断
    if(region !== "全部" && region !==""){
        sqlStr += ` and region="${region}"` 
    }

    if(keychar !==""){
        sqlStr += ` and (proname like "%${keychar}%" or procode like "%${keychar}%")` 
    }

    // 执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err
        res.send(data);
    })
})

module.exports = router;