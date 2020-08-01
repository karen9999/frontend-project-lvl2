import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getPath = (filename) => path.join(__dirname, `../__fixtures__/${filename}`);

test.each([
  ['json', 'recursive'], ['yaml', 'recursive'], ['ini', 'recursive'],
  ['json', 'plain'], ['yaml', 'plain'], ['ini', 'plain'],
  ['json', 'json'], ['yaml', 'json'], ['ini', 'json'],
])('%s', (type, format) => {
  const beforeFilePath = getPath(`before.${type}`);
  const afterFilePath = getPath(`after.${type}`);
  const actual = gendiff(beforeFilePath, afterFilePath, format);
  const expected = fs.readFileSync(getPath(`${format}Difference`), 'utf-8');
  expect(actual).toEqual(expected);
});
