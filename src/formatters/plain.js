import _ from 'lodash';

const makeString = (node) => {
  switch (node.status) {
    case 'added':
      return `${node.name} was added with value: ${
        _.isObject(node.currentValue) ? '[complex value]' : node.currentValue
      }`;
    case 'deleted':
      return `${node.name} was deleted`;
    case 'modified': {
      const current = _.isObject(node.currentValue)
        ? '[complex value]'
        : node.currentValue;
      const previous = _.isObject(node.previousValue)
        ? '[complex value]'
        : node.previousValue;
      return `${node.name} was changed from ${previous} to ${current}`;
    }
    default:
      return undefined;
  }
};
const plain = (tree) => {
  const iter = (acc, nodes) => {
    const result = nodes.map((node) => {
      if (_.isEmpty(node.children)) {
        return `Property ${acc}${makeString(node)}\n`;
      }
      return iter(`${acc}${node.name}.`, node.children);
    });
    return result
      .flat(Infinity)
      .filter((node) => !node.includes('undefined'))
      .join('');
  };
  return iter('', tree);
};
export default plain;
