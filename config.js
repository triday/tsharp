const config = require('./config.json');
const fs = require('fs');
/*
    config.json.user 用于存储敏感信息，不应该提交到git仓库中
    可以通过命令 npm run config-user 生成 config.json.user文件
*/
const userConfigFile = './config.json.user';
if(fs.existsSync(userConfigFile)){
    Object.assign(config, JSON.parse(fs.readFileSync(userConfigFile)));
}
module.exports = config;