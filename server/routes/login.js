var express = require('express');
var router = express.Router();
// 引入数据库模块
const connection = require('./connect');
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义密钥
const secretKey = 'itsource';

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// 验证用户名和密码是否正确的路由       / checklogin
router.post('/checklogin', function(req, res, next) {
  // 接收前端发来的用户名 和 密码
  let {username, password} = req.body;
  // 构建sql语句（查询用户名和密码是否存在）
  const sqlStr = `select * from account where username='${username}' and password='${password}'`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if (err) throw err;
    // 判断是否存在
    if (!data.length) {
      res.send({'err_code': 1, 'reason': '用户名或密码不正确！'});
    } else {
      // 当前登录账号数据
      const obj = data[0];
      // 去掉 nodejs 获取MySQL数据时产生的RowDataPacket
      // 1、转为字符串
      const objStr = JSON.stringify(obj);
      // 2、转换成一个新的json对象
      const accountInfo = JSON.parse(objStr);
      // 生成token
      const token = jwt.sign(accountInfo, secretKey, {expiresIn: 60 * 60})
      res.send({
        'err_code': 0, 
        'reason': '欢迎您，登录成功！',
        token
        // "sername":accountInfo.username
      });
    }
  })
});

module.exports = router;
