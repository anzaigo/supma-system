/**
 * 这是账号管理路由模块
 */
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


/* 
  添加账号的路由 /accountadd
*/
router.post('/accountadd', function(req, res) {
    // 接收前端发送的添加账号的数据
    let { username, password, userGroup } = req.body;
    console.log(username, password, userGroup);

    // 把数据存入数据库
    // 构建sql语句
    const sqlStr = `insert into account(username, password, userGroup) values ('${username}', '${password}', '${userGroup}')`
    // 执行sql语句
    connection.query(sqlStr,(err,data) => {
      if (err) throw err;
      // 判断受影响行数
      if (data.affectedRows > 0) {
        // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
        res.send({"error_code": 0, "reason":"插入数据成功"});
      } else {
        // 失败：返回给前端失败的数据对象
        res.send({"error_code": 1, "reason":"插入数据成功"})
      }
    })
});

/*
  账号管理路由  /accountlist
*/
router.get('/accountlist', (req, res) => {
  // 构建sql语句
  const sqlStr = 'select * from account order by ctime desc';
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if (err) throw err;
    // 把查询到的数据响应给前端
    res.send(data);
  })
})

// 删除账号请求的路由     /accountdel
router.get('/accountdel',(req, res) => {
  // 接收前端发来的id
  let { id } = req.query;
  // 根据id进行删除
  // 构造删除数据的sql语句
  const sqlStr = `delete from account where id=${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if (err) throw err;
    // 根据删除结果判断
    if (data.affectedRows > 0) {
      // 如果受影响行数大于0 删除成功 返回成功的数据对象给前端
      res.send({"error_code": 0, "reason":"删除账号成功"});
    } else {
      // 否则删除失败 返回失败的数据对象给前端
      res.send({"error_code": 1, "reason":"删除账号失败"});
    }
  })

})

// 编辑账号请求的路由     /accountedit
router.get('/accountedit',(req, res) => {
  // 接收前端发来的id
  let { id } = req.query;
  // 构造查询数据的sql语句
  const sqlStr = `select * from account where id=${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err, data) => {
    if (err) throw err;
    // 把查询到的数据返回给前端
    res.send(data);
  })
})

// 编辑保存修改请求的路由(模态框确认按钮)     /accounteditsave
router.post('/accounteditsave',(req, res) => {
  // 接收前端发来的原来的id和新的数据
  let {editId, username, usergroup} =req.body;
  // 构造修改sql语句
  const sqlStr = `update account set username='${username}', usergroup='${usergroup}' where id=${editId}`;
  // 执行sql语句
  connection.query(sqlStr,(err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是修改成功
    if (data.affectedRows > 0) {
      // 返回成功的数据对象给前端
      res.send({"error_code": 0, "reason":"修改账号成功"});
    } else {
      // 返回失败的数据对象给前端
      res.send({"error_code": 1, "reason":"修改账号失败"});
    }
  })
})

// 批量删除请求路由     /batchdelete
router.get('/batchdelete',(req, res) => {
  // 接收前端发过来的要删除账号的id
  let {selectedId} = req.query;
  // 构建批量删除sql语句
  const sqlStr = `delete from account where id in (${selectedId})`;
  // 执行sql语句
  connection.query(sqlStr,(err, data) =>{
    if (err) throw err;
    // 根据删除结果判断 成功就返回成功的数据对象 否则 就返回失败的数据对象
    if (data.affectedRows > 0) {
      // 返回成功的数据给前端
      res.send({"error_code": 0, "reason":"删除账号成功"});
    } else {
      // 返回失败的数据给前端
      res.send({"error_code": 0, "reason":"删除账号失败，请刷新网页"});
    }
  })
})

// 按分页显示账号列表的路由    /accountlistbypage
router.get('/accountlistbypage',(req, res) => {
  // 接收前端发来的当前页码 和 每页数据条数
  let {currentPage, pageSize} = req.query;
  // 默认值
  pageSize = pageSize ? pageSize : 2;
  currentPage = currentPage ? currentPage : 1;
  // 构建sql语句（查询所有数据 按照时间排序）
  let sqlStr = `select * from account order by ctime desc`;
  // 执行sql语句
  connection.query(sqlStr,(err, data) => {
    if (err) throw err;
    // 计算数据总条数
    let total = data.length;
    // 分页条件（跳过多少页）
    let n = (currentPage - 1) * pageSize;
    // 拼接分页的sql语句
    sqlStr += ` limit ${n}, ${pageSize}`;
    // 执行sql语句 （查询对应页码的数据）
    connection.query(sqlStr,(err, data) => {
      if (err) throw err;
      // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
      res.send({
        total,
        data
      })
    })
  })
})

// 验证旧密码是否正确的路由     /checkOldPwd
router.get('/checkOldPwd',(req, res) => {
  // 接收前端发来的用户名和旧密码
  let {oldPassword, username} = req.query;
  // 构造查询sql语句
  const sqlStr = `select * from account where password='${oldPassword}' and username='${username}'`;
  //执行sql语句
  connection.query(sqlStr,(err, data) => {
    if (err) throw err;
    if(data.length) {
      res.send({"error_code": 0, "reason":"旧密码正确!"})
    } else {
      res.send({"error_code": 1, "reason":"旧密码错误!"})
    }
  })
})

// 修改并保存密码的路由     /savenewpwd
router.post('/savenewpwd',(req, res) => {
  // 接收前端发来的数据
  let {username, oldPassword, newPassword} = req.body;
  // 构造sql语句
  const sqlStr = `update account set password='${newPassword}' where username='${username}' and password='${oldPassword}'`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断是否成功
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason": "密码修改成功!请重新登录!"});
    } else {
      res.send({"error_code": 1, "reason": "密码修改失败！"})
    }
  })
})

// 个人中心的路由        /accountinfo
router.get('/accountinfo', (req, res) => {
  // 个人信息 响应给前端
  res.send(req.user);      // req.user是token封装信息的一个属性
})


module.exports = router;
