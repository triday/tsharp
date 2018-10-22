const gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('dts',function(){
    gulp.src("src/**/*.d.ts")
    .pipe(concat("index.d.ts"))
    .pipe(gulp.dest("dist"))
});

