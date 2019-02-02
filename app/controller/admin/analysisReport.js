const response = require('./../../../util/response.js');
const logger = require('./../../../util/logger.js');
const ApiError = require('./../../../library/apiError.js');
const analysisReportService = require('./../../service/admin/analysisReport.js');
const validator = require('./../../../util/requestValidator.js');
const Joi = require('joi');
const UserValidation = require('../../validation/admin/analysisReport');

module.exports = {

    /**
     * @api {post} /api/plat/v1/analysisReports
     * @apiName 添加分析记录实例
     * @apiPermission private
     * @apiDescription 添加分析记录实例, 并返回实例id
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} record_time 记录时间（2018-08-04）
     * @apiParam {string} content     记录内容
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"id":1},"msg":"请求成功"}
     * 
     * @apiSuccess {Number} id 分析记录实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    add: async function (ctx, next) {
        await validator.validate(ctx.input, UserValidation.add.schema, UserValidation.add.options);
        let id = await analysisReportService.add(ctx.input);
        return response.map(ctx, { id: id });
    },


    /**
     * @api {put} /api/plat/v1/analysisReports
     * @apiName 添加分析记录实例
     * @apiPermission private
     * @apiDescription 添加分析记录实例, 并返回实例id
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} content      内容
     * @apiParam {string} record_time  记录时间
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"id":1},"msg":"请求成功"}
     * 
     * @apiSuccess {Number} id 分析记录实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    update: async function (ctx, next) {
        let res = await analysisReportService.update(ctx.params.id, { 
            content: ctx.input.content,
            record_time: new Date(ctx.input.record_time).getTime(),
            update_time: Date.now()
        });
        return response.map(ctx, { success: res });
    },


     /**
     * @api {delete} /api/plat/v1/analysisReports/:id
     * @apiName 删除分析记录
     * @apiPermission private
     * @apiDescription 删除分析记录
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id 记录id
     *
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {"success": true}, "msg": "请求成功"}
     */
    delete: async function (ctx, next) {
        let res = await analysisReportService.delete(ctx.params.id);
        return response.map(ctx, { success: res });
    },


     /**
     * @api {get} /api/admins/v1/analysisReports
     * @apiName 获取查询记录时间所有的分析记录实例列表
     * @apiPermission private
     * @apiDescription 获取记录时间所有的分析记录实例列表, 并返回实
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
        let res = await analysisReportService.findAllByTime(ctx.params.recordTime);
        return response.map(ctx, res);
    },

    /**
     * @api {get} /api/admins/v1/analysisReports
     * @apiName 获取分析记录实例列表
     * @apiPermission private
     * @apiDescription 获取分析记录实例列表, 并返回列表信息
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
        let list = await analysisReportService.list(pageNumber, perPage);
        return response.list(ctx, list);
    }
};