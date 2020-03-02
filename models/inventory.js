const Inventory = require('../lib/mongo').Inventory

module.exports = {
    // 添加一个库存
    create: function create (inventory) {
        return Inventory.create(inventory)  
        // .addCreatedAt()      
        .exec()
    },
    // 查询IMEI
    queryIMEI: function queryIMEI(IMEI) {
        return Inventory
        .find({IMEI: IMEI})           
        .exec()
    },
    // 通过信息集合获取库存信息
    getInventory: function getInventory (query) {
        return Inventory
        .find(query)
        .sort({_id: -1})    
        // .skip(1)
        // .limit(1)          
        .exec()
    },

     // 通过IMEI更新库存信息
    updateInventoryByIMEI: function updateInventoryByIMEI (IMEI, data) {
        return Inventory
        .update({ IMEI: IMEI }, { $set: data }, {upsert: false, multi: true})       
        .exec()
    },

}