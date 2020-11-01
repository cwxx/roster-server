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
            const { id,department_id,role_id,username,phone,usertype,organization_id,chineseinfo } = ctx.request.body;
            const userInfo = {
                id,
                department_id,
                role_id,
                account: username,
                username,
                phone,
                usertype,
                organization_id,
                chineseinfo
            }
            const result = await userService.updateUser(userInfo)
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
            debug(e)
            ctx.body = {
                code: -1,
                data: {},
                message: '获取失败'+ e.sqlMessage
            }
        }
    },
    /**
     * 根据用户id 获取用户详情
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getUserById(ctx, next) {
        const { user_id } = ctx.request.query;
        try {
            if (user_id) {
                const userInfo = await userService.getUserDetailById(user_id);
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
            debug(e)
            ctx.body = {
                code: -1,
                data: {},
                message: '获取失败'+ e.sqlMessage
            }
        }
    },
    /**
     * 获取当前部门所有用户
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getList(ctx, next) {
        const { departmentId } = ctx.query;
        try {
            if (departmentId) {
                const userInfo = await userService.getUserList(departmentId);
                ctx.body = {
                    code: 200,
                    data: userInfo,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    code: 201,
                    data: {},
                    message: 'departmentId为空！'
                }
            }
        } catch (e) {
            debug(e)
            ctx.body = {
                code: -1,
                data: {},
                message: '获取失败'+ e.sqlMessage
            }
        }
    }
}

module.exports = userinfo;
