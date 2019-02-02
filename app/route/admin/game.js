const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const games = require('./../../controller/admin/game.js');

module.exports = function () {
    let router = new Router();

    /**
     * 获取游戏列表
     */
    router.get('/api/plat/v1/games', routePermission('games'), games.list);

    return router;
};