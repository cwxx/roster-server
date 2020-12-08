const moment = require('moment')
const mysql = require('../tools/mysql')
const invitationModel = require('../models/invitationModel')
const userModel = require('../models/userModel')
const utils = require('../tools/utils')
const invitationService = {
    userMap: new Map(),
    rosterTypeMap: new Map(),
    async init(departmentId) {
        const users = await userModel.getUsers(departmentId);
        const rosterTypes = await mysql('roster_type').select('id','roster_value');
        this.userMap = utils.ArrayToMap(users);
        this.rosterTypeMap = utils.ArrayToMap(rosterTypes);
    },
    /**
     * 获取到当前部门未过时的调班申请
     * @param departmentId
     * @returns {Promise<*>}
     */
    async getListById(departmentId) {
        await this.init(departmentId);
        let startTime = moment(new Date()).startOf('day').format();
        const initData = await invitationModel.getList(departmentId, startTime);
        return initData.map(value => {
            value.application_time = moment(value.application_time).format('YYYY-MM-DD')
            value.create_time = moment(value.create_time).format('YYYY-MM-DD');
            value.applicationTargert_time = moment(value.applicationTargert_time).format('YYYY-MM-DD');
            let chinese = {
                application: this.userMap.get(value.application_id).username,
                target: this.userMap.get(value.applicationTargert_id).username,
                rosterType: this.rosterTypeMap.get(parseInt(value.applicationRosterType)).roster_value,
                t_rosterType: this.rosterTypeMap.get(parseInt(value.applicationTargertRosterType)).roster_value,
            }
            Object.assign(value, {chinese})
            return value;
        })

    },
    /**
     * 更新调班申请状态
     * @param invitation
     * @returns {Promise<string>}
     */
    async update(invitation) {
        if (invitation.status === 1) {
            // 同意
            if (invitation.applicationType === 2) {
                // 对班
                
            } else {
                // 替班
            }
        } else {
            // 拒绝
            invitation.handlerTime = moment(invitation.handlerTime).format('YYYY-MM-DD HH:mm:ss')
            return invitationModel.updateShift(invitation);
        }
    },
    /**
     * 查询该值班项在值班申请表中是否已存在
     * @param rosterId
     * @returns {Promise<void>}
     */
    async selectOne(rosterId) {
        return invitationModel.selectOne(rosterId)
    },
    /**
     * 新增调班申请
     * @param roster
     * @returns {Promise<Knex.QueryBuilder<any, number[]>>}
     */
    async add(roster) {
        // let applicationTime = roster.applicationTime.slice(0, roster.applicationTime.length - 3)
        // console.log(applicationTime)
        const insertApplication = {
            roster_id: roster.roster_id,
            application_id: roster.applicationId,
            applicationTargert_id: parseInt(roster.applicationTargert_id),
            applicationRosterType: roster.applicationRosterType,
            applicationTargertRosterType: roster.applicationTargertRosterType,
            application_time:  moment(roster.applicationTime).format("YYYY-MM-DD HH:mm:ss"),
            applicationTargert_time: moment(roster.applicationTargert_time).format("YYYY-MM-DD HH:mm:ss"),
            applicationType: roster.applicationType,
            roster_target_id: roster.applicationType === 1 ? roster.applicationTargetRosterId : roster.roster_id,
            create_time: new Date(),
            department_id: roster.departmentId,
            status: 1,//待处理
        }
        debug(insertApplication)
        return invitationModel.insert(insertApplication);
    },
    /**
     * 获取当前日期所在月的个人申请信息
     * @param application_id
     * @returns {Promise<*>}
     */
    async rosterSchedule(application_id) {

        // 本月第一天零时零分零秒
        let startTime = moment().startOf('month').format();
        // 本月最后一天23时59分59秒
        let endTime = moment().endOf('month').format();
        const result = await invitationModel.querySchedule(application_id, startTime, endTime )
        if(result.length > 0) {
            await this.init(result[0].department_id);
        }
        result.forEach(item => {
            item.application_time = item.application_time ? moment(item.application_time).format('YYYY-MM-DD') : '';
            item.update_time = item.update_time ?  moment(item.update_time).format('YYYY-MM-DD HH:mm') : '';
            item.create_time = item.create_time ? moment(item.create_time).format('YYYY-MM-DD HH:mm') : '';
            item.handlerTime = item.handlerTime ? moment(item.handlerTime).format('YYYY-MM-DD,HH:mm'): '暂未处理';
            item.handlerUser = item.handlerUser ? this.userMap.get(item.handlerUser).username : '暂未处理';
            item.target = item.applicationTargert_id ? this.userMap.get(item.applicationTargert_id).username : '暂未处理';
        })

        return result;

    },
}
module.exports = invitationService;
