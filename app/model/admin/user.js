const db = require('./../../../library/db.js');
const table = 't_bi_white_list_record';

module.exports = {
    /**
     * 添加白名单用户实例
     */
    add:async function (data) {
        let res = await db.writeMysql.returning('id')
                                    .insert(data)
                                    .from(table);
        return res[0];
    },

    /**
     * 更新白名单用户实例
     */
    update:async function (id, data) {
        let res = await db.writeMysql.where({
                                        'id': id
                                    })
                                    .update(data)
                                    .from(table);
        return res >= 1;
    },

    /**
     * 删除白名单用户实例
     */
    delete:async function (id) {

    },

    /**
     * 查找白名单用户实例
     */
    findOne:async function(id) {
        let res = await db.readMysql.select(
                                    'id', 
                                    'telephone', 
                                    'username'
                                ).from(table)
                                .where({
                                    'id': id,
                                    'status': 1
                                }).first();
        return res;
    },

    /**
     * 列表查询
     */
    findList:async function(pageNumber, perPage) {
        let res = await db.readMysql.select(
                                    'id',
                                    'telephone',
                                    'username'
                                ).from(table)
                                .where({
                                    'status': 1
                                }).orderBy('create_time', 'desc')
                                .limit(perPage)
                                .offset(perPage * (pageNumber-1));
        return res;
    },
    count: async function () {
        let res = await db.readMysql.count('id as total').from(table).where({
            'status': 1
        }).first();
        return res;
    }
};