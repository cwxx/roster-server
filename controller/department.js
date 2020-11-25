const departmentService = require('../services/department')
const utils = require('../tools/utils')
const debug = require('debug')('department')
const department = {
    /**
     * 获取部门信息，以树状结构返回
     * @param {*} ctx
     * @param {*} next
     */
    async getTree(ctx, next) {
        const { organizationId } = ctx.query

        try{
            const departmentList = await departmentService.getList(organizationId);
            const departmentTree = utils.translateToTree(departmentList)
            ctx.body = {
                code: 200,
                data: departmentTree,
                message: departmentTree ? 'success' : '暂无部门信息'
            }
        } catch (e) {
            ctx.body = {
                code: -1,
                data: {},
                message: e.sqlMessage
            }
        }
    },
    /**
     * 获取部门信息（列表）
     * @param {*} ctx
     * @param {*} next
     */
    async getList(ctx, next) {
        const { organizationId } = ctx.query

        try{
            const departmentList = await departmentService.getFilterList(organizationId);
            ctx.body = {
                code: 200,
                data: departmentList,
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
    },
    /**
     * 获取当前部门下的所有子部门
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getChildDepartment(ctx, next) {
        const { organizationId, parentId } = ctx.query
        try{
            const departmentList = await departmentService.getDepartByParentId(organizationId, parentId);
            ctx.body = {
                code: 200,
                data: departmentList,
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
}

module.exports = department
