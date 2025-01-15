const jsLibs = function (params) {
  const {gulp, config, libs} = params;
  return function jsLibs() {
    const {src, rootBuild} = config;
    return gulp
      .src(`${src}/assets/libs/**/*.js`)
      .pipe(libs.concat('libs.js'))
      .pipe(libs.uglify.default())
      .pipe(
        libs.rename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(`${rootBuild}/assets/js`));
  };
};

const cssLibs = function (params) {
  const {gulp, config, libs} = params;
  return function cssLibs() {
    const {src, rootBuild} = config;
    return gulp
      .src(`${src}/assets/libs/**/*.css`)
      .pipe(libs.concat('libs.css'))
      .pipe(libs.minify())
      .pipe(
        libs.rename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(`${rootBuild}/assets/css`));
  };
};

// export default function (params) {
//   const {libs} = params;
//   return function libsCompil() {
//     return libs.merge(jsLibs(params), cssLibs(params));
//   };
// }

export {jsLibs, cssLibs};
