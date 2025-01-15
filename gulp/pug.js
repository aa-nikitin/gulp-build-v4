import pug from 'gulp-pug';

export const createPugPath = function (listFileNames, pathSrc) {
  if (listFileNames && listFileNames.length) {
    const listPathPug = [];
    listFileNames.forEach((item) => listPathPug.push(`${pathSrc}/pages/${item}.pug`));

    return listPathPug;
  } else return `${pathSrc}/pages/**/*.pug`;
};

export default function ({gulp, config, libs}, pathsPug) {
  const {rootBuild} = config;

  return function pugHtml() {
    return gulp
      .src(pathsPug)
      .pipe(
        libs.plumber({
          errorHandler: libs.notify.onError(function (error) {
            return {
              title: 'pug',
              message: error.message
            };
          })
        })
      )
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(`${rootBuild}/`));
  };
}
