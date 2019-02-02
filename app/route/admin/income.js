const routePermission = require('./../../../middleware/routePermissionAdmin.js');
const Router = require('koa-router');
const incomes = require('./../../controller/admin/income.js');

module.exports = function () {
    let router = new Router();
    /**
     * 删除收入实例
     */
    router.delete('/api/plat/v1/incomes/:id', routePermission('incomes'), incomes.delete);
    
    /**
     * 通过记录时间获取实例信息
     */
    router.get('/api/plat/v1/incomes/getByTime/:recordTime', routePermission('incomes'), incomes.findAllByTime); 

    /**
     * 通过时间查询去重后某一天的一条记录
     */
    router.get('/api/plat/v1/incomes/getDistinctTime/:recordTime', routePermission('incomes'), incomes.getDistinctTime);

    /**
     * 获取所有的去重记录
     */
    router.get('/api/plat/v1/incomes/getAllDistinctTime', routePermission('incomes'), incomes.getAllDistinctTime);

    /**
     * 获取收入列表
     */
    router.get('/api/plat/v1/incomes', routePermission('incomes'), incomes.list);


    /**
     * 导入收入支出的excel的数据
     */
    router.post('/api/plat/v1/incomes/file/uploading',  incomes.upload)

    /**
     * 批量新增收入实例
     */
    router.post('/api/plat/v1/incomes/batchAdd', routePermission('incomes'), incomes.batchAdd);

    /**
     * 批量更新收入实例
     */
    router.put('/api/plat/v1/incomes/updateBatch/:record_time', routePermission('incomes'), incomes.updateBatch);

    /**
     * 删除同一时间所有的记录
     */
    router.delete('/api/plat/v1/incomes/deleteSameRecordTime/:record_time', routePermission('incomes'), incomes.deleteSameRecordTime);

    return router;
};