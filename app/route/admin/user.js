const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const users = require('./../../controller/admin/user.js');

module.exports = function () {
    let router = new Router();
    
    /**
     * 创建白名单实例
     */
    router.post('/api/plat/v1/users', routePermission('users'), users.add);

    /**
     * 删除白名单实例
     */
    router.delete('/api/plat/v1/users/:id', routePermission('users'), users.delete);
    
    /**
     * 获取白名单列表
     */
    router.get('/api/plat/v1/users', routePermission('users'), users.list);

    return router;
};