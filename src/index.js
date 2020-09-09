import path from 'path';
import fs from 'fs';
import formatting from './formatters/index';
import parse from './parsing';
import makeTree from './tree';

const getExtName = (filePath) => path.extname(filePath);

export default (filePath1, filePath2, format) => {
  const extName1 = getExtName(filePath1);
  const extName2 = getExtName(filePath2);
  const contentFile1 = fs.readFileSync(filePath1, 'utf-8');
  const contentFile2 = fs.readFileSync(filePath2, 'utf-8');
  const value1 = parse(contentFile1, extName1);
  const value2 = parse(contentFile2, extName2);
  const tree = makeTree(value1, value2);
  return formatting(format, tree);
};
