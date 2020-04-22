const _ = require("lodash");

export default (file1, file2) => {
  const keysOfFile1 = Object.keys(file1);
  const keysOfFile2 = Object.keys(file2);
  const addedValue = keysOfFile2.reduce((acc, value) => {
    if (!_.has(file1, value)) {
      acc.push(`  + ${value}: ${file2[value]}\n`);
    }
    return acc;
  }, []);
  const modifiedValue = keysOfFile1.reduce((acc, value) => {
    if (_.has(file2, value) && file1[value] !== file2[value]) {
      acc.push(`  + ${value}: ${file2[value]}\n`);
      acc.push(`  - ${value}: ${file1[value]}\n`);
    }
    return acc;
  }, []);
  const unchangedValue = keysOfFile1.reduce((acc, value) => {
    if (_.has(file2, value) && file1[value] === file2[value]) {
      acc.push(`    ${value}: ${file2[value]}\n`);
    }
    return acc;
  }, []);
  const deletedValue = keysOfFile1.reduce((acc, value) => {
    if (!_.has(file2, value)) {
      acc.push(`  - ${value}: ${file1[value]}\n`);
    }
    return acc;
  }, []);
  return `{\n${unchangedValue.join("")}${addedValue.join(
    ""
  )}${modifiedValue.join("")}${deletedValue.join("")}}`;
};