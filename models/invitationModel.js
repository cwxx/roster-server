const mysql  = require('../tools/mysql')

const invitationModel = {
    /**
     * 获取还未处理的
     * @param departmentId
     * @param startTime 当前时间
     * @returns {Promise<Knex.QueryBuilder<TRecord, TResult>>}
     */
    async getList(departmentId,startTime) {
        return mysql('change_shifts')
            .where({department_id: departmentId})
            .where('application_time', '>=', startTime)
            .orderBy('create_time', 'desc')
            .select()
    },
    async updateShift(invitation) {
        return mysql('change_shifts')
            .where({id: invitation.id})
            .update({
                handlerUser: invitation.handlerUser,
                handlerTime: invitation.handlerTime,
                status: invitation.status
            })
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
            .select('id','application_time','status','roster_id',
                'department_id', 'applicationType','update_time',
                'create_time','handlerTime', 'handlerUser','applicationTargert_id')
    }
}
module.exports = invitationModel;
