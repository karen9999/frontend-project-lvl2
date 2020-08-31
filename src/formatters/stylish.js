import _ from 'lodash';

const makeSpaces = (level) => '  '.repeat(level);

const convertValueToString = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  return `{\n${_.keys(data)
    .map((key) => `${makeSpaces(depth + 2)}  ${key}: ${data[key]}`)
    .join('\n')}\n${makeSpaces(depth + 1)}}`;
};
const makeString = (tree) => {
  const iter = (data, depth = 1) => data
    .map((node) => {
      const space = makeSpaces(depth);
      const content = convertValueToString(node.currentValue, depth);
      switch (node.type) {
        case 'unmodified':
          return `${space}  ${node.name}: ${content}`;
        case 'added':
          return `${space}+ ${node.name}: ${content}`;
        case 'deleted':
          return `${space}- ${node.name}: ${content}`;
        case 'modified':
          return `${space}- ${node.name}: ${convertValueToString(
            node.currentValue,
            depth,
          )}\n${space}+ ${node.name}: ${convertValueToString(
            node.previousValue,
            depth,
          )}`;
        case 'nested':
          return `${space}  ${node.name}: {\n${iter(
            node.children,
            depth + 2,
          ).join('\n')}\n${makeSpaces(depth + 1)}}`;
        default:
          throw new Error(`${node.status} is unknown!`);
      }
    });
  return `{\n${iter(tree).flat(Infinity).join('\n')}\n}`;
};
export default makeString;
