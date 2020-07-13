import formatter from './formatters/stylish';
import toParsit from './parsing';
import makeTree from './tree';
import plain from './formatters/plain';
import toJson from './formatters/toJson';

export default (fileName1, fileName2, format) => {
  const value1 = toParsit(fileName1);
  const value2 = toParsit(fileName2);
  const tree = makeTree(value1, value2);
  if (format === 'plain') {
    return plain(tree);
  }
  if (format === 'json') {
    return toJson(tree);
  }
  return formatter(tree);
};
