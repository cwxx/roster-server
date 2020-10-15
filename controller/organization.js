
const mysql = require('../tools/mysql')

module.exports = async ( ctx ) => {

    try{
        const organization = await mysql('organization').select('id','organization')
        ctx.body = {
            code: 200,
            data: organization,
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
