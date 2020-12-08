const rosterService = require('../services/roster')
const debug = require('debug')('roster')
const roster = {
    /**
     * 查询我的今日排班信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async get(ctx, next) {
        const { id, department_id, organization_id } = ctx.request.query;
        console.log({ id, department_id, organization_id })
        try {
            const result = await rosterService.getList({ id, department_id, organization_id })
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
    /**
     * 查询我的本周排班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getWeekMe(ctx, next) {
        const { id, department_id, organization_id } = ctx.request.query;
        console.log({ id, department_id, organization_id })
        try {
            const result = await rosterService.getMeWeekList({ id, department_id, organization_id })
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
    /**
     * 获取本部门所有人今日排班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getToday(ctx, next) {
        const { department_id, organization_id } = ctx.request.query;
        // console.log({ department_id, organization_id })
        try {
            const result = await rosterService.getTodayList(department_id, organization_id)
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
     * 获取特定条件下的排班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getDay(ctx, next) {
        const { departmentId, organization_id,rosterTime } = ctx.request.query;
        // console.log({ department_id, organization_id })
        try {
            const result = await rosterService.getDayList(departmentId, organization_id, rosterTime)
            debug(result)
            ctx.body = {
                code: 200,
                data: result,
                message: result.length !== 0 ? 'success' : '暂无相关条件的排班信息！'
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
     * 获取本部门所有人本周排班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getWeek(ctx, next) {
        const { department_id, organization_id } = ctx.request.query;
        try {
            const result = await rosterService.getWeekList(department_id, organization_id)
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
     * 获取本部门所有人当月排班
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getMonth(ctx, next) {
        const { department_id, organization_id } = ctx.request.query;
        try {
            const result = await rosterService.getMonthList(department_id, organization_id)
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
     * 根据排班id,获取排班详情
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getDetail(ctx, next) {
        const {id} = ctx.request.query
        try {
            const result = await rosterService.getDetail(id)
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
    /**
     * 获取当前部门的用户的可替班列表
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getReplaceRoster(ctx,next) {
        const { departmentId } = ctx.request.query;
        const result = await rosterService.getReplaceList(departmentId)
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
    }

}
module.exports = roster;
