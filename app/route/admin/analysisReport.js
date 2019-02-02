const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const analysisReports = require('./../../controller/admin/analysisReport.js');

module.exports = function () {
    let router = new Router();
    /**
     * 创建数据分析实例
     */
    router.post('/api/plat/v1/analysisReports', routePermission('analysisReports'), analysisReports.add);

    /**
     * 删除数据分析实例
     */
    router.delete('/api/plat/v1/analysisReports/:id', routePermission('analysisReports'), analysisReports.delete);

    /**
     * 通过记录时间获取实例信息
     */
    router.get('/api/plat/v1/analysisReports/getByTime/:recordTime', routePermission('analysisReports'), analysisReports.findAllByTime);

    /**
     * 获取数据分析列表
     */
    router.get('/api/plat/v1/analysisReports', routePermission('analysisReports'), analysisReports.list);

    /**
     * 更新数据分析实例
     */
    router.put('/api/plat/v1/analysisReports/:id', routePermission('analysisReports'), analysisReports.update);


    return router;
};