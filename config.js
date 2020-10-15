const config = {
    //使用腾讯云登录
    useQcloudLogin: false,
    networkTimeout: 30000,
    // 本地环境开发
    serverHost: 'http://localhost/',
    port: '3000',
    rootPathname: '/',

    // 微信小程序 App ID
    appId: 'wx6ab2a6bb11c7a086',

    // 微信小程序 App Secret
    appSecret: '1e634e86c85992ee9d8ac9dd0c84e721',

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '58.87.79.23',
        port: 3306,
        user: 'root',
        db: 'hospital',
        pass: '123456',
        char: 'utf8'
    },
    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    //微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'wxToken',

}

module.exports = config
