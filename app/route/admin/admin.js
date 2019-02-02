const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const admins = require('./../../controller/admin/admin.js');

module.exports = function () {
    let router = new Router();

    /**
     * 创建权限实例
     */
    router.post('/api/plat/v1/admins', routePermission('admins'), admins.add);

    /**
     * 删除权限实例
     */
    router.delete('/api/plat/v1/admins/:id', routePermission('admins'), admins.delete);

    /**
     * 获取权限列表
     */
    router.get('/api/plat/v1/admins', routePermission('admins'), admins.list);

    /**
     * 登录
     */
    router.post('/api/plat/v1/admins/login',  admins.login);

    return router;
};