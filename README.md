# gulp-version-conflicts [![Build Status](https://travis-ci.org/shellscape/gulp-version-conflicts.svg?branch=master)](https://travis-ci.org/shellscape/gulp-version-conflicts)

Check for and report on module version conflicts for a package

## &nbsp;
<p align="center">
  <b>:rocket: &nbsp; Are you ready to tackle ES6 and hone your JavaScript Skills?</b> &nbsp; :rocket:<br/>
  Check out these outstanding <a href="https://es6.io/">ES6 courses</a> by <a href="https://github.com/wesbos">@wesbos</a>
</p>
---

<img src="https://github.com/shellscape/gulp-version-conflicts/blob/master/screenshot.png?raw=true" width="468">

## Install

```
$ npm install gulp-version-conflicts --save-dev
```

## Usage

```js
const gulp = require('gulp');
const conflicts = require('gulp-version-conflicts');

gulp.task('default', () =>
	gulp.src('package.json')
		.pipe(conflicts());
);
```

The default reporter follows the [stylish](https://github.com/sindresorhus/jshint-stylish)
format.

## License

MIT © [Andrew Powell](http://shellscape.org)
