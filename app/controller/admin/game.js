const response = require('./../../../util/response.js');
const logger = require('./../../../util/logger.js');
const ApiError = require('./../../../library/apiError.js');
const GameService = require('./../../service/admin/game.js');
const validator = require('./../../../util/requestValidator.js');
module.exports = {

    /**
     * @api {get} /api/admins/v1/admins
     * @apiName 获取游戏列表
     * @apiPermission private
     * @apiDescription 获取游戏列表, 并返回列表信息
     * @apiGroup platfrom
     * @apiVersion 1.0.0
     * 
     * @apiHeader {String} token 用户token
     * 
     * @apiSuccessExample {json} Success-Response:
     *{"err": 0,"data": {"list": { [ {"name": "一起翻翻乐","app_key": "ec57da50-5754-11e8-983c-6b4bcc3b7c2e"}]}
     * 
     * @apiErrorExample {json} Error-Response:
     * {"err":1001,"data":{},"msg":"没有操作权限"}
     */
    list: async function (ctx, next) {
        let list = await GameService.list();
        return response.list(ctx, list);
    }
};