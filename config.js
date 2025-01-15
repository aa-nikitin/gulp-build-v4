//----------------------
//- Путь к сборке, куда загружаются финальные бандлы
const rootBuild = './build';

//----------------------
//- список проектов в папке projects
const projects = {
  0: './projects/src'
};

//----------------------
//- проект который будет запущен при команде gulp или npn run gulp, передаем ключ нужного проекта
const src = projects[0];

//----------------------
//- применять Hendlebars? (будет собрана библиотека под него и помещена в build/hbs.js)
//- нужно подключить в index.pug перед app.js
//- после этого можно вызывать в app.js следующим образом Hbs.nameHbs({})
//- где nameHbs имя hbs файла а в объекте параметры
//- если в папке hbs нет *.hbs или *.handlebars файлов то шаблоны не формируется и в итокоговм файле будет только handlebars библиотека
//- путь к хранению hbs шаблонов(js/hbs/) там внутри hbs необходимо размещать *.hbs файлы
//- в (pug/config.pug) необходимо установить параметр hbsLibs в true
const isHbs = false;

//----------------------
//- собирать ли сторонние библиотеки в одну общую? (будет собрана библиотека и помещена в \assets\css\libs.min.css и \assets\js\libs.min.js)
//- библиотеки храняться в папке libs
//- файлы libs.min.css и libs.min.js нужно подключить в index.pug
//- css файлы
const isCssLibs = true;
//- js файлы
const isJsLibs = true;

//----------------------
//- Путь к pug файлам (страницам),
//- можно задать пустовй массив ([]) и тогда файлы будут браться по умолчанию - '/pages/**/*.pug'
//- или через перечисление в массиве имен файлов в папке/pages/
//- например, ['index', 'contacts', 'products']
const listFileNames = [];

export default {src, isHbs, isCssLibs, isJsLibs, listFileNames, rootBuild};
