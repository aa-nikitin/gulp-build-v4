import spritesmith from 'gulp.spritesmith';

import replace from 'gulp-replace';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';

export const spriteImg = function ({gulp, config}) {
  const {src, rootBuild} = config;
  return async function spriteImg() {
    return gulp
      .src(`${src}/assets/sprite/*.{png,gif}`, { encoding: false })
      .pipe(
        spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css'
        })
      )
      .on('error', (err) => {
        throw err;
      })
      .pipe(gulp.dest(`${rootBuild}/assets/files/sprite`));
  };
};

export const spriteSvg = function ({gulp, config}) {
  return function spriteSvg() {
    const {src, rootBuild} = config;
    return gulp
      .src(`${src}/assets/sprite/*.svg`)
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      .pipe(
        cheerio({
          run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: {xmlMode: true}
        })
      )
      .pipe(replace('&gt;', '>'))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: '../sprite.svg'
            }
          }
        })
      )
      .pipe(gulp.dest(`${rootBuild}/assets/files`));
  };
};
