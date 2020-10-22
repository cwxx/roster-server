/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controller')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { authorizationMiddleware, validationMiddleware } = require('../tools/auth')

// --- 登录与授权 Demo --- //n
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// 首页信息
router.get('/home', controllers.desktop)

// 用户信息
router.get('/userInfo', controllers.userinfo.get)
router.get('/userInfo/department', controllers.userinfo.getList)
router.put('/userInfo', controllers.userinfo.put)


// 部门信息
router.get('/department', controllers.department)

// 机构信息
router.get('/organization', controllers.organization)

// 用户职责类型
router.get('/userType', controllers.userType)

// 排班信息
router.get('/roster/me', controllers.roster.get)
router.get('/roster/week/me',controllers.roster.getWeekMe)
router.get('/roster/today',controllers.roster.getToday)
router.get('/roster/week',controllers.roster.getWeek)
router.get('/roster/month',controllers.roster.getMonth)
router.get('/roster/detail', controllers.roster.getDetail)
router.post('/roster/application',controllers.roster.post)


router.get('/roster/hasApplication',controllers.roster.getExistOne)
router.get('/roster/application/schedule',controllers.roster.getSchedule)

// 排班类型
router.get('/rosterType',controllers.rosterType)

module.exports = router
