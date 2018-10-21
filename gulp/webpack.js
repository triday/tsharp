const gulp = require('gulp');
const webpack = require('webpack');
const PluginError = require('plugin-error');
const log = require('fancy-log');
const webpackConfDev = require('../webpack/dev.js');
const webpackConfProd = require('../webpack/prod.js');

gulp.task('pack-dev', (done) => {
    return webpack(webpackConfDev, function (err, stats) {
        if (err) throw new PluginError('webpack', err);
        log('[webpack]', stats.toString({ colors: true }));
        done();
    });
});
gulp.task('pack-prod', (done) => {
    return webpack(webpackConfProd, function (err, stats) {
        if (err) throw new PluginError('webpack', err);
        log('[webpack]', stats.toString({ colors: true }));
        done();
    });
});
