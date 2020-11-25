const mysql  = require('../tools/mysql')
/**
 *
 */
const department = {
    /**
     * 查询当前organizationId下所有部门
     * @param organizationId
     * @returns {[]}
     */
    async getList(organizationId) {
        return mysql('department')
            .where('organization_id', organizationId)
            .select('id','department_name','parent_id')

    },
    /**
     * 获取parentId的所有子部门
     * @param organizationId
     * @param parentId
     * @returns {department Array}
     */
    async getChildrenDepart(organizationId, parentId) {
        return mysql('department')
            .where({organization_id:organizationId, parent_id: parentId})
            .select('id','department_name','parent_id')
    }
}
module.exports = department
