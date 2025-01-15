import realFavicon from 'gulp-real-favicon';
import fs from 'fs';

export const faviconGenerate = function ({config}) {
  return function faviconGenerate(done) {
    const {src, rootBuild} = config;
    realFavicon.generateFavicon(
      {
        masterPicture: `${src}/favicon.png`,
        dest: `${rootBuild}/icons`,
        iconsPath: '/',
        design: {
          ios: {
            pictureAspect: 'noChange',
            assets: {
              ios6AndPriorIcons: false,
              ios7AndLaterIcons: false,
              precomposedIcons: false,
              declareOnlyDefaultIcon: true
            }
          },
          desktopBrowser: {},
          windows: {
            pictureAspect: 'noChange',
            backgroundColor: '#da532c',
            onConflict: 'override',
            assets: {
              windows80Ie10Tile: false,
              windows10Ie11EdgeTiles: {
                small: false,
                medium: true,
                big: false,
                rectangle: false
              }
            }
          },
          androidChrome: {
            pictureAspect: 'noChange',
            themeColor: '#ffffff',
            manifest: {
              display: 'standalone',
              orientation: 'notSet',
              onConflict: 'override',
              declared: true
            },
            assets: {
              legacyIcon: false,
              lowResolutionIcons: false
            }
          }
        },
        settings: {
          scalingAlgorithm: 'Mitchell',
          errorOnImageTooSmall: false
        },
        markupFile: `${rootBuild}/icons/faviconData.json`
      },
      function () {
        done();
      }
    );
  };
};

export const faviconMarkups = function ({gulp, config}) {
  return function faviconMarkups() {
    const {rootBuild} = config;
    return gulp
      .src([`${rootBuild}/index.html`])
      .pipe(
        realFavicon.injectFaviconMarkups(
          JSON.parse(fs.readFileSync(`${rootBuild}/icons/faviconData.json`)).favicon.html_code
        )
      )
      .pipe(gulp.dest(`${rootBuild}`));
  };
};
