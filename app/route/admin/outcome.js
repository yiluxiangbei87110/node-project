const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const outcomes = require('./../../controller/admin/outcome.js');

module.exports = function () {
    let router = new Router();
    
    /**
     * 删除支出实例
     */
    router.delete('/api/plat/v1/outcomes/:id', routePermission('outcomes'), outcomes.delete);
  
    /**
     * 通过记录时间获取实例信息
     */
    router.get('/api/plat/v1/outcomes/getByTime/:recordTime', routePermission('outcomes'), outcomes.findAllByTime);

    /**
     *  通过时间查询去重后某一天的一条记录
     */
    router.get('/api/plat/v1/outcomes/getDistinctTime/:recordTime', routePermission('outcomes'), outcomes.getDistinctTime);

    /**
     * 获取所有的去重记录
     */
    router.get('/api/plat/v1/outcomes/getAllDistinctTime', routePermission('outcomes'), outcomes.getAllDistinctTime);

    /**
     * 获取支出列表
     */
    router.get('/api/plat/v1/outcomes', routePermission('outcomes'), outcomes.list);

    /**
     * 批量新增
     */
    router.post('/api/plat/v1/outcomes/batchAdd', routePermission('outcomes'), outcomes.batchAdd);
    
    /**
     * 批量更新
     */
    router.put('/api/plat/v1/outcomes/updateBatch/:record_time', routePermission('outcomes'), outcomes.updateBatch);

    /**
     * 删除同一时间所有的记录
     */
    router.delete('/api/plat/v1/outcomes/deleteSameRecordTime/:record_time', routePermission('outcomes'), outcomes.deleteSameRecordTime);

    return router;
};