const express = require('express')
const router = express.Router()

// 导入登录控制权限
const isLogin = require('../middlewares/check').isLogin

const UserModel = require('../models/user')

// GET 登录页
router.get('/', function (req, res, next) {
    res.render('signin')
})

// POST 登录
router.post('/', function (req, res, next) {
    const name = req.fields.name
    const password = req.fields.password
    
    var result = {}   
    // 校验
    try {
        if (!name.length) 
            throw new Error('请填写用户名')
        if (!password.length)
            throw new Error('请填写密码')
    } catch(e) {
        result.result = false
        result.message = e.message
        res.json(result)
        return false
    }
    
    UserModel.getUserByName(name) 
        .then(function(user){               
            try {
                if (!user)
                    throw new Error('用户不存在')                                   
                if (password != user.password)
                    throw new Error('用户名或密码错误')                                  
            } catch(e) {
                result.result = false
                result.message = e.message
                res.json(result)
                return false
            } 
            result.result = true
            result.message = '登录成功'
            // 用户信息写入 session           
            req.session.user = user
            req.flash(user)
            res.json(result)           
            
            
                       
        })
        .catch(next)

    // 添加数据
    // UserModel.create({name: name, password: password})
})

module.exports = router