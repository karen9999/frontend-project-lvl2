import path from 'path';
import fs from 'fs';
import generateDifference from './formatters/index';
import parse from './parsing';
import makeTree from './tree';

const getExtName = (filePath) => path.extname(filePath);

export default (filePath1, filePath2, format) => {
  const extName1 = getExtName(filePath1);
  const extName2 = getExtName(filePath2);
  const file1 = fs.readFileSync(filePath1, 'utf-8');
  const file2 = fs.readFileSync(filePath2, 'utf-8');
  const value1 = parse(file1, extName1);
  const value2 = parse(file2, extName2);
  const tree = makeTree(value1, value2);
  return generateDifference(format, tree);
};
