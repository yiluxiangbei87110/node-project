const OutcomeModel = require('./../../model/admin/outcome.js');
const gameModel = require('./../../model/admin/game.js');
const db = require('./../../../library/db.js');

module.exports = {

    /**
     * 查询列表
     * @author Felix
     * @description 分页查询实例列表
     * @param pageNumber 页码
     * @param perPage 每页数量
     * @param optional 扩展参数
     * @returns Array 列表结果
     */
    list: async function (pageNumber, perPage, optional = {}) {
        let total = await OutcomeModel.count();
        let list = await OutcomeModel.findList(pageNumber, perPage);
        return { 'perPage': perPage, 'pageNumber': pageNumber, 'total': total.total, 'list': list };
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    delete: async function (id) {
        let res = await OutcomeModel.update(id, { status: 0 });
        return res;
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    deleteSameRecordTime: async function (record_time) {
        record_time = new Date(record_time).getTime();
        let res = await OutcomeModel.updateSameRecordTime(record_time, { status: 0 });
        return res;
    },

    /**
     * 查找支出实例
     * @author Felix
     * @description 根据实例记录时间查找实例信息 如 2018-09-09
     * @param time 查询time
     * @returns 实例
     * 
     */
    findAllByTime: async function (time) {
        let res = await OutcomeModel.findAllByTime(time);
        for(let resKey of res ){
            let game = await gameModel.findByAppKey(resKey.app_key) || `app_key :${resKey.app_key}`;
            resKey.name = game.name || `resKey.app_key :${resKey.app_key}`;
        }
        return res;
    },

    /**
     * 查询去重的所有列表
     * @author Felix
     * @description 分页查询实例列表
     * @param pageNumber 页码
     * @param perPage 每页数量
     * @param optional 扩展参数
     * @returns Array 列表结果
     */
    getAllDistinctTime: async function (pageNumber, perPage, optional = {}) {
        let total = await OutcomeModel.count();
        let list = await OutcomeModel.getAllDistinctTime(pageNumber, perPage);
        return { 'perPage': perPage, 'pageNumber': pageNumber, 'total': total.total, 'list': list }
    },

    /**
     * 查找去重的记录列表
    * @author Felix
    * @description 根据实例记录时间查找实例信息 如 2018-09-09
    * @param time 查询time
    * @returns 实例
    * 
    */
    getDistinctTime: async function (time) {
        let res = await OutcomeModel.getDistinctTime(time);
        return res;
    },

    /**
     * 批量更新实例
     * @author Felix
     * @description 根据实例记录时间来批量更新数据
     * @param record_time 记录时间
     * @returns Boolean
     * 
     */
    /**
     * 批量更新实例
     * @author Felix
     * @description 根据实例记录时间来批量更新数据
     * @param record_time 记录时间
     * @param data  data 数据对象
     * @returns Boolean
     * 
     */
    updateBatch: async function (record_time, data) {
        for (let key of data) {
            if (!key.create_time) {
                key.create_time = new Date().getTime();
            } else {
                key.create_time = new Date(key.create_time).getTime();
            }
            if (!key.status && key.status != 0) {
                key.status = 1;
            }
            key.update_time = new Date().getTime();
            key.record_time = new Date(record_time).getTime();
            if (key.name) {
                delete key.name;
            }
        }
        let addArr = [];
        let updateArr = [];
        let addArrRes = [];
        let updateArrRes = [];
        if (data.length) {
            data.forEach(item => {
                if (!item.id) {
                    addArr.push(item)
                } else {
                    updateArr.push(item)
                }
            })
        }
        if (updateArr.length) {
            updateArrRes = await OutcomeModel.batchUpdate(updateArr);
        }
        if (addArr.length) {
            addArrRes = await OutcomeModel.batchAdd(addArr);
        }
        return updateArrRes;

    },

    /**
     * 批量增加实例
     * @author Felix
     * @description 根据实例记录时间来批量更新数据
     * @param rows 数据对象
     * @returns id 实例id
     * 
     */
    batchAdd: async function (rows) {
        let result = []
        if (rows.length) {
            for (let i = 0; i < rows.length; i++) {
                result.push({
                    "record_time": new Date(rows[i].record_time).getTime(),
                    "app_key": rows[i].app_key,
                    "type": rows[i].type*1,
                    "money": rows[i].money*1,
                    "create_time": Date.now(),
                    "update_time": Date.now(),
                    "status": 1
                })
            }
            let res = await OutcomeModel.batchAdd(result);
            return res;
        }
    },
};