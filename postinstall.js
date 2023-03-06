const fs = require('fs');
const path = require('path');

// npm_config_platform exists only when nodejs-mobile is building our module
const platform = process.env['npm_config_platform'];

// On iOS nodejs-mobile we need index.node to be a folder that
// will be converted to a .framework
const outputPath = path.join(__dirname, 'index.node');
const tempPath = path.join(__dirname, 'index.node.tmp');
if (platform === 'ios' && fs.existsSync(outputPath)) {
  fs.renameSync(outputPath, tempPath);
  fs.mkdirSync(outputPath);
  fs.renameSync(tempPath, path.join(outputPath, 'index'));
}
