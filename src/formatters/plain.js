import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const makeString = (node) => {
  if (node.status === 'unmodified' && !_.isEmpty(node.children)) {
    return node.children.map((child) => `${node.name}.${makeString(child)}`);
  }
  if (node.status === 'added') {
    return `${node.name} was added with value: ${getValue(node.currentValue)}`;
  }
  if (node.status === 'deleted') {
    return `${node.name} was deleted`;
  }
  if (node.status === 'modified') {
    return `${node.name} was changed from ${getValue(
      node.previousValue,
    )} to ${getValue(node.currentValue)}`;
  }
  if (node.status === 'unmodified') {
    return null;
  }
};
const plain = (tree) => {
  return tree
    .map(makeString)
    .flat()
    .filter((child) => !child.includes(null))
    .map((str) => `Property ${str}`)
    .join('\n');
};
export default plain;
