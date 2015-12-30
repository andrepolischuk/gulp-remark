import test from 'ava';
import {File} from 'gulp-util';
import ellipses from 'typographic-ellipses';
import quotes from 'typographic-quotes';
import spaces from 'typographic-single-spaces';
import textr from 'remark-textr';
import github from 'remark-github';
import remark from './index.es5';
let fixture;

const input = `
## spread operator...

Hello  "world"

    function(...args) { return args; }

SHA: a5c3785ed8d6a35868bc169f07e40e889087fd2e
`;

const output1 = `## spread operator...

Hello  "world"

    function(...args) { return args; }

SHA: a5c3785ed8d6a35868bc169f07e40e889087fd2e
`;

const output2 = `## spread operator...

Hello  "world"

    function(...args) { return args; }

SHA: [a5c3785](https://github.com/andrepolischuk/gulp-remark/commit/a5c3785ed8d6a35868bc169f07e40e889087fd2e)
`;

const output3 = `## spread operator…

Hello “world”

    function(...args) { return args; }

SHA: [a5c3785](https://github.com/andrepolischuk/gulp-remark/commit/a5c3785ed8d6a35868bc169f07e40e889087fd2e)
`;

test.beforeEach(t => {
  fixture = new File({
    path: 'fixture.md',
    contents: new Buffer(input)
  });
});

test.cb.serial('return original markdown', t => {
  const stream = remark();

  stream.on('data', file => {
    t.is(file.relative, 'fixture.md');
    t.is(file.contents.toString(), output1);
    t.end();
  });

  stream.write(fixture);
});

test.cb.serial('return transformed markdown', t => {
  const stream = remark([
    github
  ]);

  stream.on('data', file => {
    t.is(file.relative, 'fixture.md');
    t.is(file.contents.toString(), output2);
    t.end();
  });

  stream.write(fixture);
});

test.cb.serial('return transformed markdown', t => {
  const stream = remark([
    github,
    [textr, {
      options: {
        locale: 'en-us'
      },
      plugins: [
        spaces,
        quotes,
        ellipses
      ]
    }]
  ]);

  stream.on('data', file => {
    t.is(file.relative, 'fixture.md');
    t.is(file.contents.toString(), output3);
    t.end();
  });

  stream.write(fixture);
});
