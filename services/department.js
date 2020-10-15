const department = require('../models/departmentModel')
const utils = require('../tools/utils')
const debug = require('debug')('depart')

const departmentService = {
    /**
     * 查询所有部门,以树结构返回
     * @param organizationId
     * @returns {Promise<*[]>}
     */
    async getList(organizationId) {
        const departmentList = await department.getList(organizationId);
        return utils.translateToTree(departmentList)
    }
}
module.exports = departmentService;
