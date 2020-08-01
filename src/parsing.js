import ini from 'ini';
import yaml from 'js-yaml';
import convert from './convertToNumber';

export default (content, extName) => {
  if (extName === '.json') {
    return JSON.parse(content);
  }
  if (extName === '.yaml') {
    return convert(yaml.safeLoad(content));
  }
  if (extName === '.ini') {
    return convert(ini.parse(content));
  }
  throw new Error('unsupported format');
};
