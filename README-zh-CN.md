# gulp-css2module
The css file translation for js file.Example for less to js module (concat-less2css-css2module)
将CSS文件转化为JS模块，例子的转换过程包含几部分(翻译less文件到css文件，合并压缩css文件，插入JS模板)

## 用法

可以看例子，非常简单直观

`npm install` then `cd examples/`
finally run `gulp`

## 背景
因为在项目里面用到了单页SPA来制作游戏，通过hash更改模块来实现路由。这样原来的在 `<head></head>` 里 `<link>` 文件的方式就不再适用。

因为CSS文件是作用于整个文档的，如果采用动态添加CSS文件的方式，hash切换后css文件还存在 `<head></head>` 里

因为会有点击跳转到别的模块，回来了之后，一些样式有可能会相互影响的情况。所以我们在React组件里导入组件的部分CSS，这样CSS只作用于组件内。

而在组件内倒入CSS字符串的方式也不优雅，我们会将CSS文件单独做成JS模块的方法来引入。

所以就需要一个插件。实现了从 **Less->CSS->JS Module** 的过程。

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
        tplSrc: './moduleTemplate.js', //自己可以定义的js模板，代码会在指定位置插入
        replace: '{{@##@}}' //插入的地方，可以是字符串或者正则表达式
    }))
    .pipe(rename(function(path){
        path.extname = '.js' //修改后缀，将css后缀修改为js后缀
    })) 
    .pipe(gulp.dest('./dist'));
});

```

非常容易参考的demo
主要包含下面几步

1. 用 gulp.src 导入文件数组进来
2. 用 less 转换转换引擎将 less 文件转换为 css 文件,然后合并css文件到一个
3. 使用 css2module 模块，传递要插入的模板文件和插入的位置参数，这里用的replace，所以可以选择字符串或者正则表达式
4. 重命名文件后缀
5. 生成文件到指定路径

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Manfred Hu


