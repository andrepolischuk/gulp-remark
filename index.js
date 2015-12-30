import {PluginError} from 'gulp-util';
import {obj} from 'through2';
import remark from 'remark';

export default function (plugins=[], options={}) {
  const processor = remark();

  plugins.forEach(plugin => {
    processor.use(...(Array.isArray(plugin) ? plugin : [plugin]));
  });

  return obj(function (file, encoding, fn) {
    if (file.isNull()) return fn(null, file);
    if (file.isStream()) return fn(new PluginError('gulp-remark', 'Streaming not supported'));
    const result = processor.process(file.contents.toString(), options);
    file.contents = new Buffer(result);
    this.push(file);
    fn();
  });
};
