const mysql  = require('../tools/mysql')
/**
 *
 */
const rosterModel = {
    /**
     * 获取个人startTime-endTime 排班
     * @param queryParams
     * @returns {[]}
     */
    async getList(queryParams) {
        return mysql('roster')
            .where({
                department_id: queryParams.department_id,
                organization_id: queryParams.organization_id,
            })
            .where('roster_time', '>=',queryParams.startTime)
            .where('roster_time', '<',queryParams.endTime)
            .whereIn('user_id', [parseInt(queryParams.id)])
            .orderBy('roster_time', 'desc')
            .select('id','title','status','user_id','department_id','roster_time')
    },
    /**
     * 查询本部门startTime-endTime时间内排班
     * @param queryParams
     * @returns {[]}
     */
    async getDeptRoster(queryParams) {
        return mysql('roster')
            .where({
                department_id: queryParams.department_id,
                organization_id: queryParams.organization_id,
            })
            .where('roster_time', '>=',queryParams.startTime)
            .where('roster_time', '<',queryParams.endTime)
            .orderBy('roster_time', 'desc')
            .select('id','title','status','user_id', 'roster_time')
    },
    async getDetail(id) {
        return mysql('roster').where({id: id})
    },
    async selectOne(rosterId) {
        return mysql('change_shifts').where({roster_id: rosterId})
    },
    async insert(application) {
        return mysql('change_shifts').insert(application)
    },
    async querySchedule(application_id, startTime, endTime) {
        return mysql('change_shifts')
            .where({application_id: application_id})
            .where('create_time', '>=', startTime)
            .where('create_time', '<', endTime)
            .orderBy('create_time', 'desc')
            .select('id','application_time','status','roster_id','applicationType','update_time','create_time','handlerTime','handlerUser')
    }
}
module.exports = rosterModel
