const departmentModel = require('../models/departmentModel')



const departmentService = {
    /**
     * 查询所有部门
     * @param organizationId
     * @returns {Promise<*[]>}
     */
    async getList(organizationId) {
        return departmentModel.getList(organizationId);
    },
    /**
     * 过滤掉所有的一级部门
     * @param {int} organizationId
     */
    async getFilterList(organizationId) {
        const departmentList = await departmentModel.getList(organizationId);
        let filterDept = departmentList.filter( dept => dept.parent_id != 0);
	    return filterDept.map( dept => {
            // 方便微信端的数据展示
            let item = {
                value: dept.id,
                label: dept.department_name
            }
            Object.assign(dept, item);
            return dept
        })
    },
    /**
     *
     * @param organizationId
     * @param parentId
     * @returns {arraY}
     */
    async getDepartByParentId(organizationId, parentId) {
        const childrenDept = await departmentModel.getChildrenDepart(organizationId, parentId);
        return childrenDept.map( dept => {
            // 方便微信端的数据展示
            let item = {
                value: dept.id,
                label: dept.department_name
            }
            Object.assign(dept, item);
            return dept
        })
    }
}
module.exports = departmentService;
