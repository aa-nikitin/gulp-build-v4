# Инструкция по сборке
--------------------------------------
##### 1. Добавление Нового проекта
- Скопировать папку src
- Переименовать папку в "Имя проекта"
- В файле config.js в корне добавить "Имя проекта" 
- В const src указать нужный элемент массива

--------------------------------------
##### 2. Запуск в dev режиме
```sh
    gulp
```
--------------------------------------
##### 3. Запуск в production режиме
```sh
    gulp build
```
--------------------------------------
##### 4. Запуск в production режиме но с отслеживанием изменений(liveReload)
```sh
    gulp buildev
```
--------------------------------------
##### 5. Генерация меню
```sh
    gulp pages
```
--------------------------------------
##### 6. Генерация Фавиконок
сгенерерованные файлы будут лежать в папке --- ./build/assets/icons
```sh
    gulp favicon
```
--------------------------------------
##### 7. Генерация спрайтов
- сгенерерованные спрайты(png,gif) будут лежать в папке --- ./build/assets/files/sprite
- сгенерерованные спрайты(svg) будут лежать в файле --- ./build/assets/files/sprite.svg
```sh
    gulp sprite
```
--------------------------------------
##### 8. Добавление шрифтов
- должен быть создан файл scss в папке со шрифтами
- вставить в начале файла:
```sh
    $fontPath: '/assets/fonts/папка_шрифта/';
``` 
- следующим шагом
```sh
    url(
```
заменить на 
```sh
    url($fontPath+
```
--------------------------------------
##### 9. Генерация шрифтов из ttf
- в корне сборки(на одном уровне с node_modules) создаем папку fonts
- разместить там шрифты в формате ttf
- выполнить команду 
```sh
    gulp fonts
```
- будут сгенерированы шрифты и файл stylesheet.scss
- вставить в начале файла:
```sh
    $fontPath: '/assets/fonts/папка_шрифта/';
``` 
- следующим шагом
```sh
    url("../fonts/
```
заменить на 
```sh
    url($fontPath+"
```
- файл stylesheet.scss неполный, (@font-face)-ы необходимо преобразовать в следующий код

```sh
    @font-face {
        font-family: 'PT Sans';
        src: url($fontPath+'PTSans-Bold.eot');
        src: local('PT Sans Bold'), local('PTSans-Bold'),
            url($fontPath+'PTSans-Bold.eot?#iefix') format('embedded-opentype'),
            url($fontPath+'PTSans-Bold.woff') format('woff'),
            url($fontPath+'PTSans-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }
```
--------------------------------------
##### 10. Генерация файлов(изображений и спрайтов)
- можно пересобрать все изображения и спрайты(удаленные из итоговой сборки так же пропадут)
- необходимо выполнить команду 
```sh
    gulp files
```
--------------------------------------
##### 11. Генерация Hbs(шаблонов)
чтобы бересобрать только Hbs после изменения шаблонов, необходимо:
- удалить файл template.js который находится в  "src"\js\hbs\templates\templates.js
- необходимо 2 раза выполнить команду 
```sh
    gulp hbsbuild
```
пример вызова Hbs:
```js
    console.log(Hbs.app({doesWhat: 'aaaaaaaa', elements: [{text: 'rocks1!'}, {text: 'rocks2!'}]}));
```
