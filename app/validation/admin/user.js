const Joi = require('joi');
module.exports = {
    add: {
        schema: Joi.object({
            telephone: Joi.string().regex(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/).required().trim().error(new Error('用户名不能为空')),
            username: Joi.string().min(6).max(8).regex(/^[0-9a-zA-Z]*$/g).required().trim().error(new Error('用户名不能为空，且只能是数字和字母组成的6-8位字符组成。'))
        }).with('telephone', 'username'),
        options: {
            //允许存在不在 schema 中的字段
            allowUnknown: true,
            //过滤不存在 schema 中的字段
            stripUnknown: true
        }
    }
};


