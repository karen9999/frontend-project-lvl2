const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');

const toParsit = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(fs.readFileSync(file))
  }
  if (path.extname(file) === '.yaml') {
    return yaml.safeLoad((fs.readFileSync(file)));
  }
};

export default toParsit;