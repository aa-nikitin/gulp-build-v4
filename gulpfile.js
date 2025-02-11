import gulp from 'gulp';
import merge from 'merge2';
import rename from 'gulp-rename';
import wrap from 'gulp-wrap';
import concat from 'gulp-concat';
import path from 'path';
import declare from 'gulp-declare';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify-es';
import header from 'gulp-header';
import footer from 'gulp-footer';
import minify from 'gulp-clean-css';
import browserSync from 'browser-sync';

import clear from './gulp/clear.js';
import clearImages from './gulp/clear.images.js';
import processTask from './gulp/js.process.js';
// import libsCompil from './gulp/libs.js';
import { jsLibs, cssLibs } from './gulp/libs.js';
import hbs from './gulp/hbs.js';
import pugHtml, { createPugPath } from './gulp/pug.js';
import pugMenuTask from './gulp/pug.menu.js';
import sassTask from './gulp/sass.js';
import imagesTask from './gulp/images.js';
import { faviconGenerate, faviconMarkups } from './gulp/favicon.js';
import { spriteSvg, spriteImg } from './gulp/sprite.js';
import { copyFonts, fontsConvert } from './gulp/fonts.js';

import config from './config.js';
const { src, rootBuild, isHbs, isJsLibs, isCssLibs, listFileNames } = config;
const { series, parallel } = gulp;

const libs = { merge, rename, wrap, concat, path, declare, notify, plumber, uglify, header, footer, minify };
const params = { gulp, config, libs };

const pathsPug = createPugPath(listFileNames, src);

const jsLibTask = isJsLibs ? [jsLibs(params)] : [];
const cssLibTask = isCssLibs ? [cssLibs(params)] : [];
const libsTasks = [...jsLibTask, ...cssLibTask];

const hbsTasks = isHbs ? [hbs(params)] : [];

const pug = pugHtml(params, pathsPug);
const pugMenu = pugMenuTask(params, pathsPug);
const images = imagesTask(params);

const sassDev = sassTask(params);
const jsDev = processTask({ gulp, config, libs, devtool: 'eval-sourcemap' });

const sassBuild = sassTask(params, true);
const jsBuild = processTask({ gulp, config, libs, devtool: '' });

// // IMAGES оптимизация изображений
// import imagemin from 'gulp-imagemin';

function watch() {
    gulp.watch(`${src}/**/*.scss`, series(sassDev));
    gulp.watch(`${src}/**/*.pug`, series(pug));
    gulp.watch([`${src}/js/**/*.js`, `${src}/components/**/*.js`, `${src}/app.js`], series(jsDev));
    gulp.watch(`${src}/assets/files/**/*.*`, series(images));
}

function serve() {
    browserSync.init({
        open: true,
        server: rootBuild,
    });

    browserSync.watch(['build'], browserSync.reload);
}

// сборка для разработки
const dev = series(
    clear(params),
    [...hbsTasks, ...libsTasks],
    parallel([pug, sassDev, jsDev, images, spriteImg(params), spriteSvg(params), copyFonts(params)]),
    parallel(watch, serve)
);

// сборка для продакшна
const build = series(
    clear(params),
    [...hbsTasks, ...libsTasks],
    parallel([pug, sassBuild, jsBuild, images, spriteImg(params), spriteSvg(params), copyFonts(params)])
);

// сборка для доработок, тоже что build но с liveReload
const buildev = series(
    clear(params),
    [...hbsTasks, ...libsTasks],
    parallel([pug, sassBuild, jsBuild, images, spriteImg(params), spriteSvg(params), copyFonts(params)]),
    parallel(watch, serve)
);

// пересборка Hbs(нужно удалить файл template.js - js\hbs\templates\templates.js)
const hbsbuild = series(
    [...hbsTasks, ...libsTasks]
);

// генерация фавикона
const favicon = series(faviconGenerate(params), faviconMarkups(params));

// генерация спрайтов
const sprite = parallel(spriteImg(params), spriteSvg(params));

// генерация шрифтов(woff, woff2, eot) из ttf
const { ttf2woff, ttf2woff2, ttf2eot, font2css } = fontsConvert(params);
const fonts = series(parallel(ttf2woff, ttf2woff2, ttf2eot), font2css);

// генерация меню
const pages = series(pugMenu);

const files = series(clearImages(params), parallel(images, spriteImg(params), spriteSvg(params)));

export default dev;
export { build, favicon, sprite, fonts, pages, buildev, files, hbsbuild  };
