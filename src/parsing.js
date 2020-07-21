import ini from 'ini';
import yaml from 'js-yaml';
import convert from './convertToNumber';

export default (file, extName) => {
  if (extName === '.json') {
    return JSON.parse(file);
  }
  if (extName === '.yaml') {
    return convert(yaml.safeLoad(file));
  }
  if (extName === '.ini') {
    return convert(ini.parse(file));
  }
  return null;
};
