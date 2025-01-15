import filelist from 'gulp-filelist';

function formatter(filePath) {
  let fileName = filePath.substring(filePath.lastIndexOf('/') + 1) || filePath;
  fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  return `\n        { name: '${fileName}', link: './${fileName}.html'},`;
}
export default function ({gulp, config, libs}, pathsPug) {
  const {src} = config;

  return function pugMenu() {
    return gulp
      .src(pathsPug)
      .pipe(filelist('pages.pug', {destRowTemplate: formatter}))
      .pipe(libs.header(`-\n    var pages = [`))
      .pipe(libs.footer(`\n    ]`))
      .pipe(gulp.dest(`${src}/pug`));
  };
}
