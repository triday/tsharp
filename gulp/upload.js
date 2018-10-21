const gulp = require('gulp');
const ftp = require('gulp-ftp');
const log = require('fancy-log');
const config = require('../config');
const oss = require('gulp-aliyun-oss');
gulp.task('upload-ftp-dist', () => {
    //不应该在此设置ftpOptions的值，
    //应该使用config.json.user文件中的配置,
    //具体使用命令npm run config
    var ftpOptions = {
        host: '0.0.0.0',
        port: 21,
        user: 'anonymous',
        pass: '@anonymous',
        remotePath: ''
    };
    Object.assign(ftpOptions, config.ftp);
    return gulp.src('dist/*')
        .pipe(ftp(ftpOptions));
});
gulp.task('upload-oss-deploy', () => {
    //不应该在此设置ossOptions的值，
    //应该使用config.json.user文件中的配置,
    //具体使用命令npm run config
    var ossOptions = {
        accessKeyId: '',
        accessKeySecret: '',
        region: '',
        bucket: '',
        prefix: '',
        ossOpt: {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }
    };
    return gulp.src('deploy/*.zip').pipe(oss(ossOptions));
})