import _ from 'lodash';

const makeNode = (
  name,
  status,
  currentValue,
  previousValue = '',
  children = [],
) => ({
  name,
  status,
  currentValue,
  previousValue,
  children,
});

const makeTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return unionKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return makeNode(
        key,
        'unmodified',
        '',
        '',
        makeTree(obj1[key], obj2[key]),
      );
    }
    if (obj1[key] === obj2[key]) {
      return makeNode(key, 'unmodified', obj1[key], '', []);
    }
    if (obj2[key] === undefined) {
      return makeNode(key, 'deleted', obj1[key], '', []);
    }
    if (obj1[key] === undefined) {
      return makeNode(key, 'added', obj2[key], '', []);
    }
    return makeNode(key, 'modified', obj2[key], obj1[key], []);
  });
};
export default makeTree;
