/**
 * 这是账号管理路由模块
 */
var express = require('express');
var router = express.Router();

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

/* 
  添加账号的路由 /accountadd
*/
router.post('/accountadd', function(req, res) {
    // 接收前端发送的添加账号的数据
    let { username, password, userGroup } = req.body;
    console.log(username, password, userGroup);
});

module.exports = router;
