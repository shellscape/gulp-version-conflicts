'use strict';

const chalk = require('chalk');
const gutil = require('gulp-util');
const path = require('path');
const symbols = require('log-symbols');
const plur = require('plur');
const table = require('text-table');
const through = require('through2');
const vertree = require('npm-version-tree');

const pluginName = 'gulp-version-conflicts';

module.exports = () => {

  let results = [],
    errorCount = 0,
    pkg;

  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming not supported'));
      return;
    }

    pkg = require(file.path);

    console.log();
    console.log(symbols.info, `Fetching version tree for ${pkg.name}`);

    let result;

    vertree.fetch(pkg).then((tree) => {
      console.log(symbols.info, 'Analyzing version tree\n');

      Object.keys(tree).forEach((name) => {
        let versions = tree[name],
          baseVersion,
          prevMeta;

        for (let meta of versions) {
          meta.name = name;

          if (!baseVersion) {
            baseVersion = meta.version;
          }
          else if (baseVersion !== meta.version) {
            if (!result) {
              result = { file: file.path, errors: [] };
            }

            result.errors.push({
              file: file.path,
              prev: prevMeta,
              current: meta
            });

            errorCount += 1;
            break;
          }

          prevMeta = meta;
        }
      });

      result && results.push(result);

      cb(null, file);
    },
    (err) => {
      throw err;
    });

  }, function (cb) {
    let message = 'The source module has dependency conflicts that need to be resolved before proceding.';

    if (errorCount > 0) {
      console.log();

      results.forEach((result) => {
        console.log(chalk.underline(result.file));

        result.errors.forEach((meta) => {
          let rows = [
            [
              chalk.red(`  ${meta.prev.semver}`),
              chalk.dim(`(${meta.prev.version})`),
              `in ${meta.prev.parent}`
            ],
            [
              chalk.red(`  ${meta.current.semver}`),
              chalk.dim(`(${meta.current.version})`),
              `in ${meta.current.parent}`
            ]
          ];

          console.log(chalk.dim(meta.prev.name));
          console.log(table(rows));
        });

        console.log();
      });

      console.log(symbols.error, chalk.red(`${errorCount} ${plur('conflict', errorCount)} found\n`));

      this.emit('error', new gutil.PluginError(pluginName, `${errorCount} errors. ${message}`));
    }

    cb();
  });
};
