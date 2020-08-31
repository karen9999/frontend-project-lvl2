import ini from 'ini';
import yaml from 'js-yaml';
import convert from './convertToNumber';

export default (content, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
      return yaml.safeLoad(content);
    case '.ini':
      return convert(ini.parse(content));
    default:
      throw new Error(`Unknown format: ${extName}!`);
  }
};
