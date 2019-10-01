#!/usr/bin/env node
/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow

// Modified version of the script originally created by @f-roland
// https://github.com/yarnpkg/yarn/issues/4503#issuecomment-343121671
//
// Notable differences:
// - Removed external dependencies (shelljs and ramda)
// - Filter out files and folders starting with a dot (.), or an underscore (_)
// - Handle ENOTDIR exception

const { readdir, access, mkdirSync, symlinkSync } = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const asyncReaddir = promisify(readdir);
const asyncAccess = promisify(access);

const packagesDir = resolve(__dirname, '../packages');
const rootDir = resolve(__dirname, '../');

function linkBinaries(_package, nodeModulePath) {
  console.log('linking binaries in', _package);
  mkdirSync(nodeModulePath);
  symlinkSync(`${rootDir}/node_modules/.bin`, `${nodeModulePath}/.bin`);
}

async function perform() {
  const packages = (await asyncReaddir(packagesDir)).filter(
    _package => !_package.startsWith('.') && !_package.startsWith('_')
  );

  const result = packages.map(async _package => {
    const nodeModulePath = resolve(
      packagesDir,
      `./${_package}`,
      './node_modules'
    );
    try {
      return await asyncAccess(nodeModulePath);
    } catch (e) {
      if (['ENOENT', 'ENOTDIR'].includes(e.code)) {
        linkBinaries(_package, nodeModulePath);
        return;
      }
      throw e;
    }
  });
  return Promise.all(result);
}

const successHandler = () => {
  console.log('Binaries linked!');
  process.exit(0);
};

const errorHandler = err => {
  console.error(err);
  process.exit(1);
};

perform().then(successHandler, errorHandler);
