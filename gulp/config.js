/*
    配置config.user.json文件，config.user.json文件中存储敏感信息，不应该提交到
    git仓库中。
*/
const gulp = require('gulp');
const fs = require('fs');
const log = require('fancy-log');
const prompt = require('gulp-prompt');
const configFile = './config.json.user';
const inputSchemas = [
    {
        type: 'input',
        desc: 'ftp host address',
        name: 'ftp.host',
    },
    {
        type: 'input',
        desc: 'ftp port',
        name: 'ftp.port',
        validate: function (port) {
            if (port === '') return true;
            let portNum = Number(port);
            return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
        }
    },
    {
        type: 'input',
        desc: 'ftp remote root path',
        name: 'ftp.remotePath'
    },
    {
        type: 'input',
        desc: 'ftp user name',
        name: 'ftp.user'
    },
    {
        type: 'password',
        desc: 'user password',
        name: 'ftp.pass'
    },
    {
        type: 'input',
        desc: 'aliyun oss region',
        name: 'aliyunoss.region'
    },
    {
        type: 'input',
        desc: 'aliyun oss bucket',
        name: 'aliyunoss.bucket'
    },
    {
        type: 'input',
        desc: 'aliyun oss prefix',
        name: 'aliyunoss.prefix'
    },

    {
        type: 'input',
        desc: 'aliyun oss accessKeyId',
        name: 'aliyunoss.accessKeyId'
    },
    {
        type: 'input',
        desc: 'aliyun oss accessKeySecret',
        name: 'aliyunoss.accessKeySecret'
    }


]


gulp.task('init-user-config', function () {
    let allConfig = {}
    if (fs.existsSync(configFile)) {
        Object.assign(allConfig, JSON.parse(fs.readFileSync(configFile)));
    }
    inputSchemas.forEach((item) => {
        let currentValue = readPath(allConfig, item.name);
        let messageText = currentValue && item.type != 'password' ?
            `Please input ${item.desc} : (${currentValue})` :
            `Please input ${item.desc} :`;
        item.message = messageText;
    })
    function readPath(obj, namePath) {
        for (p of namePath.split('.')) {
            if (obj && obj.hasOwnProperty(p)) {
                obj = obj[p];
            } else {
                obj = null;
            }
        }
        return obj;
    }
    function mergeObj(obj, res) {
        for (p in res) {
            if (!res[p]) continue;
            if (typeof res[p] === 'object') {
                mergeObj(obj[p], res[p]);
            } else {
                obj[p] = res[p];
            }
        }
    }
    log.warn('======================================================');
    log.warn('The "config.user.json" file should not commit to repo.');
    log.warn('======================================================');
    return gulp.src('*')
        .pipe(prompt.prompt(inputSchemas, function (res) {
            mergeObj(allConfig, res);
            fs.writeFileSync(configFile, JSON.stringify(allConfig, null, 4));
        }));
});