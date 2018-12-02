var gulp = require('gulp'),
    log = require('fancy-log'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tagVersion = require('gulp-tag-version');

function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json'])
        // bump the version number in those files
        .pipe(bump({ type: importance }))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))
        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tagVersion());
}
function incVersion(importance) {
    return getCurrentBranch().then((branch) => {
        inc(importance)
        // if (branch === 'dev') {
        //     inc(importance)
        // } else {
        //     log.error('=============================================');
        //     log.error('Increase version only support in dev branch.');
        //     log.error('=============================================');
        // }
    });
}

//gulp patch     # makes v0.1.0 → v0.1.1
gulp.task('version-patch', function () { return incVersion('patch'); })
//gulp feature   # makes v0.1.1 → v0.2.0
gulp.task('version-feature', function () { return incVersion('minor'); })
//gulp release   # makes v0.2.1 → v1.0.0
gulp.task('version-release', function () { return incVersion('major'); })



function getCurrentBranch() {
    function pickBranchFromStatusContent(content) {
        var lines = content.split('\n');
        if (lines.length > 0 && lines[0].startsWith('On branch ')) {
            return lines[0].substr(10);
        }
    }
    return new Promise(function (resolve, reject) {
        git.status({}, function (err, stdout) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pickBranchFromStatusContent(stdout));
            }
        });
    });

}

