'use strict';

const expect = require('chai').expect;
const vinylFile = require('vinyl-file');
const plugin = require('./index');

describe('gulp-version-conflicts', () => {

  it ('should find conflicts', (done) => {
    let stream = plugin();

    stream.on('error', (err) => {
      expect(err).to.exist;
      done();
    });

  	stream.write(vinylFile.readSync('package.json'));
  	stream.end();
  });

  it ('should not find conflicts', (done) => {
    let stream = plugin();

    stream.on('finish', () => {
      done();
    });

  	stream.write(vinylFile.readSync('fixture.json'));
  	stream.end();
  });

});
