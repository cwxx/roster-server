const userService = require('../services/userinfo')
const debug = require('debug')


const userinfo = {
    /**
     * 更新用户信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async put(ctx, next) {
        try {
            const {id,department_id,role_id,username,phone,usertype,organization_id,chineseinfo} = ctx.request.body;
            const result = await userService.updateUser({id,department_id,role_id,username,phone,usertype,organization_id,chineseinfo})
            ctx.body = {
                code: 200,
                data: result,
                message: 'success'
            }

        } catch (e) {
            ctx.body = {
                code: -1,
                data: e,
                message: 'fail'
            }
        }
    }
    ,
    /**
     * 获取用户信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async get(ctx, next) {
        const { openId } = ctx.query;
        try {
            if(openId) {
                const userInfo = await userService.getUserDetail(openId);
                ctx.body = {
                    code: 200,
                    data: userInfo,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    code: 201,
                    data: {},
                    message: 'openId为空！'
                }
            }
        } catch (e) {
            ctx.body = {
                code: -1,
                data: {},
                message: '获取失败'+ e.sqlMessage
            }
        }
    }
}

module.exports = userinfo;
