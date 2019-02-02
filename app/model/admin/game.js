const db = require('./../../../library/db.js');
const table = 't_bi_game_record';

module.exports = {
    /**
     * 游戏列表查询
     */
    findList: async function (pageNumber, perPage) {
        let res = await db.readMysql.select(
            'name',
            'app_key'
        ).from(table)
         .orderBy('update_time', 'desc');
        return res;
    },
     
    /**
     * 根据appKey 来查找对应的gameName
     */
    findByAppKey: async function(appKey){
        let res = await db.readMysql.select(
            'name'
        ).from(table)
         .where('app_key' , appKey)
         .first();
         return res;
    }
};
