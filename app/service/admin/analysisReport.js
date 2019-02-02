const AnalysisReportModel = require('./../../model/admin/analysisReport.js');
const db = require('./../../../library/db.js');


module.exports = {
    /**
     * 添加测试实例
     * @author Felix
     * @description 在数据库中新增一个测试实例并且返回实例id
     * @param Object data 数据对象
     * @param String data.name 名称
     * @param String data.content 内容
     * @returns id 实例id
     */
    add: async function (data) {
        let id = await AnalysisReportModel.add({
            content: data.content || '',
            record_time: new Date(data.record_time).getTime() || '',
            create_time: data.create_time || Date.now(),
            update_time: data.update_time || Date.now(),
            status: 1
        });
        return id;
    },

    /**
     * 查找测试实例
     * @author Felix
     * @description 根据实例id查找实例信息
     * @param id 查询id
     * @returns 测试实例
     * 
     */
    find: async function (id) {
        let res = await AnalysisReportModel.findOne(id);
        return res;
    },
    /**
     * 查找测试实例
     * @author Felix
     * @description 根据实例记录时间查找实例信息 如 2018-09-09
     * @param time 查询time
     * @returns 实例
     * 
     */
    findAllByTime: async function (time) {
        let res = await AnalysisReportModel.findAllByTime(time);
        return res;
    },
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
        let total = await AnalysisReportModel.count();
        let list = await AnalysisReportModel.findList(pageNumber, perPage);
        return { 'perPage': perPage,'pageNumber':pageNumber,'total':total.total, 'list': list };
    },

    /**
     * 更新实例
     * @author Felix
     * @description 更新实例信息
     * @param id 实例id
     * @param Object data 数据对象
     * @param [name] 更新名称
     * @param [conten] 更新标题
     * @returns Bool 是否更新成功
     */
    update: async function (id, data) {
        let res = await AnalysisReportModel.update(id, data);
        return res;
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    delete: async function (id) {
        let res = await AnalysisReportModel.update(id, { status: 0 });
        return res;
    }
};