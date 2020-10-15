
const homeService = require('../services/home')
module.exports = async (ctx, next) => {
    const resultList = await homeService.getList()
    ctx.body = {
        code: 200,
        data: resultList,
        message: 'success'
    }

}
