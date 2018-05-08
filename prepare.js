const fs = require('fs-extra');
const path = require('path');
const {execSync} = require('child_process');
const winston = require('winston-color');

const distPath = path.resolve(__dirname, './dist');
const tplPath = path.resolve(__dirname, './template');

const appPackage = require('./package.json');
const tplPackage = require('./template/package.json');

function copyNativeScriptPlugins () {
  winston.info('Copying NativeScript plugins to template dependencies...');
  const plugins = Object.keys(appPackage.dependencies)
    .filter(key => key.indexOf('nativescript-') !== -1)
    .reduce((obj, key) => {
      obj[key] = appPackage.dependencies[key];
      return obj;
    }, {});
  Object.assign(tplPackage.dependencies, plugins);
  fs.writeFileSync(tplPath + '/package.json', JSON.stringify(tplPackage, null, 2));
}

function updateDistFromTemplate () {
  winston.info('Preparing NativeScript application from template...');
  fs.ensureDirSync(distPath);
  fs.copySync(tplPath, distPath, {overwrite: false});
  execSync('npm i', {cwd: 'dist'});
}

module.exports = () => {
  copyNativeScriptPlugins();
  updateDistFromTemplate();
};
