const express = require('express');
const router = express.Router();

const InventoryModel = require('../models/inventory');
const HistoryModel = require('../models/history');
const UserModel = require('../models/user');

const isNotLogin = require('../middlewares/check').isNotLogin;
const checkPower = require('../middlewares/check').checkPower;
const moment = require('moment');
// var update_at = moment().format('YYYY-MM-DD HH:mm:ss')


router.get('/', isNotLogin,checkPower, function (req, res, next) {
    res.redirect('/posts/rk')
});


// 入库 -- 
router.get('/rk', isNotLogin,checkPower,function (req, res, next) {
    res.render('rk',{title:'入库'})
});

// 入库 --
router.get('/bf', isNotLogin,checkPower,function (req, res, next) {
    res.render('bf',{title:'报废'})
});

// 根据条件，查询库存
router.post('/rk/query', isNotLogin, function (req, res, next) {
    let status = req.fields.status || 0,
        testStatus = req.fields.testStatus || 0,
        IMEI = req.fields.IMEI || '',
        time = req.fields.time || '';
    let query = {};
    if (status !== '0') query.status = status ;
    if (testStatus !== '0') query.testStatus = testStatus;
    if (!IMEI)  query.IMEI = IMEI;
    if (!time) query.update_at = eval('/^'+time+'/');
    InventoryModel.getInventory(query) 
    .then(function(inventoryArr) {
        let result = {};
            result.rows = inventoryArr;
            res.json(result)           
    }) 
    .catch(next)   
    
})

// 创建 && 修改已有的库存信息   
router.post('/*/edit', isNotLogin, function (req, res, next) {
    const data = req.fields;
    const IMEI = data.IMEI;
    data.update_at = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log(data)
    data.id && delete data.id;
    let result = {};
    switch(data.oper) {
        case 'add': 
            {            
                delete data.oper;                               
                try {
                    if (!data.IMEI.length) 
                        throw new Error('IMEI不能为空')
                    // if (data.IMEI.length!=18) 
                    //     throw new Error('IMEI需固定18位')
                } 
                catch(e) {
                    result.result = false;
                    result.message = e.message;
                    res.json(result);
                    return false
                }
                InventoryModel.queryIMEI(IMEI) 
                    .then(function(inventory) {   
                        try {
                            if (inventory && !inventory.length)
                                throw new Error('该IMEI已存在')
                        } 
                        catch(e) {
                            result.result = false;
                            result.message = e.message;
                            res.json(result);
                            return false
                        }  
                        InventoryModel.create(data)
                        .then(function (obj) {
                            result = {
                                result:true,
                                message:'创建成功！'
                            };
                            res.json(result)                                                                                                  
                        });
                        HistoryModel.createHistoryInfo({IMEI:IMEI,historyarr: [JSON.stringify(data)]})
                        .then(function (historyinfo) {  
                            //console.log(HistoryInfo)                                                                                                                  
                        })                                           
                    })               
                    
                    
            }
            break;
        case 'edit': 
            {
                delete data.oper;               
                var IMEArr = IMEI.split(',')
                var IMEIs = {$in:IMEArr}
                delete data.IMEI
                
                if (data.maintaintype && data.maintaintype == '1') {    // 修好
                  //  posdata.shtesttype = '1'  // 检测类型改为完好
                  if (data.testStatus == '12') {
                      data.testStatus = '120'
                  }
                  else {
                    if (data.shoption == '1' ) {   // 退货类型 返回仓管
                        data.testStatus = '32'  
                    } else if (data.shoption == '2') { // 换货类型 
                        data.testStatus = '42'
                    } else {
                        data.testStatus = '54'   // 维修类型  已维修
                    }
                  }
                    
                } else if (data.maintaintype && data.maintaintype == '2') {  // 修不好
                    if (data.testStatus == '12') {
                        data.testStatus = '70'
                    }
                    else {
                        if (data.shoption == '1') {   
                            data.testStatus = '70' // 退货类型 返回退货
                        } else if (data.shoption == '2') {
                            data.testStatus = '70'  // 换货类型 返回换货
                        } else {
                            data.testStatus = '55'   // 维修类型   无法维修
                        }
                    }
                    
                }
                if(
                    (data.testStatus == '0') ||   // 库管修改未检测内容
                    (data.testtype == '2')  ||// 检测 有故障
                    ((data.shtesttype == '2' || data.shtesttype == '3') && (data.testStatus != '60') ) ||
                    (data.returntype == '2') || // 退货 折旧
                    (data.maintaintype == '2') || // 维修 无法修好
                    (data.testStatus == '11') || (data.testStatus == '101')
                ) {                   
                        try {
                            if (!data.remark) 
                                throw new Error('请输入备注信息')
                        } 
                        catch(e) {
                            result.result = false
                            result.message = e.message
                            return res.json(result)                           
                        }    
                } 
                if (data.testStatus == '19' && data.shordercode == '') {
                    try {throw new Error('售后订单号不能为空')}
                    catch(e) {
                        result.result = false
                        result.message = e.message
                        return res.json(result) 
                    }
                }
                if (data.testStatus == '42' && data.newIMEI == '') {
                    try {throw new Error('替换机器IMEI不能为空')}
                    catch(e) {
                        result.result = false
                        result.message = e.message
                        return res.json(result) 
                    }
                }
                if (data.newIMEI && data.newIMEI != '') {  // 售后换机
                    InventoryModel.queryIMEI(data.newIMEI)
                    .then(function (inventory) {                       
                        try {
                            if (!inventory || inventory.length == 0) 
                                throw new Error('没有找到'+data.newIMEI+'这台机器')
                            if (inventory && inventory[0].testStatus != '17')
                                throw new Error('该机器不是可销售状态的机器')
                        }
                        catch(e) {
                            result.result = false
                            result.message = e.message
                            return res.json(result)                            
                        }                         
                        InventoryModel.updateInventoryByIMEI(data.newIMEI, {
                            testStatus: '60',
                            ordercode: data.ordercode,
                            trackingcode:data.trackingcode,
                            ordername: data.ordername,
                            shoption: data.shoption,
                            status: '2' 
                        })
                        .then(function (inventory) {                                                               
                            // result = {
                            //     result:true,
                            //     message:'修改成功！'
                            // }
                            // res.json(result)                    
                        })                    
                        data.ordercode = ''  
                        data.trackingcode = ''  
                        data.ordername = ''  
                        data.status = '1',
                        data.shoption = ''  
                        // if (data.testStatus == '55') {
                        //     data.testStatus = '70'
                        // }
                        InventoryModel.updateInventoryByIMEI(IMEIs, data)
                        .then(function (inventory) {                                                                                        
                        })                    
                         HistoryModel.updateHistoryInfoByIMEI(IMEIs,JSON.stringify(data)) 
                        .then(function (historyinfo) {  
                            result = {
                                result:true,
                                message:'修改成功！'
                            }
                            res.json(result)                                                                                                          
                        })  
                    })                   
                          
                }  else {
                    if (data.testStatus != 0) {  // 状态不为0 入库信息修改无效
                        data.type && delete data.type
                        data.color && delete data.color
                        data.memory && delete data.memory
                    }
                    if (data.testStatus == '101') {
                        try {
                            if (data.trackingcode == '') throw new Error('快递单号不能为空')
                            if (data.ordername == '')throw new Error('姓名不能为空')
                        }
                        catch(e) {
                            result.result = false
                            result.message = e.message
                            return res.json(result)     
                        }
                    }
                    InventoryModel.updateInventoryByIMEI(IMEIs, data)
                    .then(function (inventory) {                                                                                        
                    })                    
                    HistoryModel.updateHistoryInfoByIMEI(IMEIs,JSON.stringify(data)) 
                    .then(function (historyinfo) {  
                        result = {
                            result:true,
                            message:'修改成功！'
                        }
                        res.json(result)                                                                                                          
                    }) 
                }              
                               
            }
            break;
    } 
    
   
})



// 检测 
router.get('/jc', isNotLogin,checkPower, function (req, res, next) {
    res.render('jc',{title:'检测'})
})

// 根据IMEI查询
router.post('/*/find', isNotLogin, function (req, res, next) {
    const data = req.fields
    const IMEI = data.IMEI || ''
    const pageCode = data.pageCode || ''
    const zjr = data.zjr || ''
    const testStatus = '0'
    var result = {},
        query = {}
    switch (pageCode) {
        case 'rkqr':    // 入库确认  
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['3','11', '15', '32','42','70','99','120']}} 
            } else {
                query = {testStatus:{$in:['3','11', '15','32','42','70','99','120']}}
            }
        break;
        case 'rk':    // 入库确认  
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['0','4', '12', '16','100','121']}} 
            } else {
                query = {testStatus:{$in:['0','4', '12', '16','100','121']}}
            }
        break;
        case 'jcqr': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['1','13']}}
            } else {
                query = {testStatus:{$in:['1','13']}}
            }
        break;
        case 'jc': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['2','14']}} 
            } else {
                query = {testStatus:{$in:['2','14']}}
            }
        break;
        case 'gdqr': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['5','9','102','108']}}
            } else {
                query = {testStatus:{$in:['5','9','102','108']}}
            }
        break;
        case 'gd': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['6','10','103','109']}} 
            } else {
                query = {testStatus:{$in:['6','10','103','109']}}
            }
        break;
        case 'zjqr': 
            if (IMEI!='') {
                query = {IMEI:IMEI,zjr: zjr,testStatus:{$in:['7','106']}} 
            } else {
                query = {zjr: zjr,testStatus:{$in:['7','106']}} 
            }
        break;
        case 'zj': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['8','107']}}
            } else {
                query = {testStatus:{$in:['8','107']}}
            }
        break;
        case 'ckqr': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['17']}}
            } else {
                query = {testStatus:{$in:['17']}}
            }
        break;
        case 'ck': 
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['17']}} 
            } else {
                query = {testStatus:{$in:['17']}}
            }
        break;
        case 'shsq':  // 售后申请
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['18']}}
            } else {
                query = {testStatus:{$in:['18']}}
            }
        break;
        case 'shdd':  // 售后申请单
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['19']}}
            } else {
                query = {testStatus:{$in:['19']}}
            }
        break;
        case 'shjcqr':  // 检测确认          
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['20']}}
            } else {
                query = {testStatus:{$in:['20']}}
            }
        break;
        case 'shjc':  //检测完成
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['21']}}
            } else {
                query = {testStatus:{$in:['21']}}
            }
        break;
        case 'shczqr':  //售后操作确认        
        if (IMEI!='') {
            query = {IMEI:IMEI,testStatus:{$in:['30','40','50','54','55']}}
        } else {
            query = {testStatus:{$in:['30','40','50','54','55']}}
        }
        break;
        // case 'shth':  //售后退货
        // if (IMEI!='') {
        //     query = {IMEI:IMEI,testStatus:{$in:['31']}}
        // } else {
        //     query = {testStatus:{$in:['31']}}
        // }
        // break;
        // case 'shhh':  //售后换货
        // if (IMEI!='') {
        //     query = {IMEI:IMEI,testStatus:{$in:['41']}}
        // } else {
        //     query = {testStatus:{$in:['41']}}
        // }
        // break;
        case 'wxqr':  //售后维修确认收货
        if (IMEI!='') {
            query = {IMEI:IMEI,testStatus:{$in:['52','11']}}
        } else {
            query = {testStatus:{$in:['52','11']}}
        }
        break;
        case 'wx':  //售后维修操作
        if (IMEI!='') {
            query = {IMEI:IMEI,testStatus:{$in:['53','12']}}
        } else {
            query = {testStatus:{$in:['53','12']}}
        }
        break;
        case 'sh': 
        if (IMEI!='') {
            query = {IMEI:IMEI,testStatus:{$in:['31','41','51','56']}}
        } else {
            query = {testStatus:{$in:['31','41','51','56']}}
        }
        break;
        case 'shfh':  //售后发货
        if (IMEI!='') {
            query = {IMEI:IMEI,testStatus:{$in:['60','61']}}
        } else {
            query = {testStatus:{$in:['60','61']}}
        }
        break;
        case 'bf':  //报废
            if (IMEI!='') {
                query = {IMEI:IMEI,testStatus:{$in:['71']}}
            } else {
                query = {testStatus:{$in:['71']}}
            }
            break;

    break;
    }   
   // console.log(query)
    InventoryModel.getInventory(query)
        .then(function(inventoryArr) {
            var result = {}                 
                result.rows = inventoryArr
                res.json(result)           
        }) 
        .catch(next)   
})

// 跟单
router.get('/gd', isNotLogin,checkPower, function (req, res, next) {
    res.render('gd',{title:'跟单'})
})

// 售后处理
router.get('/sh', isNotLogin,checkPower, function (req, res, next) {
    res.render('sh',{title:'售后处理'})
})

// 售后申请
router.get('/shsq', isNotLogin,checkPower, function (req, res, next) {
    res.render('shsq',{title:'售后申请'})
})

// 售后发货
router.get('/shfh', isNotLogin,checkPower, function (req, res, next) {
    res.render('shfh',{title:'售后发货'})
})

// 售后检测
router.get('/shjc', isNotLogin,checkPower, function (req, res, next) {
    res.render('shjc',{title:'售后检测'})
})

// 出库
router.get('/ck', isNotLogin,checkPower, function (req, res, next) {
    res.render('ck',{title:'出库'})
})

// 历史纪录
router.get('/ls', isNotLogin, function (req, res, next) {
    res.render('ls',{title:'历史纪录'})
})

// 库存
router.get('/kc', isNotLogin, function (req, res, next) {
    res.render('kc',{title:'库存'})
})

router.post('/ls/query', function (req, res, next) {
    const IMEI = req.fields.IMEI
    HistoryModel.queryHistoryInfo(IMEI)
        .then(function (HistoryInfo) {
            res.status(200).json({result: true, data: HistoryInfo})
        })


})
router.get('/a', isNotLogin, function (req, res, next) {
    res.render('a',{title:'装机A'})
})

router.get('/b', isNotLogin, function (req, res, next) {
    res.render('b',{title:'装机B'})
})

router.get('/c', isNotLogin, function (req, res, next) {
    res.render('c',{title:'装机C'})
})

router.get('/admin', isNotLogin, function (req, res, next) {
    res.render('admin',{title:'账号管理'})
})

router.get('/wx', isNotLogin, function (req, res, next) {
    res.render('wx',{title:'维修'})
})

// 查询所有账号
router.post('/admin/query', isNotLogin, function (req, res, next) {
    UserModel.getUser()
    .then(function(users) {
        var result = {}             
            result.rows = users
            res.json(result)  
    })
})

router.post('/admin/admin', isNotLogin, function (req, res, next) {
    var data = req.fields;
    var result = {}; 
    switch (data.oper) {
        case 'del': 
            UserModel.deleteUser(data.id)
            .then(function() {                       
                result.result = true;
                result.message = '删除成功！'
                res.json(result)  
            })
        break;
        case 'add':
            try {
                if (!data.name.length) 
                    throw new Error('账号不能为空')
                if (!data.password.length) 
                    throw new Error('密码不能为空')
                if (data.password.length < 6) 
                    throw new Error('密码不能少于6位')
            } 
            catch(e) {
                result.result = false
                result.message = e.message
                return res.json(result)                
            }
            UserModel.getUserByName(data.name) 
            .then(function(user) {   
                try {
                    if (user && user.length != 0) 
                        throw new Error('该账号已存在')
                } 
                catch(e) {
                    result.result = false
                    result.message = e.message
                    return res.json(result)                   
                } 
                delete data.id;
                delete data.oper;
                UserModel.create(data) 
                .then(function () {
                    result = {
                        result:true,
                        message:'创建成功！'
                    }
                    res.json(result)                                                                                                  
                })
                
            })
            

    }
    
    
})
module.exports = router