const invitationService = require('../services/invitationService')

const debug = require('debug')('rosterInvitation')
const rosterInvitation = {
    /**
     * 获取部门的所有调班申请且没有过时的，
     * @param ctx
     */
    async getList (ctx) {
        const {departmentId} = ctx.query;
        try {
            const result = await invitationService.getListById(departmentId);
            ctx.body = {
                code: 200,
                data: result,
                message: result.length !== 0 ? 'success' : '暂无相关条件的调班申请！'
            }

        } catch (e) {
            debug(e)
            ctx.body = {
                code: -1,
                data: e,
                message: 'fail'
            }
        }
    },
    /**
     * 更新调班状态
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateShift(ctx) {
        const {invitation} = ctx.request.body;
        try {
            await invitationService.update(invitation);
            ctx.body = {
                code: 200,
                data: [],
                message: '更新成功'
            }

        } catch (e) {
            debug(e)
            ctx.body = {
                code: -1,
                data: e,
                message: 'fail'
            }
        }
    },
    /**
     * 查询该值班项在调班申请表中是否已存在
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getExistOne(ctx, next) {
        const {roster_id} = ctx.request.query
        debug(roster_id)
        try {
            const result = await invitationService.selectOne(roster_id)
            ctx.body = {
                code: 200,
                data: result,
                message: 'success'
            }
        } catch (e) {
            debug(e)
            ctx.body = {
                code: -1,
                data: e,
                message: 'fail'
            }
        }
    },
    /**
     * 申请调班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async post(ctx, next) {
        try {
            const {invitionInfo} = ctx.request.body;
            await invitationService.add(invitionInfo)
            debug(invitionInfo)
            ctx.body = {
                code: 200,
                data: {},
                message: 'success'
            }

        } catch (e) {
            debug(e)
            ctx.body = {
                code: -1,
                data: e,
                message: 'fail'
            }
        }
    },
    /**
     * 获取个人的所有申请信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getSchedule(ctx,next) {
        const { application_id } = ctx.request.query;
        const result = await invitationService.rosterSchedule(application_id)
        try {
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
    },
    // /**
    //  * 获取本部门未处理的调班申请
    //  * @param {} ctx
    //  * @param {*} next
    //  */
    // async getDepartmentInvite(ctx,next) {
    //     const { application_id } = ctx.request.query;
    //     const result = await invitationService.rosterSchedule(application_id)
    //     try {
    //         ctx.body = {
    //             code: 200,
    //             data: result,
    //             message: 'success'
    //         }
    //
    //     } catch (e) {
    //         ctx.body = {
    //             code: -1,
    //             data: e,
    //             message: 'fail'
    //         }
    //     }
    // },
}

module.exports = rosterInvitation
