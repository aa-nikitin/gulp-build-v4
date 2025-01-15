export default function ({gulp, config}) {
  return function images() {
    const {src, rootBuild} = config;
    return gulp
      .src(`${src}/assets/files/**/*.*`, {
        encoding: false,
        since: gulp.lastRun(images)
      })
      .pipe(gulp.dest(`${rootBuild}/assets/files`));
  };
}
