const mysql  = require('../tools/mysql')
/**
 *
 */
const user = {
    /**
     * 创建用户
     * @param userInfo 微信用户信息
     * @returns {Promise<awaited Knex.QueryBuilder<TRecord, number[]>>}
     */
    async create( userInfo ) {
        let result = await mysql('user').insert(userInfo)
        return result;
    },
    /**
     * 更新用户
     * @param userInfo
     * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
     */
    async update( userInfo ) {
        return mysql('user')
            .where('id',userInfo.id)
            .update(userInfo)
    },
    /**
     * 查询是否存在该微信用户
     * @param openId
     * @returns {object}
     */
    async getExistOne( openId ) {
        return mysql('user').where({open_id: openId}).select('id')
    },
    /**
     * 查询该用户的所有信息
     * @param openId
     * @returns {object}
     */
    async getDetail( openId ) {
        return mysql('user').where({open_id: openId})
    }
}
module.exports = user
