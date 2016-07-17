# gulp-css2module
The css file translation for js file.Example for less to js module (concat-less2css-css2module)

## Usage

See examples.It's Less to js module Demo

`npm install` then `cd examples/`
finally run `gulp`

## background
In the project we make single page SPA by using `location.hash` change to execute one module.So the original ` <head><link some css files></head> ` is no longer applicable.

Because the CSS file is applied to the entire document, if use dynamic method to add CSS file, CSS file still exist in ` < head > < / head > ` after hash switch 

Because there will be a click to jump to other modules, after come back, there may be some style influence each other. So in the React components import component part of the CSS, applied to components within such a CSS only.

And within the components into the CSS string nor elegant way, we will made JS, CSS files separate module method to introduce.

Therefore we need a plug-in. Realized from **Less->CSS->JS Module** process.

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


