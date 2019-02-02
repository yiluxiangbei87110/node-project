const response = require('./../../../util/response.js');
const logger = require('./../../../util/logger.js');
const ApiError = require('./../../../library/apiError.js');
const UserService = require('./../../service/admin/user.js');
const validator = require('./../../../util/requestValidator.js');
const Joi = require('joi');
const UserValidation = require('../../validation/admin/user');

module.exports = {

    /**
     * @api {post} /api/plat/v1/users
     * @apiName 添加白名单用户实例
     * @apiPermission private
     * @apiDescription 添加白名单用户实例, 并返回实例id
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiParam {String} telephone 手机号
     * @apiParam {string} username  用户名
     * 
     * @apiSuccessExample {json} Success-Response:
     * {"err":0,"data":{"id":1},"msg":"请求成功"}
     * 
     * @apiSuccess {Number} id 白名单用户实例的id
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    add: async function (ctx, next) {
        await validator.validate(ctx.input, UserValidation.add.schema, UserValidation.add.options);
        let id = await UserService.add(ctx.input);
        return response.map(ctx, { id: id });
    },


     /**
     * @api {delete} /api/plat/v1/users/:id
     * @apiName 删除白名单用户
     * @apiPermission private
     * @apiDescription 删除白名单用户
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id 记录id
     *
     * @apiSuccessExample {json} Success-Response:
     * {"err": 0,"data": {"success": true}, "msg": "请求成功"}
     */
    delete: async function (ctx, next) {
        let res = await UserService.delete(ctx.params.id);
        return response.map(ctx, { success: res });
    },

    /**
     * @api {get} /api/plat/v1/users
     * @apiName 获取白名单用户实例列表
     * @apiPermission private
     * @apiDescription 获取白名单用户实例列表, 并返回列表信息
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
        let list = await UserService.list(pageNumber, perPage);
        return response.list(ctx, list);
    }
};