const departmentService = require('../services/department')

module.exports = async (ctx, next) => {
    const { organizationId } = ctx.query
    // 获取部门信息，以树状结构返回
    try{
        const departmentTree = await departmentService.getList(organizationId);
        ctx.body = {
            code: 200,
            data: departmentTree,
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
