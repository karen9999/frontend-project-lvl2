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

const makeTree = (valueBefore, valueAfter) => {
  const keysBefore = Object.keys(valueBefore);
  const valuesBefore = Object.values(valueBefore);
  const keysAfter = Object.keys(valueAfter);

  const modifiedAndUnmodifiedValues = keysBefore
    .map((key, index) => {
      if (
        keysAfter.includes(key) && typeof valuesBefore[index] === 'object' && typeof valueAfter[key] === 'object'
      ) {
        return makeNode(
          key,
          'unmodified',
          '',
          '',
          makeTree(valuesBefore[index], valueAfter[key]),
        );
      }
      if (!keysAfter.includes(key)) {
        return makeNode(key, 'deleted', valueBefore[key], '', []);
      }
      if (typeof valueBefore[key] !== 'object' || typeof valueAfter[key] !== 'object') {
        return valuesBefore[index] === valueAfter[key]
          ? makeNode(key, 'unmodified', valuesBefore[index])
          : makeNode(key, 'modified', valueAfter[key], valueBefore[key]);
      }
      return [];
    })
    .flat();
  const addedValues = keysAfter
    .filter((key) => !keysBefore.includes(key))
    .map((key) => makeNode(key, 'added', valueAfter[key]));
  return _.concat(modifiedAndUnmodifiedValues, addedValues);
};
export default makeTree;
