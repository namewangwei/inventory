const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb, {
  useNewUrlParser: true,
  auto_reconnect: true
})

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss')
    }
    return result
  }
})


// 用户表
exports.User = mongolass.model('User', {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    authorCode: {type: 'string', required: true}
    
  })
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

// 库存表
exports.Inventory = mongolass.model('Inventory', {
  IMEI: {type: 'string', required: true},  // imei
  type: {type: 'string'}, // 机型
  color: {type: 'string'}, // 颜色
  memory: {type: 'string'}, // 内存
  status: {type: 'string',default: '1'}, // 状态  1 入库 2 出库
  amount: {type: 'string', default: ''}, // 仓库
  testStatus: {type: 'string', default: '0'}, // 检测状态 1 未检测 2 检测中 3已检测 4装机中 5检测完毕 6可销售 7已销售
  
  /*
  '1:(入库)库管---检测1;2:检测员(1);3:(已检测1)检测---库管;4:库管(检测1);' + 
                        '5:库管---跟单;6:跟单员(进);7:跟单---装机;8:ABC装机中;'  + 
                        '9:(已装机)ABC---跟单;10:跟单员(出);11:跟单---库管;12:库管(装机);' +
                        '13:(待检测2)库管---检测2;14:检测员(2);15:(已检测2)检测---库管;16:库管(检测2);' +
                        '17:库管确认可销售;18:已销售'
  19. 售后订单(待确认) 20.生成售后订单（检测确认） 21已检测（） 22 
  */

  testtype: {type: 'string',default: ''}, // 检测类型 1 完好 2 故障

  // 配料
  gm: {type: 'string',default: ''}, // 改码  2 无需改  1 改了、
  ping: {type: 'string', default: ''}, // 屏幕  1 更换盖板  2 更换总成
  ke: {type: 'string', default: ''}, // 壳  2 无需换  1 换壳

  remark: {type: 'string', default: ''},  // 备注
  zjr: {type: 'string', default: ''}, // 装机人员

  // 出库信息
  ordercode: {type: 'string', default: ''},  // 订单号 
  trackingcode: {type: 'string', default: ''},  // 快递单号
  ordername: {type: 'string', default: ''},  // 姓名

  // 售后退货单
  shordercode: {type: 'string', default: ''},  // 售后订单号 
  shtrackingcode: {type: 'string', default: ''},  // 客户快递单号
  //reason: {type: 'string', default: ''},  // 退货原因

  // 售后选项
  shoption: {type: 'string', default: ''},

  // 售后检测类型
  shtesttype: {type: 'string', default: ''},

  // 售后信息
  returntype: {type: 'string', default: ''},  // 退货类型  1 完好  2 折旧
  maintaintype: {type: 'string', default: ''},  // 维修类型 1 修好  2 无法修好
  update_at: {type: 'string', default: ''},

  newIMEI:  {type: 'string', default: ''},
  djs:  {type: 'string', default: '72:00:00'},
  mobile: {type:'string', default: ''}
})

exports.Inventory.index({ IMEI: -1 }, { unique: true }).exec()// 根据IMEI 查询，IMEI全局唯一

// 历史信息表
exports.HistoryInfo = mongolass.model('HistoryInfo', {
  IMEI: {type: 'string', required: true},  // imei
  historyarr: {type: Array}  // 历史信息
})
exports.HistoryInfo.index({ IMEI: 1 }).exec()// 根据IMEI 查询，IMEI全局唯一

