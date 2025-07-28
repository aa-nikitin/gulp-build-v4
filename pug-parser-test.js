// тестовый вариант парсера pug файлов, в перспективе для трансформации в .tpl для modx 
import parse from 'pug-parser';
import lex from 'pug-lexer';
import fs from 'fs';

var str = fs.readFileSync('./projects/src/app.pug', 'utf8');
var src = str;
var tokens = lex(src);

var ast = parse(tokens, { src });

console.log(JSON.stringify(ast, null, '  '));