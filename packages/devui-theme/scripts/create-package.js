const path = require('path');
const fsExtra = require('fs-extra');

exports.createPackage = async (name, version, outputDir) => {
  const fileStr = `{
    "name": "${name}",
    "version": "${version}",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }`;

  await fsExtra.outputFile(path.resolve(outputDir, 'package.json'), fileStr, 'utf8');
};
