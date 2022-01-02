var express = require('express');
var router = express.Router();
// 引入数据库模块
const connection = require('./connect');
// 引入express-jwt 用于验证token
const expressJwt = require('express-jwt');
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义密钥
const secretKey = 'itsource';

// node后端处理上传文件的模块
var multer = require('multer');
// 配置存储路径 重命名
var storage = multer.diskStorage({
  // 配置文件上传到服务器后的位置
  destination: 'public/upload',
  // 文件的名字
  filename: function (req, file, cb) {
      // fiel.originalname : avatar.jpg
      var fileFormat =(file.originalname).split(".");  // ['avatar', 'jpg']
      // 取时间戳
      var filename = new Date().getTime();  
      // 拼接文件名 时间戳.jpg
      cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
  }
});
// 上传对象
var upload = multer({
  storage
});

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
})

// 使用模块 express-jwt 验证token
router.use(expressJwt ({
  secret:  secretKey, 
  algorithms: ['HS256']   // 更新算法
}).unless({
  path: ['/login/checklogin', '/login/upload']  // 不需要验证token的地址
}));

//拦截器
router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token...');
  }
});


// 验证用户名和密码是否正确的路由       / checklogin
router.post('/checklogin', function(req, res, next) {
  // 接收前端发来的 用户名 和 密码
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
      const token = jwt.sign(accountInfo, secretKey, {expiresIn: 86400})
      // 定义角色数组，用来导航管理员控制显示
      const roles = [];
      let role = accountInfo.usergroup === '用户管理员' ? 'admin' : 'editor';
      roles.push(role);
      res.send({
        'err_code': 0, 
        'reason': '欢迎您，登录成功！',
        "username":accountInfo.username,
        token,
        roles
      });
    }
  })
});

// 头像上传请求的路由
router.post("/upload", upload.single('file'), (req, res) => {       // upload.single('name')里的name是前端input的name属性的值
  let {filename} = req.file;
  let imgUrl = '/upload/' + filename;
  console.log('文件路径:', imgUrl);
  // 构造sql语句
  // 把图片地址存入数据库
  const sqlStr = `insert into imgurl(imgUrl) values('${imgUrl}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send('上传成功!')
    }
  })
}) 

// 获取头像请求
router.get('/getavatar', (req, res) => {
  // 构造sql
  const sqlStr = `select * from imgurl`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send({data});
  })
})


module.exports = router;
