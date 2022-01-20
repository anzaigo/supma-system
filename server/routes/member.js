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
router.use(expressJwt({
  secret: secretKey,
  algorithms: ['HS256']   // 更新算法
}));

// 拦截器
router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token 未授权...');
  }
});


//添加会员的路由      /memberadd
router.post('/memberadd', function(req, res, next) {
  // 接收前端发来的参数
  let {userName, cardNumber, memberLevel, identityCard, userStatus, telephone, email, province, city, area, detailedAddress, postalCode} = req.body;
  // 构造sql语句
  const sqlStr = `insert into member (userName, cardNumber, memberLevel, identityCard, userStatus, telephone, email, province, city, area, detailedAddress, postalCode) values ('${userName}', '${cardNumber}', '${memberLevel}', '${identityCard}', '${userStatus}', '${telephone}', '${email}', '${province}', '${city}', '${area}', '${detailedAddress}', '${postalCode}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 根据受影响的函数 判断 是否成功
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason": "添加会员成功"});
    } else {
      res.send({"error_code": 1, "reason": "添加会员失败"});
    }
  }) 
});

// 会员管理请求的路由   /memberlistbypage
router.post('/memberlistbypage', (req, res) => {
  // 接收前端发来的参数
  let {pageSize, currentPage, keyWord} = req.body;

  // 给页码分配默认值
  pageSize = pageSize ? pageSize : 4;                 // 每页默认显示数据条数为4
  currentPage = currentPage ? currentPage : 1;        // 默认页为1

  // 构造sql语句
  let sqlStr = `select * from member where 1 = 1`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;

    // 计算总条数
    let total = data.length;

    // 如果关键字不为空
    if (keyWord !== "") {
      sqlStr += ` and (userName like "%${keyWord}%" or cardNumber like "%${keyWord}%" or telephone like "%${keyWord}%")`
    }

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
    console.log(data);
  })

})

// 编辑弹出模态框的路由     /memberedit
router.get('/memberedit', (req, res) => {
  // 接收前端发来的参数
  let {id} = req.query;
  // 构造sql语句
  const sqlStr = `select * from member where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
})

// 保存修改的模态框的路由     /membereditsave
router.post('/membereditsave', (req, res) => {
  // 接收前端发来的参数
  let {editId, integral, discount} = req.body;
  // 构造sql语句
  const sqlStr = `update member set integral='${integral}', discount='${discount}' where id=${editId}`;
  console.log(sqlStr);
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是修改成功
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason": "修改成功"});
    } else {
      res.send({"error_code": 1, "reason": "修改失败"});
    }
  })
})

// 删除会员账号的路由         /memberdel
router.get('/memberdel', (req, res) => {
  // 接收前端发来的参数
  let {id} = req.query;
  // 构造sql语句
  const sqlStr = `delete from member where id='${id}';`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是删除成功
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason": "删除会员账号成功"});
    } else {
      res.send({"error_code": 1, "reason": "删除会员账号失败"});
    }
  })
})

// 批量删除按钮的路由     /batchdelete
router.get('/batchdelete', (req, res) => {
  // 接收前端发来的参数
  let {selectedId} = req.query;
  // 构建批量删除sql语句
  const sqlStr = `delete from member where id in (${selectedId})`;
  // 执行sql语句
  connection.query(sqlStr,(err, data) =>{
    if (err) throw err;
    // 根据删除结果判断 成功就返回成功的数据对象 否则 就返回失败的数据对象
    if (data.affectedRows > 0) {
      // 返回成功的数据给前端
      res.send({"error_code": 0, "reason":"删除会员账号成功"});
    } else {
      // 返回失败的数据给前端
      res.send({"error_code": 0, "reason":"删除会员账号失败，请刷新网页"});
    }
  })
})

module.exports = router;
