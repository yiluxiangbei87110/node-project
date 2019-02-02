const response = require('./../../../util/response.js');
const logger = require('./../../../util/logger.js');
const ApiError = require('./../../../library/apiError.js');
const AdminService = require('./../../service/admin/admin.js');
const validator = require('./../../../util/requestValidator.js');
const Joi = require('joi');
const AdminValidation = require('../../validation/admin/admin');

module.exports = {

    /**
     * @api {post} /api/plat/v1/admins
     * @apiName 添加权限用户实例
     * @apiPermission private
     * @apiDescription 添加权限用户实例, 并返回实例id
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} username 用户名
     * @apiParam {String} password  密码
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"id":1},"msg":"请求成功"}
     * 
     * @apiSuccess {Number} id 权限用户实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    add: async function (ctx, next) {
        await validator.validate(ctx.input, AdminValidation.add.schema, AdminValidation.add.options);
        let id = await AdminService.add(ctx.input);
        return response.map(ctx, { id: id });
    },

    /**
     * @api {delete} /api/plat/v1/admins/:id
     * @apiName 删除权限用户
     * @apiPermission private
     * @apiDescription 删除权限用户
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id 记录id
     *
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {"success": true}, "msg": "请求成功"}
     */
    delete: async function (ctx, next) {
        let res = await AdminService.delete(ctx.params.id);
        return response.map(ctx, { success: res });
    },

    /**
     * @api {get} /api/admins/v1/admins
     * @apiName 获取权限用户实例列表
     * @apiPermission private
     * @apiDescription 获取权限用户实例列表, 并返回列表信息
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {Number} pageNumber 页码数 默认1
     * @apiParam {Number} perPage  每页显示页码数 默认10
     * 
     * @apiSuccessExample {json} Success-Response:
     *{"err": 0,"data": {"list": {"perPage": 10,"pageNumber": 1,"total": 18,"list": [{"id": 64,"password": "Felix","username": "node"},{"id": 63,"password": "getAdminList","username": "getAdminList"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    list: async function (ctx, next) {
        let perPage = ctx.input.perPage || 10;
        let pageNumber = ctx.input.pageNumber || 1;
        let list = await AdminService.list(pageNumber, perPage);
        return response.list(ctx, list);
    },

    /**
     * @api {post} /api/plat/v1/admins
     * @apiName 添加权限用户实例
     * @apiPermission private
     * @apiDescription 添加权限用户实例, 并返回实例id
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} username 用户名
     * @apiParam {String} password  密码
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"id":1},"msg":"请求成功"}
     * 
     * @apiSuccess {Number} id 权限用户实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    add: async function (ctx, next) {
        await validator.validate(ctx.input, AdminValidation.add.schema, AdminValidation.add.options);
        let id = await AdminService.add(ctx.input);
        return response.map(ctx, { id: id });
    },

    /**
     * @api {post} /api/plat/v1/admins/login
     * @apiName 登录
     * @apiPermission private
     * @apiDescription 登录并返回信息
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} username 用户名
     * @apiParam {String} password  密码
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"success": true,"sessionId": "0acf98a0-a05d-11e8-9fe4-8355be867b75"},"msg":"请求成功"}
     *  
     * @apiSuccess {Number} id 权限用户实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    login: async function (ctx, next) {
        await validator.validate(ctx.input, AdminValidation.add.schema, AdminValidation.add.options);
        let res = await AdminService.login(ctx.input);
        return response.map(ctx,res);
    },
};