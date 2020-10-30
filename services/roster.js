const rosterModel = require('../models/rosterModel')
const debug = require('debug')('roster')
const moment = require('moment')

moment.locale('zh-CN');

const rosterService = {
    /**
     * 查询当前部门，当前用户的今日排班
     * @param queryParams
     * @returns {Promise<*>}
     */
    async getList(queryParams) {
        //今天零时零分零秒
        let startTime = moment().startOf('day').format();
        // 今天23时59分59秒
        let endTime = moment().endOf('day').format();

        Object.assign(queryParams, {startTime: startTime, endTime: endTime})
        return this.getMeRoster(queryParams);
    },
    /**
     * 查询当前部门，当前用户的本周排班
     * @param queryParams
     * @returns {Promise<*>}
     */
    async getMeWeekList(queryParams) {
        // 本周第一天零时零分零秒
        let startTime = moment().startOf('week').format();
        // 本周最后一天23时59分59秒
        let endTime = moment().endOf('week').format();

        Object.assign(queryParams, {startTime: startTime, endTime: endTime})
        return this.getMeRoster(queryParams);
    },
    /**
     * 获取本部门今日排班
     * @param department_id
     * @param organization_id
     * @returns {Promise<*>}
     */
    async getTodayList(department_id, organization_id) {
        //今天零时零分零秒
        let startTime = moment().startOf('day').format();
        // 今天23时59分59秒
        let endTime = moment().endOf('day').format();

        return this.getDeptRoster({startTime, endTime, department_id, organization_id})
    },
    /**
     * 获取本部门本周排班
     * @param department_id
     * @param organization_id
     * @returns {Promise<*>}
     */
    async getWeekList(department_id, organization_id) {
        // 本周第一天零时零分零秒
        let startTime = moment().startOf('week').format();

        // 本周最后一天23时59分59秒
        let endTime = moment().endOf('week').format();

        return this.getDeptRoster({startTime, endTime, department_id, organization_id})
    },
    /**
     * 获取本月部门排班
     * @param department_id
     * @param organization_id
     * @returns {Promise<*>}
     */
    async getMonthList(department_id, organization_id) {
        // 本月第一天零时零分零秒
        let startTime = moment().startOf('month').format();
        // 本月最后一天23时59分59秒
        let endTime = moment().endOf('month').format();
        return this.getDeptRoster({startTime, endTime, department_id, organization_id})

    },
    async getDeptRoster(queryParams) {
        const rosterList = await rosterModel.getDeptRoster(queryParams)
        for(let i=0, len=rosterList.length; i<len; i++) {
            let _date = moment(rosterList[i].roster_time).format('LL')
            let _weekend = moment(rosterList[i].roster_time).format('dddd')
            rosterList[i].roster_time = _date + ' ' +  _weekend;
            let username = rosterList[i].title.split('||')[1]
            Object.assign(rosterList[i], {username: username})
        }
        return rosterList;
    },
    async getMeRoster(queryParams) {
        const rosterList = await rosterModel.getList(queryParams)

        for(let i=0, len=rosterList.length; i<len; i++) {
            // 值班时间已过期 status = -1
            if ( moment(new Date()).add(-1,'days') > rosterList[i].roster_time) {
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
            applicationTargert_id: roster.applicationTargert_id,
            applicationRosterType: roster.applicationRosterType,
            applicationTargertRosterType: roster.applicationTargertRosterType,
            application_time:  moment(roster.applicationTime).format("YYYY-MM-DD hh:mm:ss"),
            applicationTargert_time: moment(roster.applicationTargert_time).format("YYYY-MM-DD hh:mm:ss"),
            applicationType: roster.applicationType,
            create_time: new Date(),
            department_id: roster.departmentId,
            status: 1,//待处理
        }
        return rosterModel.insert(insertApplication);
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
        const result = await rosterModel.querySchedule(application_id, startTime, endTime )
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
