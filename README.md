# gulp-css2module
The CSS file translated into JS file. Example for Less files to a js module (concat-less2css-css2module)

## Usage

See examples.It's so easy.

1. `npm install` 
2. then `cd examples/`
3. finally run `gulp`

## Background
In the project, we make single page SPA by using `location.hash` change to execute one module.So the original ` <head><link some css files></head> ` is no longer applicable.

Actually, the CSS file is applied to the entire document. If use dynamic method to add CSS file(means create a link label), CSS file still exist in ` < head > < / head > ` after hash switched.

Example for loading css file or js file dynamically:

```javascript
var dynamicLoading = {
    css: function(path) {
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path){
		var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}
```

When we click and then jump to other modules, there may be some style influence each other after coming back. 
So when writing React components,we use a css module imported to big component and becomes a part of the big component.


Write a string in the component is not elegant and not convenient.So we will make independent style into a file but not css file.
In fact, it is a js module.

Therefore we need a plug-in. Realized from **Less files -> CSS ->JS Module** process.

## Author & Contact
- name: Manfredhu/pphu
- email: manfredhu@gmail.com

## Realization Process(easy)
open the `examples/gulpfile.js`

```
var lessFiles = './less/*.less';

gulp.task('less2module', function () {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(concatCss('temp.css'))
    .pipe(uglifycss())
    .pipe(css2module({
        tplSrc: './moduleTemplate.js', //will insert css uglify code to this file
        replace: '{{@##@}}' //replace argument，can be string or regexp
    }))
    .pipe(rename(function(path){
        path.extname = '.js' //file extend name,
    })) 
    .pipe(gulp.dest('./dist'));
});

```

**It is easy to modify this file to your own purpose.**

There are a few steps:

1. Use `gulp.src` include the Less files.
2. Run less engine translate to css files and then concat all files.
3. Use **css2module** pass you template file name and replace to insert the code
4. Rename the file(may be css) to `.js`
5. Export the file to `dist` path

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) 


