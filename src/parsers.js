import ini from "ini";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

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
