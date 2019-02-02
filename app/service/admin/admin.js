const AdminModel = require('./../../model/admin/admin.js');
const db = require('./../../../library/db.js');
const ApiError = require('./../../../library/apiError.js');
const uuid = require('node-uuid');

module.exports = {
    /**
     * 添加权限用户实例
     * @author Felix
     * @description 分页查询实例列表
     * @param username 用户名
     * @param password 密码
     * @param create_time 创建时间
     * @param update_time 更新时间
     * @param status 是否显示 1显示 0不显示
     * @returns id 实例id
     */
    add: async function (data) {
        let id = await AdminModel.add({
            username: data.username,
            password: data.password,
            create_time: Date.now(),
            update_time: Date.now(),
            status: 1
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
    list: async function (pageNumber, perPage, optional = {}) {
        let total = await AdminModel.count();
        let list = await AdminModel.findList(pageNumber, perPage);
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
        let res = await AdminModel.update(id, { status: 0 });
        return res;
    },

    /**
     * 登录
     * @author Felix
     * @description 登录
     * @param data[username] 用户名
     * @param data[pasword]  密码
     * @returns Bool 是否删除成功
     */
    login: async function (data) {
        let username=data.username
        let password=data.password
        let res = await AdminModel.login(username,password);
        if(!res){
            return { success: false,msg:'用户名密码不匹配' };
        }else{
            let sessionId = uuid.v1();
            let cacheKey = `ADMIN:${sessionId}`;
            await db.redis.set(cacheKey, JSON.stringify(sessionId), 'EX', 12*60*60);
            return { success: true, sessionId: sessionId};
        }
    }
};

