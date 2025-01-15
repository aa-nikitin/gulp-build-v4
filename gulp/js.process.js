import webpack from 'webpack';
import webpackStream from 'webpack-stream';

export default function ({gulp, config, libs, devtool}) {
  const {src, rootBuild} = config;

  return function jsProcess() {
    return gulp
      .src(`${src}/app.js`)
      .pipe(
        libs.plumber({
          errorHandler: libs.notify.onError(function (error) {
            return {
              title: 'js',
              message: error.message
            };
          })
        })
      )
      .pipe(
        webpackStream(
          {
            entry: `${src}/app.js`,
            output: {
              filename: 'app.js'
            },
            module: {
              rules: [
                {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: 'esbuild-loader'
                }
              ]
            },
            performance: {
              hints: false
            },
            devtool
          },
          webpack
        )
      )
      .on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe(gulp.dest(`${rootBuild}/assets/js`));
  };
}
