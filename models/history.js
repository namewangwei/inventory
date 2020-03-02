const HistoryInfo = require('../lib/mongo').HistoryInfo

module.exports = {
    // 添加一个历史信息
    createHistoryInfo: function createHistoryInfo (historyInfo) {
        return HistoryInfo.insert(historyInfo)        
        .exec()
    },

    queryHistoryInfo: function queryHistoryInfo(IMEI) {
        return HistoryInfo
        .findOne({IMEI: IMEI})       
        .exec()
    },

     // 通过IMEI更新库存信息
     updateHistoryInfoByIMEI: function updateHistoryInfoByIMEI (IMEI, data) {
        return HistoryInfo
        .update({ IMEI: IMEI }, {$push: {historyarr: data}}, {upsert: false, multi: true})
        .exec()
    }  
} 
