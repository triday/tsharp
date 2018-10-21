const gulp = require('gulp');
const log = require('fancy-log');
gulp.task('default', function () {
    log.info("==============USAGES===================")
    for (taskName in gulp.tasks) {
        log.info(`gulp ${taskName}`);
    }
    log.info("=======================================")
});