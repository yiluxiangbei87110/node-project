/**
 * 定义一些key或者常量
 * 例如:redis存储key, 常用的不随环境变化的配置
 */

 module.exports = {
     /**
      * 一天过期时间秒数
      */
    ttl_one_day: 86400,











    //===================上面为常量定义，下面为方法封装==================
    /**
     * 构造redis存储key
     * @author finley
     * @description 构造 : 分隔的key
     * @param 字符串作为参数传入，多选参数
     * @returns 返回key
     */
    redisCacheKey: function(...params) {
        let result = '';
        params.forEach(element => {
            result = result + ':' + element;
        });
        return result;
    },

 };