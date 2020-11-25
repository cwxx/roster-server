const user  = require('../models/userModel')
const moment = require('moment')

const userService = {
    /**
     * 在微信用户首次登陆的时候，创建后台用户
     * @param wxUserInfo
     * @returns {Promise<awaited, Knex.QueryBuilder<TRecord, number[]>>}
     */
    async createUser( wxUserInfo ) {
        const userInfo = {
            role_id: '1', // 默认普通微信用户角色，后台管理员修改角色
            phone: '请输入',
            open_id: wxUserInfo.openId,
            nickname: JSON.stringify(wxUserInfo.nickName),
            organization_id: 1,
            status: 2,// 微信用户态
            password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
       return user.create(userInfo)

    },
    async updateUser( userInfo ) {
        return user.update(userInfo)
    },
    async getUserDetail( openId ) {
        return user.getDetail(openId)
    },
    async getUserDetailById( user_id ) {
        return user.getDetailById(user_id)
    },
    async getUserList( departmentId ) {
        return user.getUsers(departmentId)
    },
    /**
     * 通过用户名模糊搜索
     * @param username
     * @returns {}
     */
    getUserBySearch(username) {
        return user.getUserByName(username);
    }

}
module.exports = userService
