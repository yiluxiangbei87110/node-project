const IncomeModel = require('./../../model/admin/income.js');
const gameModel = require('./../../model/admin/game.js');
const ApiError = require('./../../../library/apiError.js');
const db = require('./../../../library/db.js');
const XLSX = require('xlsx');

module.exports = {

    /**
     * 查询列表
     * @author Felix
     * @description 分页查询实例列表
     * @param pageNumber 页码
     * @param perPage 每页数量
     * @param optional 扩展参数
     * @returns Array 列表结果
     */
    list: async function (pageNumber, perPage, optional = {}) {
        let total = await IncomeModel.count();
        let list = await IncomeModel.findList(pageNumber, perPage);
        return { 'perPage': perPage, 'pageNumber': pageNumber, 'total': total.total, 'list': list };
    },

    /**
     * 更新实例
     * @author Felix
     * @description 更新实例信息
     * @param id 实例id
     * @param data 数据对象
     * @param [name] 更新名称
     * @param [money] 更新支出
     * @param String app_key 游戏app_key
     * @param String type 支出类型
     * @param String update_time 更新时间
     * @returns Bool 是否更新成功
     */
    update: async function (id, data) {
        let res = await IncomeModel.update(id, data);
        return res;
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    delete: async function (id) {
        let res = await IncomeModel.update(id, { status: 0 });
        return res;
    },

    /**
     * 删除实例
     * @author Felix
     * @description 删除实例，设置status = 0
     * @param id 实例id
     * @returns Bool 是否删除成功
     */
    deleteSameRecordTime: async function (record_time) {
        record_time = new Date(record_time).getTime();
        let res = await IncomeModel.updateSameRecordTime(record_time, { status: 0 });
        return res;
    },


    /**
     * 查找支出实例
     * @author Felix
     * @description 根据实例记录时间查找实例信息 如 2018-09-09
     * @param time 查询time
     * @returns 实例
     * 
     */
    findAllByTime: async function (time) {
        let res = await IncomeModel.findAllByTime(time);
        for(let resKey of res ){
            let game = await gameModel.findByAppKey(resKey.app_key) || `app_key :${resKey.app_key}`;
            resKey.name = game.name || `resKey.app_key :${resKey.app_key}`;
        }
        return res;
    },

    /**
     * 查找去重的记录列表
     * @author Felix
     * @description 根据实例记录时间查找实例信息 如 2018-09-09
     * @param time 查询time
     * @returns 实例
     * 
     */
    getDistinctTime: async function (time) {
        let res = await IncomeModel.getDistinctTime(time);
        return res;
    },
    
    /**
     * 查找去重的记录列表
     * @author Felix
     * @description 根据实例记录时间查找实例信息 如 2018-09-09
     * @param time 查询time
     * @returns 实例
     * 
     */

    /**
     * 查询去重的所有列表
     * @author Felix
     * @description 分页查询实例列表
     * @param pageNumber 页码
     * @param perPage 每页数量
     * @param optional 扩展参数
     * @returns Array 列表结果
     */
    getAllDistinctTime: async function (pageNumber, perPage, optional = {}) {
        let total = await IncomeModel.count();
        let list = await IncomeModel.getAllDistinctTime(pageNumber, perPage);
        return { 'perPage': perPage, 'pageNumber': pageNumber, 'total': total.total, 'list': list };
    },
    

    /**
     * 批量更新实例
     * @author Felix
     * @description 根据实例记录时间来批量更新数据
     * @param record_time 记录时间
     * @param data  data 数据对象
     * @returns Boolean
     * 
     */
    updateBatch: async function (record_time, data) {
        for (let key of data) {
            if (!key.create_time) {
                key.create_time = new Date().getTime();
            } else {
                key.create_time = new Date(key.create_time).getTime();
            }
            if (!key.status && key.status != 0) {
                key.status = 1;
            }
            key.update_time = new Date().getTime();
            key.record_time = new Date(record_time).getTime();
            if(key.name){
                delete key.name;
            }
        }
        let addArr = [];
        let updateArr = [];
        let addArrRes=[];
        let updateArrRes=[];
        if (data.length) {
            data.forEach(item => {
                if (!item.id) {
                    addArr.push(item)
                } else {
                    updateArr.push(item)
                }
            })
        }
        if (updateArr.length) {
            updateArrRes = await IncomeModel.batchUpdate(updateArr);
        }
        if (addArr.length) {
            addArrRes = await IncomeModel.batchAdd(addArr);
        }
        return updateArrRes;

    },

    /**
     * 批量增加实例
     * @author Felix
     * @description 根据实例记录时间来批量更新数据
     * @param rows 数据对象
     * @returns id 实例id
     * 
     */
    batchAdd: async function (rows) {
        let result = []
        if (rows.length) {
            for (let i = 0; i < rows.length; i++) {
                result.push({
                    "record_time": new Date(rows[i].record_time).getTime(),
                    "app_key": rows[i].app_key,
                    "type": rows[i].type * 1,
                    "money": rows[i].money * 1,
                    "create_time": Date.now(),
                    "update_time": Date.now(),
                    "status": 1
                })
            }
            let res = await IncomeModel.batchAdd(result);
            return res;
        }
    },


    /**
     * 读取上传excel的数据并插入到数据库中
     * @author Felix
     * @description读取上传excel的数据并插入到数据库中
     * @param rows file 文件对象
     * @returns boolean 
     * 
     */
    upload: async function (file) {
        const filename = file.name;
        const fileSize = file.size;
        if (!filename) {
            throw new ApiError('bi.fileForamtError');
        }

        const index1 = filename.lastIndexOf(".");
        const index2 = filename.length;
        if (filename.substring(index1, index2).toLowerCase() !== '.xlsx') {
            throw new ApiError('bi.fileForamtError');
        }
        if ((fileSize / (1024 * 1024)).toFixed(2) > 10) {
            throw new ApiError('bi.fieSizeError');
        }

        const workbook = XLSX.readFile(file.path, { type: 'buffer' });
        const result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            if (roa.length) result[sheetName] = roa;
        });

        if (JSON.stringify(result) === '{}') {
            throw new ApiError('bi.fileEmptyError');
        }
        const rows = await module.exports.readExcelData(result);

        await db.writeMysql.batchInsert('t_bi_income_record', rows.allIncome, chunkSize = 30).returning('id');
        await db.writeMysql.batchInsert('t_bi_outcome_record', rows.allOutcome, chunkSize = 30).returning('id');
        return true;
    },


    /**
     * 处理excel中的五个sheet页
     * @author Felix
     * @description 处理excel中的五个sheet页
     * @param rows file 文件对象
     * @returns Object 含有收入和支出的对象
     * 
     */
    readExcelData: async function (result) {
        const standardSheetNames = ['游戏收入', '广告收入', 'MP消耗', '外采消耗', '群投消耗'];
        let sheetNames = Object.keys(result);
        if (sheetNames.length !== 5) {
            throw new ApiError('bi.ExcelSheetError');
        }
        const validate = standardSheetNames.every(item => {
            return sheetNames.includes(item);
        })
        if (!validate) {
            throw new ApiError('bi.ExcelSheetError');
        }
        Object.keys(result).map(item => {
            if (result[item].length) {
                for (let k = 0; k < result[item].length; k++) {
                    if (result[item][k].length === 0) {
                        result[item].splice(k, result[item].length - 1);
                        break;
                    }
                }
            }
        })
        let gameIncome = result['游戏收入'];
        let gameIncomeRes = module.exports.handIncomeOutComeData(gameIncome);

        let addIncome = result['广告收入'];
        let addIncomeRes = module.exports.handIncomeOutComeData(addIncome);

        let allIncome = [...gameIncomeRes, ...addIncomeRes];

        let MPOutcome = result['MP消耗'];
        let MPOutcomeRes = module.exports.handIncomeOutComeData(MPOutcome);

        let outOutcome = result['外采消耗'];
        let outOutcomeRes = module.exports.handIncomeOutComeData(outOutcome);

        let groupOutcome = result['群投消耗'];
        let groupOutcomeRes = module.exports.handIncomeOutComeData(groupOutcome);

        const allOutcome = [...MPOutcomeRes, ...outOutcomeRes, ...groupOutcomeRes];
        return { allIncome, allOutcome };
    },

    /**
     * 获取对应的收入支出的状态值
     * @author Felix
     * @description 获取对应的收入支出的状态值
     * @param type 收入支出对应的文字
     * @returns Number 收入支出的状态值
     * 
     */
    getIncomeOutComeType: function (type) {
        if (!type) {
            return
        }
        const IncomeOutComeType = new Map(
            [
                ['游戏收入', 10],
                ['广告收入', 11],
                ['游戏', 10],
                ['广告', 11],
                ['MP消耗', 20],
                ['外采消耗', 21],
                ['群投消耗', 22],
                ['MP', 20],
                ['外采', 21],
                ['群投', 22]
            ]
        );
        return IncomeOutComeType.get(type) || 0;
    },

    /**
     * 处理收入和支出的数据，构造table数据格式
     * @author Felix
     * @description 构造table数据格式,方便插入数据库中
     * @param array 收入或支出的数据
     * @returns array 格式化后输入或支出的数据
     * 
     */
    handIncomeOutComeData: function (array) {
        let res = []
        try {
            for (let i = 0; i < array.length; i++) {
                if (i !== 0) {
                    res.push({
                        record_time: new Date(array[i][0]).getTime(),
                        app_key: array[i][2],
                        type: module.exports.getIncomeOutComeType(array[i][3]),
                        money: array[i][4] * 1,
                        create_time: Date.now(),
                        update_time: Date.now(),
                        status: 1,
                        ext: JSON.stringify(array[i])
                    });
                }
            }
        } catch (err) {
           throw err;
        }
        return res;
    }
};