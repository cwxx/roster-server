
const mysql = require('../tools/mysql')
const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    // 获取排班类型信息，以树状结构返回
    try{
        const rosterType = await mysql('roster_type')
            .select('id','roster_value','parent_id')

        const rosterTypeTree = utils.translateToTree(rosterType)

        ctx.body = {
            code: 200,
            data: rosterTypeTree,
            message: 'success'
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            data: {},
            message: e.sqlMessage
        }
    }
}
