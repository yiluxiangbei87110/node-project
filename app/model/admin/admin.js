const db = require('./../../../library/db.js');
const table = 't_bi_admin_list_record';

module.exports = {
    /**
     * 添加权限用户实例
     */
    add: async function (data) {
        let res = await db.writeMysql.returning('id')
            .insert(data)
            .from(table);
        return res[0];
    },

    /**
     * 更新权限用户实例
     */
    update: async function (id, data) {
        let res = await db.writeMysql.where({
            'id': id
        })
            .update(data)
            .from(table);
        return res >= 1;
    },

    /**
     * 通过id查询一个实例
     */
    findOne: async function (id) {
        let res = await db.readMysql.select(
            'id',
            'password',
            'username'
        ).from(table)
            .where({
                'id': id,
                 'status': 1
            }).first();
        return res;
    },

    /**
     * 查询权限用户列表
     */
    findList: async function (pageNumber, perPage) {
        let res = await db.readMysql.select(
            'id',
            'password',
            'username'
        ).from(table)
            .where({
                'status': 1
            })
            .orderBy('create_time', 'desc')
            .limit(perPage)
            .offset(perPage * (pageNumber - 1));
        return res;
    },
    /**
     * 查询记录总条数
     */
    count: async function () {
        let res = await db.readMysql.count('id as total').from(table)
        .where({
            'status': 1
        }).first();
        return res;
    },

    /**
     * 通过用户名和密码查询记录
    */
    login: async function (username, password) {
        let res = await db.readMysql.select(
            'id'
        ).from(table)
            .where({
                'username': username,
                'password': password,
                'status': 1
            }).first();
        return res;
    }
};