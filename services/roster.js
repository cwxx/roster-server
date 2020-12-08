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
     * 查找特定条件下的排班
     * @param department_id
     * @param organization_id
     * @param day
     * @returns {Promise<*>}
     */
    async getDayList(department_id, organization_id,rosterTime) {
        // 零时零分零秒
        let startTime = moment(new Date(rosterTime)).startOf('day').format();
        // 23时59分59秒
        let endTime = moment(new Date(rosterTime)).endOf('day').format();
        console.log(startTime,endTime)
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

        const result = await this.getDeptRoster({startTime, endTime, department_id, organization_id});

        return this.getWeekTableRoster(result)
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
     * 查询可替班列表
     * @param departmentId
     * @returns {*}
     */
    async getReplaceList(departmentId) {
        // 零时零分零秒
        let startTime = moment(new Date()).startOf('day').format();
        let replaceList = await rosterModel.getReplaceRosterList(departmentId, startTime);
        return replaceList.map(value => {
            value.title = `${value.title} || ${moment(value.roster_time).format('LL')}`
            return value;
        })
    },
    /**
     * 新增排班
     * @param roster
     */
    addRoster(roster) {

    },
    /**
     * 更新排班
     * @param roster
     */
    updateRoster(roster) {

    },
    /**
     * 处理函数，对部门排班返回结果格式化
     * @param queryParams
     * @returns {Promise<*>}
     */
    async getDeptRoster(queryParams) {
        const rosterList = await rosterModel.getDeptRoster(queryParams)
        for(let i=0, len=rosterList.length; i<len; i++) {
            // 保留可计算的时间格式
            Object.assign(rosterList[i],{time: rosterList[i].roster_time})
            let _date = moment(rosterList[i].roster_time).format('LL')
            let _weekend = moment(rosterList[i].roster_time).format('dddd')
            // 转换为以显示的时间格式
            rosterList[i].roster_time = _date + ' ' +  _weekend;
            let rosterType = rosterList[i].title.split('||')[0]
            let username = rosterList[i].title.split('||')[1]
            Object.assign(rosterList[i], {username, rosterType})
        }
        return rosterList;
    },
    /**
     * 处理函数，对我的排班返回结果进行处理
     * @param queryParams
     * @returns {Promise<*>}
     */
    async getMeRoster(queryParams) {
        const rosterList = await rosterModel.getList(queryParams)

        for(let i=0, len=rosterList.length; i<len; i++) {
            // 值班时间已过期 status = -1
            // if ( moment(new Date()).add(-1,'days') > rosterList[i].roster_time) {
            //     rosterList[i].status = -1;
            // }
            let _date = moment(rosterList[i].roster_time).format('LL')
            let _weekend = moment(rosterList[i].roster_time).format('dddd')
            rosterList[i].roster_time = _date + ' ' +  _weekend;
            console.log(rosterList[i].roster_time)
        }
        return rosterList;
    },
    /**
     * 处理函数 将周值班数组转换为按每天的表格形式
     * @param weekRoster
     * @returns {[]}
     */
    getWeekTableRoster(weekRoster) {

        let sundayRoster = {
            week: '星期日',
            roster: []
        };
        let mondayRoster = {
            week: '星期一',
            roster: []
        };
        let tuesdayRoster = {
            week: '星期二',
            roster: []
        };
        let wednesdayRoster = {
            week: '星期三',
            roster: []
        };
        let thursdayRoster = {
            week: '星期四',
            roster: []
        };
        let fridayRoster = {
            week: '星期五',
            roster: []
        };
        let saturdayRoster = {
            week: '星期六',
            roster: []
        }
        for(let i = 0, len = weekRoster.length; i< len; i++) {
            switch (moment(weekRoster[i].time).day()) {
                case 0:
                    sundayRoster.roster.push(weekRoster[i])
                    break;
                case 6:
                    saturdayRoster.roster.push(weekRoster[i])
                    break;
                case 5:
                    fridayRoster.roster.push(weekRoster[i])
                    break;
                case 4:
                    thursdayRoster.roster.push(weekRoster[i])
                    break;
                case 3:
                    wednesdayRoster.roster.push(weekRoster[i])
                    break;
                case 2:
                    tuesdayRoster.roster.push(weekRoster[i])
                    break;
                case 1:
                    mondayRoster.roster.push(weekRoster[i])
                    break;
                default:
                    console.log('error')
            }
        }
        let tableResult = [];

        tableResult.push(mondayRoster)
        tableResult.push(tuesdayRoster)
        tableResult.push(wednesdayRoster)
        tableResult.push(thursdayRoster)
        tableResult.push(fridayRoster)
        tableResult.push(saturdayRoster)
        tableResult.push(sundayRoster)
        return {
            weekRoster,
            tableResult
        }
    }
}
module.exports = rosterService;
