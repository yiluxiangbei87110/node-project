const db = require('./../../../library/db.js');
const table = 't_bi_outcome_record';
const ApiError = require('./../../../library/apiError.js');

module.exports = {
    /**
     * 更新测试实例
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
     * 更新相同时间数据的支出实例
     */
    updateSameRecordTime: async function (record_time, data) {
        let res = await db.writeMysql.where({
            'record_time': record_time
        })
            .update(data)
            .from(table);
        return res >= 1;
    },
    
    /**
     * 查询支出列表
     */
    findList: async function (pageNumber, perPage) {
        let res = await db.readMysql.select(
            'id',
            'app_key',
            'money',
            'create_time',
            'update_time',
            'type',
            'record_time',
            'status',
            'ext',
            // 'gameName'
        ).from(table)
            .where({
                'status': 1
            }).orderBy('create_time', 'desc')
            .limit(perPage)
            .offset(perPage * (pageNumber - 1));
        return res;
    },

    /**
     * 查询所有记录条数
     */
    count: async function () {
        let res = await db.readMysql.count('id as total').from(table).where({
            'status': 1
        }).orderBy('record_time', 'desc');
        return res;
    },

    /**
     * 查询某一时间的记录
     */
    findAllByTime: async function (recordTime) {
        recordTime = new Date(recordTime).getTime();
        let res = await db.readMysql.select(
            'id',
            'app_key',
            'money',
            'create_time',
            'update_time',
            'type',
            'record_time',
            'status',
            'ext',
            // 'gameName'
        ).from(table)
            .where({
                'record_time': recordTime,
                'status': 1
            }).orderBy('record_time', 'desc');
        return res;
    },

    /**
     * 查询时间去重记录
     */
    getDistinctTime: async function (recordTime) {
        recordTime = new Date(recordTime).getTime();
        res = await db.readMysql
            .distinct('record_time')
            .select('record_time')
            .from(table)
            .where({
                'record_time': recordTime,
                'status': 1
            });
    return res;
    },

    /**
     * 查询所有的去重记录
     */
    getAllDistinctTime: async function (pageNumber, perPage) {
        let res = await db.readMysql
            .distinct('record_time')
            .select('record_time')
            .from(table)
            .where({
                'status': 1
            }).orderBy('record_time', 'desc')
            .limit(perPage)
            .offset(perPage * (pageNumber - 1));
        return res;
    },

    /**
     * 查询记录总条数
     */
    count: async function () {
        let res = await db.readMysql
            .select('record_time')
            .countDistinct('record_time as total')
            .from(table)
            .where({
                'status': 1
            })
            .first();
        return res;
    },

    /**
     * 批量更新支出的记录
    */
    batchUpdate: async function (data) {
        let values = '';
        let sql = '';
        for (let key of data) {
            sql = `update t_bi_outcome_record a set a.money = ${key.money}, a.type = ${key.type}, a.status = ${key.status} where a.id = ${key.id};`;
            await db.readMysql.raw(sql);
        }
    },

    /**
     * 批量插入
     */
    batchAdd: async function (data) {
        try {
            let res = await db.writeMysql.batchInsert('t_bi_outcome_record', data, chunkSize = 30).returning('id')
            return res[0]
        } catch (err) {
            throw new ApiError('db.insertError');
        }

    }
};


