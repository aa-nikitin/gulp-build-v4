import gulpSass from 'gulp-sass';
import dartSass from 'node-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import sassGlob from 'gulp-sass-glob';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

const sassHandle = ({gulp, src, libs}) => {
  return gulp
    .src(`${src}/app.scss`)
    .pipe(
      libs.plumber({
        errorHandler: libs.notify.onError(function (error) {
          return {
            title: 'scss',
            message: error.message
          };
        })
      })
    )
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(groupCssMediaQueries())
    .pipe(libs.concat('app.css'));
};

export default function ({gulp, config, libs}, isBuild) {
  const {src, rootBuild} = config;

  return function scss() {
    const gulpSass = sassHandle({gulp, src, libs});
    if (isBuild) return gulpSass.pipe(libs.minify()).pipe(gulp.dest(`${rootBuild}/assets/css`));

    return gulpSass
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${rootBuild}/assets/css`));
  };
}
