const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const ini = require("ini");

const toParsit = (file) => {
  if (path.extname(file) === ".json") {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  }
  if (path.extname(file) === ".yaml") {
    return yaml.safeLoad(fs.readFileSync(file, "utf-8"));
  }
  if (path.extname(file) === ".ini") {
    return ini.parse(fs.readFileSync(file, "utf-8"));
  }
  return null;
};
export default toParsit;
