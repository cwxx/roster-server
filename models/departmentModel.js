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
     * 查询当前部门的父id
     * @returns {parent_id}
     */
    async getParent(organizationId,id) {
        return mysql('department')
            .where({organization_id:organizationId, id: id})
            .select('parent_id')
    }
}
module.exports = department
