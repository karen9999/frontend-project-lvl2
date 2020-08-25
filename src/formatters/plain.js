import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const makeString = (node) => {
  if (node.type === 'nested') {
    return node.children.map((child) => `${node.name}.${makeString(child)}`);
  }
  if (node.type === 'added') {
    return `${node.name} was added with value: ${getValue(node.currentValue)}`;
  }
  if (node.type === 'deleted') {
    return `${node.name} was deleted`;
  }
  if (node.type === 'modified') {
    return `${node.name} was changed from ${getValue(
      node.previousValue,
    )} to ${getValue(node.currentValue)}`;
  }
  return 'unmodified';
};
const plain = (tree) => {
  const result = tree
    .map(makeString)
    .flat()
    .filter((string) => !string.includes('unmodified'))
    .map((string) => `Property ${string}`)
    .join('\n');
  return result;
};
export default plain;
