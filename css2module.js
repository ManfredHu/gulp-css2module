var gutil = require('gulp-util');
var Transform = require('readable-stream/transform');
var fs = require('fs');

module.exports = function(options) {
    return new Transform({
        objectMode: true,
        transform: function htmlminTransform(file, enc, cb) {
            if (file.isNull()) {
                return cb(null, file);
            }
            if (file.isStream()) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return cb();
            }
            if(!options.tplSrc || !options.replace){
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'the tplSrc arguments must be pass'));
                return cb();
            }
            var str = file.contents.toString('utf8');
            var data = fs.readFileSync(options.tplSrc);
            var dataStr = data.toString('utf8');
            var newData = dataStr.replace(options.replace,str);
            file.contents = new Buffer(newData);
            return cb(null, file);
        }
    });
};
