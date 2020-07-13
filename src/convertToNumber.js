const convertToNumber = (value) => {
  const keys = Object.keys(value);
  return keys.reduce((acc, key) => {
    if (typeof value[key] === 'object') {
      acc[key] = convertToNumber(value[key]);
    } else if (
      Number(value[key]) && typeof value[key] !== 'boolean' && value[key] !== null && value[key] !== undefined
    ) {
      acc[key] = Number(value[key]);
    } else {
      acc[key] = value[key];
    }
    return acc;
  }, {});
};
export default convertToNumber;
