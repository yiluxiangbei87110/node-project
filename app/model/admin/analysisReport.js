const db = require('./../../../library/db.js');
const table = 't_bi_analysis_report_record';

module.exports = {
    /**
     * 添加分析记录实例
     */
    add: async function (data) {
        let res = await db.writeMysql.returning('id')
            .insert(data)
            .from(table);
        return res[0];
    },

    /**
     * 更新分析记录实例
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
     * 通过id来查询分析记录
     */
    findOne: async function (id) {
        let res = await db.readMysql.select(
            'id',
            'content',
            'record_time',
            'create_time',
            'update_time',
            'status'
        ).from(table)
            .where({
                'id': id,
                'status': 1
            }).first();
        return res;
    },

    /**
     * 通过时间来查询分析记录
     */
    findAllByTime: async function (recordTime) {
        recordTime = new Date(recordTime).getTime();
        let res = await db.readMysql.select(
            'id',
            'content',
            'record_time',
            'create_time',
            'update_time',
            'status'
        ).from(table)
            .where({
                'record_time': recordTime,
                'status': 1
            }).orderBy('update_time', 'desc');
        return res;
    },

    /**
     * 查询分析记录的所有记录
     */
    findList: async function (pageNumber, perPage) {
        let res = await db.readMysql.select(
            'id',
            'content',
            'create_time',
            'update_time',
            'record_time',
            'status'
        ).from(table)
            .where({
                'status': 1
            }).orderBy('record_time','desc')
            .limit(perPage)
            .offset(perPage * (pageNumber - 1));
        return res;
    },

    /**
     * 查询分析记录的总条数
     */
    count: async function () {
        let res = await db.readMysql.count('id as total').from(table).where({
            'status': 1
        }).first();
        return res;
    }
};