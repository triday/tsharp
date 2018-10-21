const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean-deploy', function () {
    return cleanByPattern('deploy');
});
gulp.task('clean-dist', function () {
    return cleanByPattern('dist');
});
gulp.task('clean-d-ts',function(){
    return cleanByPattern('src/**/*.*ss.d.ts')
});

gulp.task('clean-all',['clean-deploy','clean-dist','clean-d-ts'],function(){

})
function cleanByPattern (pattern) {
    return gulp.src([pattern], { read: false })
        .pipe(clean());
}