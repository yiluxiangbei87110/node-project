const GameModel = require('./../../model/admin/game.js');
const db = require('./../../../library/db.js');


module.exports = {
    /**
     * 查询游戏列表
     * @author Felix
     * @description 查询游戏列表
     * @param optional 扩展参数
     * @returns Array 列表结果
     */
    list: async function (optional = {}) {
        let list = await GameModel.findList();
        return list;
    }
};