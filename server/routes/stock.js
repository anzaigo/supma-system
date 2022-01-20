var express = require('express');
var router = express.Router();
// 引入express-jwt  用于验证token
const expressJwt = require('express-jwt');
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义密钥
const secretKey = 'itsource';

// 引入连接数据库模块
const connection = require('./connect');

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
})

// 使用expressJwt模块验证token
router.use(expressJwt ({
  secret:  secretKey, 
  algorithms: ['HS256']   // 更新算法
}).unless({
  path: ['/login/checklogin']  // 不需要验证token的地址
}));

// 拦截器
router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token 未能授权...');
  }
});


// 添加库存的路由           /stockadd
router.get('/stockadd', (req, res) => {
    // 接收前端发来的参数
    let {barCode, goodsname, quantity, costPrice} = req.query;
    // 构造sql语句
    const sqlStr = `insert into stock (barCode, goodsname, quantity, costPrice) values ('${barCode}', '${goodsname}', '${quantity}', '${costPrice}')`;
    // 执行sql语句
    console.log(sqlStr);
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断是否成功（受影响行数是否大于0）
        if (data.affectedRows > 0) {
            res.send({"error_code": 0, "reason": "入库成功"})
        } else {
            res.send({"error_code": 1, "reason": "入库失败"})
        }
    })
    console.log(sqlStr);
})

// 库存管理的路由          /stockManage
router.get('/stockManage', (req, res) => {
    // 接收前端发来的参数
    let {pageSize, currentPage, cateName, keyWord} = req.query;

    // 默认值
    pageSize = pageSize ? pageSize : 3;
    currentPage = currentPage ? currentPage : 1

    // 构造sql语句
    let sqlStr = `select * from stock where 1 = 1`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 计算总条数
        let total = data.length;

        // 如果分类名不为全部
        if (cateName !=="全部") {
            sqlStr += ` and cateName='${cateName}'`
        }
        // 如果关键字不为空，就拼接关键字查询条件
        if (keyWord !=='') {
            sqlStr += ` and (goodsName like "%${keyWord}%" or barCode like "%${keyWord}%")`
        }
        // 再次按照 查询的条件查询数据 重新计算数据的总条数
        connection.query(sqlStr, (err, data) => {
            if (err) throw err;
            total = data.length;
        })
        // 拼接排序
        sqlStr += ` order by ctime desc`;

        // 分页条件 (跳过多少条)
        let n = (currentPage - 1) * pageSize;
        // 拼接分页的sql语句
        sqlStr += ` limit ${n}, ${pageSize}`;

        // 执行sql语句 （查询对应页码的数据）
        connection.query(sqlStr, (err, data) => {
        if (err) throw err;
            // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
            res.send({
                total,
                data
            })
        })
    })
})

// 库存管理编辑的路由      /stockedit
router.get('/stockedit', (req, res) => {
    // 接收前端发来的数据
    let {id} = req.query;
    // 构造sql语句
    const sqlStr = `select * from stock where id=${id}`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 把查询的数据返回给前端
        res.send(data);
    })
})

// 库存管理编辑保存按钮的路由     /stockeditsave
router.post('/stockeditsave', (req,res) => {
    // 接收前端发来的数据
    let {editId, stock, sold} = req.body;
    // 构造修改sql语句
    const sqlStr = `update stock set stock='${stock}', sold='${sold}' where id=${editId}`;
    console.log(sqlStr);
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断受影响行数（>0就是成功）
        if (data.affectedRows > 0) {
            // 返回成功的数据对象给前端
            res.send({"error_code": 0, "reason":"修改库存成功"});
        } else {
            // 返回失败的数据对象给前端
            res.send({"error_code": 1, "reason":"修改库存失败"});
        }
    })
})

// // 商品销售自动刷新
// router.get('/goodschekoutbypage', (req, res) => {
//     let {barcode, quantity, cardNumber} = req.body;
//     barcode = barcode ? barcode : 1;
//     const sqlStr = `select * from stock where barcode='${barcode}`;
//     connection.query(sqlStr,(err, data) => {
//         if (err) throw err;
//         res.send(data);
//     })
// })
// 商品销售加入订单的路由          /goodscheckout         
router.post('/goodscheckout',(req, res) => {
    // 接收前端发来的参数
    let {barcode, quantity, cardNumber} = req.body;
    // 构造查询sql语句
    const sqlStr = `select * from stock where barcode='${barcode}'`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send(data);
        console.log(data);
    })
})
module.exports = router;
