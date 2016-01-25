# gulp-remark [![Build Status][travis-image]][travis-url]

> Experimental Gulp plugin for [Remark][remark] — markdown processor powered by plugins

## Install

```sh
npm install --save-dev andrepolischuk/gulp-remark
```

## Usage

```js
import gulp from 'gulp';
import remark from 'gulp-remark';
import github from 'remark-github';

gulp.task('default', () => {
  return gulp.src('src/text.md') // SHA: a5c3785ed8d6a35868bc169f07e40e889087fd2e
    .pipe(remark([
      github
    ]))
    .pipe(gulp.dest('dist')); // SHA: [a5c3785](https://github.com/andrepolischuk/gulp-remark/commit/a5c3785ed8d6a35868bc169f07e40e889087fd2e)
});
```

## API

### remark(plugins[, options])

Create new transform stream with [plugin][remark-plugins] array and options (see `remark` [settings][remark-settings]).

If some plugin has own options you should add array of plugin and options to remark plugin array:

```js
import gulp from 'gulp';
import remark from 'gulp-remark';
import textr from 'remark-textr';
import github from 'remark-github';
import ellipses from 'typographic-ellipses';
import quotes from 'typographic-quotes';
import spaces from 'typographic-single-spaces';

gulp.task('default', () => {
  return gulp.src('src/text.md')
    .pipe(remark([
      github,
      [textr, {
        plugins: [
          spaces,
          quotes,
          ellipses
        ]
      }]
    ]))
    .pipe(gulp.dest('dist'));
});
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/gulp-remark
[travis-image]: https://travis-ci.org/andrepolischuk/gulp-remark.svg?branch=master

[remark]: https://github.com/wooorm/remark
[remark-plugins]: https://github.com/wooorm/remark/blob/master/doc/plugins.md
[remark-settings]: https://github.com/wooorm/remark/blob/master/doc/remarksetting.7.md
