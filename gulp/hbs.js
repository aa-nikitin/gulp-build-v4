import handlebars from 'gulp-handlebars';

function templates({gulp, config, libs}) {
  const {src} = config;
  return gulp
    .src(`${src}/js/hbs/**/*.hbs`)
    .pipe(
      libs.rename((path) => {
        if (path.basename.startsWith('_')) {
          path.basename = path.basename.substring(1);
        }
      })
    )
    .pipe(handlebars())
    .pipe(libs.wrap('Handlebars.template(<%= contents %>)'))
    .pipe(
      libs.declare({
        namespace: 'Hbs',
        noRedeclare: true
      })
    );
}
function partials({gulp, config, libs}) {
  const {src} = config;
  return gulp
    .src(`${src}/js/hbs/**/*.hbs`)
    .pipe(handlebars())
    .pipe(
      libs.wrap(
        'Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Hbs[<%= processPartialName(file.relative) %>]);',
        {},
        {
          imports: {
            processPartialName: function (fileName) {
              return JSON.stringify(libs.path.basename(fileName, '.js').substring(0));
            }
          }
        }
      )
    );
}
function pack({gulp, config, libs}) {
  const {src, rootBuild} = config;
  return gulp
    .src(`${src}/js/hbs/**/*.js`)
    .pipe(libs.concat('hbs.js'))
    .pipe(libs.uglify.default())
    .pipe(
      libs.rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(`${rootBuild}/assets/js`));
};
export default function (params) {
  const {gulp, config, libs} = params;
  const {src} = config;
  return function hbs() {
    return libs
      .merge(templates(params), partials(params), pack(params))
      .pipe(libs.concat('templates.js'))
      .pipe(gulp.dest(`${src}/js/hbs/templates`));
  };
}
