var gulp = require('gulp'),
    fs = require('fs'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    uglifycss = require('gulp-uglifycss'),
    rename = require("gulp-rename"),
    css2module = require('../css2module')
    ;

//默认任务，转换JSX语法
gulp.task('default', function() {
    gulp.run('less2module');
});

var lessFiles = './less/*.less';

gulp.task('less2module', function () {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(concatCss('temp.css'))
    .pipe(uglifycss({
      // "maxLineLen": 80,
      // "uglyComments": true
    }))
    .pipe(css2module({
        tplSrc: './moduleTemplate.js', //CSS压缩代码要插入的模板文件
        replace: '{{@##@}}' //替换的地方，可以用string或者regexp
    }))
    .pipe(rename(function(path){
        path.extname = '.js' //会传递.css的文件过来，所以这里可以自己修改要生成的文件的类型
    })) 
    .pipe(gulp.dest('./dist'));
});
