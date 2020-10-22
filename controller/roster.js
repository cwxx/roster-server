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
        console.log({ department_id, organization_id })
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
     * 查询该值班项在调班申请表中是否已存在
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getExistOne(ctx, next) {
        const {roster_id} = ctx.request.query
        debug(roster_id)
        try {
            const result = await rosterService.selectOne(roster_id)
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
            const {
                applicationId,
                applicationTargert_id,
                roster_id,
                applicationRosterType,
                applicationTargertRosterType,
                applicationTime,
                applicationTargert_time,
                applicationType,
                departmentId
            } = ctx.request.body;
            await rosterService.add({
                applicationId,
                applicationTargert_id,
                roster_id,
                applicationRosterType,
                applicationTargertRosterType,
                applicationTime,
                applicationTargert_time,
                applicationType,
                departmentId,
            })
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
     * 获取调班申请的进度信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getSchedule(ctx,next) {
        const { application_id } = ctx.request.query;
        const result = await rosterService.rosterSchedule(application_id)
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
