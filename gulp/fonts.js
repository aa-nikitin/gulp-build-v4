import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2eot from 'gulp-ttf2eot';
import fontfacegen from 'gulp-fontfacegen';

export const copyFonts = function ({gulp, config}) {
  return function copyFonts() {
    const {src, rootBuild} = config;
    return gulp
      .src(`${src}/assets/fonts/**/*.{woff,woff2,eot,ttf}`, {
        encoding: false,
        since: gulp.lastRun(copyFonts)
      })
      .pipe(gulp.dest(`${rootBuild}/assets/fonts`));
  };
};

export const fontsConvert = function ({gulp}) {
  return {
    ttf2woff: function () {
      return gulp
        .src(['fonts/*.ttf'], {
          encoding: false,
          removeBOM: false
        })
        .pipe(ttf2woff())
        .pipe(gulp.dest('fonts/'));
    },
    ttf2woff2: function () {
      return gulp
        .src(['fonts/*.ttf'], {
          encoding: false,
          removeBOM: false
        })
        .pipe(ttf2woff2())
        .pipe(gulp.dest('fonts/'));
    },
    ttf2eot: function () {
      return gulp
        .src(['fonts/*.ttf'], {
          encoding: false,
          removeBOM: false
        })
        .pipe(ttf2eot())
        .pipe(gulp.dest('fonts/'));
    },
    font2css: function () {
      return (
        gulp
          .src('fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}')
          // Transform your fonts: fonter/ttf2woff2/etc
          .pipe(gulp.dest('fonts/'))
          .pipe(
            // fontfacegen()
            // or
            fontfacegen({
              filepath: 'fonts/',
              filename: 'stylesheet.scss'
            })
          )
      );
    }
  };
};
