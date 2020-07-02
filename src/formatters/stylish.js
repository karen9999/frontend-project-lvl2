import _ from "lodash";

const convertValueToString = (val) => {
  if (_.isObject(val)) {
    const [key, value] = Object.entries(val).flat();
    return `${key}: ${value}`;
  }
  return `${val}`;
};

const makeString = (tree, depth = 0) => {
  const space = (level) => " ".repeat(level);
  if (tree.status === "added") {
    if (_.isObject(tree.currentValue)) {
      return `  ${space(depth)}+ ${tree.name}: {\n        ${space(
        depth
      )}${convertValueToString(tree.currentValue)}\n    ${space(depth)}}\n`;
    }
    return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
      tree.currentValue
    )}\n`;
  }
  if (tree.status === "unmodified" && tree.children.length === 0) {
    return `    ${space(depth)}${tree.name}: ${convertValueToString(
      tree.currentValue
    )}\n`;
  }
  if (tree.status === "deleted") {
    if (_.isObject(tree.currentValue)) {
      return `  ${space(depth)}- ${tree.name}: {\n        ${space(
        depth
      )}${convertValueToString(tree.currentValue)}\n   ${space(depth)} }\n`;
    }
    return `  ${space(depth)}- ${tree.name}: ${convertValueToString(
      tree.currentValue
    )}\n`;
  }
  if (tree.status === "modified") {
    if (_.isObject(tree.currentValue) && !_.isObject(tree.previousValue)) {
      return `  ${space(depth)}+ ${tree.name}: {\n        ${space(
        depth
      )}${convertValueToString(tree.currentValue)}\n    ${space(
        depth
      )}}\n  ${space(depth)}- ${tree.name}: ${convertValueToString(
        tree.previousValue
      )}\n`;
    }
    if (!_.isObject(tree.currentValue) && _.isObject(tree.previousValue)) {
      return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
        tree.currentValue
      )}\n  ${space(depth)}- ${tree.name}: {\n        ${space(
        depth
      )}${convertValueToString(tree.previousValue)}\n        }\n`;
    }
    return `  ${space(depth)}+ ${tree.name}: ${convertValueToString(
      tree.currentValue
    )}\n  ${space(depth)}- ${tree.name}: ${convertValueToString(
      tree.previousValue
    )}\n`;
  }
  return `    ${space(depth)}${tree.name}: {\n${space(
    depth
  )}${tree.children.map((node) => makeString(node, 4)).join("")}    ${space(
    depth
  )}}\n`;
};
const formatter = (tree) => {
  const result = tree.map((node) => `${makeString(node)}`).join("");

  return `{\n${result}}`;
};
export default formatter;
