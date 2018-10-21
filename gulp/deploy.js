const gulp = require('gulp');



// const log = require('fancy-log');



const sequence = require('gulp-sequence')








gulp.task('deploy-dev', (cb) => {
    return sequence('clean-deploy', 'zip-dist-snapshot', 'upload-ftp-dist', cb);
});
gulp.task('deploy-prod', (cb) => {
    return sequence('clean-deploy', 'zip-dist-rc', 'upload-ftp-dist', cb);
});


