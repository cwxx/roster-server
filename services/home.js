const http = require('axios').default
const homeService = {
    async getList() {
        // 获取首页展示信息
        // const host = 'https://cn.bing.com'
        // const url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
        // let result = {};
        // http.get({'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'})
        // console.log('@@@@@@@@@@@@@@@')
        // return result
        // const secondImage = new Promise((resolve, reject) => {
        //     http({
        //         url:`${host}/HPImageArchive.aspx?format=js&idx=1&n=1`,
        //         method:'GET',
        //     }).then(res => {
        //         resolve(res)
        //     }).catch(err => {
        //         reject(err)
        //     })
        // })
        // await Promise.all([firstImage, secondImage]).then(([res1, res2]) => {
        //     console.log('$$$$$$$$$$')
        //     result = {res1,res2}
        // })
        // console.log('@@@@@@@@@@')
        // return JSON.stringify(result);
        // return new Promise(((resolve, reject) => {
        //
        // }))
    }
}
module.exports = homeService
