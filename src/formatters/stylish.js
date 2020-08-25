import _ from 'lodash';

const convertValueToString = (data) => {
  if (_.isObject(data)) {
    const [key, value] = Object.entries(data).flat();
    return `${key}: ${value}`;
  }
  return `${data}`;
};

const makeString = (tree, depth = 0) => {
  const space = (level) => ' '.repeat(level);
  if (tree.type === 'added') {
    if (_.isObject(tree.currentValue)) {
      return `  ${space(depth)}+ ${tree.name}: {\n        ${space(
        depth,
      )}${convertValueToString(tree.currentValue)}\n    ${space(depth)}}\n`;
    }
    return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
      tree.currentValue,
    )}\n`;
  }
  if (tree.type === 'unmodified') {
    return `    ${space(depth)}${tree.name}: ${convertValueToString(
      tree.currentValue,
    )}\n`;
  }
  if (tree.type === 'deleted') {
    if (_.isObject(tree.currentValue)) {
      return `  ${space(depth)}- ${tree.name}: {\n        ${space(
        depth,
      )}${convertValueToString(tree.currentValue)}\n   ${space(depth)} }\n`;
    }
    return `  ${space(depth)}- ${tree.name}: ${convertValueToString(
      tree.currentValue,
    )}\n`;
  }
  if (tree.type === 'modified') {
    if (_.isObject(tree.currentValue) && !_.isObject(tree.previousValue)) {
      return `  ${space(depth)}+ ${tree.name}: {\n        ${space(
        depth,
      )}${convertValueToString(tree.currentValue)}\n    ${space(
        depth,
      )}}\n  ${space(depth)}- ${tree.name}: ${convertValueToString(
        tree.previousValue,
      )}\n`;
    }
    if (!_.isObject(tree.currentValue) && _.isObject(tree.previousValue)) {
      return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
        tree.currentValue,
      )}\n  ${space(depth)}- ${tree.name}: {\n        ${space(
        depth,
      )}${convertValueToString(tree.previousValue)}\n        }\n`;
    }
    return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
      tree.currentValue,
    )}\n  ${space(depth)}- ${tree.name}: ${convertValueToString(
      tree.previousValue,
    )}\n`;
  }
  return `    ${space(depth)}${tree.name}: {\n${space(
    depth,
  )}${tree.children.map((node) => makeString(node, 4)).join('')}    ${space(
    depth,
  )}}\n`;
};
const formatter = (tree) => {
  const result = tree.map((node) => `${makeString(node)}`).join('');

  return `{\n${result}}`;
};
export default formatter;
