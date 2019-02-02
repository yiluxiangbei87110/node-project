const response = require('./../../../util/response.js');
const logger = require('./../../../util/logger.js');
const ApiError = require('./../../../library/apiError.js');
const IncomeService = require('./../../service/admin/income.js');
const validator = require('./../../../util/requestValidator.js');
const Joi = require('joi');
const IncomeValidation = require('./../../validation/admin/income');


module.exports = {

    /**
     * @api {delete} /api/plat/v1/incomes/:id
     * @apiName 删除收入记录
     * @apiPermission private
     * @apiDescription 删除收入记录
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id 记录id
     *
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {"success": true}, "msg": "请求成功"}
     */
    delete: async function (ctx, next) {
        let res = await IncomeService.delete(ctx.params.id);
        return response.map(ctx, { success: res });
    },

    /**
    * @api {delete} /api/plat/v1/incomes/:record_time
    * @apiName 删除指定时间的所有收入记录
    * @apiPermission private
    * @apiDescription 删除指定时间的所有收入记录
    * @apiGroup platfrom
    * @apiVersion 1.0.0
    *
    * @apiParam {String} record_time 记录时间 record_time
    *
    * @apiSuccessExample {json} Success-Response:
    * {"err": 0,"data": {"success": true}, "msg": "请求成功"}
    */
    deleteSameRecordTime: async function (ctx, next) {
        let res = await IncomeService.deleteSameRecordTime(ctx.params.record_time);
        return response.map(ctx, { success: res });
    },
    
    /**
     * @api {get} /api/plat/v1/incomes
     * @apiName 获取收入实例列表
     * @apiPermission private
     * @apiDescription 获取收入实例列表, 并返回列表信息
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {Number} pageNumber 页码数 默认1
     * @apiParam {Number} perPage  每页显示页码数 默认10
     * 
     * @apiSuccessExample {json} Success-Response:
     *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    list: async function (ctx, next) {
        let perPage = ctx.input.perPage || 10;
        let pageNumber = ctx.input.pageNumber || 1;
        let list = await IncomeService.list(pageNumber, perPage);
        return response.list(ctx, list);
    },

    /**
     * @api {get} /api/plat/v1/incomes
     * @apiName 获取查询记录时间所有的收入实例列表
     * @apiPermission private
     * @apiDescription 获取记录时间所有的收入实例列表, 并返回实
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} record_time 记录时间
     * @apiSuccessExample {json} Success-Response:
     *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    findAllByTime: async function (ctx, next) {
        let res = await IncomeService.findAllByTime(ctx.params.recordTime);
        return response.map(ctx, res);
    },

    /**
    * @api {get} /api/plat/v1/incomes/getDistinctTime
    * @apiName  去重时间，返回列表
    * @apiPermission private
    * @apiDescription  
    * @apiGroup platfrom
    * @apiVersion 1.0.0
    * 
    * @apiHeader {String} token 用户token
    * 
    * @apiParam {String} record_time 记录时间
    * @apiSuccessExample {json} Success-Response:
    *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
    * 
    * @apiErrorExample {json} Error-Response:
    * {"err":1001,"data":{},"msg":"没有操作权限"}
    */
    getDistinctTime: async function (ctx, next) {
        let res = await IncomeService.getDistinctTime(ctx.params.recordTime);
        return response.list(ctx, res);
    },

    /**
    * @api {get} /api/plat/v1/incomes
    * @apiName  所有去重记录
    * @apiPermission private
    * @apiDescription  
    * @apiGroup platfrom
    * @apiVersion 1.0.0
    * 
    * @apiHeader {String} token 用户token
    * 
    * @apiParam {String} record_time 记录时间
    * @apiSuccessExample {json} Success-Response:
    *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
    * 
    * @apiErrorExample {json} Error-Response:
    * {"err":1001,"data":{},"msg":"没有操作权限"}
    */
    getAllDistinctTime: async function (ctx, next) {
        let perPage = ctx.input.perPage || 10;
        let pageNumber = ctx.input.pageNumber || 1;
        let list = await IncomeService.getAllDistinctTime(pageNumber, perPage);
        return response.list(ctx, list);
    },

    /**
     * @api {post} /api/plat/v1/incomes
     * @apiName 批量插入收入实例列表
     * @apiPermission private
     * @apiDescription 批量插入收入实例列表, 并返回实
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} app_key      游戏appkey
     * @apiParam {String} record_time  记录时间
     * @apiParam {Number} money        收入金额
     * @apiParam {Number} type         收入类型（10游戏收入 11广告收入）
     * 
     * @apiSuccessExample {json} Success-Response:
     *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    batchAdd: async function (ctx, next) {
        let res = await IncomeService.batchAdd(ctx.input);
        return response.map(ctx, { id: res });
    },

    /**
     * @api {put} /api/plat/v1/incomes
     * @apiName 批量修改收入实例列表
     * @apiPermission private
     * @apiDescription 批量插入收入实例列表, 并返回信息
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} app_key      游戏appkey
     * @apiParam {String} record_time  记录时间
     * @apiParam {Number} money        收入金额
     * @apiParam {Number} type         收入类型（10游戏收入 11广告收入）
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"telephone": "18898765432","username": "node"},{"id": 63,"telephone": "19876543210","username": "getAdminList"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    updateBatch: async function (ctx, next) {
        let res = await IncomeService.updateBatch(ctx.params.record_time, ctx.input);
        return response.map(ctx, { success: res });
    },


     /**
     * @api {post} /api/plat/v1/incomes
     * @apiName 读取上传的excel文件并写入数据库
     * @apiPermission private
     * @apiDescription 批量插入收入实例列表, 并返回信息
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {'success':true},msg:'请求成功']}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    upload: async function (ctx, next) {
        let res = await IncomeService.upload(ctx.request.files.file);
        return response.map(ctx, { success: res });
    }
};

