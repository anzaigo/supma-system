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
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 添加商品的路由   / goodsadd
router.post('/goodsadd',(req, res) => {
  // 接收前端发来的表单数据
  let {classify, barcode, gootsname, purchaseprice, marketvalue, price, quantity, weight, company, discount, promotion, gootsdesc} = req.body;
  // 构造sql语句
  const sqlStr = `insert into goods(cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  // 参数
  const sqlParams = [classify, barcode, gootsname, purchaseprice, marketvalue, price, quantity, weight, company, discount, promotion, gootsdesc];
  // 执行sql语句
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 成功
      res.send({"error_code": 0, "reason": "添加商品成功"});
    } else {
      // 失败
      res.send({"error_code": 1, "reason": "添加商品失败"});
    }
  })
})

// 按照分页显示商品列表   /goodslistbypage
router.get('/goodslistbypage', (req, res) => {
  // 接收前端参数
  let {pageSize, currentPage, cateName, keyWord} = req.query;

  // 默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1

  // 构造sql语句 （查询所有数据 按照时间排序）
  let sqlStr = `select * from goods where 1 = 1`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 计算数据总条数
    let total = data.length;

    // 分类名不为空 且 全部 那么 就拼接分类条件
    if (cateName !== "" && cateName !== "全部") {
      sqlStr += ` and cateName='${cateName}'`;
    }

    // 如果关键字不为空 就要拼接关键字查询条件
    if (keyWord !== "") {
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

// 编辑分类的路由           /classification
router.get('/classification', (req, res) => {
  // 接收前端发来的数据
  let {id} = req.query;
  // 构造sql语句
  const sqlStr = `select * from goods where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
})
// 编辑保存分类的路由       /goodseditsave
router.post('/goodseditsave', (req, res) => {
  // 接收前端发来的数据
  let {editId, cateName} = req.body;
  // 构造sql语句
  const sqlStr = `update goods set cateName='${cateName}' where id=${editId}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是修改成功
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason": "修改分类成功"});
    } else {
      res.send({"error_code": 1, "reason": "修改分类失败"});
    }
  })
})

module.exports = router;
