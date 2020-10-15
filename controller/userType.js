
const mysql = require('../tools/mysql')
const utils = require('../tools/utils')

module.exports = async ( ctx ) => {
    try{
        const userType = await mysql('user_type').select('id','parent_id','dict_value','code')
        const userTypeTree = await utils.translateToTree(userType)
        ctx.body = {
            code: 200,
            data: userTypeTree,
            message: 'success'
        }
    } catch (e) {
        debug(e)
        ctx.body = {
            code: -1,
            data: {},
            message: e.sqlMessage
        }
    }
}
