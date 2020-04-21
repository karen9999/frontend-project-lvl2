const _ = require("lodash");

export default (before, after) => {
  const keysOfBefore = Object.keys(before);
  const keysOfAfter = Object.keys(after);
  const addedValue = keysOfAfter.reduce((acc, el) => {
    if (!_.has(before, el)) {
      acc.push(`  + ${el}: ${after[el]}\n`);
    }
    return acc;
  }, []);
  const modifiedValue = keysOfBefore.reduce((acc, el) => {
    if (_.has(after, el) && before[el] !== after[el]) {
      acc.push(`  + ${el}: ${after[el]}\n`);
      acc.push(`  - ${el}: ${before[el]}\n`);
    }
    return acc;
  }, []);
  const unchangedValue = keysOfBefore.reduce((acc, el) => {
    if (_.has(after, el) && before[el] === after[el]) {
      acc.push(`    ${el}: ${after[el]}\n`);
    }
    return acc;
  }, []);
  const deletedValue = keysOfBefore.reduce((acc, el) => {
    if (!_.has(after, el)) {
      acc.push(`  - ${el}: ${before[el]}\n`);
    }
    return acc;
  }, []);
  return `{\n${unchangedValue.join("")}${addedValue.join(
    ""
  )}${modifiedValue.join("")}${deletedValue.join("")}}`;
};
