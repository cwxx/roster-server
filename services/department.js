const departmentModel = require('../models/departmentModel')
const utils = require('../tools/utils')


const departmentService = {
    /**
     * 查询所有部门,以树结构返回
     * @param organizationId
     * @returns {Promise<*[]>}
     */
    async getList(organizationId) {
        const departmentList = await departmentModel.getList(organizationId);
        return utils.translateToTree(departmentList)
    },
    /**
     *
     * @param organizationId
     * @param id
     * @returns {parentId}
     */
    async getParentId(organizationId, id) {
        return departmentModel.getParent(organizationId, id)
    }
}
module.exports = departmentService;
