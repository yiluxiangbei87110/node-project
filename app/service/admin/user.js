const UserModel = require('./../../model/admin/user.js');
const db = require('./../../../library/db.js');


module.exports = {
    /**
     * 添加白名单用户实例
     * @author Felix
     * @description 分页查询实例列表
     * @param username 用户名
     * @param telephone 手机号
     * @param create_time 创建时间
     * @param update_time 更新时间
     * @param status 是否显示 1显示 0不显示
     * @returns id 实例id
     */
    add:async function(data) {
        let id =  await UserModel.add({
            username: data.username || '测试用户名称',
            telephone: data.telephone || '测试用户手机',
            create_time: Date.now(),
            update_time: Date.now(),
            status:1
        });
        return id;
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
    list:async function(pageNumber, perPage, optional = {}) {
            let total = await UserModel.count();
            let list = await UserModel.findList(pageNumber, perPage);
            return { 'perPage': perPage, 'pageNumber': pageNumber, 'total': total.total, 'list': list }
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    delete: async function(id) {
        let res = await UserModel.update(id, {status: 0});
        return res;
    }
};