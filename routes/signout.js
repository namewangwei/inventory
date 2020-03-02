const express = require('express')
const router = express.Router()

const isLogin = require('../middlewares/check').isLogin

// GET signout 登出
router.get('/', function (req, res, next) {
   // 清空 session 中用户信息
   req.session.user = null
   req.flash('success', '登出成功')
   // 登出成功后跳转到主页
   res.redirect('/signin')
})

module.exports = router