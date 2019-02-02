/**
 * errorName: {code, message, status}
 * 错误名: {错误码, 错误信息, http状态码}
 */
const defines = {
    
    'common.all': {code: 1000, message: '%s', status: 500},
    'access.forbidden': {code: 1001, message: '没有操作权限', status: 403},
    'auth.notPermission': {code: 1002, message: '授权失败 %s', status: 403},
    'role.notExist': {code: 1003, message: '角色不存在', status: 403},
    'request.paramError': {code: 1004, message: '参数错误 %s', status: 200},
    'sessionId.notnull': {code: 1005, message: 'sessionId 不能为空', status: 403},
    'sessionId.notExist': {code: 1006, message: 'sessionId 已失效,请重新登录', status: 403},

    'db.queryError': { code: 1100, message: '数据库查询异常', status: 500 },
    'db.insertError': { code: 1101, message: '数据库写入异常', status: 500 },
    'db.updateError': { code: 1102, message: '数据库更新异常', status: 500 },
    'db.deleteError': { code: 1103, message: '数据库删除异常', status: 500 },

    'redis.setError': { code: 1104, message: 'redis设置异常', status: 500 },

    'bi.loginError': {code: 1200, message: '登录超时', status: 403},
    'bi.fileForamtError': { code: 1201, message: '请上传excel文件', status: 403 },
    'bi.fieSizeError': { code: 1202, message: '文件太太', status: 403 },
    'bi.fileEmptyError': { code: 1203, message: '文件内容为空', status: 403 },
    'bi.ExcelSheetError': { code: 1204, message: 'excel sheets数量或sheetName出错', status: 403 },
    'bi.loginError': { code: 1205, message: '用户名和密码不匹配', status: 403 }
};

module.exports = function (errorName, params) {
    if(defines[errorName]) {
        let result = {
            code: defines[errorName].code,
            message: defines[errorName].message,
            status: defines[errorName].status
        };

        params.forEach(element => {
            result.message = (result.message).replace('%s', element);
        });

        return result;
    }
    
    return {
        code: 1000,
        message: '服务器内部错误',
        status: 500
    };
}