import diff from '../src/index.js';

test('diff', () => {
  expect(diff({a: 1, b: 1}, {a: 1, b: 1})).toEqual(`{\n    a: 1\n    b: 1\n}`);
});