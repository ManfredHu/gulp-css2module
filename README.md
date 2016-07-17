# gulp-css2module
The css file translation for js file.Example for less to js module (concat-less2css-css2module)

## Usage

See examples.It's Less to js module Demo

`npm install` then `cd examples/`
finally run `gulp`

## author
name: manfredhu/pphu
email: manfredhu@gmail.com

## finally
open the `examples/gulpfile.js`

```
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
        tplSrc: './moduleTemplate.js', //will insert css uglify code to this file
        replace: '{{@##@}}' //replace argument，can be string or regexp
    }))
    .pipe(rename(function(path){
        path.extname = '.js' //file extend name
    })) 
    .pipe(gulp.dest('./dist'));
});

```

Just so easy to modify this file for you work.
There are a few steps

1. gulp.src include the files.
2. run less engine translate to css file and then concat all files.
3. use css2module pass you template file name and replace to insert the code
4. rename the file(may be css) to `.js`
5. export the file to `dist` path

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Manfred Hu


