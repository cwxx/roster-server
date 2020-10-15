const mysql  = require('../tools/mysql')
/**
 *
 */
const rosterModel = {
    /**
     * @param queryParams
     * @returns {[]}
     */
    async getList(queryParams) {
        return mysql('roster')
            .where({
                department_id: queryParams.department_id,
                organization_id: queryParams.organization_id,
            })
            .where('user_id', 'like',`%${queryParams.id}%`)
            .having('roster_time', '>', queryParams.rosterTime)
            .orderBy('roster_time', 'desc')
            .select('id','title','status','user_id','department_id','roster_time')
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
    async querySchedule(application_id, application_time) {
        return mysql('change_shifts')
            .where({application_id: application_id})
            .having('application_time', '>', application_time)
            .select('id','application_time','status','roster_id','applicationType','update_time','create_time','handlerTime','handlerUser')
    }
}
module.exports = rosterModel
