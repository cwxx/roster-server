const rosterModel = require('../models/rosterModel')
const debug = require('debug')('roster')
const moment = require('moment')

const rosterService = {
    /**
     * 查询当前部门，当前用户的排班
     * @param queryParams
     * @returns {Promise<*>}
     */
    async getList(queryParams) {
        //上周天
        let currentTime = moment(new Date()).day(0).format('YYYYMMDD');
        queryParams.id = queryParams.id.toString()
        debug(currentTime)
        Object.assign(queryParams, {rosterTime: currentTime})
        const rosterList = await rosterModel.getList(queryParams)
        moment.locale('zh-CN');
        for(let i=0, len=rosterList.length; i<len; i++) {
            // 值班时间已过期 status = -1
            if (moment(new Date()) > rosterList[i].roster_time) {
                rosterList[i].status = -1;
            }
            let _date = moment(rosterList[i].roster_time).format('LL')
            let _weekend = moment(rosterList[i].roster_time).format('dddd')
            rosterList[i].roster_time = _date + ' ' +  _weekend;
            console.log(rosterList[i].roster_time)
        }
        
        return rosterList;
    },
    /**
     * 根据id查排班详情
     * @param id
     * @returns {Promise<*>}
     */
    async getDetail(id) {
        const result = await rosterModel.getDetail(id);
        // let _date = moment(result[0].roster_time).format('LL')
        // let _weekend = moment(result[0].roster_time).format('dddd')
        // result[0].roster_time = _date
        return result[0]
    },
    /**
     * 查询该值班项在值班申请表中是否已存在
     * @param rosterId
     * @returns {Promise<void>}
     */
    async selectOne(rosterId) {
        return rosterModel.selectOne(rosterId)
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
            applicationRosterType: roster.applicationRosterType,
            application_time:  moment(roster.applicationTime).format("YYYY-MM-DD hh:mm:ss"),
            applicationType: roster.applicationType,
            create_time: new Date(),
            department_id: roster.departmentId,
            status: 1
        }
        return rosterModel.insert(insertApplication);
    },
    async rosterSchedule(application_id) {
        const result = await rosterModel.querySchedule(application_id, new Date())
        result.forEach(item => {
            item.application_time = item.application_time ? moment(item.application_time).format('YYYY-MM-DD') : '';
            item.update_time = item.update_time ?  moment(item.update_time).format('YYYY-MM-DD hh:mm') : '';
            item.create_time = item.create_time ? moment(item.create_time).format('YYYY-MM-DD hh:mm') : '';
            item.handlerTime = item.handlerTime ? moment(item.handlerTime).format('YYYY-MM-DD,hh:mm'): '暂未处理';
            item.handlerUser = item.handlerUser ? item.handlerUser : '暂未处理'
        })

        return result;

    }
}
module.exports = rosterService;
