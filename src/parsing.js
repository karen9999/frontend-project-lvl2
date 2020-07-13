import ini from 'ini';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import convert from './convertToNumber';

export default (filePath) => {
  if (path.extname(filePath) === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  if (path.extname(filePath) === '.yaml') {
    return convert(yaml.safeLoad(fs.readFileSync(filePath, 'utf-8')));
  }
  if (path.extname(filePath) === '.ini') {
    return convert(ini.parse(fs.readFileSync(filePath, 'utf-8')));
  }
  return null;
};
