const gulp = require('gulp');
const path = require('path');
const zip = require('gulp-zip');
const package = require('../package.json');
gulp.task('zip-dist-snapshot', () => {
    const timeStamp = dateFtt('yyMMdd_hhmmss', new Date());
    const fileName = `${package.name}_SNAPSHOT_${package.version}_${timeStamp}.zip`
    return zipDistToDeploy(fileName);
});
gulp.task('zip-dist-rc', () => {
    const timeStamp = dateFtt('yyMMdd_hhmmss', new Date());
    const fileName = `${package.name}_RC_${package.version}_${timeStamp}.zip`
    return zipDistToDeploy(fileName);
});
gulp.task('zip-dist-release', () => {
    const timeStamp = dateFtt('yyMMdd_hhmmss', new Date());
    const fileName = `${package.name}_${package.version}_${timeStamp}.zip`
    return zipDistToDeploy(fileName);
});
function zipDistToDeploy(zipFileName) {
    return gulp.src('dist/*')
        .pipe(zip(zipFileName))
        .pipe(gulp.dest('deploy'))
}
function dateFtt(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,               //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 