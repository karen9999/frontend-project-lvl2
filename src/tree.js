const _ = require("lodash");

const makeNode = (
  name,
  status,
  currentValue,
  previousValue = "",
  children = []
) => {
  return {
    name,
    status,
    currentValue,
    previousValue,
    children,
  };
};

const makeTree = (before, after) => {
  const beforeKeys = Object.keys(before);
  const beforeValues = Object.values(before);
  const afterKeys = Object.keys(after);

  const modifiedAndUnmodifiedValues = beforeKeys
    .map((key, index) => {
      if (
        afterKeys.includes(key) &&
        typeof beforeValues[index] === "object" &&
        typeof after[key] === "object"
      ) {
        return makeNode(
          key,
          "unmodified",
          "",
          "",
          makeTree(beforeValues[index], after[key])
        );
      }
      if (!afterKeys.includes(key)) {
        return makeNode(key, "deleted", before[key], "", []);
      }
      if (typeof before[key] !== "object" || typeof after[key] !== "object") {
        return beforeValues[index] === after[key]
          ? makeNode(key, "unmodified", beforeValues[index])
          : makeNode(key, "modified", after[key], before[key]);
      }
      return [];
    })
    .flat();
  const addedValues = afterKeys
    .filter((key) => !beforeKeys.includes(key))
    .map((key) => {
      return makeNode(key, "added", after[key]);
    });

  return _.concat(modifiedAndUnmodifiedValues, addedValues);
};
export default makeTree;
