const Koa = require('koa')
const config = require('./config')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const debug = require('debug')('roster-server')
// const mysql = require('./tools/mysql')
const app = new Koa()

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())
// 引入路由分发
const router = require('./routes')
app.use(router.routes())
app.use(async (ctx)=> {

    ctx.body = 'koa: path is wrong!'

})
// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
